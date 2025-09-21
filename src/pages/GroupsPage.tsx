import { useEffect, useState } from "react";
import Header from "../components/Header";
import GroupCard from "../components/GroupCard";
import Toast from "../components/Toast";
import type { Group } from "../types";

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: "success" | "error" }[]
  >([]);

  const addToast = (message: string, type: "success" | "error") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 8000);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          addToast("Token de autenticação não encontrado", "error");
          setLoading(false);
          return;
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/groups`);
        const data = await response.json();

        if (!response.ok) {
          addToast(data.error || "Erro ao carregar grupos", "error");
          return;
        }

        setGroups(data);
      } catch (err: any) {
        addToast(err.message || "Erro de conexão", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleJoin = (groupId: number) => {
    console.log("Joining group:", groupId);
  };

  const handleDetails = (groupId: number) => {
    console.log("Details of group:", groupId);
  };

  return (
    <>
      <Header showNav />

      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <h1>Buscar Grupos</h1>
            <p>Encontre grupos perfeitos para seus estudos</p>
          </div>

          {loading ? (
            <p>Carregando grupos...</p>
          ) : groups.length === 0 ? (
            <p>Nenhum grupo encontrado.</p>
          ) : (
            <>
              <h2>{groups.length} grupos encontrados</h2>
              <div className="grid">
                {groups.map((group) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    onJoin={handleJoin}
                    onDetails={handleDetails}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="toast-container">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() =>
              setToasts((prev) => prev.filter((toast) => toast.id !== t.id))
            }
          />
        ))}
      </div>
    </>
  );
}
