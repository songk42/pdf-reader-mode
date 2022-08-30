let io;

const sessionToSocketMap = {}; // maps session ID to socket object
const socketToSessionMap = {}; // maps socket ID to session object

const getSocketFromSessionID = (sessionidid) => sessionToSocketMap[sessionidid];
const getSessionFromSocketID = (socketid) => socketToSessionMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const addSession = (sessionid, socket) => {
  const oldSocket = sessionToSocketMap[sessionid];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this sessionid, force it to disconnect
    oldSocket.disconnect();
    delete socketToSessionMap[oldSocket.id];
  }

  sessionToSocketMap[sessionId] = socket;
  socketToSessionMap[socket.id] = sessionid;
};

const removeSession = (sessionid, socket) => {
  delete sessionToSocketMap[sessionid];
  delete socketToSessionMap[socket.id];
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const sessionid = getSessionFromSocketID(socket.id);
        removeUser(sessionid, socket);
      });
    });
  },

  addSession: addSession,
  removeSession: removeSession,

  getSocketFromSessionID: getSocketFromSessionID,
  getSessionFromSocketID: getSessionFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getIo: () => io,
};
