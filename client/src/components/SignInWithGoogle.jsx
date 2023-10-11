import React from "react";
import { loginWithGoogle } from "../config/api";
import { useNavigate } from "react-router-dom";

const SignInWithGoogle = () => {
  const history = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const googleOAuthResponse = await loginWithGoogle();

      if (googleOAuthResponse.success) {
        history.push("/");
      } else {
        console.error("Google Sign-In failed:", googleOAuthResponse.error);
      }
    } catch (error) {
      console.error("Error while signing in with Google:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default SignInWithGoogle;
