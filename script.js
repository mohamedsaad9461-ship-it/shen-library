/* === [TAG: APP_DATA] === */
const novelsData = [
    { id: 0, name: "حلم طنجار", img: "https://i.ibb.co/G497YVXL/Screenshot-2026-01-28-014231.png", file: "reader.html", available: true },
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false },
    { id: 2, name: "ممالك القيران", img: "https://i.ibb.co/MyXwc6TT/Screenshot-2026-01-28-014536.png", available: false },
    { id: 3, name: "وباء", img: "https://i.ibb.co/xqfBbZjf/Screenshot-2026-01-28-014331.png", available: false },
    { id: 4, name: "قصص من مصدر", img: "https://i.ibb.co/BHgP5YC6/Screenshot-2026-01-28-014426.png", available: false }
];

let appState = JSON.parse(localStorage.getItem('shain_pro_v1')) || { ratings: {}, votes: {} };
/* === [END: APP_DATA] === */

/* === [TAG: UI_NAVIGATION] === */
function showSec(id) {
    // إخفاء كل شيء تماماً
    const sections = ['homeUI', 'librarySection', 'quotesSection', 'aiSection', 'readerMode'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.style.display = 'none';
    });

    const target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
        if(id === 'librarySection') renderNovels();
    }
}
/* === [END: UI_NAVIGATION] === */

/* === [TAG: LIBRARY_ENGINE] === */
function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;
    
    container.innerHTML = novelsData.map(n => `
        <div class="novel-card">
            <img src="${n.img}" alt="${n.name}">
            <h3>${n.name}</h3>
            <button class="glass-btn" onclick="${n.available ? `openReader('${n.name}', '${n.file}')` : 'alert(\'قريباً!\')'}">
                ${n.available ? 'اقرأ الآن' : 'قريباً'}
            </button>
        </div>`).join('');
}

function openReader(name, file) {
    showSec('readerMode'); // دي اللي هتخلي القارئ يفتح في صفحة لوحده ويخفي الباقي
    document.getElementById('bookFrame').src = file;
    document.getElementById('readerTitle').innerText = name;
}

function closeReader() {
    document.getElementById('bookFrame').src = '';
    showSec('librarySection'); // لما تقفل يرجعك للمكتبة
}
/* === [END: LIBRARY_ENGINE] === */

/* === [TAG: SYSTEM_INIT] === */
let currentSlide = 0;

function startBannerSlider() {
    // بنجيب الحاوية اللي فيها الصور
    const slides = document.querySelector('.slides');
    
    // لو موجودة فعلاً في الصفحة، نبدأ نحركها
    if (slides) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % 4; // رقم 4 هو عدد صورك
            // التحريك لليسار بنسبة 25% لكل صورة
            slides.style.transform = `translateX(${currentSlide * 25}%)`;
        }, 3000); // 3000 مللي ثانية يعني 3 ثواني
    }
}

window.onload = function() {
    // 1. إخفاء اللودر
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
    
    // 2. إظهار الصفحة الرئيسية
    showSec('homeUI');
    
    // 3. تشغيل عداد الصور
    startBannerSlider();
};
/* === [END: SYSTEM_INIT] === */
