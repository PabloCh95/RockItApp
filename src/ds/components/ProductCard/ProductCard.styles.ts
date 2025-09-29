import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from '../../theme';


const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.neutral[0],
      borderRadius: borderRadius.md,
      marginBottom: spacing[4],
      shadowColor: colors.neutral[900],
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    imageContainer: {
      height: 200,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.neutral[100],
    },
    content: {
      padding: spacing[4],
    },
    title: {
      color: colors.neutral[900],
      marginBottom: spacing[2],
      lineHeight: 20,
    },
    price: {
      marginBottom: spacing[1],
      padding: spacing[4],
    },
    rating: {
      padding: spacing[3],
    },
    ratingText: {
      padding: spacing[3],
    },

  });

export default styles;