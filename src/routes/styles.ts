import { Platform } from "react-native";
import styled from "styled-components/native";

interface HeaderMessageProps {
  type: 'network' | 'sync';
}

const iOSPlatform = Platform.OS === 'ios';

export const HeaderMessage = styled.View<HeaderMessageProps>`
  height: ${iOSPlatform ? 80 : 60}px;
  justify-content: flex-end;
  align-items: center;

  background-color: ${({ theme, type }) => type === 'network' ? theme.colors.rose[600] : theme.colors.blue[600]};
  padding-bottom: ${({ theme }) => theme.space[1]};
`;

export const HeaderMessageText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.medium};
`;