const diskdb = require('diskdb');

/* eslint-disable class-methods-use-this */
class DBWrapper {
  constructor() {
    this.diskdb = diskdb.connect(`${ process.cwd() }/dbWrapper/db`, [ 'projects', 'transcripts', 'annotations', 'labels', 'paperedits' ]);
  }

  getAll(model, id) {
    if (id) {
      return this.diskdb[model].find({ ...id });
    }

    return this.diskdb[model].find();
  }

  get(model, id) {
    return this.diskdb[model].findOne({ ...id });
  }

  create(model, data) {
    return this.diskdb[model].save(data);
  }

  update(model, id, data) {
    return this.diskdb[model].update({ ...id }, { ...data }, {
      multi: false, // update multiple - default false
      upsert: false, // if object is not found, add it (update-insert) - default false
    });
  }

  delete(model, id) {
    // remove only the first match
    return this.diskdb[model].remove({ ...id }, false);
  }
}
const db = new DBWrapper();
Object.freeze(db);
module.exports = db;
