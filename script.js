// دالة التنقل بين الأقسام - تم تعديلها لضمان فصل الصفحات تماماً
function showSec(sectionId) {
    const sections = ['homeUI', 'librarySection', 'aiSection', 'quotesSection', 'readerMode'];
    sections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) sec.style.display = 'none';
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        window.scrollTo(0, 0);
    }
}

// دالة مساعد شين الذكي - مربوطة بالمفتاح الخاص بك
async function askShinAI() {
    const input = document.getElementById('aiInput').value;
    const responseBox = document.getElementById('aiResponse');
    
    if (!input) return;

    responseBox.innerHTML = "جاري البحث في أروقة المكتبة... ⏳";
    
    try {
        const apiKey = "AIzaSyD7hYs_9VJv7wAM4_e5sAXayeZUjj9LwhE"; 
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `أنت مساعد ذكي خبير في الروايات والأدب فقط اسمك "مساعد شين". وظيفتك ترشيح روايات لمحمد والإجابة على أسئلته الأدبية باحترافية وبلهجة مصرية خفيفة. سؤاله هو: ${input}` }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            responseBox.innerHTML = aiText;
        } else {
            responseBox.innerHTML = "عذراً يا محمد، لم أستطع صياغة رد حالياً. حاول مرة أخرى.";
        }
    } catch (error) {
        responseBox.innerHTML = "حدث خطأ في الاتصال، تأكد من الإنترنت يا محمد.";
        console.error(error);
    }
}

// دالة فتح القارئ
function openReader(title, url) {
    document.getElementById('readerTitle').innerText = title;
    document.getElementById('bookFrame').src = url;
    showSec('readerMode');
}

// إخفاء الـ Loader بعد التحميل
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1500);
};
