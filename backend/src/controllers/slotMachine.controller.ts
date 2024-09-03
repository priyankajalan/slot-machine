import { Request, Response } from "express";
import { IUser } from "../models/user";
import { RequestWithUser } from "../middlewares/user.middleware";

const symbols = ['C', 'L', 'O', 'W'];


const symbolCredits: {[key: string]: number} = {
  'C': 10,
  'L': 20,
  'O': 30,
  'W': 40,
};

const getRandomSymbol = () => {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
};

const checkWin = (reel1: string, reel2: string, reel3: string): number => {
  if (reel1 === reel2 && reel2 === reel3) {
    return symbolCredits[reel1] || 0;
  }
  return 0;
};

export const rollMachine =  async(req: RequestWithUser, res: Response) => {
    
  const user = req.user as IUser;

  if (user.credits <= 0) {
    return res.status(403).json({ error: 'Insufficient credits' });
  }
  
  const reel1 = getRandomSymbol();
  const reel2 = getRandomSymbol();
  const reel3 = getRandomSymbol();

  // If the user loses, deduct 1 credit
  const winCredits = checkWin(reel1, reel2, reel3);
  if (winCredits > 0) {
    user.credits += winCredits;
  } else {
    // If the user loses, deduct 1 credit
    user.credits -= 1;
  }

  await user.save();

  res.json({
    reel1,
    reel2,
    reel3,
    isWin: winCredits > 0,
    message: winCredits > 0 ? `You win ${winCredits} credits!` : 'Try Again!',
    credits: user.credits,
  });
}