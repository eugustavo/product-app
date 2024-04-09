import { render, screen } from "@testing-library/react-native";
import { ListProducts } from ".";
import { includeThemeOnTests } from "@/utils/includeThemeOnTests";

describe('Component/List Products', () => {
  it('should render the List Products component', () => {
    render(includeThemeOnTests(<ListProducts products={[]} getProducts={() => {}} loading={false} />))

    const listProductsComponent = screen.getByTestId('component-list-products');
    expect(listProductsComponent).toBeTruthy();
  })

  it('should render the List Products component with products', () => {
    render(includeThemeOnTests(
      <ListProducts 
        products={[{
            uuid: 'test-uuid',
            sequence: 1,
            description: 'Product test',
            price: 15,
            barCode: 'test-barcode',
            quantity: 15,
            id: 1,
          }]}
        getProducts={() => {}}
        loading={false}
      />
    ))

    const listProductsComponent = screen.getByTestId('component-list-products');
    expect(listProductsComponent).toBeTruthy();
    expect(screen.getByText('Product test')).toBeTruthy();
    expect(screen.getByText('15')).toBeTruthy();
    expect(screen.getByText('R$ 15,00')).toBeTruthy();
    expect(screen.getByText('test-barcode')).toBeTruthy();
  })
});