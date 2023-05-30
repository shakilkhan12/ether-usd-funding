import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider} from "@thirdweb-dev/react";
import Navbar from '@/components/Navbar';
import ContractProvider from '@/context/Provider';
export default function App({ Component, pageProps }: AppProps) {
  return <ThirdwebProvider>
    <ContractProvider>
    <Navbar /><Component {...pageProps} />
    </ContractProvider>
    </ThirdwebProvider>
}
