/* === [TAG: APP_DATA] === */
// قاعدة البيانات الشاملة (روايات + ترشيحات)
const novelsData = [
    { id: 0, name: "حلم طنجار", img: "https://i.ibb.co/G497YVXL/Screenshot-2026-01-28-014231.png", file: "reader.html", available: true, category: "main" },
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false, category: "main" },
    { id: 2, name: "ممالك القيران", img: "https://i.ibb.co/MyXwc6TT/Screenshot-2026-01-28-014536.png", available: false, category: "recommend" },
    { id: 3, name: "وباء", img: "https://i.ibb.co/xqfBbZjf/Screenshot-2026-01-28-014331.png", available: false, category: "recommend" }
];

let appState = JSON.parse(localStorage.getItem('shain_pro_v1')) || { ratings: {}, votes: {}, comments: {} };
/* === [END: APP_DATA] === */

/* === [TAG: UI_NAVIGATION] === */
function showSec(id) {
    const sections = ['homeUI', 'librarySection', 'aiSection', 'readerMode'];
    sections.forEach(s => { if(document.getElementById(s)) document.getElementById(s).style.display = 'none'; });
    
    const target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
        if(id === 'librarySection') renderNovels();
    }
}
/* === [END: UI_NAVIGATION] === */

/* === [TAG: SOCIAL_ENGINE] === */
function handleStar(id, s) { appState.ratings[id] = s; save(); }
function handleVote(id, v) { appState.votes[id] = (appState.votes[id] === v) ? null : v; save(); }
function save() { localStorage.setItem('shain_pro_v1', JSON.stringify(appState)); renderNovels(); }

function getSocialHTML(n) {
    const r = appState.ratings[n.id] || 0;
    const v = appState.votes[n.id];
    let s = '<div class="stars-row">';
    for(let i=1; i<=5; i++) s += `<span class="star ${i<=r?'selected':''}" onclick="event.stopPropagation(); handleStar(${n.id},${i})">★</span>`;
    s += '</div>';
    return `${s}<div class="interaction-bar" onclick="event.stopPropagation();">
        <div class="action-btn ${v==='like'?'active':''}" style="color:${v==='like'?'#3498db':''}" onclick="handleVote(${n.id},'like')">👍</div>
        <div class="action-btn" onclick="alert('سجل التعليقات قريباً')">💬</div>
        <div class="action-btn ${v==='dislike'?'active':''}" style="color:${v==='dislike'?'#e74c3c':''}" onclick="handleVote(${n.id},'dislike')">👎</div>
    </div>`;
}
/* === [END: SOCIAL_ENGINE] === */

/* === [TAG: LIBRARY_ENGINE] === */
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;
    container.innerHTML = novelsData.map(n => `
        <div class="novel-card">
            <img src="${n.img}">
            <h3>${n.name}</h3>
            ${getSocialHTML(n)}
            <button class="glass-btn" onclick="${n.available ? `openReader('${n.name}','${n.file}')` : ''}">${n.available?'اقرأ الآن':'قريباً'}</button>
        </div>`).join('');
}
/* === [END: LIBRARY_ENGINE] === */

/* === [TAG: SYSTEM_INIT] === */
window.onload = function() {
    const loader = document.getElementById('loader');
    if(loader) loader.style.display = 'none';
    showSec('homeUI');
    // تشغيل البانر
    let cur = 0;
    setInterval(() => {
        const s = document.querySelector('.slides');
        if(s) { cur = (cur+1)%4; s.style.transform = `translateX(-${cur*25}%)`; }
    }, 3000);
};
/* === [END: SYSTEM_INIT] === */
