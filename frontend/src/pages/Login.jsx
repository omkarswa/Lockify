import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleGoogle = async (cred) => {
    try {
      const res = await api.post("/google", { tokenId: cred.credential });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Google login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
      <Card elevation={6} sx={{ width: "100%", borderRadius: 4, backdropFilter: "blur(10px)" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
            Welcome Back 👋
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
            Login to continue 🚀
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Email" name="email" type="email" fullWidth required onChange={handleChange} />
            <TextField label="Password" name="password" type="password" fullWidth required onChange={handleChange} />

            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 1, borderRadius: 2 }}>
              Login
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ mt: 1 }} color="text.secondary">
              New user? <Link to="/" style={{ color: "#1976d2", textDecoration: "none" }}>Sign Up</Link>
            </Typography>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Box display="flex" justifyContent="center">
              <GoogleLogin onSuccess={handleGoogle} onError={() => alert("Google Login Failed")} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
