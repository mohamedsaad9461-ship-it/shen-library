// 1. إخفاء شاشة التحميل
window.onload = () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    }, 1000);
};

// 2. التنقل بين الصفحات
function showSec(id) {
    const pages = ['homeUI', 'librarySection', 'aiSection', 'readerMode'];
    pages.forEach(p => {
        const el = document.getElementById(p);
        if (el) el.style.display = 'none';
    });
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';
}

// 3. محرك البحث الذكي (مساعد شين)
async function askShinAI() {
    const input = document.getElementById('aiInput');
    const responseBox = document.getElementById('aiResponse');
    
    if (!input.value.trim()) return;

    responseBox.innerHTML = "جاري البحث في رفوف المكتبة... ⏳";
    
    try {
        // المفتاح الخاص بك الذي استخرجته من Google AI Studio
        const apiKey = "AIzaSyD7hYs_9VJv7wAM4_e5sAXayeZUjj9LwhE"; 
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `أنت مساعد خبير في الروايات والأدب فقط. أجب باختصار على سؤال محمد: ${input.value}` }] }]
            })
        });

        const data = await response.json();
        
        // التحقق من وصول الرد
        if (data.candidates && data.candidates[0].content) {
            responseBox.innerHTML = data.candidates[0].content.parts[0].text;
            input.value = ""; 
        } else {
            responseBox.innerHTML = "عذراً يا محمد، واجهت مشكلة في فهم السؤال. حاول مرة أخرى.";
            console.log("API Error Details:", data); 
        }
    } catch (error) {
        responseBox.innerHTML = "فشل الاتصال بجوجل. تأكد من الإنترنت يا محمد.";
    }
}

// 4. فتح القارئ
function openReader(title, url) {
    document.getElementById('readerTitle').innerText = title;
    document.getElementById('bookFrame').src = url;
    showSec('readerMode');
}
