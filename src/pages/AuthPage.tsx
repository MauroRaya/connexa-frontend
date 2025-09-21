import AuthForm from "../components/auth/AuthForm";
import Header from "../components/Header";

export default function AuthPage() {
  return (
    <div className="auth-page">
      <Header />
      <main className="auth-main">
        <AuthForm />
      </main>
    </div>
  );
}
