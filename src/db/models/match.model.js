import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      required: true,
    },
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    status: {
      required: true,
      type: String,
      enum: ["scheduled", "live", "finished"],
      default: "scheduled",
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    homeScore: {
      type: Number,
      default: 0,
      required: true,
    },
    awayScore: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        const { _id, __v, ...rest } = ret;

        return {
          id: _id.toString(),
          ...rest,
        };
      },
    },
    toObject: {
      virtuals: true,
    },
  },
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
