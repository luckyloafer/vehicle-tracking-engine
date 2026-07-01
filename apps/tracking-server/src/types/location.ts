export interface VehicleLocation {

  latitude: number;

  longitude: number;

  speed: number;

  heading: number;

  timestamp: number;
}

export interface VehicleTrackingData extends VehicleLocation {
  vehicleId: string;
}