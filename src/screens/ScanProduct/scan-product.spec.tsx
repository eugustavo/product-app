import { includeThemeOnTests } from "@/utils/includeThemeOnTests";
import { render, screen, waitFor } from "@testing-library/react-native";

import { ScanProduct } from ".";

describe('Screen/Scan Product', () => {
  it('should render successfully', async () => {
    render(includeThemeOnTests(<ScanProduct />));

    await waitFor(() => {
      const scanProductScreen = screen.getByTestId('screen-scan-product');
      expect(scanProductScreen).toBeTruthy();
    });
  });
});