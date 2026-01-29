/* === [TAG: APP_DATA] === */
const novelsData = [
    { id: 0, name: "حلم طنجار", img: "https://i.ibb.co/G497YVXL/Screenshot-2026-01-28-014231.png", file: "reader.html", available: true },
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false },
    { id: 2, name: "ممالك القيران", img: "https://i.ibb.co/MyXwc6TT/Screenshot-2026-01-28-014536.png", available: false },
    { id: 3, name: "وباء", img: "https://i.ibb.co/xqfBbZjf/Screenshot-2026-01-28-014331.png", available: false }
];
const quotesData = [
    { id: 101, name: "محمد سعد", img: "https://i.ibb.co/LDRb8d64/Screenshot-2026-01-27-164026.png", text: "هناك، في تلك اللحظة، أدركت أن الصمت أقوى من أي كلام..." }
];
let appState = JSON.parse(localStorage.getItem('shain_pro_v1')) || { ratings: {}, votes: {}, qVotes: {} };
/* === [END: APP_DATA] === */

/* === [TAG: UI_NAVIGATION] === */
function showSec(id) {
    document.querySelectorAll('#homeUI, #librarySection, #quotesSection, #aiSection').forEach(s => {
        if(s) s.style.display = 'none';
    });
    const target = document.getElementById(id);
    if(target) target.style.display = 'block';
}

function openShainAI() { showSec('aiSection'); }
function closeAI() { showSec('homeUI'); }
/* === [END: UI_NAVIGATION] === */

/* === [TAG: LIBRARY_ENGINE] === */
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;
    container.innerHTML = novelsData.map(n => `
        <div class="novel-card" data-name="${n.name}">
            <img src="${n.img}" alt="${n.name}">
            <h3>${n.name}</h3>
            <button class="glass-btn" onclick="${n.available ? `openReader('${n.name}', '${n.file}')` : ''}" ${!n.available?'disabled style="opacity:0.5"':''}>
                ${n.available ? 'اقرأ الآن' : 'قريباً'}
            </button>
        </div>`).join('');
}
/* === [END: LIBRARY_ENGINE] === */

/* === [TAG: SYSTEM_INIT] === */
window.onload = function() {
    renderNovels();
    const loader = document.getElementById('loader');
    if(loader) loader.style.display = 'none';
    showSec('homeUI');
};
/* === [END: SYSTEM_INIT] === */
