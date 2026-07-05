import { Server } from "socket.io";

import {
  SOCKET_EVENTS,
  SOCKET_ROOMS,
} from "../events/socket-events";

import { VehicleTrackingData } from "../types/location";
import { RealtimeEmitter } from "./realtime-emitter";

export class SocketRealtimeEmitter
  implements RealtimeEmitter
{
  constructor(
    private readonly io: Server
  ) {}

  emitVehicleUpdate(
    location: VehicleTrackingData
  ): void {
    this.io
      .to(SOCKET_ROOMS.DASHBOARDS)
      .emit(
        SOCKET_EVENTS.VEHICLE_UPDATE,
        location
      );
  }

  emitVehicleOnline(
    vehicleId: string
  ): void {
    this.io
      .to(SOCKET_ROOMS.DASHBOARDS)
      .emit(
        SOCKET_EVENTS.VEHICLE_ONLINE,
        {
          vehicleId,
        }
      );
  }

  emitVehicleOffline(
    vehicleId: string
  ): void {
    this.io
      .to(SOCKET_ROOMS.DASHBOARDS)
      .emit(
        SOCKET_EVENTS.VEHICLE_OFFLINE,
        {
          vehicleId,
        }
      );
  }
}