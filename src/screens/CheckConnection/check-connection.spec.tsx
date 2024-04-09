import { includeThemeOnTests } from "@/utils/includeThemeOnTests"
import { render, screen, waitFor } from "@testing-library/react-native"
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

import { CheckConnection } from "./index"

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
}));

describe('Screen/Check Connection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display "Online" when connected', async () => {
    const mockAddEventListener = NetInfo.addEventListener as jest.Mock;
    mockAddEventListener.mockImplementationOnce((callback: (state: NetInfoState) => void) => {
      callback({ isConnected: true } as NetInfoState);
      return {
        remove: jest.fn(),
      };
    });

    render(includeThemeOnTests(<CheckConnection />));

    await waitFor(() => {
      const onlineText = screen.getByTestId('screen-check-connection-text');
      expect(onlineText).toBeTruthy();
      expect(onlineText.props.children).toBe('Online');
    });

    expect(mockAddEventListener).toHaveBeenCalledTimes(1);
    expect(mockAddEventListener).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should display "Offline" when not connected', async () => {
    const mockAddEventListener = NetInfo.addEventListener as jest.Mock;
    mockAddEventListener.mockImplementationOnce((callback: (state: NetInfoState) => void) => {
      callback({ isConnected: false } as NetInfoState);
      return {
        remove: jest.fn(),
      };
    });

    render(includeThemeOnTests(<CheckConnection />));

    await waitFor(() => {
      const offlineText = screen.getByTestId('screen-check-connection-text');
      expect(offlineText).toBeTruthy();
      expect(offlineText.props.children).toBe('Offline');
    });
  })
})