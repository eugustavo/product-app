import { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { api } from '@/services/api';
import { diffBetweenDBS } from '@/utils/returnDiff';
import { db } from '@/database/local';
import { AppError } from '@/utils/AppError';

export interface NetworkContextDataProps {
  connected: boolean;
  syncing: boolean;
}

interface NetworkContextProviderProps {
  children: React.ReactNode;
};

const includeFiscalPropsToUpdateProduct = {
  produto: {
    CST: {
      id: 1,
      descricao: "Tributada integralmente",
      codigo: "00"
    },
    CSTNaoContribuinte: {
      id: 1,
      descricao: "Tributada integralmente",
      codigo: "00"
    },
    origem: {
      id: 1,
      descricao: "Nacional, exceto as indicadas nos códigos 3 a 5",
      codigo: "0"
    },
    NCM: {
      id: 11011,
      descricao: "OUTRAS",
      codigo: "2109990"
    }
  }
}

export const NetworkContext = createContext<NetworkContextDataProps>({} as NetworkContextDataProps);

export function NetworkContextProvider({ children }: NetworkContextProviderProps) {
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);

  async function sync() {
    setSyncing(true);

    try {
      const { data: productsOnline } = await api.get('/inventory.get-product');
      const productsOffline = await db.getProducts();

      const diffs = diffBetweenDBS(productsOnline, productsOffline)

      if(diffs.length > 0) {
        diffs.forEach(async product => {
          const findProduct = productsOffline.find(p => p.uuid === product.uuid);
          const productToUpdate = {
            ...findProduct,
            fiscal: includeFiscalPropsToUpdateProduct
          }
  
          await api.put('/inventory.put-product', productToUpdate);
        })
      }
    } catch (error) {
      throw new AppError('Erro ao sincronizar dados, tente novamente mais tarde');
    } finally {
      setSyncing(false);
    }
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(!!state.isConnected);

      if(state.isConnected) {
        sync();
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <NetworkContext.Provider value={{ 
      connected,
      syncing
    }}>
      {children}
    </NetworkContext.Provider>
  )
}

export function useNetwork() {
  const context = useContext(NetworkContext)

  return context
}


