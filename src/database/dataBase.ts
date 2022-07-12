import { Client } from 'pg'
const dotenv = require("dotenv").config()

export const client = new Client(process.env.DATABASE_URL)

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})