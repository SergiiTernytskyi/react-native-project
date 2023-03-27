import { Authentify } from "../components/Authentify";
import { Home } from "../components/Home";

export const useRoute = (isAuthorised) => {
    return isAuthorised ? <Home /> : <Authentify />;
};
