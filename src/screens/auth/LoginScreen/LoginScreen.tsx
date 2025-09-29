import Logo from '@/assets/ilustrations/RockIt';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '../../../ds';
import { useLogin } from '../../../hooks/auth/useLogin';
import styles from './LoginScreen.styles';

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, validationErrors, clearErrors, error } = useLogin();

  const onLogin = async () => {
    await login({ username, password });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={140} height={70} />
      </View>
      
      <Text variant="h1"  align="center" style={styles.title}>
        Bienvenido
      </Text>
      
      <Text variant="body1" color="secondary" align="center" style={styles.subtitle}>
        Inicia sesión para continuar
      </Text>
      
      {error && <Text variant="body1" color="error" align="center" style={styles.error}>{error}</Text>}


      <Input
        label="Usuario"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          clearErrors();
        }}
        placeholder="Ingresa tu usuario"
        required
        error={validationErrors.username}
      />
      
      <Input
        label="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          clearErrors();
        }}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
        required
        error={validationErrors.password}
      />
      
      <Button
        variant="outline"
        size="lg"
        onPress={() => onLogin()}
        loading={isLoading}
        style={styles.button}
      >
        Iniciar Sesión
      </Button>
      
      <Text variant="helper" color="tertiary" align="center" style={styles.helper}>
        ¿No tienes cuenta? Contacta al administrador
      </Text>
    </View>
  );
};
