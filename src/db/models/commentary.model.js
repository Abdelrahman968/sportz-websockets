import mongoose from "mongoose";

const commentarySchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    minute: {
      type: Number,
    },
    sequence: {
      type: Number,
    },
    period: {
      type: String,
    },
    eventType: {
      type: String,
    },
    actor: {
      type: String,
    },
    team: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      validate: {
        validator: (value) => {
          return (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            Object.getPrototypeOf(value) === Object.prototype
          );
        },
        message: "Metadata must be a valid object",
      },
    },
    tags: {
      type: [String],
      default: [],
      validate: [
        {
          validator: (tags) => tags.length <= 10,
          message: "Maximum 10 tags allowed",
        },
        {
          validator: (tags) => tags.every((tag) => tag.trim().length > 0),
          message: "Tags cannot be empty",
        },
        {
          validator: (tags) =>
            new Set(tags.map((tag) => tag.trim().toLowerCase())).size ===
            tags.length,
          message: "Duplicate tags are not allowed",
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        const { _id, __v, matchId, ...rest } = ret;

        return {
          id: _id.toString(),
          matchId,
          ...rest,
        };
      },
    },
    toObject: {
      virtuals: true,
    },
  },
);

const Commentary = mongoose.model("Commentary", commentarySchema);

export default Commentary;
