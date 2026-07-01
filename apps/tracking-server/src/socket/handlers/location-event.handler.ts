import { Socket } from "socket.io";

import { validateLocation } from "../../middleware/validate-location";
import { TrackingService } from "../../services/tracking.service";
import { SocketData } from "../../types/socket-data";
import { AckResponse } from "../../types/socket";
import { VehicleLocation } from "../../types/location";
import { SOCKET_EVENTS } from "../../events/socket-events";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from "../../types/socket-events";

export class LocationEventHandler {
  constructor(
    private readonly trackingService: TrackingService
  ) {}

  handle(
    socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
  ) {
    socket.on(
      SOCKET_EVENTS.LOCATION_UPDATE,
      (
        payload: unknown,
        ack?: (response: AckResponse) => void
      ) => {

        const result = validateLocation(payload);

        if (!result.success) {

          ack?.({
            success: false,
            message: result.error.issues[0].message,
          });

          return;
        }

        this.trackingService.updateLocation(
          socket.data.vehicleId!,
          result.data as VehicleLocation
        );

        ack?.({
          success: true,
          message: "OK",
        });

      }
    );
  }
}