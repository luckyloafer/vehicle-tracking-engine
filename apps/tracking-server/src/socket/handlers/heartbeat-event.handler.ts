import { Socket } from "socket.io";

import { PresenceService } from "../../services/presence.service";

import { SocketData } from "../../types/socket-data";

export class HeartbeatEventHandler {

    constructor(

        private readonly presenceService: PresenceService

    ) {}

    handle(
        socket: Socket<any, any, any, SocketData>
    ) {

        socket.on(
            "heartbeat",
            () => {

                this.presenceService.update(
                    socket.data.vehicleId!
                );

                console.log(
                    "Online:",
                    this.presenceService.isOnline(socket.data.vehicleId!)
                );

            }
        );

    }

}