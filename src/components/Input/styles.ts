import styled from "styled-components/native";

interface InputProps {
  focus: boolean;
  error: boolean;
  height?: number;
}

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space['4']};
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.sizes.sm};
  color: ${({ theme }) => theme.colors.slate[600]};
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: ${({ theme }) => theme.space['1']};
`;

export const Error = styled.Text`
  font-size: ${({ theme }) => theme.sizes.xs};
  color: ${({ theme }) => theme.colors.error};
`;

export const Input = styled.TextInput.attrs<InputProps>({
  placeholderTextColor: '#94a3b8',
})`
  width: 100%;
  height: ${({ height }) => height ? `${height}px` : '48px'};
  padding: 4px 8px;
  border-radius: 4px;

  border: 2px solid ${({ theme, focus, error }) => 
    error ? theme.colors.error : focus ? theme.colors.blue[500] : theme.colors.slate[300]
  };

  color: ${({ theme }) => theme.colors.slate[700]};
  font-size: ${({ theme }) => theme.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.regular};
`;
