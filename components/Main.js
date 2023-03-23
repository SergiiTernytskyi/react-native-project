import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CreatePostScreen } from "../screens/mainScreens/CreatePostScreen";
import { PostsScreen } from "../screens/mainScreens/PostsScreen";
import { UserProfileScreen } from "../screens/mainScreens/UserProfileScreen";

import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

const MainTab = createBottomTabNavigator();

export const Main = () => {
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

                    tabBarIcon: ({ color }) => (
                        <Feather name="grid" size={24} color={color} />
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

                    tabBarIcon: () => (
                        <View style={styles.createPost}>
                            <Feather name="plus" size={20} color={"#fff"} />
                        </View>
                    ),
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
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={24} color={color} />
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

    createPost: {
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        backgroundColor: "#FF6C00",
        borderRadius: 20,
    },
});
