import { Button, Container, Typography, Card, CardContent, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Optional: fetch latest user info from backend
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/me"); // protected route
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // update localStorage
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchMe();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12, display: "flex", justifyContent: "center" }}>
      <Card elevation={6} sx={{ width: "100%", maxWidth: 600, borderRadius: 4, textAlign: "center", p: 4 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome, {user?.username} 🎉
          </Typography>

          <Typography variant="h6" color="text.secondary" mb={2}>
            Role: {user?.role?.toUpperCase()}
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={4}>
            You’re successfully logged in. This is your main hub 🚀
          </Typography>

          {user?.role === "admin" && (
            <Button
              variant="contained"
              color="error"
              sx={{ mb: 2 }}
              onClick={() => navigate("/admin/users")}
            >
              Manage Users
            </Button>
          )}

          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleLogout}
              sx={{ borderRadius: 2, px: 4 }}
            >
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
