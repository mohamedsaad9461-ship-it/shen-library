// [1] البيانات
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

// [2] عرض المكتبة
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
            <div style="margin-top:10px; display:flex; gap:15px;">
                <span class="${v==='like'?'active-like':''}" onclick="voteNovel(${n.id},'like')">👍</span>
                <span class="${v==='dislike'?'active-dislike':''}" onclick="voteNovel(${n.id},'dislike')">👎</span>
                <span onclick="addComment(${n.id})">💬</span>
            </div>
            <button class="glass-btn" onclick="${n.available? `openReader('${n.name}','${n.file}')` : ''}" ${!n.available?'style="opacity:0.5" disabled':''}>
                ${n.available?'اقرأ الآن':'قريباً'}
            </button>
        </div>`;
    }).join('');
}

// [3] رادار شين المطور (ديني + كوميدي)
function askShainAI() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const list = document.getElementById('aiResponse');
    if (!input) return;

    list.innerHTML = `<div style="color:#00d2ff;">🔍 جاري فحص الكتب الدينية والكوميدية يا محمد...</div>`;

    setTimeout(() => {
        const extra = [
            { name: "تاكسي", auth: "خالد الخميسي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/41-v8f8Y9pL.jpg" },
            { name: "قواعد العشق الأربعون", auth: "إليف شافاق", cat: "ديني", img: "https://m.media-amazon.com/images/I/41m9-T881ML.jpg" }
        ];
        let matches = extra.filter(b => b.cat.includes(input) || b.name.toLowerCase().includes(input) || (input === "دين" && b.cat === "ديني"));
        
        if (matches.length > 0) {
            list.innerHTML = matches.map(b => `
                <div style="background:rgba(255,255,255,0.1); padding:10px; border-radius:12px; display:flex; gap:10px; align-items:center; margin-bottom:10px;">
                    <img src="${b.img}" style="width:50px; height:70px; border-radius:5px;">
                    <div><b>${b.name}</b><br><small>${b.auth}</small></div>
                </div>`).join('');
        } else { list.innerHTML = `<div style="color:#ff4d4d;">لم أجد نتائج دقيقة.. جرب "ديني" أو "كوميدي".</div>`; }
    }, 600);
}

// [4] الدوال المساعدة
function rateNovel(id, s) { appState.ratings[id] = s; save(); }
function voteNovel(id, t) { appState.votes[id] = (appState.votes[id]===t)?null:t; save(); }
function addComment(id) { alert("سيتم تفعيل ميزة حفظ التعليق في التحديث القادم!"); }
function save() { localStorage.setItem('shain_pro_v1', JSON.stringify(appState)); renderNovels(); }

function showSec(id) {
    document.querySelectorAll('#homeUI,#librarySection,#quotesSection,#aiSection').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function openReader(n, f) { 
    document.getElementById('readerMode').style.display='block'; 
    document.getElementById('bookFrame').src=f; 
}

window.onload = function() {
    renderNovels();
    document.getElementById('loader').style.display = 'none';
};
