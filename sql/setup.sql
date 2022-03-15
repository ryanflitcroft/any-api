-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS albums;

CREATE TABLE albums (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    year SMALLINT,
    tracks TEXT []
);