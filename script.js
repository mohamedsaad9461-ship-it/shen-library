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

    // تثبيت الهيكل: الخانة فوق والنتائج تحتها عشان مفيش حاجة تختفي
    responseBox.innerHTML = `
        <div style="background: #00d2ff; color: #000; padding: 10px 15px; border-radius: 12px; margin-bottom: 15px; font-weight: bold; width: fit-content; align-self: flex-end;">
            🔍 بحثت عن: ${input}
        </div>
        <div id="resultsContainer" style="display: flex; flex-direction: column; gap: 15px; width: 100%;">
            <div id="aiStatus" style="color: #00d2ff; font-size: 13px;">📡 جاري سحب الأغلفة والبيانات...</div>
        </div>
    `;

    const resultsContainer = document.getElementById('resultsContainer');

    setTimeout(() => {
        // قاعدة البيانات بالأغلفة (تقدر تغير الروابط دي لصورك الحقيقية)
        const megaArchive = [
            { 
                name: "تاكسي", auth: "خالد الخميسي", cat: "كوميدي", 
                img: "https://m.media-amazon.com/images/I/41-v8f8Y9pL.jpg", // غلاف تاكسي
                type: "PDF", loc: "مكتبة نور", link: "https://www.google.com/search?q=رواية+تاكسي+pdf" 
            },
            { 
                name: "أرض النفاق", auth: "يوسف السباعي", cat: "كوميدي", 
                img: "https://m.media-amazon.com/images/I/51rYy5+S1FL.jpg", 
                type: "ورقي", loc: "عصير الكتب", link: "https://www.google.com/search?q=أرض+النفاق+pdf" 
            },
            { 
                name: "قواعد العشق الأربعون", auth: "إليف شافاق", cat: "ديني", 
                img: "https://m.media-amazon.com/images/I/41m9-T881ML.jpg", 
                type: "PDF", loc: "منصات عالمية", link: "https://www.google.com/search?q=قواعد+العشق+الأربعون+pdf" 
            },
            { 
                name: "حلم طنجار", auth: "محمد فكري", cat: "اجتماعي", 
                img: "https://via.placeholder.com/100x150?text=Tanjar", // صورة مؤقتة لروياتك
                type: "إلكتروني", loc: "مكتبة شين", link: "#" 
            }
        ];

        let matches = megaArchive.filter(book => 
            book.cat.includes(input) || book.name.toLowerCase().includes(input)
        );

        document.getElementById('aiStatus').remove();

        if (matches.length > 0) {
            matches.forEach(book => {
                resultsContainer.innerHTML += `
                <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 12px; display: flex; gap: 15px; align-items: center; border: 1px solid rgba(0,210,255,0.2);">
                    <img src="${book.img}" style="width: 70px; height: 100px; border-radius: 5px; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
                    <div style="flex: 1;">
                        <b style="color: #fff; display: block; font-size: 16px;">${book.name}</b>
                        <small style="color: #00d2ff;">👤 ${book.auth}</small><br>
                        <small style="color: #aaa;">🎭 ${book.cat} | 📍 ${book.loc}</small>
                        ${book.link !== "#" ? `<a href="${book.link}" target="_blank" style="display:inline-block; margin-top:8px; color:#f1c40f; text-decoration:none; font-size:12px; border: 1px solid #f1c40f; padding: 2px 8px; border-radius: 4px;">تحميل PDF</a>` : ""}
                    </div>
                </div>`;
            });
        } else {
            resultsContainer.innerHTML = `<div style="color: #e74c3c;">لم أجد نتائج.. جرب "كوميدي" أو "ديني"</div>`;
        }
        // التمرير التلقائي لأسفل عشان النتائج الجديدة تظهر
        responseBox.scrollTop = responseBox.scrollHeight;
    }, 1000);
}

// دالات التحكم وسطر الأمان النهائي (لا تغيرها)
function openShainAI() { document.getElementById('homeUI').style.display = 'none'; document.getElementById('aiSection').style.display = 'block'; }
function closeAI() { document.getElementById('aiSection').style.display = 'none'; document.getElementById('homeUI').style.display = 'block'; }
window.onload = function() {
    const loader = document.getElementById('loader');
    const homeUI = document.getElementById('homeUI');
    if (loader) loader.style.display = 'none';
    if (homeUI) homeUI.style.display = 'block';
};
