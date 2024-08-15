document.addEventListener('DOMContentLoaded', function () {
    let recordButton = document.getElementById('recordButton');
    let sendButton = document.getElementById('sendButton');
    let recordedAudio = document.getElementById('recordedAudio');
    let transcriptionContainer = document.getElementById('transcription-container');
    let mediaRecorder;
    let audioChunks = [];

    // Get CSRF token from the hidden input field
    let csrfToken = document.getElementById('csrf_token').value;

    recordButton.addEventListener('click', async function () {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = function (event) {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = function () {
                    let audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    let audioUrl = URL.createObjectURL(audioBlob);
                    recordedAudio.src = audioUrl;
                    sendButton.disabled = false;
                    console.log("Recording complete, ready to send.");
                };

                mediaRecorder.start();
                recordButton.disabled = true;
                recordButton.innerText = 'Recording...';

                setTimeout(function () {
                    mediaRecorder.stop();
                    recordButton.disabled = false;
                    recordButton.innerText = 'Record';
                }, 5000); // Record for 5 seconds

            } catch (error) {
                console.error('Error accessing microphone:', error);
                alert('Error accessing microphone.');
            }
        } else {
            alert('Your browser does not support audio recording.');
        }
    });

    sendButton.addEventListener('click', async function () {
        if (audioChunks.length === 0) {
            console.error('No audio data available to send.');
            transcriptionContainer.innerText = 'No audio data available to send.';
            return;
        }

        try {
            let audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            let formData = new FormData();
            formData.append('audio', audioBlob, 'recording.wav');

            let response = await fetch('/record', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken // Include CSRF token in the request headers
                },
                body: formData
            });

            // Check if the response is JSON
            let contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                let data = await response.json();
                console.log('Response from server:', data);

                if (response.ok && data.transcription) {
                    // Redirect to the new page with transcription as a URL parameter
                    window.location.href = `/transcription?text=${encodeURIComponent(data.transcription)}`;
                } else {
                    transcriptionContainer.innerText = data.error || 'Error transcribing audio.';
                    console.error('Transcription error:', data.error);
                }
            } else {
                let errorText = await response.text();  // Parse the HTML response
                console.error('Server returned an error page:', errorText);
                transcriptionContainer.innerText = 'An error occurred. Please check the server logs.';
            }
        } catch (error) {
            transcriptionContainer.innerText = 'An error occurred during the upload process.';
            console.error('Upload error:', error);
        }
    });
});
