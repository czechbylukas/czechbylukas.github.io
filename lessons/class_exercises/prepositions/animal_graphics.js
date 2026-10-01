(function() {
    function renderAnimalSvgGraphics(animalKey, pose, accessoryKey, accessoryOffset) {
      let bodyHtml = "";

      // DOG
      if (animalKey === "pes") {
        if (pose === "sitting") {
          bodyHtml = `
            <path d="M-15,10 Q-25,4 -20,-6" fill="none" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="-3" cy="7" rx="17" ry="19" fill="#d97706"/>
            <ellipse cx="-10" cy="19" rx="8" ry="5" fill="#b45309"/>
            <path d="M4,15 L4,25 M13,12 L13,24" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
            <circle cx="12" cy="-12" r="12" fill="#f59e0b"/>
            <path d="M5,-20 Q-2,-29 -1,-14 Q2,-7 8,-10 Z" fill="#92400e"/>
            <ellipse cx="21" cy="-7" rx="9" ry="6" fill="#fef3c7"/>
            <circle cx="27" cy="-10" r="2.2" fill="#451a03"/>
            <circle cx="16" cy="-15" r="1.6" fill="#1c1917"/>
            <path d="M18,-2 Q22,1 26,-2" fill="none" stroke="#78350f" stroke-width="1.5" stroke-linecap="round"/>
          `;
        } else if (pose === "standing") {
          bodyHtml = `
            <path d="M-17,-1 Q-29,-8 -25,-19" fill="none" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="-1" cy="0" rx="21" ry="12" fill="#d97706"/>
            <path d="M-13,8 L-15,22 M-4,9 L-4,22 M10,8 L11,22 M18,6 L20,20" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
            <circle cx="16" cy="-10" r="11" fill="#f59e0b"/>
            <path d="M10,-19 Q4,-28 5,-14 Q7,-7 12,-9 Z" fill="#92400e"/>
            <ellipse cx="24" cy="-5" rx="8" ry="5.5" fill="#fef3c7"/>
            <circle cx="30" cy="-8" r="2" fill="#451a03"/>
            <circle cx="20" cy="-13" r="1.6" fill="#1c1917"/>
            <path d="M23,0 Q27,3 30,0" fill="none" stroke="#78350f" stroke-width="1.5" stroke-linecap="round"/>
          `;
        } else if (pose === "running") {
          bodyHtml = `
            <path d="M-17,-1 Q-29,-10 -30,-20" fill="none" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="0" cy="0" rx="22" ry="11" fill="#d97706"/>
            <path d="M-12,6 L-25,16 M-4,8 L-12,20 M9,7 L23,15 M15,4 L27,8" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
            <circle cx="18" cy="-10" r="10" fill="#f59e0b"/>
            <path d="M12,-18 Q5,-27 7,-13 Q9,-6 14,-9 Z" fill="#92400e"/>
            <ellipse cx="26" cy="-5" rx="8" ry="5" fill="#fef3c7"/>
            <circle cx="32" cy="-8" r="2" fill="#451a03"/>
            <circle cx="22" cy="-13" r="1.5" fill="#1c1917"/>
            <path d="M25,0 Q29,3 32,0" fill="none" stroke="#78350f" stroke-width="1.5" stroke-linecap="round"/>
          `;
        } else if (pose === "jumping") {
          bodyHtml = `
            <g transform="rotate(-12)">
              <path d="M-17,-1 Q-30,-10 -29,-19" fill="none" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
              <ellipse cx="0" cy="0" rx="21" ry="11" fill="#d97706"/>
              <path d="M-12,6 L-24,17 M-4,8 L-13,20 M9,7 L23,0 M15,5 L26,-3" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
              <circle cx="18" cy="-10" r="10" fill="#f59e0b"/>
              <path d="M12,-18 Q5,-27 7,-13 Q9,-6 14,-9 Z" fill="#92400e"/>
              <ellipse cx="26" cy="-5" rx="8" ry="5" fill="#fef3c7"/>
              <circle cx="32" cy="-8" r="2" fill="#451a03"/>
              <circle cx="22" cy="-13" r="1.5" fill="#1c1917"/>
            </g>
          `;
        } else { // lying
          bodyHtml = `
            <path d="M-18,6 Q-30,1 -27,-8" fill="none" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="-1" cy="7" rx="23" ry="9" fill="#d97706"/>
            <path d="M-13,13 L-23,16 M-4,14 L-13,17 M8,14 L17,17" stroke="#92400e" stroke-width="4" stroke-linecap="round"/>
            <circle cx="18" cy="2" r="10" fill="#f59e0b"/>
            <path d="M12,-6 Q5,-15 7,-1 Q9,6 14,3 Z" fill="#92400e"/>
            <ellipse cx="26" cy="6" rx="8" ry="5" fill="#fef3c7"/>
            <circle cx="32" cy="3" r="2" fill="#451a03"/>
            <circle cx="22" cy="-1" r="1.5" fill="#1c1917"/>
          `;
        }
      }

      // CAT
      else if (animalKey === "kocka") {
        if (pose === "sitting") {
          bodyHtml = `
            <path d="M-10,9 Q-27,15 -20,1 Q-17,-5 -12,-2" fill="none" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="0" cy="9" rx="13" ry="18" fill="#94a3b8"/>
            <path d="M-7,20 L-7,24 M7,20 L7,24" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
            <circle cx="2" cy="-10" r="13" fill="#cbd5e1"/>
            <path d="M-9,-17 L-12,-29 L-1,-22 Z M8,-20 L17,-29 L17,-14 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M-8,-11 Q-4,-16 0,-11 M5,-11 Q9,-16 13,-11" fill="none" stroke="#166534" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M2,-6 L5,-4 L8,-6 Z" fill="#ec4899"/>
            <path d="M5,-4 Q2,0 -1,-1 M5,-4 Q8,0 11,-1" fill="none" stroke="#475569" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M-3,-4 L-15,-6 M-3,-2 L-15,-2 M11,-4 L20,-6 M11,-2 L20,-2" stroke="#64748b" stroke-width="1" stroke-linecap="round"/>
          `;
        } else if (pose === "standing") {
          bodyHtml = `
            <path d="M-16,-2 Q-28,-14 -23,-24 Q-18,-28 -15,-20" fill="none" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="-2" cy="0" rx="19" ry="12" fill="#94a3b8"/>
            <path d="M-12,8 L-13,21 M-4,9 L-4,21 M8,8 L9,21 M16,6 L17,19" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
            <circle cx="15" cy="-11" r="12" fill="#cbd5e1"/>
            <path d="M7,-19 L5,-30 L14,-23 Z M17,-22 L26,-30 L25,-16 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
            <ellipse cx="19" cy="-12" rx="2.2" ry="3.3" fill="#16a34a"/><ellipse cx="19" cy="-12" rx="0.8" ry="2.5" fill="#0f172a"/>
            <ellipse cx="28" cy="-6" rx="6" ry="4" fill="#e2e8f0"/><path d="M25,-4 L30,-4" stroke="#ec4899" stroke-width="2"/>
            <path d="M24,-2 L32,0 M24,0 L32,3" stroke="#64748b" stroke-width="1" stroke-linecap="round"/>
          `;
        } else if (pose === "running") {
          bodyHtml = `
            <path d="M-15,-3 Q-30,-19 -32,-7 Q-32,0 -24,1" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
            <ellipse cx="-1" cy="0" rx="20" ry="10" fill="#94a3b8"/>
            <path d="M-12,5 L-25,16 M-5,8 L-13,21 M8,5 L20,14 M14,2 L27,7" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
            <circle cx="16" cy="-10" r="11" fill="#cbd5e1"/>
            <path d="M9,-18 L7,-28 L15,-21 Z M18,-20 L27,-27 L25,-14 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
            <ellipse cx="20" cy="-11" rx="2" ry="3" fill="#16a34a"/><circle cx="20" cy="-11" r="0.8" fill="#0f172a"/>
            <ellipse cx="29" cy="-5" rx="6" ry="4" fill="#e2e8f0"/><circle cx="34" cy="-7" r="1.8" fill="#ec4899"/>
          `;
        } else if (pose === "jumping") {
          bodyHtml = `
            <g transform="rotate(-22)">
              <path d="M-15,-3 Q-28,-16 -33,-10" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
              <ellipse cx="-1" cy="1" rx="19" ry="10" fill="#94a3b8"/>
              <path d="M-12,5 L-25,18 M-5,8 L-18,21 M8,5 L20,-7 M14,2 L28,-9" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
              <circle cx="16" cy="-10" r="11" fill="#cbd5e1"/>
              <path d="M9,-18 L7,-28 L15,-21 Z M18,-20 L27,-27 L25,-14 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
              <ellipse cx="20" cy="-11" rx="2" ry="3" fill="#16a34a"/><circle cx="20" cy="-11" r="0.8" fill="#0f172a"/>
              <ellipse cx="29" cy="-5" rx="6" ry="4" fill="#e2e8f0"/><circle cx="34" cy="-7" r="1.8" fill="#ec4899"/>
            </g>
          `;
        } else { // lying
          bodyHtml = `
            <path d="M-12,8 Q-29,20 -29,7 Q-27,-1 -18,1" fill="none" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="0" cy="9" rx="22" ry="10" fill="#94a3b8"/>
            <circle cx="15" cy="4" r="11" fill="#cbd5e1"/>
            <path d="M8,-3 L6,-13 L15,-7 Z M17,-6 L26,-12 L25,-1 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
            <path d="M11,4 Q14,7 17,4 M-5,13 Q-1,16 3,13" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
            <path d="M20,9 Q24,11 27,8" fill="none" stroke="#ec4899" stroke-width="1.5"/>
          `;
        }
      }

      // BIRD
      else if (animalKey === "ptak") {
        if (pose === "sitting") {
          bodyHtml = `
            <ellipse cx="0" cy="1" rx="14" ry="12" fill="#0ea5e9"/>
            <ellipse cx="-2" cy="5" rx="8" ry="7" fill="#7dd3fc"/>
            <circle cx="9" cy="-10" r="8" fill="#38bdf8"/>
            <path d="M6,-18 Q12,-24 16,-17" fill="#0369a1"/>
            <polygon points="16,-10 25,-7 16,-4" fill="#f59e0b"/>
            <circle cx="11" cy="-12" r="1.7" fill="#0f172a"/>
            <path d="M-12,-1 L-22,-8 L-18,4 Z" fill="#0369a1"/>
            <path d="M-3,12 L-3,17 M5,12 L5,17 M-7,17 L0,17 M1,17 L9,17" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
          `;
        } else if (pose === "standing") {
          bodyHtml = `
            <ellipse cx="0" cy="0" rx="12" ry="15" fill="#0ea5e9"/>
            <ellipse cx="-2" cy="4" rx="7" ry="8" fill="#7dd3fc"/>
            <circle cx="8" cy="-13" r="8" fill="#38bdf8"/>
            <path d="M5,-20 Q11,-27 15,-20" fill="#0369a1"/>
            <polygon points="15,-13 24,-10 15,-7" fill="#f59e0b"/>
            <circle cx="10" cy="-15" r="1.7" fill="#0f172a"/>
            <path d="M-10,-2 L-20,-8 L-16,4 Z" fill="#0369a1"/>
            <path d="M-4,13 L-5,23 M4,13 L5,23 M-9,23 L-1,23 M1,23 L9,23" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
          `;
        } else if (pose === "running") {
          bodyHtml = `
            <ellipse cx="-1" cy="1" rx="15" ry="10" fill="#0ea5e9"/>
            <ellipse cx="-3" cy="4" rx="8" ry="6" fill="#7dd3fc"/>
            <circle cx="11" cy="-9" r="7" fill="#38bdf8"/>
            <polygon points="17,-9 26,-6 17,-3" fill="#f59e0b"/>
            <circle cx="13" cy="-11" r="1.6" fill="#0f172a"/>
            <path d="M-12,-1 L-23,-8 L-19,4 Z" fill="#0369a1"/>
            <path d="M-7,7 L-19,14 M0,9 L-8,20 M5,7 L18,13 M8,5 L23,8" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
          `;
        } else if (pose === "jumping") {
          bodyHtml = `
            <g transform="rotate(-18)">
              <ellipse cx="-1" cy="1" rx="14" ry="10" fill="#0ea5e9"/>
              <ellipse cx="-3" cy="4" rx="8" ry="6" fill="#7dd3fc"/>
              <circle cx="11" cy="-9" r="7" fill="#38bdf8"/>
              <polygon points="17,-9 26,-6 17,-3" fill="#f59e0b"/>
              <circle cx="13" cy="-11" r="1.6" fill="#0f172a"/>
              <path d="M-12,-1 L-23,-8 L-19,4 Z" fill="#0369a1"/>
              <path d="M-7,7 L-18,17 M1,9 L-8,21 M5,7 L18,-1 M8,5 L23,-3" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
            </g>
          `;
        } else { // lying
          bodyHtml = `
            <ellipse cx="-1" cy="10" rx="20" ry="8" fill="#0ea5e9"/>
            <ellipse cx="-2" cy="11" rx="11" ry="5" fill="#7dd3fc"/>
            <circle cx="14" cy="5" r="8" fill="#38bdf8"/>
            <path d="M8,-2 Q14,-7 19,-1" fill="#0369a1"/>
            <polygon points="21,5 29,8 21,10" fill="#f59e0b"/>
            <path d="M12,3 Q14,5 16,3" fill="none" stroke="#0f172a" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M-17,9 L-25,4 L-23,13 Z" fill="#0369a1"/>
            <path d="M-3,16 L-8,19 M5,16 L10,19" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
          `;
        }
      }

      // SPIDER
      else if (animalKey === "spider") {
        const legsByPose = {
          sitting: "M-7,-5 L-17,-16 L-27,-15 M-8,-1 L-23,-7 L-31,-2 M-8,4 L-22,10 L-28,18 M-5,7 L-12,19 L-14,27 M7,-5 L17,-16 L27,-15 M8,-1 L23,-7 L31,-2 M8,4 L22,10 L28,18 M5,7 L12,19 L14,27",
          standing: "M-7,-5 L-18,-15 L-28,-14 M-8,-1 L-25,-5 L-32,1 M-8,4 L-25,12 L-31,21 M-5,7 L-16,22 L-17,29 M7,-5 L18,-15 L28,-14 M8,-1 L25,-5 L32,1 M8,4 L25,12 L31,21 M5,7 L16,22 L17,29",
          running: "M-7,-5 L-19,-19 L-30,-23 M-8,-1 L-26,-10 L-33,-6 M-8,4 L-27,8 L-34,15 M-5,7 L-20,18 L-27,27 M7,-5 L19,-19 L30,-23 M8,-1 L26,-10 L33,-6 M8,4 L27,8 L34,15 M5,7 L20,18 L27,27",
          jumping: "M-7,-5 L-19,-20 L-29,-25 M-8,-1 L-26,-14 L-34,-13 M-8,4 L-24,12 L-32,20 M-5,7 L-12,22 L-13,30 M7,-5 L19,-20 L29,-25 M8,-1 L26,-14 L34,-13 M8,4 L24,12 L32,20 M5,7 L12,22 L13,30",
          lying: "M-7,-5 Q-20,-19 -29,-10 M-8,-1 Q-25,-9 -32,-2 M-8,4 Q-26,10 -29,19 M-5,7 Q-13,19 -8,26 M7,-5 Q20,-19 29,-10 M8,-1 Q25,-9 32,-2 M8,4 Q26,10 29,19 M5,7 Q13,19 8,26"
        };
        const abdomenTransform = pose === "sitting" ? "translate(0, 0)" :
          pose === "standing" ? "translate(0, 1)" :
            pose === "running" ? "rotate(-12)" :
              pose === "jumping" ? "rotate(-28)" : "rotate(90)";
        const eyeMarkup = pose === "lying"
          ? `<path d="M-4,-9 Q0,-6 4,-9" fill="none" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>`
          : `<circle cx="-3" cy="-10" r="2" fill="#f8fafc"/><circle cx="3" cy="-10" r="2" fill="#f8fafc"/><circle cx="-3" cy="-10" r="1" fill="#0f172a"/><circle cx="3" cy="-10" r="1" fill="#0f172a"/>`;
        bodyHtml = `<g transform="${abdomenTransform}">
          <g fill="none" stroke="#1f2937" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="${legsByPose[pose]}"/></g>
          <ellipse cx="0" cy="5" rx="10" ry="13" fill="#334155" stroke="#0f172a" stroke-width="2"/>
          <circle cx="0" cy="-8" r="8" fill="#475569" stroke="#0f172a" stroke-width="2"/>
          ${eyeMarkup}
          <path d="M-3,-16 L-7,-21 M3,-16 L7,-21" stroke="#1f2937" stroke-width="1.5" stroke-linecap="round"/>
        </g>`;
      }
      // MOUSE
      else {
        const mouseBody = {
          sitting: `<ellipse cx="-2" cy="8" rx="12" ry="15" fill="#94a3b8"/><path d="M-7,19 L-10,24 M2,20 L5,24" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>`,
          standing: `<ellipse cx="-4" cy="2" rx="17" ry="10" fill="#94a3b8"/><path d="M-13,9 L-15,18 M-4,11 L-5,18 M5,9 L8,17" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>`,
          running: `<ellipse cx="-4" cy="2" rx="19" ry="9" fill="#94a3b8"/><path d="M-16,5 L-27,14 M-8,9 L-17,20 M2,8 L15,16 M6,5 L21,8" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>`,
          jumping: `<g transform="rotate(-22)"><ellipse cx="-4" cy="2" rx="17" ry="9" fill="#94a3b8"/><path d="M-15,5 L-27,17 M-7,9 L-19,22 M2,7 L15,-2 M7,4 L21,-6" stroke="#64748b" stroke-width="3" stroke-linecap="round"/></g>`,
          lying: `<ellipse cx="-4" cy="9" rx="19" ry="8" fill="#94a3b8"/><path d="M-13,14 L-21,17 M-2,16 L4,18" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>`
        }[pose];
        bodyHtml = `
          <path d="M-15,9 Q-31,16 -28,4 Q-26,-2 -21,0" fill="none" stroke="#d9778a" stroke-width="2.5" stroke-linecap="round"/>
          ${mouseBody}
          <circle cx="9" cy="-9" r="11" fill="#cbd5e1"/>
          <circle cx="2" cy="-18" r="6" fill="#94a3b8"/><circle cx="2" cy="-18" r="3.5" fill="#f9a8d4"/>
          <circle cx="13" cy="-19" r="5" fill="#94a3b8"/><circle cx="13" cy="-19" r="3" fill="#f9a8d4"/>
          <ellipse cx="19" cy="-5" rx="7" ry="5" fill="#e2e8f0"/>
          <circle cx="25" cy="-7" r="2" fill="#ef4444"/>
          <circle cx="13" cy="-11" r="1.7" fill="#0f172a"/>
          <path d="M20,-2 L29,0 M20,0 L29,3 M20,-4 L29,-4" stroke="#64748b" stroke-width="1" stroke-linecap="round"/>
        `;
      }

      // Accessory Overlays
      let accHtml = "";
      if (accessoryKey && accessoryKey !== "none") {
        const offset = accessoryOffset;
        if (accessoryKey === "glasses") {
          accHtml = `
            <g class="accessory-art" transform="translate(${offset.x}, ${offset.y})">
              <circle cx="-5" cy="0" r="6" stroke="#f59e0b" stroke-width="2" fill="rgba(255,255,255,0.4)"/>
              <circle cx="6" cy="0" r="6" stroke="#f59e0b" stroke-width="2" fill="rgba(255,255,255,0.4)"/>
              <line x1="-1" y1="0" x2="1" y2="0" stroke="#f59e0b" stroke-width="2"/>
              <line x1="-11" y1="-1" x2="-6" y2="0" stroke="#f59e0b" stroke-width="1.5"/>
            </g>
          `;
        } else if (accessoryKey === "hat") {
          accHtml = `
            <g class="accessory-art" transform="translate(${offset.x}, ${offset.y})">
              <path d="M-12,0 L12,0 L8,-16 L-8,-16 Z" fill="#dc2626"/>
              <rect x="-8" y="-4" width="16" height="4" fill="#facc15"/>
              <ellipse cx="0" cy="0" rx="15" ry="4" fill="#991b1b"/>
            </g>
          `;
        } else if (accessoryKey === "backpack") {
          accHtml = `
            <g class="accessory-art" transform="translate(${offset.x}, ${offset.y})">
              <path d="M-8,-10 Q-8,-15 0,-15 Q8,-15 8,-10 L9,8 Q8,12 0,12 Q-8,12 -9,8 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.5"/>
              <path d="M-5,-12 Q-5,-18 0,-18 Q5,-18 5,-12" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
              <path d="M-8,-6 Q-13,-5 -12,5 M8,-6 Q13,-5 12,5" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
              <rect x="-6" y="0" width="12" height="7" rx="2" fill="#60a5fa" stroke="#1e40af" stroke-width="1"/>
              <path d="M0,-9 L0,0 M-3,3 L-3,5 M3,3 L3,5" stroke="#dbeafe" stroke-width="1.3" stroke-linecap="round"/>
            </g>
          `;
        }
      }

      return `<g>${bodyHtml}${accHtml}</g>`;
    }

  window.renderAnimalSvgGraphics = renderAnimalSvgGraphics;
    function renderFurnitureSvgGraphics(type, state) {
      const isOpen = state === "open";

      switch (type) {
        case "stul":
          return `
            <rect x="-65" y="-10" width="130" height="14" rx="3" fill="#b45309" stroke="#78350f" stroke-width="2"/>
            <rect x="-55" y="4" width="12" height="45" fill="#92400e"/>
            <rect x="43" y="4" width="12" height="45" fill="#92400e"/>
            <rect x="-28" y="4" width="56" height="9" fill="#78350f" stroke="#713f12" stroke-width="1"/>
            ${isOpen ? `
              <path d="M-24,13 L-24,28 L-19,33 L19,33 L24,28 L24,13" fill="#78350f" stroke="#451a03" stroke-width="2"/>
              <rect x="-20" y="15" width="40" height="9" fill="#451a03"/>
              <rect x="-24" y="26" width="48" height="7" rx="1" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
              <circle cx="0" cy="29.5" r="1.6" fill="#fef3c7"/>
            ` : `<circle cx="0" cy="8.5" r="1.5" fill="#fef3c7"/>`}
          `;
        case "zidle":
          return `
            <path d="M-16,2 L-21,43 M15,2 L21,43 M-14,4 L-11,43 M12,4 L9,43" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
            <rect x="-22" y="-42" width="44" height="43" rx="7" fill="#a16207" stroke="#78350f" stroke-width="3"/>
            <path d="M-13,-35 L-13,-5 M0,-35 L0,-5 M13,-35 L13,-5" stroke="#d6a15d" stroke-width="2" stroke-linecap="round"/>
            <rect x="-25" y="-5" width="50" height="10" rx="4" fill="#b45309" stroke="#78350f" stroke-width="2"/>
          `;
        case "kreslo":
          return `
            <rect x="-35" y="-25" width="70" height="50" rx="10" fill="#be123c"/>
            <rect x="-42" y="-15" width="14" height="35" rx="5" fill="#9f1239"/>
            <rect x="28" y="-15" width="14" height="35" rx="5" fill="#9f1239"/>
            <rect x="-30" y="5" width="60" height="18" rx="4" fill="#fb7185"/>
          `;
        case "gauc":
          return `
            <rect x="-70" y="-30" width="140" height="55" rx="10" fill="#1e40af"/>
            <rect x="-80" y="-18" width="18" height="42" rx="6" fill="#1e3a8a"/>
            <rect x="62" y="-18" width="18" height="42" rx="6" fill="#1e3a8a"/>
            <rect x="-60" y="2" width="58" height="20" rx="4" fill="#3b82f6"/>
            <rect x="2" y="2" width="58" height="20" rx="4" fill="#3b82f6"/>
          `;
        case "postel":
          return `
            <rect x="-65" y="-35" width="10" height="65" fill="#78350f"/>
            <rect x="55" y="-15" width="10" height="45" fill="#78350f"/>
            <rect x="-60" y="-10" width="120" height="30" rx="3" fill="#0284c7"/>
            <rect x="-55" y="-22" width="30" height="16" rx="4" fill="#f8fafc"/>
            <rect x="-55" y="-8" width="110" height="24" fill="#38bdf8" rx="2"/>
          `;
        case "skrin":
          return `
            <rect x="-45" y="-90" width="90" height="130" rx="4" fill="#78350f" stroke="#451a03" stroke-width="3"/>
            ${isOpen ? `
              <rect x="-37" y="-82" width="74" height="114" fill="#24180f" stroke="#451a03" stroke-width="2"/>
              <line x1="-34" y1="-45" x2="34" y2="-45" stroke="#d6a15d" stroke-width="4"/>
              <line x1="-34" y1="-5" x2="34" y2="-5" stroke="#d6a15d" stroke-width="4"/>
              <path d="M-29,-77 H-14 V-50 H-29 Z M-7,-77 H8 V-50 H-7 Z M15,-77 H30 V-50 H15 Z" fill="#60a5fa" stroke="#172554" stroke-width="1"/>
              <path d="M-29,-39 H-14 V-10 H-29 Z M15,-39 H30 V-10 H15 Z" fill="#a78bfa" stroke="#4c1d95" stroke-width="1"/>
              <path d="M-39,-82 L-65,-76 L-65,30 L-39,32 Z" fill="#b7793f" stroke="#451a03" stroke-width="2"/>
              <path d="M39,-82 L65,-76 L65,30 L39,32 Z" fill="#8b5a2b" stroke="#451a03" stroke-width="2"/>
            ` : `
              <rect x="-42" y="-87" width="84" height="124" rx="2" fill="#8b5a2b" stroke="#451a03" stroke-width="2"/>
              <line x1="0" y1="-85" x2="0" y2="35" stroke="#5b3217" stroke-width="2"/>
              <circle cx="-7" cy="-25" r="2.5" fill="#fef08a"/>
              <circle cx="7" cy="-25" r="2.5" fill="#fef08a"/>
            `}
          `;
        case "knihovna":
          return `
            <rect x="-40" y="-85" width="80" height="120" rx="3" fill="#854d0e" stroke="#532e0d" stroke-width="3"/>
            <line x1="-38" y1="-45" x2="38" y2="-45" stroke="#532e0d" stroke-width="4"/>
            <line x1="-38" y1="-5" x2="38" y2="-5" stroke="#532e0d" stroke-width="4"/>
            <!-- Books -->
            <rect x="-30" y="-80" width="8" height="30" fill="#ef4444"/>
            <rect x="-20" y="-75" width="10" height="25" fill="#3b82f6"/>
            <rect x="-8" y="-82" width="12" height="32" fill="#10b981"/>
            <rect x="-30" y="-40" width="10" height="32" fill="#f59e0b"/>
            <rect x="-18" y="-38" width="14" height="30" fill="#8b5cf6"/>
          `;
        case "policka":
          return `
            <rect x="-50" y="-6" width="100" height="12" rx="2" fill="#a16207"/>
            <path d="M-40,6 L-40,20 L-30,6 Z" fill="#713f12"/>
            <path d="M40,6 L40,20 L30,6 Z" fill="#713f12"/>
          `;
        case "krabice":
          return `
            <rect x="-35" y="-25" width="70" height="50" rx="3" fill="#d97706" stroke="#92400e" stroke-width="2"/>
            ${isOpen ? `
              <path d="M-35,-25 L-50,-45 L-15,-25 Z" fill="#b45309"/>
              <path d="M35,-25 L50,-45 L15,-25 Z" fill="#b45309"/>
              <rect x="-30" y="-20" width="60" height="40" fill="#78350f"/>
            ` : `
              <rect x="-37" y="-28" width="74" height="10" rx="2" fill="#b45309"/>
            `}
          `;
        case "okno":
          return `
            <rect x="-48" y="-58" width="96" height="116" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
            <rect x="-41" y="-51" width="82" height="102" fill="#0c4a6e"/>
            ${isOpen ? `
              <path d="M-38,-48 L-4,-48 L-4,47 L-38,47 Z" fill="#7dd3fc" stroke="#f8fafc" stroke-width="4"/>
              <path d="M-4,-48 L29,-40 L29,40 L-4,47 Z" fill="#38bdf8" stroke="#f8fafc" stroke-width="4"/>
              <line x1="-4" y1="-48" x2="-4" y2="47" stroke="#e2e8f0" stroke-width="3"/>
              <circle cx="18" cy="0" r="2" fill="#475569"/>
            ` : `
              <rect x="-39" y="-49" width="78" height="98" fill="#38bdf8" opacity="0.9"/>
              <line x1="0" y1="-49" x2="0" y2="49" stroke="#f8fafc" stroke-width="4"/>
              <line x1="-39" y1="0" x2="39" y2="0" stroke="#f8fafc" stroke-width="4"/>
            `}
          `;
        case "dvere":
          return `
            ${isOpen ? `
              <rect x="-42" y="-82" width="84" height="124" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
              <rect x="-33" y="-73" width="66" height="106" fill="#0f172a"/>
              <path d="M-32,-72 H32 V32 H-32 Z" fill="#334155"/>
              <path d="M22,-69 L-13,-60 L-13,22 L22,32 Z" fill="#6b341f" stroke="#452315" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M18,-65 L-8,-58 L-8,19 L18,27 Z" fill="#9a5334" stroke="#713b27" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M-8,-58 L-13,-60 L-13,22 L-8,19 Z" fill="#542b20"/>
              <path d="M18,-65 L22,-69 L22,32 L18,27 Z" fill="#3f291f"/>
              <path d="M22,-69 L22,32" stroke="#cbd5e1" stroke-width="1.5"/>
              <circle cx="-3" cy="-21" r="2.2" fill="#d1d5db" stroke="#64748b" stroke-width="0.8"/>
              <path d="M-3,-21 L2,-21" stroke="#d1d5db" stroke-width="1.8" stroke-linecap="round"/>
            ` : `
              <rect x="-43" y="-83" width="86" height="126" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>
              <rect x="-34" y="-74" width="68" height="108" fill="#8b5a2b" stroke="#451a03" stroke-width="3"/>
              <rect x="-25" y="-64" width="50" height="88" rx="2" fill="#a16207" stroke="#713f12" stroke-width="2"/>
              <circle cx="22" cy="-17" r="3.5" fill="#fef08a" stroke="#713f12" stroke-width="1"/>
            `}
          `;
        case "kuchynska_linka":
          return `
            <rect x="-60" y="-35" width="120" height="70" fill="#d6d3d1" stroke="#78716c" stroke-width="2"/>
            <rect x="-62" y="-40" width="124" height="10" fill="#334155"/>
            ${isOpen ? `
              <rect x="-54" y="-25" width="48" height="55" fill="#292524" stroke="#44403c" stroke-width="2"/>
              <rect x="6" y="-25" width="48" height="55" fill="#292524" stroke="#44403c" stroke-width="2"/>
              <line x1="-51" y1="-2" x2="-9" y2="-2" stroke="#d6a15d" stroke-width="3"/>
              <line x1="9" y1="-2" x2="51" y2="-2" stroke="#d6a15d" stroke-width="3"/>
              <path d="M-55,-25 L-81,-33 L-81,23 L-55,30 Z" fill="#c4b5a5" stroke="#57534e" stroke-width="2"/>
              <path d="M55,-25 L81,-33 L81,23 L55,30 Z" fill="#a8a29e" stroke="#57534e" stroke-width="2"/>
              <circle cx="-63" cy="-1" r="2.5" fill="#f8fafc"/>
              <circle cx="63" cy="-1" r="2.5" fill="#f8fafc"/>
            ` : `
              <rect x="-54" y="-25" width="48" height="55" fill="#c4b5a5" stroke="#78716c" stroke-width="2"/>
              <rect x="6" y="-25" width="48" height="55" fill="#b8aa99" stroke="#78716c" stroke-width="2"/>
              <line x1="0" y1="-25" x2="0" y2="30" stroke="#78716c" stroke-width="2"/>
              <rect x="-34" y="-3" width="8" height="3" rx="1.5" fill="#57534e"/>
              <rect x="26" y="-3" width="8" height="3" rx="1.5" fill="#57534e"/>
            `}
          `;
        case "drez":
          return `
            <rect x="-45" y="-20" width="90" height="40" rx="4" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
            <rect x="-35" y="-12" width="40" height="24" rx="3" fill="#64748b"/>
            <path d="M15,-15 C15,-30 25,-30 25,-15" fill="none" stroke="#cbd5e1" stroke-width="4"/>
          `;
        case "umyvadlo":
          return `
            <path d="M-30,-20 Q0,25 30,-20 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
            <rect x="-8" y="10" width="16" height="30" fill="#cbd5e1"/>
            <path d="M0,-20 L0,-30 L8,-30" fill="none" stroke="#94a3b8" stroke-width="4"/>
          `;
        case "vana":
          return `
            <rect x="-65" y="-20" width="130" height="45" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
            <rect x="-55" y="-12" width="110" height="30" rx="8" fill="#38bdf8" opacity="0.65"/>
            <circle cx="-50" cy="0" r="4" fill="#94a3b8"/>
          `;
        case "sprcha":
          return `
            <rect x="-40" y="-80" width="80" height="120" fill="none" stroke="#38bdf8" stroke-width="4"/>
            <path d="M0,-75 L0,-60 L-15,-60" fill="none" stroke="#94a3b8" stroke-width="3"/>
            <path d="M-20,-55 L-10,-55" stroke="#38bdf8" stroke-width="2" stroke-dasharray="2,2"/>
          `;
        case "zachod":
          return `
            <rect x="-27" y="-76" width="54" height="54" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
            <rect x="-19" y="-68" width="38" height="38" rx="3" fill="#dbeafe" stroke="#cbd5e1" stroke-width="2"/>
            <rect x="-13" y="-62" width="26" height="26" rx="2" fill="#f1f5f9"/>
            <circle cx="0" cy="-27" r="2.5" fill="#64748b"/>
            <path d="M-23,-17 Q-28,-10 -25,5 L-19,27 Q-16,39 0,41 Q16,39 19,27 L25,5 Q28,-10 23,-17 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="3" stroke-linejoin="round"/>
            <path d="M-12,38 L-15,49 H15 L12,38" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3" stroke-linejoin="round"/>
            <path d="M-18,50 H18" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
            ${isOpen ? `
              <rect x="-15" y="-51" width="30" height="39" rx="13" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>
              <rect x="-9" y="-45" width="18" height="27" rx="9" fill="#dbeafe" stroke="#94a3b8" stroke-width="1.5"/>
              <ellipse cx="0" cy="-10" rx="20" ry="9" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>
              <ellipse cx="0" cy="-10" rx="12" ry="4.5" fill="#38bdf8"/>
            ` : `
              <ellipse cx="0" cy="-11" rx="24" ry="10" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>
              <ellipse cx="0" cy="-11" rx="15" ry="5" fill="#dbeafe" stroke="#94a3b8" stroke-width="1.5"/>
            `}
          `;
        case "lednicka":
          return `
            <rect x="-38" y="-84" width="76" height="128" rx="7" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
            ${isOpen ? `
              <rect x="-32" y="-78" width="64" height="116" rx="2" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
              <line x1="-29" y1="-43" x2="29" y2="-43" stroke="#cbd5e1" stroke-width="4"/>
              <line x1="-29" y1="-5" x2="29" y2="-5" stroke="#cbd5e1" stroke-width="4"/>
              <rect x="-25" y="-72" width="15" height="22" rx="2" fill="#ef4444"/>
              <rect x="2" y="-71" width="22" height="18" rx="2" fill="#22c55e"/>
              <rect x="-23" y="-36" width="17" height="24" rx="2" fill="#facc15"/>
              <rect x="2" y="-34" width="25" height="20" rx="2" fill="#fb923c"/>
              <path d="M38,-78 L73,-67 L73,32 L38,38 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="3"/>
              <path d="M45,-69 L66,-63 L66,-51 L45,-57 Z" fill="#7dd3fc" stroke="#f8fafc" stroke-width="2"/>
              <path d="M45,-34 L66,-28 M45,-2 L66,4 M45,15 L66,21" stroke="#f8fafc" stroke-width="2"/>
              <rect x="43" y="-63" width="4" height="22" rx="2" fill="#475569"/>
              <rect x="43" y="5" width="4" height="22" rx="2" fill="#475569"/>
            ` : `
              <rect x="-34" y="-80" width="68" height="74" rx="3" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
              <rect x="-34" y="-2" width="68" height="40" rx="3" fill="#dbeafe" stroke="#94a3b8" stroke-width="2"/>
              <rect x="23" y="-64" width="5" height="42" rx="2.5" fill="#64748b"/>
              <rect x="23" y="8" width="5" height="22" rx="2.5" fill="#64748b"/>
              <rect x="-26" y="-70" width="35" height="16" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
              <line x1="-32" y1="-6" x2="32" y2="-6" stroke="#64748b" stroke-width="2"/>
              <circle cx="-24" cy="-44" r="2" fill="#22c55e"/>
            `}
          `;
        case "sporak":
        case "trouba":
          return `
            <rect x="-40" y="-48" width="80" height="96" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="3"/>
            <rect x="-34" y="-42" width="68" height="22" rx="2" fill="#1e293b"/>
            <circle cx="-20" cy="-31" r="4" fill="#f59e0b"/>
            <circle cx="0" cy="-31" r="4" fill="#f59e0b"/>
            <circle cx="20" cy="-31" r="4" fill="#f59e0b"/>
            <rect x="-31" y="-12" width="62" height="54" rx="3" fill="#334155"/>
            ${isOpen
              ? `<path d="M-28,-8 L28,-8 L49,28 L-49,28 Z" fill="#94a3b8" stroke="#334155" stroke-width="3"/><rect x="-34" y="-10" width="68" height="6" rx="2" fill="#0f172a"/>`
              : `<rect x="-31" y="-12" width="62" height="54" rx="3" fill="#475569" stroke="#1e293b" stroke-width="2"/><rect x="-20" y="-7" width="40" height="36" rx="2" fill="#0f172a"/><circle cx="24" cy="15" r="2" fill="#f8fafc"/>`}
          `;
        case "mikrovlnka":
          return `
            <rect x="-42" y="-27" width="84" height="54" rx="5" fill="#cbd5e1" stroke="#475569" stroke-width="3"/>
            <rect x="-37" y="-22" width="54" height="44" rx="3" fill="#1e293b"/>
            ${isOpen
              ? `
                <rect x="-34" y="-19" width="47" height="38" rx="2" fill="#451a03" stroke="#0f172a" stroke-width="2"/>
                <circle cx="-10" cy="0" r="12" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
                <path d="M15,-21 L46,-32 L46,32 L15,21 Z" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
                <path d="M20,-15 L40,-22 L40,22 L20,15 Z" fill="#0c4a6e" stroke="#e2e8f0" stroke-width="2"/>
                <circle cx="34" cy="0" r="2" fill="#f8fafc"/>
                <rect x="24" y="-27" width="7" height="5" rx="1" fill="#f59e0b"/>
              `
              : `
                <rect x="-34" y="-19" width="47" height="38" rx="2" fill="#0c4a6e" stroke="#f8fafc" stroke-width="2"/>
                <circle cx="-10" cy="0" r="13" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
                <circle cx="-10" cy="0" r="2" fill="#f8fafc"/>
                <rect x="20" y="-20" width="15" height="40" rx="2" fill="#475569"/>
                <circle cx="27.5" cy="-11" r="2.2" fill="#f59e0b"/>
                <circle cx="27.5" cy="0" r="2.2" fill="#f59e0b"/>
                <circle cx="27.5" cy="11" r="2.2" fill="#f59e0b"/>
              `}
          `;
        case "pracka":
          return `
            <rect x="-40" y="-48" width="80" height="96" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
            <rect x="-32" y="-40" width="64" height="17" rx="2" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
            <circle cx="-23" cy="-31.5" r="3" fill="#22c55e"/>
            <rect x="9" y="-36" width="14" height="7" rx="2" fill="#334155"/>
            <circle cx="0" cy="7" r="31" fill="#cbd5e1" stroke="#475569" stroke-width="3"/>
            ${isOpen
              ? `
                <circle cx="0" cy="7" r="22" fill="#0f172a" stroke="#64748b" stroke-width="3"/>
                <path d="M-17,-3 Q0,-13 17,-3 L13,21 Q0,32 -13,21 Z" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
                <path d="M-23,-14 C-48,-20 -52,13 -34,25 L-22,14" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
                <path d="M-39,21 L-33,16" stroke="#475569" stroke-width="2"/>
              `
              : `
                <circle cx="0" cy="7" r="24" fill="#1e293b" stroke="#475569" stroke-width="3"/>
                <circle cx="0" cy="7" r="18" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
                <path d="M-13,0 Q0,-9 13,0" fill="none" stroke="#7dd3fc" stroke-width="2"/>
                <circle cx="20" cy="7" r="2" fill="#f8fafc"/>
              `}
          `;
        case "televizor":
          return `
            <rect x="-55" y="-40" width="110" height="65" rx="4" fill="#0f172a" stroke="#334155" stroke-width="4"/>
            <path d="M-15,25 L-25,38 M15,25 L25,38" stroke="#334155" stroke-width="4"/>
            ${isOpen ? `<rect x="-50" y="-35" width="100" height="55" fill="#38bdf8"/>` : ''}
          `;
        case "pocitac":
          return `
            <rect x="-30" y="-42" width="61" height="49" rx="5" fill="#334155" stroke="#94a3b8" stroke-width="3"/>
            <rect x="-25" y="-37" width="51" height="37" rx="2" fill="#0c4a6e"/>
            <path d="M-22,-7 L-7,-24 L2,-15 L11,-27 L23,-9 Z" fill="#38bdf8" opacity="0.8"/>
            <circle cx="0" cy="3" r="2" fill="#22c55e"/>
            <path d="M-2,7 L-2,15 M2,7 L2,15 M-13,16 L13,16" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
            <rect x="-27" y="20" width="48" height="8" rx="3" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
            <path d="M-20,23 L14,23 M-18,26 L12,26" stroke="#475569" stroke-width="1"/>
            <rect x="33" y="-10" width="17" height="38" rx="3" fill="#475569" stroke="#1e293b" stroke-width="2"/>
            <circle cx="41.5" cy="-3" r="2" fill="#22c55e"/>
            <path d="M29,23 Q34,19 37,23 Q37,27 33,28 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
          `;
        case "lampa":
          return `
            <path d="M-20,-10 L20,-10 L30,20 L-30,20 Z" fill="#f59e0b"/>
            <line x1="0" y1="20" x2="0" y2="60" stroke="#78350f" stroke-width="4"/>
            <ellipse cx="0" cy="60" rx="18" ry="5" fill="#78350f"/>
          `;
        case "krb":
          return `
            <rect x="-50" y="-50" width="100" height="90" rx="4" fill="#78350f" stroke="#451a03" stroke-width="4"/>
            <path d="M-30,-20 A30,30 0 0 1 30,-20 L30,30 L-30,30 Z" fill="#1e293b"/>
            <path d="M-15,25 Q0,-10 15,25 Q0,10 -15,25 Z" fill="#f97316"/>
            <path d="M-8,25 Q0,0 8,25 Z" fill="#facc15"/>
          `;
        default:
          return `<rect x="-30" y="-20" width="60" height="40" fill="#64748b"/>`;
      }
    }
  window.renderFurnitureSvgGraphics = renderFurnitureSvgGraphics;
})();
