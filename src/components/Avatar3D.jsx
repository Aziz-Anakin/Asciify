import './Avatar3D.css';

// Photo de profil en "pièce" 3D : tranche empilée en profondeur,
// oscillation automatique (même principe que DepthText).
export default function Avatar3D({ src, alt, layers = 12, depth = 1.2, className = '' }) {
  return (
    <div className={`avatar3d ${className}`.trim()}>
      <div className="avatar3d__stage">
        {Array.from({ length: layers }, (_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="avatar3d__layer"
            style={{ transform: `translateZ(${-(layers - i) * depth}px)` }}
          />
        ))}
        <img src={src} alt={alt} className="avatar3d__face" draggable="false" />
      </div>
    </div>
  );
}
