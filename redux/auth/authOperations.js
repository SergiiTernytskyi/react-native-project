import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { signOutChange, stateChange, updateUser } from "./authSlice";

export const signUp =
    ({ login, email, password }) =>
    async (dispatch, getState) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, {
                displayName: login,
            });

            const user = auth.currentUser;

            dispatch(updateUser({ userId: user.uid, name: user.displayName }));
        } catch (error) {
            console.log(error.message);
        }
    };

export const signIn =
    ({ email, password }) =>
    async (dispatch, getState) => {
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            dispatch(updateUser({ userId: user.uid, name: user.displayName }));
        } catch (error) {
            console.log(error.message);
        }
    };

export const authStateChange = () => async (dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const updateProfile = {
                userId: user.uid,
                name: user.displayName,
            };
            dispatch(updateUser(updateProfile));
            dispatch(stateChange({ stateChange: true }));
        }
    });
};

export const signOutUser = () => async (dispatch, getState) => {
    try {
        await signOut(auth);

        dispatch(signOutChange());
    } catch (error) {
        console.log(error.message);
    }
};
