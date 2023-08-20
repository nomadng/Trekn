import React, { useMemo } from 'react';
import './App.css';
import { Outlet } from 'react-router';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-unsafe-burner';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import {
  BackpackWalletAdapter,
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';

function App({
  required_connect_wallet,
  header,
  layout,
}: {
  required_connect_wallet: boolean;
  header: any;
  layout: any;
}) {
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new BackpackWalletAdapter()],
    []
  );

  const Layout: any = layout;
  const Header: any = header;
  return (
    <>
      <div className='bg-white'>
        <AuthProvider>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <Header></Header>
                <Layout>
                  <Outlet />
                </Layout>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
