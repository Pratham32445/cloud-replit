import {WebSocketServer} from "ws";
import { initWs } from "./ws";

const wss = new WebSocketServer({port : 8080})  

initWs(wss);
