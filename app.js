// The Evolution of Eyes · 眼之演化
// Plain JS · template literals throughout for CJK safety

(function () {
  "use strict";

  const root = document.documentElement;
  const LANG_KEY = "eoe-lang";
  const THEME_KEY = "eoe-theme";

  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    document.querySelectorAll(".lang-toggle button").forEach(b => {
      b.classList.toggle("active", b.dataset.langSet === lang);
    });
    document.querySelectorAll("[data-en-placeholder]").forEach(el => {
      const v = el.getAttribute(`data-${lang}-placeholder`);
      if (v) el.placeholder = v;
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle button").forEach(b => {
      b.classList.toggle("active", b.dataset.themeSet === theme);
    });
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
  }
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.addEventListener("click", () => applyLang(b.dataset.langSet));
  });
  document.querySelectorAll(".theme-toggle button").forEach(b => {
    b.addEventListener("click", () => applyTheme(b.dataset.themeSet));
  });
  try {
    const sl = localStorage.getItem(LANG_KEY); if (sl) applyLang(sl);
    const st = localStorage.getItem(THEME_KEY); if (st) applyTheme(st);
  } catch (_) {}

  function renderCards(hostId, items) {
    const host = document.getElementById(hostId);
    if (!host) return;
    host.innerHTML = items.map(c => `
      <div class="card ${c.cls || ""}">
        <div class="kicker"><span lang="en">${c.kicker[0]}</span><span lang="zh">${c.kicker[1]}</span></div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }

  // ─── Module 01 · Eye evolution timeline ──────────────────────────
  const timeline = [
    {
      when: ["~3.5 Ga", "约 35 亿年前"],
      what: ["Light-sensitive pigment", "感光色素"],
      blurbEn: `Microbial opsin-like proteins respond to photons, but only to switch metabolism. No image, no direction — just &quot;there is light.&quot;`,
      blurbZh: `微生物体内的视蛋白样分子对光子有反应,但仅用于切换代谢。无成像、无方向——仅"有光"二字。`,
      ico: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="14" fill="none" stroke="#d49a3a" stroke-width="1.5" opacity="0.4"/><circle cx="30" cy="30" r="6" fill="#d49a3a"/></svg>`,
      accent: "var(--leaf)"
    },
    {
      when: ["~600 Mya", "约 6 亿年前"],
      what: ["Eyespot", "眼点"],
      blurbEn: `Pigmented cell patches let the organism detect direction of light. Found today in Euglena and many flatworms.`,
      blurbZh: `带色素的细胞斑使生物可探测光的方向。今见于眼虫与许多扁形动物。`,
      ico: `<svg viewBox="0 0 60 60"><ellipse cx="30" cy="32" rx="22" ry="16" fill="#1d2129" stroke="#9376ff" stroke-width="1"/><circle cx="36" cy="28" r="5" fill="#d49a3a"/></svg>`,
      accent: "var(--neural)"
    },
    {
      when: ["~550 Mya", "约 5.5 亿年前"],
      what: ["Cup eye", "凹陷眼"],
      blurbEn: `An invagination of pigmented tissue creates rough directional sensitivity. Slugs and limpets retain this stage.`,
      blurbZh: `带色素组织内陷,赋予粗略的方向敏感度。蛞蝓与笠贝至今保留此阶段。`,
      ico: `<svg viewBox="0 0 60 60"><path d="M10,40 Q30,15 50,40 Z" fill="#13161c" stroke="#5fc8d4" stroke-width="1.4"/><circle cx="30" cy="32" r="6" fill="#d49a3a"/></svg>`,
      accent: "var(--retina)"
    },
    {
      when: ["~530 Mya", "约 5.3 亿年前"],
      what: ["Pinhole eye", "针孔眼"],
      blurbEn: `The cup closes; a small aperture forms. The chambered nautilus uses this design today, with no lens at all — like a sea-going camera obscura.`,
      blurbZh: `凹陷闭合,留出小孔。鹦鹉螺至今沿用这一无透镜的设计,如同海中暗箱。`,
      ico: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill="#13161c" stroke="#d49a3a" stroke-width="1.4"/><circle cx="30" cy="30" r="3" fill="#0a0c10"/></svg>`,
      accent: "var(--iris)"
    },
    {
      when: ["~520 Mya", "约 5.2 亿年前"],
      what: ["Lens-bearing eye", "带透镜眼"],
      blurbEn: `A transparent layer over the aperture concentrates light onto a denser retina. The visual world snaps into focus.`,
      blurbZh: `透明层覆于孔上,将光聚焦到更密集的视网膜上。视觉世界第一次"对焦"。`,
      ico: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill="none" stroke="#9376ff" stroke-width="1"/><circle cx="30" cy="30" r="14" fill="#d49a3a" opacity="0.6"/><circle cx="30" cy="30" r="5" fill="#0a0c10"/><circle cx="26" cy="27" r="1.5" fill="#e9e6dc" opacity="0.7"/></svg>`,
      accent: "var(--neural)"
    },
    {
      when: ["~520 Mya", "约 5.2 亿年前"],
      what: ["Compound eye", "复眼"],
      blurbEn: `A radically different solution: thousands of tiny ommatidia, each with its own optical axis. Trilobites and modern arthropods. Lower acuity per facet, but fast motion detection.`,
      blurbZh: `一种迥异的方案:成千上万的小眼面 (ommatidia),各自具有独立光轴。三叶虫与当代节肢动物即此。每面分辨率较低,但运动探测极快。`,
      ico: `<svg viewBox="0 0 60 60"><g fill="none" stroke="#5fc8d4" stroke-width="0.9"><circle cx="20" cy="20" r="6"/><circle cx="32" cy="18" r="6"/><circle cx="44" cy="22" r="6"/><circle cx="22" cy="32" r="6"/><circle cx="36" cy="32" r="6"/><circle cx="48" cy="34" r="6"/><circle cx="26" cy="44" r="6"/><circle cx="40" cy="46" r="6"/></g></svg>`,
      accent: "var(--retina)"
    },
    {
      when: ["~500 Mya", "约 5 亿年前"],
      what: ["Camera eye", "相机型眼"],
      blurbEn: `Cornea, iris, lens, retina — the architecture shared by all modern vertebrates and, independently, by cephalopods. Convergent evolution at its most striking.`,
      blurbZh: `角膜、虹膜、晶状体、视网膜——所有现代脊椎动物的共同架构,头足类则独立演化出相同结构。趋同演化最惊人的案例之一。`,
      ico: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill="#13161c" stroke="#e9e6dc" stroke-width="0.8"/><circle cx="30" cy="30" r="14" fill="#d49a3a"/><circle cx="30" cy="30" r="5" fill="#0a0c10"/><circle cx="26" cy="26" r="2" fill="#e9e6dc" opacity="0.8"/></svg>`,
      accent: "var(--iris)"
    },
    {
      when: ["Today", "今"],
      what: ["Vision + cortex", "视觉 + 皮层"],
      blurbEn: `Up to a third of the human cortex is dedicated to visual processing. Vision is now inseparable from prediction, attention, memory, and consciousness.`,
      blurbZh: `人类皮层最高三分之一专司视觉处理。视觉如今已与预测、注意、记忆、意识不可分离。`,
      ico: `<svg viewBox="0 0 60 60"><path d="M14,30 C14,18 22,12 30,12 C38,12 46,18 46,30 C46,42 38,48 30,48 C22,48 14,42 14,30 Z M22,18 Q26,14 30,18 M38,18 Q34,14 30,18 M22,42 Q26,46 30,42" fill="none" stroke="#9376ff" stroke-width="1"/><circle cx="30" cy="30" r="4" fill="#d49a3a"/></svg>`,
      accent: "var(--neural)"
    }
  ];
  function renderTimeline() {
    const host = document.getElementById("evoTimeline");
    if (!host) return;
    host.innerHTML = timeline.map(t => `
      <div class="evo-node" style="--accent: ${t.accent}">
        <div class="when">${t.when[0]} · ${t.when[1]}</div>
        <div class="ico">${t.ico}</div>
        <div class="what"><span lang="en">${t.what[0]}</span><span lang="zh">${t.what[1]}</span></div>
        <div class="blurb"><span lang="en">${t.blurbEn}</span><span lang="zh">${t.blurbZh}</span></div>
        <span class="stem"></span>
        <span class="dot"></span>
      </div>
    `).join("");
  }
  renderTimeline();

  // ─── Module 02 · Physics cards ───────────────────────────────────
  const physicsCards = [
    {
      kicker: ["Photons", "光子"],
      titleEn: "The discrete unit of vision",
      titleZh: "视觉的离散单位",
      bodyEn: `A single photon striking a rhodopsin molecule changes its shape, triggering a cascade that ends with a neural signal. Dark-adapted rod cells in the human retina can fire on roughly five photons. The fundamental limit of vision is quantum.`,
      bodyZh: `单个光子撞击视紫红质分子使其构象改变,引发最终输出神经信号的级联。在暗适应状态下,人类视网膜的视杆细胞约 5 个光子即可触发。视觉的根本极限属于量子层面。`,
      cls: "iris"
    },
    {
      kicker: ["Spectrum", "光谱"],
      titleEn: "Why visible light is visible",
      titleZh: "可见光为何可见"
,
      bodyEn: `The Sun emits most strongly in the 380–750 nm band. Liquid water transmits this band best of all. Animal vision evolved at the intersection — selection caught the photons that were most available and most informative.`,
      bodyZh: `太阳辐射在 380–750 纳米波段最强,液态水对此波段透过最好。动物视觉在两者交集中演化——选择捕捉的是最丰富、最具信息量的光子。`,
      cls: "retina"
    },
    {
      kicker: ["Refraction", "折射"],
      titleEn: "Lenses bend, retinas catch",
      titleZh: "透镜弯折,视网膜捕获"
,
      bodyEn: `A lens slows light passing through it, bending it toward a focal point. Biological lenses use gradient-index optics: the protein concentration varies smoothly inside the lens, correcting aberrations in a way most camera lenses cannot match.`,
      bodyZh: `透镜使穿过的光减速并向焦点弯折。生物晶状体采用梯度折射率光学:晶体内蛋白质浓度连续变化,以多数相机镜头无法匹敌的方式修正像差。`,
      cls: "neural"
    },
    {
      kicker: ["Polarization", "偏振"],
      titleEn: "A channel humans cannot read",
      titleZh: "人类无法读取的通道",
      bodyEn: `Light waves vibrate in a plane. Many invertebrates — and a few vertebrates — read this plane and use it for navigation, hunting, and signalling. Cuttlefish appear to communicate in polarized patterns invisible to predators that lack the sensor.`,
      bodyZh: `光波在某平面上振动。许多无脊椎动物——以及少数脊椎动物——能读出该平面,用于导航、捕食与通讯。墨鱼似乎以偏振图案进行通讯,而不具偏振感受器的捕食者对此不可见。`,
      cls: "leaf"
    }
  ];
  renderCards("physicsCards", physicsCards);

  // ─── Module 03 · Brain cards ─────────────────────────────────────
  const brainCards = [
    {
      kicker: ["Retina", "视网膜"],
      titleEn: "Pre-processing happens in the eye",
      titleZh: "预处理就在眼内进行",
      bodyEn: `Before any signal reaches the brain, the retina has already done edge detection, contrast enhancement, motion detection, and crude colour-opponent encoding. About 130 million photoreceptors compress to ~1 million optic-nerve fibres — a 130:1 compression done by the retina itself.`,
      bodyZh: `在任何信号抵达大脑之前,视网膜已完成边缘检测、对比度增强、运动检测以及初步的颜色拮抗编码。约 1.3 亿感光细胞压缩为约 100 万条视神经纤维——130:1 的压缩,完全由视网膜自身完成。`,
      cls: "iris"
    },
    {
      kicker: ["V1 cortex", "初级视皮层"],
      titleEn: "Orientation columns map the world",
      titleZh: "朝向柱映射世界",
      bodyEn: `The primary visual cortex (V1) is organized into orientation columns — small groups of neurons each tuned to a specific edge angle. Hubel &amp; Wiesel won the 1981 Nobel for showing this. Modern convolutional neural networks are direct descendants of this architectural insight.`,
      bodyZh: `初级视皮层(V1)按"朝向柱"组织——每个柱由调谐于特定边缘角度的神经元小群组成。Hubel 与 Wiesel 因揭示这一结构获 1981 年诺奖。现代卷积神经网络即此架构洞见的直接后裔。`,
      cls: "neural"
    },
    {
      kicker: ["Two streams", "双通路"],
      titleEn: "What and where",
      titleZh: "是什么 / 在哪里",
      bodyEn: `Visual information splits at V1 into two streams: a ventral &quot;what&quot; pathway (object identity, ending in the temporal lobe) and a dorsal &quot;where/how&quot; pathway (spatial location and action, ending in the parietal lobe). Damage to one without the other produces strikingly specific deficits.`,
      bodyZh: `视觉信息自 V1 分为两路:腹侧"是什么"通路(物体身份,终于颞叶)与背侧"在哪里/怎么做"通路(空间位置与动作,终于顶叶)。损伤其一而不及其二,会产生令人惊讶的具体性缺陷。`,
      cls: "retina"
    },
    {
      kicker: ["Prediction", "预测"],
      titleEn: "Vision is mostly hallucination",
      titleZh: "视觉的多数,是幻觉",
      bodyEn: `Modern neuroscience (predictive-processing models) suggests the cortex generates a constant prediction of what should be seen, and only updates when sensory input contradicts the prediction. What you experience as &quot;seeing&quot; is mostly your own prediction confirmed.`,
      bodyZh: `当代神经科学(预测处理模型)表明,皮层持续生成"该看到什么"的预测,仅在感官输入与预测相悖时更新。你所体验的"看见",多数是自己预测被确认。`,
      cls: "leaf"
    }
  ];
  renderCards("brainCards", brainCards);

  // ─── Module 04 · Predator-prey simulator ─────────────────────────
  const simDims = [
    ["pred",  "Predator success rate", "捕食成功率"],
    ["prey",  "Prey survival rate",    "猎物存活率"],
    ["ner",   "Neural complexity drift", "神经复杂度漂移"],
    ["cam",   "Camouflage selection",  "拟态选择压"],
    ["speed", "Speed selection",       "速度选择压"],
    ["clade", "Cladogenic divergence", "支系分化"]
  ];
  function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }
  function runSim() {
    const pred = +document.getElementById("simPredator").value;
    const prey = +document.getElementById("simPrey").value;
    const clarity = +document.getElementById("simClarity").value;
    const pressure = +document.getElementById("simPressure").value;

    const eyeGap = pred - prey;
    const predScore  = clamp(50 + eyeGap * 0.5 + (clarity - 50) * 0.2 + (pressure - 50) * 0.1);
    const preyScore  = clamp(50 - eyeGap * 0.5 + (50 - clarity) * 0.15 + (pressure - 50) * 0.05);
    const nerScore   = clamp(50 + (pred + prey - 100) * 0.4 + (pressure - 50) * 0.3);
    const camScore   = clamp(50 + (pred - 50) * 0.4 + (50 - clarity) * 0.3);
    const speedScore = clamp(50 + Math.abs(eyeGap) * 0.3 + (pressure - 50) * 0.4);
    const cladeScore = clamp(50 + (pressure - 50) * 0.5 + (50 - clarity) * 0.2);

    const scores = { pred: predScore, prey: preyScore, ner: nerScore, cam: camScore, speed: speedScore, clade: cladeScore };
    document.getElementById("simBars").innerHTML = simDims.map(d => `
      <div class="sbar">
        <span><span lang="en">${d[1]}</span><span lang="zh">${d[2]}</span></span>
        <span class="meter"><i style="width:${scores[d[0]]}%"></i></span>
        <span class="v">${scores[d[0]]}</span>
      </div>
    `).join("");

    const en = `Predator eye ${pred}, prey eye ${prey}, clarity ${clarity}, pressure ${pressure}. Predator success ${predScore}, prey survival ${preyScore}, neural drift ${nerScore}, camouflage ${camScore}, speed ${speedScore}, cladogenesis ${cladeScore}. Note: when both predator and prey eye sophistication rise together, neural complexity rises but neither side &quot;wins&quot; — the arms race converges to roughly equal survival/success rates at higher cognitive cost.`;
    const zh = `捕食者眼 ${pred},猎物眼 ${prey},清晰度 ${clarity},压力 ${pressure}。捕食成功 ${predScore},猎物存活 ${preyScore},神经漂移 ${nerScore},拟态 ${camScore},速度 ${speedScore},分化 ${cladeScore}。注意:当捕食者与猎物的眼复杂度同时上升,神经复杂度随之上升,但任一方都不会"胜出"——军备竞赛收敛于大致相等的存活/成功率,代价是更高的认知开销。`;
    document.getElementById("simReadout").innerHTML = `<span lang="en">${en}</span><span lang="zh">${zh}</span>`;
  }
  ["simPredator", "simPrey", "simClarity", "simPressure"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("input", runSim);
  });
  runSim();

  // ─── Module 05 · Species ─────────────────────────────────────────
  const species = [
    {
      nameEn: "Human",
      nameZh: "人",
      latin: "Homo sapiens",
      ico: `<svg viewBox="0 0 80 80"><ellipse cx="40" cy="40" rx="32" ry="20" fill="#13161c" stroke="#e9e6dc" stroke-width="1"/><ellipse cx="40" cy="40" rx="20" ry="20" fill="#d49a3a"/><circle cx="40" cy="40" r="8" fill="#0a0c10"/><circle cx="35" cy="36" r="3" fill="#e9e6dc" opacity="0.85"/></svg>`,
      stats: [["Type", "Camera eye", "类型"], ["Photoreceptors", "3 cone types", "感光"], ["Acuity", "Very high (~1 arcmin)", "敏锐"]],
      descEn: `Single-lens vertebrate camera eye with foveal central vision. The retina is &quot;inverted&quot; — light passes through the wiring before reaching the photoreceptors — a vertebrate inheritance, not a design choice.`,
      descZh: `脊椎动物单晶状体相机型眼,中央凹处分辨率最高。视网膜"倒装"——光须先穿过神经线层才到达感光细胞——为脊椎动物的演化遗产,而非设计选择。`
    },
    {
      nameEn: "Octopus",
      nameZh: "章鱼",
      latin: "Octopus vulgaris",
      ico: `<svg viewBox="0 0 80 80"><ellipse cx="40" cy="40" rx="32" ry="22" fill="#13161c" stroke="#5fc8d4" stroke-width="1"/><ellipse cx="40" cy="40" rx="22" ry="16" fill="#d49a3a"/><rect x="32" y="36" width="16" height="8" rx="2" fill="#0a0c10"/></svg>`,
      stats: [["Type", "Camera eye (cephalopod)", "类型"], ["Photoreceptors", "1 type (mostly)", "感光"], ["Notable", "Right-side-up retina", "特色"]],
      descEn: `Independently evolved camera eye with a horizontal-slit pupil. The retina is &quot;forward-facing&quot; — no inverted wiring, no blind spot. Likely colour-blind in the conventional sense; may use polarization &amp; pupil-shape chromatic aberration.`,
      descZh: `独立演化的相机型眼,瞳孔为水平裂状。视网膜"正向":无倒装、无盲点。常规意义上很可能为色盲;但可能利用偏振光与瞳孔形状的色差进行颜色感知。`
    },
    {
      nameEn: "Dragonfly",
      nameZh: "蜻蜓",
      latin: "Anisoptera",
      ico: `<svg viewBox="0 0 80 80"><g fill="none" stroke="#9376ff" stroke-width="0.9"><circle cx="20" cy="22" r="6"/><circle cx="32" cy="20" r="6"/><circle cx="44" cy="22" r="6"/><circle cx="56" cy="22" r="6"/><circle cx="22" cy="34" r="6"/><circle cx="36" cy="34" r="6"/><circle cx="50" cy="34" r="6"/><circle cx="62" cy="34" r="6"/><circle cx="20" cy="48" r="6"/><circle cx="34" cy="48" r="6"/><circle cx="48" cy="48" r="6"/><circle cx="62" cy="48" r="6"/><circle cx="26" cy="60" r="6"/><circle cx="40" cy="60" r="6"/><circle cx="54" cy="60" r="6"/></g></svg>`,
      stats: [["Type", "Compound eye", "类型"], ["Ommatidia", "~30,000 per eye", "小眼数"], ["Notable", "Near-360° awareness", "特色"]],
      descEn: `Two compound eyes covering nearly the entire sphere of vision. Low spatial acuity per ommatidium, but extraordinary motion-detection — temporal resolution roughly four times faster than humans.`,
      descZh: `两只复眼几乎覆盖整个球面视野。每小眼分辨率低,但运动探测能力惊人——时间分辨率约为人类的四倍。`
    },
    {
      nameEn: "Trilobite",
      nameZh: "三叶虫",
      latin: "Trilobita † (extinct)",
      ico: `<svg viewBox="0 0 80 80"><ellipse cx="40" cy="40" rx="34" ry="22" fill="#1d2129" stroke="#d49a3a" stroke-width="1"/><circle cx="22" cy="38" r="8" fill="#0a0c10"/><circle cx="58" cy="38" r="8" fill="#0a0c10"/><circle cx="22" cy="38" r="3" fill="#d49a3a"/><circle cx="58" cy="38" r="3" fill="#d49a3a"/><line x1="22" y1="46" x2="22" y2="58" stroke="#d49a3a" stroke-width="1"/><line x1="58" y1="46" x2="58" y2="58" stroke="#d49a3a" stroke-width="1"/></svg>`,
      stats: [["Type", "Calcite-lens compound", "类型"], ["Era", "Cambrian → Permian", "时期"], ["Notable", "Mineral lenses!", "特色"]],
      descEn: `The first animals known to have eyes. Trilobite eyes used calcite crystals — the same mineral as their carapace — as transparent lenses. The geometry of these lenses corrected for spherical aberration in a way Descartes would later re-derive mathematically.`,
      descZh: `已知最早具备眼睛的动物。三叶虫的眼睛以方解石——与外骨骼相同的矿物——作为透明透镜。这些透镜的几何形状校正了球差,笛卡尔在多年后才以数学方式重新推导出来。`
    },
    {
      nameEn: "Jumping spider",
      nameZh: "跳蛛",
      latin: "Salticidae",
      ico: `<svg viewBox="0 0 80 80"><ellipse cx="40" cy="50" rx="30" ry="22" fill="#13161c" stroke="#9376ff" stroke-width="1"/><circle cx="28" cy="40" r="9" fill="#0a0c10"/><circle cx="52" cy="40" r="9" fill="#0a0c10"/><circle cx="28" cy="40" r="5" fill="#d49a3a"/><circle cx="52" cy="40" r="5" fill="#d49a3a"/><circle cx="20" cy="32" r="3" fill="#0a0c10"/><circle cx="60" cy="32" r="3" fill="#0a0c10"/></svg>`,
      stats: [["Type", "8 simple eyes", "类型"], ["Photoreceptors", "Includes UV", "感光"], ["Notable", "Tiered visual system", "特色"]],
      descEn: `Eight eyes arranged in tiers. The two large forward-facing &quot;principal&quot; eyes have a movable retina, giving them image sharpness rivaling that of much larger animals. The other six provide motion detection across the periphery.`,
      descZh: `八只眼分层排列。前向两只大型"主眼"具可移动的视网膜,其图像锐度堪与大得多的动物相比;其余六只眼提供周边运动探测。`
    },
    {
      nameEn: "Mantis shrimp",
      nameZh: "螳螂虾",
      latin: "Stomatopoda",
      ico: `<svg viewBox="0 0 80 80"><ellipse cx="40" cy="40" rx="32" ry="22" fill="#13161c" stroke="#5fc8d4" stroke-width="1"/><ellipse cx="28" cy="34" rx="10" ry="14" fill="#d49a3a"/><ellipse cx="52" cy="34" rx="10" ry="14" fill="#d49a3a"/><line x1="28" y1="20" x2="28" y2="48" stroke="#0a0c10" stroke-width="1.5"/><line x1="52" y1="20" x2="52" y2="48" stroke="#0a0c10" stroke-width="1.5"/></svg>`,
      stats: [["Type", "Trinocular compound", "类型"], ["Photoreceptors", "12–16 types", "感光"], ["Notable", "Polarization vision", "特色"]],
      descEn: `Each eye is split into three regions, giving a single eye three views of the same scene. Famously has 12–16 photoreceptor classes, but psychophysical experiments suggest it discriminates colour worse than humans — using its receptors for fast classification, not fine discrimination.`,
      descZh: `每只眼分为三个区域,使一只眼对同一场景产生三个视角。著名地拥有 12–16 类感光细胞,但心理物理实验表明其颜色辨别能力反而不如人类——它用这些感光细胞进行快速分类,而非精细辨别。`
    }
  ];
  function renderSpecies() {
    const host = document.getElementById("speciesGrid");
    if (!host) return;
    host.innerHTML = species.map(s => `
      <div class="species">
        <div class="ico">${s.ico}</div>
        <div class="name"><span lang="en">${s.nameEn}</span><span lang="zh">${s.nameZh}</span></div>
        <div class="latin">${s.latin}</div>
        <div class="stat">
          ${s.stats.map(st => `<div><span lang="en">${st[0]}</span><span lang="zh">${st[2]}</span><span>${st[1]}</span></div>`).join("")}
        </div>
        <div class="desc"><span lang="en">${s.descEn}</span><span lang="zh">${s.descZh}</span></div>
      </div>
    `).join("");
  }
  renderSpecies();

  // ─── Module 06 · Color comparison ────────────────────────────────
  const colorRows = [
    ["Dichromat (most mammals · dog · cat)", "二色视(多数哺乳动物·犬·猫)", "2 cone types", "2 类视锥",
      "Limited red-green discrimination; sees blue and yellow well", "红绿辨别有限;蓝黄良好"],
    ["Trichromat (human · most primates)", "三色视(人·多数灵长)", "3 cone types", "3 类视锥",
      "Full daylight color vision in roughly the 380–700 nm range", "约 380–700 纳米范围内全色觉"],
    ["Tetrachromat (most birds · reptiles · many fish)", "四色视(多数鸟·爬行·鱼)", "4 cone types (incl. UV)", "4 类视锥(含紫外)",
      "Sees ultraviolet patterns invisible to humans (flowers, plumage)", "可见人类不可见的紫外图案(花、羽)"],
    ["Mantis shrimp", "螳螂虾", "12–16 photoreceptor classes", "12–16 类感光",
      "Polarization + UV; uses receptors for classification, not fine discrimination", "偏振 + 紫外;用于分类而非精细辨别"],
    ["Pit viper / boa", "蝰蛇 / 蟒", "Visible + thermal IR via pit organs", "可见 + 颊窝热红外",
      "Thermal infrared imaging at ~0.003 °C resolution", "约 0.003 °C 分辨率的热红外成像"],
    ["Cuttlefish", "墨鱼", "1 photoreceptor type (colour-blind)", "1 类感光(色盲)",
      "Yet displays elaborate color camouflage — likely uses chromatic aberration + polarization", "却展现复杂的颜色拟态——很可能利用色差 + 偏振"]
  ];
  function renderColorTable() {
    const tbody = document.querySelector("#color .comp-table tbody");
    if (!tbody) return;
    tbody.innerHTML = colorRows.map(r => `
      <tr>
        <td><span lang="en">${r[0]}</span><span lang="zh">${r[1]}</span></td>
        <td><span lang="en">${r[2]}</span><span lang="zh">${r[3]}</span></td>
        <td><span lang="en">${r[4]}</span><span lang="zh">${r[5]}</span></td>
      </tr>
    `).join("");
  }
  renderColorTable();

  // ─── Module 07 · Consciousness cards ─────────────────────────────
  const consciousnessCards = [
    {
      kicker: ["Blindsight", "盲视"],
      titleEn: "Seeing without seeing",
      titleZh: "在'看不见'之中看见"
,
      bodyEn: `Patients with V1 damage report no conscious vision in the affected field — yet can correctly guess the location of objects placed there. Visual processing continues without phenomenal awareness. The case has shaped how neuroscience thinks about consciousness as a separate process from raw perception.`,
      bodyZh: `V1 损伤的患者报告其受影响视野内无意识视觉——却能正确猜出该处放置物体的位置。视觉处理持续进行,但无现象意识。该案例塑造了神经科学对"意识"作为独立于原初感知的过程的理解。`,
      cls: "neural"
    },
    {
      kicker: ["Optical illusions", "视错觉"],
      titleEn: "When prediction wins over data",
      titleZh: "当预测压过数据"
,
      bodyEn: `The Müller-Lyer arrows, the checker-shadow illusion, the dress — all exploit the gap between what photons hit the retina and what the cortex predicts. Illusions are not perceptual failures; they are perceptual fingerprints, revealing the priors the brain holds.`,
      bodyZh: `Müller-Lyer 箭头、棋盘阴影错觉、那件"裙子"——皆利用了"视网膜上抵达的光子"与"皮层所预测之物"之间的差距。视错觉并非感知失败,而是感知指纹,揭示大脑所持的先验信念。`,
      cls: "iris"
    },
    {
      kicker: ["Dreams", "梦"],
      titleEn: "Vision without input",
      titleZh: "无输入的视觉",
      bodyEn: `REM sleep activates the visual cortex with no incoming photons. The same circuits that build perception during the day construct dream imagery at night. This is one reason dreams are so often vivid: the cortex is doing what it always does, just unconstrained by retinal data.`,
      bodyZh: `REM 睡眠在没有任何外部光子的情况下激活视觉皮层。白天构建感知的同一回路,在夜里构建梦境影像。这是梦境通常如此鲜明的原因之一:皮层在做它平常所做之事,只是未被视网膜数据约束。`,
      cls: "retina"
    },
    {
      kicker: ["Open question", "未决问题"],
      titleEn: "Why does seeing feel like anything?",
      titleZh: "为何'看见'感觉起来像什么"
,
      bodyEn: `The hard problem of consciousness remains open. We can describe the neural correlates of seeing-red but not why the activity feels red rather than just being a state. We mark this as unresolved rather than offering false closure.`,
      bodyZh: `意识的"困难问题"仍未解决。我们能描述"看见红色"的神经关联,却不能说明为何这一神经活动"感觉是红色",而非仅仅是一种状态。我们标注此点未决,而不假装已有定论。`,
      cls: "blood"
    }
  ];
  renderCards("consciousnessCards", consciousnessCards);

  // ─── Module 08 · Culture cards ───────────────────────────────────
  const cultureCards = [
    {
      kicker: ["~30,000 BP", "约公元前 3 万年"],
      titleEn: "Cave paintings",
      titleZh: "洞穴壁画",
      bodyEn: `Chauvet, Lascaux, Altamira. The first known external storage of visual experience. Once a horse seen on the plain could be drawn on a wall and re-viewed by anyone, vision became socially shareable across time.`,
      bodyZh: `肖维、拉斯科、阿尔塔米拉。已知最早的视觉经验外部存储。一旦平原上看到的马可以画在墙上、被任何人再次观看,视觉便在时间中变得社会可共享。`,
      cls: "iris"
    },
    {
      kicker: ["~1300 CE", "约公元 1300 年"],
      titleEn: "Linear perspective",
      titleZh: "线性透视",
      bodyEn: `Brunelleschi formalizes one-point perspective; the Renaissance learns to render three dimensions on two. The technique is a cognitive prosthetic — it externalizes a calculation the visual cortex was already performing internally.`,
      bodyZh: `布鲁内莱斯基将单点透视法系统化;文艺复兴学会在两维上呈现三维。这是一种认知假体——把视觉皮层内部本已在执行的计算外部化。`,
      cls: "neural"
    },
    {
      kicker: ["1839", "1839"],
      titleEn: "Photography",
      titleZh: "摄影"
,
      bodyEn: `Daguerre fixes a chemical image. Suddenly visual evidence is mechanical, not testimonial. Within a century, the camera reorganizes journalism, science, war, family, and identity. The visual record becomes a primary historical source.`,
      bodyZh: `达盖尔将化学影像固定下来。视觉证据骤然由机械产出,不再仅靠口耳相传。一个世纪内,相机重组了新闻、科学、战争、家庭与身份。视觉记录成为主要的历史史料。`,
      cls: "retina"
    },
    {
      kicker: ["Today", "今"],
      titleEn: "Generative imagery",
      titleZh: "生成式图像"
,
      bodyEn: `Diffusion models can synthesize photorealistic images from text prompts. The cultural shift is comparable to photography&apos;s arrival, but inverted: where photography promised "this happened", generative imagery undoes that guarantee. We are still adapting.`,
      bodyZh: `扩散模型可由文字提示合成照片级图像。其文化冲击堪比摄影问世,却方向相反:摄影承诺"此事发生过";生成式图像撤销该保证。我们仍在适应。`,
      cls: "leaf"
    }
  ];
  renderCards("cultureCards", cultureCards);

  // ─── Module 09 · AI vision cards ─────────────────────────────────
  const aiVisionCards = [
    {
      kicker: ["Convergence", "结构性收敛"],
      titleEn: "Hierarchical features",
      titleZh: "层级化特征",
      bodyEn: `Both biological V1 and the early layers of trained convolutional networks discover edge-orientation filters. Both biological IT cortex and the deeper layers of vision transformers discover object-class representations. The convergence is structural and is one of the strongest empirical bridges between neuroscience and machine learning.`,
      bodyZh: `生物 V1 与训练后的卷积网络早期层均自发产生边缘朝向滤波器;生物下颞叶皮层(IT)与视觉 Transformer 的深层均自发产生物体类别表示。这一结构性收敛是神经科学与机器学习之间最强的经验桥梁之一。`,
      cls: "iris"
    },
    {
      kicker: ["Divergence", "结构性分岔"],
      titleEn: "Sample efficiency",
      titleZh: "样本效率"
,
      bodyEn: `A child needs roughly one to ten exposures to learn a new visual category. A frontier vision model often needs millions. The sample-efficiency gap remains enormous and is the strongest argument that biological and artificial vision are doing different things at the algorithmic level — not just different things at the substrate level.`,
      bodyZh: `儿童学会一个新视觉类别约需 1 至 10 次接触;一个前沿视觉模型往往需要数百万次。样本效率差距仍极其巨大,这是生物与人工视觉在"算法层面"做不同事情的最强论据——而不仅是"基底层面"不同。`,
      cls: "neural"
    },
    {
      kicker: ["Adversarial", "对抗"],
      titleEn: "Different failure modes",
      titleZh: "不同的失败模式",
      bodyEn: `Vision models can be fooled by imperceptible pixel perturbations — adversarial examples — that humans see right through. Humans are fooled by optical illusions and gestalt phenomena that models often handle correctly. The two systems share many successes but disagree sharply on which inputs are catastrophically misleading.`,
      bodyZh: `视觉模型可被人类难以察觉的像素扰动——对抗样本——欺骗;人类则被视错觉与格式塔现象欺骗,而模型常能正确处理。两套系统的成功多有重合,在"哪些输入会带来灾难性误导"上则严重分歧。`,
      cls: "blood"
    },
    {
      kicker: ["Surveillance", "监控"],
      titleEn: "The civilizational stake",
      titleZh: "文明层面的代价",
      bodyEn: `Computer vision at scale is now deployed in city CCTV networks, border crossings, retail loss-prevention, and personal devices. The technology is dual-use; its civilizational implications depend on policy, not capability. We name this directly rather than treating it as a side-effect.`,
      bodyZh: `规模化的计算机视觉如今部署于城市监控、边境通关、零售防损与个人设备。该技术具双重用途,其文明意涵取决于政策而非能力。我们直陈,不当作"副作用"处理。`,
      cls: "leaf"
    }
  ];
  renderCards("aiVisionCards", aiVisionCards);

  // ─── Module 10 · Future cards ────────────────────────────────────
  const futureCards = [
    {
      kicker: ["Retinal implant", "视网膜植入"],
      titleEn: "Already partially restoring sight",
      titleZh: "已部分恢复视力",
      bodyEn: `Argus II and successor systems use a small camera, a microelectrode array on the retina, and a wireless transmitter. Resolution is currently low — tens to hundreds of pixels — but the door is open. Optogenetic approaches add light-sensitivity to surviving cells without electrodes.`,
      bodyZh: `Argus II 及后继系统由小型相机、视网膜上的微电极阵列与无线发射器组成。当前分辨率较低——数十至数百像素——但通路已开。光遗传学方法可不用电极,即让残余细胞获得感光能力。`,
      cls: "iris"
    },
    {
      kicker: ["Augmented reality", "增强现实"],
      titleEn: "Adding to what eyes already see",
      titleZh: "在眼睛已见之上叠加"
,
      bodyEn: `AR overlays do not replace vision; they extend it with computed information. The honest framing is mundane: AR is glasses with a screen attached. The interesting question is which information to show, when, and to whom.`,
      bodyZh: `增强现实不替代视觉,只在其上叠加计算信息。诚实的框架其实平淡:AR 不过是带屏幕的眼镜。有趣的问题是何时、向谁、显示哪些信息。`,
      cls: "retina"
    },
    {
      kicker: ["Brain-machine interface", "脑机接口"],
      titleEn: "Bypassing the eye",
      titleZh: "绕过眼睛"
,
      bodyEn: `In principle a BMI can stimulate the visual cortex directly, producing visual experience without retinal input. Early human cortex-stimulation experiments (Dobelle, 1970s; later groups) showed crude phosphenes. Resolution remains far below biological vision and ethical questions are deep.`,
      bodyZh: `原则上脑机接口可直接刺激视觉皮层,在无视网膜输入下产生视觉体验。早期人类皮层刺激实验(Dobelle,1970 年代;后续团队)已诱发出粗糙的"光斑"。分辨率仍远低于生物视觉,伦理问题亦极深远。`,
      cls: "neural"
    },
    {
      kicker: ["Honest framing", "诚实立场"],
      titleEn: "Not utopian, not dystopian",
      titleZh: "既非乌托邦亦非反乌托邦",
      bodyEn: `Synthetic vision will be partial, expensive, distributionally uneven, and slower to mature than the press cycle suggests. That is not a reason to dismiss it; that is the actual shape of how technologies of this scale arrive. We track progress at the level of peer-reviewed clinical results, not demos.`,
      bodyZh: `合成视觉将是部分性的、昂贵的、分配不均的,其成熟速度低于宣传周期所暗示。这并非否定它的理由——而是此类规模技术真实的到来方式。我们以同行评审的临床结果为衡量,而非演示视频。`,
      cls: "leaf"
    }
  ];
  renderCards("futureCards", futureCards);

  // ─── AI Biologist ────────────────────────────────────────────────
  const aiCanned = [
    {
      qEn: "Did eyes really evolve more than once?",
      qZh: "眼睛真的独立演化过多次吗?",
      aEn: `<p><em>Biologist · structural answer</em></p>
        <p>Yes — the molecular and morphological evidence is unusually clear here.</p>
        <p>At the deep level, all known animal eyes use opsin proteins descended from a single common ancestor that lived before the Cambrian. So the <em>photoreceptor</em> evolved once.</p>
        <p>But the <em>eye as an organ</em> — the architecture that focuses light onto receptors — has evolved independently somewhere between forty and sixty times across animal lineages. The vertebrate camera eye and the cephalopod (octopus, squid) camera eye are the most striking case: they look almost identical externally but are wired differently inside, betraying their independent origin.</p>
        <p>Compound eyes, pinhole eyes, mirror eyes (in scallops!), and several other architectures arose independently. This is one of the cleanest examples of convergent evolution in biology.</p>`,
      aZh: `<p><em>生物学家 · 结构性答复</em></p>
        <p>是——分子与形态证据在此异常清晰。</p>
        <p>深层上,所有已知动物眼睛皆使用同源于寒武纪之前共同祖先的视蛋白。因此<em>感光细胞</em>只演化过一次。</p>
        <p>但作为器官的<em>眼睛</em>——把光聚焦到感光细胞上的架构——在动物谱系中独立演化过约 40 至 60 次。脊椎动物相机型眼与头足类(章鱼、乌贼)的相机型眼是最惊人案例:外观几乎相同,内部接线方式则不同,显示其独立起源。</p>
        <p>复眼、针孔眼、镜面眼(扇贝!)以及若干其他架构皆为独立兴起。这是生物学中趋同演化最干净的案例之一。</p>`
    },
    {
      qEn: "Why does the human retina seem &quot;backwards&quot;?",
      qZh: "为何人类的视网膜似乎'装反了'?",
      aEn: `<p><em>Biologist · honest answer</em></p>
        <p>It is a real evolutionary peculiarity, not a feature.</p>
        <p>In the vertebrate retina, light has to pass through layers of nerve fibres and supporting cells before reaching the photoreceptors. Worse, the optic-nerve fibres bundle together and exit through the retina, creating the blind spot.</p>
        <p>The cephalopod retina is the opposite: photoreceptors point toward the light, the nerve fibres are behind them, and there is no blind spot. Functionally cleaner. Evolutionarily, this happened because the vertebrate retina developed as an outgrowth of the brain, while the cephalopod retina developed from skin tissue. Different starting points, different shape.</p>
        <p>We compensate for the human retina&apos;s wiring with neural processing — the brain fills in the blind spot, and the support cells contain wave-guiding fibres that route light through. It works; it is not optimized.</p>`,
      aZh: `<p><em>生物学家 · 诚实答复</em></p>
        <p>这是真实的演化怪癖,而非"特性"。</p>
        <p>在脊椎动物视网膜中,光必须穿过神经纤维与支持细胞层才能到达感光细胞;更糟的是,视神经纤维聚拢成束并从视网膜内穿出,形成盲点。</p>
        <p>头足类视网膜则相反:感光细胞朝向光线,神经纤维在其后,无盲点。功能上更干净。演化上,脊椎动物视网膜源于大脑外突,头足类视网膜源于皮肤组织,起点不同,形态不同。</p>
        <p>我们用神经处理补偿人类视网膜的接线方式——大脑填补盲点,支持细胞内含波导纤维引导光线穿过。它能用,但并未"最优化"。</p>`
    },
    {
      qEn: "What does a mantis shrimp actually see?",
      qZh: "螳螂虾究竟看到什么?",
      aEn: `<p><em>Biologist · specific answer</em></p>
        <p>Less than the popular story suggests, and in a different way than we initially assumed.</p>
        <p>Mantis shrimp have between twelve and sixteen photoreceptor classes — a remarkable count compared with our three. But behavioural experiments by Marshall, Thoen, and colleagues (2014) showed that mantis shrimp are <em>worse</em> than humans at fine colour discrimination.</p>
        <p>The current best hypothesis: rather than mixing channels for fine discrimination (as humans do), they classify colours into bins very fast — analogous to a hardware lookup table. This may be optimal for an animal that has to decide quickly whether a thing is prey, predator, or mate, in a coral environment with thousands of bright colours.</p>
        <p>They also see polarized light, including circularly polarized light — a channel no other animal is known to use. So in some dimensions they see <em>more</em>; in others, <em>less</em>; in fine discrimination, simply differently.</p>`,
      aZh: `<p><em>生物学家 · 具体答复</em></p>
        <p>比通俗说法所暗示的少,且方式不同于我们最初假定。</p>
        <p>螳螂虾有 12 至 16 类感光细胞——相比人类的 3 类已是惊人。但 Marshall、Thoen 等人 (2014) 的行为实验表明,螳螂虾在精细颜色辨别上反而<em>不如</em>人类。</p>
        <p>当前最佳假说:它们并不像人类那样混合通道以求精细辨别,而是把颜色快速分箱——类比硬件查找表。对一种身处珊瑚环境(色彩繁多)、必须快速判断猎物/捕食者/配偶的动物而言,这或许才是最优策略。</p>
        <p>它们还能看到偏振光,包括圆偏振光——这一通道目前无其他动物已知使用。因此在某些维度上它们看到的<em>更多</em>,某些维度<em>更少</em>,精细辨别上则简单地不同。</p>`
    },
    {
      qEn: "Did eyes drive the Cambrian explosion?",
      qZh: "眼睛是否驱动了寒武纪大爆发?",
      aEn: `<p><em>Biologist · contested answer</em></p>
        <p>The hypothesis is real and influential, but contested.</p>
        <p>Andrew Parker&apos;s &quot;Light Switch&quot; theory (2003) proposed that the appearance of complex eyes in trilobites about 540 million years ago triggered a sudden, intense predator-prey arms race that drove the Cambrian diversification. The timing fits: trilobite eyes appear early in the Cambrian.</p>
        <p>Counter-arguments: (1) the Cambrian explosion has many candidate causes (oxygen levels, calcium chemistry, ecological cascades); (2) many Cambrian diversification events involved animals without eyes; (3) the molecular timeline of opsin diversification predates the Cambrian by tens of millions of years.</p>
        <p>The honest summary: vision was almost certainly part of the Cambrian story, but probably not the single switch. Treat the &quot;Light Switch&quot; hypothesis as one strong factor among several, not as the explanation.</p>`,
      aZh: `<p><em>生物学家 · 有争议的答复</em></p>
        <p>该假说真实存在且具影响力,但有争议。</p>
        <p>Andrew Parker 的"光开关"理论 (2003) 主张:约 5.4 亿年前三叶虫复杂眼的出现,触发了一次剧烈而突然的捕食-猎物军备竞赛,驱动寒武纪辐射。时间吻合:三叶虫眼睛出现在寒武纪早期。</p>
        <p>反驳:(1) 寒武纪大爆发候选成因众多(氧含量、钙化学、生态级联);(2) 许多寒武纪辐射涉及无眼动物;(3) 视蛋白分化的分子时间线早于寒武纪数千万年。</p>
        <p>诚实概述:视觉几乎必然是寒武纪故事的一部分,但可能并非单一"开关"。把"光开关"假说视为多个强因素之一,而非"那个解释"。</p>`
    },
    {
      qEn: "Will artificial vision replace biological vision?",
      qZh: "人工视觉会替代生物视觉吗?",
      aEn: `<p><em>Biologist · cautious answer</em></p>
        <p>For the foreseeable future: no, in the way the question usually means.</p>
        <p>Artificial vision is now better than biological vision at narrow tasks: reading license plates, scanning manufacturing defects, certain medical imaging. It is still much worse at general scene understanding, sample efficiency, robustness to novelty, energy efficiency, and integration with embodied action.</p>
        <p>The gap that matters most is energy. The human visual system uses about 20 watts to do everything we do. Frontier vision models use kilowatts to hours-of-compute for inference at far less generality. That gap is a hard physical constraint, not a software problem.</p>
        <p>What is likely instead: hybrid systems where artificial vision augments biological vision (AR overlays, retinal implants, microscopes, telescopes, automated diagnostic tools) and where each does what it is suited for. The frame of &quot;replacement&quot; is the wrong question.</p>`,
      aZh: `<p><em>生物学家 · 审慎答复</em></p>
        <p>在可见的未来:就此问题通常的意思而言,答案是不。</p>
        <p>人工视觉如今在狭窄任务上已胜过生物视觉:读车牌、扫描制造缺陷、某些医学影像。但在通用场景理解、样本效率、对新颖性的鲁棒性、能耗效率,以及与具身行动的整合上,仍远不如生物视觉。</p>
        <p>最关键的差距是能耗:人类视觉系统大约 20 瓦完成我们所做的一切;前沿视觉模型仅作推理便消耗数千瓦或小时级算力,且通用性远低。这一差距是硬物理约束,不是软件问题。</p>
        <p>可能的实际情形是:混合系统——人工视觉增强生物视觉(AR 叠加、视网膜植入、显微镜、望远镜、自动诊断工具),各司其能。"替代"的框架本身,就是错的问题。</p>`
    }
  ];

  function renderPrompts() {
    const host = document.getElementById("aiPrompts");
    if (!host) return;
    host.innerHTML = aiCanned.map((c, i) => `
      <button class="ai-prompt" data-idx="${i}">
        <span lang="en">${c.qEn}</span><span lang="zh">${c.qZh}</span>
      </button>
    `).join("");
    host.querySelectorAll(".ai-prompt").forEach(b => {
      b.addEventListener("click", () => {
        const idx = +b.dataset.idx;
        const c = aiCanned[idx];
        document.getElementById("aiOutput").innerHTML =
          `<span lang="en">${c.aEn}</span><span lang="zh">${c.aZh}</span>`;
      });
    });
  }
  renderPrompts();

  function freeTextAnswer(qRaw) {
    const q = qRaw.toLowerCase();
    const lang = root.getAttribute("data-lang") || "en";

    const matches = [];
    aiCanned.forEach(c => {
      const en = c.qEn.toLowerCase();
      const zh = c.qZh;
      let score = 0;
      en.split(/\s+/).forEach(w => { if (w.length > 3 && q.includes(w)) score++; });
      [...zh].forEach(ch => { if (q.includes(ch)) score++; });
      if (score) matches.push({ c, score });
    });
    matches.sort((a, b) => b.score - a.score);
    if (matches.length && matches[0].score >= 2) {
      return lang === "zh" ? matches[0].c.aZh : matches[0].c.aEn;
    }

    const topics = [
      { kw: ["opsin", "视蛋白"],
        en: `Opsins are light-sensitive proteins. They embed in the cell membrane of photoreceptors and change shape when struck by a photon, triggering a signaling cascade. All known animal opsins descend from a single ancestral opsin that predates the Cambrian — so although eyes evolved many times, the underlying photoreceptor molecule evolved only once.`,
        zh: `视蛋白是感光性蛋白。它嵌入感光细胞的细胞膜,被光子撞击时改变构象,触发信号级联。所有已知动物的视蛋白皆同源于寒武纪之前的一个祖先视蛋白——因此眼睛虽多次独立演化,底层的感光分子仅演化一次。` },
      { kw: ["rod", "cone", "视杆", "视锥"],
        en: `Rods are highly sensitive in low light but contribute no colour information. Cones are less sensitive but specialized for colour vision. Humans have ~120 million rods and ~6 million cones. The cones cluster densely at the fovea — the central pit responsible for our high-acuity reading and recognition vision.`,
        zh: `视杆细胞在暗光下高度敏感,但不提供颜色信息;视锥细胞敏感性较低,专司颜色视觉。人类约有 1.2 亿视杆与 600 万视锥。视锥密集集中于中央凹——负责我们高分辨率阅读与识别的中央凹陷。` },
      { kw: ["color", "颜色", "colour"],
        en: `Colour is computed by the brain from the relative responses of different photoreceptor types. It is not a property of light itself; light has wavelength. The phenomenon called colour is real but constructed. Different species with different photoreceptor sets compute different colour spaces over the same physical world.`,
        zh: `颜色是大脑由不同感光细胞类型的相对响应计算得出。它并非光本身的属性——光只有波长。"颜色"现象真实,但为构造产物。不同物种凭借不同的感光细胞组合,在同一物理世界上计算出不同的颜色空间。` },
      { kw: ["consciousness", "意识"],
        en: `The relationship between vision and consciousness is one of the most debated questions in neuroscience. Vision can occur without conscious awareness (blindsight) and conscious imagery can occur without vision (dreams, hallucination). The current best framing is that vision and consciousness are related but separable processes — and the &quot;why does it feel like anything&quot; question remains genuinely open.`,
        zh: `视觉与意识的关系是神经科学最具争议的问题之一。视觉可在无意识下发生(盲视),意识图像可在无视觉下发生(梦、幻觉)。当前最佳框架认为:视觉与意识相关但可分离——而"为何它感觉起来像什么"仍真正悬而未决。` }
    ];
    for (const t of topics) {
      if (t.kw.some(k => q.includes(k.toLowerCase()))) {
        return lang === "zh" ? `<p><em>生物学家 · 主题答复</em></p><p>${t.zh}</p>` : `<p><em>Biologist · topic answer</em></p><p>${t.en}</p>`;
      }
    }

    return lang === "zh"
      ? `<p><em>生物学家 · 一般答复</em></p>
         <p>这一问题没有直接对应的预设回答。我会从演化记录、分子生物学与神经科学三方向重新组合,但不会输出目的论或"高/低等"物种的伪科学。</p>
         <p>把问题落实到具体物种、具体阶段或具体感官通道,我能给出更结构化的回答。</p>`
      : `<p><em>Biologist · general answer</em></p>
         <p>I do not have a directly matching canned answer. I will reason from the evolutionary record, molecular biology, and neuroscience — but I will not produce teleology or &quot;higher/lower&quot; species pseudoscience.</p>
         <p>Ground the question in a specific species, stage, or sensory channel and I can answer more structurally.</p>`;
  }

  document.getElementById("aiSend").addEventListener("click", () => {
    const v = document.getElementById("aiInput").value.trim();
    if (!v) return;
    document.getElementById("aiOutput").innerHTML = freeTextAnswer(v);
  });
  document.getElementById("aiInput").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("aiSend").click();
  });

})();
