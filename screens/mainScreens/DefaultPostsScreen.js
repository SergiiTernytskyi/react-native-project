import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import { CommentsScreen } from "../nestedScreens/CommentsScreen";
import { PostsScreen } from "../nestedScreens/PostsScreen";
import { MapScreen } from "../nestedScreens/MapScreen";

import { UserContext } from "../../App";

const NestedScreen = createStackNavigator();

export const DefaultPostsScreen = () => {
    const value = useContext(UserContext);
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                name="PostsScreen"
                component={PostsScreen}
                options={() => ({
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
                })}
            />
            <NestedScreen.Screen
                name="MapScreen"
                component={MapScreen}
                options={({ navigation }) => ({
                    title: "Map",
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
                                navigation.navigate("PostsScreen");
                            }}
                        >
                            <Feather
                                name="arrow-left"
                                size={24}
                                color="rgba(33, 33, 33, 0.8)"
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
            <NestedScreen.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={({ navigation }) => ({
                    title: "Comments",
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
                                navigation.navigate("PostsScreen");
                            }}
                        >
                            <Feather
                                name="arrow-left"
                                size={24}
                                color="rgba(33, 33, 33, 0.8)"
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
        </NestedScreen.Navigator>
    );
};

const styles = StyleSheet.create({
    backBtn: {
        marginHorizontal: 16,
    },
});
