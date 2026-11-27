EXPLORE ANDHRA — VS CODE PROJECT (ENHANCED EDITION)

Files:
- index.html: website structure, scroll progress indicator, dialogs, and semantic sections
- style.css: responsive botanical-editorial visual design, animations, and modal styling
- script.js: destination cards, search/district/category filters, Bojjannakonda custom image + fallback, details modal, Google Maps links, and demo vendor form
- README.txt: project notes and setup instructions

Run:
1. Extract this ZIP.
2. Open the extracted explore-andhra folder in VS Code.
3. Make sure index.html, style.css, script.js, and README.txt are in the same folder.
4. Open index.html in a browser, or use the Live Server extension in VS Code and click "Go Live".

Updates in this version:
- Fixed the missing/broken Bojjannakonda destination image URL and added an automatic illustrated SVG fallback for all destination images.
- Added a subtle top scroll-progress bar, category filter chips, refined card/dialog aesthetics, and smoother motion polish.

Notes:
- Destination and vendor content is demonstration content. Confirm facts, routes, permissions and opening status before publishing.
- Images and Google Fonts load from the internet (with local SVG fallback if offline).
- Google Maps links open a search for the selected destination. A Maps API key is not required for these links.
- The vendor form stores demo listings in the current browser using localStorage. It does not publish them to a real server.
