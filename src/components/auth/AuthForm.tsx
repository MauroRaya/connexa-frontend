import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button
          className={`toggle-btn ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Entrar
        </button>
        <button
          className={`toggle-btn ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Cadastrar
        </button>
        <div className={`toggle-slider ${activeTab}`} />
      </div>

      <div className="forms-container">
        {activeTab === "login" ? (
          <div className="form-wrapper slide-in-left">
            <LoginForm />
          </div>
        ) : (
          <div className="form-wrapper slide-in-right">
            <RegisterForm />
          </div>
        )}
      </div>
    </div>
  );
}
