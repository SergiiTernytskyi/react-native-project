import { StyleSheet, Text, View } from "react-native";

export const PostsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Main Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#fff",
    },

    title: {
        alignSelf: "center",
        marginTop: 32,
        marginBottom: 32,
        fontSize: 30,
        fontFamily: "robotoBold",
    },
});
