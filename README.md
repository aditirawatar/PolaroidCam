

# 📸 Polaroid Camera Web App

A modern, interactive **Polaroid-style camera web application** that lets users capture moments, customize layouts, and download their photos as a single polished image — all in-browser.

Built with a focus on smooth UX, real-time previews, and client-side image processing.

---

## ✨ Features

### 📷 Camera Experience

* Live camera preview using the browser camera
* **4 different Polaroid frame styles** to choose from
* Built-in **photo filters** to enhance captures
* **Countdown timer** before each click for hands-free shots

### 🎨 Customization & Preview

* Dedicated **layout preview page**
* Change **layout / frame color**
* Choose **photo orientation** (vertical or horizontal)
* Add a **custom caption (name/text)**
* Add a **date stamp**
* Real-time preview updates

### ⬇️ Download

* Download the final Polaroid layout as a **PNG**
* Download happens on the same page (no navigation)
* Client-side image export using `html2canvas`
* Color-safe export (HEX mapping to avoid browser incompatibilities)

---

## 🛠️ Tech Stack

* **React + TypeScript**
* **React Router**
* **Tailwind CSS**
* **html2canvas** (for image export)
* Browser Media APIs (`getUserMedia`)

---

## 🧠 How It Works

1. User opens the camera and selects a frame
2. Applies filters and waits for the countdown
3. Captures photos
4. Navigates to the preview page
5. Customizes layout color, orientation, caption, and date
6. Downloads the final Polaroid as a PNG — instantly

All processing happens on the client. No uploads. No backend required.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Make sure your browser has camera permissions enabled.

---

## 📂 Project Highlights

* Single-page export flow (no page reloads)
* Modern UI with smooth transitions
* Safe color handling for reliable image downloads
* Clean separation of camera, preview, and export logic

---

## 📌 Future Improvements

* Multiple download sizes (Instagram, Story, Square)
* Watermark toggle
* Frame upload support
* Save layouts locally
* Share directly to social media

---

## 👩‍💻 Author

Built by **Aditi Rawat**
Focused on crafting clean UI experiences and practical full-stack projects.

---

If you want, I can also:

* tailor this README for **GitHub recruiters**
* add **screenshots section**
* write a **live demo description**
* make a **resume-ready project summary**

This project is solid portfolio material 💯
