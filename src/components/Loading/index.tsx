import { ActivityIndicator } from "react-native";
import { theme } from '@/styles/theme';

import { Container } from "./styles";

export function Loading() {
  const { colors } = theme

  return (
    <Container testID="component-loading">
      <ActivityIndicator testID="component-loading-indicator" size="small" color={colors.slate[700]} />
    </Container>
  )
}
