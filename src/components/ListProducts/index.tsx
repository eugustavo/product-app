import { FlatList } from "react-native";

import { Product } from "@/dtos/product";
import { price } from "@/utils/format";

import { Card } from "../Card";

import { EmptyListContainer, EmptyListText, ProductItemValue, ProductLabel, ProductValue, ProductValues, ProductWrapper } from "./styles";

interface ListProductsProps {
  products: Product[];
  loading: boolean;
  getProducts: () => void;
  onSubmit: (product: Product) => void;
}

export function ListProducts({ products, loading, getProducts, onSubmit }: ListProductsProps) {
  return (
    <FlatList
        testID='component-list-products'
        data={products}
        keyExtractor={item => item.uuid}
        renderItem={({ item }) => (
          <Card onPress={() => onSubmit(item)} >
            <ProductWrapper>
              <ProductValues>
                <ProductItemValue>
                  <ProductLabel>Código</ProductLabel>
                  <ProductValue>{item?.sequence}</ProductValue>
                </ProductItemValue>

                <ProductItemValue>
                  <ProductLabel>Preço</ProductLabel>
                  <ProductValue>{price(item?.price)}</ProductValue>
                </ProductItemValue>

                <ProductItemValue>
                  <ProductLabel>Quantidade</ProductLabel>
                  <ProductValue>{item?.quantity}</ProductValue>
                </ProductItemValue>
              </ProductValues>

              <ProductValues isLast>
                <ProductItemValue>
                  <ProductLabel>Descrição</ProductLabel>
                  <ProductValue>{item?.description}</ProductValue>
                </ProductItemValue>

                <ProductItemValue>
                  <ProductLabel>QRCode</ProductLabel>
                  <ProductValue>{item?.barCode}</ProductValue>
                </ProductItemValue>
              </ProductValues>
            </ProductWrapper>
          </Card>
        )}
        onRefresh={getProducts}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <EmptyListContainer>
            <EmptyListText>Nenhum produto encontrado</EmptyListText>
          </EmptyListContainer>
        )}
      />
  )
}