import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height'
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 ${({ theme }) =>theme.space['6']};
`;

export const InputsContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space['4']};
`;

export const Header = styled.View`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.space['8']};
  gap: ${({ theme }) => theme.space['2']};
`;

export const GoBackButton = styled.TouchableOpacity``;

export const EditProductTitle = styled.Text`
  font-size: ${({ theme }) => theme.sizes['lg']};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.slate[700]};
  
  text-align: left;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.sizes['md']};
`