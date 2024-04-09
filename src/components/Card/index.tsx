import { theme } from '@/styles/theme'

import { Card as CardWrapper, Touchable } from './styles'

interface CardProps {
  onPress: () => void;
  children: React.ReactNode;
}

export function Card({ children, onPress }: CardProps) {
  return (
    <Touchable testID='component-card' onPress={onPress}>
        <CardWrapper colors={[
          theme.colors.blue[200], 
          theme.colors.blue[300], 
          theme.colors.blue[400]
        ]}>
          {children}
        </CardWrapper>
    </Touchable>
  )
}