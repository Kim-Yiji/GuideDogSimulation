/* =============================================
   씬(Scene) SVG 렌더러 모음
   ============================================= */

// ─── 공통 SVG 조각 ───────────────────────────
const SVG = {
  // 안내견 (하네스 착용)
  dog: (scale = 1, flip = false) => `
    <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg"
         width="${110 * scale}" style="${flip ? 'transform:scaleX(-1)' : ''}">
      <ellipse cx="60" cy="65" rx="30" ry="22" fill="#C8924A"/>
      <rect x="50" y="42" width="20" height="18" rx="6" fill="#C8924A"/>
      <ellipse cx="60" cy="36" rx="20" ry="18" fill="#D4A055"/>
      <ellipse cx="43" cy="28" rx="9" ry="13" fill="#A0622A" transform="rotate(-15 43 28)"/>
      <ellipse cx="77" cy="28" rx="9" ry="13" fill="#A0622A" transform="rotate(15 77 28)"/>
      <circle cx="53" cy="33" r="4" fill="#fff"/>
      <circle cx="54" cy="33" r="2.5" fill="#2c1a0e"/>
      <circle cx="55" cy="32" r="0.8" fill="#fff"/>
      <circle cx="67" cy="33" r="4" fill="#fff"/>
      <circle cx="68" cy="33" r="2.5" fill="#2c1a0e"/>
      <circle cx="69" cy="32" r="0.8" fill="#fff"/>
      <ellipse cx="60" cy="41" rx="5" ry="3.5" fill="#2c1a0e"/>
      <path d="M55 44 Q60 48 65 44" stroke="#2c1a0e" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="60" cy="47" rx="4" ry="3" fill="#E06080"/>
      <rect x="35" y="52" width="50" height="22" rx="5" fill="#2563EB" opacity="0.9"/>
      <text x="60" y="66" text-anchor="middle" fill="white" font-size="8" font-weight="bold">안내견</text>
      <rect x="38" y="80" width="10" height="18" rx="5" fill="#C8924A"/>
      <rect x="72" y="80" width="10" height="18" rx="5" fill="#C8924A"/>
      <rect x="32" y="78" width="11" height="16" rx="5" fill="#A0622A"/>
      <rect x="77" y="78" width="11" height="16" rx="5" fill="#A0622A"/>
      <path d="M90 58 Q110 40 105 55" stroke="#C8924A" stroke-width="7" fill="none" stroke-linecap="round"/>
    </svg>`,

  // 핸들러 (흰지팡이 + 선글라스)
  handler: (scale = 1, flip = false) => `
    <svg viewBox="0 0 80 130" xmlns="http://www.w3.org/2000/svg"
         width="${70 * scale}" style="${flip ? 'transform:scaleX(-1)' : ''}">
      <ellipse cx="40" cy="128" rx="22" ry="5" fill="#00000015"/>
      <rect x="28" y="88" width="10" height="35" rx="5" fill="#3B4B6B"/>
      <rect x="42" y="92" width="10" height="31" rx="5" fill="#3B4B6B"/>
      <ellipse cx="33" cy="122" rx="8" ry="4" fill="#222"/>
      <ellipse cx="47" cy="122" rx="8" ry="4" fill="#222"/>
      <rect x="22" y="50" width="36" height="42" rx="10" fill="#5B7FD4"/>
      <path d="M22 60 Q8 72 14 82" stroke="#5B7FD4" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M58 60 Q72 70 68 82" stroke="#5B7FD4" stroke-width="10" fill="none" stroke-linecap="round"/>
      <line x1="14" y1="82" x2="10" y2="125" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <rect x="34" y="38" width="12" height="14" rx="5" fill="#F0C090"/>
      <circle cx="40" cy="30" r="18" fill="#F0C090"/>
      <ellipse cx="40" cy="14" rx="18" ry="9" fill="#2c1a0e"/>
      <ellipse cx="25" cy="24" rx="6" ry="10" fill="#2c1a0e"/>
      <ellipse cx="55" cy="24" rx="6" ry="10" fill="#2c1a0e"/>
      <rect x="28" y="27" width="10" height="7" rx="3" fill="#222"/>
      <rect x="42" y="27" width="10" height="7" rx="3" fill="#222"/>
      <line x1="38" y1="30" x2="42" y2="30" stroke="#555" stroke-width="1.5"/>
      <path d="M34 38 Q40 43 46 38" stroke="#c0795a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,

  // 일반 시민 (여성)
  personF: (scale = 1) => `
    <svg viewBox="0 0 70 120" xmlns="http://www.w3.org/2000/svg" width="${60 * scale}">
      <ellipse cx="35" cy="118" rx="20" ry="4" fill="#00000015"/>
      <rect x="23" y="78" width="10" height="34" rx="5" fill="#C45ABB"/>
      <rect x="37" y="82" width="10" height="30" rx="5" fill="#C45ABB"/>
      <ellipse cx="28" cy="111" rx="7" ry="3.5" fill="#333"/>
      <ellipse cx="42" cy="111" rx="7" ry="3.5" fill="#333"/>
      <rect x="18" y="42" width="34" height="40" rx="10" fill="#F06292"/>
      <path d="M18 52 Q6 62 10 72" stroke="#F06292" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M52 52 Q64 60 62 72" stroke="#F06292" stroke-width="9" fill="none" stroke-linecap="round"/>
      <rect x="29" y="32" width="12" height="12" rx="5" fill="#F0C090"/>
      <circle cx="35" cy="24" r="16" fill="#F0C090"/>
      <path d="M19 20 Q35 8 51 20 Q51 10 35 10 Q19 10 19 20Z" fill="#2c1a0e"/>
      <circle cx="29" cy="23" r="3" fill="#2c1a0e"/>
      <circle cx="41" cy="23" r="3" fill="#2c1a0e"/>
      <ellipse cx="35" cy="28" rx="2" ry="1.5" fill="#D4956A"/>
      <path d="M30 31 Q35 35 40 31" stroke="#c0795a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,

  // 일반 시민 (남성)
  personM: (scale = 1) => `
    <svg viewBox="0 0 70 120" xmlns="http://www.w3.org/2000/svg" width="${60 * scale}">
      <ellipse cx="35" cy="118" rx="20" ry="4" fill="#00000015"/>
      <rect x="23" y="78" width="10" height="34" rx="5" fill="#475569"/>
      <rect x="37" y="82" width="10" height="30" rx="5" fill="#475569"/>
      <ellipse cx="28" cy="111" rx="7" ry="3.5" fill="#222"/>
      <ellipse cx="42" cy="111" rx="7" ry="3.5" fill="#222"/>
      <rect x="18" y="42" width="34" height="40" rx="10" fill="#34D399"/>
      <path d="M18 52 Q6 62 10 72" stroke="#34D399" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M52 52 Q64 60 62 72" stroke="#34D399" stroke-width="9" fill="none" stroke-linecap="round"/>
      <rect x="29" y="32" width="12" height="12" rx="5" fill="#F5D0A9"/>
      <circle cx="35" cy="24" r="16" fill="#F5D0A9"/>
      <path d="M19 17 Q35 6 51 17 L51 22 Q35 12 19 22 Z" fill="#4a3a28"/>
      <circle cx="29" cy="23" r="3" fill="#2c1a0e"/>
      <circle cx="41" cy="23" r="3" fill="#2c1a0e"/>
      <ellipse cx="35" cy="28" rx="2" ry="1.5" fill="#C4956A"/>
      <path d="M30 31 Q35 35 40 31" stroke="#a06030" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,

  // 식당 테이블
  table: () => `
    <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" width="80">
      <rect x="10" y="20" width="80" height="10" rx="5" fill="#A0522D"/>
      <rect x="20" y="30" width="8" height="28" rx="3" fill="#8B4513"/>
      <rect x="72" y="30" width="8" height="28" rx="3" fill="#8B4513"/>
      <ellipse cx="50" cy="20" rx="25" ry="5" fill="#BF6E3A" opacity="0.5"/>
    </svg>`,

  // 지하철 배경 힌트
  subway: () => `<div style="position:absolute;top:8px;left:12px;background:rgba(255,255,255,0.8);border-radius:8px;padding:3px 10px;font-size:12px;font-weight:700;color:#2563EB;">🚇 지하철</div>`,

  cafe: () => `<div style="position:absolute;top:8px;left:12px;background:rgba(255,255,255,0.8);border-radius:8px;padding:3px 10px;font-size:12px;font-weight:700;color:#92400E;">☕ 카페</div>`,

  restaurant: () => `<div style="position:absolute;top:8px;left:12px;background:rgba(255,255,255,0.8);border-radius:8px;padding:3px 10px;font-size:12px;font-weight:700;color:#B45309;">🍽️ 식당</div>`,

  park: () => `<div style="position:absolute;top:8px;left:12px;background:rgba(255,255,255,0.8);border-radius:8px;padding:3px 10px;font-size:12px;font-weight:700;color:#16A34A;">🌳 공원</div>`,

  publicPlace: () => `<div style="position:absolute;top:8px;left:12px;background:rgba(255,255,255,0.8);border-radius:8px;padding:3px 10px;font-size:12px;font-weight:700;color:#64748B;">🏢 공공장소</div>`,
};

// 씬 렌더러 함수들
function buildScene(type) {
  switch(type) {
    case 'public':
      return `
        ${SVG.publicPlace()}
        <div class="char-wrap">
          ${SVG.dog()}
          ${SVG.handler()}
        </div>`;
    case 'talk':
      return `
        ${SVG.publicPlace()}
        <div class="char-wrap" style="position:relative">
          <div style="position:relative">
            <div class="speech-bubble" style="left:0;top:-30px">앗, 귀여워! 🐕</div>
            ${SVG.personF()}
          </div>
          ${SVG.dog()}
          ${SVG.handler()}
        </div>`;
    case 'snack':
      return `
        ${SVG.park()}
        <div class="char-wrap" style="position:relative">
          <div style="position:relative">
            <div class="prop-item" style="position:absolute;top:-30px;left:10px">🦴</div>
            ${SVG.personM()}
          </div>
          ${SVG.dog()}
          ${SVG.handler()}
        </div>`;
    case 'restaurant':
      return `
        ${SVG.restaurant()}
        <div class="char-wrap" style="align-items:center;gap:16px">
          ${SVG.dog(0.9)}
          ${SVG.handler(0.9)}
          <div style="margin-left:6px;opacity:0.7">${SVG.table()}</div>
        </div>`;
    case 'help':
      return `
        ${SVG.publicPlace()}
        <div class="char-wrap" style="position:relative">
          ${SVG.dog()}
          <div style="position:relative">
            <div class="speech-bubble" style="right:0;left:auto;top:-28px">..? 🗺️</div>
            ${SVG.handler()}
          </div>
          <div style="margin-left:8px">${SVG.personF(0.9)}</div>
        </div>`;
    case 'touch':
      return `
        ${SVG.publicPlace()}
        <div class="char-wrap" style="position:relative">
          <div style="position:relative">
            <div class="speech-bubble" style="left:0;top:-28px">만지고 싶어… 🥺</div>
            ${SVG.personM()}
          </div>
          ${SVG.dog()}
          ${SVG.handler()}
        </div>`;
    case 'subway':
      return `
        ${SVG.subway()}
        <div class="char-wrap" style="position:relative">
          ${SVG.dog(0.9)}
          ${SVG.handler(0.9)}
          <div style="margin-left:12px">${SVG.personF(0.85)}</div>
        </div>`;
    case 'cafe':
      return `
        ${SVG.cafe()}
        <div class="char-wrap" style="position:relative">
          <div style="position:relative">
            <div class="prop-item" style="position:absolute;top:-28px;right:0">🫙</div>
            ${SVG.personM()}
          </div>
          ${SVG.dog()}
          ${SVG.handler()}
        </div>`;
    default:
      return `<div class="char-wrap">${SVG.dog()}${SVG.handler()}</div>`;
  }
}
