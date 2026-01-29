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
async function askShinAI() {
    const input = document.getElementById('aiInput').value;
    const responseBox = document.getElementById('aiResponse');
    
    if (!input) return;

    responseBox.innerHTML = "جاري التفكير في عالم الروايات... ⏳";
    
    try {
        // تنبيه: لازم تجيب API Key من Google AI Studio عشان يشتغل
        const apiKey = "AIzaSyD-YOUR_ACTUAL_KEY_HERE"; 
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `أنت مساعد ذكي خبير في الروايات والأدب فقط اسمك "مساعد شين". وظيفتك ترشيح روايات لمحمد والإجابة على أسئلته الأدبية باحترافية. سؤاله هو: ${input}` }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiText = data.candidates[0].content.parts[0].text;
            responseBox.innerHTML = aiText;
        } else {
            responseBox.innerHTML = "لم أستطع إيجاد إجابة، حاول صياغة السؤال بشكل مختلف.";
        }
    } catch (error) {
        responseBox.innerHTML = "عذراً يا محمد، حدث خطأ في الاتصال. تأكد من مفتاح الـ API.";
        console.error(error);
    }
}
