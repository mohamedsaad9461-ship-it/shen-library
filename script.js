// إخفاء التحميل أول ما الصفحة تجهز
window.onload = () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    }, 1000);
};

function showSec(sectionId) {
    const sections = ['homeUI', 'librarySection', 'aiSection', 'readerMode'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';
}

async function askShinAI() {
    const input = document.getElementById('aiInput');
    const responseBox = document.getElementById('aiResponse');
    if (!input.value) return;

    responseBox.innerHTML = "جاري البحث في رفوف المكتبة... ⏳";
    
    try {
        const apiKey = "AIzaSyD7hYs_9VJv7wAM4_e5sAXayeZUjj9LwhE"; 
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `أنت مساعد خبير روايات. أجب باختصار على: ${input.value}` }] }]
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
            responseBox.innerHTML = data.candidates[0].content.parts[0].text;
            input.value = ""; 
        } else {
            responseBox.innerHTML = "عذراً، لم أستطع الحصول على رد. حاول مرة أخرى.";
        }
    } catch (error) {
        responseBox.innerHTML = "خطأ في الاتصال. تأكد من الإنترنت.";
    }
}

function openReader(title, url) {
    document.getElementById('readerTitle').innerText = title;
    document.getElementById('bookFrame').src = url;
    showSec('readerMode');
}
