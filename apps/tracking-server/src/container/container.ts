import { Server } from "socket.io";

import { InMemoryLocationStore } from "../stores/in-memory-location-store";
import { TrackingService } from "../services/tracking.service";
import { PresenceService } from "../services/presence.service";
import { PresenceMonitorService } from "../services/presence-monitor.service";

import { LocationEventHandler } from "../socket/handlers/location-event.handler";
import { DisconnectEventHandler } from "../socket/handlers/disconnect-event.handler";
import { HeartbeatEventHandler } from "../socket/handlers/heartbeat-event.handler";
import { ConnectionHandler } from "../socket/handlers/connection.handler";
import { SocketRealtimeEmitter } from "../emitters/socket-realtime-emitter";

export class Container {
  readonly trackingService: TrackingService;
  readonly presenceService: PresenceService;
  readonly presenceMonitor: PresenceMonitorService;
  readonly connectionHandler: ConnectionHandler;

  constructor(io: Server) {
    const locationStore = new InMemoryLocationStore();

    this.presenceService = new PresenceService();

    const realtimeEmitter = new SocketRealtimeEmitter(io);

    this.trackingService = new TrackingService(
      locationStore,
      realtimeEmitter
    );

    this.presenceMonitor = new PresenceMonitorService(
      this.presenceService,
      realtimeEmitter
    );

    const locationHandler =
      new LocationEventHandler(this.trackingService);

    const heartbeatHandler =
      new HeartbeatEventHandler(this.presenceService);

    const disconnectHandler =
      new DisconnectEventHandler();

    this.connectionHandler =
      new ConnectionHandler(
        locationHandler,
        heartbeatHandler,
        disconnectHandler
      );
  }
}