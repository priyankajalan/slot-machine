import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose';

import { rollMachine } from './controllers/slotMachine.controller'
import { getUser } from './middlewares/user.middleware';

const app = express()

app.use(express.json())
app.use(cors())

// MongoDB Connection
mongoose.connect('mongodb+srv://fileapp:test@cluster0.vj1opyu.mongodb.net/slot_machine')
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.post(`/roll`, getUser, rollMachine)

app.post(`/cashout`, async (req, res) => {
  // initiate a cashout
})

app.get(`/accounts/:id`, async (req, res) => {
  // const result = await prisma.account.findFirst({
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  // res.json(result)
})

app.post(`/accounts`, async (req, res) => {
  // const result = await prisma.account.create({
  //   data: {
  //     ...req.body,
  //   },
  // })
  // res.status(201).json(result)
})

export default app
