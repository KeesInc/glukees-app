import { AppProps } from 'next/app'
import '../app/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-expect-error - borked next types
  return <Component 
    {...pageProps} 
  />
}

export default MyApp