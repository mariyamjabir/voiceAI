# VoiceAI
VoiceAI is a web application that allows users to transcribe spoken audio into text. It uses OpenAI's Whisper model for transcription and is built with Flask and JavaScript.

## Features
Record audio directly from your browser
Transcribe recorded audio into text
View transcriptions on a separate page

## Technologies Used
 - Backend: Flask
 - Frontend: HTML, JavaScript
 - Audio Recording: Recorder.js
 - Transcription: OpenAI Whisper model
 - CSRF Protection: Flask-WTF

## Usage
Navigate to the Application:
 - Open your web browser and go to http://localhost:5000.

## Record Audio:
 - Click the "Record" button to start recording. After a few seconds, the recording will stop automatically.
 - Click the "Send" button to upload the recording for transcription. The transcribed text will be displayed on a new page.

## Troubleshooting:
CSRF Token Errors: Ensure the CSRF token is correctly included in the HTML form and request headers.
Slow Transcription: Check server performance and consider using a more powerful Whisper model if needed.

## License:
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments:
OpenAI for providing the Whisper model.
Flask and JavaScript communities for their excellent frameworks and libraries.
