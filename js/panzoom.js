// Pan/zoom por transform CSS: roda do mouse, arraste, pinça (2 ponteiros) e botões. Sem dependências.
export function panzoom(stage, target, { min = 0.5, max = 8 } = {}) {
  let s = 1, x = 0, y = 0, moved = false, acc = 0, startDist = 0, startS = 1;
  const pts = new Map();
  stage.style.touchAction = 'none';
  target.style.transformOrigin = '0 0';

  const apply = () => { target.style.transform = `translate(${x}px, ${y}px) scale(${s})`; };
  const zoomAt = (f, cx, cy) => {
    const ns = Math.min(max, Math.max(min, s * f)), k = ns / s;
    x = cx - (cx - x) * k; y = cy - (cy - y) * k; s = ns; apply();
  };
  const local = (cx, cy) => { const r = stage.getBoundingClientRect(); return [cx - r.left, cy - r.top]; };
  const mid = () => { const r = stage.getBoundingClientRect(); return [r.width / 2, r.height / 2]; };
  const two = () => [...pts.values()];

  stage.addEventListener('wheel', e => {
    e.preventDefault();
    zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, ...local(e.clientX, e.clientY));
  }, { passive: false });

  stage.addEventListener('pointerdown', e => {
    pts.set(e.pointerId, [e.clientX, e.clientY]);
    acc = 0; moved = false;
    if (pts.size === 2) { const [a, b] = two(); startDist = Math.hypot(a[0] - b[0], a[1] - b[1]); startS = s; }
  });
  stage.addEventListener('pointermove', e => {
    const p = pts.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p[0], dy = e.clientY - p[1];
    pts.set(e.pointerId, [e.clientX, e.clientY]);
    acc += Math.abs(dx) + Math.abs(dy);
    if (acc > 6 && !moved) { moved = true; try { stage.setPointerCapture(e.pointerId); } catch { /* ok */ } }
    if (pts.size === 2) {
      const [a, b] = two(), d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (startDist) zoomAt((startS * d / startDist) / s, ...local((a[0] + b[0]) / 2, (a[1] + b[1]) / 2));
    } else if (moved) { x += dx; y += dy; apply(); }
  });
  const up = e => pts.delete(e.pointerId);
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', up);
  // arraste não deve virar clique em nó/botão
  stage.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);

  return {
    zoomBy: f => zoomAt(f, ...mid()),
    reset() { s = 1; x = 0; y = 0; apply(); },
  };
}
