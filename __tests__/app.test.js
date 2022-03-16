const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Album = require('../lib/models/Album');

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
});
