import { useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

const initialPost = {
    postName: "",
    postLocation: "",
};

export const CreatePostScreen = () => {
    const [post, setPost] = useState(initialPost);

    return (
        <View style={styles.container}>
            <View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : ""}
                    keyboardVerticalOffset={0}
                >
                    <View style={styles.camera}></View>
                    <Text style={styles.info}>Load the photo</Text>

                    <View>
                        <TextInput
                            style={{ ...styles.input, marginTop: 32 }}
                            placeholder="Name..."
                            keyboardType="default"
                            value={post.postName}
                        />

                        <TextInput
                            style={{ ...styles.input, marginTop: 16 }}
                            placeholder="Location..."
                            keyboardType="default"
                            value={post.postLocation}
                        />

                        <TouchableOpacity
                            style={styles.sendBtn}
                            activeOpacity={0.7}
                            // onPress={loginHandler}
                        >
                            <Text style={styles.btnLabel}>Publish</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>

            <View>
                <View
                    style={{
                        ...styles.deletePost,
                        backgroundColor: "#F6F6F6",
                    }}
                >
                    <Feather name="trash-2" size={20} color={"#DADADA"} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },

    camera: {
        marginTop: 32,
        marginHorizontal: 16,
        height: 240,
        backgroundColor: "#F6F6F6",
        borderColor: "#E8E8E8",
        borderWidth: 1,
        borderRadius: 8,
    },

    info: {
        marginTop: 8,
        marginHorizontal: 16,
        fontSize: 16,
        fontFamily: "robotoBold",
        color: "#BDBDBD",
    },

    input: {
        height: 50,
        marginHorizontal: 16,
        padding: 16,
        fontSize: 16,
        lineHeight: 1.19,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        placeholderTextColor: "#BDBDBD",
        fontFamily: "robotoRegular",
    },

    sendBtn: {
        marginTop: 32,
        marginHorizontal: 16,
        borderRadius: 100,
        backgroundColor: "#FF6C00",
        height: 52,
        padding: 16,
    },

    btnLabel: {
        alignSelf: "center",
        fontSize: 16,
        color: "#fff",
    },

    deletePost: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        borderRadius: 20,
        marginBottom: 34,
    },
});
