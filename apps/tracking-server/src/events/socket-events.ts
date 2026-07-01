export const SOCKET_EVENTS = {
    CONNECTION: "connection",

    LOCATION_UPDATE: "location:update",

    VEHICLE_UPDATE: "vehicle:update",

    HEARTBEAT: "heartbeat",

    VEHICLE_ONLINE: "vehicle:online",

    VEHICLE_OFFLINE: "vehicle:offline",

    DISCONNECT: "disconnect"
} as const;

export const SOCKET_ROOMS = {
  DRIVERS: "drivers",
  DASHBOARDS: "dashboards",
} as const;