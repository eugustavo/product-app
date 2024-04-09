import { useEffect } from 'react';
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/Loading';

import { subscribe } from '@/utils/EventEmitter';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { theme as appTheme } from '@/styles/theme';
import { useNetwork } from '@/contexts/NetworkContext';
import { HeaderMessage, HeaderMessageText } from './styles';

export function Routes() {
  const { colors } = appTheme
  const { auth, isLoadingUserStorageData, signOut } = useAuth()
  const { connected, syncing } = useNetwork()

  const theme = DefaultTheme;
  theme.colors.background = colors.slate[200];

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  useEffect(() => {
    subscribe('Unauthorized', signOut);

    return () => {
      subscribe('Unauthorized', signOut);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {(!connected && auth.access_token) && (
        <HeaderMessage type='network'>
          <HeaderMessageText>
            Sem conexão com a internet
          </HeaderMessageText>
        </HeaderMessage>
      )}

      {connected && syncing && (
        <HeaderMessage type='sync'>
          <HeaderMessageText>
            Sincronizando dados...
          </HeaderMessageText>
        </HeaderMessage>
      )}

      <NavigationContainer theme={theme}>
        {auth.access_token ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}