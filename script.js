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
function askShainAI() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const responseBox = document.getElementById('aiResponse');
    const userName = "محمد";

    if (!input) return;

    // مسح القديم وعرض "جاري الفحص"
    responseBox.innerHTML = `
        <div style="align-self: flex-end; background: #00d2ff; color: #000; padding: 10px 15px; border-radius: 15px 15px 0 15px; margin-bottom: 10px; max-width: 80%; font-weight: bold;">
            🔍 الرادار يبحث عن: ${input}
        </div>
        <div id="loadingStatus" style="color: #00d2ff; font-size: 12px; margin-bottom: 10px; animation: pulse 1s infinite;">📡 جاري مسح كافة المنصات والأرشيف...</div>
    `;

    setTimeout(() => {
        // قاعدة بيانات موسعة جداً (كوميدي، اجتماعي، رعب، ديني)
        const megaArchive = [
            // --- تصنيف كوميدي ---
            { name: "تاكسي", author: "خالد الخميسي", cat: "كوميدي / ساخر", type: "PDF / ورقي", loc: "منصات خارجية", link: "https://www.google.com/search?q=رواية+تاكسي+pdf", tags: ["كوميدي", "ضحك", "ساخر"] },
            { name: "عايزة أتجوز", author: "غادة عبد العال", cat: "كوميدي / اجتماعي", type: "PDF", loc: "مكتبة نور", link: "https://www.google.com/search?q=عايزة+أتجوز+pdf", tags: ["كوميدي", "اجتماعي", "ضحك"] },
            { name: "أرض النفاق", author: "يوسف السباعي", cat: "كوميدي / فلسفي", type: "PDF / ورقي", loc: "عصير الكتب", link: "https://www.google.com/search?q=أرض+النفاق+pdf", tags: ["كوميدي", "خيال", "ساخر"] },
            
            // --- تصنيف اجتماعي ---
            { name: "حلم طنجار", author: "محمد فكري", cat: "اجتماعي / خيال", type: "إلكتروني تفاعلي", loc: "مكتبة شين (هنا)", link: "#", tags: ["اجتماعي", "خيال", "دراما"] },
            { name: "ساق البامبو", author: "سعود السنعوسي", cat: "اجتماعي", type: "PDF", loc: "منصات عالمية", link: "https://www.google.com/search?q=ساق+البامبو+pdf", tags: ["اجتماعي", "واقعي"] },
            
            // --- تصنيف ديني / تاريخي ---
            { name: "خوارق اللاشعور", author: "علي الوردي", cat: "ديني / فلسفي", type: "PDF", loc: "مكتبة نور", link: "https://www.google.com/search?q=خوارق+اللاشعور+pdf", tags: ["ديني", "فلسفة", "دين"] },
            { name: "قواعد العشق الأربعون", author: "إليف شافاق", cat: "ديني / صوفي", type: "PDF / ورقي", loc: "منصات خارجية", link: "https://www.google.com/search?q=قواعد+العشق+الأربعون+pdf", tags: ["ديني", "صوفي", "اجتماعي"] }
        ];

        // محرك البحث: يدور في الاسم، التصنيف، والكلمات الدلالية
        let matches = megaArchive.filter(book => 
            book.tags.some(tag => input.includes(tag)) || 
            book.cat.toLowerCase().includes(input) || 
            book.name.toLowerCase().includes(input)
        );

        document.getElementById('loadingStatus').remove();

        if (matches.length > 0) {
            let html = `<div style="color: #00d2ff; font-weight: bold; margin-bottom: 10px;">✅ إليك نتائج الرادار يا ${userName}:</div>`;
            matches.forEach(book => {
                html += `
                <div style="background: rgba(255,255,255,0.08); padding: 12px; border-radius: 12px; margin-bottom: 10px; border-right: 4px solid #00d2ff;">
                    <b style="color: #fff; font-size: 15px;">📖 ${book.name}</b> <small>(${book.author})</small><br>
                    <small style="color: #aaa;">🎭 التصنيف: ${book.cat}</small><br>
                    <div style="margin-top: 5px;">
                        <span style="background: #00d2ff; color: #000; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">${book.type}</span>
                        <span style="color: #2ecc71; font-size: 11px; margin-right: 8px;">📍 المصدر: ${book.loc}</span>
                    </div>
                    ${book.link !== "#" ? `<a href="${book.link}" target="_blank" style="display:block; margin-top:8px; color:#f1c40f; text-decoration:none; font-size:11px; text-align:center; border:1px solid #f1c40f; border-radius:5px; padding:3px;">🔍 احصل على نسخة الـ PDF</a>` : ""}
                </div>`;
            });
            responseBox.innerHTML += html;
        } else {
            // لو مالقاش.. شين يروح جوجل يجيب النتيجة فوراً
            responseBox.innerHTML += `
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; border: 1px solid #e74c3c;">
                    ⚠️ لم أجد "${input}" في الأرشيف المباشر، لكن جاري تجهيز بحث جوجل لك:<br>
                    <a href="https://www.google.com/search?q=روايات+${input}+pdf" target="_blank" style="display:block; background:#f1c40f; color:#000; text-align:center; padding:10px; border-radius:8px; margin-top:10px; text-decoration:none; font-weight:bold;">🔍 ابحث عن "${input}" في جوجل PDF</a>
                </div>`;
        }
    }, 1000);
}

// دالات التحكم وسطر الأمان (لإخفاء اللودر)
function openShainAI() { document.getElementById('homeUI').style.display = 'none'; document.getElementById('aiSection').style.display = 'block'; }
function closeAI() { document.getElementById('aiSection').style.display = 'none'; document.getElementById('homeUI').style.display = 'block'; }

window.onload = function() {
    const loader = document.getElementById('loader');
    const homeUI = document.getElementById('homeUI');
    if (loader) loader.style.display = 'none';
    if (homeUI) homeUI.style.display = 'block';
};
