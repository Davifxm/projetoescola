import { useEffect, useState } from "react";
import { Search, Plus, X, WifiOff, Wifi, Upload } from "lucide-react";

// ===== Helpers =====
const STORAGE_KEY = "cards_v2";          // cartões já enviados (disponíveis)
const PENDING_KEY = "cards_pending_v2"; // cartões pendentes offline

const SUBJECTS = {
  "Biologia": ["Citologia", "Genética", "Ecologia"],
  "Física": ["Cinemática", "Dinâmica", "Ondas"],
  "Matemática": ["Álgebra", "Geometria", "Funções"],
  "Português": ["Sintaxe", "Redação", "Interpretação"],
};

function makeId() {
  return (typeof window !== "undefined" && window.crypto?.randomUUID)
    ? window.crypto.randomUUID()
    : "id-" + Math.random().toString(36).slice(2, 10);
}

export default function CartoesSync() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);       // disponíveis
  const [pending, setPending] = useState([]);   // pendentes de envio
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  // Carregar dados salvos
  useEffect(() => {
    setCards(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    setPending(JSON.parse(localStorage.getItem(PENDING_KEY) || "[]"));
  }, []);

  function resetForm() {
    setText("");
    setSubject("");
    setTopic("");
  }

  // Salvar cartão (mesmo sem internet)
  function handleAddCard() {
    if (!text.trim() || !subject.trim()) return;

    const newItem = {
      id: makeId(),
      professor_id: "prof-123",   // depois vem do login/autenticação
      subject: subject || "Geral",
      topic: topic || "Geral",
      text: text.trim(),
      turma_id: "1A",             // exemplo: turma 1º A
      status: navigator.onLine ? "online" : "offline",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      visibilidade: false         // só vira true quando sincronizar
    };

    if (navigator.onLine) {
      const newList = [newItem, ...cards];
      setCards(newList);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } else {
      const newPend = [newItem, ...pending];
      setPending(newPend);
      localStorage.setItem(PENDING_KEY, JSON.stringify(newPend));
    }

    setOpen(false);
    resetForm();
  }

  // Excluir cartão local
  function onDelete(id) {
    const newList = cards.filter(c => c.id !== id);
    setCards(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  }

  // Sincronizar pendentes (simulado)
  async function syncPending() {
    const pend = [...pending];
    if (pend.length === 0) return;

    // Aqui você chamaria sua API (POST /atividades)
    // await fetch("https://sua-api/atividades", { method: "POST", body: JSON.stringify(pend) });

    const newList = [...pend, ...cards];
    setCards(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

    setPending([]);
    localStorage.removeItem(PENDING_KEY);
    alert("Pendentes sincronizados com sucesso!");
  }

  // Filtrar busca
  const filtered = !query.trim()
    ? cards
    : cards.filter(c =>
        c.text.toLowerCase().includes(query.toLowerCase()) ||
        c.subject.toLowerCase().includes(query.toLowerCase()) ||
        c.topic.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="dashboard">
      <style>{CSS}</style>
      <header className="topbar">
        <div className="searchBox">
          <Search size={18} />
          <input
            placeholder="Pesquisar cartões..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="create" onClick={() => setOpen(true)}>
          <Plus size={18} /> Novo Cartão
        </button>
      </header>

      <div className="statusBar">
        {navigator.onLine ? (
          <span className="online"><Wifi size={16}/> Online</span>
        ) : (
          <span className="offline"><WifiOff size={16}/> Offline</span>
        )}

        {pending.length > 0 && navigator.onLine && (
          <button className="syncBtn" onClick={syncPending}>
            <Upload size={16}/> Sincronizar ({pending.length})
          </button>
        )}
      </div>

      <div className="content">
        {filtered.length === 0 ? (
          <div className="empty">Nenhum cartão disponível.</div>
        ) : (
          <div className="grid">
            {filtered.map(card => (
              <article key={card.id} className="card">
                <div className="cardBody">
                  <b>{card.subject}</b> · {card.topic}
                  <p>{card.text}</p>
                </div>
                <div className="cardMeta">
                  <span>{new Date(card.createdAt).toLocaleString()}</span>
                  <button className="btnIcon" onClick={() => onDelete(card.id)}>
                    <X size={16}/>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="modalBackdrop">
          <div className="modal">
            <h2>Novo Cartão</h2>

            <select
              value={subject}
              onChange={(e) => { setSubject(e.target.value); setTopic(""); }}
            >
              <option value="">Selecione a matéria</option>
              {Object.keys(SUBJECTS).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={!subject}
            >
              <option value="">Selecione o tópico</option>
              {(SUBJECTS[subject] || []).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <textarea
              placeholder="Escreva aqui"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="modalFoot">
              <button onClick={() => setOpen(false)}>Cancelar</button>
              <button onClick={handleAddCard} disabled={!text.trim() || !subject}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CSS = ` :root {
  --bg: #f8fafc;
  --text: #0f172a;
  --muted: #64748b;
  --card: #ffffff;
  --border: #e2e8f0;
  --primary: #2563eb;
  --danger: #ef4444;
  --success: #16a34a;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto;
  background: var(--bg);
  color: var(--text);
}

/* Layout */
.dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: var(--card);
  border-bottom: 1px solid var(--border);
}

.searchBox {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  border-radius: 6px;
  padding: 4px 8px;
}

.searchBox input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  width: 200px;
}

.create {
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
.create:hover {
  background: #1e4ed8;
}

/* Status bar */
.statusBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  background: #f1f5f9;
  border-bottom: 1px solid var(--border);
}

.online {
  color: var(--success);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.offline {
  color: var(--danger);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.syncBtn {
  background: var(--success);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
.syncBtn:hover {
  background: #15803d;
}

/* Conteúdo */
.content {
  flex: 1;
  padding: 20px;
}

.empty {
  text-align: center;
  padding: 40px;
  color: var(--muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.cardBody {
  font-size: 14px;
  margin-bottom: 12px;
}

.cardMeta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--muted);
}

.btnIcon {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--danger);
}

/* Modal */
.modalBackdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: var(--card);
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal h2 {
  margin: 0;
  font-size: 18px;
}

.modal textarea {
  min-height: 120px;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
}

.modalFoot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.modalFoot button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.modalFoot button:first-child {
  background: #e2e8f0;
  color: var(--text);
}

.modalFoot button:last-child {
  background: var(--primary);
  color: #fff;
}
.modalFoot button:last-child:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
 `;
