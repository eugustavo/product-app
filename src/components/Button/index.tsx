import { TouchableOpacityProps } from "react-native";

import { ButtonContainer } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'destructive';
  height?: number;
  width?: number;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ButtonContainer testID="component-button" {...rest}>
      {children}
    </ButtonContainer>
  );
}