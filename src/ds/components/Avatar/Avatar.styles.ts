import { StyleSheet } from "react-native";
import { colors, typography } from "../../theme";


const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.neutral[100],
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    image: {
      backgroundColor: colors.neutral[200],
    },
    initialsContainer: {
      backgroundColor: colors.primary[500],
      justifyContent: 'center',
      alignItems: 'center',
    },
    initials: {
      color: colors.neutral[0],
      fontWeight: typography.fontWeight.bold,
      fontFamily: typography.fontFamily.bold,
    },
  });


export default styles;