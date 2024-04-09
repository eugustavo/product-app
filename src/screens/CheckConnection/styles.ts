import styled from "styled-components/native";
import { Dimensions } from 'react-native'

interface CicleProps {
  connected: boolean;
}

const cicleWidth = Dimensions.get('window').width;
const cicleRadius = cicleWidth / 2;

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CicleLG = styled.View<CicleProps>`
  width: ${cicleWidth * 0.9}px;
  height: ${cicleWidth * 0.9}px;
  border-radius: ${cicleRadius * 0.9}px;
  background-color: ${({ theme, connected }) => connected ? theme.colors.emerald[600] : theme.colors.rose[600]};
  justify-content: center;
  align-items: center;
`; 

export const CicleMD = styled.View<CicleProps>`
  width: ${cicleWidth * 0.7}px;
  height: ${cicleWidth * 0.7}px;
  border-radius: ${cicleRadius * 0.7}px;
  background-color: ${({ theme, connected }) => connected ? theme.colors.emerald[400] : theme.colors.rose[400]};
  justify-content: center;
  align-items: center;
`;

export const CicleSM = styled.View<CicleProps>`
  width: ${cicleWidth * 0.5}px;
  height: ${cicleWidth * 0.5}px;
  border-radius: ${cicleRadius * 0.5}px;
  background-color: ${({ theme, connected }) => connected ? theme.colors.emerald[200] : theme.colors.rose[200]};
  justify-content: center;
  align-items: center;
`;

export const ConnectionText = styled.Text`
  font-size: ${({ theme }) => theme.sizes.md};
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-top: ${({ theme }) => theme.space['2']};
`