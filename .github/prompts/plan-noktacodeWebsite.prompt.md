---
name: plan-noktacodeWebsite
description: Noktacode Yazılım Firması için koyu temalı, iki dilli, tek sayfalık modern bir web sitesi oluşturma planı.
---
## Plan: Noktacode Yazılım Firması Web Sitesi

Noktacode için koyu temalı, iki dilli (TR/EN), tek sayfalık (SPA-style) modern bir yazılım firması web sitesi oluşturulacak. HTML + Tailwind CSS (CDN) + vanilla JavaScript kullanılacak. Site GitHub Pages üzerinden yayınlanacak.

**Steps**

1. **Proje yapısını oluştur** — Aşağıdaki dosya/klasör yapısı kurulacak:
   - `index.html` — Ana HTML dosyası (tüm bölümler tek sayfada)
   - `css/style.css` — Özel stiller ve animasyonlar
   - `js/main.js` — Dil değiştirme, scroll animasyonları, mobil menü, form işlemleri
   - `js/translations.js` — TR/EN çeviri verileri (JSON objesi)
   - `assets/` — Favicon ve görseller için klasör
   - `README.md` — Proje açıklaması

2. **index.html — Koyu temalı ana sayfa** — Tailwind CSS CDN ile, aşağıdaki bölümler sırasıyla:
   - **Navbar:** Noktacode logosu (metin), navigasyon linkleri (Hizmetler, Hakkımızda, Projeler, İletişim), dil değiştirme butonu (TR/EN toggle), mobil hamburger menü
   - **Hero Section:** Büyük başlık ("Dijital Dünyada Fark Yaratıyoruz" / "Making a Difference in the Digital World"), kısa açıklama, CTA butonu (İletişime Geç), arka planda gradient + animasyonlu dot/grid pattern
   - **Hizmetler:** 4-6 kart grid (Web Geliştirme, Mobil Uygulama, UI/UX Tasarım, Bulut Çözümleri, API Entegrasyonu, Danışmanlık). Her kart ikon + başlık + açıklama içerecek
   - **Hakkımızda:** Firma hakkında metin, sayılarla başarılar (proje sayısı, müşteri sayısı, yıl tecrübe — count-up animasyonlu)
   - **Projeler / Portfolyo:** 4-6 proje kartı, hover efektleri ile teknoloji etiketleri gösterecek
   - **İletişim:** İletişim formu (ad, e-posta, mesaj) + firma bilgileri (e-posta, telefon, adres placeholders)
   - **Footer:** Copyright, sosyal medya ikonları, hızlı linkler

3. **css/style.css — Özel stiller** — Tailwind'in kapsamadığı özel animasyonlar:
   - Scroll-triggered fade-in / slide-up animasyonları
   - Hero gradient animasyonu (renk geçişi hareketli)
   - Kart hover efektleri (glow border, scale)
   - Smooth scroll davranışı
   - Custom scrollbar (koyu tema uyumlu)

4. **js/translations.js — Çeviri sistemi** — Tüm metin içeriklerinin TR ve EN karşılıklarını barındıran obje. `data-i18n` attribute'ları ile HTML elementlerine bağlanacak.

5. **js/main.js — İnteraktivite** —
   - **Dil değiştirme:** `localStorage` ile tercih kaydı, sayfa yüklendiğinde otomatik uygulama
   - **Mobil hamburger menü:** Açma/kapama toggle
   - **Scroll animasyonları:** Intersection Observer API ile elementler görünüme girdiğinde animasyon tetikleme
   - **Sayaç animasyonu:** Hakkımızda bölümündeki sayılar count-up efekti ile artacak
   - **Navbar scroll efekti:** Aşağı kaydırınca navbar arka planı koyulaşacak
   - **İletişim formu:** Basit validasyon (gerçek backend olmadığı için teşekkür mesajı gösterecek)

6. **Renk paleti ve tasarım detayları:**
   - Arka plan: `#0a0a0a` → `#1a1a2e` gradient tonları
   - Accent renk: Mavi-mor tonları (`#6366f1` indigo / `#8b5cf6` violet)
   - Metin: Beyaz (`#ffffff`) ve gri tonları (`#94a3b8`)
   - Kartlar: Yarı saydam arka plan (`bg-white/5`) + ince border + backdrop blur (glassmorphism)
   - Font: Inter (Google Fonts)

7. **GitHub repository oluştur ve Pages aktif et:**
   - `git init` ile repo başlat
   - GitHub'da `NoktacodeWebsite` adlı public repo oluştur (GitHub CLI veya API ile)
   - Dosyaları commit ve push et
   - GitHub Pages'i `main` branch, root (`/`) olarak aktif et
   - Sonuç URL: `https://omerkocadere.github.io/NoktacodeWebsite/`

**Verification**
- Tarayıcıda `index.html` dosyasını açarak tüm bölümlerin düzgün göründüğünü kontrol et
- TR/EN dil değiştirmenin tüm metinleri güncellediğini doğrula
- Mobil responsive kontrolü (tarayıcı dev tools ile)
- GitHub Pages URL'sinin çalıştığını kontrol et
- Lighthouse performans testi ile temel metrikleri doğrula

**Decisions**
- **Tek sayfa (SPA-style):** Çoklu HTML dosyası yerine tüm bölümler tek `index.html` içinde — GitHub Pages için en basit ve hızlı çözüm
- **Tailwind CDN:** Build araçlarına gerek kalmadan doğrudan kullanım — GitHub Pages static hosting ile uyumlu
- **Vanilla JS:** Framework bağımlılığı yok, hızlı yükleme süresi
- **Glassmorphism kart tasarımı:** Modern yazılım firması hissi için yarı saydam, blur efektli kartlar
- **Intersection Observer:** Performanslı scroll animasyonları için scroll event listener yerine tercih edildi
