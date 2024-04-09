import { createContext, useContext, useEffect, useState } from 'react';

import { saveUserInStorage, getUserFromStorage, removeUserFromStorage } from '@/storage/userStorage'

import { AuthResponse } from '@/dtos/auth';
import { AppError } from '@/utils/AppError';
import { api } from '@/services/api';

interface Credentials {
  email: string;
  password: string;
}

export interface AuthContextDataProps {
  auth: AuthResponse;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  isLoadingUserRequest: boolean;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<AuthResponse>({} as AuthResponse);
  
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
  const [isLoadingUserRequest, setIsLoadingUserRequest] = useState(false);

  async function signIn({ email, password }: Credentials) {
    setIsLoadingUserRequest(true);

    const user = await api.post<AuthResponse>('/application.authenticate', {
      login: email,
      password,
      isModulizedAccess: true
    });

    if (!user || !user.data) {
      setIsLoadingUserRequest(false);

      throw new AppError('E-mail ou senha inválidos.');
    }

    setUser(user.data);
    saveUserInStorage(user.data);

    setIsLoadingUserRequest(false);
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      
      setUser({} as AuthResponse);
      await removeUserFromStorage();
    } catch (error) {
      throw new AppError('Erro ao realizar logout');
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await getUserFromStorage();

      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw new AppError('Erro ao carregar dados do usuário, refaça o login.');
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, [])

  return (
    <AuthContext.Provider value={{ 
      auth: user, 
      signIn, 
      signOut,
      isLoadingUserStorageData,
      isLoadingUserRequest
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}


