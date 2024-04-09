import { ThemeProvider } from "styled-components/native";

import { theme } from "@/styles/theme"
import { NavigationContainer } from "@react-navigation/native";

export function includeThemeOnTests(children: React.ReactNode) {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </ThemeProvider>
  )
}