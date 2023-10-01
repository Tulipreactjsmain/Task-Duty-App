import { getUserTasks, loginWithGoogle, retrieveGoogleUser } from "../config/api";

export default function Home() {
  const handleGoogleLogin = async () => {
    try {
      // Authenticate the user with Google
      const googleUser = await loginWithGoogle();
  
      // After successful Google authentication, you can call retrieveGoogleUser to retrieve the user's data.
      if (googleUser) {
        await retrieveGoogleUser();
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };
  return (
    <>
      <div>
        <h1>Welcome to My App</h1>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </>
  );
}
