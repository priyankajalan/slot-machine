import { NextFunction, Request, Response } from "express";
import { IUser, UserModel } from "../models/user";

export interface RequestWithUser extends Request{
    user?: IUser;
}

const getUser = async (req:RequestWithUser, res: Response, next: NextFunction) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });
  
    let user: IUser | null = await UserModel.findOne({ username });
  
    if (!user) {
      user = new UserModel({ username });
      await user.save();
    }
  
    req.user = user;
    next();
  };

  export {
    getUser
  }