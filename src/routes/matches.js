import { Router } from "express";
import { createMatchSchema } from "../validation/matches.js";
import matchRepository from "../db/repository/match.repository.js";
import { getMatchStatus } from "../utils/match-status.js";

export const matchesRouter = Router();

matchesRouter.get("/", async (_req, res) => {
  try {
    const matches = await matchRepository.findAll();
    res.status(200).json({
      success: true,
      message: "Matches retrieved successfully",
      matches,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving matches", error });
  }
});

matchesRouter.post("/create", async (req, res) => {
  const parsed = createMatchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.issues.map((i) => ({
        code: i.code,
        field: i.path.join("."),
        message: i.message,
      })),
    });
  }

  try {
    const { status, startTime, endTime, ...data } = parsed.data;

    const match = await matchRepository.create({
      ...data,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: getMatchStatus(startTime, endTime),
    });

    res.status(201).json({ success: true, message: "Match created", match });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error creating match", error: err });
  }
});
