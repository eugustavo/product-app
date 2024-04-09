import { Platform } from "react-native";
import styled from "styled-components/native";

const iOSPlatform = Platform.OS === 'ios';

interface ProductValuesProps {
  isLast?: boolean;
}

interface FilterOptionProps {
  active?: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${({ theme }) => iOSPlatform ? theme.space[1] : theme.space[6]};
`;

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

export const SearchContainer = styled.View`
  width: 100%;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.space[4]}`};
  margin-top: ${({ theme }) => theme.space[6]};
`;

export const SearchInputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  gap: ${({ theme }) => theme.space[2]};
`;

export const InputWrapper = styled.View`
  flex: 1;
`;

export const FilterOptions = styled.View`
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
  gap: ${({ theme }) => theme.space[2]};
  margin-top: -${({ theme }) => theme.space[2]};
`;

export const FilterOption = styled.TouchableOpacity<FilterOptionProps>`
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[2]}`};
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  border: 2px solid ${({ theme, active }) => active ? theme.colors.blue[500] : theme.colors.slate[300]};
`;

export const FilterOptionText = styled.Text<FilterOptionProps>`
  font-family: ${({ theme, active }) => active ? theme.fonts.bold : theme.fonts.regular};
  font-size: ${({ theme }) => theme.sizes.xs};
  color: ${({ theme, active }) => active ? theme.colors.blue[500] : theme.colors.slate[600]};
`;