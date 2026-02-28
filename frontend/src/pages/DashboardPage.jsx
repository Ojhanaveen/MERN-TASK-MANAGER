import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4">
        Welcome to Dashboard 🚀
      </Typography>
    </Container>
  );
};

export default DashboardPage;