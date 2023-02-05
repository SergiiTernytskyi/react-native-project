import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../Screens/LoginScreen";
import { RegistrationScreen } from "../Screens/RegistrationScreen";

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
                name="Register"
                component={RegistrationScreen}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
};
