import { VehicleLocation, VehicleTrackingData } from "./location";
import { AckResponse } from "./socket";

export interface ClientToServerEvents {
  "location:update": (
    location: VehicleLocation,
    ack?: (response: AckResponse) => void
  ) => void;
}

export interface ServerToClientEvents {
  "vehicle:update": (location: VehicleTrackingData) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  vehicleId?: string;
}