import { useState } from "react";
import {
    FlatList,
    Image,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export const CommentsScreen = ({ route }) => {
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);

    const { id, image } = route.params;

    useEffect(() => {
        getAllComments();
    }, []);

    const getAllComments = async () => {
        const dbPosts = await onSnapshot(
            collection(db, "posts", id, "messages"),
            (data) => {
                setAllComments(
                    data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            }
        );
    };

    const commentHandler = async () => {
        await addDoc(collection(db, "posts", id, "messages"), {
            comment,
            date: Date.now().toString(),
        });

        Keyboard.dismiss();
        setComment("");
    };

    const sortedComments = allComments.sort(
        (firstComment, secondComment) => secondComment.date - firstComment.date
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.listContainer}>
                <Image style={styles.postImage} source={{ uri: image }} />

                <FlatList
                    data={sortedComments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Image
                                style={styles.userImage}
                                source={{ uri: image }}
                            />
                            <View style={styles.commentBox}>
                                <Text style={styles.commentText}>
                                    {item.comment}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>

            <View>
                <View style={{ position: "relative" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Comment..."
                        keyboardType="default"
                        value={comment}
                        onChangeText={(value) => setComment(value)}
                    />
                    <TouchableOpacity
                        style={styles.sendBtn}
                        onPress={commentHandler}
                        activeOpacity={0.7}
                    >
                        <Feather name="arrow-up" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        marginHorizontal: 16,
    },

    listContainer: {
        flex: 1,
    },

    postImage: {
        marginBottom: 32,
        marginTop: 32,
        height: 240,
        borderRadius: 8,
    },

    userImage: {},

    input: {
        height: 50,
        marginHorizontal: 16,
        marginTop: 32,
        marginBottom: 16,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 100,
        placeholderTextColor: "#BDBDBD",
        backgroundColor: "#F6F6F6",
        fontFamily: "robotoRegular",
    },

    sendBtn: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 34,
        height: 34,
        borderRadius: 34,
        backgroundColor: "#FF6C00",
        right: 24,
        bottom: 24,
    },

    commentBox: {
        marginBottom: 24,
        width: 300,
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderRadius: 6,
        padding: 16,
    },

    commentText: {
        fontSize: 13,
        fontFamily: "robotoRegular",
    },

    title: {
        alignSelf: "center",
        marginTop: 32,
        marginBottom: 32,
        fontSize: 30,
        fontFamily: "robotoBold",
    },
});
