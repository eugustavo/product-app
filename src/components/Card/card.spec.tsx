import { fireEvent, render, screen } from "@testing-library/react-native";
import { includeThemeOnTests } from "@/utils/includeThemeOnTests";

import { Card } from "./index";

describe('Component/Card', () => {
  it('should be render card component', async () => {
    render(includeThemeOnTests(
      <Card onPress={() => {}}>
        {''}
      </Card>
    ));

    const buttonComponent = screen.getByTestId('component-card');
    expect(buttonComponent).toBeTruthy();
  });

  it('should be click on card and call onPress function', async () => {
    const onPress = jest.fn();

    render(includeThemeOnTests(
      <Card onPress={onPress}>
        {''}
      </Card>
    ));

    const buttonComponent = screen.getByTestId('component-card');
    fireEvent.press(buttonComponent);

    expect(onPress).toHaveBeenCalled();
  })
})