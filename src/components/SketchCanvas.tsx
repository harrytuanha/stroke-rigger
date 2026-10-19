import React, { useEffect, useRef, useState } from 'react'
import paper from 'paper'
import { bakeToLottie } from '../exporters/lottieExporter'

export default function SketchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [toolMode, setToolMode] = useState<'pen'|'select'>('pen')
  const projectRef = useRef<paper.Project | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    paper.setup(canvasRef.current)
    projectRef.current = paper.project

    // simple pen tool
    const tool = new paper.Tool()
    let path: paper.Path | null = null

    tool.onMouseDown = (event: paper.ToolEvent) => {
      if (toolMode !== 'pen') return
      path = new paper.Path()
      path.strokeColor = new paper.Color('#1f6feb')
      path.strokeWidth = 8
      path.strokeCap = 'round'
      path.add(event.point)
    }

    tool.onMouseDrag = (event: paper.ToolEvent) => {
      if (toolMode !== 'pen' || !path) return
      path.add(event.point)
      // smooth continuously
      if (path.segments.length % 6 === 0) path.smooth({type: 'continuous'})
    }

    tool.onMouseUp = () => {
      if (!path) return
      path.simplify(2)
      path.smooth({type: 'continuous'})
      path.closed = false
      path = null
    }

    return () => {
      tool.remove()
      projectRef.current?.clear()
    }
  }, [toolMode])

  useEffect(() => {
    const btn = document.getElementById('exportLottie')
    const onClick = async () => {
      if (!projectRef.current) return
      const exportJson = bakeToLottie(projectRef.current, {fps: 30, duration: 1})
      const blob = new Blob([JSON.stringify(exportJson, null, 2)], {type: 'application/json'})
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'animation.lottie.json'
      a.click()
      URL.revokeObjectURL(url)
    }
    btn?.addEventListener('click', onClick)
    return () => btn?.removeEventListener('click', onClick)
  }, [])

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: 8}}>
        <button onClick={() => setToolMode('pen')} style={{marginRight: 8}}>Pen</button>
        <button onClick={() => setToolMode('select')}>Select (placeholder)</button>
      </div>
      <div style={{flex: 1, padding: 8}}>
        <canvas ref={canvasRef} resize="true" style={{width: '100%', height: '100%', background: '#f8fbfd', borderRadius: 8}} />
      </div>
    </div>
  )
}
