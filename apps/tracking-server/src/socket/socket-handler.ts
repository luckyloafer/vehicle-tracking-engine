import { Socket } from "socket.io";

import { SOCKET_EVENTS } from "../events/socket-events";
import { TrackingService } from "../services/tracking.service";
import { VehicleLocation } from "../types/location";

export class SocketHandler {
  constructor(private readonly trackingService: TrackingService) {}

  handleConnection(socket: Socket) {
    console.log(`Connected : ${socket.id}`);

    socket.on(
      SOCKET_EVENTS.LOCATION_UPDATE,
      (location: VehicleLocation) => {
        this.trackingService.updateLocation(location);
      }
    );

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log(`Disconnected : ${socket.id}`);
    });
  }
}