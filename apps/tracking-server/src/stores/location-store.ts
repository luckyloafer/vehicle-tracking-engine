import { VehicleLocation } from "../types/location";

export interface LocationStore {
  save(location: VehicleLocation): void;

  get(vehicleId: string): VehicleLocation | undefined;

  getAll(): VehicleLocation[];
}