import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CreatePostScreen } from "../screens/mainScreens/CreatePostScreen";
import { PostsScreen } from "../screens/mainScreens/PostsScreen";
import { UserProfileScreen } from "../screens/mainScreens/UserProfileScreen";

import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { UserContext } from "../App";
import { useContext } from "react";

const MainTab = createBottomTabNavigator();

export const Main = () => {
    const value = useContext(UserContext);

    return (
        <MainTab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabNavigation,
            }}
        >
            <MainTab.Screen
                name="Posts"
                component={PostsScreen}
                options={{
                    title: "Posts",
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTintColor: "#212121",
                    headerTitleStyle: {
                        fontFamily: "robotoBold",
                    },
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <TouchableOpacity
                            style={styles.backBtn}
                            activeOpacity={0.7}
                            onPress={() => {
                                value();
                            }}
                        >
                            <Feather name="log-out" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                    ),

                    tabBarIcon: () => (
                        <Feather
                            name="grid"
                            size={24}
                            color={"rgba(33, 33, 33, 0.8)"}
                        />
                    ),
                }}
            />
            <MainTab.Screen
                name="Create"
                component={CreatePostScreen}
                options={{
                    title: "Create post",
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTintColor: "#212121",
                    headerTitleStyle: {
                        fontFamily: "robotoBold",
                    },
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <TouchableOpacity
                            style={styles.backBtn}
                            activeOpacity={0.7}
                            onPress={() => alert("This is a button!")}
                        >
                            <Feather
                                name="arrow-left"
                                size={24}
                                color="rgba(33, 33, 33, 0.8)"
                            />
                        </TouchableOpacity>
                    ),

                    tabBarIcon: () => (
                        <View
                            style={{
                                ...styles.createPost,
                                backgroundColor: "#FF6C00",
                            }}
                        >
                            <Feather name="plus" size={20} color={"#fff"} />
                        </View>
                    ),

                    tabBarStyle: { display: "none" },
                }}
            />
            <MainTab.Screen
                name="Profile"
                component={UserProfileScreen}
                options={{
                    headerShown: false,

                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTintColor: "#212121",
                    headerTitleStyle: {
                        fontFamily: "robotoBold",
                    },
                    headerTitleAlign: "center",
                    tabBarIcon: () => (
                        <Feather
                            name="user"
                            size={24}
                            color={"rgba(33, 33, 33, 0.8)"}
                        />
                    ),
                }}
            />
        </MainTab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabNavigation: {
        paddingTop: 9,
        paddingBottom: 34,
        height: 84,
        paddingHorizontal: 40,
    },

    backBtn: {
        marginHorizontal: 16,
    },

    createPost: {
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        borderRadius: 20,
    },
});
