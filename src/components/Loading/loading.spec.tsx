import { render, screen } from "@testing-library/react-native";
import { includeThemeOnTests } from "@/utils/includeThemeOnTests";

import { Loading } from './index'

describe('Component/Loading', () => {
  it('should be render card component', async () => {
    render(includeThemeOnTests(
      <Loading />
    ));

    const buttonComponent = screen.getByTestId('component-loading');
    expect(buttonComponent).toBeTruthy();
  });

  it('should be render with ActivityIndicator inside loading', async () => {
    render(includeThemeOnTests(
      <Loading />
    ));

    const activityIndicator = screen.getByTestId('component-loading-indicator');
    expect(activityIndicator).toBeTruthy();
  });
});