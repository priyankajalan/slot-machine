import express from 'express'
import cors from 'cors'

import { rollMachine } from './controllers/slotMachine.controller'
import { getUser } from './middlewares/user.middleware';
import { createUser, findUser } from './controllers/user.controller';

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true, limit: "16kb"}))


app.post(`/roll`, getUser, rollMachine)

app.post(`/cashout`, async (req, res) => {
  // initiate a cashout
})

app.get(`/accounts/:username`, findUser)

app.post(`/accounts`, createUser)

export default app
