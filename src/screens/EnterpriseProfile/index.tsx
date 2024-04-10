import { useEffect, useState } from "react";

import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";

import { Enterprise } from "@/dtos/enterprise";
import { api } from "@/services/api";
import { cnpj, phone } from "@/utils/format";

import { Container, EnterpriseProfileTitle, InputsContainer } from "./styles";
import { useNetwork } from "@/contexts/NetworkContext";
import { db } from "@/database/local";
import { toast } from "@/libs/toast";

export function EnterpriseProfile() {
  const [enterprise, setEnterprise] = useState<Enterprise>();
  const [loading, setLoading] = useState(false);

  const { connected } = useNetwork()

  const streetFull = `${enterprise?.addressCollection[0].street}, ${enterprise?.addressCollection[0].number}, ${enterprise?.addressCollection[0].neighbourhood}`
  const cityFull = `${enterprise?.addressCollection[0].zipCode.city.name} - ${enterprise?.addressCollection[0].zipCode.city.state.acronym}`
  const phoneFull = `(${enterprise?.phoneCollection[0].areaCode}) ${phone(enterprise?.phoneCollection[0].number)}`

  async function getEnterprise() {
    setLoading(true)
    try {
      if(!connected) {
        const enterpriseInfo = await db.getEnterprise();
        setEnterprise(enterpriseInfo)

        return
      }

      const { data } = await api.get('/application.get-client')
      setEnterprise(data)
      await db.saveEnterprise(data)
    } catch (error) {
      toast({
        type: 'error',
        message: 'Não foi possível buscar os dados da empresa, tente novamente mais tarde.'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getEnterprise()
  }, [])

  return (
    <Container testID="screen-enterprise-profile">
      {loading ? (
        <Loading />
      ):(
        <>
          <EnterpriseProfileTitle>
            Dados da Empresa
          </EnterpriseProfileTitle>

          <InputsContainer>
            <Input label='Nome' value={enterprise?.name} readOnly />
            <Input label='CNPJ' value={cnpj(enterprise?.identification)} readOnly />
            <Input label='Rua' value={streetFull} readOnly />
            <Input label='Cidade' value={cityFull} readOnly />
            <Input label='Telefone' value={phoneFull} readOnly />
          </InputsContainer>
        </>
      )}
    </Container>
  )
}