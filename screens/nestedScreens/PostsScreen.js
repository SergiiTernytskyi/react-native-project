import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { PostItem } from "../../components/PostItem";

export const PostsScreen = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PostItem
                        name={item.postName}
                        location={item.postLocation}
                        image={item.photo}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        navigation={navigation}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
});
