# NexVolt Automation LLP — Website

**We Automate. You Elevate.**

Official website for [NexVolt Automation LLP](https://www.nexvoltautomation.com) — Industrial Automation, Energy Management Systems, SCADA Integration and Electrical Engineering Solutions based in Kolkata, India.

---

## 📁 Project Structure

```
nexvolt-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (responsive, animations, variables)
├── js/
│   └── main.js         # Interactivity (nav, scroll, counter, form)
├── assets/
│   ├── nexvolt-logo.png    # Full logo (NexVolt Automation + tagline)
│   └── nexvolt-logo1.png   # Icon logo (NexVolt text mark)
└── README.md
```

---

## 🚀 Features

- **Responsive design** — works on mobile, tablet and desktop
- **Sticky header** with active nav link highlighting
- **Animated hero** section with background image
- **Stats band** with animated counters
- **Service cards** with hover effects and scroll-reveal
- **Contact form** with validation and toast notifications
- **Smooth scroll** and section-based navigation
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation
- **Reduced motion** support for accessibility

---

## 🛠 Tech Stack

- Pure HTML5, CSS3, vanilla JavaScript — **no frameworks, no dependencies**
- [Montserrat](https://fonts.google.com/specimen/Montserrat) font via Google Fonts
- Hero image via [Unsplash](https://unsplash.com)

---

## 📦 Getting Started

### Option 1 — Open directly
Just open `index.html` in your browser. No build step needed.

### Option 2 — Local server (recommended)
```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```
Then visit `http://localhost:8080`

---

## 🌐 Deployment

Deploy to any static host:

| Platform | Steps |
|----------|-------|
| **GitHub Pages** | Push to `main` branch → Settings → Pages → Deploy from branch |
| **Netlify** | Drag & drop the project folder at [netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel` in the project directory |
| **cPanel / FTP** | Upload all files to `public_html/` |

---

## ✉️ Contact Form Integration

The form currently shows a simulated response. To connect it to a real backend:

### Option A — Formspree (easiest, free)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option B — EmailJS
```javascript
// In js/main.js, replace the setTimeout simulation with:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  from_name: name,
  from_email: email,
  subject: subject,
  message: message,
});
```

### Option C — Custom backend
Send a `fetch` POST request to your own API endpoint.

---

## 🎨 Customisation

All colors and spacing are controlled via CSS variables in `css/style.css`:

```css
:root {
  --orange:       #ff6b00;   /* Brand accent */
  --orange-light: #ff9a44;
  --orange-dark:  #e05500;
  --dark:         #111827;   /* Dark backgrounds */
  --light:        #f4f6f9;   /* Light section bg */
  --max-width:    1200px;    /* Layout container width */
}
```

---

## 📞 Contact

**NexVolt Automation LLP**  
📧 mursalin@nexvoltautomation.com  
🌐 www.nexvoltautomation.com  
📍 28/A Rafi Ahmed Kidwai Road, 2nd Floor, Kolkata – 700016

---

© 2026 NexVolt Automation LLP. All rights reserved.
