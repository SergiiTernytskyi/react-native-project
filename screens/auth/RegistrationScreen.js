import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { signUp } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

import * as DocumentPicker from "expo-document-picker";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const backgroundImage = require("../../assets/images/background.jpg");
const initialUserData = {
    login: "",
    email: "",
    password: "",
    avatar: "",
};

export const RegistrationScreen = ({ navigation }) => {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [userData, setUserData] = useState(initialUserData);
    const [securePassword, setSecurePassword] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
            setIsShowKeyboard(true);
        });
        const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
            setIsShowKeyboard(false);
        });

        return () => {
            showKeyboard.remove();
            hideKeyboard.remove();
        };
    }, []);

    const hideKeyboard = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    const registerHandler = () => {
        hideKeyboard();
        dispatch(signUp(userData));

        setUserData(initialUserData);
    };

    const toggleShowPassword = () => {
        setSecurePassword((prewState) => !prewState);
    };

    const uploadAvatarToStorage = async (fileAvatar) => {
        const storageRef = ref(
            storage,
            `avatars/avatar${Date.now().toString()}`
        );

        const response = await fetch(fileAvatar);
        const file = await response.blob();

        await uploadBytes(storageRef, file);

        const filePath = await getDownloadURL(storageRef);

        return filePath;
    };

    const addAvatar = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync();

            const avatarFile = await uploadAvatarToStorage(res.uri);

            setUserData((prevState) => ({
                ...prevState,
                avatar: avatarFile,
            }));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <View style={styles.container}>
                <ImageBackground source={backgroundImage} style={styles.image}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : ""}
                        keyboardVerticalOffset={0}
                    >
                        <View
                            style={{
                                ...styles.form,
                                paddingBottom: isShowKeyboard ? 32 : 78,
                            }}
                        >
                            <View style={styles.avatarWrapper}>
                                {userData.avatar ? (
                                    <Image
                                        style={styles.avatar}
                                        source={{ uri: userData.avatar }}
                                    />
                                ) : (
                                    <Image
                                        style={styles.avatar}
                                        source={null}
                                    />
                                )}

                                <TouchableOpacity
                                    style={styles.addBtn}
                                    activeOpacity={0.7}
                                    onPress={addAvatar}
                                >
                                    <AntDesign
                                        name="pluscircleo"
                                        size={25}
                                        color="#FF6C00"
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.title}>Registration</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Login"
                                value={userData.login}
                                onFocus={() => setIsShowKeyboard(true)}
                                onChangeText={(value) =>
                                    setUserData((prewState) => ({
                                        ...prewState,
                                        login: value,
                                    }))
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={userData.email}
                                onFocus={() => setIsShowKeyboard(true)}
                                onChangeText={(value) =>
                                    setUserData((prewState) => ({
                                        ...prewState,
                                        email: value,
                                    }))
                                }
                            />
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    secureTextEntry={securePassword}
                                    style={styles.input}
                                    placeholder="Password"
                                    value={userData.password}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    onChangeText={(value) =>
                                        setUserData((prewState) => ({
                                            ...prewState,
                                            password: value,
                                        }))
                                    }
                                />
                                <TouchableOpacity
                                    style={styles.passwordBtn}
                                    onPress={toggleShowPassword}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.passwordBtnTitle}>
                                        {securePassword ? "Show" : "Hide"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {!isShowKeyboard && (
                                <>
                                    <TouchableOpacity
                                        style={styles.registerBtn}
                                        activeOpacity={0.7}
                                        onPress={registerHandler}
                                    >
                                        <Text style={styles.btnLabel}>
                                            Register now
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Login");
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.text}>
                                            Already have an account? Enter
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
    },

    form: {
        position: "relative",
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    avatarWrapper: {
        position: "absolute",
        top: -60,
        alignSelf: "center",
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 16,
    },

    addBtn: {
        position: "absolute",
        left: 107.5,
        top: 80,

        width: 26,
        height: 26,
        backgroundColor: "#fff",
        borderRadius: 13,
    },

    title: {
        alignSelf: "center",
        marginTop: 92,
        marginBottom: 32,
        fontSize: 30,
        fontFamily: "robotoBold",
    },

    input: {
        height: 51,
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        placeholderTextColor: "#BDBDBD",
        borderRadius: 8,
        backgroundColor: "#F6F6F6",
    },

    passwordBtn: {
        position: "absolute",
        right: 16,
        top: 16,
    },

    passwordBtnTitle: {
        padding: 16,
        fontFamily: "robotoRegular",
        fontSize: 16,
        lineHeight: 1.19,
        color: "#1B4371",
    },

    registerBtn: {
        marginTop: 44,
        marginBottom: 16,
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

    text: {
        alignSelf: "center",
        color: "#1B4371",
        fontSize: 16,
    },
});
