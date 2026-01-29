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
    const userName = localStorage.getItem('userName') || "صديقي";
    const userGender = localStorage.getItem('userGender') || "ذكر"; 

    if (!input) {
        responseBox.innerHTML = "أنا جاهز لمساعدتك، صف لي ما تبحث عنه...";
        return;
    }

    responseBox.innerHTML = `جاري فحص المكتبة الشاملة يا ${userName}...`;

    setTimeout(() => {
        const bigLibrary = [
            {
                name: "حلم طنجار",
                author: "محمد فكري",
                tags: ["صحراء", "قبيلة", "خيال", "أسطورة", "رجل", "حلم"],
                format: "إلكتروني (تفاعلي)",
                status: "مجانية",
                link: "داخل المكتبة هنا"
            },
            {
                name: "أرض زيكولا",
                author: "عمرو عبد الحميد",
                tags: ["ذكاء", "عملات", "خيال", "قانون", "أسيل"],
                format: "PDF + ورقي",
                status: "مدفوعة",
                link: "عصير الكتب"
            }
        ];

        let matches = bigLibrary.filter(book => 
            book.tags.some(t => input.includes(t)) || 
            input.includes(book.name.toLowerCase()) || 
            input.includes(book.author.toLowerCase())
        );

        if (matches.length > 0) {
            let htmlResult = `✨ <b>نتائج البحث يا ${userName}:</b><br>`;
            matches.forEach(book => {
                htmlResult += `<div style="border-bottom:1px solid #444; padding:5px;">📖 ${book.name} - ${book.format}</div>`;
            });
            responseBox.innerHTML = htmlResult;
        } else {
            responseBox.innerHTML = `عفواً يا ${userName}، لم أجد تطابقاً. جرب كلمات مثل (خيال، صحراء).`;
        }
    }, 1000);
}

// --- 3. تشغيل التطبيق (يجب أن يكون في آخر الملف دائماً) ---
window.onload = function() {
    if (typeof initApp === "function") {
        initApp(); // دي الدالة اللي بتشيل اللودر وتظهر الواجهة
    }
};
            
         

       
