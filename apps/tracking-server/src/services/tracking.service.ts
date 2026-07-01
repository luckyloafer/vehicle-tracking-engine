import { Server } from "socket.io";

import { SOCKET_EVENTS } from "../events/socket-events";
import { LocationStore } from "../stores/location-store";
import { VehicleLocation } from "../types/location";

export class TrackingService {
  constructor(
    private readonly locationStore: LocationStore,
    private readonly io: Server
  ) {}

  updateLocation(location: VehicleLocation) {
    this.locationStore.save(location);

    this.io.emit(SOCKET_EVENTS.VEHICLE_UPDATE, location);
  }
}