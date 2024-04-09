import { render, screen, fireEvent } from '@testing-library/react-native';
import { includeThemeOnTests } from '@/utils/includeThemeOnTests';

import { Input } from './index';

describe('Components/Input', () => {
  it('should be render input component', async () => {
    render(includeThemeOnTests(<Input />));

    const inputComponent = screen.getByTestId('component-input');
    expect(inputComponent).toBeTruthy();
  });

  it('should be render without error if error variable is undefined', async () => {
    render(includeThemeOnTests(<Input />));

    const inputError = screen.queryByTestId('component-input-error');
    expect(inputError).toBeNull();
  });

  it('should be render error message if error variable is defined', async () => {
    render(includeThemeOnTests(<Input error='Error message' />));

    const inputError = screen.getByTestId('component-input-error');
    expect(inputError).toBeTruthy();
  });

  it('should be render without label if label variable is undefined', async () => {
    render(includeThemeOnTests(<Input />));

    const inputLabel = screen.queryByTestId('component-input-label');
    expect(inputLabel).toBeNull();
  });

  it('should be render label if label variable is defined', async () => {
    render(includeThemeOnTests(<Input label='Label' />));

    const inputLabel = screen.getByTestId('component-input-label');
    expect(inputLabel).toBeTruthy();
  });
})