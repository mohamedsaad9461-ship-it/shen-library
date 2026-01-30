/* === [1. إعدادات الأمان والبيانات] === */
const APP_CONFIG = {
    apiKey: "AIzaSyDCJ1mSdT6DA7Ifvzmcjz7cLYYEt-Z9Ozo", // 
    sections: ['homeUI', 'librarySection', 'aiSection', 'quotesSection', 'readerMode'] // [cite: 79-83]
};

/* === [2. محرك التنقل الذكي] === */
function showSec(sectionId) {
    // إخفاء كل الأقسام باستخدام حلقة تكرار لتقليل الخطأ البشري [cite: 78]
    APP_CONFIG.sections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) sec.style.display = 'none'; // [cite: 79]
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block'; // [cite: 87]
        window.scrollTo(0, 0); // [cite: 88]
    }
}

/* === [3. محرك الذكاء الاصطناعي - نسخة آمنة] === */
async function askShinAI() {
    // إصلاح الخطأ: التأكد من سحب النص من المعرف الصحيح (userInput) [cite: 68, 130]
    const inputField = document.getElementById('userInput'); 
    const responseBox = document.getElementById('aiResponse');

    if (!inputField || !inputField.value) return; // [cite: 132]
    
    const userText = inputField.value;
    responseBox.innerHTML = "جاري التفكير في عالم الروايات... ⏳"; // [cite: 133]

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${APP_CONFIG.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // [cite: 139]
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `أنت مساعد ذكي خبير في الروايات والأدب فقط اسمك "مساعد شين". وظيفتك ترشيح روايات لمحمد. سؤاله هو: ${userText}` }] // [cite: 142-143]
                }]
            })
        });
        
        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            responseBox.innerHTML = data.candidates[0].content.parts[0].text; // [cite: 150]
        } else {
            responseBox.innerHTML = "لم أستطع إيجاد إجابة، حاول مرة أخرى."; // [cite: 152]
        }
    } catch (error) {
        responseBox.innerHTML = "عذراً يا محمد، حدث خطأ. تأكد من الإنترنت أو المفتاح."; // 
    }
}

/* === [4. التشغيل عند التحميل] === */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none'; // [cite: 124]
    
    showSec('homeUI'); // [cite: 125]
    startSlider(); // [cite: 126]
});
