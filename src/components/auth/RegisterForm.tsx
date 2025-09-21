import { useState } from "react";
import InputField from "../InputField";
import Toast from "../Toast";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password 
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta");
      }

      const data = await response.json();
      console.log("✅ Cadastro bem-sucedido:", data);
      setToast({ message: "Conta criada com sucesso!", type: "success" });
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
          <h2>Crie sua conta</h2>
          <p>Junte-se à comunidade de estudos da Conexxa</p>
        </div>

        <InputField
          label="Nome completo"
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Senha"
          type="password"
          placeholder="Crie uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-full" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
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
