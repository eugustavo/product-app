import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import Toast from 'react-native-toast-message';

import { Loading } from '@/components/Loading';
import { AuthContextProvider } from '@/contexts/AuthContext';

import { Routes } from './src/routes';
import { theme } from '@/styles/theme';
import { NetworkContextProvider } from '@/contexts/NetworkContext';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['while developing']);

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_700Bold });

  return (
    <AuthContextProvider>
      <NetworkContextProvider>
        <StatusBar
          backgroundColor="transparent"
          translucent
        />
        
        <ThemeProvider theme={theme}>
          {fontsLoaded ? <Routes /> : <Loading />}
          <Toast />
        </ThemeProvider>
      </NetworkContextProvider>
    </AuthContextProvider>
  );
}
