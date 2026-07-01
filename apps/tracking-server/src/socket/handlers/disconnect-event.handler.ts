import { Socket } from "socket.io";

import { SocketData } from "../../types/socket-data";

export class DisconnectEventHandler {

  handle(
    socket: Socket<{}, {}, {}, SocketData>
  ) {

    socket.on("disconnect", () => {

      console.log(`${socket.id} disconnected`);

    });

  }

}