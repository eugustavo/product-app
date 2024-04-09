import AsyncStorage from "@react-native-async-storage/async-storage";

import { Product } from "@/dtos/product";
import { Enterprise } from "@/dtos/enterprise";
import { User } from "@/dtos/user";

export const db = {
  async saveProducts(products: Product[]) {
    await AsyncStorage.setItem('@db:products', JSON.stringify(products));
  },

  async getProducts() {
    const db = await AsyncStorage.getItem('@db:products');

    const products: Product[] = db ? JSON.parse(db) : null;
    return products;
  },

  async saveEnterprise(enterprise: Enterprise) {
    await AsyncStorage.setItem('@db:enterprise', JSON.stringify(enterprise));
  },

  async getEnterprise() {
    const db = await AsyncStorage.getItem('@db:enterprise');

    const enterprise: Enterprise = db ? JSON.parse(db) : null;
    return enterprise;
  },

  async saveUser(user: User) {
    await AsyncStorage.setItem('@db:user', JSON.stringify(user));
  },

  async getUser() {
    const db = await AsyncStorage.getItem('@db:user');

    const user: User = db ? JSON.parse(db) : null;
    return user;
  },
}
