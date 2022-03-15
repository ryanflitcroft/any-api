module.exports = class Album {
  id;
  title;
  artist;
  year;
  tracks;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.year = row.year;
    this.tracks = row.tracks;
  }

  static async insert({ }) {

  }

  static async getAll() {

  }

  static async getById(id) {

  }

  static async updateById(id, { }) {

  }

  static async deleteById(id) {

  }
};
