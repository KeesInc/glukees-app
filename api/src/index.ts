import 'dotenv/config'
import express from 'express'
import http from 'http'
import cache from 'memory-cache'
import { Server } from 'socket.io'

import { LibreLinkUpClient } from './libre-link-up-api-client/src'

if (!process.env.LIBRE_LINK_UP_USERNAME || !process.env.LIBRE_LINK_UP_PASSWORD) {
  throw new Error('Invalid credentials')
}

const { read } = LibreLinkUpClient({ 
  username: process.env.LIBRE_LINK_UP_USERNAME, 
  password: process.env.LIBRE_LINK_UP_PASSWORD 
});

const getDataFromCache = async () => {
  const cachedData = cache.get('data');
  if (cachedData) {
    return cachedData;
  }

  // If data is not in cache, fetch it from the source
  const data = await read();

  // Store data in cache for future use
  cache.put('data', data, 60000); // Cache for 60 seconds

  return data;
}

const app = express();
const server = http.createServer(app)
const port = 4000;

app.get('/data', async (req, res) => {
  try {
    res.json(await getDataFromCache());
  } catch (error) {
    res.status(500)
    res.json({ error })
  }
});

app.get('/current', async (req, res) => {
  try {
    const data = await getDataFromCache()
    res.json({ value: data.current.value })
  } catch (error) {
    res.status(500)
    res.json({ error })
  }
});

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

const io = new Server(server, { 
  cors: {
    origin: "http://localhost:3000"
  }
})

setInterval(async () => {
  if (!io.engine.clientsCount) return
  const data = await getDataFromCache()
  io.emit('data', data)
}, 60000)