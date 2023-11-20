import 'dotenv/config'
import express from 'express';

import { LibreLinkUpClient } from './libre-link-up-api-client/src'

if (!process.env.LIBRE_LINK_UP_USERNAME || !process.env.LIBRE_LINK_UP_PASSWORD) {
  throw new Error('Invalid credentials')
}

const { read } = LibreLinkUpClient({ 
  username: process.env.LIBRE_LINK_UP_USERNAME, 
  password: process.env.LIBRE_LINK_UP_PASSWORD 
});

const app = express();
const port = 4000;

app.get('/data', async (req, res) => {
  try {
    res.send(await read());
  } catch (error) {
    res.status(500)
    res.json({ error })
  }
});

app.get('/current', async (req, res) => {
  try {
    const data = await read()
    return data.current.value
  } catch (error) {
    res.status(500)
    res.json({ error })
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});