import { StyleSheet, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { CreatePostScreen } from "../screens/mainScreens/CreatePostScreen";
import { UserProfileScreen } from "../screens/mainScreens/UserProfileScreen";
import { DefaultPostsScreen } from "../screens/mainScreens/DefaultPostsScreen";

const MainTab = createBottomTabNavigator();

export const Home = () => {
    return (
        <MainTab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabNavigation,
                tabBarIcon: () => (
                    <Feather
                        name="grid"
                        size={24}
                        color={"rgba(33, 33, 33, 0.8)"}
                    />
                ),
            }}
        >
            <MainTab.Screen
                name="DefaultPostsScreen"
                component={DefaultPostsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <MainTab.Screen
                name="Create"
                component={CreatePostScreen}
                options={({ navigation }) => ({
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
                            onPress={() => {
                                navigation.navigate("DefaultPostsScreen");
                            }}
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
                })}
            />
            <MainTab.Screen
                name="Profile"
                component={UserProfileScreen}
                options={() => ({
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
                })}
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
