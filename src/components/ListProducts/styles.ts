import styled from "styled-components/native";

interface ProductValuesProps {
  isLast?: boolean;
}

export const ProductWrapper= styled.View`
  flex: 1;
`;

export const ProductValues = styled.View<ProductValuesProps>`
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[12]};
  padding: ${({ theme }) => `0 ${theme.space[4]}`};
  justify-content: ${({ isLast }) => isLast ? 'flex-start' : 'space-between'};
  margin-bottom: ${({ theme, isLast }) => isLast ? 0 : theme.space[4]};
`;

export const ProductItemValue = styled.View``;

export const ProductLabel= styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.sizes.sm};
  color: ${({ theme }) => theme.colors.slate[900]};
`;

export const ProductValue= styled.Text.attrs({
  numberOfLines: 1
})`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.sizes.xs};
  color: ${({ theme }) => theme.colors.slate[800]};
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space[8]};
`;

export const EmptyListText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.sizes.md};
  color: ${({ theme }) => theme.colors.slate[700]};
  text-align: center;
  margin-top: ${({ theme }) => theme.space[4]};
`;