import express from "express";
import helmet from "helmet";
import { matchesRouter } from "./routes/matches.js";

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/matches", matchesRouter);

export default app;
