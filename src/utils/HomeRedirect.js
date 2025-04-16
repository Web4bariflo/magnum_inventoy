import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./Helper"; 

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/auth", { replace: true });
    }
  }, []);

  return null;
};

export default HomeRedirect;
