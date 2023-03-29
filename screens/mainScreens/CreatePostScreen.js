import { useEffect, useState } from "react";
import {
    Button,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { nanoid } from "nanoid";

import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { storage, db } from "../../firebase/config";

import { Feather } from "@expo/vector-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";

const initialPost = {
    postName: "",
    postLocation: "",
};

export const CreatePostScreen = ({ navigation }) => {
    const [post, setPost] = useState(initialPost);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);

    const { userId, name } = useSelector((state) => state.auth);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
        })();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePhoto = async () => {
        const { uri } = await camera.takePictureAsync();
        setPhoto(uri);
    };

    const uploadPhotoToStorage = async () => {
        const storageRef = ref(storage, `images/${nanoid()}`);

        const response = await fetch(photo);
        const file = await response.blob();

        await uploadBytes(storageRef, file);

        const filePath = await getDownloadURL(storageRef);
        return filePath;
    };

    const uploadPostToServer = async () => {
        const { postName, postLocation } = post;

        if (!photo || post.postName === "" || post.postLocation === "") {
            return;
        }

        const { coords } = await Location.getCurrentPositionAsync();

        const photoFile = await uploadPhotoToStorage();

        await addDoc(collection(db, "posts"), {
            photo: photoFile,
            post: postName,
            postLocation,
            coords,
            userId,
            userName: name,
        });
    };

    const sendPost = async () => {
        await uploadPhotoToStorage();
        await uploadPostToServer();

        navigation.navigate("DefaultPostsScreen");
        setPost(initialPost);
        setPhoto(null);
    };

    return (
        <View style={styles.container}>
            <View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : ""}
                    keyboardVerticalOffset={0}
                >
                    <Camera style={styles.camera} ref={setCamera}>
                        <TouchableOpacity
                            style={styles.cameraBtn}
                            onPress={takePhoto}
                        >
                            <Feather name="camera" size={24} color="black" />
                        </TouchableOpacity>
                    </Camera>

                    <Text style={styles.info}>
                        {!photo ? "Load the photo" : "Edit the photo"}
                    </Text>

                    <View>
                        <TextInput
                            style={{ ...styles.input, marginTop: 32 }}
                            placeholder="Name..."
                            keyboardType="default"
                            value={post.postName}
                            onChangeText={(value) =>
                                setPost((prewState) => ({
                                    ...prewState,
                                    postName: value,
                                }))
                            }
                        />
                        <View style={styles.locationWrapper}>
                            <Feather
                                name="map-pin"
                                size={22}
                                color="#BDBDBD"
                                style={styles.locationIcon}
                            />

                            <TextInput
                                style={{
                                    ...styles.input,
                                    ...styles.locationText,
                                }}
                                placeholder="Location..."
                                keyboardType="default"
                                value={post.postLocation}
                                onChangeText={(value) =>
                                    setPost((prewState) => ({
                                        ...prewState,
                                        postLocation: value,
                                    }))
                                }
                            />
                        </View>

                        <TouchableOpacity
                            style={{
                                ...styles.sendBtn,
                                backgroundColor:
                                    !photo ||
                                    post.postName === "" ||
                                    post.postLocation === ""
                                        ? "#F6F6F6"
                                        : "#FF6C00",
                            }}
                            activeOpacity={0.7}
                            onPress={sendPost}
                        >
                            <Text
                                style={{
                                    ...styles.btnLabel,
                                    color:
                                        post.postName === "" ||
                                        post.postLocation === ""
                                            ? "#BDBDBD"
                                            : "#FFFFFF",
                                }}
                            >
                                Publish
                            </Text>
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
        marginHorizontal: 16,
    },

    camera: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 32,
        height: 240,
        borderRadius: 8,
    },

    cameraBtn: {
        position: "absolute",
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "#F6F6F6",
    },

    info: {
        marginTop: 8,
        fontSize: 16,
        fontFamily: "robotoBold",
        color: "#BDBDBD",
    },

    locationWrapper: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
    },

    locationText: {
        marginLeft: 32,
    },

    locationIcon: {
        position: "absolute",
        left: 0,
        top: 12,
    },

    input: {
        height: 50,
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        placeholderTextColor: "#BDBDBD",
        fontFamily: "robotoRegular",
    },

    inputLocation: {
        marginTop: 16,
        paddingLeft: 28,
    },

    sendBtn: {
        marginTop: 32,
        borderRadius: 100,
        height: 52,
        padding: 16,
    },

    btnLabel: {
        alignSelf: "center",
        fontSize: 16,
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
