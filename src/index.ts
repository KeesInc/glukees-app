import 'dotenv/config'
import { LibreLinkUpClient } from './libre-link-up-api-client/src'

const run = async () => {
    if (!process.env.LIBRE_LINK_UP_USERNAME || !process.env.LIBRE_LINK_UP_PASSWORD) {
        throw new Error('Invalid credentials')
    }

    const { read } = LibreLinkUpClient({ 
        username: process.env.LIBRE_LINK_UP_USERNAME, 
        password: process.env.LIBRE_LINK_UP_PASSWORD 
    });
    
    const response = await read()
    console.log(response)
}

run()
