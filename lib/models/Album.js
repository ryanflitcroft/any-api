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

  static async insert({ title, artist, year, tracks }) {

  }

  static async getAll() {

  }

  static async getById(id) {

  }

  static async updateById(id, { title, artist, year, tracks }) {

  }

  static async deleteById(id) {

  }
};
