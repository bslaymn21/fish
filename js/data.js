const defaultMenuItems = [
  { id: 1, name: "Mediterranean Sea Bream", name_ar: "سمك دنيس مشوي", category: "مقبلات", price: 180, description: "Freshly caught sea bream, herb-infused, with a crisp golden skin.", description_ar: "سمك دنيس طازج، متبل بالأعشاب، مع جلد ذهبي مقرمش.", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop", isPopular: true, timesOrdered: 124, sizes: [{ name: "وسط", price: 180 }, { name: "كبير", price: 250 }], methods: ["مشوي", "مقلي", "سنجاري"], showOnHome: true, isAvailable: true },
  { id: 2, name: "Seared Scallops", name_ar: "اسكالوب مشوح", category: "مقبلات", price: 120, description: "Pea puree, pancetta crisp, herb oil.", description_ar: "بيوريه البازلاء، بانسيتو مقرمشة، زيت أعشاب.", image: "https://images.unsplash.com/photo-1533622597524-a1215e26c0a2?q=80&w=600&auto=format&fit=crop", timesOrdered: 87, sizes: [{ name: "وسط", price: 120 }, { name: "كبير", price: 180 }], methods: ["مشوي", "مقلي"], showOnHome: true, isAvailable: true },
  { id: 3, name: "Seared Salmon Steak", name_ar: "ستيك سلمون مشوي", category: "الوجبات الرئيسية", price: 350, description: "Premium salmon fillet seared to perfection with lemon butter glaze.", description_ar: "فيليه سلمون فاخر مشوي بدقة مع صوص الليمون والزبدة.", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop", isPopular: true, timesOrdered: 89, sizes: [{ name: "وسط", price: 350 }, { name: "كبير", price: 480 }], methods: ["مشوي", "مقلي"], showOnHome: true, isAvailable: true },
  { id: 4, name: "Grilled Sea Bass", name_ar: "سمك قاروص مشوي", category: "الوجبات الرئيسية", price: 450, description: "Whole roasted sea bass with aromatic Mediterranean spices and lemon.", description_ar: "سمك قاروص كامل مشوي بتوابل البحر الأبيض المتوسط العطرية والليمون.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop", isSpecial: true, timesOrdered: 156, sizes: [{ name: "وسط", price: 450 }, { name: "كبير", price: 600 }], methods: ["مشوي", "سنجاري", "زيت وليمون"], showOnHome: true, isAvailable: true },
  { id: 5, name: "Wild Atlantic Salmon", name_ar: "سلمون الأطلسي البري", category: "الوجبات الرئيسية", price: 320, description: "Asparagus, baby potatoes, dill butter.", description_ar: "هليون، بطاطس صغيرة، زبدة الشبت.", image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=600&auto=format&fit=crop", timesOrdered: 67, sizes: [{ name: "وسط", price: 320 }, { name: "كبير", price: 450 }], methods: ["مشوي", "مقلي"], showOnHome: false, isAvailable: true },
  { id: 6, name: "The Grand Platter", name_ar: "طبق المطعم الكبير", category: "أطباق مميزة", price: 1250, description: "A magnificent assembly of lobster, king crab legs, jumbo prawns, and premium oysters.", description_ar: "تجميعة رائعة من الاستاكوزا، أرجل الكابوريا الملك، الجمبري الجامبو، والمحار الفاخر.", image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=600&auto=format&fit=crop", isSpecial: true, timesOrdered: 34, sizes: [{ name: "كامل", price: 1250 }], methods: ["مشوي", "مقلي"], showOnHome: true, isAvailable: true },
  { id: 7, name: "Shrimp Tagine", name_ar: "طاجن جمبري", category: "الوجبات الرئيسية", price: 280, description: "Shrimp cooked in a traditional clay pot with tomatoes, garlic, and spices.", description_ar: "جمبري مطبوخ في طاجن طيني مع الطماطم والثوم والتوابل.", image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=600&auto=format&fit=crop", isPopular: true, timesOrdered: 112, sizes: [{ name: "وسط", price: 280 }, { name: "كبير", price: 380 }], methods: ["طاجن", "سنجاري"], showOnHome: true, isAvailable: true },
  { id: 8, name: "Seafood Soup", name_ar: "شوربة سيفود", category: "مقبلات", price: 95, description: "Rich creamy seafood soup with shrimp, calamari, and fish chunks.", description_ar: "شوربة سيفود كريمية غنية بالجمبري والكاليماري وقطع السمك.", image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?q=80&w=600&auto=format&fit=crop", timesOrdered: 198, sizes: [{ name: "فردي", price: 95 }, { name: "عائلي", price: 180 }], methods: ["عادي"], showOnHome: true, isAvailable: true },
  { id: 9, name: "Fried Calamari", name_ar: "كاليماري مقلي", category: "مقبلات", price: 110, description: "Crispy fried calamari rings served with garlic aioli.", description_ar: "حلقات كاليماري مقلية مقرمشة مع صوص الثوم.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop", timesOrdered: 73, sizes: [{ name: "وسط", price: 110 }, { name: "كبير", price: 170 }], methods: ["مقلي"], showOnHome: false, isAvailable: true },
  { id: 10, name: "Grilled Shrimp", name_ar: "جمبري مشوي", category: "الوجبات الرئيسية", price: 380, description: "Large shrimp marinated in lemon garlic butter.", description_ar: "جمبري جامبو متبل بزبدة الليمون والثوم.", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=600&auto=format&fit=crop", isSpecial: true, timesOrdered: 91, sizes: [{ name: "نصف كيلو", price: 380 }, { name: "كيلو", price: 700 }], methods: ["مشوي", "مقلي"], showOnHome: true, isAvailable: true },
  { id: 11, name: "Mixed Seafood Platter", name_ar: "طبق مأكولات بحرية مشكل", category: "أطباق مميزة", price: 850, description: "Mixed grilled fish, shrimp, calamari, and rice.", description_ar: "تشكيلة مشويات بحرية من سمك وجمبري وكاليماري مع رز.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop", isPopular: true, timesOrdered: 145, sizes: [{ name: "فردي", price: 850 }, { name: "لشخصين", price: 1500 }], methods: ["مشوي", "مقلي"], showOnHome: true, isAvailable: true },
  { id: 12, name: "Grilled Tilapia", name_ar: "بلطي مشوي بالردة", category: "الوجبات الرئيسية", price: 160, description: "Crispy grilled tilapia with bran coating.", description_ar: "بلطي مشوي مقرمش بالردة.", image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=600&auto=format&fit=crop", timesOrdered: 203, sizes: [{ name: "واحدة", price: 160 }, { name: "اثنتين", price: 300 }], methods: ["مشوي", "مقلي", "سنجاري"], showOnHome: true, isAvailable: true }
];

const defaultCategories = ["مقبلات", "الوجبات الرئيسية", "أطباق مميزة"];

const defaultOffers = {
  isActive: true,
  name: "عرض الصيف",
  name_en: "Summer Special",
  discountPercent: 20,
  itemIds: [1, 4, 7, 10, 12],
  description: "استمتع بخصم 20% على أشهى الأطباق",
  description_en: "Enjoy 20% off on our most popular dishes"
};

const defaultCoupons = [
  { code: "SAVE10", type: "percentage", value: 10, minOrder: 200, isActive: true, maxUses: 50, usedCount: 12 },
  { code: "WELCOME50", type: "fixed", value: 50, minOrder: 300, isActive: true, maxUses: 100, usedCount: 34 },
  { code: "FISH20", type: "percentage", value: 20, minOrder: 500, isActive: true, maxUses: 30, usedCount: 5 }
];

const defaultFeedback = [
  { id: 1, name: "أحمد محمد", rating: 5, comment: "أفضل مطعم سمك جربته! السمك طازة جداً والتتبيلة تحفة.", phone: "01001234567", showOnHome: true, date: "2026-06-28" },
  { id: 2, name: "مريم علي", rating: 5, comment: "توصيل سريع وأكل يفتح النفس. بجد تسلم إيديكم.", phone: "01007654321", showOnHome: true, date: "2026-06-27" },
  { id: 3, name: "هاني يوسف", rating: 5, comment: "طعم أصلي وخدمة ممتازة، فعلاً وجهة مثالية لعشاق السمك.", phone: "01009876543", showOnHome: true, date: "2026-06-25" },
  { id: 4, name: "نورا سامي", rating: 4, comment: "الجمبري المشوي كان رائع، هطلب تاني definitely!", phone: "01005554433", showOnHome: true, date: "2026-06-22" },
  { id: 5, name: "كريم حسن", rating: 5, comment: "الشوربة سيفود لا تقاوم، والخدمة ممتازة.", phone: "01001122334", showOnHome: false, date: "2026-06-20" }
];

const defaultSettings = {
  whatsapp: "201012345678",
  phone: "01012345678",
  address_ar: "١٢٣ طريق الساحل، الإسكندرية، مصر",
  address_en: "123 Coastal Road, Alexandria, Egypt",
  hours_ar: "يومياً: ١٢ ظهراً - ١٢ منتصف الليل",
  hours_en: "Daily: 12:00 PM - 12:00 AM",
  facebook: "https://facebook.com/matamkom",
  instagram: "https://instagram.com/matamkom",
  tiktok: "https://tiktok.com/@matamkom",
  mapLink: "https://maps.google.com/?q=Alexandria"
};

function initStorage() {
  if (!localStorage.getItem('matamku_menu')) {
    localStorage.setItem('matamku_menu', JSON.stringify(defaultMenuItems));
  }
  if (!localStorage.getItem('matamku_categories')) {
    localStorage.setItem('matamku_categories', JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem('matamku_offers')) {
    localStorage.setItem('matamku_offers', JSON.stringify(defaultOffers));
  }
  if (!localStorage.getItem('matamku_coupons')) {
    localStorage.setItem('matamku_coupons', JSON.stringify(defaultCoupons));
  }
  if (!localStorage.getItem('matamku_feedback')) {
    localStorage.setItem('matamku_feedback', JSON.stringify(defaultFeedback));
  }
  if (!localStorage.getItem('matamku_settings')) {
    localStorage.setItem('matamku_settings', JSON.stringify(defaultSettings));
  }
  if (!localStorage.getItem('matamku_visitors')) {
    localStorage.setItem('matamku_visitors', Math.floor(Math.random() * 500) + 800);
  }
  if (!localStorage.getItem('matamku_qr_scans')) {
    localStorage.setItem('matamku_qr_scans', Math.floor(Math.random() * 200) + 100);
  }
  if (!localStorage.getItem('matamku_whatsapp_conversions')) {
    localStorage.setItem('matamku_whatsapp_conversions', Math.floor(Math.random() * 100) + 50);
  }
}
initStorage();

function getMenuData() {
  const saved = localStorage.getItem('matamku_menu');
  return saved ? JSON.parse(saved) : [...defaultMenuItems];
}

function saveMenuData(items) {
  localStorage.setItem('matamku_menu', JSON.stringify(items));
}

function getCategories() {
  const saved = localStorage.getItem('matamku_categories');
  return saved ? JSON.parse(saved) : [...defaultCategories];
}

function saveCategories(cats) {
  localStorage.setItem('matamku_categories', JSON.stringify(cats));
}

function getOffers() {
  const saved = localStorage.getItem('matamku_offers');
  return saved ? JSON.parse(saved) : { ...defaultOffers };
}

function saveOffers(offer) {
  localStorage.setItem('matamku_offers', JSON.stringify(offer));
}

function getActiveOffer() {
  const offer = getOffers();
  return offer && offer.isActive ? offer : null;
}

function getCoupons() {
  const saved = localStorage.getItem('matamku_coupons');
  return saved ? JSON.parse(saved) : [...defaultCoupons];
}

function saveCoupons(coupons) {
  localStorage.setItem('matamku_coupons', JSON.stringify(coupons));
}

function validateCoupon(code, cartTotal) {
  const coupons = getCoupons();
  const coupon = coupons.find(c => c.code === code.toUpperCase() && c.isActive);
  if (!coupon) return { valid: false, message: "كود الخصم غير صالح" };
  if (coupon.usedCount >= coupon.maxUses) return { valid: false, message: "تم استخدام هذا الكود لأقصى عدد مرات" };
  if (cartTotal < coupon.minOrder) return { valid: false, message: `الحد الأدنى للطلب: ${coupon.minOrder} جم` };
  let discount = coupon.type === "percentage" ? Math.round(cartTotal * coupon.value / 100) : coupon.value;
  if (discount > cartTotal) discount = cartTotal;
  return { valid: true, discount, coupon };
}

function useCoupon(code) {
  const coupons = getCoupons();
  const idx = coupons.findIndex(c => c.code === code.toUpperCase());
  if (idx === -1) return;
  coupons[idx].usedCount += 1;
  saveCoupons(coupons);
}

function getFeedback() {
  const saved = localStorage.getItem('matamku_feedback');
  return saved ? JSON.parse(saved) : [...defaultFeedback];
}

function saveFeedback(fb) {
  localStorage.setItem('matamku_feedback', JSON.stringify(fb));
}

function getOrders() {
  const saved = localStorage.getItem('matamku_orders');
  return saved ? JSON.parse(saved) : [];
}

function saveOrders(orders) {
  localStorage.setItem('matamku_orders', JSON.stringify(orders));
}

function addOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  incrementTimesOrdered(order.items);
}

function incrementTimesOrdered(items) {
  const menu = getMenuData();
  items.forEach(item => {
    const idx = menu.findIndex(i => i.id === (item.dishId || item.id));
    if (idx !== -1) {
      menu[idx].timesOrdered = (menu[idx].timesOrdered || 0) + (item.quantity || 1);
    }
  });
  saveMenuData(menu);
}

function getBestSellers(limit = 5) {
  const items = getMenuData();
  return [...items].sort((a, b) => (b.timesOrdered || 0) - (a.timesOrdered || 0)).slice(0, limit);
}

function getWorstSellers(limit = 5) {
  const items = getMenuData();
  return [...items].sort((a, b) => (a.timesOrdered || 0) - (b.timesOrdered || 0)).slice(0, limit);
}

function getSiteSettings() {
  const saved = JSON.parse(localStorage.getItem('matamku_settings') || '{}');
  return { ...defaultSettings, ...saved };
}

function saveSiteSettings(settings) {
  localStorage.setItem('matamku_settings', JSON.stringify(settings));
}

function getWhatsAppNumber() {
  let num = getSiteSettings().whatsapp || "201012345678";
  num = num.replace(/[\s\-\+]/g, '');
  if (num.startsWith('01')) num = '2' + num;
  else if (num.startsWith('1') && num.length === 10) num = '20' + num;
  return num;
}

function getWhatsAppLink(message = "") {
  const num = getWhatsAppNumber();
  return `https://wa.me/${num}${message ? '?text=' + encodeURIComponent(message) : ''}`;
}

function openWhatsApp(message = "") {
  const url = getWhatsAppLink(message);
  window.location.href = url;
}

const siteStats = {
  getVisitors: () => parseInt(localStorage.getItem('matamku_visitors')),
  incrementVisitors: () => {
    let count = parseInt(localStorage.getItem('matamku_visitors'));
    localStorage.setItem('matamku_visitors', count + 1);
    return count + 1;
  },
  getQRScans: () => parseInt(localStorage.getItem('matamku_qr_scans')),
  getWhatsAppConversions: () => parseInt(localStorage.getItem('matamku_whatsapp_conversions')),
  incrementWhatsApp: () => {
    let count = parseInt(localStorage.getItem('matamku_whatsapp_conversions'));
    localStorage.setItem('matamku_whatsapp_conversions', count + 1);
    return count + 1;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .demo-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
    .demo-modal-backdrop.active { opacity: 1; pointer-events: auto; }
    .demo-modal { background: white; width: 90%; max-width: 400px; padding: 40px; border-radius: 32px; text-align: center; transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .dark .demo-modal { background: #0f172a; color: white; border: 1px solid rgba(255,255,255,0.1); }
    .demo-modal-backdrop.active .demo-modal { transform: scale(1); }
    .demo-modal-icon { width: 64px; height: 64px; background: #25d366; color: white; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px; }
    .demo-btn { width: 100%; padding: 16px; border-radius: 16px; font-weight: bold; margin-top: 12px; cursor: pointer; transition: all 0.2s; }
    .demo-btn-primary { background: #25d366; color: white; border: none; }
    .demo-btn-secondary { background: transparent; border: 1px solid #ddd; color: #666; }
    .dark .demo-btn-secondary { border-color: rgba(255,255,255,0.1); color: #aaa; }
  `;
  document.head.appendChild(style);

  const modalHtml = `
    <div id="demo-modal-backdrop" class="demo-modal-backdrop flex justify-center items-center">
      <div class="demo-modal relative">
        <div class="demo-modal-icon">
          <span class="material-symbols-outlined" style="font-size: 32px; font-variation-settings: 'FILL' 1;">chat</span>
        </div>
        <h3 class="text-2xl font-bold mb-4 font-h1">مرحباً بك!</h3>
        <p class="text-sm opacity-60 mb-8 leading-relaxed">
          هذا الموقع هو مجرد <span class="font-bold text-secondary">نسخة عرض (Demo)</span> من تصميمنا.
          <br/><br/>
          هل تريد موقعاً احترافياً مشابهاً لهذا لمشروعك الخاص؟
        </p>
        <button onclick="window.open('https://wa.me/201234567890?text=I want a website like Matamkom', '_blank')" class="demo-btn demo-btn-primary">نعم، أريد موقعاً مثل هذا!</button>
        <button onclick="closeDemoModal()" class="demo-btn demo-btn-secondary">أنا فقط أتصفح العرض</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && (link.href.includes('wa.me') || link.href.includes('whatsapp.com/send'))) {
      if (!link.href.includes('text=I%20want%20a%20website%20like%20Matamkom')) {
        e.preventDefault();
        openDemoModal();
      }
    }
  });
});

function openDemoModal() {
  const el = document.getElementById('demo-modal-backdrop');
  if (el) el.classList.add('active');
}

function closeDemoModal() {
  const el = document.getElementById('demo-modal-backdrop');
  if (el) el.classList.remove('active');
}
