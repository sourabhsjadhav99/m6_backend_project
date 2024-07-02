
// tests/auth.test.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signup, signin, signout } from '../src/controllers/user.controller';
import User from '../src/models/user.model'; // Adjust the path as per your project structure

jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

jest.mock('../src/models/user.model.js');
describe('Auth Controller', () => {
  let req, res;

beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };

    // Clear mock calls for each test
    bcrypt.compare.mockClear();
    jwt.sign.mockClear();
    bcrypt.hash.mockClear()
    User.findOne.mockClear();
    User.prototype.save.mockClear();
  });

  describe('signup', () => {
    it('should create a new user and return status 201', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
      };

      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockResolvedValue(); // Mock save to resolve successfully

      await signup(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });

    it('should return status 400 if user already exists', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
      };

      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });

    it('should handle server errors and return status 500', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
      };

      User.findOne.mockRejectedValue(new Error('Database error'));

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: 'Database error' });
    });
  });

  describe('signin', () => {
    it('should sign in user and return status 200 with token', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password',
      };

      const mockUser = { _id: 'user_id', email: 'test@example.com', password: 'hashedPassword' };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mocked.token');

      await signin(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(res.cookie).toHaveBeenCalledWith('token', 'mocked.token', { httpOnly: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Sign in successful' });
    });

    it('should return status 400 for invalid credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password',
      };

      User.findOne.mockResolvedValue(null); // User not found

      await signin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should handle server errors and return status 500', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password',
      };

      User.findOne.mockRejectedValue(new Error('Database error'));

      await signin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: 'Database error' });
    });
  });

  describe('signout', () => {
    it('should sign out user and return status 200', async () => {
      await signout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith('token');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Logged out successfully' });
    });

    it('should handle server errors and return status 500', async () => {
      // Mock any potential error in clearCookie or other operations
      res.clearCookie.mockImplementation(() => { throw new Error('Clear cookie error'); });

      await signout(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: 'Clear cookie error' });
    });
  });
});
