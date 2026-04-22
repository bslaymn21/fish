// Admin Dashboard Logic for Matamku

let currentData = getMenuData();

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    renderMenuTable();
    
    // Add form listener
    document.getElementById('item-form').addEventListener('submit', handleFormSubmit);
    
    // Initial language apply
    const currentLang = localStorage.getItem('preferred_language') || 'en';
    applyLanguage(currentLang);
});

// Tab Switching
function switchTab(tabName) {
    const currentLang = localStorage.getItem('preferred_language') || 'en';
    
    // Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('hover:bg-slate-800');
    });
    document.getElementById(`tab-${tabName}`).classList.add('bg-primary', 'text-white');
    document.getElementById(`tab-${tabName}`).classList.remove('hover:bg-slate-800');

    // Content
    document.getElementById('content-dashboard').classList.add('hidden');
    document.getElementById('content-menu').classList.add('hidden');
    document.getElementById('content-stats').classList.add('hidden');
    document.getElementById(`content-${tabName}`).classList.remove('hidden');

    // Title (Bilingual)
    const titles = { 
        dashboard: translations[currentLang].admin_tab_dashboard, 
        menu: translations[currentLang].admin_manage_title, 
        stats: translations[currentLang].admin_tab_stats 
    };
    document.getElementById('page-title').innerText = titles[tabName];
}

// Stats Update
function updateStats() {
    document.getElementById('stat-visitors').innerText = siteStats.getVisitors().toLocaleString();
    document.getElementById('stat-items').innerText = currentData.length;
}

// Render Menu Table
function renderMenuTable() {
    const tbody = document.getElementById('inventory-table-body');
    const currentLang = localStorage.getItem('preferred_language') || 'en';
    tbody.innerHTML = '';

    currentData.forEach(item => {
        const name = currentLang === 'ar' ? item.name_ar : item.name;
        const tr = document.createElement('tr');
        tr.className = 'border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors';
        tr.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <img src="${item.image}" class="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/10">
                    <div class="text-sm font-bold text-primary dark:text-white">${name}</div>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">${item.category}</span>
            </td>
            <td class="px-6 py-4">
                <span class="font-bold text-primary dark:text-abyss-primary">$${item.price.toFixed(2)}</span>
            </td>
            <td class="px-4 py-4 text-right">
                <button onclick="editItem(${item.id})" class="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-abyss-primary transition-colors">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button onclick="deleteItem(${item.id})" class="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Modal Logic
function openModal(isEdit = false) {
    document.getElementById('item-modal').classList.remove('hidden');
    document.getElementById('item-modal').classList.add('flex');
    if(!isEdit) {
        document.getElementById('modal-title').innerText = 'Add Menu Item';
        document.getElementById('item-form').reset();
        document.getElementById('item-id').value = '';
    }
}

function closeModal() {
    document.getElementById('item-modal').classList.add('hidden');
    document.getElementById('item-modal').classList.remove('flex');
}

// CRUD Operations
function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('item-id').value;
    const itemData = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('item-name-en').value,
        name_ar: document.getElementById('item-name-ar').value,
        category: document.getElementById('item-category').value,
        price: parseFloat(document.getElementById('item-price').value),
        description: document.getElementById('item-desc-en').value,
        description_ar: document.getElementById('item-desc-ar').value,
        image: document.getElementById('item-image').value || 'https://via.placeholder.com/400x300?text=Food+Image'
    };

    if (id) {
        currentData = currentData.map(item => item.id === parseInt(id) ? itemData : item);
    } else {
        currentData.push(itemData);
    }

    saveAndRefresh();
    closeModal();
}

function editItem(id) {
    const item = currentData.find(i => i.id === id);
    if (!item) return;

    document.getElementById('modal-title').innerText = 'Edit Menu Item';
    document.getElementById('item-id').value = item.id;
    document.getElementById('item-name-en').value = item.name;
    document.getElementById('item-name-ar').value = item.name_ar || '';
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-desc-en').value = item.description;
    document.getElementById('item-desc-ar').value = item.description_ar || '';
    document.getElementById('item-image').value = item.image;

    openModal(true);
}

function deleteItem(id) {
    const currentLang = localStorage.getItem('preferred_language') || 'en';
    const msg = currentLang === 'ar' ? 'هل أنت متأكد أنك تريد حذف هذا الصنف؟' : 'Are you sure you want to remove this item?';
    if (confirm(msg)) {
        currentData = currentData.filter(item => item.id !== id);
        saveAndRefresh();
    }
}

function saveAndRefresh() {
    localStorage.setItem('matamku_menu', JSON.stringify(currentData));
    renderMenuTable();
    updateStats();
}

// Export Feature
document.getElementById('export-btn').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 4));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "matamku_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    const currentLang = localStorage.getItem('preferred_language') || 'en';
    const msg = currentLang === 'ar' ? 'تم تصدير ملف البيانات بنجاح!' : 'Site data exported successfully!';
    alert(msg);
});
