import app from "./src/app.js";
import {
  mongooseConnect,
  mongooseDisconnect,
} from "./src/db/mongoose.connect.js";
import http from "node:http";
import { attachWebSocketServer } from "./src/ws/server.js";

const PORT = 3000;
const HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await mongooseConnect();

    const server = http.createServer(app);

    const { broadcastMatchCreated, wss } = attachWebSocketServer(server);
    app.locals.broadcastMatchCreated = broadcastMatchCreated;

    server.listen(PORT, HOST, () => {
      const baseUrl =
        HOST === "0.0.0.0"
          ? `http://localhost:${PORT}`
          : `http://${HOST}:${PORT}`;
      console.log(`Server is running on ${baseUrl}`);
      console.log(
        `WebSocket is running on ${baseUrl.replace("http", "ws")}/ws`,
      );
    });

    let isShuttingDown = false;

    const shutdown = async (signal) => {
      if (isShuttingDown) return;

      isShuttingDown = true;

      console.log(`${signal} received. Shutting down...`);

      try {
        wss.clients.forEach((client) => {
          client.close(1001, "Server shutting down");
        });

        wss.close();

        await new Promise((resolve, reject) => {
          server.close((error) => {
            if (error) reject(error);
            else resolve();
          });
        });

        await mongooseDisconnect();

        console.log("Server shutdown complete.");
        process.exitCode = 0;
      } catch (err) {
        console.error("Shutdown failed:", err);
        process.exitCode = 1;
      }

      process.on("SIGINT", () => shutdown("SIGINT"));
      process.on("SIGTERM", () => shutdown("SIGTERM"));
    };
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

startServer();
