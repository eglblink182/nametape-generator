// ---- CONFIG: INPUT OPTIONS ----
const CONFIG = {
  canvas: {
    width: 900,
    height: 263,
  },

  // Shops
  shops: {
    APG: { label: "APG" },
    ENG: { label: "Engines" },
  },

  // Ranks AB–MSgt
  ranks: {
    AB: { label: "AB" },
    Amn: { label: "Amn" },
    A1C: { label: "A1C" },
    SrA: { label: "SrA" },
    SSgt: { label: "SSgt" },
    TSgt: { label: "TSgt" },
    MSgt: { label: "MSgt" },
  },

  // Skill levels
  skills: {
    "3": { label: "3-level" },
    "5": { label: "5-level" },
    "7": { label: "7-level" },
  },

  // Duty Titles
  duties: {
    "3": { label: "3" },
    "5": { label: "5" },
    "7": { label: "7" },
    DCC: { label: "DCC" },
    ADCC: { label: "ADCC" },
    NCOIC: { label: "NCOIC" },
    "Section Chief": { label: "Section Chief" },
  },

  // ---- Name Text Configuration ----
  nameText: {
    // Base X center; Y is decided per name (caps/drops)
    centerX: 548.9,
    centerY: 131.6, // not used directly but kept for reference

    // Horizontal bounds the text box must stay within
    minX: 240, // left constraint
    maxX: 860, // right constraint

    fontFamily: "CaptainTallShip, system-ui, sans-serif",

    // Font size range – we'll clamp by width & height
    maxFontSize: 150,
    minFontSize: 40,

    // Stroke width (outline thickness)
    strokeWidthPx: 14,

    colorsByShop: {
      APG: {
        fill: "#FBFF00",
        stroke: "#0006A0",
      },
      ENG: {
        fill: "#0006A0",
        stroke: "#FBFF00",
      },
      default: {
        fill: "#FFFFFF",
        stroke: "#000000",
      },
    },

    // Vertical bounds the text box must stay within
    clipTop: 40,
    clipBottom: 220,
  },
};

// ---- IMAGE PATHS (based on your asset list) ----
const IMAGE_PATHS = {
  border: "assets/border/border.png",

  backgrounds: {
    APG: "assets/backgrounds/background_graphic_apg.png",
    ENG: "assets/backgrounds/background_graphic_eng.png",
  },

  nameBg: {
    APG: "assets/name_bg/name_background_apg.png",
    ENG: "assets/name_bg/name_background_eng.png",
  },

  rankBg: {
    "3": "assets/rank_bg/rank_background_3_lvl.png",
    "5": "assets/rank_bg/rank_background_5_lvl.png",
    "7": "assets/rank_bg/rank_background_7_lvl.png",
    APG_NCOIC: "assets/rank_bg/rank_background_apg_ncoic.png",
    ENG_NCOIC: "assets/rank_bg/rank_background_eng_ncoic.png",
    APG_SC: "assets/rank_bg/rank_background_apg_section_chief.png",
    ENG_SC: "assets/rank_bg/rank_background_eng_section_chief.png",
  },

  duty: {
    // Generic 3/5/7 duty titles
    "3": "assets/duty/duty_title_3.png",
    "5": "assets/duty/duty_title_5.png",
    "7": "assets/duty/duty_title_7.png",

    // ADCC variants by skill
    "3_ADCC": "assets/duty/duty_title_3_adcc.png",
    "5_ADCC": "assets/duty/duty_title_5_adcc.png",
    "7_ADCC": "assets/duty/duty_title_7_adcc.png",

    // DCC variants by skill
    "5_DCC": "assets/duty/duty_title_5_dcc.png",
    "7_DCC": "assets/duty/duty_title_7_dcc.png",

    // NCOIC by shop
    NCOIC_APG: "assets/duty/duty_title_ncoic_apg.png",
    NCOIC_ENG: "assets/duty/duty_title_ncoic_eng.png",
  },

  // Rank icons
  ranks: {
    // AB
    AB_3: "assets/ranks/rank_ab_3_lvl.png",
    AB_5: "assets/ranks/rank_ab_5_lvl.png",

    // Amn
    Amn_3: "assets/ranks/rank_amn_3_lvl.png",
    Amn_5: "assets/ranks/rank_amn_5_lvl.png",

    // A1C
    A1C_3: "assets/ranks/rank_a1c_3_lvl.png",
    A1C_5: "assets/ranks/rank_a1c_5_lvl.png",

    // SrA
    SrA_3: "assets/ranks/rank_sra_3_lvl.png",
    SrA_5: "assets/ranks/rank_sra_5_lvl.png",

    // SSgt
    SSgt_3: "assets/ranks/rank_ssgt_3_lvl.png",
    SSgt_5: "assets/ranks/rank_ssgt_5_lvl.png",
    SSgt_7: "assets/ranks/rank_ssgt_7_lvl.png",
    SSgt_APG_NCOIC: "assets/ranks/rank_ssgt_apg_ncoic.png",
    SSgt_ENG_NCOIC: "assets/ranks/rank_ssgt_eng_ncoic.png",

    // TSgt
    TSgt_3: "assets/ranks/rank_tsgt_3_lvl.png",
    TSgt_5: "assets/ranks/rank_tsgt_5_lvl.png",
    TSgt_7: "assets/ranks/rank_tsgt_7_lvl.png",
    // NOTE: filename has 'agp' in it; path must match exactly
    TSgt_APG_NCOIC: "assets/ranks/rank_tsgt_agp_ncoic.png",
    TSgt_ENG_NCOIC: "assets/ranks/rank_tsgt_eng_ncoic.png",

    // MSgt (by shop only)
    MSgt_APG: "assets/ranks/rank_msgt_apg.png",
    MSgt_ENG: "assets/ranks/rank_msgt_eng.png",
  },
};

// ---- DOM ELEMENTS ----
const nameInput = document.getElementById("nameInput");
const rankSelect = document.getElementById("rankSelect");
const skillSelect = document.getElementById("skillSelect");
const shopSelect = document.getElementById("shopSelect");
const dutySelect = document.getElementById("dutySelect");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

// Force canvas to the design resolution
canvas.width = CONFIG.canvas.width;
canvas.height = CONFIG.canvas.height;

// ---- POPULATE SELECTS ----
function populateSelect(selectElement, options) {
  selectElement.innerHTML = "";
  Object.entries(options).forEach(([value, obj]) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = obj.label;
    selectElement.appendChild(opt);
  });
}

populateSelect(rankSelect, CONFIG.ranks);
populateSelect(skillSelect, CONFIG.skills);
populateSelect(shopSelect, CONFIG.shops);
populateSelect(dutySelect, CONFIG.duties);

// ---- IMAGE LOADING ----
const loadedImages = {};

function loadImage(key, src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      loadedImages[key] = img;
      resolve();
    };
    img.onerror = () => {
      console.warn("Failed to load image:", src);
      resolve();
    };
    img.src = src;
  });
}

async function preloadImages() {
  const promises = [];

  // Border
  if (IMAGE_PATHS.border) {
    promises.push(loadImage("border", IMAGE_PATHS.border));
  }

  // Backgrounds
  Object.entries(IMAGE_PATHS.backgrounds).forEach(([shopKey, src]) => {
    promises.push(loadImage(`bg_${shopKey}`, src));
  });

  // Name backgrounds
  Object.entries(IMAGE_PATHS.nameBg).forEach(([shopKey, src]) => {
    promises.push(loadImage(`namebg_${shopKey}`, src));
  });

  // Rank backgrounds
  Object.entries(IMAGE_PATHS.rankBg).forEach(([key, src]) => {
    promises.push(loadImage(`rankbg_${key}`, src));
  });

  // Duty title graphics
  Object.entries(IMAGE_PATHS.duty).forEach(([key, src]) => {
    promises.push(loadImage(`duty_${key}`, src));
  });

  // Rank icons
  Object.entries(IMAGE_PATHS.ranks).forEach(([key, src]) => {
    promises.push(loadImage(`rank_${key}`, src));
  });

  await Promise.all(promises);
}

// ---- TEXT DRAWING ----
function drawNameText(name, shopKey) {
  const cfg = CONFIG.nameText;
  const displayName = (name || "NAME").trim();

  // Always center on the same point (same as ERIC/Eric)
  const centerX = cfg.centerX;
  const centerY = cfg.centerY;

  // Center-center alignment
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const allowedLeft = cfg.minX;         // 240
  const allowedRight = cfg.maxX;        // 860
  const allowedTop = cfg.clipTop;       // 40
  const allowedBottom = cfg.clipBottom; // 220

  const allowedHeight = allowedBottom - allowedTop;

  let fontSize = cfg.maxFontSize;
  let halfW = 0;
  let halfH = 0;

  // --- Auto-size based on BOTH width & height vs bounds ---
  while (fontSize > cfg.minFontSize) {
    ctx.font = `${fontSize}px ${cfg.fontFamily}`;

    const metrics = ctx.measureText(displayName);

    // Include stroke in width & height
    const textWidth = metrics.width + cfg.strokeWidthPx * 2;

    const ascent =
      metrics.actualBoundingBoxAscent !== undefined
        ? metrics.actualBoundingBoxAscent
        : fontSize * 0.8;

    const descent =
      metrics.actualBoundingBoxDescent !== undefined
        ? metrics.actualBoundingBoxDescent
        : fontSize * 0.3;

    const textHeight = ascent + descent + cfg.strokeWidthPx * 2;

    // If the text itself is taller than the allowed vertical band, shrink
    if (textHeight > allowedHeight) {
      fontSize -= 1;
      continue;
    }

    halfW = textWidth / 2;
    halfH = textHeight / 2;

    const left = centerX - halfW;
    const right = centerX + halfW;
    const top = centerY - halfH;
    const bottom = centerY + halfH;

    const fitsWidth = left >= allowedLeft && right <= allowedRight;
    const fitsHeight = top >= allowedTop && bottom <= allowedBottom;

    if (fitsWidth && fitsHeight) {
      break;
    }

    fontSize -= 1;
  }

  // Lock final font
  ctx.font = `${fontSize}px ${cfg.fontFamily}`;

  // Shop-specific colors
  const colors = cfg.colorsByShop[shopKey] || cfg.colorsByShop.default;
  ctx.fillStyle = colors.fill;
  ctx.strokeStyle = colors.stroke;
  ctx.lineWidth = cfg.strokeWidthPx;

  const x = centerX;
  const y = centerY;

  // Draw directly, no clipping
  ctx.strokeText(displayName, x, y);
  ctx.fillText(displayName, x, y);
}

// ---- MAIN DRAW FUNCTION: LAYER IMAGES ----
function drawNametape(name, rankKey, skillKey, shopKey, dutyKey) {
  const { width, height } = CONFIG.canvas;
  ctx.clearRect(0, 0, width, height);

  // 1) RANK BACKGROUND
  let rankBgKey = null;

  if (dutyKey === "Section Chief") {
    rankBgKey = shopKey === "APG" ? "APG_SC" : "ENG_SC";
  } else if (dutyKey === "NCOIC") {
    rankBgKey = shopKey === "APG" ? "APG_NCOIC" : "ENG_NCOIC";
  } else {
    rankBgKey = skillKey; // "3", "5", "7"
  }

  if (rankBgKey) {
    const rankBgImg = loadedImages[`rankbg_${rankBgKey}`];
    if (rankBgImg) {
      ctx.drawImage(rankBgImg, 0, 0, width, height);
    }
  }

  // 2) NAME BACKGROUND
  const nameBgImg = loadedImages[`namebg_${shopKey}`];
  if (nameBgImg) {
    ctx.drawImage(nameBgImg, 0, 0, width, height);
  } else if (!rankBgKey) {
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, width, height);
  }

  // 3) BACKGROUND GRAPHIC
  const bgImg = loadedImages[`bg_${shopKey}`];
  if (bgImg) {
    ctx.drawImage(bgImg, 0, 0, width, height);
  }

  // 4) DUTY TITLE
  let dutyImageKey = null;

  if (dutyKey === "Section Chief") {
    dutyImageKey = null;
  } else if (dutyKey === "NCOIC") {
    dutyImageKey = shopKey === "APG" ? "NCOIC_APG" : "NCOIC_ENG";
  } else if (dutyKey === "ADCC") {
    dutyImageKey = `${skillKey}_ADCC`;
  } else if (dutyKey === "DCC") {
    if (skillKey === "5" || skillKey === "7") {
      dutyImageKey = `${skillKey}_DCC`;
    } else {
      dutyImageKey = null;
    }
  } else if (dutyKey === "3" || dutyKey === "5" || dutyKey === "7") {
    dutyImageKey = dutyKey;
  }

  if (dutyImageKey) {
    const dutyImg = loadedImages[`duty_${dutyImageKey}`];
    if (dutyImg) {
      ctx.drawImage(dutyImg, 0, 0, width, height);
    }
  }

  // 5) RANK ICON
  let rankImageKey = null;

  if (rankKey === "MSgt") {
    rankImageKey = shopKey === "APG" ? "MSgt_APG" : "MSgt_ENG";
  } else if (dutyKey === "NCOIC") {
    if (rankKey === "SSgt") {
      rankImageKey = shopKey === "APG" ? "SSgt_APG_NCOIC" : "SSgt_ENG_NCOIC";
    } else if (rankKey === "TSgt") {
      rankImageKey = shopKey === "APG" ? "TSgt_APG_NCOIC" : "TSgt_ENG_NCOIC";
    } else {
      rankImageKey = `${rankKey}_${skillKey}`;
    }
  } else {
    rankImageKey = `${rankKey}_${skillKey}`;
  }

  if (rankImageKey) {
    const rankImg = loadedImages[`rank_${rankImageKey}`];
    if (rankImg) {
      ctx.drawImage(rankImg, 0, 0, width, height);
    }
  }

  // 6) BORDER
  const borderImg = loadedImages["border"];
  if (borderImg) {
    ctx.drawImage(borderImg, 0, 0, width, height);
  }

  // 7) NAME TEXT
  drawNameText(name, shopKey);
}

// ---- DOWNLOAD FUNCTION ----
function downloadCanvasAsPNG() {
  if (!canvas) return;

  const rawName = (nameInput.value || "nametape").trim();
  const safeName = rawName.replace(/[^\w\-]+/g, "_") || "nametape";

  if (canvas.toBlob) {
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${safeName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      "image/png"
    );
  } else {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${safeName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// ---- INITIALIZE ----
async function init() {
  await preloadImages();
  drawNametape(
    "NAME",
    rankSelect.value,
    skillSelect.value,
    shopSelect.value,
    dutySelect.value
  );
}

generateBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const rank = rankSelect.value;
  const skill = skillSelect.value;
  const shop = shopSelect.value;
  const duty = dutySelect.value;

  drawNametape(name, rank, skill, shop, duty);
});

downloadBtn.addEventListener("click", downloadCanvasAsPNG);

// Kick it off
init();
