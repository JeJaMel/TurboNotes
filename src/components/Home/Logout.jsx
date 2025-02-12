import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out!");
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
