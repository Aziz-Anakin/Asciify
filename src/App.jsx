import { useState, useEffect, useRef } from 'react';
import Dither from './components/Dither.jsx';
import DepthText from './components/DepthText.jsx';
import Avatar3D from './components/Avatar3D.jsx';
import ClickSpark from './components/ClickSpark.jsx';
import Magnet from './components/Magnet.jsx';
import ElectricBorder from './components/ElectricBorder.jsx';
import DecryptedText from './components/DecryptedText.jsx';

/* ------------------------------------------------------------------ */
/*  PROFIL & LIENS                                                      */
/* ------------------------------------------------------------------ */
const PROFILE = {
  name: 'Aziz Anakin',
  avatar: 'https://avatars.githubusercontent.com/u/134959102?v=4',
};

const LINKS = [
  { label: 'Portfolio', url: 'https://aziz-anakin.github.io/Portfolio/',             icon: 'portfolio', accent: '#22D3EE' },
  { label: 'GitHub',    url: 'https://github.com/Aziz-Anakin',                       icon: 'github',    accent: '#ffffff' },
  { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/yanis-mdoughy-558a1028b/', icon: 'linkedin',  accent: '#0A66C2' },
];

/* ------------------------------------------------------------------ */
/*  TEXTES i18n                                                         */
/* ------------------------------------------------------------------ */
const STRINGS = {
  bio: "Passionné par l'informatique et les jeux vidéo",
  sub: {
    Portfolio: 'Mes réalisations & compétences',
    GitHub:    'Mes projets & code source',
    LinkedIn:  'Mon parcours professionnel',
  },
  copied: 'Copié !',
  shared: 'Lien copié !',
};

/* ------------------------------------------------------------------ */
/*  ICÔNES                                                              */
/* ------------------------------------------------------------------ */
const Icon = ({ name, className }) => {
  switch (name) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
        </svg>
      );
    case 'portfolio':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    default:
      return null;
  }
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const initials = (name) =>
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

/* ------------------------------------------------------------------ */
/*  CARTE LIEN                                                          */
/* ------------------------------------------------------------------ */
function LinkCard({ link, sublabel, index, copiedLabel }) {
  const isCopy = Boolean(link.copyText);
  const isExternal = !isCopy && link.url && !link.url.startsWith('mailto:');
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.copyText);
    } catch {}
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Magnet
      padding={40}
      magnetStrength={12}
      wrapperClassName="fade-up"
      innerClassName="block w-full"
      style={{ display: 'block', width: '100%', animationDelay: `${0.15 + index * 0.08}s` }}
    >
      <ElectricBorder color="#00D98C" speed={0.8} chaos={0.06} borderRadius={4} className="group">
        <div className="link-card relative">
          {isCopy ? (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={`${link.label} — ${copiedLabel}`}
              className="absolute inset-0 z-20"
            />
          ) : (
            <a
              href={link.url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              className="absolute inset-0 z-20"
            />
          )}

          <div className="relative z-10 flex w-full items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[#00D98C] sm:h-10 sm:w-10">
              <Icon name={link.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>

            <span className="min-w-0 flex-1 text-left font-mono">
              <span className="block text-sm font-semibold uppercase tracking-widest text-white">
                <DecryptedText
                  text={link.label}
                  animateOn="view"
                  sequential
                  speed={45}
                  characters="01<>/\{}[]#$%&*"
                />
              </span>
              <span className={`block truncate text-[11px] sm:text-xs ${isCopy && copied ? 'text-[#00D98C]' : 'text-[#00D98C]/55'}`}>
                {'> '}{isCopy && copied ? copiedLabel : sublabel}
              </span>
            </span>

            <span className={`transition-colors duration-300 group-hover:text-[#22D3EE] ${isCopy && copied ? 'text-[#00D98C]' : 'text-[#00D98C]/60'}`}>
              {isCopy ? (copied ? <CheckIcon /> : <CopyIcon />) : <ArrowIcon />}
            </span>
          </div>
        </div>
      </ElectricBorder>
    </Magnet>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  const [shared, setShared] = useState(false);
  const shareTimer = useRef(null);
  const t = STRINGS;

  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    document.addEventListener('copy', prevent);
    document.addEventListener('cut', prevent);
    document.addEventListener('contextmenu', prevent);
    return () => {
      document.removeEventListener('copy', prevent);
      document.removeEventListener('cut', prevent);
      document.removeEventListener('contextmenu', prevent);
    };
  }, []);

  useEffect(() => () => clearTimeout(shareTimer.current), []);

  const handleShare = () => {
    if (typeof navigator.share === 'function') {
      navigator.share({ title: PROFILE.name, text: t.bio, url: window.location.href }).catch(() => {});
      return;
    }
    // Fallback : copie dans le presse-papiers (navigateurs sans Web Share API)
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setShared(true);
    clearTimeout(shareTimer.current);
    shareTimer.current = setTimeout(() => setShared(false), 1600);
  };

  return (
    <ClickSpark sparkColor="#22D3EE" sparkSize={9} sparkRadius={18} sparkCount={9} duration={500}>

      {/* Haut gauche : partage */}
      <div className="fixed top-4 left-4 z-30 fade-up flex gap-2" style={{ animationDelay: '0s' }}>
        <button
          onClick={handleShare}
          aria-label={shared ? t.shared : 'Partager le lien'}
          className={`term-btn ${shared ? 'is-done' : ''}`}
        >
          <span className="term-btn__prompt">~$</span>
          <span>{shared ? 'copied to clipboard ✓' : './share.sh'}</span>
          {!shared && <span className="term-btn__caret" aria-hidden="true" />}
        </button>
      </div>

      <main className="relative min-h-[100svh] w-full overflow-hidden">
        {/* Fond WebGL */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <Dither
            waveColor={[0.0, 0.85, 0.55]}
            backgroundColor={[0, 0.02, 0.03]}
            waveSpeed={0.08}
            waveFrequency={3}
            waveAmplitude={0.3}
            colorNum={4}
            pixelSize={2}
          />
        </div>
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(5,6,10,0.55)_0%,rgba(5,6,10,0.25)_45%,rgba(5,6,10,0.8)_100%)]" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

        <div className="scanlines pointer-events-none fixed inset-0 z-[5]" />

        {/* Contenu */}
        <div className="relative z-10 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-14 sm:h-auto sm:min-h-[100svh] sm:overflow-visible sm:py-16">
          <section className="w-full max-w-md">
            {/* Profil */}
            <header className="flex flex-col items-center text-center">
              <div className="fade-up relative" style={{ animationDelay: '0s' }}>
                {PROFILE.avatar ? (
                  <Avatar3D src={PROFILE.avatar} alt={PROFILE.name} className="h-20 w-20 sm:h-24 sm:w-24" />
                ) : (
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-2xl font-semibold text-white ring-2 ring-white/20 backdrop-blur-sm sm:h-24 sm:w-24">
                    {initials(PROFILE.name)}
                  </div>
                )}
              </div>

              <h1 className="sr-only">{PROFILE.name}</h1>
              <div className="fade-up mt-5 font-mono sm:mt-7" style={{ animationDelay: '0.07s' }} aria-hidden="true">
                <DepthText
                  text={PROFILE.name.toUpperCase()}
                  faceColor="#e6fff5"
                  depthColor="#00D98C"
                  layers={28}
                  depth={1.6}
                  tilt={9}
                  pointerTracking={false}
                  orbitSpeed={0.18}
                  fontSize="clamp(2.1rem, 10.5vw, 5.5rem)"
                  fontWeight={700}
                />
              </div>

              <p className="fade-up mt-1 max-w-sm text-sm font-bold leading-relaxed sm:mt-2 sm:text-base" style={{ animationDelay: '0.12s' }}>
                <span className="font-mono text-[#00D98C]/80">
                  <span className="text-[#22D3EE]">$ </span>
                  <DecryptedText text={t.bio} parentClassName="!inline" animateOn="view" sequential speed={25} characters={'01<>/{}[]#$%&*'} />
                  <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[2px] animate-pulse bg-[#00D98C]" />
                </span>
              </p>
            </header>

            {/* Liens */}
            <nav className="mt-4 flex flex-col gap-1.5 sm:mt-8 sm:gap-3">
              {LINKS.map((link, index) => (
                <LinkCard
                  key={link.label}
                  link={link}
                  sublabel={t.sub[link.label]}
                  index={index}
                  copiedLabel={t.copied}
                />
              ))}
            </nav>
          </section>
        </div>
      </main>
    </ClickSpark>
  );
}
