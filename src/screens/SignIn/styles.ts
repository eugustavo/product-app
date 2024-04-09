import { Platform } from 'react-native';
import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height'
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.white};
`

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
`

export const Logo = styled.Image`
  width: 180px;
  height: 180px;
  margin-bottom: 32px;
`;