/* === نظام الحماية: منع تداخل الأكواد === */

// 1. تشغيل الأقسام (Navigation) - ثابتة لا تتغير
const showSec = (id) => {
    document.querySelectorAll('section, .ui-page').forEach(s => s.style.display = 'none');
    const target = document.getElementById(id);
    if(target) target.style.display = 'block';
};

// 2. محرك القراءة (Reader) - مربوط بالـ HTML مباشرة
const openReader = (name, file) => {
    const frame = document.getElementById('bookFrame');
    const title = document.getElementById('readerTitle');
    if(frame) {
        frame.src = file;
        title.innerText = name;
        showSec('readerMode');
    } else {
        // لو ملقاش البرواز، يفتح الملف في صفحة جديدة كحل أمان
        window.location.href = file;
    }
};

// 3. نظام التفاعل (النجوم واللايكات) - يعمل على أي "كارت" موجود في الـ HTML
const initReactions = () => {
    let state = JSON.parse(localStorage.getItem('shain_pro_v1')) || { ratings: {}, votes: {} };
    
    document.querySelectorAll('.novel-card').forEach((card, i) => {
        const id = card.getAttribute('data-id') || i;
        // هنا الكود بيضيف النجوم واللايكات "فوق" تصميمك من غير ما يمسحه
        if (!card.querySelector('.interaction-bar')) {
            const bar = document.createElement('div');
            bar.className = 'interaction-bar';
            bar.innerHTML = `
                <div class="stars">★★★★★</div>
                <div class="btns">👍 💬 👎</div>`;
            card.appendChild(bar);
        }
    });
};

// 4. البانر (Slider) - يعمل باستقلالية تامة
const startSlider = () => {
    let cur = 0;
    const s = document.querySelector('.slides');
    if(s) setInterval(() => { cur = (cur+1)%4; s.style.transform = `translateX(-${cur*25}%)`; }, 3000);
};

// تشغيل كل شيء عند فتح الصفحة
window.onload = () => {
    if(document.getElementById('loader')) document.getElementById('loader').style.display = 'none';
    showSec('homeUI');
    startSlider();
    initReactions(); // هتشغل النجوم على أي حاجة موجودة
};
