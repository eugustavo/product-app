import { Text } from "react-native";
import { includeThemeOnTests } from "@/utils/includeThemeOnTests";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Button } from "./index";

describe('Components/Input', () => {
  it('should be render input component', async () => {
    render(includeThemeOnTests(
      <Button>
        {''}
      </Button>
    ));

    const buttonComponent = screen.getByTestId('component-button');
    expect(buttonComponent).toBeTruthy();
  });

  it('should be render with text inside button', async () => {
    render(includeThemeOnTests(
      <Button>
        <Text>Button</Text>
      </Button>
    ));

    const buttonText = screen.getByText('Button');
    expect(buttonText).toBeTruthy();
  });

  it('should be click on button and call onPress function', async () => {
    const onPress = jest.fn();

    render(includeThemeOnTests(
      <Button onPress={onPress}>
        <Text>Button</Text>
      </Button>
    ));

    const buttonComponent = screen.getByTestId('component-button');
    fireEvent.press(buttonComponent);

    expect(onPress).toHaveBeenCalled();
  })
})