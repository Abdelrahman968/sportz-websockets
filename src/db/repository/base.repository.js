export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    return this.model.create(data);
  }

  findById(id) {
    return this.model.findById(id);
  }

  findAll(limit = 0, sortBy = "createdAt") {
    const query = this.model.find().sort({ [sortBy]: -1 });

    return limit > 0 ? query.limit(limit) : query;
  }

  findOne(filter, options = {}) {
    let query = this.model.findOne(filter);

    if (options.select) {
      query = query.select(options.select);
    }

    return query;
  }
  findOneAndUpdate(filter, update, options = {}) {
    return this.model.findOneAndUpdate(filter, update, {
      new: true,
      ...options,
    });
  }

  findByIdAndUpdate(id, update, options = {}) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  updateMany(filter, update) {
    return this.model.updateMany(filter, update);
  }

  deleteMany(filter) {
    return this.model.deleteMany(filter);
  }

  findByIdAndDelete(id) {
    return this.model.findByIdAndDelete(id);
  }

  save(document) {
    return document.save();
  }

  async exists(filter) {
    return Boolean(await this.model.exists(filter));
  }
}
