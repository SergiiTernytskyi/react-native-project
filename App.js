import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./hooks/routing";
import { createContext, useState } from "react";

export const UserContext = createContext();

export default function App() {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const routing = useRoute(isLogedIn);

    const [fontsLoaded] = useFonts({
        robotoRegular: require("./assets/roboto/robotoRegular.ttf"),
        robotoBold: require("./assets/roboto/robotoBold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <UserContext.Provider
            value={() => setIsLogedIn((prevState) => !prevState)}
        >
            <NavigationContainer>{routing}</NavigationContainer>
        </UserContext.Provider>
    );
}
