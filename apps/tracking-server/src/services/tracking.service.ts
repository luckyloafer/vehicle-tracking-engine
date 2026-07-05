import { Server } from "socket.io";

import { SOCKET_EVENTS } from "../events/socket-events";
import { LocationStore } from "../stores/location-store";
import { VehicleLocation, VehicleTrackingData } from "../types/location";
import { SOCKET_ROOMS } from "../events/socket-events";
import { RealtimeEmitter } from "../emitters/realtime-emitter";

export class TrackingService {
  constructor(
    private readonly locationStore: LocationStore,
  private readonly realtimeEmitter: RealtimeEmitter
  ) {}

  updateLocation(vehicleId: string, location: VehicleLocation) {

    const trackingData: VehicleTrackingData = {
      vehicleId,
      ...location,
    };

    this.locationStore.save(trackingData);

    this.realtimeEmitter.emitVehicleUpdate(trackingData);
  }
}