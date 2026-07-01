import { VehicleTrackingData } from "../types/location";

export interface LocationStore {
  save(location: VehicleTrackingData): void;

  get(
    vehicleId: string
  ): VehicleTrackingData | undefined;

  getAll(): VehicleTrackingData[];
}