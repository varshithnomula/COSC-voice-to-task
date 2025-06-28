# Voice To-Do List Application

A web-based to-do list application that allows users to add tasks using voice commands. This application leverages the Web Speech API to convert spoken words into text and automatically adds them to a dynamic task list.


https://github.com/user-attachments/assets/f9196a9f-ec68-4431-b2c1-27a73dad7bf5


## Features

- **Voice Recognition**: Add tasks by speaking into your microphone
- **Text Input**: Traditional text input for adding tasks
- **Task Management**: Mark tasks as completed or delete them
- **Persistent Storage**: Tasks are saved in the browser's local storage
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Supports hands-free input for better accessibility

## How to Use

1. **Open the application** in a compatible web browser (Chrome recommended)
2. **Click the microphone button** to start voice recognition
3. **Speak your task** clearly into your microphone
4. The application will automatically add your spoken task to the list
5. **Mark tasks as completed** by clicking the check icon
6. **Delete tasks** by clicking the trash icon

## Technical Details

- Built with vanilla JavaScript, HTML, and CSS
- Uses the Web Speech API (SpeechRecognition interface)
- Stores tasks in browser's localStorage
- Responsive design with CSS flexbox

## Browser Compatibility

The Web Speech API is primarily supported in Chrome and Edge browsers. For the best experience, use one of these browsers. The application will fall back to text-only input if speech recognition is not supported.

## Running the Application

1. Clone or download this repository
2. Open the `index.html` file in your web browser
3. Allow microphone access when prompted

## License

This project is open source and available for personal and commercial use.
