import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CreatePostScreen } from "../Screens/mainScreens/CreatePostScreen";
import { PostsScreen } from "../Screens/mainScreens/PostsScreen";
import { UserProfileScreen } from "../Screens/mainScreens/UserProfileScreen";

import { Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

export const Main = () => {
    return (
        <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
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

                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather name="grid" size={size} color={color} />
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

                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather name="plus" size={size} color={color} />
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
                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather name="user" size={size} color={color} />
                    ),
                }}
            />
        </MainTab.Navigator>
    );
};
