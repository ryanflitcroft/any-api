const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Album = require('../lib/models/Album');
const albums = require('../lib/controllers/albums');

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


  it('should be able to create an instance of Album', async () => {
    const res = await request(app)
      .post('/api/v1/albums')
      .send({
        title: 'So Sad So Sexy',
        artist: 'Lykke Li',
        year: 2018,
        tracks: ['hard rain', 'deep end', 'two nights', 'Last Piece', 'Jaguars in the Air', 'sex money feelings die', 'So Sad So Sexy', 'Better Alone', 'Bad Woman', 'Utopia']
      });
    
    expect(res.body).toEqual(
      {
        id: expect.any(String),
        title: 'So Sad So Sexy',
        artist: 'Lykke Li',
        year: 2018,
        tracks: ['hard rain', 'deep end', 'two nights', 'Last Piece', 'Jaguars in the Air', 'sex money feelings die', 'So Sad So Sexy', 'Better Alone', 'Bad Woman', 'Utopia']
      }
    );
  });

  it('should be able to list all albums', async () => {
    await Album.insert({
      title: 'Honey',
      artist: 'Robyn',
      year: 2018,
      tracks: ['Missing U', 'Human Being', 'Because Its In The Music', 'Baby Forgive Me', 'Send To Robin Immediately', 'Honey', 'Between The Lines', 'Beach 2k20', 'Ever Again']
    });
    const res = await request(app).get('/api/v1/albums');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'Honey',
        artist: 'Robyn',
        year: 2018,
        tracks: ['Missing U', 'Human Being', 'Because Its In The Music', 'Baby Forgive Me', 'Send To Robin Immediately', 'Honey', 'Between The Lines', 'Beach 2k20', 'Ever Again']
      }
    ]);
  });

  it('should be able to list an album by its id', async () => {
    const album = await Album.insert({
      title: 'FROOT',
      artist: 'Marina',
      year: 2015,
      tracks: ['Happy', 'FROOT', 'Im a Ruin', 'Blue', 'Forget', 'Gold', 'Cant Pin Me Down', 'Solitaire', 'Better Than That', 'Weeds', 'Savages', 'Immortal']
    });
    const res = await request(app).get(`/api/v1/albums/${album.id}`);

    expect(res.body).toEqual(album);
  });

  it('should be able to delete an album by its id', async () => {
    const album = await Album.insert({
      title: '1989',
      artist: 'Taylor Swift',
      year: 2014,
      tracks: ['Welcome TO New York', 'Blank Space', 'Style', 'Out Of the Woods', 'All You Had To Do Was Stay', 'Shake It Off', 'I Wish You Would', 'Bad Blood', 'Wildest Dreams', 'How You Get the Girl', 'This Love', 'I Know Places', 'Clean']
    });
    const res = await request(app).delete(`/api/v1/albums/${album.id}`);

    expect(res.body).toEqual(album);
    expect(await Album.getById(album.id)).toBeNull();
  });
});
