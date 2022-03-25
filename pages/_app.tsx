import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavbarContainer } from '../components/Navbar'
import "reflect-metadata";

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <div className='h-screen'>  
    <NavbarContainer/>
    <Component {...pageProps} />
  </div>)
}

export default MyApp
