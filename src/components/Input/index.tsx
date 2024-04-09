import { TextInputProps } from 'react-native';
import { Container, Error, Label, Input as StyledInput } from './styles'
import { useState } from 'react';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  height?: number;
}

export function Input({ label, error, ...rest }: InputProps) {
  const [focus, setFocus] = useState(false);

  return (
    <Container>
      {label && <Label testID='component-input-label'>{label}</Label>}

      <StyledInput 
        testID='component-input'
        onFocus={() => setFocus(!focus)}
        onBlur={() => setFocus(!focus)}
        focus={focus}
        error={!!error}
        numberOfLines={1}
        {...rest}
      />

      {error && <Error testID='component-input-error'>{error}</Error>}
    </Container>
  )
}