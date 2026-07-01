import { createServer } from "http";
import { Server } from "socket.io";

import { buildApp } from "./app";
import { env } from "./config/env";
import { Logger } from "./logger/logger";
import { createSocketServer } from "./socket/socket";

async function bootstrap() {

  const app = buildApp();

  createSocketServer(app.server);

  await app.listen({
    port: env.PORT,
    host: "0.0.0.0",
  });

    Logger.info(`Tracking Server Running On ${env.PORT}`);
}

bootstrap().catch((error) => {
    Logger.error(`Server failed to start: ${error}`);
    process.exit(1);
});