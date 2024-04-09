import Toast from 'react-native-toast-message';

interface ToastProps {
  message: string;
  type: "success" | "error";
}

export function toast({ message, type }: ToastProps) {
  return Toast.show({
    type,
    text1: message,
    position: 'top',
    topOffset: 60,
  })
}