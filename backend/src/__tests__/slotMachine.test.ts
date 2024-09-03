import request from 'supertest';
import app from '../app';
import { UserModel,  IUser } from '../models/user';

jest.mock('../models/User');

describe('Slot Machine API',() => {
    const mockFindOne = UserModel.findOne as jest.Mock;
    const mockSave = jest.fn();

    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('should deduct 1 credit on a losing spin', async () => {
        const username = 'priyanka1';
        mockFindOne.mockResolvedValue({
            username,
            credits: 10,
            save: mockSave,
        });
        const response = await request(app).post('/roll').send({ username });
        expect(mockFindOne).toHaveBeenCalledWith({ username });
        expect(mockSave).toHaveBeenCalled();
        expect(response.body.credits).toBe(9);
    })

    it('should award credits correctly on a winning spin', async () => {
        const username = 'priyanka2';
        mockFindOne.mockResolvedValue({
            username,
            reel1: "L",
            reel2: "L",
            reel3: "L",
            isWin: true,
            message: "You win 20 credits!",
            credits: 30,
            save: mockSave,
        });
        const response = await request(app).post('/roll').send({ username });
        expect(mockFindOne).toHaveBeenCalledWith({ username });
        expect(mockSave).toHaveBeenCalled();
        expect(response.body.credits).toBeGreaterThan(10); 
    })

    it('should re-roll if the user has more than 40 credits', async () => {
        const username = 'priyanka3';
        mockFindOne.mockResolvedValue({
            username,
            credits: 45,
            save: mockSave,
        });
        jest.spyOn(Math, 'random').mockReturnValueOnce(0.2);
        const response = await request(app).post('/roll').send({ username });
        expect(mockFindOne).toHaveBeenCalledWith({ username });
        expect(response.body.credits).not.toBe(45); 
    })

    it('should re-roll if the user has more than 60 credits', async () => {
        const username = 'priyanka3';
        mockFindOne.mockResolvedValue({
            username,
            credits: 68,
            save: mockSave,
        });
        jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
        const response = await request(app).post('/roll').send({ username });
        expect(mockFindOne).toHaveBeenCalledWith({ username });
        expect(response.body.credits).not.toBe(68); 
    })

    it('should return 403 if user has insufficient credits', async () => {
        const username = 'priyanka4';
        mockFindOne.mockResolvedValue({
            username,
            credits: 0,
            save: mockSave,
        });
        const response = await request(app).post('/roll').send({ username });

        expect(mockFindOne).toHaveBeenCalledWith({ username });
        expect(response.status).toBe(403);
        expect(response.body.error).toBe('Insufficient credits');
    })

})