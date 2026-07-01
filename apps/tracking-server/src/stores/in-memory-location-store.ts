import { VehicleLocation, VehicleTrackingData } from "../types/location";
import { LocationStore } from "./location-store";

export class InMemoryLocationStore implements LocationStore {
  private readonly locations = new Map<string, VehicleTrackingData>();

  save(location: VehicleTrackingData): void {
    this.locations.set(location.vehicleId, location);
  }

  get(vehicleId: string): VehicleTrackingData | undefined {
    return this.locations.get(vehicleId);
  }

  getAll(): VehicleTrackingData[] {
    return [...this.locations.values()];
  }
}