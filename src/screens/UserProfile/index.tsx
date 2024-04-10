import { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons'

import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";

import { User } from "@/dtos/user";
import { api } from "@/services/api";

import { ButtonContainer, ButtonText, Container, InputsContainer, UserProfileTitle } from "./styles";
import { useNetwork } from "@/contexts/NetworkContext";
import { db } from "@/database/local";
import { toast } from "@/libs/toast";

export function UserProfile() {
  const [userLogged, setUserLogged] = useState<User>();
  const [loading, setLoading] = useState(false);

  const { signOut } = useAuth()
  const { connected } = useNetwork()

  async function getUserLogged() {
    setLoading(true)
    try {
      if(!connected) {
        const userInfo = await db.getUser();
        setUserLogged(userInfo)

        return
      }

      const { data } = await api.get('/application.get-profile')
      setUserLogged(data)
      await db.saveUser(data)
    } catch (error) {
      toast({
        type: 'error',
        message: 'Não foi possível buscar os dados do usuário, tente novamente mais tarde.'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserLogged()
  }, [])

  return (
    <Container testID="screen-user-profile">
      {loading ? (
        <Loading />
      ):(
        <>
          <UserProfileTitle>
            Dados do Usuário
          </UserProfileTitle>

          <InputsContainer>
            <Input label='Nome' value={userLogged?.name} readOnly />
            <Input label='E-mail' value={userLogged?.email} readOnly />
          </InputsContainer>

          <ButtonContainer>
            <Button variant="destructive" onPress={signOut}>
              <ButtonText>Logout</ButtonText>
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  )
}