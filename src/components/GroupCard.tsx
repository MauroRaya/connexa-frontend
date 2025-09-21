import type { Group } from "../types";

type Props = {
  group: Group;
  onJoin?: (groupId: number) => void;
  onDetails?: (groupId: number) => void;
};

export default function GroupCard({ group, onJoin, onDetails }: Props) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{group.name}</h2>
        <span className="code">{group.code}</span>
      </div>

      <p className="level">{group.level}</p>
      <p className="objective">{group.objective}</p>

      <div className="details">
        <p>📅 {group.date}</p>
        <p>⏱ {group.duration}</p>
        <p>👥 {group.students.length}/{group.capacity}</p>
        <p>📍 {group.modality}</p>
      </div>

      <div className="actions">
        <button
          className="primary"
          disabled={group.students.length === group.capacity}
          onClick={() => onJoin?.(group.id)}
        >
          {group.students.length === group.capacity ? "Cheio" : "Entrar"}
        </button>
        <button className="secondary" onClick={() => onDetails?.(group.id)}>
          Detalhes
        </button>
      </div>
    </div>
  );
}
