import AuthForm from "../components/auth/AuthForm";
import AuthHeader from "../components/auth/AuthHeader";

export default function AuthPage() {
  return (
    <div className="auth-page">
      <AuthHeader />
      <main className="auth-main">
        <AuthForm />
      </main>
    </div>
  );
}
