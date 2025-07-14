const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// ✅ Handle page change
ipcMain.on("load-page", (event, page) => {
    win.loadFile(page);
});

// ✅ Handle screenshot capture
ipcMain.handle("take-screenshot", async () => {
    try {
        const image = await win.webContents.capturePage();
        const buffer = image.toPNG();

        const { canceled, filePath } = await dialog.showSaveDialog({
            title: "Save Screenshot",
            defaultPath: "feeling.png",
            filters: [{ name: "Images", extensions: ["png"] }],
        });

        if (canceled) {
            return { success: false, error: "Save canceled" };
        }

        fs.writeFileSync(filePath, buffer);
        return { success: true, path: filePath };
    } catch (error) {
        console.error("Screenshot error:", error);
        return { success: false, error: error.message };
    }
});

// ✅ Quit app after screenshot (if user chooses)
ipcMain.on("quit-app", () => {
    app.quit();
});

