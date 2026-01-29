// بياناتك الأصلية
const novelsData = [
    { id: 0, name: "حلم طنجار", img: "https://i.ibb.co/G497YVXL/Screenshot-2026-01-28-014231.png", file: "reader.html", available: true },
    { id: 1, name: "قلب التين", img: "https://i.ibb.co/v97Ghgy/Screenshot-2026-01-28-043103.png", available: false }
];

let appState = JSON.parse(localStorage.getItem('shain_pro_v1')) || { votes: {}, ratings: {} };

// دالة التبديل بين الصفحات (إصلاح مشكلة الاختفاء)
function showSec(id) {
    document.getElementById('homeUI').style.display = 'none';
    document.getElementById('librarySection').style.display = 'none';
    document.getElementById('quotesSection').style.display = 'none';
    if(document.getElementById('aiSection')) document.getElementById('aiSection').style.display = 'none';

    document.getElementById(id).style.display = 'block';
    if(id === 'librarySection') renderNovels();
}

function renderNovels() {
    const container = document.getElementById('novelsContainer');
    if(!container) return;
    container.innerHTML = novelsData.map(n => `
        <div class="novel-card">
            <img src="${n.img}">
            <h3>${n.name}</h3>
            <button class="glass-btn" onclick="openReader('${n.name}', '${n.file}')">${n.available?'اقرأ الآن':'قريباً'}</button>
        </div>
    `).join('');
}

function openReader(n, f) {
    document.getElementById('readerMode').style.display = 'block';
    document.getElementById('bookFrame').src = f;
}

function closeReader() {
    document.getElementById('readerMode').style.display = 'none';
    document.getElementById('bookFrame').src = '';
}

// تشغيل البانر (السلايدر)
let curSlide = 0;
function moveSlide() {
    const slides = document.querySelector('.slides');
    if(slides) {
        curSlide = (curSlide + 1) % 3;
        slides.style.transform = `translateX(${curSlide * 100}%)`;
    }
}
setInterval(moveSlide, 3000);

window.onload = () => {
    if(document.getElementById('loader')) document.getElementById('loader').style.display = 'none';
    showSec('homeUI'); // تأكد إن البانر هو أول حاجة تظهر
};
