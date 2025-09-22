import { useState } from "react";

interface ModalCreateGroupProps {
  onClose: () => void;
  onSuccess: () => void;
  addToast: (message: string, type: "success" | "error") => void;
}

export default function ModalCreateGroup({
  onClose,
  onSuccess,
  addToast,
}: ModalCreateGroupProps) {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    modality: "PRESENCIAL",
    location: "",
    objective: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        addToast("Token de autenticação não encontrado", "error");
        onClose();
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        addToast(data.error || "Erro ao criar grupo", "error");
        return;
      }

      addToast("Grupo criado com sucesso!", "success");
      onSuccess();
      onClose();
    } catch (err: any) {
      addToast(err.message || "Erro de conexão", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-content"> {/* <-- DIV INTERNA AQUI */}
          <h2>Criar Grupo</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nome do grupo"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Matéria"
              value={form.subject}
              onChange={handleChange}
              required
            />
            <select
              name="modality"
              value={form.modality}
              onChange={handleChange}
              required
            >
              <option value="PRESENCIAL">Presencial</option>
              <option value="ONLINE">Online</option>
              <option value="HIBRIDO">Híbrido</option>
            </select>
            <input
              type="text"
              name="location"
              placeholder="Localização ou link"
              value={form.location}
              onChange={handleChange}
              required
            />
            <textarea
              name="objective"
              placeholder="Objetivo do grupo"
              value={form.objective}
              onChange={handleChange}
              required
            ></textarea>

            <div className="modal-actions">
              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? "Criando..." : "Criar"}
              </button>
              <button type="button" className="btn cancel-btn" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
