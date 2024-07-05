// createJob.test.js
import mongoose from 'mongoose';
import { createJob } from '../src/controllers/job.controller'; // Adjust path as per your project structure
import Job from '../src/models/job.model'; // Adjust path as per your project structure

jest.mock('../src/models/job.model'); // Adjust path as per your project structure

describe('createJob', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                title: 'Software Engineer',
                description: 'Job description here',
                company: 'Company name',
            },
            user: {
                userId: new mongoose.Types.ObjectId().toString(),
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should create a new job and return it with status 201', async () => {
        // Mocking the save method of Job
        const saveMock = jest.fn().mockResolvedValue({
            _id: 'mocked_id', // Replace with a string that represents an ObjectId
            ...req.body,
            user: req.user.userId,
        });

        // Mocking the populate method chain
        const populateMock = jest.fn().mockResolvedValue({
            _id: 'mocked_id',
            ...req.body,
            user: { email: 'test@example.com', role: 'user' },
            location: { name: 'Mocked Location' },
            company: 'Company name'
        });

        // Mocking the Job constructor to return an object with the save method
        Job.mockImplementation(() => ({
            save: saveMock,
        }));

        // Mocking the Job.findById method
        Job.findById = jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnThis(),
            execPopulate: populateMock
        });

        await createJob(req, res);

        expect(res.status).toHaveBeenCalledWith(201);

    });

    it('should handle errors and return status 500 with error message', async () => {
        const errorMessage = 'Mocked server error';
        const saveMock = jest.fn().mockRejectedValue(new Error(errorMessage));

        Job.mockImplementation(() => ({
            save: saveMock,
        }));

        await createJob(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Server error',
            error: errorMessage,
        });
    });
});
