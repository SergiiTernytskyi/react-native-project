import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { PostItem } from "../../components/PostItem";
import { db } from "../../firebase/config";
import { signOutUser } from "../../redux/auth/authOperations";

const backgroundImage = require("../../assets/images/background.jpg");

export const UserProfileScreen = ({ navigation }) => {
    const [userPosts, setUserPosts] = useState([]);

    const { userId, name } = useSelector((state) => state.auth);

    const getUserPost = async () => {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("userId", "==", userId));

        const querySnapshot = await getDocs(q);

        setUserPosts(
            querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
        );
    };

    useEffect(() => {
        getUserPost();
    }, []);

    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(signOutUser());
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.image}>
                <View style={styles.form}>
                    <View style={styles.avatar}></View>
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        activeOpacity={0.7}
                        onPress={logOut}
                    >
                        <Feather name="log-out" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                    <Text style={styles.userName}>{name}</Text>

                    <FlatList
                        data={userPosts}
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
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        flex: 1,
        justifyContent: "flex-end",
        resizeMode: "cover",
    },

    avatar: {
        position: "absolute",
        top: -60,
        alignSelf: "center",
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        zIndex: 5,
    },

    logoutBtn: {
        position: "absolute",
        top: 22,
        right: 0,
        marginHorizontal: 16,
    },

    form: {
        height: "80%",
        position: "relative",
        marginTop: 150,
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    userName: {
        marginTop: 92,
        marginBottom: 34,
        fontFamily: "robotoBold",
        fontSize: 30,
        color: "#212121",
        alignSelf: "center",
    },

    title: {
        alignSelf: "center",
        marginTop: 32,
        marginBottom: 32,
        fontSize: 30,
        fontFamily: "robotoBold",
    },
});
