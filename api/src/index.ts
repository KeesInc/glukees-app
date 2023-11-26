import 'dotenv/config'
import express from 'express'
import http from 'http'
import sharp from 'sharp'
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

app.get('/current/image/:color', async (req, res) => {
  try {
    const data = await getDataFromCache()
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <text x="4" y="16" font-family="Arial" font-size="12" fill="${req.query.color}">${data.current.value.toFixed(1)}</text>
    </svg>`;

    // Convert SVG to PNG using svg2png
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    // Set the response headers
    res.set('Content-Type', 'image/png');

    // Send the PNG image as a response
    res.send(pngBuffer);
  } catch (error) {
    res.status(500)
    res.json({ error })
  }
})

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

const io = new Server(server, { 
  cors: {
    origin: process.env.CORS || 'http://localhost:3000'
  }
})

let interval: NodeJS.Timeout

io.on('connection', () => {
  if (!interval) {
    interval = setInterval(async () => {
      if (!io.engine.clientsCount) return
      const data = await getDataFromCache()
      io.emit('data', data)
    }, 60000)
  }
})

io.on('disconnect', () => {
  if (!io.engine.clientsCount) {
    clearInterval(interval)
  }
})
