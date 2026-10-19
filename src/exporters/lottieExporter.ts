import paper from 'paper'

export interface BakeOptions { fps: number, duration: number }

// Very small prototype baker that converts Paper.js paths into a fake Lottie-like structure.
// This is a placeholder for a proper baker: it samples visible paths and creates per-frame
// path data (morph) with consistent vertex counts by resampling.

function resamplePath(path: paper.Path, count: number) {
  const length = path.length
  const pts: {x:number,y:number}[] = []
  for (let i = 0; i < count; i++) {
    const offset = (i / count) * length
    const pt = path.getPointAt(offset)
    if (pt) pts.push({x: pt.x, y: pt.y})
  }
  return pts
}

export function bakeToLottie(project: paper.Project, opts: BakeOptions) {
  const frames = Math.max(1, Math.round(opts.fps * opts.duration))
  const visiblePaths: paper.Path[] = []
  project.activeLayer.children.forEach((item) => {
    if (item instanceof paper.Path && item.visible) visiblePaths.push(item)
  })

  const shapes: any[] = []
  visiblePaths.forEach((p, idx) => {
    const vertexCount = Math.max(8, Math.min(64, Math.round(p.length / 8)))
    const framesPts: any[] = []
    for (let f = 0; f < frames; f++) {
      // For prototype we don't animate; we just sample the current path repeatedly.
      const pts = resamplePath(p, vertexCount)
      framesPts.push(pts)
    }
    shapes.push({
      name: p.name || `path_${idx}`,
      fill: p.fillColor ? p.fillColor.toCSS(true) : null,
      stroke: p.strokeColor ? p.strokeColor.toCSS(true) : '#000',
      strokeWidth: p.strokeWidth || 1,
      frames: framesPts
    })
  })

  // Build a minimal lottie-like JSON (not fully spec-compliant) for demo & iteration
  const lottie = {
    v: '5.7.3',
    fr: opts.fps,
    ip: 0,
    op: Math.max(1, frames),
    assets: [],
    layers: shapes.map((s, i) => ({
      ty: 4,
      nm: s.name,
      shapes: [
        {
          ty: 'sh',
          it: [
            // placeholder path using first frame only
            {
              ty: 'sh',
              ks: {
                k: {
                  i: [],
                  o: [],
                  v: s.frames[0].map((pt:{x:number,y:number}) => [pt.x, pt.y]),
                  c: false
                }
              }
            },
            {
              ty: 'st',
              c: {k: [0,0,0,1]},
              w: {k: s.strokeWidth}
            }
          ]
        }
      ]
    }))
  }

  return lottie
}
