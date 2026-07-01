import { Server } from "socket.io";

import {
    SOCKET_EVENTS,
    SOCKET_ROOMS
} from "../events/socket-events";

import { PresenceService } from "./presence.service";

export class PresenceMonitorService {

    private readonly online =
        new Set<string>();

    constructor(

        private readonly io: Server,

        private readonly presence: PresenceService

    ) {}

    start() {

        setInterval(() => {

            const now = Date.now();

            for (const [vehicleId, lastSeen] of this.presence.getVehicles()) {

                const alive =
                    now - lastSeen < 15000;

                if (alive && !this.online.has(vehicleId)) {

                    this.online.add(vehicleId);

                    this.io
                        .to(SOCKET_ROOMS.DASHBOARDS)
                        .emit(
                            SOCKET_EVENTS.VEHICLE_ONLINE,
                            {
                                vehicleId
                            }
                        );

                    console.log(vehicleId, "ONLINE");

                }

                if (!alive && this.online.has(vehicleId)) {

                    this.online.delete(vehicleId);

                    this.io
                        .to(SOCKET_ROOMS.DASHBOARDS)
                        .emit(
                            SOCKET_EVENTS.VEHICLE_OFFLINE,
                            {
                                vehicleId
                            }
                        );

                    console.log(vehicleId, "OFFLINE");

                }

            }

        },5000);

    }

}