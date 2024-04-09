import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InputsContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) =>theme.space['6']};
  margin-bottom: ${({ theme }) => theme.space['4']};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) =>theme.space['6']};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const UserProfileTitle = styled.Text`
  font-size: ${({ theme }) => theme.sizes['lg']};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.slate[700]};
  margin-bottom: ${({ theme }) => theme.space['8']};

  width: 100%;
  text-align: left;
  padding: 0 ${({ theme }) =>theme.space['6']};
`;