import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'

import { Product } from "@/dtos/product";
import { api } from "@/services/api";
import { price } from "@/utils/format";
import { useNetwork } from "@/contexts/NetworkContext";
import { db } from "@/database/local";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";

import { ButtonText, Container, EditProductTitle, GoBackButton, Header, InputsContainer } from "./styles";
import { ActivityIndicator } from "react-native";
import { toast } from "@/libs/toast";
import { theme } from "@/styles/theme";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

const schema = z.object({
  quantity: z.string()
});

type FormData = z.infer<typeof schema>;

const includeFiscalPropsToUpdateProduct = {
  produto: {
    CST: {
      id: 1,
      descricao: "Tributada integralmente",
      codigo: "00"
    },
    CSTNaoContribuinte: {
      id: 1,
      descricao: "Tributada integralmente",
      codigo: "00"
    },
    origem: {
      id: 1,
      descricao: "Nacional, exceto as indicadas nos códigos 3 a 5",
      codigo: "0"
    },
    NCM: {
      id: 11011,
      descricao: "OUTRAS",
      codigo: "2109990"
    }
  }
}

export function EditProduct() {
  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)

  const { connected } = useNetwork()
  const { reset } = useNavigation<AppNavigatorRoutesProps>()
  const { params } = useRoute()
  const { productBarCode } = params as { productBarCode: string };

  const { control, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function getProductToEdit() {
    setLoading(true)

    try {
      if (!connected) {
        const products = await db.getProducts()
        const productToEdit = products.find(product => product.barCode === productBarCode)

        if (!productToEdit) {
          throw new Error('Produto não encontrado')
        }

        setProduct(productToEdit)
      }

      const { data } = await api.post('/inventory.get-product', {
        barCode:productBarCode
      })

      setProduct(data[0])
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao buscar produto')
    } finally {
      setLoading(false)
    }
  }

  async function handleEditProduct(data: FormData) {
    if (isNaN(Number(data.quantity)) || Number(data.quantity) !== Math.trunc(Number(data.quantity))) {
      toast({
        message: 'A quantidade deve ser um número inteiro',
        type: 'error'
      })

      return
    }

    setUpdating(true)
    try {
      if (!connected) {
        const products = await db.getProducts()
        const productIndex = products.findIndex(product => product.barCode === product.barCode)

        if (productIndex === -1) {
          throw new Error('Produto não encontrado')
        }

        products[productIndex].quantity = Number(data.quantity)

        await db.saveProducts(products)
        
        toast({
          message: 'Produto editado com sucesso',
          type: 'success'
        })
        return
      }

      const productToUpdate = {
        ...product,
        quantity: Number(data.quantity),
        fiscal: includeFiscalPropsToUpdateProduct
      }

      await api.put('/inventory.put-product', productToUpdate)

      toast({
        message: 'Produto editado com sucesso',
        type: 'success'
      })
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao editar produto')
    } finally {
      setUpdating(false)
    }
  }

  function handleGoBack() {
    reset({
      index: 0,
      routes: [{ name: 'ListProducts' }]
    })
  }

  useEffect(() => {
    getProductToEdit()
  }, [])

  return (
    <Container testID="screen-edit-product">
      {loading ? (
        <Loading />
      ):(
        <>
          <Header>
            <GoBackButton onPress={handleGoBack}>
              <Feather name="chevron-left" size={24} color={theme.colors.slate[700]} />
            </GoBackButton>

            <EditProductTitle>
              Dados do Produto
            </EditProductTitle>
          </Header>

          <InputsContainer>
            <Input label='Código' value={String(product.sequence)} readOnly />
            <Input label='Descrição' value={product.description} readOnly />
            <Input label='Unidade de medida' value={product?.unitOfMeasure?.name} readOnly />
            <Input label='Código de Barras' value={product.barCode} readOnly />
            <Input label='Valor' value={price(product.price)} readOnly />

            <Controller
              name="quantity"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label='Quantidade'                    
                  placeholder="Quantidade do produto"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize='none'
                  error={errors.quantity?.message}
                  defaultValue={String(product.quantity)}
                />
              )}
            />
          </InputsContainer>

          <Button onPress={handleSubmit(handleEditProduct)}>
            {updating ? (
              <ActivityIndicator size='small' color='#fff' />
            ):(
              <ButtonText>
                Salvar
              </ButtonText>
            )}
          </Button>
        </>
      )}
    </Container>
  )
}