import React from 'react';

/**
 * Botanical & Traditional Floral Vector SVGs
 * Handcrafted vector artwork replicating the traditional Indian artisanal
 * botanical silhouettes, floral sprigs, wildflower bouquets, and flourishes.
 */

interface FloralIconProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  size?: number | string;
}

// 1. Tulip/Lotus Branch with Spiral Tendril (Exact match to User Image 1)
export function FloralBloomBranch({ className, style, color = "#123b32", size = 200 }: FloralIconProps) {
  return (
    <svg 
      className={className} 
      style={style} 
      width={size} 
      height={size} 
      viewBox="0 0 240 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Primary Stem */}
      <path 
        d="M95 260 C110 210 100 150 72 125 C65 118 64 110 68 95" 
        stroke={color} 
        strokeWidth="4.5" 
        strokeLinecap="round" 
      />
      {/* Secondary Crossing Stem */}
      <path 
        d="M112 285 C108 240 92 180 115 110 C125 78 120 40 102 30" 
        stroke={color} 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      {/* Main Tulip/Lotus Flower Silhouette */}
      <path 
        d="M48 68 C45 88 56 108 72 108 C88 108 98 88 95 68 C88 80 82 82 72 75 C62 82 55 80 48 68 Z" 
        fill="#c9a15a" 
      />
      <path 
        d="M68 62 C72 45 76 45 80 62 C76 56 72 56 68 62 Z" 
        fill="#d9b36a" 
      />
      {/* Top Right Curly Tendril */}
      <path 
        d="M100 115 C115 95 125 75 118 60 C110 46 95 55 102 70 C108 82 125 72 120 58" 
        stroke="#c9a15a" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Bottom Left Curly Tendril */}
      <path 
        d="M86 168 C65 175 48 190 52 210 C56 226 78 228 80 208 C82 192 65 190 60 202" 
        stroke="#c9a15a" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Leaves along primary stem */}
      {/* Left Leaf 1 */}
      <path d="M50 176 C38 178 35 186 42 192 C54 194 65 186 68 178 Z" fill={color} />
      {/* Left Leaf 2 */}
      <path d="M62 148 C52 145 48 152 54 160 C66 162 72 154 74 148 Z" fill="#4a7364" />
      {/* Right Leaf 1 */}
      <path d="M84 135 C92 122 100 125 102 135 C100 148 90 148 84 135 Z" fill={color} />
      {/* Right Leaf 2 */}
      <path d="M98 168 C110 162 118 168 116 178 C110 188 98 184 98 168 Z" fill="#4a7364" />
      {/* Small Tendril Leaves */}
      <path d="M102 100 C100 90 108 85 116 92 C118 102 110 108 102 100 Z" fill={color} />
      <path d="M118 135 C128 130 136 138 132 148 C124 154 116 148 118 135 Z" fill="#4a7364" />
      <path d="M105 152 C112 146 122 150 120 160 C114 168 106 162 105 152 Z" fill={color} />
    </svg>
  );
}

// 2. Wildflower Triple Bouquet (From Image 2 top middle)
export function FloralWildflowerBouquet({ className, style, color = "#123b32", size = 200 }: FloralIconProps) {
  return (
    <svg 
      className={className} 
      style={style} 
      width={size} 
      height={size} 
      viewBox="0 0 240 280" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crossed Stems */}
      <path d="M85 245 L145 65" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M120 255 L120 45" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M155 245 L95 65" stroke={color} strokeWidth="3" strokeLinecap="round" />
      
      {/* Center Flower Bloom */}
      <g transform="translate(120, 45)">
        <ellipse cx="-10" cy="-6" rx="7" ry="9" fill="#c9a15a" transform="rotate(-30 -10 -6)" />
        <ellipse cx="0" cy="-12" rx="7" ry="10" fill="#d9b36a" />
        <ellipse cx="10" cy="-6" rx="7" ry="9" fill="#c9a15a" transform="rotate(30 10 -6)" />
        <circle cx="0" cy="0" r="4.5" fill="#123b32" />
      </g>

      {/* Left Flower Bloom */}
      <g transform="translate(95, 65)">
        <ellipse cx="-8" cy="-5" rx="6" ry="8" fill="#c9a15a" transform="rotate(-35 -8 -5)" />
        <ellipse cx="0" cy="-10" rx="6" ry="9" fill="#d9b36a" />
        <ellipse cx="8" cy="-5" rx="6" ry="8" fill="#c9a15a" transform="rotate(35 8 -5)" />
        <circle cx="0" cy="0" r="4" fill="#123b32" />
      </g>

      {/* Right Flower Bloom */}
      <g transform="translate(145, 65)">
        <ellipse cx="-8" cy="-5" rx="6" ry="8" fill="#c9a15a" transform="rotate(-35 -8 -5)" />
        <ellipse cx="0" cy="-10" rx="6" ry="9" fill="#d9b36a" />
        <ellipse cx="8" cy="-5" rx="6" ry="8" fill="#c9a15a" transform="rotate(35 8 -5)" />
        <circle cx="0" cy="0" r="4" fill="#123b32" />
      </g>

      {/* Climbing Pairs of Leaves */}
      {/* Left Stem Leaves */}
      <path d="M88 120 C76 114 74 125 82 130 C90 134 94 126 88 120 Z" fill={color} />
      <path d="M102 105 C108 96 116 102 112 110 C108 116 100 114 102 105 Z" fill="#4a7364" />
      <path d="M80 155 C68 150 66 160 74 166 C82 170 86 162 80 155 Z" fill={color} />
      <path d="M96 142 C102 134 110 138 108 146 C104 152 96 150 96 142 Z" fill="#4a7364" />

      {/* Center Stem Leaves */}
      <path d="M120 100 C110 92 108 104 116 108 Z" fill={color} />
      <path d="M120 100 C130 92 132 104 124 108 Z" fill="#4a7364" />
      <path d="M120 135 C108 126 106 138 116 144 Z" fill={color} />
      <path d="M120 135 C132 126 134 138 124 144 Z" fill="#4a7364" />
      <path d="M120 170 C108 162 106 174 116 180 Z" fill={color} />
      <path d="M120 170 C132 162 134 174 124 180 Z" fill="#4a7364" />

      {/* Right Stem Leaves */}
      <path d="M138 105 C132 96 124 102 128 110 C132 116 140 114 138 105 Z" fill={color} />
      <path d="M152 120 C164 114 166 125 158 130 C150 134 146 126 152 120 Z" fill="#4a7364" />
      <path d="M144 142 C138 134 130 138 132 146 C136 152 144 150 144 142 Z" fill={color} />
      <path d="M160 155 C172 150 174 160 166 166 C158 170 154 162 160 155 Z" fill="#4a7364" />
    </svg>
  );
}

// 3. Flowering Branch Spray with Silhouette Buds (From Image 2 top right)
export function FloralBranchSpray({ className, style, color = "#123b32", size = 200 }: FloralIconProps) {
  return (
    <svg 
      className={className} 
      style={style} 
      width={size} 
      height={size} 
      viewBox="0 0 260 260" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central Curved Branch */}
      <path 
        d="M40 220 C80 190 140 160 210 70" 
        stroke={color} 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      {/* Side Branch 1 */}
      <path 
        d="M90 180 C110 130 140 100 175 75" 
        stroke={color} 
        strokeWidth="2.8" 
        strokeLinecap="round" 
      />
      {/* Side Branch 2 */}
      <path 
        d="M130 145 C160 140 195 130 225 115" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />

      {/* Flower Blossoms - Gold */}
      {/* Top Blossom */}
      <circle cx="210" cy="70" r="8" fill="#c9a15a" />
      <circle cx="204" cy="58" r="6" fill="#d9b36a" />
      <circle cx="220" cy="62" r="6" fill="#d9b36a" />
      <circle cx="222" cy="78" r="6" fill="#c9a15a" />
      <circle cx="202" cy="80" r="6" fill="#c9a15a" />

      {/* Middle Top Blossom */}
      <circle cx="175" cy="75" r="7" fill="#c9a15a" />
      <circle cx="170" cy="65" r="5" fill="#d9b36a" />
      <circle cx="184" cy="68" r="5" fill="#d9b36a" />
      <circle cx="185" cy="82" r="5" fill="#c9a15a" />
      <circle cx="168" cy="84" r="5" fill="#c9a15a" />

      {/* Right Blossom */}
      <circle cx="225" cy="115" r="6" fill="#c9a15a" />
      <circle cx="220" cy="106" r="4.5" fill="#d9b36a" />
      <circle cx="233" cy="109" r="4.5" fill="#d9b36a" />
      <circle cx="234" cy="122" r="4.5" fill="#c9a15a" />
      <circle cx="218" cy="124" r="4.5" fill="#c9a15a" />

      {/* Little Flower Buds & Leaflets */}
      <path d="M70 185 C55 175 56 190 68 196 Z" fill="#4a7364" />
      <path d="M105 160 C92 148 94 165 106 170 Z" fill={color} />
      <path d="M125 125 C115 110 112 128 126 134 Z" fill="#4a7364" />
      <path d="M155 105 C145 92 140 108 155 114 Z" fill={color} />
      <path d="M165 138 C178 145 182 130 170 126 Z" fill="#4a7364" />
      <path d="M195 124 C205 132 210 118 198 115 Z" fill={color} />
      <circle cx="148" cy="88" r="3.5" fill="#c9a15a" />
      <circle cx="188" cy="100" r="3.5" fill="#c9a15a" />
      <circle cx="110" cy="140" r="3" fill="#c9a15a" />
    </svg>
  );
}

// 4. Botanical Laurel & Arch Wreath (From Image 2 bottom left)
export function FloralLaurelArch({ className, style, color = "#123b32", size = 200 }: FloralIconProps) {
  return (
    <svg 
      className={className} 
      style={style} 
      width={size} 
      height={size} 
      viewBox="0 0 280 280" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Laurel Branch */}
      <path 
        d="M135 250 C70 230 40 160 55 90 C62 55 85 30 105 20" 
        stroke={color} 
        strokeWidth="2.8" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Right Laurel Branch */}
      <path 
        d="M145 250 C210 230 240 160 225 90 C218 55 195 30 175 20" 
        stroke={color} 
        strokeWidth="2.8" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Left Laurel Leaf Pairs */}
      {[
        { x: 120, y: 245, r: -25 },
        { x: 90, y: 220, r: -45 },
        { x: 62, y: 180, r: -70 },
        { x: 50, y: 135, r: -90 },
        { x: 58, y: 90, r: -115 },
        { x: 80, y: 55, r: -140 },
        { x: 105, y: 30, r: -160 }
      ].map((pos, idx) => (
        <g key={`l-${idx}`} transform={`translate(${pos.x} ${pos.y}) rotate(${pos.r})`}>
          <path d="M0,0 C-10,-5 -18,-2 -20,10 C-12,14 -4,8 0,0 Z" fill={color} />
          <path d="M0,0 C10,-5 18,-2 20,10 C12,14 4,8 0,0 Z" fill={color} />
          <circle cx="0" cy="-2" r="2" fill={color} />
        </g>
      ))}

      {/* Right Laurel Leaf Pairs */}
      {[
        { x: 160, y: 245, r: 25 },
        { x: 190, y: 220, r: 45 },
        { x: 218, y: 180, r: 70 },
        { x: 230, y: 135, r: 90 },
        { x: 222, y: 90, r: 115 },
        { x: 200, y: 55, r: 140 },
        { x: 175, y: 30, r: 160 }
      ].map((pos, idx) => (
        <g key={`r-${idx}`} transform={`translate(${pos.x} ${pos.y}) rotate(${pos.r})`}>
          <path d="M0,0 C-10,-5 -18,-2 -20,10 C-12,14 -4,8 0,0 Z" fill={color} />
          <path d="M0,0 C10,-5 18,-2 20,10 C12,14 4,8 0,0 Z" fill={color} />
          <circle cx="0" cy="-2" r="2" fill={color} />
        </g>
      ))}
    </svg>
  );
}

// Reusable Delicate Botanical Leaf with Center Vein Line (Matching User Reference Image)
function BotanicalLeaf({
  x,
  y,
  scale = 1,
  rotation = 0,
  strokeColor = "#123b32",
  fillColor = "rgba(222, 228, 216, 0.45)",
  veinColor = "#c9a15a"
}: {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  strokeColor?: string;
  fillColor?: string;
  veinColor?: string;
}) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
      {/* Outer Leaf Body */}
      <path
        d="M 0 0 C 18 -26, 48 -24, 72 -3 C 54 22, 24 24, 0 0 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center Delicate Vein Line */}
      <path
        d="M 0 0 C 26 -6, 48 -4, 70 -3"
        stroke={veinColor}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Subtle Feather Vein Accent */}
      <path
        d="M 22 -3 C 28 -10, 36 -12, 42 -14"
        stroke={strokeColor}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 32 0 C 38 6, 46 8, 52 9"
        stroke={strokeColor}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  );
}

// 6. Left Margin-Attached Botanical Vine Branch (Matching User Reference Image)
export function FloralMarginBranchLeft({ 
  className, 
  style, 
  stemColor = "#123b32",       // Deep Emerald
  leafStroke = "#123b32",      // Deep Emerald
  leafFill = "#dee4d8",        // Sage Mist Fill
  veinColor = "#c9a15a",       // Antique Gold Vein
  tendrilColor = "#123b32",    // Deep Emerald Tendrils
  width = "clamp(280px, 30vw, 460px)", 
  height = "clamp(240px, 26vw, 390px)" 
}: { 
  className?: string; 
  style?: React.CSSProperties; 
  stemColor?: string;
  leafStroke?: string;
  leafFill?: string;
  veinColor?: string;
  tendrilColor?: string;
  width?: string | number; 
  height?: string | number; 
}) {
  return (
    <svg 
      className={className} 
      style={{ overflow: 'visible', ...style }} 
      width={width} 
      height={height} 
      viewBox="0 0 500 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
    >
      {/* Base Little Curly Tendrils at Margin Origin */}
      <path 
        d="M 12 72 C -4 66, -6 52, 4 44 C 12 36, 22 44, 18 52 C 14 58, 6 56, 6 50" 
        stroke={tendrilColor} 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        fill="none" 
      />
      <path 
        d="M 28 88 C 16 80, 10 92, 16 102 C 22 110, 32 104, 30 96 C 28 90, 20 90, 20 95" 
        stroke={tendrilColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Main Arching Vine Stem - Originates flush from left margin and cascades gracefully toward the ring */}
      <path 
        d="M 0 55 C 50 65, 115 110, 180 170 C 240 225, 300 265, 380 295" 
        stroke={stemColor} 
        strokeWidth="3.4" 
        strokeLinecap="round" 
      />

      {/* Upper Loop Tendril Branch (Exact match to Reference Image large spiral) */}
      <path 
        d="M 115 110 C 130 75, 148 42, 182 38 C 218 34, 236 62, 218 90 C 200 114, 168 112, 166 88 C 164 68, 184 56, 198 66 C 208 74, 202 88, 192 88" 
        stroke={tendrilColor} 
        strokeWidth="2.6" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Small Tendril Curl 1 branching off Loop */}
      <path 
        d="M 172 100 C 182 112, 198 116, 202 108 C 206 98, 196 94, 192 100" 
        stroke="#c9a15a" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Small Tendril Curl 2 */}
      <path 
        d="M 148 138 C 158 148, 172 152, 175 144 C 178 136, 170 132, 166 137" 
        stroke="#c9a15a" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Top Rising Sub-Branch with Climbing Leaves */}
      <path 
        d="M 230 215 C 265 195, 290 155, 300 100 C 305 75, 302 45, 295 28" 
        stroke={stemColor} 
        strokeWidth="2.8" 
        strokeLinecap="round" 
      />

      {/* Secondary Upper Stem Branch */}
      <path 
        d="M 282 162 C 320 158, 350 145, 385 130" 
        stroke={stemColor} 
        strokeWidth="2.4" 
        strokeLinecap="round" 
      />

      {/* Terminal Stem Extension Facing Center Ring */}
      <path 
        d="M 370 292 C 395 302, 415 308, 430 312" 
        stroke={stemColor} 
        strokeWidth="2.6" 
        strokeLinecap="round" 
      />

      {/* ================= BOTANICAL LEAVES (Exact structure matching Reference Image) ================= */}
      
      {/* Lower Leaf 1 (Near margin base pointing downwards) */}
      <BotanicalLeaf 
        x={35} 
        y={80} 
        scale={0.9} 
        rotation={35} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Lower Leaf 2 (Near margin base pointing inwards) */}
      <BotanicalLeaf 
        x={75} 
        y={98} 
        scale={0.95} 
        rotation={-55} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Mid Leaf 3 (Branching upwards beside spiral loop) */}
      <BotanicalLeaf 
        x={150} 
        y={145} 
        scale={0.88} 
        rotation={-48} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Mid Leaf 4 (Pointing downwards towards center) */}
      <BotanicalLeaf 
        x={185} 
        y={175} 
        scale={1.05} 
        rotation={28} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Mid Leaf 5 (Pointing upwards on middle stem) */}
      <BotanicalLeaf 
        x={232} 
        y={212} 
        scale={0.85} 
        rotation={-60} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Climbing Leaf Pair on Top Rising Sub-Branch (Left) */}
      <BotanicalLeaf 
        x={280} 
        y={140} 
        scale={0.82} 
        rotation={-70} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Climbing Leaf Pair on Top Rising Sub-Branch (Right) */}
      <BotanicalLeaf 
        x={295} 
        y={120} 
        scale={0.8} 
        rotation={-25} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Leaf on Rising Branch Tip (Left) */}
      <BotanicalLeaf 
        x={302} 
        y={65} 
        scale={0.78} 
        rotation={-78} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Terminal Tip Leaf at Top */}
      <BotanicalLeaf 
        x={296} 
        y={30} 
        scale={0.85} 
        rotation={-112} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Side Branch Leaf 1 */}
      <BotanicalLeaf 
        x={335} 
        y={155} 
        scale={0.85} 
        rotation={-18} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Side Branch Terminal Leaf */}
      <BotanicalLeaf 
        x={385} 
        y={130} 
        scale={0.88} 
        rotation={-32} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Lower Main Branch Leaf (Pointing towards 3D Ring) */}
      <BotanicalLeaf 
        x={295} 
        y={260} 
        scale={1.1} 
        rotation={20} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Terminal Main Tip Leaf (Pointing directly at 3D Ring) */}
      <BotanicalLeaf 
        x={378} 
        y={295} 
        scale={1.15} 
        rotation={15} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Delicate Gold Bud Accent at Terminal Tip */}
      <circle cx="430" cy="312" r="4.5" fill="#c9a15a" stroke={stemColor} strokeWidth="1.5" />
    </svg>
  );
}

// 7. Right Margin-Attached Botanical Vine Branch (Matching User Reference Image)
export function FloralMarginBranchRight({ 
  className, 
  style, 
  stemColor = "#123b32",       // Deep Emerald
  leafStroke = "#123b32",      // Deep Emerald
  leafFill = "#dee4d8",        // Sage Mist Fill
  veinColor = "#c9a15a",       // Antique Gold Vein
  tendrilColor = "#123b32",    // Deep Emerald Tendrils
  width = "clamp(280px, 30vw, 460px)", 
  height = "clamp(240px, 26vw, 390px)" 
}: { 
  className?: string; 
  style?: React.CSSProperties; 
  stemColor?: string;
  leafStroke?: string;
  leafFill?: string;
  veinColor?: string;
  tendrilColor?: string;
  width?: string | number; 
  height?: string | number; 
}) {
  return (
    <svg 
      className={className} 
      style={{ transform: 'scaleX(-1)', overflow: 'visible', ...style }} 
      width={width} 
      height={height} 
      viewBox="0 0 500 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
    >
      {/* Base Little Curly Tendrils at Margin Origin */}
      <path 
        d="M 12 72 C -4 66, -6 52, 4 44 C 12 36, 22 44, 18 52 C 14 58, 6 56, 6 50" 
        stroke={tendrilColor} 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        fill="none" 
      />
      <path 
        d="M 28 88 C 16 80, 10 92, 16 102 C 22 110, 32 104, 30 96 C 28 90, 20 90, 20 95" 
        stroke={tendrilColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Main Arching Vine Stem - Originates flush from margin and cascades gracefully toward the ring */}
      <path 
        d="M 0 55 C 50 65, 115 110, 180 170 C 240 225, 300 265, 380 295" 
        stroke={stemColor} 
        strokeWidth="3.4" 
        strokeLinecap="round" 
      />

      {/* Upper Loop Tendril Branch (Exact match to Reference Image large spiral) */}
      <path 
        d="M 115 110 C 130 75, 148 42, 182 38 C 218 34, 236 62, 218 90 C 200 114, 168 112, 166 88 C 164 68, 184 56, 198 66 C 208 74, 202 88, 192 88" 
        stroke={tendrilColor} 
        strokeWidth="2.6" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Small Tendril Curl 1 */}
      <path 
        d="M 172 100 C 182 112, 198 116, 202 108 C 206 98, 196 94, 192 100" 
        stroke="#c9a15a" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Small Tendril Curl 2 */}
      <path 
        d="M 148 138 C 158 148, 172 152, 175 144 C 178 136, 170 132, 166 137" 
        stroke="#c9a15a" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Top Rising Sub-Branch with Climbing Leaves */}
      <path 
        d="M 230 215 C 265 195, 290 155, 300 100 C 305 75, 302 45, 295 28" 
        stroke={stemColor} 
        strokeWidth="2.8" 
        strokeLinecap="round" 
      />

      {/* Secondary Upper Stem Branch */}
      <path 
        d="M 282 162 C 320 158, 350 145, 385 130" 
        stroke={stemColor} 
        strokeWidth="2.4" 
        strokeLinecap="round" 
      />

      {/* Terminal Stem Extension Facing Center Ring */}
      <path 
        d="M 370 292 C 395 302, 415 308, 430 312" 
        stroke={stemColor} 
        strokeWidth="2.6" 
        strokeLinecap="round" 
      />

      {/* ================= BOTANICAL LEAVES ================= */}
      
      {/* Lower Leaf 1 */}
      <BotanicalLeaf 
        x={35} 
        y={80} 
        scale={0.9} 
        rotation={35} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Lower Leaf 2 */}
      <BotanicalLeaf 
        x={75} 
        y={98} 
        scale={0.95} 
        rotation={-55} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Mid Leaf 3 */}
      <BotanicalLeaf 
        x={150} 
        y={145} 
        scale={0.88} 
        rotation={-48} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Mid Leaf 4 */}
      <BotanicalLeaf 
        x={185} 
        y={175} 
        scale={1.05} 
        rotation={28} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Mid Leaf 5 */}
      <BotanicalLeaf 
        x={232} 
        y={212} 
        scale={0.85} 
        rotation={-60} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Climbing Leaf Pair on Top Rising Sub-Branch (Left) */}
      <BotanicalLeaf 
        x={280} 
        y={140} 
        scale={0.82} 
        rotation={-70} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Climbing Leaf Pair on Top Rising Sub-Branch (Right) */}
      <BotanicalLeaf 
        x={295} 
        y={120} 
        scale={0.8} 
        rotation={-25} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Leaf on Rising Branch Tip (Left) */}
      <BotanicalLeaf 
        x={302} 
        y={65} 
        scale={0.78} 
        rotation={-78} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Terminal Tip Leaf at Top */}
      <BotanicalLeaf 
        x={296} 
        y={30} 
        scale={0.85} 
        rotation={-112} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Side Branch Leaf 1 */}
      <BotanicalLeaf 
        x={335} 
        y={155} 
        scale={0.85} 
        rotation={-18} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Side Branch Terminal Leaf */}
      <BotanicalLeaf 
        x={385} 
        y={130} 
        scale={0.88} 
        rotation={-32} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Lower Main Branch Leaf */}
      <BotanicalLeaf 
        x={295} 
        y={260} 
        scale={1.1} 
        rotation={20} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Terminal Main Tip Leaf (Pointing directly at 3D Ring) */}
      <BotanicalLeaf 
        x={378} 
        y={295} 
        scale={1.15} 
        rotation={15} 
        strokeColor={leafStroke} 
        fillColor={leafFill} 
        veinColor={veinColor} 
      />

      {/* Delicate Gold Bud Accent at Terminal Tip */}
      <circle cx="430" cy="312" r="4.5" fill="#c9a15a" stroke={stemColor} strokeWidth="1.5" />
    </svg>
  );
}
