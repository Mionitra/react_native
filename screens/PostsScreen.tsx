import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator className="flex-1" />;

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-4 p-4 bg-gray-100 rounded"
            onPress={() => navigation.navigate('PostDetail', { id: item.id })}
          >
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text numberOfLines={2}>{item.body}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}