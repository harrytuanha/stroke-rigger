import React from 'react'
import SketchCanvas from './components/SketchCanvas'

export default function App() {
  return (
    <div style={{display: 'flex', height: '100vh', gap: 16}}>
      <div style={{flex: 1}}>
        <h2 style={{margin: 8}}>stroke-rigger — Prototype</h2>
        <SketchCanvas />
      </div>
      <div style={{width: 360, padding: 12, borderLeft: '1px solid #eee'}}>
        <h3>Tools</h3>
        <p>Draw with the pen. Use the toolbar to switch tools (placeholder).</p>
        <button id="exportLottie">Export Lottie (baked)</button>
        <div style={{marginTop: 12}}>
          <h4>Notes</h4>
          <ul>
            <li>Initial scaffold: draw → convert to paths</li>
            <li>Rigging, mesh, weight paint and advanced exporters are in-progress</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
