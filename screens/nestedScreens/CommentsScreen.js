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
import { auth, db } from "../../firebase/config";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const CommentsScreen = ({ route }) => {
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [user, setUser] = useState(null);

    const { id, image } = route.params;
    const { avatar, userId } = useSelector((state) => state.auth);

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

        const user = auth.currentUser;
        setUser(user);
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
                        <View
                            style={{
                                flexDirection:
                                    user.uid === userId ? "row-reverse" : "row",
                                alignItems: "flex-start",
                            }}
                        >
                            <Image
                                style={{
                                    ...styles.userImage,
                                    marginLeft: user.uid === userId ? 16 : 0,
                                    marginRight: user.uid === userId ? 0 : 16,
                                }}
                                source={{ uri: avatar }}
                            />
                            <View
                                style={{
                                    ...styles.commentBox,
                                    borderTopRightRadius:
                                        user.uid === userId ? 0 : 6,
                                    borderTopLeftRadius:
                                        user.uid === userId ? 6 : 0,
                                }}
                            >
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

    userImage: {
        marginRight: 16,
        width: 28,
        height: 28,
        borderRadius: 14,
    },

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
        width: "87%",
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        padding: 16,
    },

    commentText: {
        fontSize: 13,
        fontFamily: "robotoRegular",
    },
});
