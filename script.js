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
    updateGreeting();
    renderNovels();
    renderQuotes();
}

function updateGreeting() {
    const hour = new Date().getHours();
    const title = document.getElementById('mainGreeting');
    const sub = document.getElementById('subGreeting');
    if (!title || !sub) return;

    if (hour >= 5 && hour < 12) {
        title.innerText = "صباحك رواية جميلة";
        sub.innerText = "ابدأ يومك بكلمات تلهمك يا محمد";
    } else if (hour >= 12 && hour < 18) {
        title.innerText = "طاب يومك يا بطل";
        sub.innerText = "وقت مثالي للقراءة يا محمد";
    } else {
        title.innerText = "ليلة هادئة ممتعة";
        sub.innerText = "استرخِ مع عالم شين يا محمد";
    }
}

function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if (!container) return;
    container.innerHTML = novelsData.map(n => `
        <div class="novel-card" data-name="${n.name}">
            <img src="${n.img}">
            <b style="font-size:14px;">${n.name}</b>
            <div class="glass-btn" style="margin-top:10px; padding:8px; font-size:11px; width:80%;" onclick="${n.available ? `openReader('${n.name}','${n.file}')` : `alert('قريباً')`}">اقرأ</div>
        </div>`).join('');
}

function renderQuotes() {
    const container = document.getElementById('quotesList');
    if (!container) return;
    container.innerHTML = quotesData.map(q => `<div class="quote-card">
        <div class="author-info"><div class="author-img" style="background-image:url('${q.img}')"></div><div class="author-name">${q.name}</div></div>
        <div class="quote-text">"${q.text}"</div>
        <div class="q-actions"><span onclick="copyQuote('${q.text}')">📋 نسخ</span></div>
    </div>`).join('');
}

function copyQuote(text) { navigator.clipboard.writeText(text); alert('تم النسخ!'); }
function showSec(id) { document.querySelectorAll('#homeUI,#librarySection,#quotesSection').forEach(s=>s.style.display='none'); document.getElementById(id).style.display='block'; }
function openReader(n, f) { document.getElementById('readerMode').style.display='block'; document.getElementById('readerTitle').innerText=n; document.getElementById('bookFrame').src=f; }
function closeReader() { document.getElementById('readerMode').style.display='none'; document.getElementById('bookFrame').src=''; }
function liveSearch() { 
    let q=document.getElementById('novelSearch').value.toLowerCase(); 
    document.querySelectorAll('.novel-card').forEach(c=>c.style.display=c.getAttribute('data-name').toLowerCase().includes(q)?'block':'none'); 
}

window.onload = function() {
    initApp();
    setTimeout(() => {
        const l = document.getElementById('loader');
        if (l) l.classList.add('loader-fade-out');
    }, 500);
};
