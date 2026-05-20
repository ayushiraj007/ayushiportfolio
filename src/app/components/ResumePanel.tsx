import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const RESUME_URL = 'https://drive.google.com/file/d/11PHPmnLC948DcNSlRsLQs_-XvnWNIVpD';
const PREVIEW_URL = `${RESUME_URL}/preview`;
const DOWNLOAD_URL = `${RESUME_URL}/view?usp=sharing`;

export function ResumePanel({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="resume-backdrop"
        className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      {/* Panel */}
      <motion.div
        key="resume-panel"
        className="fixed right-0 top-0 bottom-0 z-[120] flex flex-col bg-background border-l border-border shadow-2xl"
        style={{ width: 'min(680px, 95vw)' }}
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#a78bfa] flex items-center justify-center">
              <span className="text-white text-xs font-bold">CV</span>
            </div>
            <div>
              <div className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Ayushi Raj — Resume</div>
              <div className="text-xs text-muted-foreground">Product Management & UX Leadership</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#a78bfa] text-white rounded-xl text-sm hover:bg-[#9061f9] transition-colors"
            >
              <Download className="w-4 h-4" />
              Open in Drive
            </a>
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary hover:bg-muted rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-[#1a1a1a]">
          <iframe
            src={PREVIEW_URL}
            className="w-full h-full"
            style={{ border: 'none' }}
            title="Ayushi Raj Resume"
            allow="autoplay"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}