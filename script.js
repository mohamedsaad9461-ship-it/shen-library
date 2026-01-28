const novelsData = [
    { id: 0, name: "حلم طنجار", img: "https://i.ibb.co/G497YVXL/Screenshot-2026-01-28-014231.png", file: "tangar.html", available: true },
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false },
    { id: 2, name: "ممالك القيران", img: "https://i.ibb.co/MyXwc6TT/Screenshot-2026-01-28-014536.png", available: false },
    { id: 3, name: "وباء", img: "https://i.ibb.co/xqfBbZjf/Screenshot-2026-01-28-014331.png", available: false },
    { id: 4, name: "قصص من مصدر", img: "https://i.ibb.co/BHgP5YC6/Screenshot-2026-01-28-014426.png", available: false }
];

const quotesData = [
    { id: 101, name: "محمد سعد", img: "https://i.ibb.co/LDRb8d64/Screenshot-2026-01-27-164026.png", text: "هناك، يُنسج لك ثوب أمنياتك، تماماً كما تمنيته، ملائماً لجسدك." }
];

let appState = JSON.parse(localStorage.getItem('shain_pro_v1')) || { ratings: {}, votes: {}, qVotes: {} };

function initApp() {
    renderNovels();
    renderQuotes();
}

function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if (!container) return;
    container.innerHTML = novelsData.map(n => {
        const r = appState.ratings[n.id] || 0;
        const v = appState.votes[n.id];
        return `
        <div class="novel-card" data-name="${n.name}">
            <div style="display:flex; gap:15px; align-items:center;">
                <img src="${n.img}" width="80" style="border-radius:15px;">
                <div><b>${n.name}</b><br>${[1,2,3,4,5].map(s => `<span class="star ${r>=s?'active':''}" onclick="rateNovel(${n.id},${s})">★</span>`).join('')}</div>
            </div>
            <div class="q-actions">
                <span class="${v==='like'?'active-like':''}" onclick="voteNovel(${n.id},'like')">👍 لايك</span>
                <span class="${v==='dislike'?'active-dislike':''}" onclick="voteNovel(${n.id},'dislike')">👎 ديسك لايك</span>
            </div>
            <div class="glass-btn" style="margin-top:10px; padding:10px; font-size:13px;" onclick="${n.available?`openReader('${n.name}','${n.file}')`:`alert('قريباً')`}">اقرأ الآن</div>
        </div>`;
    }).join('');
}

function renderQuotes() {
    const container = document.getElementById('quotesList');
    if (!container) return;
    container.innerHTML = quotesData.map(q => {
        const v = appState.qVotes[q.id];
        return `
        <div class="quote-card">
            <div class="author-info">
                <div class="author-img" style="background-image:url('${q.img}')"></div>
                <div class="author-name">${q.name}</div>
            </div>
            <div class="quote-text" style="font-style: italic; line-height: 1.6;">"${q.text}"</div>
            <div class="q-actions">
                <span class="${v === 'like' ? 'active-like' : ''}" onclick="voteQuote(${q.id}, 'like')">👍</span>
                <span class="${v === 'dislike' ? 'active-dislike' : ''}" onclick="voteQuote(${q.id}, 'dislike')">👎</span>
                <span onclick="copyQuote('${q.text}')">📋 نسخ</span>
            </div>
        </div>`;
    }).join('');
}

// دالة نسخ النص السحرية
function copyQuote(text) {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الاقتباس بنجاح! جاهز للمشاركة 🖋️');
}

function rateNovel(id, s) { appState.ratings[id] = s; save(); }
function voteNovel(id, t) { appState.votes[id] = (appState.votes[id]===t)?null:t; save(); }
function voteQuote(id, t) { appState.qVotes[id] = (appState.qVotes[id]===t)?null:t; save(); }
function save() { localStorage.setItem('shain_pro_v1', JSON.stringify(appState)); renderNovels(); renderQuotes(); }
function showSec(id) { document.querySelectorAll('#homeUI,#librarySection,#quotesSection').forEach(s=>s.style.display='none'); document.getElementById(id).style.display='block'; }
function openReader(n, f) { document.getElementById('readerMode').style.display='block'; document.getElementById('readerTitle').innerText=n; document.getElementById('bookFrame').src=f; }
function closeReader() { document.getElementById('readerMode').style.display='none'; document.getElementById('bookFrame').src=''; }
function liveSearch() { let q=document.getElementById('novelSearch').value.toLowerCase(); document.querySelectorAll('.novel-card').forEach(c=>c.style.display=c.getAttribute('data-name').toLowerCase().includes(q)?'block':'none'); }

// إخفاء شاشة التحميل
window.onload = function() {
    initApp();
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('loader-fade-out');
    }, 2000);
};
