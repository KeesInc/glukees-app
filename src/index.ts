import 'dotenv/config'
import express from 'express';

import { LibreLinkUpClient } from './libre-link-up-api-client/src'

const run = async () => {
    if (!process.env.LIBRE_LINK_UP_USERNAME || !process.env.LIBRE_LINK_UP_PASSWORD) {
        throw new Error('Invalid credentials')
    }

    const { read } = LibreLinkUpClient({ 
        username: process.env.LIBRE_LINK_UP_USERNAME, 
        password: process.env.LIBRE_LINK_UP_PASSWORD 
    });
    
    return read()
}

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  res.send(await run());
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});