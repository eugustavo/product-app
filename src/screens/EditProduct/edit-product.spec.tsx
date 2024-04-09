import { render, screen, waitFor } from "@testing-library/react-native";

import { EditProduct } from "./index";
import { Product } from "@/dtos/product";
import { api } from "@/services/api";
import { includeThemeOnTests } from "@/utils/includeThemeOnTests";

const product: Product = {
  uuid: 'test-uuid',
  sequence: 1,
  description: 'Product test',
  price: 15,
  barCode: 'test-barcode',
  quantity: 15,
  id: 1,
  unitOfMeasure: {
    name: 'Unidade',
  }
};

jest.mock('@react-navigation/native', () => ({
  useRoute: () => {
    return {
      params: {
        productBarCode: 'test-barcode'
      }
    };
  },
  useNavigation: () => {
    return {
      reset: jest.fn(),
    };
  }
}));

describe('Screen/Edit Product', () => {
  beforeEach(() => {
    jest.spyOn(api, 'post').mockResolvedValue({ data: [product] })
  })

  it.skip('should render successfully', async () => {
    render(includeThemeOnTests(<EditProduct />))

    await waitFor(() => {
      const userProfileScreen = screen.getByTestId('screen-edit-product');
      expect(userProfileScreen).toBeTruthy();
    });
  });

  it.skip('should render the enterprise data', async () => {
    render(includeThemeOnTests(<EditProduct />));

    await waitFor(() => {
      const inputsComponent = screen.getAllByTestId('component-input');
      expect(inputsComponent).toHaveLength(6);

      const buttonComponent = screen.getByTestId('component-button');
      expect(buttonComponent).toBeTruthy();
    });
  });
});