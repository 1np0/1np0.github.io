# Sistem Inventory Simple

Sistem inventory yang sederhana dan mobile-friendly, dibuat berdasarkan contoh desain yang Anda berikan.

## 🎯 Fitur Utama

### 🏠 Dashboard
- **Grid 2x2** dengan menu cards yang mudah diakses
- **Icons** yang jelas untuk setiap fungsi
- **Touch-friendly** dengan area yang besar untuk jari

### 📦 Items Management
- **Daftar Items** dengan layout vertikal yang clean
- **Search** untuk mencari items
- **Filter chips** untuk filtering cepat (Semua, Tersedia, Stok Rendah)
- **Card design** dengan avatar, info, dan stok status

### ➕ Add Item
- **Form sederhana** dengan 3 section: Informasi Dasar, Stok & Harga, Pengaturan
- **Auto-generate code** berdasarkan nama item
- **Bottom save button** yang sticky dan mudah diakses
- **Validation** untuk field wajib

### 💰 Sales & Reports
- **Dashboard penjualan** dengan summary cards
- **Laporan** dengan berbagai pilihan laporan

## 📱 Mobile-First Design

### Design Principles
- **Single column layout** untuk form dan list
- **Bottom navigation** yang mudah diakses dengan jempol
- **Touch targets** minimum 44px untuk semua elemen interaktif
- **Generous spacing** untuk menghindari accidental taps

### Color Scheme
- **Primary**: Green (#4CAF50) untuk aksi utama
- **Background**: Light gray (#f5f5f5) untuk kontras
- **Cards**: White dengan shadow halus
- **Text**: Dark gray untuk readability

### Typography
- **System fonts** untuk performa optimal
- **Hierarchical sizing** untuk konten yang jelas
- **Bold weights** untuk emphasis

## 🛠️ Teknologi

- **HTML5** dengan semantic markup
- **CSS3** dengan Grid dan Flexbox
- **Vanilla JavaScript** (no frameworks)
- **LocalStorage** untuk data persistence

## 📂 Struktur File

```
├── simple.html              # Main HTML file
├── styles/
│   └── simple.css          # All styles in one file
├── js/
│   └── simple-app.js       # All JavaScript logic
└── simple-README.md        # Documentation
```

## 🚀 Cara Penggunaan

### 1. Dashboard
- Buka `simple.html` di browser
- Anda akan melihat dashboard dengan 4 menu cards
- Tap menu untuk navigasi ke section yang diinginkan

### 2. Items List
- Tap "Items" di dashboard atau bottom nav
- Search items dengan mengetik di search box
- Tap filter chips untuk filtering
- Tap item card untuk edit

### 3. Add Item
- Tap "Tambah Item" di dashboard, items view, atau bottom nav
- Isi form dengan informasi item
- Auto-generate code akan muncul saat nama diisi
- Tap "SIMPAN" di bottom untuk save

### 4. Navigation
- **Back buttons** di header untuk kembali
- **Bottom nav** untuk quick access ke main sections
- **Current view** akan highlighted di bottom nav

## 📝 Data Management

### Sample Data
Sistem include sample data:
- Kopi Arabika (stok: 25)
- Teh Tarik (stok: 5 - rendah)
- Nasi Ayam (stok: 0 - habis)

### Data Persistence
- Data tersimpan di **LocalStorage** browser
- Data akan persist antar session
- Reset browser akan menghapus data

### Stock Status
- **Tersedia** (hijau): Stok > minimal
- **Rendah** (orange): Stok <= minimal tapi > 0
- **Habis** (merah): Stok = 0

## 🎨 Customization

### Colors
Ubah color scheme di `simple.css`:
```css
:root {
  --primary-color: #4CAF50;
  --background-color: #f5f5f5;
  --card-background: white;
}
```

### Icons
Ganti emoji icons dengan:
- Custom SVG icons
- Icon fonts (FontAwesome, etc.)
- Image assets

### Layout
Modifikasi grid layout:
```css
.menu-grid {
  grid-template-columns: 1fr 1fr; /* 2 columns */
}

.bottom-nav {
  grid-template-columns: 1fr 1fr 1fr 1fr; /* 4 items */
}
```

## 📱 Browser Support

- **Chrome** 60+
- **Safari** 12+
- **Firefox** 60+
- **Edge** 79+

## 🔧 Development

### Local Setup
1. Download semua file
2. Buka `simple.html` di browser
3. Sistem siap digunakan

### Adding Features
1. **New View**: Tambah section di HTML, tambah CSS, tambah function di JS
2. **New Fields**: Tambah di form HTML, update validation di JS
3. **New Actions**: Tambah buttons, update event handlers

### Data Structure
```javascript
{
  id: 1,
  name: "Item Name",
  code: "ITM001",
  category: "makanan",
  stock: 10,
  unit: "pcs",
  cost: 5000,
  price: 8000,
  description: "Description",
  minStock: 5,
  createdAt: "2025-12-18T10:43:54.000Z"
}
```

## 📞 Features yang Bisa Ditambah

- **Barcode scanner** integration
- **Image upload** untuk items
- **Category management**
- **Supplier management**
- **Sales transaction**
- **Advanced reporting**
- **Export/Import** data
- **Multi-user** support

## 🎯 Why Simple?

Berdasarkan analisis gambar contoh Anda, desain simple ini fokus pada:
- **Speed**: Navigasi cepat tanpa clutter
- **Clarity**: Informasi penting mudah ditemukan
- **Touch-friendly**: Semua elemen mudah di-tap
- **Efficiency**: Workflow yang streamlined
- **Reliability**: Stabil dan mudah digunakan

---

**Dibuat dengan ❤️ untuk mobile-first experience**