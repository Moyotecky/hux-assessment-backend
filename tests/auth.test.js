const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe('User Registration and Login', () => {
  // ... existing tests

  it('should fail registration with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'invalid-email',
        password: 'Test@1234',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', '"email" must be a valid email');
  });

  it('should fail login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'WrongPassword',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
