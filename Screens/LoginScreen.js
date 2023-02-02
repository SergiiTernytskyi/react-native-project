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
    Button,
} from "react-native";

const backgroundImage = require("../assets/images/background.jpg");
const initialUserData = {
    email: "",
    password: "",
};

export const LoginScreen = () => {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [userData, setUserData] = useState(initialUserData);
    const [securePassword, setSecurePassword] = useState(true);

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

    const loginHandler = () => {
        hideKeyboard();
        console.log(userData);
        setUserData(initialUserData);
    };

    const toggleShowPassword = () => {
        setSecurePassword((prewState) => !prewState);
    };

    return (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <ImageBackground
                source={backgroundImage}
                style={styles.image}
                resizeMode="cover"
            >
                <View style={styles.container}>
                    <View style={styles.form}>
                        <KeyboardAvoidingView
                            behavior={
                                Platform.OS === "ios" ? "padding" : "height"
                            }
                            style={{
                                marginBottom: isShowKeyboard ? 32 : 44,
                            }}
                        >
                            <Text style={styles.title}>Log In</Text>
                            <TextInput
                                style={{ ...styles.input, marginBottom: 16 }}
                                placeholder="Email"
                                keyboardType="default"
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
                                    keyboardType="default"
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
                        </KeyboardAvoidingView>

                        {!isShowKeyboard && (
                            <>
                                <TouchableOpacity
                                    style={styles.loginBtn}
                                    activeOpacity={0.7}
                                    onPress={loginHandler}
                                >
                                    <Text style={styles.btnLabel}>Log In</Text>
                                </TouchableOpacity>

                                <Text style={styles.text}>
                                    Do not have an account? Register
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },

    image: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    form: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    title: {
        alignSelf: "center",
        marginTop: 32,
        marginBottom: 32,
        fontSize: 30,
        fontFamily: "robotoBold",
    },

    input: {
        height: 51,
        marginHorizontal: 16,
        padding: 16,
        fontSize: 16,
        lineHeight: 1.19,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        placeholderTextColor: "#BDBDBD",
        borderRadius: 8,
        backgroundColor: "#F6F6F6",
        fontFamily: "robotoRegular",
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

    loginBtn: {
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
        marginBottom: 144,
    },
});
