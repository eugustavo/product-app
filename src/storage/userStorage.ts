import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthResponse } from '@/dtos/auth';
import { USER_STORAGE } from './storageConfig';

export async function saveUserInStorage(user: AuthResponse) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function getUserFromStorage() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: AuthResponse = storage ? JSON.parse(storage) : null;

  return user;
}

export async function removeUserFromStorage() {
  await AsyncStorage.removeItem(USER_STORAGE);
};