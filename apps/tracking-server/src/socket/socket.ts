import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { TrackingService } from "../services/tracking.service";
import { SocketHandler } from "./socket-handler";
import { InMemoryLocationStore } from "../stores/in-memory-location-store";

export function createSocketServer(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  const locationStore = new InMemoryLocationStore();

  const trackingService = new TrackingService(locationStore, io);

  const socketHandler = new SocketHandler(trackingService);

  io.on("connection", (socket) => {
    socketHandler.handleConnection(socket);
  });

  return io;
}