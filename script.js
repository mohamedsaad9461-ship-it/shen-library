/* === [1. محرك التنقل الثابت] === */
function showSec(sectionId) {
    // إخفاء كل الأقسام أولاً
    document.getElementById('homeUI').style.display = 'none';
    document.getElementById('librarySection').style.display = 'none';
    document.getElementById('aiSection').style.display = 'none';
    document.getElementById('quotesSection').style.display = 'none';
    document.getElementById('readerMode').style.display = 'none';

    // إظهار القسم المطلوب فقط
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        window.scrollTo(0, 0); // نطلع فوق خالص في الصفحة الجديدة
    }
}

/* === [2. محرك القارئ المباشر] === */
function openReader(name, file) {
    const frame = document.getElementById('bookFrame');
    const title = document.getElementById('readerTitle');
    
    if (frame) {
        showSec('readerMode'); 
        frame.src = file;
        if(title) title.innerText = name;
    } else {
        // لو حصل أي مشكلة في البرواز، بيفتح الملف مباشرة كأمان
        window.location.href = file;
    }
}

/* === [3. محرك البانر المستقل] === */
function startSlider() {
    let cur = 0;
    const slides = document.querySelector('.slides');
    if (slides) {
        setInterval(() => {
            cur = (cur + 1) % 4; 
            slides.style.transform = `translateX(-${cur * 25}%)`;
        }, 3000);
    }
}

/* === [4. نظام الإضافات (النجوم واللايكات) - بدون تضارب] === */
// أي حاجة جديدة هنضيفها هنا، مش هتلمس اللي فوق
function initReactions() {
    console.log("نظام التفاعلات جاهز..");
    // هنا هنبرمج اللايكات والنجوم بشكل مستقل لاحقاً
}

/* === [5. التشغيل عند التحميل] === */
window.onload = function() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';

    showSec('homeUI'); // يفتح الرئيسية فوراً
    startSlider();     // يشغل البانر
    initReactions();   // يجهز التفاعلات
};
