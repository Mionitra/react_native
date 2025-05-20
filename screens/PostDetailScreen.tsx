import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

export default function PostDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <ActivityIndicator className="flex-1" />;

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-2">{post.title}</Text>
      <Text className="mb-4">{post.body}</Text>
      <Button
        title="Voir les commentaires"
        onPress={() => navigation.navigate('Comments', { id })}
      />
    </View>
  );
}
