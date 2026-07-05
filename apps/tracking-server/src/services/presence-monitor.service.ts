import { Server } from "socket.io";
import { PresenceService } from "./presence.service";
import { RealtimeEmitter } from "../emitters/realtime-emitter";

export class PresenceMonitorService {

    private readonly online =
        new Set<string>();

    constructor(

        private readonly presence: PresenceService,

        private readonly realtimeEmitter: RealtimeEmitter

    ) {}

    start() {

        setInterval(() => {

            const now = Date.now();

            for (const [vehicleId, lastSeen] of this.presence.getVehicles()) {

                const alive =
                    now - lastSeen < 15000;

                if (alive && !this.online.has(vehicleId)) {

                    this.online.add(vehicleId);

                    this.realtimeEmitter.emitVehicleOnline(vehicleId);

                    console.log(vehicleId, "ONLINE");

                }

                if (!alive && this.online.has(vehicleId)) {

                    this.online.delete(vehicleId);

                    this.realtimeEmitter.emitVehicleOffline(vehicleId);

                    console.log(vehicleId, "OFFLINE");

                }

            }

        },5000);

    }

}