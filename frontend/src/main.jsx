import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="696630139529-kb47s557ker1p9m4rc9dc5c748r8gse1.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
