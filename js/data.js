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
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9_aWeHUeoH2HtMAUrT3Kxw1SMuE9qi7aaJi3fFqF-UR0QpLwDv9QraLVrtpXqQQ81lF7km84akgf9BaVjSthsYSv7gUDIg7KgrFnHAkrqRK2iUMMCngAnfbCjwVCk4OZJRMwp4oP4Lwl72hZcNemdLnXo-U_EZyj_mHwkvQ80ZVbDb277s7CJs61aT8AuxjUT1P-96oklY3av_e6nZBUvyH02bGgt3zS86b1reA2A6lhZ-ha1KR8LJcgHJxhAXUGhnmHCPABXgw"
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
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIXvwwdy909oqy0NmBpf6GQIXtJUeUfY2dhsiTE6Wy_9Yy7avBZnDK_zZvtj_eZZAD-gOCeLUNINyJ22p00mMsQUgITfq7vmVxo2yf72NBFE0-5nqJLNxbcvgUneN_vhgFQudsUfLFf9wlUedvDSa_dJIEd20n6WXaWKxPJyr3BNp_5aLd8ow3ph8TD2RFXhz6i6yRCvmzcOpvToSzQtPcq3mlFDUh0YDSZvcQFuj2wkpFF2iYd5kv6rAjsdmFsFvnyZIZgpt7OQ"
    },
    {
        id: 6,
        name: "The Matamkom Grand Platter",
        name_ar: "طبق مطعمكم الكبير",
        category: "Platters",
        price: 1250,
        description: "A magnificent assembly of Maine lobster, King crab legs, jumbo prawns, and premium oysters.",
        description_ar: "تجميعة رائعة من استجواب مين، أرجل كابوريا الملك، جمبري جامبو، ومحار فاخر.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj4tAENu5aotkqOHtN9weWxX8Yzyg1a6FaPq-7FTxBWMwYXw7ivYvlMADRVKsCJ9FgD6SGz1LucyNQ5xmFPXtcgwb2T6FMkPoL_pg4xkj8_DDEA6XgUTqE1e8Iyai5pDnw24lttPCOfYf8_OH_v0FmTYeVqcxOCD3vDfz1VCwtgjqwweVHMQJdlhEWn_twz4BC6RjYBZ5iW2Zxg8bnBxDs6RMAIZmiwLEZMpV67736gkFaa0EpiVgBzq9vsPxUC89K_Z0IO4Arcg",
        isSpecial: true
    }
];

// Helper to get data correctly (from localStorage if modified, otherwise default)
function getMenuData() {
    const saved = localStorage.getItem('matamku_menu');
    return saved ? JSON.parse(saved) : menuItems;
}

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
