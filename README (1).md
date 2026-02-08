# 🎬 You Got Vined

> A modern, public video sharing platform inspired by Vine - 6-second looping videos that anyone can upload and watch!

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## ✨ Features

- 📹 **Public Video Sharing** - All videos stored on server and visible to everyone
- 🔴 **Live Recording** - Record 6-second vines directly from your webcam
- ⬆️ **Video Upload** - Upload videos from your computer (MP4, MOV, WebM)
- 🎥 **Fullscreen Playback** - Click any video to watch in immersive player
- ❤️ **Social Features** - Like, comment, and share videos with real-time counts
- 🔄 **Auto-Refresh** - Feed updates every 10 seconds with new uploads
- 🚫 **No AI Filter** - Toggle to show only human-created content
- ✅ **Verified Filter** - Show only verified creators
- 👤 **Multi-User** - Everyone gets their own username
- 💾 **Persistent Storage** - Videos saved to server permanently

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- A modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/you-got-vined.git
cd you-got-vined
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**

**Windows:**
```bash
start-windows.bat
```

**Mac/Linux:**
```bash
./start-mac-linux.sh
```

**Or manually:**
```bash
npm start
```

4. **Open the website**
Open `yougotvined-divine.html` in your browser!

You should see:
```
╔══════════════════════════════════════════╗
║   🎬 You Got Vined Server is LIVE! 🎬   ║
╠══════════════════════════════════════════╣
║  Server: http://localhost:3000           ║
║  Videos: 0 vines ready to watch          ║
╚══════════════════════════════════════════╝
```

## 🎮 How to Use

### Upload a Video
1. Click the **"Upload Vine"** button
2. Select a video file (max 50MB)
3. Add a caption (optional)
4. Your video is now public for everyone to see! 🌎

### Record a Vine
1. Click **"🔴 Record Live"**
2. Allow camera/microphone access
3. Click **"Start Recording"**
4. 6-second auto-timer counts down
5. Add a caption and publish!

### Watch Videos
- Click any video card to open fullscreen player
- Videos loop automatically (classic Vine style!)
- Use **ESC** to close, **SPACE** to pause/play
- Like, comment, and share with one click

### Use Filters
- **🚫 No AI Content** - Show only human-created videos
- **✓ Verified Only** - Show only verified creators

## 📁 Project Structure

```
you-got-vined/
├── yougotvined-divine.html   # Frontend website
├── server.js                  # Backend API server
├── package.json              # Node.js dependencies
├── README.md                 # This file
├── GITHUB-DEPLOYMENT.md      # GitHub setup guide
├── .gitignore               # Git ignore rules
├── start-windows.bat        # Quick start (Windows)
├── start-mac-linux.sh       # Quick start (Mac/Linux)
├── uploads/                 # Video storage (auto-created)
└── videos-db.json          # Video database (auto-created)
```

## 🌐 API Endpoints

The server provides these REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/videos` | Get all videos |
| `POST` | `/api/upload` | Upload video file |
| `POST` | `/api/upload-base64` | Upload base64 video |
| `POST` | `/api/videos/:id/like` | Like a video |
| `POST` | `/api/videos/:id/comment` | Comment on video |
| `POST` | `/api/videos/:id/share` | Share a video |
| `GET` | `/api/health` | Server health check |

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **File Upload**: Multer
- **Storage**: File system + JSON database
- **Design**: Inspired by [Divine](https://divine.video)

## 🎨 Design

- Clean, modern UI with Divine-inspired aesthetics
- Signature green brand color (#27C58B)
- Bricolage Grotesque font
- Card-based layout
- Fully responsive (mobile & desktop)

## 🔒 How It Works

1. **Upload**: Videos saved to `/uploads` folder on server
2. **Database**: Metadata stored in `videos-db.json`
3. **Public Access**: All videos accessible via API
4. **Real-time**: Frontend polls for updates every 10 seconds
5. **Persistence**: Server restart preserves all videos

## 🐛 Troubleshooting

**"Could not connect to server"**
- Ensure `npm start` is running
- Check server is on http://localhost:3000
- Verify no firewall blocking port 3000

**Upload fails**
- File must be video format (MP4, MOV, WebM)
- Maximum file size: 50MB
- Check server console for errors

**Videos not appearing**
- Refresh the page
- Check browser console for errors
- Verify server is running

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

## 📮 Support

Having issues? [Open an issue](https://github.com/yourusername/you-got-vined/issues)

## 🙏 Acknowledgments

- Inspired by the classic Vine platform
- Design influenced by [Divine](https://divine.video)
- Built with ❤️ for the creator community

---

**Made by [Your Name]** | [GitHub](https://github.com/yourusername) | [Twitter](https://twitter.com/yourusername)

⭐ **Star this repo if you like it!**
