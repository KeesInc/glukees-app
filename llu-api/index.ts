import { LibreLinkUpClient } from './libre-link-up-api-client/src'

export const getData = async () => {
    if (!process.env.LIBRE_LINK_UP_USERNAME || !process.env.LIBRE_LINK_UP_PASSWORD) {
        throw new Error('Invalid credentials')
    }

    const { read } = LibreLinkUpClient({ 
        username: process.env.LIBRE_LINK_UP_USERNAME, 
        password: process.env.LIBRE_LINK_UP_PASSWORD 
    });
    
    return read()
}