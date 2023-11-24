import { AppProps } from 'next/app'
import Script from 'next/script'
import '../app/globals.css'

function MyApp({ Component: C, pageProps }: AppProps) {
  const Component = C as any

  return <>
    {process.env.GA_MEASUREMENT_ID && (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.GA_MEASUREMENT_ID}');
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