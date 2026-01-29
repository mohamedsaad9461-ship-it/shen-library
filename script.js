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
// دالة "ترشيحات شين" الذكية
function askShainAI() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const responseBox = document.getElementById('aiResponse');
    
    // جلب بيانات المستخدم (محمد مثلاً) ونوعه من ذاكرة التطبيق
    const userName = localStorage.getItem('userName') || "صديقي";
    const userGender = localStorage.getItem('userGender') || "ذكر"; 

    if (!input) {
        responseBox.innerHTML = userGender === "أنثى" ? "اكتبي وصفاً أولاً يا عزيزتي." : "اكتب وصفاً أولاً يا صديقي.";
        return;
    }

    // تأثير الانتظار
    responseBox.innerHTML = `<span style="opacity:0.6;">جاري تحليل طلبك والبحث يا ${userName}...</span>`;

    setTimeout(() => {
        let result = "";

        // محرك البحث (الربط بالكلمات المفتاحية)
        if (input.includes("صحراء") || input.includes("طنجار") || input.includes("قبيلة")) {
            result = `✨ <b>يا ${userName}، النتيجة هي:</b> "حلم طنجار"<br>📍 <b>الحالة:</b> <span style="color:#27ae60">مجانية</span><br>🛒 <b>المكان:</b> متوفرة الآن داخل مكتبتك.`;
        } 
        else if (input.includes("رعب") || input.includes("خوف") || input.includes("غموض")) {
            result = `✨ <b>ترشيح شين لك ${userGender === "أنثى" ? 'عزيزتي' : 'يا صديقي'}:</b> رواية "وباء"<br>📍 <b>الحالة:</b> قيد التحضير.<br>💡 <b>بديل خارجي:</b> "الفيل الأزرق" (مدفوعة) في تطبيق أبجد.`;
        }
        else {
            result = `<b>عفواً يا ${userName}:</b> لم أجد رواية تطابق هذا الوصف بدقة. جرب كلمات مثل (خيال، رعب، تاريخ).`;
        }

        responseBox.innerHTML = result;
    }, 1500);
}

// دالة فتح قسم الترشيحات
function openShainAI() {
    document.getElementById('homeUI').style.display = 'none';
    document.getElementById('aiSection').style.display = 'block';
}

// دالة العودة للرئيسية
function closeAI() {
    document.getElementById('aiSection').style.display = 'none';
    document.getElementById('homeUI').style.display = 'block';
}
// تشغيل التطبيق
window.onload = initApp;
