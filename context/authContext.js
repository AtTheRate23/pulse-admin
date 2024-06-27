import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        // OnAuth State Changed
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setIsAuthenticated(true)
                updateUserData(user?.uid)
            } else {
                setUser(null)
                setIsAuthenticated(false)
            }
        })
        return unsub;
    }, [])

    const updateUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid)
            const userDoc = await getDoc(userRef)
            if (userDoc.exists()) {
                let data  = userDoc.data();
                setUser({
                    ...userDoc,
                    username: data.username,
                    profileURL: data.profileURL,
                    userId: data.userId,
                    email: data.email
                })
            }
        } catch (error) {
            throw new Error
        }
    }

    const login = async (email, password) => {
        try {
            // Login Logic
            const response = await signInWithEmailAndPassword(auth, email, password)
            return { success: true }
        } catch (error) {
            let msg = error.message
            if (msg.includes("auth/invalid-email")) {
                msg = "Invalid email"
            }
            if (msg.includes("auth/invalid-credential")) {
                msg = "Invalid credential"
            }
            return { success: false, msg }
        }
    }
    const logout = async () => {
        try {
            // Logout Logic
            await signOut(auth)
            return {
                success: true,
                data: {
                    user: null,
                    isAuthenticated: false
                }
            }
        } catch (error) {
            return {
                success: false,
                msg: error.message,
                error: error
            }
        }
    }
    const register = async (email, password, username, profileURL) => {
        try {
            // Register Logic
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log("register response:", response)

            await setDoc(doc(db, "users", response?.user?.uid), {
                username: username,
                profileURL: profileURL,
                userId: response?.user?.uid,
                email: response?.user?.email,
                createdAt: Date.now()
            })
            return { success: true, data: response?.user }
        } catch (error) {
            let msg = error.message
            if (msg.includes("auth/email-already-in-use")) {
                msg = "Email already in use"
            } else if (msg.includes("auth/invalid-email")) {
                msg = "Invalid email"
            }
            return { success: false, msg }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider')
    }
    return context
}