import { Socket } from "socket.io";

import { SOCKET_EVENTS } from "../events/socket-events";
import { TrackingService } from "../services/tracking.service";
import { VehicleLocation } from "../types/location";
import { AckResponse } from "../types/socket";
import { validateLocation } from "../middleware/validate-location"
import { SocketData } from "../types/socket-data";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from "../types/socket-events";

export class SocketHandler {
  constructor(private readonly trackingService: TrackingService) {}

  handleConnection(socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) {
    console.log(`Connected : ${socket.id}`);

    socket.on(
      SOCKET_EVENTS.LOCATION_UPDATE,
      (data:unknown, callback?: (response: AckResponse) => void) => {

        const result = validateLocation(data);

        if (!result.success) {

          callback?.({
            success: false,
            message: result.error.issues[0].message,
          });

          return;
        }
        const vehicleId = socket.data.vehicleId!;
        this.trackingService.updateLocation(vehicleId, result.data);

        callback?.({
          success: true,
          message: "Location Updated",
        });
      }
    );

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log(`Disconnected : ${socket.id}`);
    });
  }
}