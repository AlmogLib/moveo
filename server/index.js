const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");


app.use(cors());
const port = process.env.PORT || 3001;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "PUT", "POST"],
    },
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/moveo-task/client/public/index.html'));
});

// כל נתיב אחר מוביל לנתיב הראשי
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/public/index.html'));
});

// מערך לשמירת התפקידים של המשתמשים
const roles = {};

// מקשיב לאירוע חיבור - מישהו מתחבר לאתר
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // בדיקת הגדרת המשתמש בכניסה לדף
    socket.on("checkExistence", () => {
        if (!roles[socket.id]) {
            roles[socket.id] = Object.keys(roles).length > 0 ? "kevin" : "king";
            console.log(`User is: ${roles[socket.id]}`);
            socket.emit("settings", socket.id, roles[socket.id]);
        }
    });

    // כניסה ללובי
    socket.on("enterLobby", () => {
        // מחיקת המשתמשים בלובי
        Object.keys(roles).forEach((key) => delete roles[key]);
        console.log("Lobby Entered");
    });

    // מאפסת הגדרות בעת התנתקות
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
        delete roles[socket.id];
    });

    socket.on("updateCode", ({ blockName, code }) => {
        // עדכן את הקוד של הבלוק הנוכחי בזמן אמת
        io.emit("codeUpdated", { blockName, code });
    });

});

server.listen(port, () => {
    console.log(`Server is running ${port}`);
});