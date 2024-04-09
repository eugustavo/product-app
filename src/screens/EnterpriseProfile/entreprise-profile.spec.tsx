import { includeThemeOnTests } from "@/utils/includeThemeOnTests";
import { render, screen, waitFor } from "@testing-library/react-native";

import { EnterpriseProfile } from ".";
import { Enterprise } from "@/dtos/enterprise";
import { api } from "@/services/api";

const enterprise: Enterprise = {
  name: 'Test Enterprise',
  identification: '123456789',
  phoneCollection: [
    {
      areaCode: 11,
      number: '999999999'
    }
  ],
  addressCollection: [
    {
      street: 'Test Street',
      neighbourhood: 'Test Neighbourhood',
      number: '123',
      zipCode: {
        zipCode: '12345678',
        city: {
          name: 'Test City',
          state: {
            acronym: 'TS'
          }
        }
      }
    }
  ]
}

describe('Screen/Enterprise Profile', () => {
  beforeEach(() => {
    jest.spyOn(api, 'get').mockResolvedValue({ enterprise })
  })

  it('should render successfully', async () => {
    render(includeThemeOnTests(<EnterpriseProfile />));

    await waitFor(() => {
      const userProfileScreen = screen.getByTestId('screen-enterprise-profile');
      expect(userProfileScreen).toBeTruthy();
    });
  });

  it('should render the enterprise data', async () => {
    render(includeThemeOnTests(<EnterpriseProfile />));

    await waitFor(() => {
      const inputsComponent = screen.getAllByTestId('component-input');
      expect(inputsComponent).toHaveLength(5);
    });
  });
});