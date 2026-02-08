const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files (uploaded videos and public directory)
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// In-memory storage for videos (in production, use a database)
let videos = [];

// Load videos from file if exists
const VIDEO_DB_FILE = 'videos-db.json';
if (fs.existsSync(VIDEO_DB_FILE)) {
    videos = JSON.parse(fs.readFileSync(VIDEO_DB_FILE, 'utf8'));
}

// Save videos to file
function saveVideos() {
    fs.writeFileSync(VIDEO_DB_FILE, JSON.stringify(videos, null, 2));
}

// Configure multer for video uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed!'));
        }
    }
});

// API Routes

// Get all videos
app.get('/api/videos', (req, res) => {
    res.json(videos);
});

// Upload video (file)
app.post('/api/upload', upload.single('video'), (req, res) => {
    try {
        const { caption, noAI, username } = req.body;
        
        const video = {
            id: Date.now().toString(),
            videoUrl: `/uploads/${req.file.filename}`,
            caption: caption || '',
            username: username || 'anonymous',
            noAI: noAI === 'true',
            verified: false,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
            shares: 0
        };
        
        videos.unshift(video);
        saveVideos();
        
        res.json({ success: true, video });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Upload video (base64)
app.post('/api/upload-base64', (req, res) => {
    try {
        const { videoData, caption, noAI, username } = req.body;
        
        // Extract base64 data
        const matches = videoData.match(/^data:video\/(\w+);base64,(.+)$/);
        if (!matches) {
            return res.status(400).json({ success: false, error: 'Invalid video data' });
        }
        
        const ext = matches[1] === 'webm' ? 'webm' : 'mp4';
        const base64Data = matches[2];
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext;
        const filepath = path.join('uploads', filename);
        
        // Write file
        fs.writeFileSync(filepath, base64Data, 'base64');
        
        const video = {
            id: Date.now().toString(),
            videoUrl: `/uploads/${filename}`,
            caption: caption || '',
            username: username || 'anonymous',
            noAI: noAI !== false,
            verified: false,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
            shares: 0
        };
        
        videos.unshift(video);
        saveVideos();
        
        res.json({ success: true, video });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Like video
app.post('/api/videos/:id/like', (req, res) => {
    const video = videos.find(v => v.id === req.params.id);
    if (video) {
        video.likes++;
        saveVideos();
        res.json({ success: true, likes: video.likes });
    } else {
        res.status(404).json({ success: false, error: 'Video not found' });
    }
});

// Comment on video
app.post('/api/videos/:id/comment', (req, res) => {
    const video = videos.find(v => v.id === req.params.id);
    if (video) {
        video.comments++;
        saveVideos();
        res.json({ success: true, comments: video.comments });
    } else {
        res.status(404).json({ success: false, error: 'Video not found' });
    }
});

// Share video
app.post('/api/videos/:id/share', (req, res) => {
    const video = videos.find(v => v.id === req.params.id);
    if (video) {
        video.shares++;
        saveVideos();
        res.json({ success: true, shares: video.shares });
    } else {
        res.status(404).json({ success: false, error: 'Video not found' });
    }
});

// Delete video
app.delete('/api/videos/:id', (req, res) => {
    const index = videos.findIndex(v => v.id === req.params.id);
    if (index !== -1) {
        const video = videos[index];
        
        // Delete file
        const filepath = path.join(__dirname, video.videoUrl);
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        
        videos.splice(index, 1);
        saveVideos();
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, error: 'Video not found' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', videos: videos.length });
});

app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════╗
    ║   🎬 You Got Vined Server is LIVE! 🎬   ║
    ╠══════════════════════════════════════════╣
    ║  Server: http://localhost:${PORT}           ║
    ║  Videos: ${videos.length} vines ready to watch      ║
    ╚══════════════════════════════════════════╝
    `);
});
