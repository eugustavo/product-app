import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  font-size: ${({ theme }) => theme.sizes.md};
  color: ${({ theme }) => theme.colors.slate[800]};
  font-family: ${({ theme }) => theme.fonts.medium};
`;