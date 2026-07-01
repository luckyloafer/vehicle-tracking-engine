import { Server } from "socket.io";

import { InMemoryLocationStore } from "../stores/in-memory-location-store";
import { TrackingService } from "../services/tracking.service";
import { PresenceService } from "../services/presence.service";
import { PresenceMonitorService } from "../services/presence-monitor.service";

import { LocationEventHandler } from "../socket/handlers/location-event.handler";
import { DisconnectEventHandler } from "../socket/handlers/disconnect-event.handler";
import { HeartbeatEventHandler } from "../socket/handlers/heartbeat-event.handler";
import { ConnectionHandler } from "../socket/handlers/connection.handler";

export class Container {
  readonly trackingService: TrackingService;
  readonly presenceService: PresenceService;
  readonly presenceMonitor: PresenceMonitorService;
  readonly connectionHandler: ConnectionHandler;

  constructor(io: Server) {
    const locationStore = new InMemoryLocationStore();

    this.presenceService = new PresenceService();

    this.trackingService = new TrackingService(
      locationStore,
      io
    );

    this.presenceMonitor = new PresenceMonitorService(
      io,
      this.presenceService
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