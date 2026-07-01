import { Socket } from "socket.io";

import { SocketData } from "../../types/socket-data";

import { LocationEventHandler } from "./location-event.handler";
import { HeartbeatEventHandler } from "./heartbeat-event.handler";
import { DisconnectEventHandler } from "./disconnect-event.handler";

export class ConnectionHandler {

  constructor(

    private readonly locationHandler: LocationEventHandler,

    private readonly heartbeatHandler: HeartbeatEventHandler,

    private readonly disconnectHandler: DisconnectEventHandler,

  ) {}

  handle(
    socket: Socket<{}, {}, {}, SocketData>
  ) {

    console.log(`${socket.id} connected`);

    this.locationHandler.handle(socket);

    this.heartbeatHandler.handle(socket);

    this.disconnectHandler.handle(socket);

  }

}