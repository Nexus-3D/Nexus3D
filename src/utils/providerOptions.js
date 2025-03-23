import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Nexus3D",
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID
    }
  }
}; 