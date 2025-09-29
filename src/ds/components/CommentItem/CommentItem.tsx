import React from 'react';
import { View } from 'react-native';
import type { Comment } from '../../../types/feed';
import Avatar from '../Avatar';
import { Text } from '../Text';
import styles from './CommentItem.styles';

interface CommentItemProps {
  comment: Comment;
  style?: any;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  style
}) => {
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, style]}>
      <Avatar
        uri={comment.avatarUrl}
        name={comment.fullName}
        size={40}
        style={styles.avatar}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="body2" style={styles.name} align="left">
            {comment.fullName}
          </Text>
          <Text variant="caption" color="tertiary" style={styles.timestamp} align="left">
            {formatDate(comment.timestamp)}
          </Text>
        </View>
        
        <Text variant="body2" style={styles.comment} align="left">
          {comment.comment}
        </Text>
      </View>
    </View>
  );
};



export default CommentItem;