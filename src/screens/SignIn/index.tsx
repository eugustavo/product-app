import { ActivityIndicator, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuth } from "@/contexts/AuthContext";

import { Input } from "@/components/Input";
import { Button } from '@/components/Button';

import logo from '@/assets/logo.png';
import { Container, ButtonText, Logo } from './styles';

const schema = z.object({
  email: z.string().email('Invalid e-mail'),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;

export function SignIn() {
  const { signIn, isLoadingUserRequest } = useAuth()

  const { control, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(data: FormData) {
    await signIn(data);
  }

  return (
    <Container testID='screen-sign-in'>
      <Logo source={logo} />

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label='E-mail'
            placeholder="E-mail"
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label='Senha'
            placeholder="Senha"
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>
        {isLoadingUserRequest ? (
          <ActivityIndicator size='small' color='#fff' />
        ):(
          <ButtonText>
            Entrar
          </ButtonText>
        )}
      </Button>
    </Container>
  )
}