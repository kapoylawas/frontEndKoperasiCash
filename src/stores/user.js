// Import create dari zustand
import { create } from "zustand";

// Import layanan API
import Api from "../services/api";

// Import js-cookie
import Cookies from "js-cookie";

export const useStore = create((set) => ({
    // State
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {}, // Parse JSON jika cookie ada
    token: Cookies.get("token") || "",

    // Action login
    login: async(credentials) => {
        // Fetch API
        const response = await Api.post("/api/login", credentials);

        // Set state user
        set({ user: response.data.data.user });
        // Set state token
        set({ token: response.data.data.token });

        // Set cookies
        Cookies.set("user", JSON.stringify(response.data.data.user));
        Cookies.set("token", response.data.data.token);
    },

    //action logout
    //logout: () => {
    // Clear cookies
    //Cookies.remove("user");
    //Cookies.remove("token");
    // Clear state
    //set({ user: {}, token: "" });
    //},

    // Action logout
    logout: async() => {
        const token = Cookies.get("token");

        try {
            // Send request to logout API
            await Api.post("/api/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Clear cookies
            Cookies.remove("user");
            Cookies.remove("token");
            // Clear state
            set({ user: {}, token: "" });
        } catch (error) {
            console.error("Logout failed:", error);
            // Handle error if necessary
        }
    },
}));