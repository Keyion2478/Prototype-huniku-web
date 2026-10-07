/*
  HUNIKU - EDITORIAL & ARCHITECTURAL REAL ESTATE LOGIC CONTROLLER
  Fresha-Inspired Marketplace Controller
  Reactive State, Atomic Mutex Locking, 2D Masterplan Inspection,
  Mortgage Annuity Calculator, Resident Support, and Developer Admin
*/

// Initial Master Units Data (Lampung Pilot Clusters)
const DEFAULT_UNITS = [
  {
    id: "unit-1",
    code: "BLOK A-01",
    cluster: "Grand Alessandra Residence",
    region: "Sukarame, Bandar Lampung",
    type: "Tipe 45 / 90",
    price: "Rp 385.000.000",
    rawPrice: 385000000,
    lb: 45,
    lt: 90,
    rooms: "2 KT / 1 KM",
    orientation: "Hadap Timur (Matahari Pagi)",
    foundation: "Batu Belah & Beton Bertulang",
    utility: "PLN 1300 VA & Sumur Bor 32m",
    legal: "SHM & PBG Lengkap",
    status: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85",
    desc: "Rumah tunggal bernuansa tropis modern dengan plafon tinggi 3.6 meter untuk sirkulasi udara alami. Jalan perumahan aspal hotmix row 8 meter, sistem keamanan one gate system 24 jam dengan pemantauan kamera kawasan."
  },
  {
    id: "unit-2",
    code: "BLOK B-04",
    cluster: "Grand Alessandra Residence",
    region: "Sukarame, Bandar Lampung",
    type: "Tipe 36 / 78",
    price: "Rp 320.000.000",
    rawPrice: 320000000,
    lb: 36,
    lt: 78,
    rooms: "2 KT / 1 KM",
    orientation: "Hadap Utara",
    foundation: "Batu Belah & Rangka Baja Ringan",
    utility: "PLN 1300 VA & Sumur Bor Mandiri",
    legal: "SHM Pecah Per Kavling",
    status: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=85",
    desc: "Pilihan tepat untuk keluarga muda. Halaman belakang luas 3.5 meter siap untuk perluasan dapur atau taman pribadi. Akses 7 menit dari Kampus UIN Raden Intan dan Gerbang Tol Kotabaru."
  },
  {
    id: "unit-3",
    code: "BLOK B-05",
    cluster: "Sentral Garden Residence",
    region: "Natar, Lampung Selatan",
    type: "Tipe 45 / 84",
    price: "Rp 365.000.000",
    rawPrice: 365000000,
    lb: 45,
    lt: 84,
    rooms: "2 KT / 1 KM",
    orientation: "Hadap Timur (Taman Depan)",
    foundation: "Pondasi Tapak Beton Bertulang",
    utility: "PLN 1300 VA & PDAM Tirta",
    legal: "SHM Siap Balik Nama",
    status: "BOOKED",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85",
    desc: "Hunian asri tepat di depan koridor ruang terbuka hijau. Dekat dengan sarana olahraga warga dan akses langsung ke Jalan Lintas Sumatera Natar."
  },
  {
    id: "unit-4",
    code: "BLOK C-12",
    cluster: "Villa Permata Indah",
    region: "Kedaton, Bandar Lampung",
    type: "Tipe 54 / 105",
    price: "Rp 490.000.000",
    rawPrice: 490000000,
    lb: 54,
    lt: 105,
    rooms: "3 KT / 2 KM",
    orientation: "Hadap Selatan (Posisi Hook)",
    foundation: "Beton Cakar Ayam & Dinding Bata Merah",
    utility: "PLN 2200 VA & Sumur Bor",
    legal: "SHM & PBG Siap Akad",
    status: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85",
    desc: "Tipe hook sudut luas dengan 3 kamar tidur representatif untuk keluarga mapan. Dilengkapi carport 2 mobil, kusen aluminium powder coating, dan sanitair berstandar premium."
  },
  {
    id: "unit-5",
    code: "BLOK A-08",
    cluster: "Sentral Garden Residence",
    region: "Natar, Lampung Selatan",
    type: "Tipe 36 / 72",
    price: "Rp 295.000.000",
    rawPrice: 295000000,
    lb: 36,
    lt: 72,
    rooms: "2 KT / 1 KM",
    orientation: "Hadap Barat",
    foundation: "Batu Belah & Beton Bertulang",
    utility: "PLN 1300 VA & Sumur Bor",
    legal: "SHM Siap Akad",
    status: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85",
    desc: "Kavling strategis dengan skema pembiayaan kompetitif. Dilengkapi bonus kanopi carport baja ringan dan toren penampungan air kapasitas 500 liter."
  },
  {
    id: "unit-6",
    code: "BLOK C-02",
    cluster: "Villa Permata Indah",
    region: "Kedaton, Bandar Lampung",
    type: "Tipe 54 / 110",
    price: "Rp 510.000.000",
    rawPrice: 510000000,
    lb: 54,
    lt: 110,
    rooms: "3 KT / 2 KM",
    orientation: "Hadap Timur",
    foundation: "Beton Bertulang & Granit 60x60",
    utility: "PLN 2200 VA & Sumur Bor",
    legal: "SHM & PBG Lengkap",
    status: "SOLD",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=85",
    desc: "Unit premium yang telah diserahterimakan secara resmi kepada warga. Telah dilengkapi pemanas air tenaga surya dan instalasi kunci pintu pintar."
  }
];

// REACTIVE APPLICATION STATE
const state = {
  units: [...DEFAULT_UNITS],
  filterCluster: "ALL",
  filterType: "ALL",
  filterPrice: "ALL",
  currentUser: {
    role: "BUYER",
    name: "Rizky Pratama",
    email: "rizky.pratama@example.com",
    phone: "0812-7890-1234",
    unit: null,
    warrantyDays: 180
  },
  activeBookingPass: {
    code: "HN-2026-B05",
    unitCode: "BLOK B-05",
    cluster: "Sentral Garden Residence",
    buyerName: "Rizky Pratama",
    timestamp: "02 Oktober 2026, 14:30 WIB",
    status: "TERKUNCI AMAN (ANTI-DOUBLE BOOKING)"
  },
  complaints: [
    {
      id: "CMP-01",
      date: "01 Oktober 2026",
      unit: "Blok B-05 (Ratna)",
      category: "Air & Pipa",
      desc: "Pipa sambungan kran wastafel belakang rembes air.",
      status: "Teknisi Ditugaskan",
      technician: "Joko Santoso (Teknisi Rekanan)",
      warranty: "Garansi Retensi (Gratis)"
    },
    {
      id: "CMP-02",
      date: "28 September 2026",
      unit: "Blok A-03 (Budi)",
      category: "Instalasi Kelistrikan",
      desc: "MCB utama switch trip saat beban malam.",
      status: "Selesai Pengerjaan",
      technician: "Anto Wibowo",
      warranty: "Selesai (BAP Ditandatangani)"
    }
  ],
  selectedUnitForBooking: null,
  activeView: "viewKatalog",
  activeBankRate: 4.75,
  selectedComplaintCategory: "Air & Pipa"
};

// INITIALIZE APPLICATION
document.addEventListener("DOMContentLoaded", () => {
  initFromLocalStorage();
  renderCatalog();
  renderSitePlanLots();
  renderAdminTable();
  renderComplaintsTable();
  updateUserUI();
  calculateKPR();

  // Click outside listener: Close custom dropdowns
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-parent")) {
      closeAllDropdowns();
    }
  });

  // Keyboard accessibility: Close modals and dropdowns on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns();
      document.querySelectorAll(".fresha-modal-backdrop.open").forEach(modal => {
        modal.classList.remove("open");
      });
      const chatDrawer = document.getElementById("webChatDrawer");
      if (chatDrawer) chatDrawer.style.display = "none";
    }
  });
});

// CUSTOM MODERN DROPDOWN CONTROLLERS
function toggleDropdown(event, popoverId) {
  event.stopPropagation();
  const targetPopover = document.getElementById(popoverId);
  const parentSegment = targetPopover ? targetPopover.closest(".search-pod-segment") : null;
  const isAlreadyOpen = targetPopover && targetPopover.classList.contains("open");

  // Close any open popovers first
  closeAllDropdowns();

  if (!isAlreadyOpen && targetPopover && parentSegment) {
    targetPopover.classList.add("open");
    parentSegment.classList.add("active");
  }
}

function closeAllDropdowns() {
  document.querySelectorAll(".fresha-dropdown-popover.open").forEach(pop => {
    pop.classList.remove("open");
  });
  document.querySelectorAll(".search-pod-segment.active").forEach(seg => {
    seg.classList.remove("active");
  });
}

function selectDropdownOption(hiddenInputId, displayId, value, label, popoverId) {
  const hiddenInput = document.getElementById(hiddenInputId);
  const displayEl = document.getElementById(displayId);
  const popover = document.getElementById(popoverId);

  if (hiddenInput) hiddenInput.value = value;
  if (displayEl) displayEl.textContent = label;

  if (popover) {
    popover.querySelectorAll(".popover-option").forEach(opt => {
      if (opt.getAttribute("data-value") === value) {
        opt.classList.add("selected");
      } else {
        opt.classList.remove("selected");
      }
    });
  }

  // If selecting Tipe, sync category chips
  if (hiddenInputId === "filterTypeSelect") {
    document.querySelectorAll(".cat-chip").forEach(c => {
      const chipText = c.textContent.trim();
      if ((value === "ALL" && chipText === "Semua Unit") || (value !== "ALL" && chipText.includes(value))) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });
  }

  closeAllDropdowns();
  renderCatalog();
}

function initFromLocalStorage() {
  const savedUnits = localStorage.getItem("huniku_web_units");
  if (savedUnits) {
    try {
      state.units = JSON.parse(savedUnits);
    } catch (e) {
      console.warn("Gagal memuat cache unit:", e);
    }
  }
}

function saveUnitsToStorage() {
  localStorage.setItem("huniku_web_units", JSON.stringify(state.units));
}

// NAVIGATION CONTROLLER
function navigateTo(viewId) {
  state.activeView = viewId;
  document.querySelectorAll(".fresha-view-pane").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-view-btn").forEach(btn => btn.classList.remove("active"));

  const targetPane = document.getElementById(viewId);
  if (targetPane) targetPane.classList.add("active");

  const matchingBtn = document.querySelector(`[data-nav="${viewId}"]`);
  if (matchingBtn) matchingBtn.classList.add("active");

  // Keep marketing hero visible only on catalog view
  const heroBanner = document.getElementById("heroWebBanner");
  if (heroBanner) {
    if (viewId === "viewKatalog") {
      heroBanner.style.display = "block";
    } else {
      heroBanner.style.display = "none";
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// USER ROLE SWITCHER
function switchUserRole(role) {
  if (role === "BUYER") {
    state.currentUser = {
      role: "BUYER",
      name: "Rizky Pratama",
      email: "rizky.pratama@example.com",
      phone: "0812-7890-1234",
      unit: null,
      warrantyDays: 180
    };
    showToast("Peran aktif: Calon Pembeli (Rizky Pratama)");
  } else if (role === "RESIDENT") {
    state.currentUser = {
      role: "RESIDENT",
      name: "Ibu Ratna",
      email: "ratna.safitri@example.com",
      phone: "0813-2345-6789",
      unit: "Blok B-05",
      warrantyDays: 142
    };
    showToast("Peran aktif: Warga Penghuni (Ibu Ratna - Blok B-05)");
  } else if (role === "ADMIN") {
    state.currentUser = {
      role: "ADMIN",
      name: "Doni Haryanto",
      email: "doni.admin@huniku.id",
      phone: "0811-9876-5432",
      unit: null,
      warrantyDays: null
    };
    showToast("Peran aktif: Konsol Pengembang (Doni)");
  }
  updateUserUI();
}

function updateUserUI() {
  const roleEl = document.getElementById("navRoleDisplay");
  if (roleEl) {
    if (state.currentUser.role === "BUYER") {
      roleEl.textContent = `Calon Pembeli: ${state.currentUser.name}`;
    } else if (state.currentUser.role === "RESIDENT") {
      roleEl.textContent = `Penghuni: ${state.currentUser.name} (${state.currentUser.unit})`;
    } else {
      roleEl.textContent = `Staf Pengembang: ${state.currentUser.name}`;
    }
  }
}

// FRESHA CATEGORY FILTER CHIPS
function filterByChip(buttonEl, category) {
  document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
  if (buttonEl) buttonEl.classList.add("active");

  const typeSelect = document.getElementById("filterTypeSelect");
  if (typeSelect) {
    typeSelect.value = category;
  }

  const displayType = document.getElementById("displayTypeVal");
  if (displayType) {
    displayType.textContent = category === "ALL" ? "Semua Tipe Unit" : (category === "Tipe 54" ? "Tipe 54 (Hook Eksekutif)" : category);
  }

  const popoverType = document.getElementById("popoverType");
  if (popoverType) {
    popoverType.querySelectorAll(".popover-option").forEach(opt => {
      if (opt.getAttribute("data-value") === category) {
        opt.classList.add("selected");
      } else {
        opt.classList.remove("selected");
      }
    });
  }

  renderCatalog();
}

// PROPERTY CATALOG FILTER & RENDERING (FRESHA MARKETPLACE CARDS)
function renderCatalog() {
  const container = document.getElementById("katalogGridContainer");
  if (!container) return;

  const clusterFilter = document.getElementById("filterClusterSelect") ? document.getElementById("filterClusterSelect").value : "ALL";
  const typeFilter = document.getElementById("filterTypeSelect") ? document.getElementById("filterTypeSelect").value : "ALL";
  const priceFilter = document.getElementById("filterPriceSelect") ? document.getElementById("filterPriceSelect").value : "ALL";

  const filtered = state.units.filter(u => {
    if (clusterFilter !== "ALL" && !u.cluster.toLowerCase().includes(clusterFilter.toLowerCase())) return false;
    if (typeFilter !== "ALL" && !u.type.includes(typeFilter)) return false;
    if (priceFilter === "LOW" && u.rawPrice >= 350000000) return false;
    if (priceFilter === "MID" && (u.rawPrice < 350000000 || u.rawPrice > 450000000)) return false;
    if (priceFilter === "HIGH" && u.rawPrice <= 450000000) return false;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 64px 24px; background: var(--color-surface); border-radius: var(--radius-card); border: 1px dashed var(--color-border);">
        <h3 style="color: var(--color-ink-primary); margin-bottom: 8px; font-size: 1.35rem; font-weight: 800;">Tidak Ada Kavling yang Cocok</h3>
        <p style="color: var(--color-ink-secondary); font-size: 0.9rem; margin-bottom: 20px;">Ubah pilihan kriteria kawasan atau rentang anggaran pada bilah pencarian di atas.</p>
        <button type="button" class="btn-pill-primary" onclick="resetFilters()">Reset Kriteria Pencarian</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(unit => {
    const statusBadgeClass = unit.status === "AVAILABLE" ? "available" : (unit.status === "BOOKED" ? "booked" : "sold");
    const statusLabel = unit.status === "AVAILABLE" ? "Tersedia" : (unit.status === "BOOKED" ? "Sedang Dibooking" : "Terjual");
    const kprEst = Math.round(unit.rawPrice * 0.007 / 1000) * 1000;

    return `
      <article class="fresha-card" id="card-${unit.id}">
        <div class="card-media-box" onclick="openDetailModal('${unit.id}')" style="cursor: pointer;">
          <img src="${unit.image}" alt="Fasad ${unit.code}" class="card-media-img" loading="lazy">
          <span class="card-badge-status ${statusBadgeClass}">${statusLabel}</span>
          <button type="button" class="card-btn-fav" title="Simpan ke favorit" onclick="event.stopPropagation(); showToast('Kavling ${unit.code} disimpan ke favorit')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <div class="card-details-box">
          <div class="card-cluster-line">${unit.cluster} • ${unit.region}</div>
          <div class="card-title-row">
            <h3 class="card-unit-name" onclick="openDetailModal('${unit.id}')" style="cursor: pointer;">${unit.code}</h3>
            <span class="card-type-chip">${unit.type}</span>
          </div>
          <p class="card-desc-snippet">${unit.desc}</p>
          
          <div class="card-specs-strip">
            <span>LB ${unit.lb} m² / LT ${unit.lt} m²</span>
            <span class="spec-divider">•</span>
            <span>${unit.rooms}</span>
            <span class="spec-divider">•</span>
            <span>${unit.orientation.split('(')[0].trim()}</span>
          </div>

          <div class="card-bottom-action-row">
            <div>
              <div class="card-price-value">${unit.price}</div>
              <div class="card-price-sub">Est. KPR: Rp ${kprEst.toLocaleString('id-ID')} / bln</div>
            </div>
            <div>
              ${unit.status === "AVAILABLE" ? `
                <button type="button" class="btn-pill-primary card-btn-action" onclick="openBookingModal('${unit.id}')">
                  Pesan Kavling
                </button>
              ` : `
                <button type="button" class="btn-pill-pass card-btn-action" onclick="openDetailModal('${unit.id}')">
                  Lihat Detail
                </button>
              `}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function resetFilters() {
  const clusterEl = document.getElementById("filterClusterSelect");
  const typeEl = document.getElementById("filterTypeSelect");
  const priceEl = document.getElementById("filterPriceSelect");

  if (clusterEl) clusterEl.value = "ALL";
  if (typeEl) typeEl.value = "ALL";
  if (priceEl) priceEl.value = "ALL";

  const displayCluster = document.getElementById("displayClusterVal");
  const displayType = document.getElementById("displayTypeVal");
  const displayPrice = document.getElementById("displayPriceVal");

  if (displayCluster) displayCluster.textContent = "Semua Kawasan (3 Cluster)";
  if (displayType) displayType.textContent = "Semua Tipe Unit";
  if (displayPrice) displayPrice.textContent = "Semua Kisaran Harga";

  // Reset selected options in popovers
  document.querySelectorAll(".fresha-dropdown-popover").forEach(pop => {
    pop.querySelectorAll(".popover-option").forEach(opt => {
      if (opt.getAttribute("data-value") === "ALL") {
        opt.classList.add("selected");
      } else {
        opt.classList.remove("selected");
      }
    });
  });

  document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
  const allChip = document.querySelector(".cat-chip");
  if (allChip) allChip.classList.add("active");

  closeAllDropdowns();
  renderCatalog();
}

// 2D SITE PLAN MASTERPLAN INTERACTION
function renderSitePlanLots() {
  const lots = document.querySelectorAll(".lot-box");
  lots.forEach(box => {
    box.addEventListener("click", () => {
      lots.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");

      const lotCode = box.getAttribute("data-code");
      const matchedUnit = state.units.find(u => u.code === lotCode);
      if (matchedUnit) {
        updateSitePlanInspector(matchedUnit);
      }
    });
  });
}

function updateSitePlanInspector(unit) {
  const card = document.getElementById("sitePlanInfoCard");
  if (!card) return;

  const statusBadgeClass = unit.status === "AVAILABLE" ? "available" : (unit.status === "BOOKED" ? "booked" : "sold");
  const statusLabel = unit.status === "AVAILABLE" ? "Tersedia" : (unit.status === "BOOKED" ? "Sedang Dibooking" : "Terjual / Akad");
  const kprEst = Math.round(unit.rawPrice * 0.007 / 1000) * 1000;

  card.innerHTML = `
    <div class="inspector-badge-row">
      <span class="status-pill ${statusBadgeClass}">${statusLabel}</span>
      <span class="inspector-cluster-tag">${unit.cluster}</span>
    </div>

    <h3 class="inspector-unit-name">${unit.code}</h3>
    <div class="inspector-price-tag">${unit.price}</div>

    <div class="inspector-specs-table">
      <div class="spec-cell-line"><span>Tipe Rumah:</span> <strong>${unit.type}</strong></div>
      <div class="spec-cell-line"><span>Dimensi Lahan:</span> <strong>LT ${unit.lt} m² / LB ${unit.lb} m²</strong></div>
      <div class="spec-cell-line"><span>Arah Hadap:</span> <strong>${unit.orientation}</strong></div>
      <div class="spec-cell-line"><span>Estimasi KPR:</span> <strong>Rp ${kprEst.toLocaleString('id-ID')} / bulan</strong></div>
    </div>

    <p class="inspector-desc-copy">
      ${unit.desc}
    </p>

    <div class="inspector-button-stack">
      ${unit.status === "AVAILABLE" ? `
        <button type="button" class="btn-pill-primary full-width" onclick="openBookingModal('${unit.id}')">
          Pesan Kavling Ini Sekarang
        </button>
      ` : `
        <button type="button" class="btn-pill-pass full-width" disabled style="opacity: 0.6; cursor: not-allowed;">
          Kavling Tidak Tersedia (${statusLabel})
        </button>
      `}
      <button type="button" class="btn-pill-pass full-width" onclick="openDetailModal('${unit.id}')">
        Lihat Spesifikasi & Denah Lengkap
      </button>
    </div>
  `;
}

// KPR ANNUITY CALCULATOR
function selectBankPartner(buttonEl, rate) {
  document.querySelectorAll(".bank-chip").forEach(btn => btn.classList.remove("active"));
  buttonEl.classList.add("active");
  state.activeBankRate = rate;

  const rateInput = document.getElementById("calcRate");
  if (rateInput) rateInput.value = rate;

  calculateKPR();
}

function calculateKPR() {
  const priceInput = document.getElementById("calcPrice");
  const dpInput = document.getElementById("calcDP");
  const tenorInput = document.getElementById("calcTenor");
  const rateInput = document.getElementById("calcRate");

  if (!priceInput || !dpInput || !tenorInput || !rateInput) return;

  const price = parseFloat(priceInput.value) || 385000000;
  const dpPercent = parseFloat(dpInput.value) || 10;
  const tenorYears = parseFloat(tenorInput.value) || 15;
  const interestRate = (parseFloat(rateInput.value) || 4.75) / 100;

  const dpAmount = price * (dpPercent / 100);
  const loanAmount = price - dpAmount;
  const totalMonths = tenorYears * 12;
  const monthlyRate = interestRate / 12;

  let monthlyInstallment = 0;
  if (monthlyRate > 0) {
    monthlyInstallment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyInstallment = loanAmount / totalMonths;
  }

  const dpLabel = document.getElementById("dpPercentLabel");
  if (dpLabel) {
    dpLabel.textContent = `${dpPercent}% (Rp ${Math.round(dpAmount).toLocaleString('id-ID')})`;
  }

  const outLoan = document.getElementById("outLoanAmount");
  const outDP = document.getElementById("outDPAmount");
  const outInst = document.getElementById("outMonthlyInstallment");

  if (outLoan) outLoan.textContent = `Rp ${Math.round(loanAmount).toLocaleString('id-ID')}`;
  if (outDP) outDP.textContent = `Rp ${Math.round(dpAmount).toLocaleString('id-ID')}`;
  if (outInst) outInst.textContent = `Rp ${Math.round(monthlyInstallment).toLocaleString('id-ID')} / bln`;
}

// MODAL CONTROLLERS & ESCAPE HANDLING
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("open");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

function handleBackdropClick(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

// UNIT DETAIL MODAL
function openDetailModal(unitId) {
  const unit = state.units.find(u => u.id === unitId) || state.units[0];
  state.selectedUnitForBooking = unit;

  document.getElementById("detailModalTitle").textContent = `Spesifikasi Kavling ${unit.code}`;
  document.getElementById("detailModalImage").src = unit.image;
  document.getElementById("detailModalType").textContent = unit.type;
  document.getElementById("detailModalCluster").textContent = `${unit.cluster} (${unit.region})`;
  document.getElementById("detailModalPrice").textContent = unit.price;
  document.getElementById("detailModalDesc").textContent = unit.desc;

  const specsList = document.getElementById("detailModalSpecs");
  specsList.innerHTML = `
    <li><strong>Struktur Bangunan:</strong> ${unit.foundation}</li>
    <li><strong>Legalitas Sertifikat:</strong> ${unit.legal} (Pecah per kavling)</li>
    <li><strong>Instalasi Utilitas:</strong> ${unit.utility}</li>
    <li><strong>Orientasi Bukaan:</strong> ${unit.orientation}</li>
    <li><strong>Rasio Bangunan:</strong> Luas Bangunan ${unit.lb} m² pada Luas Tanah ${unit.lt} m²</li>
    <li><strong>Penataan Kamar:</strong> ${unit.rooms} dengan Carport Mobil</li>
  `;

  openModal("modalUnitDetail");
}

// ATOMIC MUTEX BOOKING SIMULATION
function openBookingModal(unitId) {
  const unit = state.units.find(u => u.id === unitId) || state.units[0];
  state.selectedUnitForBooking = unit;

  document.getElementById("modalBookingUnitCode").textContent = unit.code;
  document.getElementById("modalBookingCluster").textContent = `${unit.cluster} • ${unit.type}`;
  document.getElementById("modalBookingPrice").textContent = unit.price;

  // Sync inputs with current user
  document.getElementById("bookingBuyerNameInput").value = state.currentUser.name;
  document.getElementById("bookingBuyerPhoneInput").value = state.currentUser.phone;
  document.getElementById("bookingBuyerEmailInput").value = state.currentUser.email;

  openModal("modalBookingConfirm");
}

function executeAtomicBooking(event) {
  event.preventDefault();

  if (!state.selectedUnitForBooking) return;
  const unit = state.selectedUnitForBooking;

  const buyerName = document.getElementById("bookingBuyerNameInput").value.trim();
  const buyerPhone = document.getElementById("bookingBuyerPhoneInput").value.trim();
  const buyerEmail = document.getElementById("bookingBuyerEmailInput").value.trim();

  // Atomically lock unit
  unit.status = "BOOKED";
  saveUnitsToStorage();

  // Update Booking Pass State
  const now = new Date();
  const timeFormatted = `${now.getDate().toString().padStart(2, '0')} Oktober 2026, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
  const bookingCode = `HN-2026-${unit.code.replace(/[^A-Z0-9]/g, '')}`;

  state.activeBookingPass = {
    code: bookingCode,
    unitCode: `${unit.code} (${unit.cluster})`,
    buyerName: buyerName,
    phone: buyerPhone,
    email: buyerEmail,
    timestamp: timeFormatted,
    status: "TERKUNCI AMAN (ANTI-DOUBLE BOOKING)"
  };

  // Populate Booking Pass modal elements
  document.getElementById("passModalCode").textContent = bookingCode;
  document.getElementById("passModalUnit").textContent = `${unit.code} (${unit.cluster})`;
  document.getElementById("passModalBuyer").textContent = buyerName;
  document.getElementById("passModalTime").textContent = timeFormatted;

  closeModal("modalBookingConfirm");
  openModal("modalBookingPassSuccess");

  // Re-render UI
  renderCatalog();
  renderAdminTable();
  showToast(`Kavling ${unit.code} berhasil dikunci atas nama ${buyerName}`);
}

// RESIDENT SUPPORT & COMPLAINTS
function selectCategoryChip(buttonEl, categoryName) {
  document.querySelectorAll(".category-chips-row .cat-chip").forEach(btn => btn.classList.remove("active"));
  buttonEl.classList.add("active");
  state.selectedComplaintCategory = categoryName;
}

function handleFileSelected(input) {
  if (input.files && input.files[0]) {
    const textEl = document.getElementById("complaintUploadText");
    if (textEl) {
      textEl.textContent = `Foto terpilih: ${input.files[0].name}`;
    }
  }
}

function handleComplaintSubmit(event) {
  event.preventDefault();

  const desc = document.getElementById("complaintDescInput").value.trim();
  if (!desc) return;

  const newTicket = {
    id: `CMP-0${state.complaints.length + 1}`,
    date: "07 Oktober 2026",
    unit: "Blok B-05 (Ratna)",
    category: state.selectedComplaintCategory,
    desc: desc,
    status: "Diterima Pengawas",
    technician: "Menunggu Jadwal",
    warranty: "Garansi Retensi (Gratis)"
  };

  state.complaints.unshift(newTicket);
  renderComplaintsTable();

  document.getElementById("complaintDescInput").value = "";
  const uploadText = document.getElementById("complaintUploadText");
  if (uploadText) {
    uploadText.textContent = "Unggah Foto Bukti Kendala (JPG, PNG maks 5 MB)";
  }

  showToast(`Tiket keluhan ${newTicket.id} berhasil dikirim ke teknisi`);
}

function renderComplaintsTable() {
  const tbody = document.getElementById("residentComplaintsTableBody");
  if (!tbody) return;

  tbody.innerHTML = state.complaints.map(item => `
    <tr>
      <td><span style="font-family: var(--font-mono); font-weight: 700; color: var(--color-maroon-base);">${item.id}</span></td>
      <td>
        <div style="font-weight: 700;">${item.category}</div>
        <div style="font-size: 0.78rem; color: var(--color-ink-muted);">${item.desc}</div>
      </td>
      <td><span style="font-size: 0.78rem; color: #065F46; font-weight: 600;">${item.warranty}</span></td>
      <td>
        <span class="status-pill available">
          ${item.status}
        </span>
      </td>
      <td style="font-size: 0.82rem; color: var(--color-ink-secondary);">${item.technician}</td>
    </tr>
  `).join("");
}

// DEVELOPER ADMIN INVENTORY CONSOLE
function renderAdminTable() {
  const tbody = document.getElementById("adminInventoryTableBody");
  if (!tbody) return;

  tbody.innerHTML = state.units.map(unit => {
    const statusPillClass = unit.status === "AVAILABLE" ? "available" : (unit.status === "BOOKED" ? "booked" : "sold");
    const statusLabel = unit.status === "AVAILABLE" ? "Tersedia" : (unit.status === "BOOKED" ? "Sedang Dibooking" : "Terjual / Akad");

    return `
      <tr>
        <td><strong style="font-family: var(--font-mono); color: var(--color-maroon-base); font-size: 0.92rem;">${unit.code}</strong></td>
        <td>
          <div style="font-weight: 700;">${unit.cluster}</div>
          <div style="font-size: 0.76rem; color: var(--color-ink-muted);">${unit.type} • ${unit.region}</div>
        </td>
        <td style="font-weight: 800; color: var(--color-ink-primary);">${unit.price}</td>
        <td>
          <span class="status-pill ${statusPillClass}">
            ${statusLabel}
          </span>
        </td>
        <td>
          <select onchange="changeUnitStatusAdmin('${unit.id}', this.value)" style="padding: 6px 10px; font-size: 0.78rem; border: 1px solid var(--color-border-dark); border-radius: var(--radius-sm); background: #FFF; font-family: var(--font-sans); cursor: pointer;">
            <option value="AVAILABLE" ${unit.status === "AVAILABLE" ? "selected" : ""}>Tersedia (Available)</option>
            <option value="BOOKED" ${unit.status === "BOOKED" ? "selected" : ""}>Terkunci (Booked)</option>
            <option value="SOLD" ${unit.status === "SOLD" ? "selected" : ""}>Terjual (Akad Selesai)</option>
          </select>
        </td>
        <td>
          <button type="button" class="btn-pill-pass" style="padding: 5px 12px; font-size: 0.76rem;" onclick="openDetailModal('${unit.id}')">
            Periksa Denah
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function changeUnitStatusAdmin(unitId, newStatus) {
  const unit = state.units.find(u => u.id === unitId);
  if (unit) {
    unit.status = newStatus;
    saveUnitsToStorage();
    renderCatalog();
    renderAdminTable();
    showToast(`Status kavling ${unit.code} diperbarui menjadi ${newStatus}`);
  }
}

// FLOATING INQUIRY CHAT DRAWER
function toggleChatDrawer() {
  const drawer = document.getElementById("webChatDrawer");
  if (!drawer) return;
  if (drawer.style.display === "none" || drawer.style.display === "") {
    drawer.style.display = "flex";
  } else {
    drawer.style.display = "none";
  }
}

function sendChatMessage() {
  const input = document.getElementById("chatDrawerInput");
  if (!input || !input.value.trim()) return;

  const msgText = input.value.trim();
  const container = document.querySelector(".chat-message-history");
  if (container) {
    const bubble = document.createElement("div");
    bubble.className = "chat-item-bubble outgoing";
    bubble.textContent = msgText;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  }
  input.value = "";
  showToast("Pesan Anda telah diteruskan ke agen pemasaran lapangan");
}

// TOAST NOTIFICATION UTILITY
function showToast(message) {
  const existing = document.getElementById("hunikuToast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "hunikuToast";
  toast.style.position = "fixed";
  toast.style.bottom = "28px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "var(--color-maroon-dark)";
  toast.style.color = "#FFFFFF";
  toast.style.border = "1px solid var(--color-gold-base)";
  toast.style.padding = "10px 24px";
  toast.style.borderRadius = "var(--radius-pill)";
  toast.style.fontSize = "0.84rem";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "999";
  toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
  toast.style.transition = "opacity 0.25s ease";
  toast.textContent = message;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// EXPORT TO WINDOW (GLOBAL ACCESS)
window.navigateTo = navigateTo;
window.switchUserRole = switchUserRole;
window.renderCatalog = renderCatalog;
window.resetFilters = resetFilters;
window.filterByChip = filterByChip;
window.selectBankPartner = selectBankPartner;
window.calculateKPR = calculateKPR;
window.openModal = openModal;
window.closeModal = closeModal;
window.handleBackdropClick = handleBackdropClick;
window.openDetailModal = openDetailModal;
window.openBookingModal = openBookingModal;
window.executeAtomicBooking = executeAtomicBooking;
window.selectCategoryChip = selectCategoryChip;
window.handleFileSelected = handleFileSelected;
window.handleComplaintSubmit = handleComplaintSubmit;
window.changeUnitStatusAdmin = changeUnitStatusAdmin;
window.toggleChatDrawer = toggleChatDrawer;
window.sendChatMessage = sendChatMessage;
window.showToast = showToast;
window.toggleDropdown = toggleDropdown;
window.closeAllDropdowns = closeAllDropdowns;
window.selectDropdownOption = selectDropdownOption;
