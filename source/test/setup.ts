import request from 'supertest';

beforeAll(async () => {
  process.env.ACCESS_TOKEN! = '23wq';
  process.env.REFRESH_TOKEN! = '45fa';
});
