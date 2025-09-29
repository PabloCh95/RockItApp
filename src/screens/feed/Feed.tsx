import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Button, CommentItem, Text } from '../../ds';
import { useAuth } from '../../hooks/auth/useAuth';
import { useFeed } from '../../hooks/feed/useFeed';
import type { Comment } from '../../types/feed';
import styles from './Feed.styles';

export const FeedScreen: React.FC = () => {
  const {
    comments,
    isLoading,
    isRefreshing,
    error,
    handleRefresh,
    loadMore,
  } = useFeed();

  const { logout } = useAuth();

  const renderComment = ({ item }: { item: Comment }) => (
    <CommentItem comment={item} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text variant="h3" align="center" style={styles.emptyTitle}>
        No hay comentarios
      </Text>
      <Text variant="body2" color="secondary" align="center">
        Los comentarios aparecerán aquí cuando estén disponibles
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text variant="body2" color="error" align="center">
        {error}
      </Text>
    </View>
  );

  if (error && comments.length === 0) {
    return (
      <View style={styles.container}>
        {renderError()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={!isLoading ? renderEmpty : null}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      <Button 
        variant="primary"
        onPress={logout}
        style={styles.logoutButton}
      >
          Cerrar Sesión
      </Button>
    </View>
  );
};


export default FeedScreen;