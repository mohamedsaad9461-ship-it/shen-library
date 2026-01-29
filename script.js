// [1] البيانات الأصلية
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

// [2] دالة التبديل بين الصفحات (دي اللي بتمنعهم يدخلوا في بعض)
function showSec(id) {
    // إخفاء كل شيء أولاً
    document.getElementById('homeUI').style.display = 'none';
    document.getElementById('librarySection').style.display = 'none';
    document.getElementById('quotesSection').style.display = 'none';
    if(document.getElementById('aiSection')) document.getElementById('aiSection').style.display = 'none';
    
    // إظهار القسم المطلوب فقط
    const target = document.getElementById(id);
    if(target) target.style.display = 'block';
    
    // إذا فتحنا المكتبة أو الاقتباسات نقوم برسمهم
    if(id === 'librarySection') renderNovels();
    if(id === 'quotesSection') renderQuotes();
}

// [3] رسم الروايات بالتفاعل (لايك، ديسلايك، نجوم)
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;
    container.innerHTML = novelsData.map(n => {
        const v = appState.votes[n.id];
        const r = appState.ratings[n.id] || 0;
        return `
        <div class="novel-card" data-name="${n.name}">
            <img src="${n.img}">
            <h3>${n.name}</h3>
            <div class="rating">
                ${[1,2,3,4,5].map(s => `<span class="star ${r>=s?'active':''}" onclick="rateNovel(${n.id},${s})">★</span>`).join('')}
            </div>
            <div style="margin-top:10px; display:flex; gap:15px; font-size:20px;">
                <span style="cursor:pointer; color:${v==='like'?'#00d2ff':'white'}" onclick="voteNovel(${n.id},'like')">👍</span>
                <span style="cursor:pointer; color:${v==='dislike'?'#ff4d4d':'white'}" onclick="voteNovel(${n.id},'dislike')">👎</span>
                <span style="cursor:pointer;" onclick="alert('اكتب تعليقك قريباً يا محمد')">💬</span>
            </div>
            <button class="glass-btn" onclick="${n.available? `openReader('${n.name}','${n.file}')` : ''}" ${!n.available?'style="opacity:0.5" disabled':''}>
                ${n.available?'اقرأ الآن':'قريباً'}
            </button>
        </div>`;
    }).join('');
}

// [4] رسم الاقتباسات (الصور الدائرية)
function renderQuotes() {
    const list = document.getElementById('quotesList');
    if(!list) return;
    list.innerHTML = quotesData.map(q => `
        <div class="quote-card">
            <div class="author-info" style="display:flex; align-items:center;">
                <img src="${q.img}">
                <span style="font-weight:bold; margin-right:10px;">${q.name}</span>
            </div>
            <p style="margin-top:15px; font-style:italic;">"${q.text}"</p>
        </div>
    `).join('');
}

// [5] الوظائف المساعدة (حفظ وإغلاق)
function rateNovel(id, s) { appState.ratings[id] = s; save(); }
function voteNovel(id, t) { appState.votes[id] = (appState.votes[id]===t)?null:t; save(); }
function save() { localStorage.setItem('shain_pro_v1', JSON.stringify(appState)); renderNovels(); }

function openReader(n, f) { 
    document.getElementById('readerMode').style.display='block'; 
    document.getElementById('bookFrame').src=f; 
}
function closeReader() { document.getElementById('readerMode').style.display='none'; document.getElementById('bookFrame').src=''; }

window.onload = function() {
    // إخفاء اللودر وإظهار الصفحة الرئيسية فقط
    const loader = document.getElementById('loader');
    if(loader) loader.style.display = 'none';
    document.getElementById('homeUI').style.display = 'block';
};
