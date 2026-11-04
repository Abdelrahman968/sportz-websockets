import Match from "../models/match.model.js";
import BaseRepository from "./base.repository.js";

class MatchRepository extends BaseRepository {
  constructor() {
    super(Match);
  }
}

export default new MatchRepository();
