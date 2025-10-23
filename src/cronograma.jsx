// src/Cronograma.jsx
import React from "react";

export default function Cronograma() {
  const eventos = []; // plugue seu fetch aqui (aulas, prazos, provas...)

  if (eventos.length === 0) {
    return (
      <div style={box}>
        <h3 style={title}>Sem eventos no cronograma</h3>
        <p style={desc}>
          O professor ainda não adicionou datas de aula, prazos de entrega ou avaliações.
        </p>
      </div>
    );
  }

  return (
    <div style={container}>
      {eventos.map((e, i) => (
        <div
          key={e.id ?? i}
          style={{
            ...row,
            borderTop: i === 0 ? "none" : "1px solid #e2e8f0",
          }}
        >
          <time style={date}>{e.date || "Data não informada"}</time>
          <div>
            <small style={type}>{e.type || "Evento"}</small>
            <div style={titleRow}>{e.title || "Sem título"}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===== Estilos ===== */
const container = {
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  overflow: "hidden",
  background: "#fff",
};

const row = {
  display: "grid",
  gridTemplateColumns: "160px 1fr",
  gap: 12,
  padding: 16,
};

const date = { fontWeight: 600, color: "#0f172a" };
const type = { color: "#64748b" };
const titleRow = { fontWeight: 600 };

const box = {
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  background: "#fff",
  padding: 24,
  textAlign: "center",
};
const title = { margin: 0, fontSize: 18 };
const desc = { marginTop: 8, color: "#475569" };
