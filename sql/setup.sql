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

-- INSERT INTO
--     albums (title, artist, year, tracks)
-- VALUES
--     ('So Sad So Sexy', 'Lykke Li', 2018, ['hard rain', 'deep end', 'two nights', 'Last Piece', 'Jaguars in the Air', 'sex money feelings die', 'So Sad So Sexy', 'Better Alone', 'Bad Woman', 'Utopia'])