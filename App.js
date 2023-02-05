import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./hooks/routing";

export default function App() {
    const routing = useRoute(true);

    const [fontsLoaded] = useFonts({
        robotoRegular: require("./assets/roboto/robotoRegular.ttf"),
        robotoBold: require("./assets/roboto/robotoBold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return <NavigationContainer>{routing}</NavigationContainer>;
}
