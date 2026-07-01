export const SOCKET_EVENTS = {
    CONNECTION: "connection",

    LOCATION_UPDATE: "location:update",

    VEHICLE_UPDATE: "vehicle:update",

    DISCONNECT: "disconnect"
} as const;

export const SOCKET_ROOMS = {
  DRIVERS: "drivers",
  DASHBOARDS: "dashboards",
} as const;