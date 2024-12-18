// src/service.js
const API_URL = "http://localhost:3000"; // Adjust this URL if your backend runs on a different port

// Function to handle login
export const loginUser = async (phone, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CustomerPhone: phone,
        Password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store the token in localStorage (or use it for further requests)
      localStorage.setItem("token", data.token);
      return { success: true, message: data.message };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: "Login failed. Please try again later." };
  }
};
