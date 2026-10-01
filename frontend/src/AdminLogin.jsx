import { useState } from "react";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("token", data.token);

                window.location.href = "/admin";
            } else {
                setMessage(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);

            setMessage(
                "Server error. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5"
            }}
        >
            <div
                style={{
                    width: "380px",
                    background: "#ffffff",
                    padding: "35px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "10px"
                    }}
                >
                    Admin Login
                </h2>

                <p
                    style={{
                        textAlign: "center",
                        color: "#777",
                        marginBottom: "25px"
                    }}
                >
                    Login to Portfolio CMS
                </p>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            boxSizing: "border-box"
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            boxSizing: "border-box"
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#111827",
                            color: "#ffffff",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {message && (
                    <p
                        style={{
                            color: "red",
                            textAlign: "center",
                            marginTop: "15px"
                        }}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default AdminLogin;