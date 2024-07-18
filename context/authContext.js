import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const apiEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT;

    const login = async (secretKey) => {
        try {
            const response = await fetch(`${apiEndpoint}/admin/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secretKey })
            });

            const result = await response.json();

            if (!response.ok) {
                return { success: false, message: result.message };
            }

            if (result.success) {
                setIsAuthenticated(true);
            }
            return result;
        } catch (error) {
            console.log("Network Error: ", error);
            return { success: false, message: error.message };
        }
    };
    const logout = async () => {
        try {
            const response = await fetch(`${apiEndpoint}/admin/logout`);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error Response: ", errorData);
                return { success: false, message: errorData.message };
            }

            const result = await response.json();
            if (result.success) {
                setIsAuthenticated(false);
            }
            return result;
        } catch (error) {
            console.error("Network Error: ", error);
            return { success: false, message: error.message };
        }
    }
    return (
        <AuthContext.Provider
            value={{
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