// 1. قاعدة بيانات المكتبة والاقتباسات (اللي كانت ممسوحة)
const novelsData = [
    { id: 0, name: "حلم طنجار", img: "https://i.ibb.co/G497YVXL/Screenshot-2026-01-28-014231.png", file: "tangar.html", available: true },
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false },
    { id: 2, name: "ممالك القيران", img: "https://i.ibb.co/MyXwc6TT/Screenshot-2026-01-28-014536.png", available: false },
    { id: 3, name: "وباء", img: "https://i.ibb.co/xqfBbZjf/Screenshot-2026-01-28-014331.png", available: false },
    { id: 4, name: "قصص من مصدر", img: "https://i.ibb.co/BHgP5YC6/Screenshot-2026-01-28-014426.png", available: false }
];

const quotesData = [
    { id: 101, name: "محمد سعد", img: "https://i.ibb.co/LDRb8d64/Screenshot-2026-01-27-164026.png", text: "هناك، في تلك اللحظة، أدركت أن الصمت أقوى من أي كلام..." }
];

// 2. دوال العرض (دي اللي كانت ناقصة ومخليها الحاجة متظهرش)
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;
    container.innerHTML = novelsData.map(n => `
        <div class="novel-card" data-name="${n.name}">
            <img src="${n.img}" alt="${n.name}">
            <h3>${n.name}</h3>
            ${n.available ? `<button class="glass-btn" onclick="openReader('${n.name}', '${n.file}')">اقرأ الآن</button>` : `<button class="glass-btn" disabled style="opacity:0.5">قريباً</button>`}
        </div>
    `).join('');
}

function renderQuotes() {
    const list = document.getElementById('quotesList');
    if(!list) return;
    list.innerHTML = quotesData.map(q => `
        <div class="quote-card">
            <div class="author-info" style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <img src="${q.img}" style="width:40px; height:40px; border-radius:50%;">
                <span style="font-weight:bold;">${q.name}</span>
            </div>
            <p style="font-style:italic;">"${q.text}"</p>
        </div>
    `).join('');
}

// 3. دالة البحث (الرادار المطور بالأغلفة ومنع الإزاحة)
function askShainAI() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const responseBox = document.getElementById('aiResponse');
    if (!input) return;

    responseBox.innerHTML = `
        <div style="background:#00d2ff; color:#000; padding:10px; border-radius:10px; margin-bottom:10px; align-self:flex-end; font-weight:bold;">🔍 بحثت عن: ${input}</div>
        <div id="resultsList" style="display:flex; flex-direction:column; gap:10px; width:100%;"></div>
    `;

    setTimeout(() => {
        const library = [
            { name: "تاكسي", auth: "خالد الخميسي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/41-v8f8Y9pL.jpg", link: "https://www.google.com/search?q=رواية+تاكسي+pdf" },
            { name: "أرض النفاق", auth: "يوسف السباعي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/51rYy5+S1FL.jpg", link: "https://www.google.com/search?q=أرض+النفاق+pdf" },
            { name: "قواعد العشق الأربعون", auth: "إليف شافاق", cat: "ديني", img: "https://m.media-amazon.com/images/I/41m9-T881ML.jpg", link: "https://www.google.com/search?q=قواعد+العشق+الأربعون+pdf" }
        ];
        let matches = library.filter(b => b.cat.includes(input) || b.name.toLowerCase().includes(input));
        const list = document.getElementById('resultsList');
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

// 4. التحكم في الشاشات واللودر
function showSec(id) {
    document.querySelectorAll('#homeUI,#librarySection,#quotesSection').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function openShainAI() { document.getElementById('homeUI').style.display='none'; document.getElementById('aiSection').style.display='block'; }
function closeAI() { document.getElementById('aiSection').style.display='none'; document.getElementById('homeUI').style.display='block'; }

window.onload = function() {
    renderNovels(); // تشغيل عرض الروايات
    renderQuotes(); // تشغيل عرض الاقتباسات
    document.getElementById('loader').style.display = 'none';
    document.getElementById('homeUI').style.display = 'block';
};
