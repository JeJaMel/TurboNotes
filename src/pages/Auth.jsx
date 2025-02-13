import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPassword from "../components/Auth/ForgotPassword";
import GoogleLogin from "../components/Auth/GoogleLogin";

const Auth = () => {
  return (
    <div>
      <h1>Welcome to Auth!</h1>
      <Login />
      <ForgotPassword />
      <Register />
        <GoogleLogin buttonText="Sign in with google" />
        <GoogleLogin/>
    </div>
  );
};

export default Auth;
