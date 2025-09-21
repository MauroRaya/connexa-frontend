import { useState } from "react";
import InputField from "../InputField";
import Toast from "../Toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      console.log("✅ Login bem-sucedido:", data);
      setToast({ message: "Login realizado com sucesso!", type: "success" });
    } catch (err: any) {
      setToast({ message: err.message || "Erro desconhecido", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Bem-vindo de volta!</h2>
          <p>Entre na sua conta para continuar conectado aos seus estudos</p>
        </div>

        <div className="form-body">
          <InputField
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <InputField
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <button type="submit" className="btn btn-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
