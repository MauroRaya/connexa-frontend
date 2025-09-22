import { useEffect, useState } from "react";
import Header from "../components/Header";
import GroupCard from "../components/GroupCard";
import Toast from "../components/Toast";
import type { Group } from "../types";
import SkeletonCard from "../components/SkeletonCard";
import ModalCreateGroup from "../components/ModalCreateGroup";


function decodeToken(token: string): { sub?: string } | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: "success" | "error" }[]
  >([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const addToast = (message: string, type: "success" | "error") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 8000);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded?.sub) setUserEmail(decoded.sub);
    }

    const fetchGroups = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          addToast("Token de autenticação não encontrado", "error");
          setLoading(false);
          window.location.href = "/";
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/groups`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          localStorage.removeItem("authToken");
          window.location.href = "/";
          return;
        }

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


  const handleJoin = async (groupId: number) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        addToast("Token de autenticação não encontrado", "error");
        window.location.href = "/";
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/groups/${groupId}/join`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 403) {
        localStorage.removeItem("authToken");
        window.location.href = "/";
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        addToast(data.error || "Erro ao entrar no grupo", "error");
        return;
      }

      setGroups((prev) => prev.map((g) => (g.id === data.id ? data : g)));

      addToast("Você entrou no grupo com sucesso!", "success");
    } catch (err: any) {
      addToast(err.message || "Erro de conexão", "error");
    }
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

          <div className="search-content">
            <div className="search-row">
              <div className="search-left">
                <input
                  type="text"
                  placeholder="Buscar por matéria, assunto ou tags..."
                  onChange={(e) => console.log("buscar:", e.target.value)}
                />
              </div>
              <div className="search-right">
                <button className="btn primary" onClick={() => setShowModal(true)}>
                  Criar Grupo
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : groups.length === 0 ? (
            <div className="empty-message">
              <p>Nenhum grupo encontrado.</p>
            </div>
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
                    isJoined={userEmail ? group.students.some((s) => s.email === userEmail) : false}
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
      {showModal && (
        <ModalCreateGroup
          onClose={() => setShowModal(false)}
          onSuccess={() => window.location.reload()}
          addToast={addToast}
        />
      )}

    </>

  );
}
