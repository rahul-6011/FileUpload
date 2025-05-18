# Dropbox-Simplified file upload and download web app
This is a full stack web application to upload files, view and download files.

## features

- Upload files (file type restricted to .txt, .jpg, .png, .json)
- List uploaded files
- View file
- Download file

## Teck Stack Used

- Frontend: React
- Backend: Node.js, Express
- Storage: Local FS

## Project Structure

DropBox-Clone
--> backend
    --> server.js
--> my-app(frontend)
    --> src
        -->app.js
    --> public

## Backend setup

cd backend
npm install
node server.js

## frontend setup

cd my-app
npm install
npm start

### WorkFlow

1. Upload File:

Choose a file and click "Upload".

File is validated and stored in /backend/uploads/.

Metadata is saved in the SQLite database.

2. File Listing:

Files are fetched from the API and displayed in the React frontend.

3. View File:

Clicking "View" opens the file using /view/:id endpoint.

4. Download File:

Clicking "Download" triggers file download via /download/:id.
