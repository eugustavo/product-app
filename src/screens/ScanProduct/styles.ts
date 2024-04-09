import { Dimensions } from 'react-native';
import { Camera } from "expo-camera";
import styled from "styled-components/native";

const { width, height } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CameraContainer = styled(Camera)`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.space['8']};
`;

export const ScanningText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.sizes.lg};
  color: ${({ theme }) => theme.colors.slate[300]};
`;

export const ModalTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.sizes.xmd};
  color: ${({ theme }) => theme.colors.slate[700]};
  margin-bottom: ${({ theme }) => theme.space['4']};
  text-align: center;
`;

export const ButtonContainer = styled.View`
  margin-top: ${({ theme }) => theme.space['4']};
  gap: ${({ theme }) => theme.space['2']};
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
`

export const ModalContainer = styled.SafeAreaView`
  flex: 1
`;

export const ModalContent = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.space['6']};
  margin-top: ${({ theme }) => theme.space['8']};
`;