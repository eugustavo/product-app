import { useEffect, useState } from "react";
import { Modal, Alert, ActivityIndicator } from "react-native";
import { Camera, CameraType } from "expo-camera";

import { api } from "@/services/api";
import { Product } from "@/dtos/product";
import { Input } from "@/components/Input";
import { price } from "@/utils/format";
import { Button } from "@/components/Button";

import { ButtonContainer, ButtonText, CameraContainer, Container, ModalTitle, ModalContainer, ModalContent } from "./styles";
import { toast } from "@/libs/toast";
import { useNetwork } from "@/contexts/NetworkContext";
import { db } from "@/database/local";

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

export function ScanProduct() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);
  const [newQuantity, setNewQuantity] = useState('');

  const hasProduct = Object.keys(product).length > 0;
  const { connected } = useNetwork();

  async function handleBarCodeScanned(barCode: string) {
    setScanning(true);

    if (!barCode) return;

    try {
      const { data: product } = await api.post('/inventory.get-product', {
        barCode
      });

      if (product?.length === 0 || product?.data?.length === 0) {
        Alert.alert(
          "Produto não encontrado",
          "O produto não foi encontrado na base de dados. Verifique o código de barras e tente novamente.",
          [
            {
              text: "OK",
              onPress: () => {
                setScanned(false);
                return
              }
            }
          ]
        );
      }

      const productScanned: Product = product[0];

      setScanned(true);
      setProduct(productScanned);
    } catch (error) {
      Alert.alert("Ocorreu um erro ao buscar o produto. Tente novamente mais tarde.");
    } finally {
      setScanning(false);
    }
  }

  async function handleEditProduct() {
    if (isNaN(Number(newQuantity)) || Number(newQuantity) !== Math.trunc(Number(newQuantity))) {
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
        const productIndex = products.findIndex(p => p.barCode === product.barCode)

        if (productIndex === -1) {
          toast({
            message: 'Produto não encontrado',
            type: 'error'
          })

          return
        }

        products[productIndex].quantity = Number(newQuantity)

        await db.saveProducts(products)
        
        toast({
          message: 'Produto editado com sucesso',
          type: 'success'
        })
        reset()
        return
      }

      const productToUpdate = {
        ...product,
        quantity: Number(newQuantity),
        fiscal: includeFiscalPropsToUpdateProduct
      }

      await api.put('/inventory.put-product', productToUpdate)

      toast({
        message: 'Produto editado com sucesso',
        type: 'success'
      })
      reset()
    } catch (error) {
      toast({
        message: 'Erro ao editar produto, tente novamente mais tarde',
        type: 'error'
      })
    } finally {
      setUpdating(false)
    }
  }

  function reset() {
    setScanned(false);
    setProduct({} as Product);
  }

  useEffect(() => {
    requestPermission();

    if (!permission) {
      Alert.alert('Permissão de câmera necessária', 'Para utilizar a câmera, é necessário permitir o acesso a ela.');
    }
  }, []);

  return (
    <Container testID="screen-scan-product">
      {permission && (
        <CameraContainer 
          type={CameraType.back}
          onBarCodeScanned={(scan) => scanning || scanned ? undefined : handleBarCodeScanned(scan.data)}
        />
      )}

      {hasProduct && (
        
        <Modal 
          visible={hasProduct}
          animationType="slide"
        >
          <ModalContainer>
            <ModalContent>
            <ModalTitle>Informações do produto</ModalTitle>

            <Input 
              label="Código do produto"
              value={String(product?.sequence)}
              readOnly
            />

            <Input 
              label="Descrição"
              value={product?.description}
              readOnly
            />

            <Input 
              label="Código de barras"
              value={product?.barCode}
              readOnly
            /> 

            <Input 
              label="Preço"
              value={String(price(product?.price))}
              readOnly
            />

            <Input 
              label="Quantidade em estoque"
              onChangeText={setNewQuantity}
              defaultValue={String(product?.quantity)}
            />

            <ButtonContainer>
              <Button onPress={handleEditProduct}>
              {updating ? (
                <ActivityIndicator size='small' color='#fff' />
              ):(
                <ButtonText>
                  Salvar
                </ButtonText>
              )}
              </Button>

              <Button onPress={reset}>
                <ButtonText>Cancelar</ButtonText>
              </Button>
            </ButtonContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>
      )}
      
    </Container>
  )
}