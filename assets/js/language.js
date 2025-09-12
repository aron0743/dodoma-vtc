// // lang-loader.js
// (function () {
//   'use strict';

//   // Helper: page name (index for directory / or filename without extension)
//   function getPageName() {
//     const path = window.location.pathname;
//     if (path.endsWith('/')) return 'index';
//     const file = path.split('/').pop();
//     return file ? file.split('.')[0] : 'index';
//   }

//   // Helper: fetch JSON safely, return null on failure
//   async function fetchJson(url) {
//     try {
//       const r = await fetch(url);
//       if (!r.ok) return null;
//       return await r.json();
//     } catch (e) {
//       return null;
//     }
//   }

//   // Apply translations map to DOM elements with data-translate or data-i18n
//   function applyTranslations(map) {
//     if (!map) return;
//     // data-translate
//     document.querySelectorAll('[data-translate]').forEach(el => {
//       const key = el.getAttribute('data-translate');
//       if (!key) return;
//       if (Object.prototype.hasOwnProperty.call(map, key)) {
//         el.textContent = map[key];
//       }
//     });
//     // optional support for data-i18n if you used it somewhere
//     document.querySelectorAll('[data-i18n]').forEach(el => {
//       const key = el.getAttribute('data-i18n');
//       if (!key) return;
//       if (Object.prototype.hasOwnProperty.call(map, key)) {
//         el.textContent = map[key];
//       }
//     });
//   }

//   // Main runner
//   async function init() {
//     // read preferred language (fallback to 'en')
//     const preferred = localStorage.getItem('preferredLanguage') === 'sw' ? 'sw' : 'en';
//     // allow override from ?lang=sw or ?lang=en if present (optional convenience)
//     const urlParam = new URLSearchParams(window.location.search).get('lang');
//     const lang = (urlParam === 'sw' || urlParam === 'en') ? urlParam : preferred;

//     // compute translation file URL
//     // DEFAULT: use absolute path from server root (recommended)
//     const page = getPageName();
//     const fileUrl = `/assets/translations/${page}.json`; // adjust if your translations live elsewhere

//     const all = await fetchJson(fileUrl);
//     if (!all) {
//       // nothing to apply — silently return (no errors)
//       // console.debug && console.debug(`[lang-loader] no translation file at ${fileUrl}`);
//       return;
//     }

//     const translations = all[lang] || null;
//     if (!translations) return;

//     applyTranslations(translations);

//     // set toggle state if exists (no error if missing)
//     const toggle = document.getElementById('languageToggle');
//     if (toggle) {
//       toggle.checked = (lang === 'sw');
//       // Do NOT attach listeners — this script only applies saved language.
//       // If you want toggling behavior, keep your existing code on pages that include the full main.js.
//     }
//   }

//   // Run after DOM is ready to ensure elements exist
//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', init);
//   } else {
//     init();
//   }
// })();
