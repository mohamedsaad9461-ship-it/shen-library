/* ================================================================
   النسخة الاحترافية الشاملة - مكتبة شين
   (إصلاح البانرات، الرادار، التفاعلات، وفصل الصفحات)
   ================================================================ */

// 1. قاعدة البيانات (الأغلفة الحقيقية وروابط الملفات)
const novelsData = [
    { id: 0, name: "حلم طنجار", img: "https://i.ibb.co/G497YVXL/Screenshot-2026-01-28-014231.png", file: "reader.html", available: true },
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false },
    { id: 2, name: "ممالك القيران", img: "https://i.ibb.co/MyXwc6TT/Screenshot-2026-01-28-014536.png", available: false },
    { id: 3, name: "وباء", img: "https://i.ibb.co/xqfBbZjf/Screenshot-2026-01-28-014331.png", available: false }
];

const quotesData = [
    { id: 101, name: "محمد سعد", img: "https://i.ibb.co/LDRb8d64/Screenshot-2026-01-27-164026.png", text: "هناك، في تلك اللحظة، أدركت أن الصمت أقوى من أي كلام..." }
];

let appState = JSON.parse(localStorage.getItem('shain_pro_v1')) || { ratings: {}, votes: {} };

// 2. التحكم في الشاشات (لإظهار البانر والزراير في الرئيسية فقط)
function showSec(id) {
    // إخفاء كل العناصر الكبيرة
    const sections = ['homeUI', 'librarySection', 'quotesSection', 'aiSection'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.style.display = 'none';
    });

    // إظهار القسم المطلوب
    const target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
        if(id === 'librarySection') renderNovels();
        if(id === 'quotesSection') renderQuotes();
    }
}

// 3. محرك عرض الروايات (المقاسات الموحدة واللايكات)
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;
    container.innerHTML = novelsData.map(n => {
        const v = appState.votes[n.id];
        const r = appState.ratings[n.id] || 0;
        return `
        <div class="novel-card">
            <img src="${n.img}" alt="${n.name}">
            <h3>${n.name}</h3>
            <div class="rating">
                ${[1,2,3,4,5].map(s => `<span class="star ${r>=s?'active':''}" onclick="rateNovel(${n.id},${s})">★</span>`).join('')}
            </div>
            <div class="interactions" style="margin: 10px 0; display:flex; gap:15px; font-size:20px;">
                <span style="cursor:pointer; color:${v==='like'?'#00d2ff':'white'}" onclick="voteNovel(${n.id},'like')">👍</span>
                <span style="cursor:pointer; color:${v==='dislike'?'#ff4d4d':'white'}" onclick="voteNovel(${n.id},'dislike')">👎</span>
            </div>
            <button class="glass-btn" onclick="${n.available ? `openReader('${n.name}','${n.file}')` : 'alert(\'قريباً جداً!\')'}">
                ${n.available ? 'اقرأ الآن' : 'قريباً'}
            </button>
        </div>`;
    }).join('');
}

// 4. رادار شين (الترشيحات الذكية والعدسة)
function askShainAI() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const responseBox = document.getElementById('aiResponse');
    if (!input) return;

    responseBox.innerHTML = `<div style="color:#00d2ff;">📡 رادار شين يبحث في المصادر...</div>`;

    setTimeout(() => {
        const db = [
            { name: "تاكسي", auth: "خالد الخميسي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/41-v8f8Y9pL.jpg" },
            { name: "قواعد العشق الأربعون", auth: "إليف شافاق", cat: "ديني", img: "https://m.media-amazon.com/images/I/41m9-T881ML.jpg" }
        ];
        let matches = db.filter(b => b.cat.includes(input) || b.name.toLowerCase().includes(input));
        
        if (matches.length > 0) {
            responseBox.innerHTML = matches.map(b => `
                <div style="background:rgba(255,255,255,0.1); padding:10px; border-radius:12px; display:flex; gap:10px; align-items:center; margin-bottom:10px; border:1px solid #00d2ff44;">
                    <img src="${b.img}" style="width:50px; height:70px; border-radius:5px;">
                    <div><b>${b.name}</b><br><small style="color:#00d2ff;">${b.auth}</small></div>
                </div>`).join('');
        } else {
            responseBox.innerHTML = `<div style="color:#ff4d4d;">لم أجد نتائج لـ "${input}".. جرب "ديني" أو "كوميدي".</div>`;
        }
    }, 600);
}

// 5. الوظائف الأساسية
function rateNovel(id, s) { appState.ratings[id] = s; save(); }
function voteNovel(id, t) { appState.votes[id] = (appState.votes[id]===t)?null:t; save(); }
function save() { localStorage.setItem('shain_pro_v1', JSON.stringify(appState)); renderNovels(); }

function openReader(n, f) { 
    const reader = document.getElementById('readerMode');
    if(reader) {
        reader.style.display = 'block';
        document.getElementById('bookFrame').src = f;
        document.getElementById('readerTitle').innerText = n;
    }
}
function closeReader() { document.getElementById('readerMode').style.display='none'; document.getElementById('bookFrame').src=''; }

// 6. التشغيل عند التحميل
window.onload = function() {
    const loader = document.getElementById('loader');
    if(loader) loader.style.display = 'none';
    
    // إظهار الصفحة الرئيسية (HomeUI) اللي فيها البانر والمنيو
    showSec('homeUI');
};
