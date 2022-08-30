import {socketIOClient, connect} from "socket.io-client";
import { post } from "./utilities";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = connect(endpoint, { withCredentials: true, rejectUnauthorized: false });
socket.on("connect", () => {
  post("/api/initsocket", { socketid: socket.id });
});
// socket.on("connect_error", function(e){ 	console.log("connect_error", e); });