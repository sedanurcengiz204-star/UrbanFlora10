# 🌿 UrbanFlora - Doğa Kaşifi Mobil Uygulaması

UrbanFlora, akıllı telefon simülatörü görünümünde çalışan harika bir doğa ve bitki kaşifi uygulamasıdır. Kullanıcıların çevrelerindeki bitkileri keşfetmesini, tanımlamasını, haritaya bitki eklemesini ve diğer kaşiflerle etkileşim kurmasını sağlar. Projeniz tam olarak **Firebase (Authentication & Firestore)** ile entegre edilmiştir.

Bu kılavuz, kodlarınızı **GitHub**'a yükleme ve **Vercel** üzerinde sorunsuz bir şekilde canlıya (deploy) alma sürecinde size yardımcı olacaktır.

---

## 🚀 Adım Step: GitHub'a Yükleme

Projeyi kendi GitHub hesabınıza yüklemek için aşağıdaki adımları takip edebilirsiniz:

1. **GitHub'da Yeni Bir Repo Oluşturun:**
   - [GitHub](https://github.com/) adresine gidin, giriş yapın ve sağ üstteki `+` butonuna basarak **New repository** (Yeni Depo) seçeneğini seçin.
   - Deponuza bir isim verin (Örn: `urbanflora`) ve **Private** veya **Public** olarak belirleyin. Diğer hiçbir ayarı (README, .gitignore vb.) işaretlemeden oluşturun.

2. **Bilgisayarınızda Terminali Açın ve Kodları Gönderin:**
   - Projenizin bulunduğunu dizinde terminalinizi açın ve sırasıyla şu komutları çalıştırın:
     ```bash
     git init
     git add .
     git commit -m "feat: urbanflora production ready setup"
     git branch -M main
     git remote add origin https://github.com/KULLANICI_ADINIZ/REPA_ADINIZ.git
     git push -u origin main
     ```

---

## ⚡ Adım Step: Vercel'e Dağıtım (Deploy)

Uygulamanızı Vercel üzerinde yayınlamak oldukça basittir, çünkü altyapımız **Vite** ile tam uyumlu hazırlanmıştır:

1. **Vercel Hesabınıza Giriş Yapın:**
   - [Vercel](https://vercel.com/) adresine gidin ve GitHub hesabınızla giriş yapın.

2. **Yeni Proje Ekleyin:**
   - Sağ üstteki **Add New...** > **Project** düğmesine tıklayın.
   - Listeden GitHub deposunu seçin ve **Import** butonuna tıklayın.

3. **Gelişmiş Yapılandırma ve Çevre Değişkenleri (Environment Variables):**
   - Vercel, çerçeve olarak **Vite**'ı otomatik algılayacaktır.
   - `.env.example` dosyasında belirtilen Firebase parametrelerini korumak için, deponuzdaki `firebase-applet-config.json` dosyasını aynen yükleyebilirsiniz (çünkü Firebase web anahtarları istemci tabanlıdır ve halka açıktır).
   - **Alternatif Güvenli Yöntem (Opsiyonel):** Eğer bunları Vercel panelinden girmek isterseniz, Proje Ayarları (Project Settings) > **Environment Variables** bölümüne gidip aşağıdaki değişkenleri ekleyebilirsiniz:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_FIREBASE_FIRESTORE_DATABASE_ID`

4. **Dağıtımı Başlatın:**
   - **Deploy** düğmesine basın. Vercel uygulamanızı saniyeler içinde derleyecek ve size canlı bir URL verecektir!

---

## 🛠️ Yerel Çalıştırma Kılavuzu

Projeyi yerel bilgisayarınızda çalıştırmak isterseniz:

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
3. Uygulamanız tarayıcıda `http://localhost:3000` adresinde çalışacaktır.

---

## 🔐 Güvenlik ve Kurallar (Firestore Rules)
Uygulama ile birlikte gelen `firestore.rules` dosyası güvenlik kurallarını içerir. Bu kurallar Firebase projenize otomatik deploy edilmiştir. Harita ve profil kayıtları tamamen bu kurallarla korunmaktadır.
