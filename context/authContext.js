import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    const login = async (secretKey) => {
        try {
            const response = await fetch("http://192.168.0.21:3000/admin/verify", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secretKey })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error Response: ", errorData);
                return { success: false, message: errorData.message };
            }

            const result = await response.json();
            if (result.success) {
                setIsAuthenticated(true);
            }
            return result;
        } catch (error) {
            console.error("Network Error: ", error);
            return { success: false, message: error.message };
        }
    };
    const logout = async () => {
        try {
            return {
                success: true,
                message: 'You have been logged out'
            }
        } catch (error) {
            return {
                success: false,
                msg: error.message,
                error: error
            }
        }
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
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