// --- 1. قاعدة بيانات المكتبة الأصلية (رجعت لك كل رواياتك وتنسيقاتها) ---
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

// --- 2. إدارة حالة التطبيق ---
let appState = JSON.parse(localStorage.getItem('shain_pro_v1')) || { ratings: {}, votes: {}, qVotes: {} };

// --- 3. محرك رادار شين المطور (بالأغلفة ومنع الإزاحة) ---
function askShainAI() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const responseBox = document.getElementById('aiResponse');
    if (!input) return;

    // تثبيت البحث ومنع الإزاحة
    responseBox.innerHTML = `
        <div style="background: #00d2ff; color: #000; padding: 10px 15px; border-radius: 12px; margin-bottom: 15px; font-weight: bold; width: fit-content; align-self: flex-end;">🔍 بحثت عن: ${input}</div>
        <div id="resultsList" style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
            <div id="aiStatus" style="color: #00d2ff; font-size: 13px;">📡 جاري جلب النتائج والأغلفة يا محمد...</div>
        </div>
    `;

    setTimeout(() => {
        const extraBooks = [
            { name: "تاكسي", auth: "خالد الخميسي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/41-v8f8Y9pL.jpg", link: "https://www.google.com/search?q=رواية+تاكسي+pdf" },
            { name: "أرض النفاق", auth: "يوسف السباعي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/51rYy5+S1FL.jpg", link: "https://www.google.com/search?q=أرض+النفاق+pdf" },
            { name: "قواعد العشق الأربعون", auth: "إليف شافاق", cat: "ديني", img: "https://m.media-amazon.com/images/I/41m9-T881ML.jpg", link: "https://www.google.com/search?q=قواعد+العشق+الأربعون+pdf" }
        ];

        let matches = extraBooks.filter(b => b.cat.includes(input) || b.name.toLowerCase().includes(input));
        const list = document.getElementById('resultsList');
        if (document.getElementById('aiStatus')) document.getElementById('aiStatus').remove();

        if (matches.length > 0) {
            matches.forEach(book => {
                list.innerHTML += `
                <div style="background: rgba(255,255,255,0.08); padding: 10px; border-radius: 12px; display: flex; gap: 12px; align-items: center; border: 1px solid rgba(0,210,255,0.2);">
                    <img src="${book.img}" style="width: 60px; height: 90px; border-radius: 4px; object-fit: cover;">
                    <div style="flex: 1;">
                        <b style="color: #fff; font-size: 15px;">${book.name}</b><br>
                        <small style="color: #00d2ff;">👤 ${book.auth}</small><br>
                        <a href="${book.link}" target="_blank" style="display:inline-block; margin-top:5px; color:#f1c40f; text-decoration:none; font-size:11px; border:1px solid #f1c40f; padding:2px 6px; border-radius:4px;">تحميل PDF</a>
                    </div>
                </div>`;
            });
        } else {
            list.innerHTML = `<div style="color: #e74c3c;">لم أجد نتائج.. جرب "كوميدي" يا محمد.</div>`;
        }
        responseBox.scrollTop = responseBox.scrollHeight;
    }, 800);
}

// --- 4. دالات المكتبة والاقتباسات (استعادة النظام القديم) ---
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;
    container.innerHTML = novelsData.map(n => `
        <div class="novel-card" data-name="${n.name}">
            <img src="${n.img}" alt="${n.name}">
            <h3>${n.name}</h3>
            ${n.available ? `<button class="glass-btn" onclick="openReader('${n.name}', '${n.file}')">اقرأ الآن</button>` : `<button class="glass-btn" disabled>قريباً</button>`}
        </div>
    `).join('');
}

function renderQuotes() {
    const list = document.getElementById('quotesList');
    if(!list) return;
    list.innerHTML = quotesData.map(q => `
        <div class="quote-card">
            <div class="author-info"><img src="${q.img}"><span>${q.name}</span></div>
            <p>${q.text}</p>
        </div>
    `).join('');
}

// --- 5. التحكم في الصفحات (showSec) واللودر ---
function showSec(id) {
    document.querySelectorAll('#homeUI,#librarySection,#quotesSection').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function openShainAI() { document.getElementById('homeUI').style.display = 'none'; document.getElementById('aiSection').style.display = 'block'; }
function closeAI() { document.getElementById('aiSection').style.display = 'none'; document.getElementById('homeUI').style.display = 'block'; }

function openReader(n, f) { 
    document.getElementById('readerMode').style.display='block'; 
    document.getElementById('readerTitle').innerText=n; 
    document.getElementById('bookFrame').src=f; 
}

function closeReader() { document.getElementById('readerMode').style.display='none'; document.getElementById('bookFrame').src=''; }

window.onload = function() {
    renderNovels();
    renderQuotes();
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('homeUI').style.display = 'block';
    }, 1000);
};

function liveSearch() {
    let q = document.getElementById('novelSearch').value.toLowerCase();
    document.querySelectorAll('.novel-card').forEach(c => {
        c.style.display = c.getAttribute('data-name').toLowerCase().includes(q) ? 'block' : 'none';
    });
}
