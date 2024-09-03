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

// Function to perform a re-roll
const shouldReroll30 = (): boolean => {
  return Math.random() < 0.3; // 30% chance
};

const shouldReroll60 = (): boolean => {
  return Math.random() < 0.6; // 60% chance
};

export const rollMachine =  async(req: RequestWithUser, res: Response) => {
  
  try {
    const user = req.user as IUser;
  
    if (user.credits <= 0) {
      return res.status(403).json({ error: 'Insufficient credits' });
    }
  
    let reel1 = getRandomSymbol();
    let reel2 = getRandomSymbol();
    let reel3 = getRandomSymbol();
  
    // If the user loses, deduct 1 credit
    let winCredits = checkWin(reel1, reel2, reel3);
  
    if (winCredits > 40 && shouldReroll30()) {
      // Re-roll the reels
      reel1 = getRandomSymbol();
      reel2 = getRandomSymbol();
      reel3 = getRandomSymbol();
  
      // Recalculate win credits after reroll
      winCredits = checkWin(reel1, reel2, reel3);
  
    } else if (winCredits > 60 && shouldReroll60()) {
      // Re-roll the reels
      reel1 = getRandomSymbol();
      reel2 = getRandomSymbol();
      reel3 = getRandomSymbol();
  
      // Recalculate win credits after reroll
      winCredits = checkWin(reel1, reel2, reel3);
    }
  
    // If the user wins, add the corresponding credits
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
  } catch (error) {
    console.error('Error processing spin:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}