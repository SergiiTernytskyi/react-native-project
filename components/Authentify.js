import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegistrationScreen } from "../screens/auth/RegistrationScreen";

const AuthStack = createNativeStackNavigator();

export const Authentify = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Registration"
                component={RegistrationScreen}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
};
