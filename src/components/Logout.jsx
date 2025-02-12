import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Logout = () => {
  const handleLogout = async () => {
    await signOut(auth);
    console.log("User logged out!");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
