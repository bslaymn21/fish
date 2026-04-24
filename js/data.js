// Global Menu Data for Matamku
const menuItems = [
    {
        id: 1,
        name: "Mediterranean Sea Bream",
        name_ar: "سمك دنيس مشوي",
        category: "Starters",
        price: 180,
        description: "Freshly caught sea bream, herb-infused, with a crisp golden skin.",
        description_ar: "سمك دنيس طازج، متبل بالأعشاب، مع جلد ذهبي مقرمش.",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
        isPopular: true,
        timesOrdered: 124
    },
    {
        id: 2,
        name: "Seared Scallops",
        name_ar: "اسكالوب مشوح",
        category: "Starters",
        price: 120,
        description: "Pea puree, pancetta crisp, herb oil.",
        description_ar: "بيوريه البازلاء، بانسيتو مقرمشة، زيت أعشاب.",
        image: "https://images.unsplash.com/photo-1533622597524-a1215e26c0a2?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Seared Salmon Steak",
        name_ar: "ستيك سلمون مشوي",
        category: "Main Course",
        price: 350,
        description: "Premium salmon fillet seared to perfection with lemon butter glaze.",
        description_ar: "فيليه سلمون فاخر مشوي بدقة مع صوص الليمون والزبدة.",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974&auto=format&fit=crop",
        isPopular: true,
        timesOrdered: 89
    },
    {
        id: 4,
        name: "Grilled Sea Bass",
        name_ar: "سمك قاروص مشوي",
        category: "Main Course",
        price: 450,
        description: "Whole roasted sea bass with aromatic Mediterranean spices and lemon.",
        description_ar: "سمك قاروص كامل مشوي بتوابل البحر الأبيض المتوسط العطرية والليمون.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
        isSpecial: true,
        timesOrdered: 156
    },
    {
        id: 5,
        name: "Wild Atlantic Salmon",
        name_ar: "سلمون الأطلسي البري",
        category: "Main Course",
        price: 320,
        description: "Asparagus, baby potatoes, dill butter.",
        description_ar: "هليون، بطاطس صغيرة، زبدة الشبت.",
        image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "The Matamkom Grand Platter",
        name_ar: "طبق مطعمكم الكبير",
        category: "Platters",
        price: 1250,
        description: "A magnificent assembly of Maine lobster, King crab legs, jumbo prawns, and premium oysters.",
        description_ar: "تجميعة رائعة من استجواب مين، أرجل كابوريا الملك، جمبري جامبو، ومحار فاخر.",
        image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=2070&auto=format&fit=crop",
        isSpecial: true
    }
];

// Helper to get data correctly (with proactive image patching for broken links)
function getMenuData() {
    const saved = localStorage.getItem('matamku_menu');
    let items = saved ? JSON.parse(saved) : [...menuItems];
    
    // Proactive Patching: Fix broken/stale images for specific IDs
    items.forEach(item => {
        if (item.id === 2 && (item.image.includes('lh3') || item.image.length < 10)) {
            item.image = "https://images.unsplash.com/photo-1533622597524-a1215e26c0a2?q=80&w=2070&auto=format&fit=crop";
        }
        if (item.id === 5 && item.image.includes('lh3')) {
            item.image = "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop";
        }
        if (item.id === 6 && item.image.includes('lh3')) {
            item.image = "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=2070&auto=format&fit=crop";
        }
    });

    return items;
}

// Force update for broken images/stale data
(function() {
    let saved = localStorage.getItem('matamku_menu');
    if (saved) {
        let items = JSON.parse(saved);
        let updated = false;
        items.forEach(item => {
            // Check for broken scallop image
            if (item.id === 2 && (item.image.includes('lh3.googleusercontent.com') || item.image === '')) {
                item.image = "https://images.unsplash.com/photo-1544024838-8314115e5108?q=80&w=2070&auto=format&fit=crop";
                updated = true;
            }
            // Update other images if needed
            if (item.id === 5 && item.image.includes('lh3.googleusercontent.com')) {
                item.image = "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=2070&auto=format&fit=crop";
                updated = true;
            }
            if (item.id === 6 && item.image.includes('lh3.googleusercontent.com')) {
                item.image = "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=2070&auto=format&fit=crop";
                updated = true;
            }
        });
        if (updated) {
            localStorage.setItem('matamku_menu', JSON.stringify(items));
        }
    }
})();

// Initial Visitor Count Simulator
if (!localStorage.getItem('matamku_visitors')) {
    localStorage.setItem('matamku_visitors', Math.floor(Math.random() * 1000) + 500);
}

const siteStats = {
    getVisitors: () => parseInt(localStorage.getItem('matamku_visitors')),
    incrementVisitors: () => {
        let count = parseInt(localStorage.getItem('matamku_visitors'));
        localStorage.setItem('matamku_visitors', count + 1);
        return count + 1;
    }
};

// Global Site Settings// Demo Interceptor & Notification
document.addEventListener('DOMContentLoaded', () => {
    // Inject Demo Modal CSS
    const style = document.createElement('style');
    style.textContent = `
        .demo-modal-backdrop {
            position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
            display: flex; align-items: center; justify-content: center; z-index: 9999;
            opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .demo-modal-backdrop.active { opacity: 1; pointer-events: auto; }
        .demo-modal {
            background: white; width: 90%; max-width: 400px; padding: 40px; border-radius: 32px;
            text-align: center; transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .dark .demo-modal { background: #0f172a; color: white; border: 1px solid rgba(255,255,255,0.1); }
        .demo-modal-backdrop.active .demo-modal { transform: scale(1); }
        .demo-modal-icon { width: 64px; height: 64px; background: #25d366; color: white; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px; }
        .demo-btn { width: 100%; padding: 16px; border-radius: 16px; font-weight: bold; margin-top: 12px; cursor: pointer; transition: all 0.2s; }
        .demo-btn-primary { background: #25d366; color: white; border: none; }
        .demo-btn-secondary { background: transparent; border: 1px solid #ddd; color: #666; }
        .dark .demo-btn-secondary { border-color: rgba(255,255,255,0.1); color: #aaa; }
    `;
    document.head.appendChild(style);

    // Inject Modal HTML
    const modalHtml = `
        <div id="demo-modal-backdrop" class="demo-modal-backdrop flex justify-center items-center">
            <div class="demo-modal relative">
                <div class="demo-modal-icon">
                    <span class="material-symbols-outlined" style="font-size: 32px; font-variation-settings: 'FILL' 1;">chat</span>
                </div>
                <h3 class="text-2xl font-bold mb-4 font-h1">مرحباً بك!</h3>
                <p class="text-sm opacity-60 mb-8 leading-relaxed">
                    هذا الموقع هو مجرد <span class="font-bold text-secondary">نسخة عرض (Preview)</span> من تصميمنا.
                    <br/><br/>
                    هل تريد موقعاً احترافياً مشابهاً لهذا لمشروعك الخاص؟
                </p>
                <button onclick="window.open('https://wa.me/201234567890?text=I want a website like Matamkom', '_blank')" class="demo-btn demo-btn-primary">نعم، أريد موقعاً مثل هذا!</button>
                <button onclick="closeDemoModal()" class="demo-btn demo-btn-secondary">أنا فقط أتصفح العرض</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Global Listener
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && (link.href.includes('wa.me') || link.href.includes('whatsapp.com/send'))) {
            // Check if it's our own business link, if not, intercept
            if (!link.href.includes('text=I%20want%20a%20website%20like%20Matamkom')) {
                e.preventDefault();
                openDemoModal();
            }
        }
    });
});

function openDemoModal() {
    document.getElementById('demo-modal-backdrop').classList.add('active');
}

function closeDemoModal() {
    document.getElementById('demo-modal-backdrop').classList.remove('active');
}

function getSiteSettings() {
    const defaultSettings = {
        whatsapp: "201012345678",
        address_en: "123 Coastal Road, Alexandria, Egypt",
        address_ar: "١٢٣ طريق الساحل، الإسكندرية، مصر",
        hours_en: "Daily: 12:00 PM - 12:00 AM",
        hours_ar: "يومياً: ١٢ ظهراً - ١٢ منتصف الليل"
    };
    const saved = JSON.parse(localStorage.getItem('matamkom_settings') || '{}');
    return { ...defaultSettings, ...saved };
}

function getWhatsAppNumber() {
    return getSiteSettings().whatsapp;
}

function getWhatsAppLink(message = "") {
    const num = getWhatsAppNumber();
    return `https://wa.me/${num}${message ? '?text=' + encodeURIComponent(message) : ''}`;
}

function openWhatsApp(message = "") {
    openDemoModal();
}
