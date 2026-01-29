// 1. قاعدة بيانات المكتبة بالأغلفة الحقيقية (حسب ملفاتك)
const novelsData = [
    { id: 0, name: "حلم طنجار", img: "https://i.ibb.co/G497YVXL/Screenshot-2026-01-28-014231.png", file: "reader.html", available: true },
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false },
    { id: 2, name: "ممالك القيران", img: "https://i.ibb.co/MyXwc6TT/Screenshot-2026-01-28-014536.png", available: false },
    { id: 3, name: "وباء", img: "https://i.ibb.co/xqfBbZjf/Screenshot-2026-01-28-014331.png", available: false },
    { id: 4, name: "قصص من مصدر", img: "https://i.ibb.co/BHgP5YC6/Screenshot-2026-01-28-014426.png", available: false }
];

const quotesData = [
    { id: 101, name: "محمد سعد", img: "https://i.ibb.co/LDRb8d64/Screenshot-2026-01-27-164026.png", text: "هناك، في تلك اللحظة، أدركت أن الصمت أقوى من أي كلام..." }
];

// 2. إدارة الحالة (اللايكات والتقييمات)
let appState = JSON.parse(localStorage.getItem('shain_pro_v1')) || { ratings: {}, votes: {}, qVotes: {} };

// 3. دالة عرض المكتبة (بترجع التنسيق: روايتين جنب بعض + الأيقونات التفاعلية)
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;
    
    // تنسيق الـ Grid عشان يظهر روايتين جنب بعض
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr 1fr";
    container.style.gap = "15px";
    container.style.padding = "10px";

    container.innerHTML = novelsData.map(n => {
        const v = appState.votes[n.id];
        return `
        <div class="novel-card" data-name="${n.name}">
            <img src="${n.img}" alt="${n.name}">
            <h3>${n.name}</h3>
            <div class="rating">
                ${[1,2,3,4,5].map(s => `<span class="star ${appState.ratings[n.id]>=s?'active':''}" onclick="rateNovel(${n.id},${s})">★</span>`).join('')}
            </div>
            <div class="interactions" style="margin-top:10px; display:flex; gap:10px;">
                <span class="${v==='like'?'active':''}" onclick="voteNovel(${n.id},'like')">👍</span>
                <span class="${v==='dislike'?'active':''}" onclick="voteNovel(${n.id},'dislike')">👎</span>
                <span onclick="alert('اكتب تعليقك هنا...')">💬</span>
            </div>
            <br>
            ${n.available ? `<button class="glass-btn" onclick="openReader('${n.name}', '${n.file}')">اقرأ الآن</button>` : `<button class="glass-btn" disabled style="opacity:0.5">قريباً</button>`}
        </div>`;
    }).join('');
}

// 4. دالة عرض الاقتباسات (باللايكات)
function renderQuotes() {
    const list = document.getElementById('quotesList');
    if(!list) return;
    list.innerHTML = quotesData.map(q => {
        const v = appState.qVotes[q.id];
        return `
        <div class="quote-card">
            <div class="author-info"><img src="${q.img}"><span>${q.name}</span></div>
            <p>${q.text}</p>
            <div class="interactions">
                <span class="${v==='like'?'active':''}" onclick="voteQuote(${q.id},'like')">👍 أعجبني</span>
                <span class="${v==='dislike'?'active':''}" onclick="voteQuote(${q.id},'dislike')">👎 لم يعجبني</span>
            </div>
        </div>`;
    }).join('');
}

// 5. محرك البحث الذكي (الرادار الجديد)
function askShainAI() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const responseBox = document.getElementById('aiResponse');
    if (!input) return;

    responseBox.innerHTML = `<div id="resultsList" style="display:flex; flex-direction:column; gap:10px; width:100%;"><div style="color:#00d2ff;">🔍 جاري البحث عن ${input}...</div></div>`;

    setTimeout(() => {
        const library = [
            { name: "تاكسي", auth: "خالد الخميسي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/41-v8f8Y9pL.jpg", link: "https://www.google.com/search?q=رواية+تاكسي+pdf" },
            { name: "أرض النفاق", auth: "يوسف السباعي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/51rYy5+S1FL.jpg", link: "https://www.google.com/search?q=أرض+النفاق+pdf" }
        ];
        let matches = library.filter(b => b.cat.includes(input) || b.name.toLowerCase().includes(input));
        const list = document.getElementById('resultsList');
        list.innerHTML = "";
        if (matches.length > 0) {
            matches.forEach(book => {
                list.innerHTML += `<div style="background:rgba(255,255,255,0.1); padding:10px; border-radius:10px; display:flex; gap:10px; align-items:center;">
                    <img src="${book.img}" style="width:50px; height:75px; border-radius:4px;">
                    <div><b style="color:#fff;">${book.name}</b><br><small style="color:#00d2ff;">${book.auth}</small></div>
                </div>`;
            });
        } else { list.innerHTML = `<div style="color:#ff4d4d;">لم أجد نتائج..</div>`; }
        responseBox.scrollTop = responseBox.scrollHeight;
    }, 500);
}

// 6. الدوال الأساسية (الحفظ والفتح)
function rateNovel(id, s) { appState.ratings[id] = s; save(); }
function voteNovel(id, t) { appState.votes[id] = (appState.votes[id]===t)?null:t; save(); }
function voteQuote(id, t) { appState.qVotes[id] = (appState.qVotes[id]===t)?null:t; save(); }
function save() { localStorage.setItem('shain_pro_v1', JSON.stringify(appState)); renderNovels(); renderQuotes(); }

function showSec(id) {
    document.querySelectorAll('#homeUI,#librarySection,#quotesSection').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function openReader(n, f) { 
    document.getElementById('readerMode').style.display='block'; 
    document.getElementById('readerTitle').innerText=n; 
    document.getElementById('bookFrame').src=f; 
}
function closeReader() { document.getElementById('readerMode').style.display='none'; document.getElementById('bookFrame').src=''; }
function openShainAI() { document.getElementById('homeUI').style.display='none'; document.getElementById('aiSection').style.display='block'; }
function closeAI() { document.getElementById('aiSection').style.display='none'; document.getElementById('homeUI').style.display='block'; }

window.onload = function() {
    renderNovels();
    renderQuotes();
    document.getElementById('loader').style.display = 'none';
    document.getElementById('homeUI').style.display = 'block';
};
