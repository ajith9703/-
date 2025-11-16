// Improved draggable papers supporting mobile (pointer events + touch fallback)
// Keeps a random initial rotation, and allows dragging on touch & mouse.
(function(){
  let highestZ = 1;
  const papers = Array.from(document.querySelectorAll('.paper'));
  papers.forEach(initPaper);

  function initPaper(paper) {
    // do not make papers inside links draggable (heart is wrapped in <a>)
    if (paper.closest && paper.closest('a')) return;

    // initial random rotation (if not already inlined)
    const initialRot = paper.dataset.initRot || (Math.random()*30 - 15);
    paper.dataset.initRot = initialRot;
    let state = {
      dragging: false,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      initX: 0,
      initY: 0,
      rotation: parseFloat(initialRot) || 0
    };

    // ensure touch-action none so pointer events work on mobile
    paper.style.touchAction = 'none';
    paper.style.willChange = 'transform';
    paper.style.userSelect = 'none';

    // Helper to apply transform
    function applyTransform() {
      paper.style.transform = `translate(${state.x}px, ${state.y}px) rotateZ(${state.rotation}deg)`;
    }

    // Pointer events (preferred)
    if (window.PointerEvent) {
      paper.addEventListener('pointerdown', (ev) => {
        if (ev.button && ev.button !== 0) return;
        ev.preventDefault();
        paper.setPointerCapture(ev.pointerId);
        startDrag(ev.clientX, ev.clientY);
        state.pointerId = ev.pointerId;
      }, { passive: false });

      paper.addEventListener('pointermove', (ev) => {
        if (!state.dragging) return;
        ev.preventDefault();
        moveTo(ev.clientX, ev.clientY);
      }, { passive: false });

      paper.addEventListener('pointerup', (ev) => {
        if (state.pointerId !== undefined && ev.pointerId !== state.pointerId) return;
        endDrag();
        try { paper.releasePointerCapture(ev.pointerId); } catch(e){}
      });

      paper.addEventListener('lostpointercapture', () => endDrag());
    } else {
      // touch fallback for older browsers (iOS Safari)
      paper.addEventListener('touchstart', (ev) => {
        if (!ev.touches || ev.touches.length > 1) return;
        const t = ev.touches[0];
        ev.preventDefault();
        startDrag(t.clientX, t.clientY);
      }, { passive: false });

      paper.addEventListener('touchmove', (ev) => {
        if (!state.dragging) return;
        const t = ev.touches[0];
        ev.preventDefault();
        moveTo(t.clientX, t.clientY);
      }, { passive: false });

      paper.addEventListener('touchend', (ev) => {
        endDrag();
      });
    }

    // mouse fallback (should also work if pointer events not available)
    paper.addEventListener('mousedown', (ev) => {
      if (ev.button && ev.button !== 0) return;
      ev.preventDefault();
      startDrag(ev.clientX, ev.clientY);
    });
    window.addEventListener('mousemove', (ev) => {
      if (!state.dragging) return;
      moveTo(ev.clientX, ev.clientY);
    });
    window.addEventListener('mouseup', () => {
      if (!state.dragging) return;
      endDrag();
    });

    function startDrag(clientX, clientY) {
      state.dragging = true;
      state.startX = clientX;
      state.startY = clientY;
      state.initX = state.x;
      state.initY = state.y;
      paper.classList.add('dragging');
      paper.style.zIndex = ++highestZ;
      // slightly increase rotation while dragging for a natural look
      state.rotation = parseFloat(paper.dataset.initRot) || 0;
    }

    function moveTo(clientX, clientY) {
      const dx = clientX - state.startX;
      const dy = clientY - state.startY;
      state.x = state.initX + dx;
      state.y = state.initY + dy;
      // optional: small tilt based on dx
      const tilt = Math.max(Math.min(dx / 15, 12), -12);
      state.rotation = (parseFloat(paper.dataset.initRot) || 0) + tilt;
      applyTransform();
    }

    function endDrag() {
      state.dragging = false;
      paper.classList.remove('dragging');
      // keep current position and rotation
      paper.dataset.initRot = state.rotation;
      paper.style.zIndex = '';
    }

    // ensure initial transform applied
    applyTransform();
  }
})();
