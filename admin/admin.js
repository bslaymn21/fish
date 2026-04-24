// Admin Dashboard Logic for Matamkom - Premium SaaS Edition - DEMO MODE (No Login Required)

let currentData = getMenuData();
let performanceChart = null;
let statsMainChart = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initial Setup
    updateStats();
    loadDashboardTables();
    renderMenuGrid();
    loadSettings();
    
    // Sidebar active state fix
    const currentTab = localStorage.getItem('admin_active_tab') || 'dashboard';
    switchTab(currentTab);

    // Form listener
    const itemForm = document.getElementById('item-form');
    if (itemForm) itemForm.addEventListener('submit', handleFormSubmit);

    // Force Arabic for Admin Dashboard Demo
    localStorage.setItem('preferred_language', 'ar');
    applyLanguage('ar');

    // Init Chart
    initChart();
});

// Sidebar & Mobile Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) {
        const isHidden = sidebar.classList.contains('translate-x-full');
        if (isHidden) {
            sidebar.classList.remove('translate-x-full');
            if (overlay) {
                overlay.classList.remove('hidden');
                setTimeout(() => overlay.classList.add('opacity-100'), 10);
            }
        } else {
            sidebar.classList.add('translate-x-full');
            if (overlay) {
                overlay.classList.remove('opacity-100');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            }
        }
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && !sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.add('translate-x-full');
        if (overlay) {
            overlay.classList.remove('opacity-100');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    }
}

// Notifications Toggle
function toggleNotifications() {
    const dropdown = document.getElementById('notif-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

// Tab Switching (Premium Edition)
function switchTab(tabName) {
    localStorage.setItem('admin_active_tab', tabName);
    
    // UI: Buttons State
    document.querySelectorAll('.sidebar-item').forEach(btn => {
        btn.classList.remove('active', 'bg-secondary', 'text-white', 'shadow-lg');
        btn.classList.add('text-white/60', 'hover:text-white', 'hover:bg-white/5');
    });
    const clickedBtn = document.getElementById(`tab-${tabName}`);
    if (clickedBtn) {
        clickedBtn.classList.add('active');
        clickedBtn.classList.remove('text-white/60', 'hover:text-white', 'hover:bg-white/5');
    }

    // UI: Content Sections
    const tabs = ['dashboard', 'menu', 'reservations', 'orders', 'settings', 'stats', 'qrcode'];
    tabs.forEach(t => {
        const el = document.getElementById(`content-${t}`);
        if(el) el.classList.add('hidden');
    });
    
    const targetContent = document.getElementById(`content-${tabName}`);
    if(targetContent) {
        targetContent.classList.remove('hidden');
    }

    // Dynamic Header
    const titleKeys = { 
        dashboard: "لوحة التحكم", 
        orders: "الطلبات الحالية",
        reservations: "سجل الحجوزات",
        menu: "إدارة المنيو",
        qrcode: "كود المنيو الذكي",
        settings: "إعدادات النظام",
        stats: "الرسوم البيانية"
    };
    
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.innerText = titleKeys[tabName] || tabName;

    // Trigger Tab Specific Actions
    if (tabName === 'dashboard' || tabName === 'stats') {
        setTimeout(initChart, 100);
    }
    if (tabName === 'qrcode') {
        generateQRCode();
    }

    // Auto-close sidebar on mobile
    if (window.innerWidth < 1024) {
        closeSidebar();
    }
}

// Stats & Mock Realism
function updateStats() {
    // We use mock numbers for the "Premium Look" as requested, 
    // but try to sum real data if it exists.
    const bookings = JSON.parse(localStorage.getItem('matamkom_reservations_logs') || '[]');
    const orders = JSON.parse(localStorage.getItem('matamkom_orders_logs') || '[]');
    
    const displayOrders = Math.max(24, orders.length);
    const displayRes = Math.max(12, bookings.length);
    const displayRevenue = 3450 + orders.reduce((s, o) => s + (o.total || 0), 0);

    // Only update if elements exist (e.g. on dashboard tab)
    const elements = {
        'stat-visitors': siteStats.getVisitors().toLocaleString(),
        'stat-items': currentData.length,
        'stat-orders-main': displayOrders,
        'stat-res-main': displayRes,
        'stat-rev-main': displayRevenue.toLocaleString() + " جم"
    };

    Object.entries(elements).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if(el) el.innerText = val;
    });
}

// Load Tables Logic
function loadDashboardTables() {
    renderOrders();
    renderReservations();
}

function getStatusBadge(status) {
    const configs = {
        pending: { bg: 'bg-amber-100', text: 'text-amber-600', label: 'قيد الانتظار' },
        preparing: { bg: 'bg-primary/10', text: 'text-primary dark:text-abyss-primary', label: 'جار التحضير' },
        completed: { bg: 'bg-green-100', text: 'text-green-600', label: 'اكتمل' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-600', label: 'ملغي' },
        confirmed: { bg: 'bg-secondary/10', text: 'text-secondary dark:text-abyss-secondary', label: 'مؤكد' }
    };
    const c = configs[status] || configs.pending;
    return `<span class="status-badge ${c.bg} ${c.text} text-[9px]">${c.label}</span>`;
}

function renderOrders() {
    const logs = JSON.parse(localStorage.getItem('matamkom_orders_logs') || '[]');
    const tbody = document.getElementById('orders-table-body');
    if (!tbody) return;

    // For Demo: If empty, we could show hardcoded ones or empty state. 
    // User wants "WOW" factor, so we keep the hardcoded ones if storage is empty.
    if (logs.length === 0) return; 

    // Prepend real logs to the hardcoded list (or replace)
    const newHtml = logs.reverse().map(log => `
        <tr class="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
            <td class="px-8 py-5"><span class="font-black text-secondary">#${log.id.toString().slice(-4)}</span></td>
            <td class="px-8 py-5"><span class="font-bold">${log.userName || 'زبون خارجي'}</span></td>
            <td class="px-8 py-5"><span class="text-xs">${log.items.map(i => `${i.quantity}x ${i.name}`).join('، ')}</span></td>
            <td class="px-8 py-5 font-black">${log.total} جم</td>
            <td class="px-8 py-5">${getStatusBadge(log.status || 'pending')}</td>
            <td class="px-8 py-5 text-left">
                <div class="flex justify-end gap-2">
                    <button onclick="updateLogStatus('ord', '${log.id}', 'preparing')" class="text-[10px] font-black bg-primary dark:bg-abyss-primary dark:text-abyss-on-primary px-3 py-1.5 rounded-lg">تأكيد</button>
                    <button onclick="deleteLog('ord', '${log.id}')" class="text-[10px] font-black bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg text-slate-400"><span class="material-symbols-outlined text-xs">delete</span></button>
                </div>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = newHtml + tbody.innerHTML; 

    // Render Mobile Cards
    const mobileList = document.getElementById('orders-mobile-list');
    if (mobileList) {
        mobileList.innerHTML = logs.map(log => `
            <div class="p-4 space-y-3">
                <div class="flex justify-between items-center">
                    <span class="font-black text-secondary">#${log.id.toString().slice(-4)}</span>
                    ${getStatusBadge(log.status || 'pending')}
                </div>
                <div>
                    <p class="font-bold text-sm">${log.userName || 'زبون خارجي'}</p>
                    <p class="text-[11px] text-slate-400 truncate">${log.items.map(i => `${i.quantity}x ${i.name}`).join('، ')}</p>
                </div>
                <div class="flex justify-between items-center pt-2">
                    <span class="font-black text-sm">${log.total} جم</span>
                    <div class="flex gap-2">
                        <button onclick="updateLogStatus('ord', '${log.id}', 'preparing')" class="text-[10px] font-black bg-primary text-white px-3 py-2 rounded-lg">تأكيد</button>
                        <button onclick="deleteLog('ord', '${log.id}')" class="p-2 bg-slate-100 dark:bg-white/10 rounded-lg text-slate-400"><span class="material-symbols-outlined text-xs">delete</span></button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function renderReservations() {
    const logs = JSON.parse(localStorage.getItem('matamkom_reservations_logs') || '[]');
    const tbody = document.getElementById('res-table-body');
    if (!tbody) return;

    if (logs.length === 0) return;

    const newHtml = logs.reverse().map(log => `
        <tr class="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
            <td class="px-8 py-5 font-bold">${log.name}</td>
            <td class="px-8 py-5 font-mono text-xs">${log.phone}</td>
            <td class="px-8 py-5 font-black text-secondary">${log.guests} أفراد</td>
            <td class="px-8 py-5 text-xs font-bold text-slate-500">${log.dateTime}</td>
            <td class="px-8 py-5">${getStatusBadge(log.status || 'pending')}</td>
            <td class="px-8 py-5 text-left">
                <div class="flex justify-end gap-2">
                    <button onclick="updateLogStatus('res', '${log.id}', 'confirmed')" class="text-[10px] font-black bg-primary dark:bg-abyss-primary dark:text-abyss-on-primary px-3 py-1.5 rounded-lg">تأكيد</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = newHtml + tbody.innerHTML;

    // Render Mobile Cards
    const mobileList = document.getElementById('res-mobile-list');
    if (mobileList) {
        mobileList.innerHTML = logs.map(log => `
            <div class="p-4 space-y-3">
                <div class="flex justify-between items-center">
                    <p class="font-bold text-sm">${log.name}</p>
                    ${getStatusBadge(log.status || 'pending')}
                </div>
                <div class="flex justify-between text-[11px] text-slate-400">
                    <span>${log.phone}</span>
                    <span class="font-black text-secondary">${log.guests} أفراد</span>
                </div>
                <div class="flex justify-between items-center pt-2">
                    <span class="text-[10px] font-bold text-slate-500">${log.dateTime}</span>
                    <button onclick="updateLogStatus('res', '${log.id}', 'confirmed')" class="text-[10px] font-black bg-primary text-white px-4 py-2 rounded-lg">تأكيد الحجز</button>
                </div>
            </div>
        `).join('');
    }
}

function updateLogStatus(type, id, newStatus) {
    const key = type === 'res' ? 'matamkom_reservations_logs' : 'matamkom_orders_logs';
    let logs = JSON.parse(localStorage.getItem(key) || '[]');
    logs = logs.map(l => l.id == id ? { ...l, status: newStatus } : l);
    localStorage.setItem(key, JSON.stringify(logs));
    window.location.reload(); // Simple refresh to show new state in premium table
}

function deleteLog(type, id) {
    if(!confirm('هل أنت متأكد من الحذف؟')) return;
    const key = type === 'res' ? 'matamkom_reservations_logs' : 'matamkom_orders_logs';
    let logs = JSON.parse(localStorage.getItem(key) || '[]');
    logs = logs.filter(l => l.id != id);
    localStorage.setItem(key, JSON.stringify(logs));
    window.location.reload();
}

// Render Menu Cards (Modern Grid)
function renderMenuGrid(filter = "") {
    const grid = document.getElementById('menu-grid');
    if(!grid) return;
    grid.innerHTML = '';

    let data = currentData;
    if (filter) {
        data = data.filter(item => 
            item.name.toLowerCase().includes(filter.toLowerCase()) || 
            item.name_ar.includes(filter)
        );
    }

    if (data.length === 0) {
        showEmptyState(grid, "لا توجد وجبات في المنيو حالياً");
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = "premium-card overflow-hidden group animate-in";
        card.innerHTML = `
            <div class="aspect-video relative overflow-hidden">
                <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="${item.name_ar}">
                <div class="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg text-secondary dark:text-abyss-secondary">${item.category}</div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="text-lg font-black italic">${item.name_ar}</h4>
                    <span class="text-secondary dark:text-abyss-secondary font-black text-lg">${item.price}جم</span>
                </div>
                <p class="text-[11px] text-slate-400 mb-6 leading-relaxed line-clamp-2">${item.description_ar || 'وصف الوجبة غير متوفر حالياً.'}</p>
                <div class="flex gap-2">
                    <button onclick="editItem(${item.id})" class="flex-grow py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-xs font-black hover:bg-secondary hover:text-white transition-all text-slate-600">تعديل</button>
                    <button onclick="deleteItem(${item.id})" class="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                        <span class="material-symbols-outlined text-lg font-bold">delete</span>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function showEmptyState(container, message) {
    const template = document.getElementById('empty-state-template');
    if (!template) return;
    const clone = template.content.cloneNode(true);
    clone.querySelector('h3').innerText = message;
    container.appendChild(clone);
}

// Chart Logic (Enhanced Palette)
function initChart() {
    const isDark = document.documentElement.classList.contains('dark');
    const primaryColor = isDark ? '#b1c8e9' : '#001e40';
    const secondaryColor = isDark ? '#ffb59c' : '#a43c12';

    // 1. Dashboard Chart
    const dashCanvas = document.getElementById('performanceChart');
    if (dashCanvas) {
        if (performanceChart) performanceChart.destroy();
        const ctx = dashCanvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, primaryColor + '33');
        gradient.addColorStop(1, primaryColor + '00');

        performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                datasets: [{
                    label: 'المبيعات',
                    data: [18, 25, 15, 30, 22, 45, 60],
                    borderColor: primaryColor,
                    borderWidth: 4,
                    pointBackgroundColor: primaryColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    fill: true,
                    backgroundColor: gradient,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { display: false, beginAtZero: true },
                    x: { grid: { display: false }, ticks: { font: { family: 'Noto Kufi Arabic', size: 10 } } }
                }
            }
        });
    }

    // 2. Stats Page Main Chart
    const statsCanvas = document.getElementById('statsMainChart');
    if (statsCanvas) {
        if (statsMainChart) statsMainChart.destroy();
        const ctx = statsCanvas.getContext('2d');
        
        statsMainChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
                datasets: [
                    {
                        label: 'المبيعات',
                        data: [4200, 3800, 5100, 6200],
                        backgroundColor: primaryColor,
                        borderRadius: 12,
                    },
                    {
                        label: 'الحجوزات',
                        data: [2100, 1900, 2800, 3100],
                        backgroundColor: secondaryColor + '88',
                        borderRadius: 12,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        position: 'bottom',
                        labels: { font: { family: 'Noto Kufi Arabic', size: 11 }, usePointStyle: true }
                    } 
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                        ticks: { font: { family: 'Work Sans', size: 10 } }
                    },
                    x: { 
                        grid: { display: false },
                        ticks: { font: { family: 'Noto Kufi Arabic', size: 10 } }
                    }
                }
            }
        });
    }
}

// Standard CRUD & Logic...
function loadSettings() {
    const settings = getSiteSettings();
    const whatsapp = document.getElementById('setting-whatsapp');
    const address = document.getElementById('setting-address_ar');
    if(whatsapp) whatsapp.value = settings.whatsapp || '';
    if(address) address.value = settings.address_ar || '';
}

function saveSettings(e) {
    e.preventDefault();
    const settings = getSiteSettings();
    settings.whatsapp = document.getElementById('setting-whatsapp').value;
    settings.address_ar = document.getElementById('setting-address_ar').value;
    localStorage.setItem('matamkom_settings', JSON.stringify(settings));
    alert('تم حفظ الإعدادات بنجاح!');
}

function generateQRCode() {
    const container = document.getElementById('qrcode-container');
    if (!container) return;
    container.innerHTML = "";
    new QRCode(container, {
        text: "https://matamkom.site/menu",
        width: 256, height: 256,
        colorDark : "#0f172a", colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function downloadQRCode() {
    const qrImage = document.querySelector('#qrcode-container img');
    if (!qrImage) return;
    const link = document.createElement('a');
    link.download = 'matamkom-qr.png';
    link.href = qrImage.src;
    link.click();
}

function openModal() { document.getElementById('item-modal').classList.remove('hidden'); }
function closeModal() { document.getElementById('item-modal').classList.add('hidden'); }

function handleFormSubmit(e) {
    e.preventDefault();
    alert('هذا عرض تجريبي (Demo). لم يتم تغيير البيانات الفعلية.');
    closeModal();
}
function deleteItem(id) {
    if(confirm('هل أنت متأكد من حذف هذه الوجبة؟')) {
        currentData = currentData.filter(i => i.id !== id);
        renderMenuGrid();
    }
}
function editItem(id) {
    const item = currentData.find(i => i.id === id);
    if (!item) return;

    document.getElementById('modal-title').innerText = 'تعديل الوجبة';
    document.getElementById('item-id').value = item.id;
    document.getElementById('item-name-ar').value = item.name_ar || '';
    document.getElementById('item-name-en').value = item.name || '';
    document.getElementById('item-category').value = item.category || 'أسماك';
    document.getElementById('item-price').value = item.price || 0;
    document.getElementById('item-image').value = item.image || '';
    document.getElementById('item-desc-ar').value = item.description_ar || '';

    openModal();
}
