import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Touchable = styled.TouchableOpacity`
  width: 100%;
  padding: ${({ theme }) => theme.space[4]};
  margin-bottom: -${({ theme }) => theme.space[4]};
`;

export const Card = styled(LinearGradient)`
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[2]}`};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 4px;
`;