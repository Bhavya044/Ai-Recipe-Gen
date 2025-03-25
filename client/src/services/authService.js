const API_URL = "http://localhost:5000/api/auth";

// ✅ Signup API
export const signup = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Signup failed");

    // Save token to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user);
    return data;
  } catch (error) {
    throw error;
  }
};

// ✅ Signin API
export const signin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Signin failed");

    // Save token to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user);
    return data;
  } catch (error) {
    throw error;
  }
};

// ✅ Logout function
export const logout = () => {
  localStorage.removeItem("token");
};
