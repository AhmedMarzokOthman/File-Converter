# File Converter Electron App

This is a simple file converter application built using Electron, React, and Tailwind CSS. The application allows users to upload files, select the desired conversion format, and convert the files.

## Features

- Upload multiple files
- Display the list of selected files
- Select file formats for conversion
- Convert files using the `sharp` library

## Project Structure

.editorconfig .env .gitignore .prettierrc global.css index.html main.js package.json public/ fonts/ images/ README.md scripts/ handleFileConvert.js showFilesList.js tailwind.config.js

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/file-converter-electron-app.git
   cd file-converter-electron-app
   ```

2. Install the dependencies:
   npm install

3. Build the CSS:
   npm run build:css

## Usage

1. Start the application:
   npm start

2. Upload files by clicking the "Upload" button.

3. Select the file formats for conversion.

4. Click the "Convert" button to convert the files.

## Scripts

- npm run build:css: Build the Tailwind CSS.
- npm run watch:css: Watch for changes in the CSS and rebuild automatically.
- npm start: Start the Electron application.
