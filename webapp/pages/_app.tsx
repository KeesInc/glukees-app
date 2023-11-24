import { AppProps } from 'next/app'
import Script from 'next/script'
import '../app/globals.css'

function MyApp({ Component: C, pageProps }: AppProps) {
  const Component = C as any

  return <>
    {'G-LEDPG4HV6Q' && (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${'G-LEDPG4HV6Q'}`} />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${'G-LEDPG4HV6Q'}');
          `}
        </Script>
      </>
    )}

    <Component 
      {...pageProps} 
    />
  </> 
}

export default MyApp