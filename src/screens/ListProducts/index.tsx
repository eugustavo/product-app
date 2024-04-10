import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native'

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ListProducts as ListProductsComponent } from '@/components/ListProducts';

import { Product } from '@/dtos/product';
import { theme } from '@/styles/theme';
import { AppError } from '@/utils/AppError';

import { api } from '@/services/api';
import { useNetwork } from '@/contexts/NetworkContext';
import { db } from '@/database/local';

import { AppNavigatorRoutesProps } from '@/routes/app.routes';

import { 
  Container, 
  SearchContainer,
  SearchInputWrapper,
  InputWrapper,
  FilterOptions,
  FilterOption,
  FilterOptionText,
} from "./styles";
import { toast } from '@/libs/toast';

const schema = z.object({
  search: z.string().nullable(),
});

type FormData = z.infer<typeof schema>;

export function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [revealFilter, setRevealFilter] = useState(false);
  const [filterSelected, setFilterSelected] = useState('');

  const isFocused = useIsFocused();
  const { connected } = useNetwork();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  const { control, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  async function getProducts() {
    setLoading(true);
    try {
      if(!connected) {
        const data = await db.getProducts();
        setProducts(data);

        return;
      };

      const { data } = await api.get('/inventory.get-product');

      setProducts(data);
      await db.saveProducts(data);
    } catch (err) {
      if (err instanceof AppError) {
        toast({
          type: 'error',
          message: err.message
        })

        return
      }

      toast({
        type: 'error',
        message: 'Não foi possível buscar os produtos, tente novamente mais tarde.'
      })
    } finally {
      setLoading(false);
    }
  }

  function handleSelectFilter(filter: string) {
    if (filterSelected === filter) {
      setFilterSelected('');
      return;
    }

    setFilterSelected(filter);
  }

  async function resetFilter() {
    setFilterSelected('');
    setRevealFilter(false);
    await getProducts();
  }

  async function handleSearchProduct(formData: FormData) {
    const filter = filterSelected || 'description';

    if (!formData.search) {
      await getProducts();
      return;
    }

    try {
      if (!connected) {
        const data = await db.getProducts();
        const filteredProducts = data.filter((product: any) => product[filter].includes(formData.search));

        setProducts(filteredProducts);
        return;
      }

      const { data } = await api.post('/inventory.get-product', {
        [filter]: formData.search
      })

      setProducts(data);
    } catch (err) {
      toast({
        type: 'error',
        message: 'Não foi possível buscar os produtos, tente novamente mais tarde.'
      })
    }
  }

  function handleEditProduct(product: Product) {
    navigate('EditProduct', { productBarCode: product.barCode });
  }

  useEffect(() => {
    getProducts();
  }, [isFocused])

  return (
    <Container testID='screen-list-products'>
      <SearchContainer>
        <SearchInputWrapper>
          <InputWrapper>
            <Controller
              name="search"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  height={36} 
                  placeholder="Buscar produto..."
                  onChangeText={onChange}
                  value={value as string}
                  autoCapitalize='none'
                  error={errors.search?.message}
                />
              )}
            />
          </InputWrapper>
          
          <Button 
            size='small' 
            height={36} 
            width={36}
            onPress={() => revealFilter ? resetFilter() : setRevealFilter(!revealFilter)}
          >
            {revealFilter ? (
              <Feather name="x" size={20} color={theme.colors.slate[100]} />
            ):(
              <Feather name="filter" size={20} color={theme.colors.slate[100]} />
            )}
          </Button>

          <Button 
            size='small' 
            height={36} 
            width={36}
            onPress={handleSubmit(handleSearchProduct)}
          >
            <Feather name="search" size={20} color={theme.colors.slate[100]} />
          </Button>
        </SearchInputWrapper>

        {revealFilter && (
          <FilterOptions>
            <FilterOption 
              onPress={() => handleSelectFilter('description')}
              active={filterSelected === 'description'}
            >
              <FilterOptionText active={filterSelected === 'description'}>
                Descrição
              </FilterOptionText>
            </FilterOption>

            <FilterOption
              onPress={() => handleSelectFilter('barCode')}
              active={filterSelected === 'barCode'}
            >
              <FilterOptionText active={filterSelected === 'barCode'}>
                QRCode
              </FilterOptionText>
            </FilterOption>
          </FilterOptions>
        )}
      </SearchContainer>

      <ListProductsComponent
        products={products}
        loading={loading}
        getProducts={getProducts}
        onSubmit={handleEditProduct}
      />
    </Container>
  )
}