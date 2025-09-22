import type { Group } from "../types";

type Props = {
  group: Group;
  onJoin?: (groupId: number) => void;
  onDetails?: (groupId: number) => void;
  isJoined?: boolean;
};

export default function GroupCard({ group, onJoin, onDetails, isJoined }: Props) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{group.name}</h2>
        <span className="subject">{group.subject}</span>
      </div>

      <p className="objective">{group.objective}</p>

      <div className="details">
        <p>👥 {group.students.length}</p>
        <p>📍 {group.modality}</p>
        <p>🏫 {group.location}</p>
      </div>

      <div className="actions">
        <button
          className={`primary ${isJoined ? "joined" : ""}`}
          disabled={isJoined}
          onClick={() => !isJoined && onJoin?.(group.id)}
        >
          {isJoined ? "Já inscrito" : "Entrar"}
        </button>
        <button
          className="secondary"
          onClick={() => onDetails?.(group.id)}
        >
          Detalhes
        </button>
      </div>
    </div>
  );
}
