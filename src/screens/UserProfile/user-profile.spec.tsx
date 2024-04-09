import { includeThemeOnTests } from "@/utils/includeThemeOnTests";
import { render, screen, waitFor } from "@testing-library/react-native";

import { UserProfile } from ".";
import { User } from "@/dtos/user";
import { api } from "@/services/api";

const user: User = {
  name: 'John Doe',
  email: 'john@doe.test',
}

describe('Screen/User Profile', () => {
  beforeEach(() => {
    jest.spyOn(api, 'get').mockResolvedValue({ user })
  })

  it('should render successfully', async () => {
    render(includeThemeOnTests(<UserProfile />));

    await waitFor(() => {
      const userProfileScreen = screen.getByTestId('screen-user-profile');
      expect(userProfileScreen).toBeTruthy();
    });
  });

  it('should render the user data', async () => {
    render(includeThemeOnTests(<UserProfile />));

    await waitFor(() => {
      const inputsComponent = screen.getAllByTestId('component-input');
      expect(inputsComponent).toHaveLength(2);

      const buttonComponent = screen.getByTestId('component-button');
      expect(buttonComponent).toBeTruthy();
    });
  });
});