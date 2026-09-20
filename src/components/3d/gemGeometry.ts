import * as THREE from 'three';

/**
 * Creates an authentic 57-facet Round Brilliant Cut Diamond geometry.
 * Separate vertices per facet face ensure sharp, sparkling diamond reflections.
 */
export function makeRoundDiamondGeometry(): THREE.BufferGeometry {
  const positions: number[] = [];

  function addTriangle(
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number]
  ) {
    positions.push(...p1, ...p2, ...p3);
  }

  // --- Proportions for Brilliant Cut ---
  const rGirdle = 0.46;
  const rTable = 0.26;
  const rStar = 0.36;
  const rPavMid = 0.28;

  const yTable = 0.22;
  const yStar = 0.14;
  const yGirdleTop = 0.025;
  const yGirdleBot = -0.025;
  const yPavMid = -0.22;
  const yCulet = -0.42;

  // 16 Girdle azimuth angles
  const numGirdle = 16;
  const girdleAngles: number[] = [];
  for (let i = 0; i < numGirdle; i++) {
    girdleAngles.push((i * 2 * Math.PI) / numGirdle);
  }

  // 8 Table / Kite azimuth angles (even girdle indices 0, 2, 4...)
  const tableAngles: number[] = [];
  for (let i = 0; i < 8; i++) {
    tableAngles.push(girdleAngles[i * 2]);
  }

  // 8 Star azimuth angles (odd girdle indices 1, 3, 5...)
  const starAngles: number[] = [];
  for (let i = 0; i < 8; i++) {
    starAngles.push(girdleAngles[i * 2 + 1]);
  }

  // 1. Table Vertices (8-gon at the flat top)
  const tableVerts: [number, number, number][] = tableAngles.map((a) => [
    rTable * Math.cos(a),
    yTable,
    rTable * Math.sin(a),
  ]);

  // 2. Star Vertices (8 vertices at intermediate crown height)
  const starVerts: [number, number, number][] = starAngles.map((a) => [
    rStar * Math.cos(a),
    yStar,
    rStar * Math.sin(a),
  ]);

  // 3. Girdle Top Vertices (16 vertices)
  const girdleTopVerts: [number, number, number][] = girdleAngles.map((a) => [
    rGirdle * Math.cos(a),
    yGirdleTop,
    rGirdle * Math.sin(a),
  ]);

  // 4. Girdle Bottom Vertices (16 vertices)
  const girdleBotVerts: [number, number, number][] = girdleAngles.map((a) => [
    rGirdle * Math.cos(a),
    yGirdleBot,
    rGirdle * Math.sin(a),
  ]);

  // 5. Pavilion Mid Vertices (8 intermediate vertices along lower girdle ribs)
  const pavMidVerts: [number, number, number][] = starAngles.map((a) => [
    rPavMid * Math.cos(a),
    yPavMid,
    rPavMid * Math.sin(a),
  ]);

  // 6. Culet Point
  const culetVert: [number, number, number] = [0, yCulet, 0];

  // ==================== CROWN FACETS ====================
  // Table: 8-gon made of 6 triangles
  for (let i = 1; i < 7; i++) {
    addTriangle(tableVerts[0], tableVerts[i], tableVerts[i + 1]);
  }

  // 8 Star Facets (triangles connecting table edge to star vertex)
  for (let i = 0; i < 8; i++) {
    const nextI = (i + 1) % 8;
    addTriangle(tableVerts[i], tableVerts[nextI], starVerts[i]);
  }

  // 8 Kite / Bezel Facets (rhombus/kite shape = 2 triangles each)
  for (let i = 0; i < 8; i++) {
    const prevStar = (i + 7) % 8;
    const gIndex = i * 2;
    addTriangle(tableVerts[i], starVerts[i], girdleTopVerts[gIndex]);
    addTriangle(tableVerts[i], girdleTopVerts[gIndex], starVerts[prevStar]);
  }

  // 16 Upper Girdle Facets (triangles between star points and girdle)
  for (let i = 0; i < 8; i++) {
    const gIndex = i * 2;
    const gMid = i * 2 + 1;
    const gNext = (i * 2 + 2) % 16;
    addTriangle(starVerts[i], girdleTopVerts[gMid], girdleTopVerts[gIndex]);
    addTriangle(starVerts[i], girdleTopVerts[gNext], girdleTopVerts[gMid]);
  }

  // ==================== GIRDLE FACETS ====================
  // 16 rectangular facets along the cylinder edge (2 triangles each)
  for (let i = 0; i < 16; i++) {
    const nextI = (i + 1) % 16;
    addTriangle(girdleTopVerts[i], girdleBotVerts[i], girdleTopVerts[nextI]);
    addTriangle(girdleTopVerts[nextI], girdleBotVerts[i], girdleBotVerts[nextI]);
  }

  // ==================== PAVILION FACETS ====================
  // 16 Lower Girdle Facets (triangles between girdle bottom and pavilion mid)
  for (let i = 0; i < 8; i++) {
    const gIndex = i * 2;
    const gMid = i * 2 + 1;
    const gNext = (i * 2 + 2) % 16;
    addTriangle(girdleBotVerts[gIndex], girdleBotVerts[gMid], pavMidVerts[i]);
    addTriangle(girdleBotVerts[gMid], girdleBotVerts[gNext], pavMidVerts[i]);
  }

  // 8 Pavilion Main Facets (kites from pavilion mid & girdle bottom to culet)
  for (let i = 0; i < 8; i++) {
    const prevStar = (i + 7) % 8;
    const gIndex = i * 2;
    addTriangle(girdleBotVerts[gIndex], pavMidVerts[i], culetVert);
    addTriangle(girdleBotVerts[gIndex], culetVert, pavMidVerts[prevStar]);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

// Backward-compatibility alias
export const makeGemGeometry = makeRoundDiamondGeometry;
