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

    // مسح المحتوى القديم عشان الخانات متزدش بشكل غريب
    responseBox.innerHTML = `
        <div style="align-self: flex-end; background: #00d2ff; color: #000; padding: 10px 15px; border-radius: 15px 15px 0 15px; margin-bottom: 15px; max-width: 80%; font-weight: bold;">
            🔍 بحثت عن: ${input}
        </div>
        <div id="aiLoading" style="color: #aaa; font-style: italic; font-size: 13px; margin-bottom: 10px;">جاري مسح الأرشيف الشامل...</div>
    `;

    setTimeout(() => {
        // قاعدة بيانات "الرادار" - ضفت لك فيها تصنيفات متنوعة
        const megaArchive = [
            { name: "حلم طنجار", cat: "اجتماعي / خيال", type: "إلكتروني", loc: "مكتبة شين (هنا)", link: "#", tags: ["اجتماعي", "خيال", "دراما"] },
            { name: "أرض زيكولا", cat: "اجتماعي / تشويق", type: "PDF / ورقي", loc: "عصير الكتب", link: "https://www.google.com/search?q=أرض+زيكولا+pdf", tags: ["اجتماعي", "ذكاء", "خيال"] },
            { name: "ساق البامبو", cat: "اجتماعي / واقعي", type: "PDF", loc: "منصات عالمية", link: "https://www.google.com/search?q=ساق+البامبو+pdf", tags: ["اجتماعي", "واقعي"] },
            { name: "الفيل الأزرق", cat: "رعب / نفسي", type: "PDF / إلكتروني", loc: "تطبيق أبجد", link: "https://www.abjjad.com/", tags: ["رعب", "نفسي"] },
            { name: "رواية جديدة", cat: "كوميدي", type: "PDF", loc: "مكتبة نور", link: "https://www.google.com/search?q=روايات+كوميدية+pdf", tags: ["كوميدي", "ضحك"] }
        ];

        // المحرك بيقسم كلامك ويدور في كل حتة (شبه جوجل)
        let terms = input.split(' ');
        let results = megaArchive.filter(book => 
            terms.some(t => book.tags.some(tag => tag.includes(t)) || book.cat.toLowerCase().includes(t) || book.name.toLowerCase().includes(t))
        );

        const loadingDiv = document.getElementById('aiLoading');
        if (loadingDiv) loadingDiv.remove();

        if (results.length > 0) {
            let html = `<div style="color: #00d2ff; font-weight: bold; margin-bottom: 10px;">✨ يا ${userName}، إليك ما وجدته في هذا التصنيف:</div>`;
            results.forEach(book => {
                html += `
                <div style="background: rgba(255,255,255,0.08); padding: 12px; border-radius: 10px; margin-bottom: 10px; border-right: 4px solid #00d2ff;">
                    <b style="color: #fff;">📖 ${book.name}</b><br>
                    <small style="color: #aaa;">🎭 التصنيف: ${book.cat}</small><br>
                    <div style="margin-top: 5px;">
                        <span style="background: #00d2ff; color: #000; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">${book.type}</span>
                        <span style="color: #2ecc71; font-size: 11px; margin-right: 10px;">📍 المصدر: ${book.loc}</span>
                    </div>
                    ${book.link !== "#" ? `<a href="${book.link}" target="_blank" style="display:block; margin-top:8px; color:#f1c40f; text-decoration:none; font-size:12px;">🔗 اذهب للمصدر</a>` : ""}
                </div>`;
            });
            responseBox.innerHTML += html;
        } else {
            responseBox.innerHTML += `
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 10px; border: 1px solid #e74c3c;">
                    عذراً يا ${userName}، لم أجد نتائج دقيقة لـ "${input}".<br>
                    <a href="https://www.google.com/search?q=رواية+${input}+pdf" target="_blank" style="display:block; background:#f1c40f; color:#000; text-align:center; padding:8px; border-radius:5px; margin-top:10px; text-decoration:none; font-weight:bold;">🔍 ابحث في جوجل PDF</a>
                </div>`;
        }
    }, 800);
}

// دالات التحكم (الفتح والإغلاق)
function openShainAI() { document.getElementById('homeUI').style.display = 'none'; document.getElementById('aiSection').style.display = 'block'; }
function closeAI() { document.getElementById('aiSection').style.display = 'none'; document.getElementById('homeUI').style.display = 'block'; }

// سطر الأمان النهائي: بيجبر اللودر يختفي مهما حصل
window.onload = function() {
    const loader = document.getElementById('loader');
    const homeUI = document.getElementById('homeUI');
    
    // إخفاء اللودر وإظهار الواجهة فوراً
    if (loader) loader.style.display = 'none';
    if (homeUI) homeUI.style.display = 'block';
    
    // تشغيل أي دالات إضافية لو موجودة
    if (typeof initApp === "function") initApp();
};
