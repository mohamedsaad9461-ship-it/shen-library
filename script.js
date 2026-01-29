// 1. قاعدة بيانات المكتبة (رجعت لك "حلم طنجار" كأولوية)
const novelsData = [
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false },
    { id: 2, name: "ممالك القيران", img: "https://i.ibb.co/MyXwc6TT/Screenshot-2026-01-28-014536.png", available: false },
    { id: 3, name: "وباء", img: "https://i.ibb.co/xqfBbZjf/Screenshot-2026-01-28-014331.png", available: false },
    { id: 4, name: "قصص من مصدر", img: "https://i.ibb.co/BHgP5YC6/Screenshot-2026-01-28-014426.png", available: false }
];

// 2. دالة عرض المكتبة (بترسم "طنجار" 3D والباقي عادي)
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;

    // أول حاجة بنحط "حلم طنجار" بالتنسيق الـ 3D اللي كان في ملفك
    let html = `
        <div class="book-card-3d" onclick="openReader('حلم طنجار', 'reader.html')">
            <div class="book-3d">
                <div class="spine-3d"></div>
                <div class="cover-3d" style="background: linear-gradient(45deg, #c0392b, #e67e22); color:white; display:flex; align-items:center; justify-content:center; text-align:center;">
                    <div>
                        <h2 style="font-size:1.2rem; margin:0;">حلم طنجار</h2>
                        <small>محمد فكري</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    // بعدين بنضيف باقي الروايات
    novelsData.forEach(n => {
        html += `
            <div class="novel-card">
                <img src="${n.img}" alt="${n.name}" style="width:100px; height:150px; border-radius:10px; object-fit:cover;">
                <h3>${n.name}</h3>
                <button class="glass-btn" ${n.available ? `onclick="openReader('${n.name}', '${n.file}')"` : 'disabled'} style="${!n.available ? 'opacity:0.5' : ''}">
                    ${n.available ? 'اقرأ الآن' : 'قريباً'}
                </button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 3. محرك البحث (الرادار) - ثابت ومبيعملش إزاحة
function askShainAI() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const responseBox = document.getElementById('aiResponse');
    if (!input) return;

    responseBox.innerHTML = `
        <div style="background:#00d2ff; color:#000; padding:10px; border-radius:10px; margin-bottom:10px; align-self:flex-end; font-weight:bold;">🔍 بحثت عن: ${input}</div>
        <div id="resultsList" style="display:flex; flex-direction:column; gap:12px; width:100%;"></div>
    `;

    setTimeout(() => {
        const extraBooks = [
            { name: "تاكسي", auth: "خالد الخميسي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/41-v8f8Y9pL.jpg", link: "https://www.google.com/search?q=رواية+تاكسي+pdf" },
            { name: "أرض النفاق", auth: "يوسف السباعي", cat: "كوميدي", img: "https://m.media-amazon.com/images/I/51rYy5+S1FL.jpg", link: "https://www.google.com/search?q=أرض+النفاق+pdf" }
        ];
        let matches = extraBooks.filter(b => b.cat.includes(input) || b.name.toLowerCase().includes(input));
        const list = document.getElementById('resultsList');
        if (matches.length > 0) {
            matches.forEach(book => {
                list.innerHTML += `
                <div style="background:rgba(255,255,255,0.1); padding:10px; border-radius:12px; display:flex; gap:12px; align-items:center; border:1px solid rgba(0,210,255,0.3);">
                    <img src="${book.img}" style="width:50px; height:75px; border-radius:5px;">
                    <div><b style="color:#fff;">${book.name}</b><br><small style="color:#00d2ff;">${book.auth}</small></div>
                </div>`;
            });
        } else { list.innerHTML = `<div style="color:#ff4d4d; font-size:12px;">لم أجد نتائج.. جرب "كوميدي"</div>`; }
        responseBox.scrollTop = responseBox.scrollHeight;
    }, 600);
}

// 4. استعادة وظائف التشغيل (فتح الرواية والشاشات)
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

// 5. الانطلاق
window.onload = function() {
    renderNovels();
    if(typeof renderQuotes === "function") renderQuotes();
    document.getElementById('loader').style.display = 'none';
    document.getElementById('homeUI').style.display = 'block';
};
