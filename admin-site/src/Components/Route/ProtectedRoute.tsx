import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface ProtectedProps {
  children: ReactNode;
}

function Protected({ children }: ProtectedProps) {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
}
export default Protected;
