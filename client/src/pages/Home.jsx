import { getUserTasks } from "../config/api";

export default function Home() {
  const handleGoogleLogin = async () => {
    try {
      const response = await getUserTasks();
      // Handle the response as needed, e.g., redirect the user after successful login
      console.log("Google login response:", response);
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error("Google login error:", error);
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
