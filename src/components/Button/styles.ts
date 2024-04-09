import styled from "styled-components/native";

interface ButtonProps {
  height?: number;
  width?: number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'destructive';
}

export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  height: ${({ height, theme }) => height ? `${height}px` : theme.sizes['2xl']};
  width: ${({ width }) => width ? `${width}px` : '100%'};

  padding: ${({ size, theme }) => size === 'small' ? 0 : size === 'medium' ? `0 ${theme.space[6]}` : `0 ${theme.space[8]}`};

  background-color: ${({ theme, variant }) => variant === 'destructive' ? theme.colors.rose[600] : theme.colors.blue[500]};
`;