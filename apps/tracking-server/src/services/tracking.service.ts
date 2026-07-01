import { Server } from "socket.io";

import { SOCKET_EVENTS } from "../events/socket-events";
import { LocationStore } from "../stores/location-store";
import { VehicleLocation } from "../types/location";
import { SOCKET_ROOMS } from "../events/socket-events";

export class TrackingService {
  constructor(
    private readonly locationStore: LocationStore,
    private readonly io: Server
  ) {}

  updateLocation(location: VehicleLocation) {
    this.locationStore.save(location);

    ioToDashboards(this.io, location);
  }
}

function ioToDashboards(
  io: Server,
  location: VehicleLocation
) {
  io.to(SOCKET_ROOMS.DASHBOARDS).emit(
    SOCKET_EVENTS.VEHICLE_UPDATE,
    location
  );
}