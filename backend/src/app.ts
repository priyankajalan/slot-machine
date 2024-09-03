import express from 'express'
import cors from 'cors'

import { rollMachine } from './controllers/slotMachine.controller'
import { getUser } from './middlewares/user.middleware';

const app = express()

app.use(express.json())
app.use(cors())


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
