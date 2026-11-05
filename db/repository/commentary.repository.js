import Commentary from "../models/commentary.model.js";
import BaseRepository from "./base.repository.js";

class CommentaryRepository extends BaseRepository {
  constructor() {
    super(Commentary);
  }
}

export default new CommentaryRepository();
