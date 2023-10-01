import React, { useEffect } from "react";
import { retrieveGoogleUser } from "../config/api";

export default function GoogleCallback() {
  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        await retrieveGoogleUser();
      } catch (error) {
        console.error("Error during Google callback:", error);
      }
    };

    handleGoogleCallback();
  }, []);
  return <div>You can display a loading indicator or a message here</div>;
}
