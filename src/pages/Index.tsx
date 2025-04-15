import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to HomePage
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;
