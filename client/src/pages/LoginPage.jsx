import {
  loginWithGoogle,
  retrieveGoogleUser,
} from "../config/api";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    try {
      const googleUser = await loginWithGoogle();
      if (googleUser) {
        await retrieveGoogleUser();
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };
  return (
    <div>
      <div>
        <h1>Welcome to My App</h1>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
}
