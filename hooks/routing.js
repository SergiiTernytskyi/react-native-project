import { Authentify } from "../components/Authentify";
import { HomeScreen } from "../screens/mainScreens/Home";

export const useRoute = (isAuthorised) => {
    return isAuthorised ? <HomeScreen /> : <Authentify />;
};
