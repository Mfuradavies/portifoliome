# Portfolio

A modern, responsive portfolio website built with Vue 3 and Vite. Showcase your projects, skills, and services with this sleek and professional single-page application.

## 🌟 Features

- **Responsive Design** - Fully mobile-friendly layout that works on all devices
- **Component-Based Architecture** - Modular Vue components for easy customization
- **Fast Performance** - Built with Vite for lightning-fast development and production builds
- **Multiple Sections** - Hero, About, Services, Portfolio, Timeline, Newsletter, and Footer sections
- **Navigation** - Smooth navigation between sections with composable utilities
- **Modern Tooling** - Vue 3 with the Composition API and latest development practices

## 📋 Project Structure

```
src/
├── components/          # Vue components
│   ├── About.vue       # About section
│   ├── Footer.vue      # Footer
│   ├── Header.vue      # Navigation header
│   ├── Hero.vue        # Hero/landing section
│   ├── Newsletter.vue   # Newsletter subscription
│   ├── Portfolio.vue    # Portfolio/projects showcase
│   ├── Services.vue     # Services section
│   └── Timeline.vue     # Timeline/experience
├── composables/        # Reusable logic
│   └── useNavigation.js # Navigation utilities
├── assets/             # Static assets
│   └── styles.css      # Global styles
├── App.vue            # Root component
└── main.js            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project:**

    ```sh
    cd portifolio
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Start development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`

## 🔧 Development

### Running the Development Server

```sh
npm run dev
```

Hot Module Replacement (HMR) is enabled, so changes will reflect immediately in the browser.

### Build for Production

```sh
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```sh
npm run preview
```

## 🛠️ Development Tools

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue (Official) Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
    - Disable Vetur if you have it installed for better Vue 3 support

### Browser DevTools

- **Chrome/Edge/Brave:**
    - [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
    - Enable Custom Object Formatter in DevTools

- **Firefox:**
    - [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## 📚 Technology Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend build tool
- **CSS3** - Modern styling and responsive design
- **JavaScript (ES6+)** - Modern JavaScript features

## 🎨 Customization

### Styling

Global styles are located in `src/assets/styles.css`. Customize colors, fonts, and layouts to match your brand.

### Components

Each component in `src/components/` can be customized independently:

- Edit component templates and logic
- Add new components as needed
- Use the composables for shared functionality

### Configuration

For advanced Vite configuration, see [Vite Configuration Reference](https://vitejs.dev/config/).

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your portfolio!

---

**Happy coding!** 🎉
