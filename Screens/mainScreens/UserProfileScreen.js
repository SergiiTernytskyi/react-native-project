import { StyleSheet, Text, View } from "react-native";

export const UserProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile Screen </Text>
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
