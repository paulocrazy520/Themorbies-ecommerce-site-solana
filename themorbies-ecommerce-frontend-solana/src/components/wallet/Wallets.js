

import React, { useCallback, useMemo } from 'react';
import {
  WalletDialogProvider as MaterialUIWalletDialogProvider,
  WalletMultiButton as MaterialUIWalletMultiButton
} from '@solana/wallet-adapter-material-ui';
import { ConnectionProvider, useLocalStorage, WalletProvider } from '@solana/wallet-adapter-react';
import {
  getBitpieWallet,
  getCoin98Wallet,
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
  getTorusWallet
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useSnackbar } from 'notistack';
import * as global from "../../models/global";

export const Wallets = ({ children }) => {
  //  const endpoint = useMemo(() => clusterApiUrl(global.ORDER_NETWORK), []);
  const endpoint = useMemo(() => "https://api.metaplex.solana.com", []);
  // const endpoint = useMemo(() => "http://localhost:8899", []);
  const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', false);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet(),
      getCoin98Wallet(),
      getBitpieWallet()
    ],
    []
  );

  const { enqueueSnackbar } = useSnackbar();
  const onError = useCallback(
    (error) => {
      enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name, {
        variant: 'error'
      });
      console.error(error);
    },
    [enqueueSnackbar]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
        <MaterialUIWalletDialogProvider>
          {children}
        </MaterialUIWalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};