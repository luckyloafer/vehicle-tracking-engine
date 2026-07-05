import { VehicleTrackingData } from "../types/location";

export interface RealtimeEmitter {
  emitVehicleUpdate(location: VehicleTrackingData): void;

  emitVehicleOnline(vehicleId: string): void;

  emitVehicleOffline(vehicleId: string): void;
}