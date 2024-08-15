from flask import Flask, render_template, request, jsonify
import openai
import whisper
import os
from flask_wtf import CSRFProtect
from werkzeug.utils import secure_filename
from io import BytesIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'CSRF_SECRET'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['STATIC_FOLDER'] = 'static'

# Initialize CSRF protection
csrf = CSRFProtect(app)

openai.api_key = "OPENAI_API_KEY"

# Ensure the uploads folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

def transcribe_audio(audio_file_path_or_stream):
    """
    Transcribes an audio file using OpenAI's Whisper API.

    Args:
        audio_file_path_or_stream (str or BytesIO): The path to the audio file or in-memory file.

    Returns:
        str: The transcribed text.
    """
    model = whisper.load_model("base")  
    if isinstance(audio_file_path_or_stream, str):
        result = model.transcribe(audio_file_path_or_stream, fp16=False)
    else:
        result = model.transcribe(audio_file_path_or_stream, fp16=False)
    return result["text"]

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/record', methods=['POST'])
def record():
    audio_file = request.files.get('audio')
    if not audio_file:
        app.logger.error('No audio file received')
        return jsonify({'error': 'No audio file uploaded'}), 400

    # Log the filename and check if the file is received
    filename = secure_filename(audio_file.filename) if audio_file.filename else "default_audio.wav"
    audio_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    # Save the file and log the path
    try:
        audio_file.save(audio_path)
        app.logger.info(f'Audio file saved to: {audio_path}')
    except Exception as e:
        app.logger.error(f'Error saving file: {e}')
        return jsonify({'error': 'Failed to save audio file'}), 500

    # Attempt transcription
    try:
        transcription = transcribe_audio(audio_path)
        if transcription:
            return jsonify({'transcription': transcription})
        else:
            return jsonify({'error': 'Transcription failed'}), 400
    except Exception as e:
        app.logger.error(f'Transcription error: {e}')
        return jsonify({'error': 'Error during transcription'}), 500

@app.route('/transcription')
def show_transcription():
    text = request.args.get('text', '')
    return render_template('transcription.html', transcription=text)

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)

