import { render, screen, waitFor } from "@testing-library/react-native"
import { includeThemeOnTests } from "@/utils/includeThemeOnTests"

import { api } from "@/services/api"
import { Product } from "@/dtos/product"

import { ListProducts } from "./index"

const products: Product[] = [
  {
    uuid: 'test-uuid',
    sequence: 1,
    description: 'Product test',
    price: 15,
    barCode: 'test-barcode',
    quantity: 15,
    id: 1,
  },
  {
    uuid: 'test-uuid-2',
    sequence: 2,
    description: 'Product test 2',
    price: 25,
    barCode: 'test-barcode-2',
    quantity: 25,
    id: 2,
  },
];

describe('Screen/List Products', () => {
  it('should render the List Products screen', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ products })
    render(includeThemeOnTests(<ListProducts />))
    
    await waitFor(() => {
      const listProductsScreen = screen.getByTestId('screen-list-products')
      expect(listProductsScreen).toBeTruthy()
  
      const listProductsComponent = screen.getByTestId('component-list-products')
      expect(listProductsComponent).toBeTruthy()
      expect(listProductsComponent.children.length).toBe(2)
  
      const inputComponent = screen.getByTestId('component-input')
      expect(inputComponent).toBeTruthy()
  
      const buttonComponent = screen.getAllByTestId('component-button')
      expect(buttonComponent).toBeTruthy()
    })
  })
})