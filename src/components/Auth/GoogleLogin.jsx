import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const GoogleLogin = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in with Google!");
    } catch (error) {
      console.error(error.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default GoogleLogin;
