import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { PostItem } from "../../components/PostItem";
import { auth, db } from "../../firebase/config";

export const PostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const unsub = onSnapshot(collection(db, "posts"), (data) => {
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    };

    const user = auth.currentUser;

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.avatarWrapper}>
                <View style={styles.avatarImg}></View>
                <View>
                    <Text style={styles.userName}>{user.displayName}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                </View>
            </View>

            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PostItem
                        name={item.post}
                        location={item.postLocation}
                        image={item.photo}
                        latitude={item.coords.latitude}
                        longitude={item.coords.longitude}
                        navigation={navigation}
                        id={item.id}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    avatarWrapper: {
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 32,
        marginTop: 32,
    },

    avatarImg: {
        backgroundColor: "#f00",
        width: 60,
        height: 60,
        borderRadius: 16,
        marginRight: 8,
    },

    userName: {
        marginBottom: 2,
        fontFamily: "robotoBold",
        fontSize: 13,
        color: "#212121",
    },

    userEmail: {
        fontFamily: "robotoRegular",
        fontSize: 11,
        color: "rgba(33, 33, 33, 0.8)",
    },
});
