import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { providerOptions } from '../utils/providerOptions';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [library, setLibrary] = useState(null);
  const [account, setAccount] = useState(null);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState(process.env.NEXT_PUBLIC_CHAIN_ID || 80001);
  const [network, setNetwork] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const web3Modal = typeof window !== 'undefined' ? new Web3Modal({
    cacheProvider: true,
    providerOptions,
  }) : null;

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const provider = await web3Modal.connect();
      const library = new ethers.BrowserProvider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0].address);
      setChainId(network.chainId);
      setNetwork(network.name);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshState = () => {
    setAccount(null);
    setChainId(process.env.NEXT_PUBLIC_CHAIN_ID || 80001);
    setNetwork('');
    setMessage('');
    setSignature('');
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnect();
        }
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(parseInt(_hexChainId, 16));
        connectWallet();
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider]);

  const signMessage = async () => {
    if (!library || !account) return;
    try {
      const signer = await library.getSigner();
      const signature = await signer.signMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error.message);
    }
  };

  const value = {
    connectWallet,
    disconnect,
    signMessage,
    setMessage,
    account,
    chainId,
    network,
    message,
    signature,
    error,
    provider,
    library,
    isLoading
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 