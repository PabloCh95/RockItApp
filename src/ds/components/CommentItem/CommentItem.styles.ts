import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: spacing[4],
      backgroundColor: colors.neutral[0],
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[100],
    },
    avatar: {
      marginRight: spacing[3],
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing[1],
    },
    name: {
      color: colors.neutral[900],
      fontWeight: '600',
      paddingVertical:12,
    },
    timestamp: {
      paddingVertical:12,
      color: colors.neutral[500],
    },
    comment: {
      color: colors.neutral[700],
      lineHeight: 20,
      paddingHorizontal:12,
    },
  });


export default styles;