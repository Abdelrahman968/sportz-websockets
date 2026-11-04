import {
  mongooseConnect,
  mongooseDisconnect,
} from "../../db/mongoose.connect.js";
import commentaryRepository from "../../db/repository/commentary.repository.js";
import matchRepository from "../../db/repository/match.repository.js";

const createMockDataForMatch = async () => {
  const startTime = new Date();

  const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);

  return await matchRepository.create({
    sport: "football",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    status: "scheduled",
    startTime,
    endTime,
    homeScore: 0,
    awayScore: 0,
  });
};

const createMockDataForCommentary = async (matchId) => {
  return await commentaryRepository.create({
    matchId,
    minute: 10,
    sequence: 1,
    period: 1,
    eventType: "goal",
    actor: "player",
    team: "Real Madrid",
    message: "TestMessage",
    metadata: {
      player: "TestPlayer",
      assist: "TestAssist",
    },
    tags: ["TestTag", "TestTag2", "TestTag3"],
  });
};

const seedMockData = async () => {
  try {
    await mongooseConnect();

    const match = await createMockDataForMatch();

    const commentary = await createMockDataForCommentary(match._id);

    console.log("Mock data created successfully!");
    console.log({ match, commentary });
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongooseDisconnect();
  }
};

seedMockData();
