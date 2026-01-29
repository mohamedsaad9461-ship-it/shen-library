/* === [1. المحرك الأساسي للتنقل] === */
function showSec(id) {
    // إخفاء كل الصفحات أولاً
    const pages = document.querySelectorAll('section, .ui-page, div[id$="Section"], #homeUI, #readerMode');
    pages.forEach(p => p.style.display = 'none');

    // إظهار الصفحة المطلوبة
    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block';
        window.scrollTo(0,0);
    } else {
        console.error("الصفحة غير موجودة: " + id);
    }
}

/* === [2. محرك القراءة] === */
function openReader(name, file) {
    const reader = document.getElementById('readerMode');
    const iframe = document.getElementById('bookFrame');
    const title = document.getElementById('readerTitle');

    if (reader && iframe) {
        showSec('readerMode'); // إخفاء الكل وإظهار القارئ
        iframe.src = file;
        if(title) title.innerText = name;
    } else {
        // حل احتياطي لو مفيش برواز: يفتح في صفحة جديدة
        window.location.href = file;
    }
}

/* === [3. محرك البانر] === */
function startSlider() {
    let cur = 0;
    const s = document.querySelector('.slides');
    if (s) {
        setInterval(() => {
            cur = (cur + 1) % 4; 
            s.style.transform = `translateX(-${cur * 25}%)`;
        }, 3000);
    }
}

/* === [4. تشغيل كل شيء عند البداية] === */
window.onload = function() {
    // إخفاء اللودر لو موجود
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';

    // إظهار الصفحة الرئيسية أول ما يفتح
    showSec('homeUI');

    // تشغيل البانر
    startSlider();
};
