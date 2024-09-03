import { Request, Response } from "express";
import { IUser, UserModel } from "../models/user";


const createUser =  async(req: Request, res: Response) => {
    const { username } = req.body;
    try {
        // Check if user already exists
        let existingUser: IUser | null = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Create new user with initial 10 credits
        const user = new UserModel({ username });
        await user.save();

        return res.status(201).json(user.toObject({ versionKey: false }));
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}


const findUser =  async(req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const user = await UserModel.findOne({username});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user.toObject({ versionKey: false }));
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export {
    createUser,
    findUser
}