import React, { useEffect, useState } from 'react';
import './Silhouette.css';

interface Props {
  selectedAnimal: string;
  patientId: string;
  saveEndpoint?: string;
  onSaved?: () => void;
}

const PARTS = ['tail', 'torso', 'head', 'back-leg', 'front-leg'] as const;

const Silhouette: React.FC<Props> = ({
  selectedAnimal,
  patientId,
  saveEndpoint = `${import.meta.env.VITE_API_BASE_URL}/xray/`,
  onSaved,
}) => {
  const [hoveredPart,  setHoveredPart]  = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [side,         setSide]         = useState<'left' | 'right'>('left');
  const [scanning,     setScanning]     = useState(false);
  const [scannedPart,  setScannedPart]  = useState<string | null>(null);
  const [imageSrc,     setImageSrc]     = useState<string | null>(null);

  useEffect(() => setSide('left'), [selectedAnimal]);

  /* ---------- start scan ---------- */
  const handleStart = () => {
    if (!patientId.trim()) { alert('Please select a patient first.'); return; }
    if (!selectedPart)     { alert('Please click a body part.');      return; }

    setScanning(true);
    setScannedPart(null);
    setImageSrc(null);

    setTimeout(() => {
      setScanning(false);
      setScannedPart(selectedPart);
    }, 2000);
  };

  /* ---------- load image ---------- */
  useEffect(() => {
    if (!scannedPart) return;

    // const base = `/xrays/${selectedAnimal.toLowerCase()}_${side}_${scannedPart.replace('-', '')}`;
    const base = `/xrays/${selectedAnimal.toLowerCase()}_${scannedPart.replace('-', '')}`;


    const tryExt = (ext: 'png'|'jpg') =>
      new Promise<string | null>(resolve => {
        const src = `${base}.${ext}`;
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null);
      });

    (async () => {
      const found = (await tryExt('png')) || (await tryExt('jpg')) || '/xrays/placeholder.png';
      setImageSrc(found);
    })();
  }, [scannedPart, selectedAnimal, side]);

  /* ---------- save to backend ---------- */
  useEffect(() => {
    if (!imageSrc || !scannedPart || !patientId) return;

    (async () => {
      try {
        const res = await fetch(saveEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            patient_id : patientId,
            side,
            body_part  : scannedPart,
            species    : selectedAnimal,
            xray_image : imageSrc,
          }),
        });
        if (res.ok) onSaved?.();
        else console.error('X-ray save failed', await res.text());
      } catch (err) { console.error('Save error', err); }
    })();
  }, [imageSrc, scannedPart, side, selectedAnimal, patientId, saveEndpoint, onSaved]);

  /* ---------- helper ---------- */
  const silhouettes: Record<string,string> = {
    dog:'/dog.png', cat:'/cat.png', horse:'/horse.png', rabbit:'/rabbit.png'
  };

  /* ---------- render ---------- */
  return (
    <div className="silhouette-side">
      <div className="silhouette-display">
        <div className="silhouette-wrapper">
          <img
            src={silhouettes[selectedAnimal.toLowerCase()] || ''}
            alt={`${selectedAnimal} silhouette`}
            className={`animal-silhouette ${selectedAnimal.toLowerCase()}`}
          />

          {PARTS.map(p => (
            <div
              key={p}
              className={`highlight-zone ${p} ${hoveredPart===p?'hovered':''} ${selectedPart===p?'selected':''}`}
              onMouseEnter={() => setHoveredPart(p)}
              onMouseLeave={() => setHoveredPart(null)}
              onClick={() => setSelectedPart(p)}
            />
          ))}

          {hoveredPart && (
            <div className="hover-label">
              {hoveredPart.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </div>
          )}
        </div>
      </div>

      <div className="controls-container">
        <button className="start-scan-button" onClick={handleStart} disabled={!selectedPart||scanning}>
          Start Scan
        </button>

        <div className="side-button-group">
          <button className={`side-button ${side==='left'?'active':''}`}  onClick={()=>setSide('left')}  disabled={scanning}>Left</button>
          <button className={`side-button ${side==='right'?'active':''}`} onClick={()=>setSide('right')} disabled={scanning}>Right</button>
        </div>
      </div>

      {/* debug line – remove if you like */}
      <div style={{ marginTop:'6px', fontSize:'0.8rem', color:'blue' }}>
        <b>Patient:</b> {patientId || 'None'}
      </div>

      {scanning && (
        <div className="scan-popup"><div className="scan-content"><div className="spinner" /><p>Starting scan…</p></div></div>
      )}

      {imageSrc && (
        <div className="xray-image-container">
          <button className="close-xray-button" onClick={()=>setScannedPart(null)}>×</button>
          <img src={imageSrc} alt="X-ray result" className="xray-image" />
        </div>
      )}
    </div>
  );
};

export default Silhouette;
