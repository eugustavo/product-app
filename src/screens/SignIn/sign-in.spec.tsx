import { includeThemeOnTests } from "@/utils/includeThemeOnTests";
import { render, screen, waitFor } from "@testing-library/react-native";

import { SignIn } from ".";

describe('Screen/Sign In', () => {
  it('should render successfully', async () => {
    render(includeThemeOnTests(<SignIn />));

    await waitFor(() => {
      const signInScreen = screen.getByTestId('screen-sign-in');
      expect(signInScreen).toBeTruthy();

      const inputsComponent = screen.getAllByTestId('component-input');
      expect(inputsComponent).toHaveLength(2);

      const buttonComponent = screen.getByTestId('component-button');
      expect(buttonComponent).toBeTruthy();
    });
  });
});