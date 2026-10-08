// The reference's construction drawing: a full cross-section of the Marabu
// community hub, organised in twelve stage groups (data-stage="1".."12") plus
// temporary works (crane, scaffold, bracing, materials) that appear mid-build.
// Converted from reference/marabu-html/home_page.htm (#villaSvg) to JSX; the
// geometry is unchanged. Strokes are drawn by ConstructionEngine on scroll.
// Decorative: the parent backdrop is aria-hidden.

export default function ConstructionDrawing() {
  return (
    <svg
      data-construction=""
      viewBox="0 0 1440 940"
      preserveAspectRatio="xMidYMid meet"
      className="construction-drawing"
    >
        {/* ══ S1 · SETTING OUT ══ */}
        <g data-stage="1">
          <path className="st" d="M60 800 C 400 794, 900 804, 1380 797"/>
          <path className="thin" d="M100 806 l13 15 M210 806 l13 15 M320 806 l13 15 M430 806 l13 15 M540 806 l13 15 M650 806 l13 15 M760 806 l13 15 M870 806 l13 15 M980 806 l13 15 M1090 806 l13 15 M1200 806 l13 15 M1310 806 l13 15"/>
          <path className="fade thin dashed" d="M280 84 V800 M480 84 V800 M680 84 V800 M880 84 V800 M1080 84 V800 M1280 84 V800"/>
          <circle className="st" cx="280" cy="60" r="14"/><circle className="st" cx="480" cy="60" r="14"/><circle className="st" cx="680" cy="60" r="14"/><circle className="st" cx="880" cy="60" r="14"/><circle className="st" cx="1080" cy="60" r="14"/><circle className="st" cx="1280" cy="60" r="14"/>
          <text className="fade" x="280" y="65" textAnchor="middle" style={{ fontSize: 16 }}>A</text>
          <text className="fade" x="480" y="65" textAnchor="middle" style={{ fontSize: 16 }}>B</text>
          <text className="fade" x="680" y="65" textAnchor="middle" style={{ fontSize: 16 }}>C</text>
          <text className="fade" x="880" y="65" textAnchor="middle" style={{ fontSize: 16 }}>D</text>
          <text className="fade" x="1080" y="65" textAnchor="middle" style={{ fontSize: 16 }}>E</text>
          <text className="fade" x="1280" y="65" textAnchor="middle" style={{ fontSize: 16 }}>F</text>
          <path className="thin" d="M232 761 V792 M232 792 L224 800 M232 792 L240 800 M232 768 L222 778 M232 768 L242 778"/>
          <circle className="thin" cx="232" cy="754" r="7"/>
          <path className="gs" d="M200 752 V800 M194 752 h12 M194 800 h12 M200 800 l8 -10 M200 752 l8 10"/>
          <text className="fade" x="56" y="676" style={{ fontSize: 16 }}>HUMAN SCALE — 1.8 m</text>
          <path className="fade gs" d="M150 682 L198 750"/>
          <path className="gs" d="M150 735 h-24 M138 735 l-6 8 l6 8"/>
          <circle className="gs" cx="150" cy="735" r="5"/>
          <text className="fade" x="86" y="760" style={{ fontSize: 16 }}>BM ±0.00</text>
          <text className="fade" x="1060" y="58" style={{ fontSize: 26 }}>PROJECT: MARABU COMMUNITY HUB</text>
          <path className="gs" d="M1060 72 H1400"/>
          <text className="fade" x="1060" y="98" style={{ fontSize: 17 }}>SECTION A–A · LOOKING NORTH</text>
          <text className="fade" x="1060" y="122" style={{ fontSize: 14 }}>DRG MC-2025-142 · SCALE 1:100 · OCT 2025</text>
          <circle className="thin" cx="1408" cy="150" r="16"/>
          <path className="gs" d="M1408 164 V136 M1408 136 l-5 9 M1408 136 l5 9"/>
          <text className="fade" x="1408" y="126" textAnchor="middle" style={{ fontSize: 16 }}>N</text>
          <path className="st" d="M280 898 H1280 M280 892 V904 M480 892 V904 M680 892 V904 M880 892 V904 M1080 892 V904 M1280 892 V904"/>
          <path className="gs" d="M280 898 l10 -10 M1280 898 l-10 -10"/>
          <text className="fade" x="780" y="920" textAnchor="middle" style={{ fontSize: 15 }}>STRUCTURAL GRID — 6 × 2000 = 12 000</text>
        </g>
    
        {/* ══ S2 · FOUNDATIONS ══ */}
        <g data-stage="2">
          <path className="fade thin dashed" d="M256 814 H1304 V876 H256 Z"/>
          <rect className="st" x="248" y="840" width="64" height="24"/><rect className="st" x="448" y="840" width="64" height="24"/><rect className="st" x="648" y="840" width="64" height="24"/><rect className="st" x="1048" y="840" width="64" height="24"/><rect className="st" x="1248" y="840" width="64" height="24"/>
          <path className="thin" d="M272 840 V824 M278 840 V822 M286 840 V824 M292 840 V822 M472 840 V824 M478 840 V822 M486 840 V824 M492 840 V822 M672 840 V824 M678 840 V822 M686 840 V824 M692 840 V822 M1072 840 V824 M1078 840 V822 M1086 840 V824 M1092 840 V822 M1272 840 V824 M1278 840 V822 M1286 840 V824 M1292 840 V822"/>
          <path className="st" d="M240 868 H1320"/>
          <text className="fade" x="56" y="838" style={{ fontSize: 16 }}>PAD FOOTING 2400×2400 TYP.</text>
          <path className="fade gs" d="M215 844 L250 852"/>
          <text className="fade" x="1240" y="892" textAnchor="end" style={{ fontSize: 14 }}>BLINDING — 100 mm</text>
        </g>
    
        {/* ══ S3 · FRAME TO +4.50 ══ */}
        <g data-stage="3">
          <path className="st" d="M272 832 V655 M288 832 V655 M472 832 V655 M488 832 V655 M672 832 V655 M688 832 V655 M1072 832 V655 M1088 832 V655 M1272 832 V655 M1288 832 V655"/>
          <path className="st" d="M280 660 H680 M280 670 H680 M1080 660 H1280 M1080 670 H1280"/>
          <rect className="st" x="268" y="652" width="24" height="8"/><rect className="st" x="668" y="652" width="24" height="8"/><rect className="st" x="1068" y="652" width="24" height="8"/><rect className="st" x="1268" y="652" width="24" height="8"/>
          <circle className="thin" cx="280" cy="656" r="2.5"/><circle className="thin" cx="680" cy="656" r="2.5"/><circle className="thin" cx="1080" cy="656" r="2.5"/><circle className="thin" cx="1280" cy="656" r="2.5"/>
          <path className="gs" d="M256 660 H284 M270 652 L280 660 L270 668 Z"/>
          <text className="fade" x="252" y="650" textAnchor="end" style={{ fontSize: 15 }}>+4.50</text>
          <path className="gs" d="M170 660 V800 M164 660 h12 M164 800 h12 M170 800 l8 -10 M170 660 l8 10"/>
          <text className="fade" x="158" y="734" textAnchor="end" style={{ fontSize: 15 }}>4500</text>
        </g>
    
        {/* ══ S4 · FRAME TO +13.50 ══ */}
        <g data-stage="4">
          <path className="st" d="M272 655 V515 M288 655 V515 M472 655 V515 M488 655 V515 M672 655 V515 M688 655 V515 M1072 655 V515 M1088 655 V515 M1272 655 V515 M1288 655 V515 M272 515 V375 M288 515 V375 M472 515 V375 M488 515 V375 M672 515 V375 M688 515 V375 M1072 515 V375 M1088 515 V375 M1272 515 V375 M1288 515 V375"/>
          <path className="st" d="M280 520 H680 M280 530 H680 M1080 520 H1280 M1080 530 H1280"/>
          <rect className="st" x="268" y="512" width="24" height="8"/><rect className="st" x="668" y="512" width="24" height="8"/><rect className="st" x="1068" y="512" width="24" height="8"/><rect className="st" x="1268" y="512" width="24" height="8"/>
          <circle className="thin" cx="280" cy="516" r="2.5"/><circle className="thin" cx="680" cy="516" r="2.5"/><circle className="thin" cx="1080" cy="516" r="2.5"/><circle className="thin" cx="1280" cy="516" r="2.5"/>
          <path className="st" d="M280 380 H680 M280 390 H680 M1080 380 H1280 M1080 390 H1280"/>
          <rect className="st" x="268" y="372" width="24" height="8"/><rect className="st" x="668" y="372" width="24" height="8"/><rect className="st" x="1068" y="372" width="24" height="8"/><rect className="st" x="1268" y="372" width="24" height="8"/>
          <circle className="thin" cx="280" cy="384" r="2.5"/><circle className="thin" cx="680" cy="384" r="2.5"/><circle className="thin" cx="1080" cy="384" r="2.5"/><circle className="thin" cx="1280" cy="384" r="2.5"/>
          <path className="gs" d="M256 520 H284 M270 512 L280 520 L270 528 Z M256 380 H284 M270 372 L280 380 L270 388 Z"/>
          <text className="fade" x="252" y="510" textAnchor="end" style={{ fontSize: 15 }}>+9.00</text>
          <text className="fade" x="252" y="370" textAnchor="end" style={{ fontSize: 15 }}>+13.50</text>
          <path className="gs" d="M170 520 V660 M164 520 h12 M164 660 h12 M170 660 l8 -10 M170 520 l8 10 M170 380 V520 M164 380 h12 M164 520 h12 M170 520 l8 -10 M170 380 l8 10"/>
          <text className="fade" x="158" y="596" textAnchor="end" style={{ fontSize: 15 }}>4500</text>
          <text className="fade" x="158" y="456" textAnchor="end" style={{ fontSize: 15 }}>4500</text>
        </g>
    
        {/* ══ S5 · TOPPING OUT +22.50 ══ */}
        <g data-stage="5">
          <path className="st" d="M272 375 V235 M288 375 V235 M472 375 V235 M488 375 V235 M672 375 V235 M688 375 V235 M1072 375 V235 M1088 375 V235 M1272 375 V235 M1288 375 V235"/>
          <path className="st" d="M280 240 H680 M280 250 H680 M1080 240 H1280 M1080 250 H1280"/>
          <rect className="st" x="268" y="232" width="24" height="8"/><rect className="st" x="668" y="232" width="24" height="8"/><rect className="st" x="1068" y="232" width="24" height="8"/><rect className="st" x="1268" y="232" width="24" height="8"/>
          <circle className="thin" cx="280" cy="236" r="2.5"/><circle className="thin" cx="680" cy="236" r="2.5"/><circle className="thin" cx="1080" cy="236" r="2.5"/><circle className="thin" cx="1280" cy="236" r="2.5"/>
          <path className="gs" style={{ strokeWidth: 2.6 }} d="M688 246 H1072 M688 254 H1072"/>
          <path className="gs" d="M256 240 H284 M270 232 L280 240 L270 248 Z"/>
          <text className="fade" x="252" y="230" textAnchor="end" style={{ fontSize: 15 }}>+22.50</text>
          <path className="gs" d="M170 240 V380 M164 240 h12 M164 380 h12 M170 380 l8 -10 M170 240 l8 10"/>
          <text className="fade" x="158" y="316" textAnchor="end" style={{ fontSize: 15 }}>4500</text>
          <text className="fade" x="56" y="300" style={{ fontSize: 18 }}>LAST BEAM — PAINTED GOLD</text>
          <path className="fade gs" d="M215 306 L690 250"/>
        </g>
    
        {/* ══ S6 · CORE, LIFT, STAIRS & RAMP ══ */}
        <g data-stage="6">
          <path className="st" d="M1084 240 V800 M1160 240 V800"/>
          <rect className="st" x="1092" y="748" width="26" height="52"/>
          <path className="thin" d="M1100 748 V252 M1108 748 V252 M1118 250 V795"/>
          <path className="thin" d="M1126 795 L1156 728 M1156 728 L1126 663 M1126 658 L1156 591 M1156 591 L1126 523 M1126 518 L1156 451 M1156 451 L1126 383 M1126 378 L1156 311 M1156 311 L1126 245"/>
          <rect className="st" x="1084" y="208" width="76" height="32"/>
          <text className="fade" x="1122" y="228" textAnchor="middle" style={{ fontSize: 14 }}>MACHINE RM</text>
          <text className="fade" x="1122" y="540" textAnchor="middle" style={{ fontSize: 15 }} transform="rotate(-90 1122 540)">UTILITY CORE — LIFTS · STAIRS</text>
          <path className="thin" d="M716 798 L1016 392 M731 798 L1031 392 M729 780 H744 M751 750 H766 M773 720 H788 M796 690 H811 M822 660 H837 M840 630 H855 M862 600 H877 M885 570 H900 M907 540 H922 M929 510 H944 M951 480 H966 M973 450 H988 M999 420 H1014"/>
          <text className="fade" x="940" y="600" textAnchor="middle" style={{ fontSize: 16 }}>RAMP — 1:12</text>
          <path className="fade gs" d="M940 606 L880 640"/>
        </g>
    
        {/* ══ S7 · THE ATRIUM ══ */}
        <g data-stage="7">
          <path className="st" d="M680 240 L880 172 L1080 240"/>
          <path className="st" d="M680 250 L880 182 L1080 250"/>
          <path className="thin" d="M730 223 V233 M780 206 V216 M830 189 V199 M880 172 V182 M930 189 V199 M980 206 V216 M1030 223 V233"/>
          <path className="thin" d="M686 660 V630 M694 660 V630 M684 630 H706 M1066 660 V630 M1074 660 V630 M1064 630 H1086 M686 520 V490 M694 520 V490 M684 490 H706 M1066 520 V490 M1074 520 V490 M1064 490 H1086 M686 380 V350 M694 380 V350 M684 350 H706 M1066 380 V350 M1074 380 V350 M1064 350 H1086"/>
          <text className="fade" x="880" y="150" textAnchor="middle" style={{ fontSize: 20 }}>PUBLIC ATRIUM — 15 m CEILING</text>
          <path className="fade gs" d="M880 156 V170"/>
          <text className="fade" x="880" y="440" textAnchor="middle" style={{ fontSize: 22 }}>the building&rsquo;s living room</text>
        </g>
    
        {/* ══ S8 · FIT-OUT ══ */}
        <g data-stage="8">
          <path className="thin" d="M490 670 V800 M490 530 V660 M490 390 V520 M490 250 V380"/>
          <rect className="thin" x="310" y="770" width="170" height="10"/>
          <rect className="thin" x="370" y="700" width="60" height="24"/>
          <path className="thin" d="M400 700 V676"/>
          <rect className="thin" x="566" y="752" width="74" height="10"/>
          <rect className="thin" x="554" y="758" width="14" height="16"/><rect className="thin" x="638" y="758" width="14" height="16"/>
          <path className="gs" d="M600 676 V690 M592 702 L600 690 L608 702"/>
          <rect className="thin" x="1172" y="762" width="90" height="10"/>
          <rect className="thin" x="1236" y="748" width="14" height="14"/>
          <circle className="thin" cx="1180" cy="782" r="6"/><circle className="thin" cx="1204" cy="782" r="6"/><circle className="thin" cx="1228" cy="782" r="6"/>
          <path className="thin" d="M310 560 H480 M310 600 H480 M310 640 H480"/>
          <path className="thin" d="M318 560 V548 M334 560 V546 M350 560 V549 M366 560 V547 M318 600 V588 M334 600 V586 M350 600 V589 M366 600 V587 M318 640 V628 M334 640 V626 M350 640 V629 M366 640 V627"/>
          <rect className="thin" x="566" y="596" width="74" height="10"/>
          <rect className="thin" x="554" y="602" width="14" height="16"/><rect className="thin" x="638" y="602" width="14" height="16"/>
          <path className="gs" d="M600 530 V544 M592 556 L600 544 L608 556"/>
          <rect className="thin" x="1186" y="584" width="60" height="10"/>
          <rect className="thin" x="1174" y="590" width="14" height="16"/><rect className="thin" x="1244" y="590" width="14" height="16"/>
          <rect className="thin" x="1170" y="545" width="30" height="24"/>
          <rect className="thin" x="312" y="470" width="58" height="8"/><rect className="thin" x="392" y="470" width="58" height="8"/>
          <rect className="thin" x="326" y="486" width="14" height="16"/><rect className="thin" x="406" y="486" width="14" height="16"/>
          <rect className="thin" x="332" y="448" width="22" height="20"/><rect className="thin" x="412" y="448" width="22" height="20"/>
          <rect className="thin" x="540" y="494" width="100" height="10"/>
          <path className="thin" d="M540 494 V468"/>
          <rect className="thin" x="600" y="508" width="40" height="8"/>
          <rect className="thin" x="1180" y="470" width="50" height="8"/>
          <rect className="thin" x="1192" y="486" width="14" height="16"/>
          <rect className="thin" x="306" y="300" width="44" height="34"/><rect className="thin" x="306" y="344" width="30" height="26"/>
          <rect className="thin" x="560" y="366" width="30" height="14"/>
          <circle className="thin" cx="575" cy="356" r="8"/>
          <path className="thin" d="M1180 380 L1226 380 L1220 356 L1186 356 Z M1240 380 L1278 380 L1272 356 L1246 356 Z"/>
          <path className="thin" d="M1203 356 q-6 -16 2 -28 M1203 356 q10 -14 18 -22 M1259 356 q-6 -14 2 -26 M1259 356 q8 -12 16 -20"/>
          <text className="fade" x="395" y="752" textAnchor="middle" style={{ fontSize: 15 }}>KITCHEN</text>
          <text className="fade" x="610" y="718" textAnchor="middle" style={{ fontSize: 15 }}>DINING</text>
          <text className="fade" x="1218" y="738" textAnchor="middle" style={{ fontSize: 14 }}>CAFÉ</text>
          <text className="fade" x="395" y="542" textAnchor="middle" style={{ fontSize: 15 }}>LIBRARY</text>
          <text className="fade" x="610" y="578" textAnchor="middle" style={{ fontSize: 14 }}>READING</text>
          <text className="fade" x="1224" y="552" textAnchor="middle" style={{ fontSize: 14 }}>MEETING</text>
          <text className="fade" x="395" y="438" textAnchor="middle" style={{ fontSize: 15 }}>CO-WORKING</text>
          <text className="fade" x="610" y="455" textAnchor="middle" style={{ fontSize: 14 }}>LOUNGE</text>
          <text className="fade" x="1218" y="438" textAnchor="middle" style={{ fontSize: 13 }}>WORKSPACE</text>
          <text className="fade" x="395" y="310" textAnchor="middle" style={{ fontSize: 15 }}>GALLERY</text>
          <text className="fade" x="1218" y="326" textAnchor="middle" style={{ fontSize: 14 }}>TERRACE</text>
        </g>
    
        {/* ══ S9 · ROOF GARDEN ══ */}
        <g data-stage="9">
          <path className="st" d="M284 240 V206 M676 240 V206 M280 206 H680 M1084 240 V206 M1276 240 V206 M1080 206 H1280"/>
          <path className="st" d="M340 240 C 380 186, 600 186, 640 240"/>
          <path className="st" d="M348 250 C 386 198, 594 198, 632 250"/>
          <path className="thin" d="M380 212 V240 M420 196 V240 M460 188 V240 M500 186 V240 M540 190 V240 M580 202 V240"/>
          <rect className="thin" x="488" y="208" width="32" height="32"/>
          <rect className="thin" x="566" y="226" width="50" height="8"/>
          <path className="thin" d="M570 234 V240 M612 234 V240"/>
          <path className="thin" d="M655 240 V216"/>
          <circle className="thin" cx="648" cy="204" r="16"/><circle className="thin" cx="664" cy="206" r="13"/><circle className="thin" cx="655" cy="190" r="15"/>
          <path className="thin" d="M296 240 q4 -14 10 -14 q6 0 8 14"/>
          <path className="thin" d="M1100 240 L1140 240 L1134 220 L1106 220 Z M1170 240 L1210 240 L1204 220 L1176 220 Z"/>
          <path className="thin" d="M1120 220 q-6 -16 2 -28 M1120 220 q10 -12 18 -20 M1190 220 q-6 -14 2 -26 M1190 220 q8 -12 16 -20"/>
          <path className="thin" d="M1245 202 V232 M1245 232 L1238 240 M1245 232 L1252 240 M1245 210 L1236 220 M1245 210 L1254 218"/>
          <circle className="thin" cx="1245" cy="196" r="6"/>
          <path className="thin" d="M1272 188 V206 M1272 206 q-16 4 -18 20 M1272 198 L1262 204"/>
          <circle className="thin" cx="1272" cy="182" r="6"/>
          <circle className="fillg" cx="1260" cy="202" r="3"/>
          <text className="fade" x="490" y="168" textAnchor="middle" style={{ fontSize: 17 }}>ROOF GARDEN — GREENHOUSE</text>
          <text className="fade" x="1180" y="180" textAnchor="middle" style={{ fontSize: 20 }}>a park, five storeys up</text>
        </g>
    
        {/* ══ S10 · SERVICES & LOAD PATH ══ */}
        <g data-stage="10">
          <path className="fade thin dashed" d="M310 678 H670 M310 686 H670 M380 686 V696 M460 686 V696 M540 686 V696 M620 686 V696 M310 538 H670 M310 546 H670 M380 546 V556 M460 546 V556 M540 546 V556 M620 546 V556 M310 398 H670 M310 406 H670 M380 406 V416 M460 406 V416 M540 406 V416 M620 406 V416 M310 258 H670 M310 266 H670 M380 266 V276 M460 266 V276 M540 266 V276 M620 266 V276 M1170 678 H1266 M1170 686 H1266 M1170 538 H1266 M1170 546 H1266 M1170 398 H1266 M1170 406 H1266 M1170 258 H1266 M1170 266 H1266 M1163 252 V795"/>
          <path className="fade gs dashed" d="M660 246 V820 M660 820 l-8 -12 M660 820 l8 -12 M1100 246 V820 M1100 820 l-8 -12 M1100 820 l8 -12"/>
          <text className="fade" x="56" y="240" style={{ fontSize: 16 }}>MECH. — FRESH AIR DUCTS</text>
          <path className="fade gs" d="M210 246 L305 258"/>
          <text className="fade" x="56" y="420" style={{ fontSize: 17 }}>LOAD PATH — ROOF TO FOOTING</text>
          <path className="fade gs" d="M215 426 L656 470"/>
        </g>
    
        {/* ══ S11 · LIFE ══ */}
        <g data-stage="11">
          <path className="thin" d="M760 763 V792 M760 792 L752 800 M760 792 L768 800 M760 770 L750 780 M760 770 L770 780"/>
          <circle className="thin" cx="760" cy="756" r="7"/>
          <path className="thin" d="M805 763 V792 M805 792 L797 800 M805 792 L813 800 M805 772 L816 784"/>
          <circle className="thin" cx="805" cy="756" r="7"/>
          <rect className="thin" x="816" y="784" width="14" height="12"/>
          <path className="thin" d="M858 772 V792 M858 792 L852 800 M858 792 L864 800 M858 776 L866 782"/>
          <circle className="thin" cx="858" cy="766" r="6"/>
          <path className="thin" d="M866 782 L936 586"/>
          <path className="gs" d="M940 560 L952 584 L940 608 L928 584 Z M940 560 L940 608 M928 584 H952"/>
          <path className="thin" d="M600 569 V592 M600 592 q-14 2 -16 16 M600 575 L616 588"/>
          <circle className="thin" cx="600" cy="562" r="7"/>
          <rect className="thin" x="616" y="584" width="20" height="14"/>
          <path className="thin" d="M420 455 V492 M420 492 L414 520 M420 492 L426 520 M420 466 L438 472"/>
          <circle className="thin" cx="420" cy="448" r="7"/>
          <path className="thin" d="M694 786 h20 M696 792 V800 M701 792 V800 M711 792 V800 M716 792 V800 M694 786 l-7 -9 M718 780 q6 -2 8 4"/>
          <circle className="thin" cx="717" cy="779" r="5"/>
          <path className="thin" d="M713 774 l-3 -6"/>
          <path className="thin" d="M1330 800 V740"/>
          <circle className="thin" cx="1318" cy="724" r="20"/><circle className="thin" cx="1342" cy="726" r="17"/><circle className="thin" cx="1330" cy="704" r="21"/>
          <circle className="fillg" cx="1322" cy="718" r="3"/><circle className="fillg" cx="1338" cy="722" r="3"/><circle className="fillg" cx="1330" cy="700" r="3"/>
          <path className="gs" d="M740 752 V800 M734 752 h12 M734 800 h12"/>
          <text className="fade" x="726" y="780" textAnchor="end" style={{ fontSize: 14 }}>1.8 m</text>
          <text className="fade" x="900" y="716" textAnchor="middle" style={{ fontSize: 26 }}>welcome, everyone !</text>
        </g>
    
        {/* ══ S12 · HANDOVER ══ */}
        <g data-stage="12">
          <path className="st" d="M296 206 V168"/>
          <path className="fillg" d="M296 170 L326 178 L296 188 Z"/>
          <g className="fade" transform="rotate(-7 200 690)">
            <rect className="gs" x="110" y="660" width="190" height="58"/>
            <rect className="thin" x="116" y="666" width="178" height="46"/>
            <text x="205" y="688" textAnchor="middle" style={{ fontSize: 20 }}>HANDED OVER</text>
            <text x="205" y="708" textAnchor="middle" style={{ fontSize: 14 }}>MARABU · 2025</text>
          </g>
          <path className="fade thin" d="M900 120 l10 -8 l10 8 M960 100 l9 -7 l9 7"/>
        </g>
    
        {/* ══ TEMP BRACING (window) ══ */}
        <g data-part="bracingG" style={{ opacity: 0 }}>
          <path className="thin" d="M688 660 L1072 520 M1072 660 L688 520 M688 520 L1072 380 M1072 520 L688 380 M688 380 L1072 240 M1072 380 L688 240"/>
          <text x="880" y="470" textAnchor="middle" style={{ fontSize: 15 }}>TEMP BRACING — TO BE REMOVED</text>
        </g>
    
        {/* ══ SCAFFOLD (window) ══ */}
        <g data-part="scaffoldG" style={{ opacity: 0 }}>
          <path className="thin" d="M252 800 V250 M268 800 V250 M252 690 H268 M252 580 H268 M252 470 H268 M252 360 H268 M252 250 H268 M252 690 L268 580 M252 580 L268 470 M252 470 L268 360 M252 360 L268 250"/>
        </g>
    
        {/* ══ MATERIALS YARD (window) ══ */}
        <g data-part="materialsG" style={{ opacity: 0 }}>
          <path className="st" d="M1300 762 H1420 M1300 768 H1420"/>
          <path className="thin" d="M1308 750 H1412 M1308 756 H1412 M1300 762 L1308 756 M1420 762 L1412 756 M1340 738 V762 M1360 738 V762 M1340 738 H1360 M1340 762 H1360 M1350 738 V762"/>
          <rect className="thin" x="1376" y="772" width="26" height="6"/><rect className="thin" x="1408" y="772" width="26" height="6"/>
        </g>
    
        {/* ══ TOWER CRANE (window · animated) ══ */}
        <g data-part="craneC" style={{ opacity: 0 }}>
          <rect className="st" x="156" y="800" width="44" height="12"/>
          <path className="st" d="M170 800 V150 M186 800 V150"/>
          <polyline className="thin" points="170,788 186,766 170,744 186,722 170,700 186,678 170,656 186,634 170,612 186,590 170,568 186,546 170,524 186,502 170,480 186,458 170,436 186,414 170,392 186,370 170,348 186,326 170,304 186,282 170,260 186,238 170,216 186,194 170,172 186,162"/>
          <path className="st" d="M170 150 L178 118 M186 150 L178 118"/>
          <path className="st" d="M96 152 H770 M96 160 H770"/>
          <path className="thin" d="M178 118 L104 148 M178 118 L764 148"/>
          <rect className="st" x="100" y="160" width="40" height="26"/>
          <rect className="st" data-part="trolleyC" x="400" y="162" width="18" height="8"/>
          <line className="thin" data-part="cableC" x1="409" y1="170" x2="409" y2="520"/>
          <g data-part="hookC" transform="translate(409,520)">
            <circle className="gs" cx="0" cy="0" r="4.5"/>
            <rect className="st" x="-5" y="4" width="10" height="8"/>
            <path className="thin" d="M0 12 V20 M0 20 q4 6 8 0"/>
          </g>
        </g>
    </svg>
  );
}
