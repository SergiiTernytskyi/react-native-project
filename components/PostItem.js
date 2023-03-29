import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const PostItem = ({
    name,
    location,
    image,
    navigation,
    latitude,
    longitude,
    id,
}) => {
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        getAllComments();
    }, []);

    const getAllComments = async () => {
        await onSnapshot(collection(db, "posts", id, "messages"), (data) => {
            setAllComments(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
    };

    return (
        <View>
            <Image style={styles.postImage} source={{ uri: image }} />
            <Text style={styles.postName}>{name}</Text>
            <View style={styles.metaWrapper}>
                <View style={styles.wrap}>
                    <TouchableOpacity
                        style={{ ...styles.metaBtn, ...styles.commentBtn }}
                        activeOpacity={0.7}
                        onPress={() =>
                            navigation.navigate("CommentsScreen", { id, image })
                        }
                    >
                        <Feather
                            name="message-circle"
                            size={24}
                            color="#BDBDBD"
                        />
                        <Text style={styles.postMetaText}>
                            {allComments.length}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.metaBtn}
                        activeOpacity={0.7}
                    >
                        <Feather name="thumbs-up" size={24} color="#FF6C00" />
                        <Text style={styles.postMetaText}>0</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.metaBtn}
                    activeOpacity={0.7}
                    onPress={() =>
                        navigation.navigate("MapScreen", {
                            params: { latitude, longitude, name },
                        })
                    }
                >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.postMetaText}>{location}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },

    postImage: {
        marginBottom: 8,
        marginHorizontal: 16,
        height: 240,
        borderRadius: 8,
    },

    postName: {
        marginBottom: 10,
        marginHorizontal: 16,
        fontFamily: "robotoBold",
        fontSize: 16,
        color: "#212121",
    },

    metaWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 16,
    },

    wrap: {
        flex: 1,
        flexDirection: "row",
    },

    metaBtn: {
        flexDirection: "row",
    },

    commentBtn: {
        marginRight: 26,
    },

    postMetaText: {
        marginBottom: 34,
        marginLeft: 8,
        fontFamily: "robotoRegular",
        fontSize: 16,
        color: "#212121",
    },
});
