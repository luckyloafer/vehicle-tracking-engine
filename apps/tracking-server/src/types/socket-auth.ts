export interface DriverAuth {
  type: "driver";
  vehicleId: string;
}

export interface DashboardAuth {
  type: "dashboard";
}

export type SocketAuth = DriverAuth | DashboardAuth;