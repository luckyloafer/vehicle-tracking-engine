import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { TrackingService } from "../services/tracking.service";
import { PresenceService } from "../services/presence.service";
import { SocketHandler } from "./socket-handler";
import { InMemoryLocationStore } from "../stores/in-memory-location-store";
import { SocketAuth } from "../types/socket-auth";
import { SOCKET_ROOMS } from "../events/socket-events";
import { SocketData } from "../types/socket-data";
import { LocationEventHandler } from "./handlers/location-event.handler";
import { DisconnectEventHandler } from "./handlers/disconnect-event.handler";
import { ConnectionHandler } from "./handlers/connection.handler";
import { HeartbeatEventHandler } from "./handlers/heartbeat-event.handler";
import { PresenceMonitorService } from "../services/presence-monitor.service";
import { Container } from "../container/container";

export function createSocketServer(server: HttpServer) {
  const io = new Server<SocketData>(server, {
    cors: {
      origin: "*",
    },
  });

  const container = new Container(io);

  container.presenceMonitor.start();

  io.use((socket, next) => {
    const auth = socket.handshake.auth as SocketAuth;

    if (!auth.type) {
      return next(new Error("Unauthorized"));
    }

    if (auth.type === "driver") {
      socket.data.vehicleId = auth.vehicleId;
      socket.join(SOCKET_ROOMS.DRIVERS);
    }

    if (auth.type === "dashboard") {
      socket.join(SOCKET_ROOMS.DASHBOARDS);
    }

    next();
  });

  io.on("connection", (socket) => {
    container.connectionHandler.handle(socket);
  });

  return io;
}