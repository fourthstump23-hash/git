# 🍽️ Saffron Table - Modern Restaurant Website

Welcome to your modern, responsive restaurant website project! This project has been crafted from scratch using **clean, beginner-friendly HTML5, CSS3, and JavaScript** without any complicated tools or heavy external frameworks.

---

## 🚀 How to Run the Website

Because this is a pure HTML, CSS, and JavaScript project, you do **not** need to install Node.js, Python, or any web server to test it.

1. Locate the folder `rest web` on your computer.
2. Double-click **`index.html`** (or right-click and choose **Open With > Google Chrome / Microsoft Edge / Firefox**).
3. The website will open instantly in your browser!

*(Optional: If you are using VS Code, you can also install the **Live Server** extension and click "Go Live" at the bottom right).*

---

## 📁 What Each File Does

### 1. `index.html` (The Skeleton & Content)
- **What it is**: The main webpage file that contains the text, structure, images, forms, and layout tags.
- **Key Sections included**:
  - `<header class="header">`: Sticky navigation bar, logo, and mobile hamburger button.
  - `<section class="hero">`: Large welcome banner with restaurant name ("Saffron Table"), tagline, call-to-action buttons ("Explore Menu", "Reserve a Table"), and key statistics.
  - `<section class="about">`: Background story, chef philosophy, and 3 feature highlight cards.
  - `<section class="menu">`: Interactive menu with category tabs (All, Starters, Mains, Desserts, Beverages) and dish cards with descriptions and prices.
  - `<section class="gallery">`: Photo showcase grid of delicious dishes and restaurant ambiance.
  - `<section class="reviews">`: Customer testimonials with 5-star ratings and reviewer avatars.
  - `<section class="reservation">`: Booking form (Name, Email, Phone, Guests, Date, Time, Special Notes) and a Contact info panel with address, phone, email, and opening hours.
  - `<footer class="footer">`: Footer with quick links, social media links, operating hours, and copyright notice.

### 2. `style.css` (The Visual Design & Responsiveness)
- **What it is**: The stylesheet that controls colors, fonts, spacing, layout, shadows, and animations.
- **Key Features**:
  - **CSS Variables (`:root`)**: Easily change the brand colors (saffron gold, dark slate, ivory, text colors) in one place.
  - **Flexbox & CSS Grid**: Modern layout techniques that align cards, menus, and forms cleanly.
  - **Mobile Responsive Media Queries**:
    - Desktop: Multi-column layouts, floating highlight badges, and side-by-side reservation form & contact panel.
    - Tablet (`max-width: 992px`): Stacks into 2-column or 1-column layouts naturally.
    - Mobile (`max-width: 768px` & `480px`): Collapses the navigation into an animated hamburger dropdown, sizes images for mobile screens, and ensures comfortable finger-friendly touch targets.

### 3. `script.js` (The Interactivity)
- **What it is**: The JavaScript file that adds dynamic features without reloading the page.
- **What it does**:
  1. **Mobile Hamburger Menu**: Toggles the mobile navigation drawer open and closed with icon animation (`bars` to `xmark`).
  2. **Sticky Header & Scroll Effect**: Adds a shadow and frosted-glass background when scrolling down.
  3. **ScrollSpy (Active Navigation Link)**: Automatically highlights the navigation link matching whichever section is currently visible on screen.
  4. **Interactive Menu Filter**: Clicking a tab (e.g., "Starters", "Mains", "Desserts") filters the dishes instantly.
  5. **Reservation Form Handler**: Intercepts form submission (`preventDefault()`), validates the inputs, locks minimum date to today, and displays an elegant confirmation banner with the guest's name, party size, date, and time.

---

## 🎨 How to Customize the Website

### Changing Brand Colors
Open **`style.css`** and find lines 14-22:
```css
:root {
  --primary: #c98a2c;             /* Change Saffron Gold to any color you like */
  --primary-hover: #ad741e;       /* Hover shade */
  --dark-bg: #11151b;             /* Main dark background */
  --light-bg: #fcfbf9;            /* Page background */
}
```

### Adding or Editing Menu Items
In **`index.html`**, scroll to the `<div class="menu-grid">` section. Each dish is an `<article>` like this:
```html
<article class="menu-card" data-category="starters">
  <div class="menu-card-img">
    <img src="YOUR_IMAGE_URL" alt="Dish Name">
    <span class="dish-tag">Tag</span>
  </div>
  <div class="menu-card-body">
    <div class="menu-card-header">
      <h3 class="dish-title">Dish Name</h3>
      <span class="dish-price">&#8377;750</span>
    </div>
    <p class="dish-desc">Your delicious description here.</p>
  </div>
</article>
```
*Note: Make sure `data-category` matches one of your tabs (`starters`, `mains`, `desserts`, `beverages`).*

### Changing Address, Phone & Hours
In **`index.html`**, search for `id="contact"` and update the text inside the `contact-list` elements with your actual restaurant location, phone number, email, and opening hours.

---

## 💡 Beginner Tips
- **Inspect Element**: In your browser, press `F12` or right-click any element and choose **Inspect**. This lets you test CSS changes live in your browser before saving them!
- **Free Images**: The photos in this template are loaded from Unsplash. You can replace the URLs with your own image files (e.g., `<img src="images/my-dish.jpg">`).
- **Free Icons**: Icons come from FontAwesome CDN (e.g., `<i class="fa-solid fa-star"></i>`). You can find thousands more icons on [fontawesome.com](https://fontawesome.com).
