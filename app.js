const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const app = express();
const port = 9000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/resources', express.static(path.join(__dirname, 'resources')));
// Render the file upload form

function getUploadedFiles() {
    return new Promise((resolve, reject) => {
        fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    })
}
app.get('/', async (req, res) => {
    try {
        let files = await getUploadedFiles();

        const alert = req.cookies?.alert || {};

        // Clear the alert from cookies after reading it
        res.clearCookie('alert');
        res.render('upload', { files, alert });
    } catch (error) {
        console.error('Error reading files:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.render('success');
});

// Handle file download
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'uploads', filename));
});

app.post('/delete', async (req, res) => {
    const fileNameToDelete = req.body.fileNameToDelete;
    // Add your logic to delete the file from the server
    // For example, using fs.unlink
    fs.unlink(path.join(__dirname, 'uploads', fileNameToDelete), (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            // Optionally, you can render the page with an alert

            // Redirect to the homepage
            res.cookie('alert', { type: 'success', message: `Failed to delete file ${fileNameToDelete}` });
            res.redirect('/');
            return;
        } else {
            res.cookie('alert', { type: 'success', message: `File ${fileNameToDelete} deleted successfully` });
            res.redirect('/');
            return;
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
