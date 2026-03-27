/* Shared helpers: navigation + leaderboard storage */
(() => {
  const SCORE_KEY = '17655_scores_v1';

  function safeParse(json, fallback) {
    try { return JSON.parse(json); } catch { return fallback; }
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function loadAllScores() {
    const raw = localStorage.getItem(SCORE_KEY);
    const data = safeParse(raw, []);
    return Array.isArray(data) ? data : [];
  }

  function saveAllScores(scores) {
    localStorage.setItem(SCORE_KEY, JSON.stringify(scores.slice(0, 400)));
  }

  function normalizeName(name) {
    const s = String(name || '').trim();
    return s ? s.slice(0, 18) : '游客';
  }

  function normalizeGameId(gameId) {
    return String(gameId || '').trim() || 'unknown';
  }

  function normalizeScore(score) {
    const n = Number(score);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.floor(n));
  }

  function addScore({ gameId, gameName, score, playerName }) {
    const entry = {
      gameId: normalizeGameId(gameId),
      gameName: String(gameName || gameId || '未知游戏').slice(0, 30),
      score: normalizeScore(score),
      playerName: normalizeName(playerName),
      at: nowISO()
    };
    const all = loadAllScores();
    all.unshift(entry);
    saveAllScores(all);
    return entry;
  }

  function clearScores() {
    localStorage.removeItem(SCORE_KEY);
  }

  function getTopScores({ gameId, limit = 10 } = {}) {
    const all = loadAllScores();
    const filtered = gameId ? all.filter(s => s.gameId === String(gameId)) : all;
    return filtered
      .slice()
      .sort((a, b) => (b.score - a.score) || (String(b.at).localeCompare(String(a.at))))
      .slice(0, Math.max(1, Math.min(50, Number(limit) || 10)));
  }

  function getRecentScores({ limit = 10 } = {}) {
    const all = loadAllScores();
    return all.slice(0, Math.max(1, Math.min(50, Number(limit) || 10)));
  }

  function formatTime(iso) {
    try {
      const d = new Date(iso);
      const pad = (x) => String(x).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return String(iso || '');
    }
  }

  function qs(sel, root = document) { return root.querySelector(sel); }
  function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  function bindPlayerNameInput() {
    const input = qs('[data-player-name]');
    if (!input) return;
    const key = '17655_player_name_v1';
    const saved = localStorage.getItem(key);
    if (saved && !input.value) input.value = saved;
    input.addEventListener('input', () => localStorage.setItem(key, normalizeName(input.value)));
  }

  // expose
  window.Site17655 = {
    addScore,
    clearScores,
    getTopScores,
    getRecentScores,
    formatTime,
    qs, qsa,
    bindPlayerNameInput
  };
})();
