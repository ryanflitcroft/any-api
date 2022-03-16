const pool = require('../utils/pool');

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
    const { rows } = await pool.query(
      `
      INSERT INTO
        albums (title, artist, year, tracks)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [title, artist, year, tracks]
    );

    return new Album(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        albums
      `
    );
    
    return rows.map((row) => new Album(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        albums
      WHERE
        id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;
    return new Album(rows[0]);
  }

  static async updateById(id, { title, artist, year, tracks }) {

  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        albums
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    if (!rows[0]) return null;
    return new Album(rows[0]);
  }
};
