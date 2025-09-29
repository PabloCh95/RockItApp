import { StyleSheet } from "react-native";
import { spacing } from "../../ds";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    listContainer: {
      padding: spacing[4],
      flexGrow: 1,
    },
    row: {
      justifyContent: 'space-between',
    },
    productCard: {
      width: '48%',
    },
    errorText: {
        padding: spacing[3],
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing[8],
    },
    emptyTitle: {
      marginBottom: 8,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing[8],
    },
  });

  export default styles;