import app from "./src/app.js";

const PORT = 3000;

const startServer = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received. Shutting down...`);
      server.close(async () => {
        const results = await Promise.allSettled([
          new Promise((resolve) => setTimeout(resolve, 1000)),
          new Promise((resolve) => setTimeout(resolve, 2000)),
          new Promise((resolve) => setTimeout(resolve, 3000)),
        ]);

        results.forEach((result) => {
          if (result.status === "rejected") {
            console.error("Shutdown failed: " + result.reason);
          }
        });

        console.log("Server shutdown complete.");
        process.exit(
          results.some((result) => result.status === "rejected") ? 1 : 0,
        );
      });

      process.on("SIGINT", () => shutdown("SIGINT"));
      process.on("SIGTERM", () => shutdown("SIGTERM"));
    };
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
