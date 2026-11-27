const fallbackSvg = (title, tag) => {
  const safeTitle = String(title || "Explore Andhra").replace(/[<>&"]/g, "");
  const safeTag = String(tag || "Andhra Pradesh").replace(/[<>&"]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#c8dcc4"/>
        <stop offset="60%" stop-color="#e8efe1"/>
        <stop offset="100%" stop-color="#2a4f38"/>
      </linearGradient>
    </defs>
    <rect width="900" height="560" fill="url(#sky)"/>
    <path d="M0 370 Q210 250 440 350 T900 310 L900 560 L0 560 Z" fill="#4f7a52"/>
    <path d="M0 430 Q280 330 560 420 T900 385 L900 560 L0 560 Z" fill="#234730"/>
    <path d="M0 490 Q340 420 680 480 T900 455 L900 560 L0 560 Z" fill="#12291c"/>
    <text x="56" y="88" fill="#10251f" font-family="sans-serif" font-size="16" font-weight="700" letter-spacing="4">${safeTag.toUpperCase()}</text>
    <text x="56" y="470" fill="#fffefa" font-family="Georgia,serif" font-size="46" font-weight="700">${safeTitle}</text>
  </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
};

const destinations = [
  {
    name: "Bojjannakonda",
    district: "Anakapalli",
    category: "Ancient heritage",
    tag: "History & heritage",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=88",
    description: "Explore a remarkable Buddhist heritage site known for its rock-cut caves, stupas and historic remains. It offers a glimpse into the region's rich past.",
    bestTime: "October to February; visit during daylight hours.",
    tip: "Check local access and site conditions before travelling. Wear comfortable footwear.",
    map: "Bojjannakonda, Anakapalli, Andhra Pradesh"
  },
  {
    name: "Kothapalli Waterfalls",
    district: "Alluri Sitharama Raju",
    category: "Nature escape",
    tag: "Waterfall",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=900&q=85",
    description: "A scenic waterfall surrounded by lush greenery in the Eastern Ghats. The journey itself can be part of the experience for nature lovers.",
    bestTime: "After the monsoon, subject to safe access and weather.",
    tip: "Water levels and road conditions can change. Avoid entering strong currents and confirm access locally.",
    map: "Kothapalli Waterfalls, Andhra Pradesh"
  },
  {
    name: "Maredumilli",
    district: "East Godavari",
    category: "Forest & eco-tourism",
    tag: "Forest retreat",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
    description: "A forest region celebrated for green landscapes, streams and community-linked eco-tourism experiences.",
    bestTime: "October to February; check rainfall and road conditions.",
    tip: "Respect forest rules, avoid littering and use authorised local guides where required.",
    map: "Maredumilli, Andhra Pradesh"
  },
  {
    name: "Kondakarla Ava",
    district: "Anakapalli",
    category: "Wetland & birdlife",
    tag: "Lake & birdlife",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=85",
    description: "A peaceful freshwater lake and wetland landscape that can offer a quiet nature experience and opportunities to observe birdlife.",
    bestTime: "Early mornings in cooler months are often pleasant for nature observation.",
    tip: "Keep a respectful distance from birds and wildlife. Confirm boating availability and safety locally.",
    map: "Kondakarla Ava, Anakapalli, Andhra Pradesh"
  },
  {
    name: "Bhairavakona",
    district: "Prakasam",
    category: "Caves & waterfalls",
    tag: "Heritage & nature",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=85",
    description: "A destination associated with ancient cave temples and a natural setting in the Nallamala region.",
    bestTime: "October to February; check seasonal access before visiting.",
    tip: "Plan the route in advance and follow local guidance around the hills and temple area.",
    map: "Bhairavakona, Prakasam, Andhra Pradesh"
  }
];

const sampleVendors = [
  {name:"Village Kitchen",category:"Food",product:"Traditional regional meals",location:"Anakapalli",destination:"Bojjannakonda",icon:"🍲"},
  {name:"Forest Flavours",category:"Food",product:"Local snacks and forest produce",location:"Maredumilli",destination:"Maredumilli",icon:"🌿"},
  {name:"Craft Corner",category:"Handicrafts",product:"Handmade souvenirs and crafts",location:"Anakapalli",destination:"Kondakarla Ava",icon:"🧺"},
  {name:"Nature Trails",category:"Local experiences",product:"Guided nature walk concept",location:"ASR District",destination:"Kothapalli Waterfalls",icon:"🥾"},
  {name:"Heritage Bites",category:"Food",product:"Traditional snacks",location:"Prakasam",destination:"Bhairavakona",icon:"🥭"},
  {name:"Artisan Studio",category:"Handicrafts",product:"Locally inspired handmade products",location:"Anakapalli",destination:"Bojjannakonda",icon:"🏺"}
];

const $ = id => document.getElementById(id);
let activeCategory = "all";
let vendors = [...sampleVendors];

try {
  const saved = JSON.parse(localStorage.getItem("exploreAndhraVendors") || "[]");
  if (Array.isArray(saved)) vendors = [...vendors, ...saved];
} catch {}

function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function renderDestinations(){
  const query = $("searchInput").value.trim().toLowerCase();
  const district = $("districtFilter").value;
  const list = destinations.filter(d => {
    const matchesDistrict = district === "all" || d.district === district;
    const matchesCategory = activeCategory === "all" || d.category === activeCategory;
    const matchesQuery = [d.name, d.district, d.category, d.tag, d.description].join(" ").toLowerCase().includes(query);
    return matchesDistrict && matchesCategory && matchesQuery;
  });

  $("destinationGrid").innerHTML = list.map(d => {
    const num = "0" + (destinations.indexOf(d) + 1);
    const fb = escapeHTML(fallbackSvg(d.name, d.tag));
    return `
      <article class="destination-card" tabindex="0" role="button" aria-label="View ${escapeHTML(d.name)} details" data-place="${escapeHTML(d.name)}">
        <div class="card-image-wrap">
          <img class="card-image" src="${escapeHTML(d.image)}" alt="${escapeHTML(d.name)}" loading="lazy" onerror="this.onerror=null;this.src='${fb}';">
          <span class="card-tag">${escapeHTML(d.tag)}</span>
          <span class="card-number">${num}</span>
        </div>
        <div class="card-body">
          <span class="card-location">⌖ ${escapeHTML(d.district)} district</span>
          <h3>${escapeHTML(d.name)}</h3>
          <p>${escapeHTML(d.description)}</p>
          <div class="card-bottom"><span>Explore destination</span><strong>↗</strong></div>
        </div>
      </article>`;
  }).join("");

  $("emptyState").hidden = list.length !== 0;
}

function renderVendors(){
  const query = $("vendorSearch").value.trim().toLowerCase();
  const category = $("vendorCategory").value;
  const list = vendors.filter(v => {
    const matchesCategory = category === "all" || v.category === category;
    const matchesQuery = [v.name, v.category, v.product, v.location, v.destination].join(" ").toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  $("vendorGrid").innerHTML = list.map(v => `
    <article class="vendor-card">
      <div class="vendor-icon">${escapeHTML(v.icon || "✦")}</div>
      <div class="vendor-info">
        <span class="vendor-category">${escapeHTML(v.category)}</span>
        <h3>${escapeHTML(v.name)}</h3>
        <p>${escapeHTML(v.product)}</p>
        <span class="vendor-location">⌖ ${escapeHTML(v.location)} · ${escapeHTML(v.destination)}</span>
      </div>
    </article>`).join("");

  $("vendorEmptyState").hidden = list.length !== 0;
}

function openPlace(name){
  const d = destinations.find(item => item.name === name);
  if (!d) return;
  const img = $("dialogImage");
  img.onerror = () => {
    img.onerror = null;
    img.src = fallbackSvg(d.name, d.tag);
  };
  img.src = d.image;
  img.alt = d.name;

  $("dialogTitle").textContent = d.name;
  $("dialogDistrict").textContent = `${d.district} district · ${d.category}`;
  $("dialogDescription").textContent = d.description;
  $("dialogBestTime").textContent = d.bestTime;
  $("dialogTip").textContent = d.tip;

  const related = vendors.filter(v => v.destination === d.name);
  $("destinationVendorList").innerHTML = related.length
    ? related.map(v => `<div class="nearby-vendor-item"><strong>${escapeHTML(v.name)}</strong> · ${escapeHTML(v.product)}</div>`).join("")
    : '<p class="vendor-hint">No demo vendors are linked to this destination yet.</p>';

  $("mapLink").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.map)}`;
  $("placeDialog").showModal();
}

$("searchInput").addEventListener("input", renderDestinations);
$("districtFilter").addEventListener("change", renderDestinations);

$("categoryChips").addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  activeCategory = btn.dataset.category || "all";
  $("categoryChips").querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === btn));
  renderDestinations();
});

$("resetDestinationFilters").addEventListener("click", () => {
  $("searchInput").value = "";
  $("districtFilter").value = "all";
  activeCategory = "all";
  $("categoryChips").querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.category === "all"));
  renderDestinations();
});

$("vendorSearch").addEventListener("input", renderVendors);
$("vendorCategory").addEventListener("change", renderVendors);

$("destinationGrid").addEventListener("click", e => {
  const card = e.target.closest("[data-place]");
  if (card) openPlace(card.dataset.place);
});
$("destinationGrid").addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-place]")) {
    e.preventDefault();
    openPlace(e.target.dataset.place);
  }
});

$("closeDialog").addEventListener("click", () => $("placeDialog").close());
$("placeDialog").addEventListener("click", e => {
  if (e.target === $("placeDialog")) $("placeDialog").close();
});

$("vendorButton").addEventListener("click", () => {
  $("vendorMessage").textContent = "";
  $("vendorDialog").showModal();
});
$("closeVendorDialog").addEventListener("click", () => $("vendorDialog").close());
$("vendorDialog").addEventListener("click", e => {
  if (e.target === $("vendorDialog")) $("vendorDialog").close();
});

$("vendorForm").addEventListener("submit", e => {
  e.preventDefault();
  const cat = $("businessCategory").value;
  const item = {
    name: $("businessName").value.trim(),
    category: cat,
    location: $("businessLocation").value.trim(),
    product: $("businessProduct").value.trim(),
    destination: $("businessDestination").value,
    icon: cat === "Food" ? "🍲" : cat === "Handicrafts" ? "🧺" : "🌿"
  };
  vendors.push(item);
  try {
    const saved = JSON.parse(localStorage.getItem("exploreAndhraVendors") || "[]");
    saved.push(item);
    localStorage.setItem("exploreAndhraVendors", JSON.stringify(saved));
  } catch {}
  renderVendors();
  $("vendorMessage").textContent = "Your demo listing has been saved in this browser.";
  $("vendorForm").reset();
});

$("menuToggle").addEventListener("click", () => {
  const nav = $("mainNav");
  const open = nav.classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(open));
  $("menuToggle").textContent = open ? "×" : "☰";
});
$("mainNav").querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  $("mainNav").classList.remove("open");
  $("menuToggle").setAttribute("aria-expanded", "false");
  $("menuToggle").textContent = "☰";
}));

window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  $("scrollProgress").style.width = `${pct}%`;
  document.querySelector(".navbar")?.classList.toggle("scrolled", doc.scrollTop > 12);
}, { passive: true });

renderDestinations();
renderVendors();
