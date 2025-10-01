import { Button, Container, Typography, Card, CardContent, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 4,
          textAlign: "center",
          p: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "primary.main" }}
          >
            Welcome to Dashboard 🎉
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={4}>
            You’re successfully logged in. This is your main hub where you’ll manage
            everything 🚀
          </Typography>

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
