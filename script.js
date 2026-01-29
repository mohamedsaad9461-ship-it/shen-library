/* === محرك التطبيق الشامل (إصدار الحماية القصوى) === */

// 1. وظيفة التنقل: بتفتح أي قسم بمجرد ما تديها اسمه
function showSec(id) {
    // بيخفي كل حاجة شاكة إنها صفحة
    document.querySelectorAll('section, .ui-page, .tab-content').forEach(s => s.style.display = 'none');
    
    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block';
        window.scrollTo(0,0);
    }
}

// 2. وظيفة القارئ: بتفتح الملف اللي بتحدده في الزرار
function openReader(name, file) {
    const reader = document.getElementById('readerMode');
    const iframe = document.getElementById('bookFrame');
    const title = document.getElementById('readerTitle');

    if (reader && iframe) {
        showSec('readerMode'); // اخفي الكل واظهر القارئ
        iframe.src = file;
        if(title) title.innerText = name;
    } else {
        // لو ملقاش البرواز، يفتح الملف في صفحة جديدة كأمان
        window.location.href = file;
    }
}

// 3. تشغيل النظام تلقائياً
window.onload = function() {
    // إخفاء اللودر
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';

    // تشغيل الصفحة الرئيسية
    showSec('homeUI');

    // تشغيل البانر (الصور اللي بتقلب)
    let cur = 0;
    const slides = document.querySelector('.slides');
    if (slides) {
        setInterval(() => {
            cur = (cur + 1) % 4; 
            slides.style.transform = `translateX(-${cur * 25}%)`;
        }, 3000);
    }
};
