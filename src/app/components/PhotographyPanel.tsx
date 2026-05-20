import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Columns2, Maximize, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

import p1Img from '../../imports/p1-1.jpeg';
import p2Img from '../../imports/p2-1.jpeg';
import p3Img from '../../imports/p3-1.jpeg';
import p5Img from '../../imports/p5-1.JPG';
import p8Img from '../../imports/p8-1.JPG';
import p9Img from '../../imports/p9-1.JPG';

const PDF_PREVIEW = 'https://drive.google.com/file/d/16wH8hhi7Gdfbcbxfr6zNfVr30fkD8Ffj/preview';

interface PhotoData {
  src: string;
  caption: string;
  fullCaption: string;
  settings: Record<string, string>;
  mood: 'bright' | 'warm' | 'dark';
  bg: string;
}

const photos: PhotoData[] = [
  {
    src: p1Img,
    caption: '"Where ideas begin."',
    fullCaption: 'The intersection of creation and environment — capturing the moment where music meets motion, and thought turns into rhythm.',
    settings: { Aperture: 'f/2.8', 'Shutter Speed': '1/500 sec', ISO: '100', 'Focal Length': '35mm', 'White Balance': 'Warm (Golden Hour)' },
    mood: 'bright',
    bg: 'from-amber-950 to-stone-950',
  },
  {
    src: p2Img,
    caption: '"Focus in chaos."',
    fullCaption: 'A shallow depth of field isolates the instrument, mirroring how creators tune out noise to find clarity.',
    settings: { Aperture: 'f/1.8', 'Shutter Speed': '1/800 sec', ISO: '125', 'Focal Length': '50mm', 'Focus Mode': 'Single-point AF' },
    mood: 'warm',
    bg: 'from-orange-950 to-neutral-950',
  },
  {
    src: p3Img,
    caption: '"Precision in detail."',
    fullCaption: 'Close framing highlights the tactile nature of music — every key, a decision; every note, a deliberate action.',
    settings: { Aperture: 'f/4', 'Shutter Speed': '1/320 sec', ISO: '100', 'Focal Length': '85mm (macro-style framing)' },
    mood: 'warm',
    bg: 'from-yellow-950 to-zinc-950',
  },
  {
    src: p5Img,
    caption: '"Sound expands into space."',
    fullCaption: 'A wide composition capturing how creativity extends beyond the individual — blending into environment, light, and scale.',
    settings: { Aperture: 'f/8', 'Shutter Speed': '1/200 sec', ISO: '100', 'Focal Length': '24mm (wide angle)' },
    mood: 'warm',
    bg: 'from-rose-950 to-slate-950',
  },
  {
    src: p8Img,
    caption: '"When light becomes rhythm."',
    fullCaption: 'Golden hour reflections create contrast and depth, transforming a static object into an emotional composition.',
    settings: { Aperture: 'f/2.2', 'Shutter Speed': '1/160 sec', ISO: '200', 'Exposure Comp': '-0.3', Metering: 'Spot' },
    mood: 'dark',
    bg: 'from-purple-950 to-gray-950',
  },
  {
    src: p9Img,
    caption: '"Closing the loop."',
    fullCaption: 'The final frame — where sound fades into silence, and the environment takes over the narrative.',
    settings: { Aperture: 'f/5.6', 'Shutter Speed': '1/250 sec', ISO: '100', 'White Balance': 'Sunset / Cloudy' },
    mood: 'dark',
    bg: 'from-slate-950 to-black',
  },
];

const approach = [
  'Focus on natural lighting and environmental storytelling',
  'Use depth of field to guide viewer attention',
  'Capture transitions (light → shadow, noise → silence)',
  'Treat each frame as part of a larger narrative',
];

type ViewMode = 'scroll' | 'play' | 'split';

interface Props { onClose: () => void; }

export function PhotographyPanel({ onClose }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('scroll');
  const [playIdx, setPlayIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<'pdf' | 'gallery'>('gallery');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose]);

  // Play mode auto-advance
  useEffect(() => {
    if (viewMode === 'play' && isPlaying) {
      intervalRef.current = setInterval(() => {
        setPlayIdx(i => (i + 1) % photos.length);
      }, 3500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [viewMode, isPlaying]);

  const startPlay = () => { setViewMode('play'); setIsPlaying(true); setPlayIdx(0); };
  const stopPlay = () => { setIsPlaying(false); setViewMode('scroll'); };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a] text-white"
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/10 flex items-center justify-between px-6 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ y: [0, -4, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <Camera className="w-5 h-5 text-[#fb923c]" />
          </motion.div>
          <div>
            <div className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Photography</div>
            <div className="text-xs text-white/40">Sound, Light &amp; Solitude</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Section toggle */}
          <div className="flex bg-white/10 rounded-xl p-1 text-xs gap-1">
            <button
              onClick={() => setActiveSection('gallery')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeSection === 'gallery' ? 'bg-[#fb923c] text-black font-medium' : 'text-white/60 hover:text-white'}`}
            >Gallery</button>
            <button
              onClick={() => setActiveSection('pdf')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeSection === 'pdf' ? 'bg-[#fb923c] text-black font-medium' : 'text-white/60 hover:text-white'}`}
            >Collection</button>
          </div>

          {activeSection === 'gallery' && (
            <>
              {/* Play toggle */}
              {viewMode === 'play' ? (
                <button onClick={stopPlay} className="flex items-center gap-2 px-3 py-1.5 bg-white/15 hover:bg-white/20 rounded-xl text-xs transition-colors">
                  <Pause className="w-3.5 h-3.5" /> Stop
                </button>
              ) : (
                <button onClick={startPlay} className="flex items-center gap-2 px-3 py-1.5 bg-[#fb923c] text-black rounded-xl text-xs hover:bg-[#f97316] transition-colors font-medium">
                  <Play className="w-3.5 h-3.5" /> Play Series
                </button>
              )}
              {/* Split view toggle */}
              {viewMode !== 'play' && (
                <button
                  onClick={() => setViewMode(v => v === 'split' ? 'scroll' : 'split')}
                  className={`p-2 rounded-xl text-xs transition-colors ${viewMode === 'split' ? 'bg-[#fb923c] text-black' : 'bg-white/10 hover:bg-white/20'}`}
                  title="Split View"
                >
                  {viewMode === 'split' ? <Maximize className="w-4 h-4" /> : <Columns2 className="w-4 h-4" />}
                </button>
              )}
            </>
          )}
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">

          {/* ── PDF Section ── */}
          {activeSection === 'pdf' && (
            <motion.div
              key="pdf"
              className="w-full h-full flex flex-col"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div className="px-6 py-4 border-b border-white/10 text-sm text-white/50">
                Photography Collection
              </div>
              <div className="flex-1 bg-black">
                <iframe src={PDF_PREVIEW} className="w-full h-full" style={{ border: 'none' }} title="Photography Collection" />
              </div>
            </motion.div>
          )}

          {/* ── Gallery: Scroll Story ── */}
          {activeSection === 'gallery' && viewMode === 'scroll' && (
            <motion.div
              key="scroll"
              className="h-full overflow-y-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {/* Series Header */}
              <div className="max-w-3xl mx-auto px-6 pt-12 pb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-[#fb923c] text-xs uppercase tracking-widest mb-3 font-medium">Visual Series</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
                    Sound, Light<br />&amp; Solitude
                  </h2>
                  <p className="text-white/50 mt-4 text-base leading-relaxed max-w-lg">
                    A visual study of rhythm beyond music — capturing how environments, light, and stillness create their own compositions.
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    {(['bright', 'warm', 'dark'] as const).map((m, i) => (
                      <div key={m} className="flex items-center gap-2">
                        <div className={`w-6 h-1.5 rounded-full ${m === 'bright' ? 'bg-amber-400' : m === 'warm' ? 'bg-orange-500' : 'bg-slate-700'}`} />
                        <span className="text-xs text-white/40 capitalize">{m}</span>
                        {i < 2 && <span className="text-white/20 ml-1">→</span>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Photos — vertical scroll story */}
              <div className="space-y-2 pb-16">
                {photos.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    className={`relative w-full bg-gradient-to-b ${photo.bg} overflow-hidden group`}
                    style={{ minHeight: '90vh' }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Photo */}
                    <div className="flex items-center justify-center w-full h-full min-h-[90vh] p-6">
                      <div className="relative max-w-4xl w-full">
                        <motion.img
                          src={photo.src}
                          alt={photo.caption}
                          className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                          style={{ maxHeight: '75vh' }}
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.4 }}
                        />

                        {/* Settings overlay on hover */}
                        <AnimatePresence>
                          {hoveredIdx === idx && (
                            <motion.div
                              className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10 min-w-[200px]"
                              initial={{ opacity: 0, scale: 0.9, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                                <Camera className="w-3.5 h-3.5 text-[#fb923c]" />
                                <span className="text-xs font-bold text-[#fb923c] uppercase tracking-wider">Camera Data</span>
                              </div>
                              <div className="space-y-1.5">
                                {Object.entries(photo.settings).map(([k, v]) => (
                                  <div key={k} className="flex justify-between gap-4 text-xs">
                                    <span className="text-white/40">{k}</span>
                                    <span className="text-white font-mono">{v}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Index badge */}
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-xs text-white/60 font-mono">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>

                    {/* Caption block */}
                    <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
                      <div className="max-w-2xl mx-auto">
                        <motion.p
                          className="text-2xl text-white/90 mb-2"
                          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                          animate={hoveredIdx === idx ? { y: -4 } : { y: 0 }}
                        >
                          {photo.caption}
                        </motion.p>
                        <AnimatePresence>
                          {hoveredIdx === idx && (
                            <motion.p
                              className="text-sm text-white/50 leading-relaxed"
                              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                            >
                              {photo.fullCaption}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        {/* Mood indicator */}
                        <div className="mt-3 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${photo.mood === 'bright' ? 'bg-amber-400' : photo.mood === 'warm' ? 'bg-orange-500' : 'bg-slate-500'}`} />
                          <span className="text-xs text-white/30 capitalize">{photo.mood}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Approach section */}
              <div className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10">
                <p className="text-[#fb923c] text-xs uppercase tracking-widest mb-4 font-medium">Craft</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }} className="mb-8">
                  Approach to Photography
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {approach.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl"
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-[#fb923c] mt-0.5 shrink-0 font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Gallery: Split View ── */}
          {activeSection === 'gallery' && viewMode === 'split' && (
            <motion.div
              key="split"
              className="h-full overflow-y-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                <p className="text-white/40 text-sm">Split view — image alongside technical data</p>
                {photos.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    className="grid md:grid-cols-2 gap-6 items-center"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                  >
                    {/* Image side */}
                    <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${photo.bg} p-3`}>
                      <img src={photo.src} alt={photo.caption} className="w-full h-64 object-cover rounded-xl" />
                    </div>
                    {/* Settings side */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-white/30 text-xs font-mono">{String(idx + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
                        <p className="text-xl text-white mt-1" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                          {photo.caption}
                        </p>
                        <p className="text-white/50 text-sm mt-2 leading-relaxed">{photo.fullCaption}</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                          <Camera className="w-4 h-4 text-[#fb923c]" />
                          <span className="text-xs font-bold text-[#fb923c] uppercase tracking-wider">EXIF / Settings</span>
                          <div className={`ml-auto w-2 h-2 rounded-full ${photo.mood === 'bright' ? 'bg-amber-400' : photo.mood === 'warm' ? 'bg-orange-500' : 'bg-slate-500'}`} />
                          <span className="text-xs text-white/30 capitalize">{photo.mood}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(photo.settings).map(([k, v]) => (
                            <div key={k}>
                              <div className="text-xs text-white/30 mb-0.5">{k}</div>
                              <div className="text-sm font-mono text-white">{v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Play Mode ── */}
          {activeSection === 'gallery' && viewMode === 'play' && (
            <motion.div
              key="play"
              className="h-full flex flex-col"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {/* Progress bar */}
              <div className="h-0.5 bg-white/10 shrink-0">
                <motion.div
                  className="h-full bg-[#fb923c]"
                  key={playIdx}
                  initial={{ width: '0%' }} animate={{ width: '100%' }}
                  transition={{ duration: 3.5, ease: 'linear' }}
                />
              </div>

              {/* Full-screen photo */}
              <div className={`flex-1 bg-gradient-to-b ${photos[playIdx].bg} relative flex items-center justify-center overflow-hidden`}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={playIdx}
                    src={photos[playIdx].src}
                    alt={photos[playIdx].caption}
                    className="max-h-[75vh] max-w-[80vw] object-contain rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                </AnimatePresence>

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-10 pt-16 pb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={playIdx}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-2xl text-white/90 mb-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        {photos[playIdx].caption}
                      </p>
                      <p className="text-sm text-white/50 max-w-xl">{photos[playIdx].fullCaption}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Side nav arrows */}
                <button
                  onClick={() => setPlayIdx(i => (i - 1 + photos.length) % photos.length)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-2xl transition-colors backdrop-blur"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPlayIdx(i => (i + 1) % photos.length)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-2xl transition-colors backdrop-blur"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Frame counter */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPlayIdx(i)}
                      className={`rounded-full transition-all ${i === playIdx ? 'w-6 h-2 bg-[#fb923c]' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Play / Pause */}
              <div className="shrink-0 border-t border-white/10 flex items-center justify-center gap-4 py-4 bg-[#0a0a0a]">
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#fb923c] text-black rounded-xl font-medium text-sm hover:bg-[#f97316] transition-colors"
                >
                  {isPlaying ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Resume</>}
                </button>
                <span className="text-white/30 text-xs font-mono">{playIdx + 1} / {photos.length}</span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}