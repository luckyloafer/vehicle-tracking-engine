import { Server as HttpServer } from "http";
import { Server } from "socket.io";

export function createSocketServer(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket Connected : ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Socket Disconnected : ${socket.id}`);
    });
  });

  return io;
}