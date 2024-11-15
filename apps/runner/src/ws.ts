import { WebSocket, WebSocketServer } from "ws";
import { parse } from "url";
import { fetchDir, fetchFileContent, saveFile } from "./fs";
import { saveToS3 } from "./aws";

export function initWs(ws: WebSocketServer) {
  ws.on("connection", async (socket, request) => {
    const { query } = parse(request.url!, true);
    const replId = Array.isArray(query.replId) ? query.replId[0] : query.replId;
    if (!replId) {
      socket.close();
      return;
    }
    socket.send(
      JSON.stringify({
        type: "loaded",
        files: fetchDir("/", ""),
      })
    );
    initHandler(socket, replId);
  });
}

function initHandler(socket: WebSocket, replId: string) {
  socket.on("close", () => {
    console.log("user disconnected");
    socket.close();
  });
  socket.on("message", async (event) => {
    const message = JSON.parse(event.toString());
    switch (message) {
      case "fetchDir":
        const dir = message.dir!;
        const dirPath = `/workspace/${dir}`;
        const contents = await fetchDir(dirPath, dir);
        break;
      case "fetchContent":
        const fullPath = `/workspace/${message.filePath!}`;
        const data = await fetchFileContent(fullPath);
        break;
      case "updateContent":
        const fullPath1 = `/workspace/${message.filePath}`
        await saveFile(fullPath1,message.content!);
        break;
      case "requestTerminal":
          break;
      default:
        break;
    }
  });
}
