# VoiceAI
VoiceAI is a web application that allows users to transcribe spoken audio into text. It uses OpenAI's Whisper model for transcription and is built with Flask and JavaScript.

Features
Record audio directly from your browser
Transcribe recorded audio into text
View transcriptions on a separate page
Technologies Used
Backend: Flask
Frontend: HTML, JavaScript
Audio Recording: Recorder.js
Transcription: OpenAI Whisper model
CSRF Protection: Flask-WTF
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/voiceai.git
cd voiceai
Set Up a Virtual Environment:

bash
Copy code
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install Dependencies:

bash
Copy code
pip install -r requirements.txt
Set Up Environment Variables:

Create a .env file in the root directory and add your OpenAI API key:

makefile
Copy code
OPENAI_API_KEY=your_openai_api_key
Run the Application:

bash
Copy code
flask run
The application will be available at http://localhost:5000.

Usage
Navigate to the Application:

Open your web browser and go to http://localhost:5000.

Record Audio:

Click the "Record" button to start recording. After a few seconds, the recording will stop automatically.

Send for Transcription:

Click the "Send" button to upload the recording for transcription. The transcribed text will be displayed on a new page.

Troubleshooting
CSRF Token Errors: Ensure the CSRF token is correctly included in the HTML form and request headers.
Slow Transcription: Check server performance and consider using a more powerful Whisper model if needed.
Contributing
Fork the Repository

Create a Feature Branch

bash
Copy code
git checkout -b feature/your-feature
Commit Your Changes

bash
Copy code
git commit -m "Add feature description"
Push to the Branch

bash
Copy code
git push origin feature/your-feature
Create a Pull Request

Submit a pull request on GitHub with a description of your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
OpenAI for providing the Whisper model.
Flask and JavaScript communities for their excellent frameworks and libraries.
