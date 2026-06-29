## Deskripsi app & daftar fitur
Aplikasi Todo Persistent App merupakan aplikasi mobile berbasis React Native (Expo) yang digunakan untuk mencatat daftar kegiatan (To-Do List). Aplikasi ini mendukung operasi CRUD (Create, Read, Update, Delete) dengan penyimpanan data menggunakan AsyncStorage, sehingga data tetap tersimpan meskipun aplikasi ditutup atau perangkat dimatikan.

## Level 1 (Core Features)
Menambahkan todo baru (Create)
Menampilkan seluruh todo yang tersimpan (Read)
Menghapus todo (Delete)
Validasi input agar tidak kosong
Penyimpanan data menggunakan AsyncStorage
Data dimuat otomatis saat aplikasi dibuka kembali
FlatList dengan keyExtractor
Empty State ketika belum ada data
Data tetap tersimpan setelah aplikasi ditutup (Persistence)
 
 ## Level 2 (Development Features)
🌙 Dark Mode
Mengubah tampilan aplikasi menjadi mode gelap.
Status tema disimpan menggunakan AsyncStorage sehingga tetap sama saat aplikasi dibuka kembali.
✏️ Update Todo
Menandai todo selesai dengan sekali klik.
Todo yang selesai akan memiliki efek coret (line-through).
🔎 Search / Filter
Mencari todo berdasarkan teks.
Filter dilakukan secara langsung (real-time).
📊 Statistik
Menampilkan jumlah seluruh todo.
Menampilkan jumlah todo yang sudah selesai.
🗑️ Konfirmasi Hapus
Menampilkan Alert sebelum todo benar-benar dihapus.
🧹 Hapus Semua
Menghapus seluruh daftar todo sekaligus.
Data pada AsyncStorage ikut dihapus.

## Level 3 (Bonus)
📂 Kategori / Tag
Setiap todo memiliki kategori, misalnya:
Kuliah
Pribadi
Kerja

Kategori ditampilkan pada setiap item todo.

## Cara Menjalankan Project
1. Clone Repository
git clone https://github.com/USERNAME/NAMA-REPOSITORY.git
2. Masuk ke Folder Project
cd NAMA-REPOSITORY
3. Install Dependency
npm install @react-native-async-storage/async-storage
4. Jalankan Expo
npx expo start
5. Scan QR Code
Buka aplikasi Expo Go, lalu scan QR Code yang muncul pada terminal atau browser.

## Screenshot
# Halaman Utama
<img width="739" height="1600" alt="WhatsApp Image 2026-06-29 at 18 15 45" src="https://github.com/user-attachments/assets/28e57a0d-7b5d-4252-aa6c-ab7b9dabff57" />

# Fitur Dark Mode
<img width="739" height="1600" alt="WhatsApp Image 2026-06-29 at 18 15 45 (1)" src="https://github.com/user-attachments/assets/0a5c309f-d4ae-47a1-9369-48a0bdd64251" />

# Bukti Persistensi
<img width="739" height="1600" alt="WhatsApp Image 2026-06-29 at 18 15 44" src="https://github.com/user-attachments/assets/2e229da9-dc6f-4f93-a165-b154c7107703" />
<img width="739" height="1600" alt="WhatsApp Image 2026-06-29 at 18 26 45" src="https://github.com/user-attachments/assets/6317c5e9-dbe2-4d56-8605-9e754e12b556" />
