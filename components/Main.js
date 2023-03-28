import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { useRoute } from "../hooks/routing";

import { authStateChange } from "../redux/auth/authOperations";

export const Main = () => {
    const dispatch = useDispatch();

    const { stateChange } = useSelector((state) => state.auth);

    const routing = useRoute(stateChange);

    useEffect(() => {
        dispatch(authStateChange());
    }, []);

    return <NavigationContainer>{routing}</NavigationContainer>;
};
