const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

const ALLOWED_EXTENSIONS = ['.txt', '.jpg', '.jpeg', '.png', '.json'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_EXTENSIONS.includes(ext)) cb(null, true);
  else cb(new Error('File type not allowed'));
};

const upload = multer({ storage, fileFilter });

const fileMetadata = [];

app.get('/', (req, res) => {
  res.send('Dropbox-like backend is running!');
});

app.post('/upload', (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) return res.status(400).json({ error: err.message });

    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const id = uuidv4();
    const meta = {
      id,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      path: file.path
    };
    fileMetadata.push(meta);

    res.status(200).json({ message: 'File uploaded successfully', file: meta });
  });
});

app.get('/view/:id', (req, res) => {
  const file = fileMetadata.find(f => f.id === req.params.id);

  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.sendFile(path.resolve(file.path));
});

app.get('/files', (req, res) => {
  const sanitizedList = fileMetadata.map(({ id, originalname, mimetype }) => ({
    id,
    originalname,
    mimetype
  }));
  res.json(sanitizedList);
});

app.get('/download/:id', (req, res) => {
  const file = fileMetadata.find(f => f.id === req.params.id);

  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.download(path.join(UPLOADS_DIR, file.filename), file.originalname);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
