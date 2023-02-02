import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";

export default function App() {
    const [fontsLoaded] = useFonts({
        robotoRegular: require("./assets/roboto/robotoRegular.ttf"),
        robotoBold: require("./assets/roboto/robotoBold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            <RegistrationScreen />
            {/* <LoginScreen /> */}
        </>
    );
}

const styles = StyleSheet.create({});
