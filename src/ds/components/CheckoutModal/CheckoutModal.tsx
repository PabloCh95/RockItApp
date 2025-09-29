import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, View } from 'react-native';
import type { CheckoutFormData, CheckoutValidationErrors } from '../../../types/checkout';
import type { Product } from '../../../types/products';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Text } from '../../components/Text';
import { colors, spacing } from '../../theme';

interface CheckoutModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onPurchase: (purchaseData: any) => Promise<void>;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  visible,
  product,
  onClose,
  onPurchase
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [errors, setErrors] = useState<CheckoutValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: CheckoutValidationErrors = {};

    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Número de tarjeta debe tener al menos 16 dígitos';
    }

    if (!formData.cardName || formData.cardName.trim().length < 2) {
      newErrors.cardName = 'Nombre debe tener al menos 2 caracteres';
    }

    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Formato debe ser MM/AA';
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'CVV debe tener al menos 3 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePurchase = async () => {
    if (!product || !validateForm()) return;

    setIsLoading(true);
    try {
      const purchaseData = {
        productId: product.id,
        productTitle: product.title,
        price: product.price,
        ...formData,
      };

      await onPurchase(purchaseData);
      
      Alert.alert(
        '¡Compra Exitosa!',
        `Has comprado "${product.title}" por $${product.price}`,
        [
          {
            text: 'OK',
            onPress: () => {
              handleClose();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error en la Compra',
        error instanceof Error ? error.message : 'Error desconocido',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    });
    setErrors({});
    onClose();
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 19); 
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  if (!product) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text variant="h3" style={styles.title}>
              Finalizar Compra
            </Text>
            <Text variant="body2" color="secondary">
              {product.title}
            </Text>
            <Text variant="h4" color="primary" style={styles.price}>
              ${product.price}
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Número de Tarjeta"
              value={formData.cardNumber}
              onChangeText={(text) => setFormData(prev => ({ 
                ...prev, 
                cardNumber: formatCardNumber(text) 
              }))}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
              error={errors.cardNumber}
              required
            />

            <Input
              label="Nombre en la Tarjeta"
              value={formData.cardName}
              onChangeText={(text) => setFormData(prev => ({ 
                ...prev, 
                cardName: text.toUpperCase() 
              }))}
              placeholder="JUAN PÉREZ"
              error={errors.cardName}
              required
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Input
                  label="Vencimiento"
                  value={formData.expiryDate}
                  onChangeText={(text) => setFormData(prev => ({ 
                    ...prev, 
                    expiryDate: formatExpiryDate(text) 
                  }))}
                  placeholder="MM/AA"
                  keyboardType="numeric"
                  maxLength={5}
                  error={errors.expiryDate}
                  required
                />
              </View>
              
              <View style={styles.halfWidth}>
                <Input
                  label="CVV"
                  value={formData.cvv}
                  onChangeText={(text) => setFormData(prev => ({ 
                    ...prev, 
                    cvv: text.replace(/\D/g, '').slice(0, 3) 
                  }))}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                  error={errors.cvv}
                  required
                />
              </View>
            </View>
          </View>

          <View style={styles.securityInfo}>
            <Text variant="caption" color="tertiary" align="center">
              🔒 Esta es una compra simulada. No se procesarán datos reales.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            variant="outline"
            onPress={handleClose}
            style={styles.cancelButton}
          >
            Cancelar
          </Button>
          
          <Button
            variant="primary"
            onPress={handlePurchase}
            loading={isLoading}
            style={styles.purchaseButton}
          >
            Comprar ${product.price}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing[6],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing[2],
  },
  price: {
    marginTop: spacing[2],
  },
  form: {
    padding: spacing[6],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  securityInfo: {
    padding: spacing[4],
    marginHorizontal: spacing[6],
    backgroundColor: colors.neutral[50],
    borderRadius: 8,
    marginBottom: spacing[4],
  },
  footer: {
    flexDirection: 'row',
    padding: spacing[6],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    gap: spacing[3],
  },
  cancelButton: {
    flex: 1,
  },
  purchaseButton: {
    flex: 2,
  },
});

export default CheckoutModal;