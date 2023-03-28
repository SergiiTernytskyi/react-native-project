import { Provider } from "react-redux";
import { useFonts } from "expo-font";

import { store } from "./redux/store";

import { Main } from "./components/Main";

export default function App() {
    const [fontsLoaded] = useFonts({
        robotoRegular: require("./assets/roboto/robotoRegular.ttf"),
        robotoBold: require("./assets/roboto/robotoBold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}
