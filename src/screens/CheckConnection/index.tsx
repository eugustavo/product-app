import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Feather } from '@expo/vector-icons';

import { CicleLG, CicleMD, CicleSM, ConnectionText, Container } from './styles';

export function CheckConnection() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(!!state.isConnected);
    });

    return () => {
      unsubscribe();
    }
  }, []);
  return (
    <Container testID='screen-check-connection'>
      <CicleLG connected={connected}>
        <CicleMD connected={connected}>
          <CicleSM connected={connected}>
            <Feather name={connected ? 'wifi' : 'wifi-off'} size={24} />
            <ConnectionText testID='screen-check-connection-text'>
              {connected ? 'Online' : 'Offline'}
            </ConnectionText>
          </CicleSM>
        </CicleMD>
      </CicleLG>
    </Container>
  )
}