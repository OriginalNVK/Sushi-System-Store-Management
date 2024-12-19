export const loginUser = async (phone, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });

    const result = await response.json();
    return { success: true, role: result.user.role };
  } catch (err) {
    console.error("Error during login request:", err);
    return { success: false, error: "Network error" };
  }
};
