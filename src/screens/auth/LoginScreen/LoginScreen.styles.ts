import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../../ds";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: spacing[8],
    },
    title: {
      paddingTop: spacing[8],
      padding: spacing[4],
    },
    subtitle: {
      paddingTop: spacing[6],
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      padding: spacing[4],
    },
    error: {
      paddingTop: spacing[6],
      padding: spacing[3],
      backgroundColor: colors.neutral[100],
      borderRadius: borderRadius.base,
    },
    button: {
      marginTop: 24,
    },
    helper: {
      marginTop: 16,
      padding: spacing[4],
    },
});

export default styles;