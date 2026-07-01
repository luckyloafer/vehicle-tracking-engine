import { VehicleLocation } from "../types/location";
import { LocationStore } from "./location-store";

export class InMemoryLocationStore implements LocationStore {
  private readonly locations = new Map<string, VehicleLocation>();

  save(location: VehicleLocation): void {
    this.locations.set(location.vehicleId, location);
  }

  get(vehicleId: string): VehicleLocation | undefined {
    return this.locations.get(vehicleId);
  }

  getAll(): VehicleLocation[] {
    return [...this.locations.values()];
  }
}