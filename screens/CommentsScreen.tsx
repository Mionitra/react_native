import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

export default function CommentsScreen({ route }) {
  const { id } = route.params;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <ActivityIndicator className="flex-1" />;

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={comments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-gray-100 rounded">
            <Text className="font-bold">{item.name}</Text>
            <Text className="text-xs text-gray-500">{item.email}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}