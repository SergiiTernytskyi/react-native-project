import { Authentify } from "../components/Authentify";
import { Main } from "../components/Main";

export const useRoute = (isAuthorised) => {
    return isAuthorised ? <Main /> : <Authentify />;
};
