const novelsData = [
    { id: 0, name: "حلم طنجار", img: "https://i.ibb.co/G497YVXL/Screenshot-2026-01-28-014231.png", file: "tangar.txt", available: true },
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false },
    { id: 2, name: "ممالك القيران", img: "https://i.ibb.co/MyXwc6TT/Screenshot-2026-01-28-014536.png", available: false },
    { id: 3, name: "وباء", img: "https://i.ibb.co/xqfBbZjf/Screenshot-2026-01-28-014331.png", available: false },
    { id: 4, name: "قصص من مصدر", img: "https://i.ibb.co/BHgP5YC6/Screenshot-2026-01-28-014426.png", available: false }
];

const quotesData = [
    { id: 101, name: "محمد سعد", img: "https://i.ibb.co/LDRb8d64/Screenshot-2026-01-27-164026.png", text: "هناك، يُنسج لك ثوب أمنياتك، تماماً كما تمنيته، ملائماً لجسدك." }
];

function initApp() {
    updateGreeting();
    renderNovels();
    renderQuotes();
    
    // إخفاء اللودر بعد التحميل
    setTimeout(() => {
        const l = document.getElementById('loader');
        if (l) l.style.display = 'none';
    }, 800);
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
        <div class="novel-card" data-name="${n.name}" onclick="${n.available ? `openReader('${n.name}','${n.file}')` : `alert('قريباً')`}">
            <div class="book-3d">
                <div class="book-spine"></div>
                <div class="book-cover-img" style="background-image: url('${n.img}')"></div>
            </div>
            <b style="font-size:13px; color:white; display:block; margin-bottom:5px;">${n.name}</b>
            <span style="font-size:10px; color:${n.available ? '#27ae60' : '#e74c3c'};">
                ${n.available ? '● متاح الآن' : '● قريباً'}
            </span>
        </div>`).join('');
}

function renderQuotes() {
    const container = document.getElementById('quotesList');
    if (!container) return;
    container.innerHTML = quotesData.map(q => `
        <div class="quote-card">
            <div class="author-info">
                <div class="author-img" style="background-image:url('${q.img}')"></div>
                <div class="author-name">${q.name}</div>
            </div>
            <div class="quote-text">"${q.text}"</div>
            <div class="q-actions"><span onclick="copyQuote('${q.text}')">📋 نسخ</span></div>
        </div>`).join('');
}

function copyQuote(text) { 
    navigator.clipboard.writeText(text); 
    alert('تم النسخ!'); 
}

function showSec(id) { 
    document.querySelectorAll('#homeUI,#librarySection,#quotesSection').forEach(s => s.style.display = 'none'); 
    const target = document.getElementById(id);
    if(target) target.style.display = 'block'; 
}

function openReader(name, file) {
    const fileName = file.replace('.txt', '').replace('.html', '');
    window.location.href = `reader.html?book=${fileName}`;
}

// دالة البحث الحي
function liveSearch() { 
    let q = document.getElementById('novelSearch').value.toLowerCase(); 
    document.querySelectorAll('.novel-card').forEach(c => {
        c.style.display = c.getAttribute('data-name').toLowerCase().includes(q) ? 'inline-block' : 'none';
    }); 
}

// دالة رسم الروايات بشكل الـ 3D الجديد
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if (!container) return;
    
    container.innerHTML = novelsData.map(n => `
        <div class="novel-card" data-name="${n.name}" onclick="${n.available ? `openReader('${n.name}','${n.file}')` : `alert('قريباً')`}">
            <div class="book-3d">
                <div class="book-spine"></div>
                <div class="book-cover-img" style="background-image: url('${n.img}')"></div>
            </div>
            <b style="color:white; font-size:13px;">${n.name}</b>
        </div>`).join('');
}
// --- 1. دالات التحكم في واجهة الـ AI ---
function openShainAI() {
    document.getElementById('homeUI').style.display = 'none';
    document.getElementById('aiSection').style.display = 'block';
}

function closeAI() {
    document.getElementById('aiSection').style.display = 'none';
    document.getElementById('homeUI').style.display = 'block';
}

// --- 2. دالة البحث الذكي المطورة ---
// --- دالة رادار شين الذكي ---
function askShainAI() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const responseBox = document.getElementById('aiResponse');
    const userName = localStorage.getItem('userName') || "صديقي";

    if (!input) {
        responseBox.innerHTML = "أنا رادار شين.. ابحث عن تصنيف (اجتماعي، رعب) أو اسم رواية..";
        return;
    }

    responseBox.innerHTML = `جاري فحص الأرشيف الشامل والمنصات الخارجية يا ${userName}...`;

    setTimeout(() => {
        const megaArchive = [
            { name: "حلم طنجار", author: "محمد فكري", type: "اجتماعي / خيال", format: "إلكتروني تفاعلي", source: "مكتبة شين (هنا)", link: "#", tags: ["اجتماعي", "خيال", "أسطورة"] },
            { name: "أرض زيكولا", author: "عمرو عبد الحميد", type: "اجتماعي / خيال", format: "PDF / ورقي", source: "عصير الكتب", link: "https://www.google.com/search?q=أرض+زيكولا+pdf", tags: ["اجتماعي", "ذكاء"] },
            { name: "ساق البامبو", author: "سعود السنعوسي", type: "اجتماعي / واقعي", format: "PDF / إلكتروني", source: "منصات خارجية", link: "https://www.google.com/search?q=ساق+البامبو+pdf", tags: ["اجتماعي", "دراما"] },
            { name: "وباء", author: "محمد فكري", type: "رعب / غموض", format: "PDF (قريباً)", source: "مكتبة شين", link: "#", tags: ["رعب", "خوف"] }
        ];

        let matches = megaArchive.filter(book => {
            const terms = input.split(' ');
            return terms.some(t => 
                book.tags.some(tag => tag.includes(t)) || 
                book.type.toLowerCase().includes(t) ||
                book.name.toLowerCase().includes(t)
            );
        });

        if (matches.length > 0) {
            let html = `<div style="text-align:right; direction:rtl;">✅ <b>نتائج الرادار لـ "${input}":</b><br><br>`;
            matches.forEach(book => {
                html += `
                <div style="background: rgba(255,255,255,0.08); padding:12px; border-radius:10px; margin-bottom:10px; border-right:4px solid #3498db;">
                    <b style="color:#3498db; font-size:15px;">📖 ${book.name}</b><br>
                    <span style="font-size:12px; display:block; margin:4px 0;">📂 الصيغة: <b>${book.format}</b></span>
                    <span style="font-size:12px; color:#2ecc71;">📍 المصدر: ${book.source}</span>
                    ${book.link !== "#" ? `<br><a href="${book.link}" target="_blank" style="color:#f1c40f; font-size:11px; text-decoration:none; display:inline-block; margin-top:5px;">🔗 اذهب لمصدر خارجي</a>` : ""}
                </div>`;
            });
            responseBox.innerHTML = html + `</div>`;
        } else {
            responseBox.innerHTML = `عفواً، لم أجد هذا التصنيف. جرب (اجتماعي، رعب، خيال).`;
        }
    }, 1200);
}

// --- دالات الواجهة ---
function openShainAI() {
    document.getElementById('homeUI').style.display = 'none';
    document.getElementById('aiSection').style.display = 'block';
}

function closeAI() {
    document.getElementById('aiSection').style.display = 'none';
    document.getElementById('homeUI').style.block = 'block';
}

// --- تشغيل التطبيق النهائي (هام جداً لإخفاء اللودر) ---
window.onload = function() {
    if (typeof initApp === "function") {
        initApp();
    } else {
        // لو الدالة مش متعرفة، هنخفي اللودر يدوياً كأمان
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
        const homeUI = document.getElementById('homeUI');
        if (homeUI) homeUI.style.display = 'block';
    }
};
