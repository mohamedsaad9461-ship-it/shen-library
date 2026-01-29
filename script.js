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
    const slides = document.querySelector('.slides');
    if (slides) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % 4; 
            // التحريك بالسالب عشان يمشي صح في نظام الـ RTL العربي
            slides.style.transform = `translateX(-${currentSlide * 25}%)`; 
        }, 3000);
    }
}

window.onload = function() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
    
    showSec('homeUI');
    startBannerSlider();
};
/* === [END: SYSTEM_INIT] === */
/* === [TAG: SOCIAL_INTERACTION_LOGIC] === */
function handleReaction(novelId, type) {
    // حفظ التفاعل (لايك أو ديسلايك)
    if (appState.votes[novelId] === type) {
        appState.votes[novelId] = null; // إلغاء الضغطة لو داس تاني
    } else {
        appState.votes[novelId] = type;
    }
    saveData();
}

function handleStar(novelId, rating) {
    appState.ratings[novelId] = rating;
    saveData();
}

function saveData() {
    localStorage.setItem('shain_pro_v1', JSON.stringify(appState));
    renderNovels(); // تحديث المكتبة فوراً
}

function getSocialHTML(n) {
    const userVote = appState.votes[n.id];
    const userStars = appState.ratings[n.id] || 0;

    let starsHTML = '<div class="stars-row">';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<span class="star ${i <= userStars ? 'selected' : ''}" onclick="event.stopPropagation(); handleStar(${n.id}, ${i})">★</span>`;
    }
    starsHTML += '</div>';

    return `
        ${starsHTML}
        <div class="interaction-bar" onclick="event.stopPropagation();">
            <div class="action-btn btn-like ${userVote === 'like' ? 'active' : ''}" onclick="handleReaction(${n.id}, 'like')">👍</div>
            <div class="action-btn btn-comment" onclick="alert('قريباً: فتح سجل التعليقات')">💬</div>
            <div class="action-btn btn-dislike ${userVote === 'dislike' ? 'active' : ''}" onclick="handleReaction(${n.id}, 'dislike')">👎</div>
        </div>
    `;
}
/* === [END: SOCIAL_INTERACTION_LOGIC] === */
