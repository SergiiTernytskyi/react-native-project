import { useFonts } from "expo-font";
import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";

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
            {/* <LoginScreen /> */}
            <RegistrationScreen />
        </>
    );
}
