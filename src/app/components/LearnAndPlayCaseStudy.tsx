import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

// Proper Vite asset imports — fixes broken images
import ideation1Img from '../../imports/Ideation_-_1_(1)-1.jpeg';
import ideation2Img from '../../imports/Ideation_-_2_-__Networking_(1)-1.jpeg';
import ideation3Img from '../../imports/Ideation_-_3_-_Negotiation_(1)-1.jpeg';
import appScreenImg from '../../imports/Screen_Shot_2023-04-12_at_2.05.08_PM_(1)-1.png';

// PDF asset imports — handled natively by Vite via assetsInclude in vite.config.ts
import researchPlanPdf from '../../imports/Research_Plan_LP-3.pdf';
import personasPdf from '../../imports/personas_template-3.pdf';

interface Props {
  onClose: () => void;
}

const participants = [
  {
    name: 'Alex',
    age: 18,
    gender: 'M',
    location: 'US',
    education: 'Recently graduated from high school, starting college in the fall',
    background: 'Tech-savvy and outgoing. Enjoys exploring new things, looking for ways to challenge himself. Values experiences that are both educational and engaging.',
    interests: 'Technology, gaming, sports, music. Interested in coding and game development.',
    goals: 'Continue learning and expanding skills in a fun and interactive way.',
    challenges: 'Sometimes struggles with staying focused and motivated when studying.',
    color: 'bg-[#c4b5fd]',
  },
  {
    name: 'Maria',
    age: 21,
    gender: 'F',
    location: 'US (TX)',
    education: 'Currently attending community college, working part-time',
    background: 'Creative and outgoing. Fluent in English and Spanish. Values experiences that are both educational and fun.',
    interests: 'Art, music, fashion, sports, literature. Interested in web design and digital marketing.',
    goals: 'Expand skills in a fun way, connect with others who share her interests.',
    challenges: 'Time management, easily distracted, overwhelmed by information online.',
    color: 'bg-[#f9a8d4]',
  },
  {
    name: 'David',
    age: 25,
    gender: 'M',
    location: 'US (CA)',
    education: 'Recently graduated with a Bachelor\'s in Business Administration. Job hunting.',
    background: 'Hardworking and ambitious. Values personal growth and continuous learning.',
    interests: 'Entrepreneurship, marketing, technology, gaming, team sports.',
    goals: 'Secure a job that combines gaming passion with business skills. Learn practical skills.',
    challenges: 'Competitive job market, limited work experience, average academic performance.',
    color: 'bg-[#6ee7b7]',
  },
  {
    name: 'Ravi',
    age: 24,
    gender: 'M',
    location: 'US (NY)',
    education: 'Engineering undergraduate + recently completed graduate degree in Business',
    background: 'International student. Hardworking and ambitious. Looking for opportunities to grow.',
    interests: 'Technology, business, entrepreneurship. Books on management, tech trends, basketball.',
    goals: 'Find a role in tech or business. Improve communication and networking skills.',
    challenges: 'Limited US work experience, competitive job market, work-life balance.',
    color: 'bg-[#93c5fd]',
  },
  {
    name: 'Sam',
    age: 19,
    gender: 'M',
    location: 'US (Midwest)',
    education: 'Completed high school. Working in a factory.',
    background: 'Not interested in further formal education. Wants to build a successful manufacturing career.',
    interests: 'Sports, technology, gaming, basketball, football.',
    goals: 'Develop skills in machine operation, quality control, supply chain. Build a professional network.',
    challenges: 'Limited work experience, competitive job market, limited advancement opportunities.',
    color: 'bg-[#fde68a]',
  },
  {
    name: 'Julia',
    age: 24,
    gender: 'F',
    location: 'US',
    education: 'High School Graduate',
    background: 'Primary breadwinner for her family. Passion for learning but financial constraints limited higher education.',
    interests: 'Technology, science, health, music. Reads health articles, attends concerts.',
    goals: 'Advance career, improve earning potential, learn new skills to open new career opportunities.',
    challenges: 'Lack of formal education, limited advancement in current job, financial constraints.',
    color: 'bg-[#fca5a5]',
  },
];

const sections = [
  { id: 'problem', label: '01 Problem' },
  { id: 'research', label: '02 Research' },
  { id: 'participants', label: '03 Participants' },
  { id: 'insights', label: '04 Insights' },
  { id: 'personas', label: '05 Personas' },
  { id: 'ideation', label: '06 Ideation' },
  { id: 'design', label: '07 Design' },
  { id: 'solution', label: '08 Solution' },
  { id: 'impact', label: '09 Impact' },
  { id: 'reflection', label: '10 Reflection' },
];

export function LearnAndPlayCaseStudy({ onClose }: Props) {
  const [activeSection, setActiveSection] = useState('problem');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [participantIdx, setParticipantIdx] = useState(0);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImg) setLightboxImg(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxImg, onClose]);

  // Track active section on scroll
  useEffect(() => {
    const container = document.getElementById('lp-scroll-container');
    if (!container) return;
    const handleScroll = () => {
      for (const sec of sections) {
        const el = document.getElementById(`lp-${sec.id}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 200) {
          setActiveSection(sec.id);
          break;
        }
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`lp-${id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const ideationImages = [
    { src: ideation1Img, label: 'Initial Ideation Board', caption: 'Early sticky-note brainstorm mapping user pain points to potential solutions' },
    { src: ideation2Img, label: 'Networking Ideation', caption: 'Whiteboarding AI-driven networking concepts and matching models' },
    { src: ideation3Img, label: 'Negotiation & Decision Flow', caption: 'Mapping negotiation scenarios and decision tree simulations' },
  ];
  const [ideationIdx, setIdeationIdx] = useState(0);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-background"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border flex items-center justify-between px-6 py-3 shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </button>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#a78bfa]" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }} className="text-base">
            Learn &amp; Play
          </span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body: sidebar + scroll content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar Nav (desktop) */}
        <nav className="hidden lg:flex flex-col gap-1 w-44 shrink-0 py-8 px-4 border-r border-border overflow-y-auto">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`text-left px-3 py-2 rounded-xl text-xs transition-all ${
                activeSection === s.id
                  ? 'bg-[#a78bfa]/20 text-[#a78bfa] font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Scrollable Content */}
        <div id="lp-scroll-container" className="flex-1 overflow-y-auto">
          {/* ─── HERO ─── */}
          <div className="relative bg-[#4c1d95] overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c4b5fd 0%, transparent 50%)'
            }} />
            <div className="relative max-w-4xl mx-auto px-8 py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs">UX Research & Design</span>
                  <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs">2023</span>
                </div>
                <h1
                  className="text-white mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1 }}
                >
                  Learn &amp; Play
                </h1>
                <p className="text-purple-200 text-lg max-w-xl leading-relaxed mb-8">
                  Reducing overwhelm in early career decisions through play, AI, and human-centered learning
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Gamification', 'AI Platform', 'Career Exploration', 'Human-Centered Design', 'Gen Z'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-white/10 border border-white/20 text-white/90 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 space-y-24">

            {/* ─── 01 THE PROBLEM ─── */}
            <section id="lp-problem">
              <SectionLabel number="01" title="The Problem" color="text-[#f87171]" />
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <motion.div
                  className="bg-[#f87171]/10 border border-[#f87171]/30 p-8 rounded-2xl"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                >
                  <div className="text-5xl mb-4">😵</div>
                  <h3 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
                    Decision Paralysis
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Today's young professionals are overwhelmed by too many choices, unstructured information,
                    inefficient networking, and disconnected learning experiences.
                  </p>
                </motion.div>
                <motion.div
                  className="bg-[#fbbf24]/10 border border-[#fbbf24]/30 p-8 rounded-2xl"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                >
                  <div className="text-5xl mb-4">📉</div>
                  <h3 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
                    More Choice ≠ Better Decisions
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    More choice has not led to better decisions — it has led to decision paralysis.
                    Gen Z is drowning in information but starving for structured direction.
                  </p>
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { stat: '41%', label: 'of professionals want to network more but lack time' },
                  { stat: '18–25', label: 'age range most affected by decision paralysis' },
                  { stat: '3×', label: 'more effective when learning feels like play' },
                ].map((item) => (
                  <div key={item.stat} className="bg-secondary p-5 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-[#a78bfa] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.stat}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{item.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── 02 RESEARCH PLAN ─── */}
            <section id="lp-research">
              <SectionLabel number="02" title="Research Plan" color="text-[#60a5fa]" />
              <p className="text-muted-foreground mt-4 mb-6 text-sm leading-relaxed max-w-2xl">
                The mission: provide holistic solutions through global learning tools at the intersection of education and entertainment — accessible, effective, and efficient.
              </p>
              {/* Embedded Research Plan PDF */}
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                <div className="bg-secondary px-5 py-3 flex items-center gap-2 border-b border-border">
                  <span className="w-3 h-3 rounded-full bg-[#f87171]" />
                  <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                  <span className="w-3 h-3 rounded-full bg-[#34d399]" />
                  <span className="ml-3 text-xs text-muted-foreground">Research Plan</span>
                </div>
                <iframe
                  src={researchPlanPdf}
                  className="w-full"
                  style={{ height: '680px', border: 'none', background: '#f5f0f0' }}
                  title="Research Plan"
                />
              </div>

              {/* Research methods highlight */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-secondary p-6 rounded-2xl">
                  <h4 className="font-bold mb-4 text-[#60a5fa]" style={{ fontFamily: 'var(--font-display)' }}>
                    Secondary Research
                  </h4>
                  <ul className="space-y-2">
                    {['Literature Review', 'Industry Reports', 'Psycho-Aesthetic Maps', 'Market Research', 'Ecosystem Mapping', 'Patent Research', 'Social Media Analysis'].map((m, i) => (
                      <li key={m} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-[#60a5fa]/20 text-[#60a5fa] flex items-center justify-center text-xs shrink-0">{i + 1}</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-secondary p-6 rounded-2xl">
                  <h4 className="font-bold mb-4 text-[#34d399]" style={{ fontFamily: 'var(--font-display)' }}>
                    Primary Research
                  </h4>
                  <ul className="space-y-2">
                    {['Interviews', 'Surveys', 'User Groups / Focus Groups', 'Contextual Inquiry', 'Diary Study', 'Usability Test'].map((m, i) => (
                      <li key={m} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-[#34d399]/20 text-[#34d399] flex items-center justify-center text-xs shrink-0">{i + 1}</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Research scope themes */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Question Themes</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: '💬', label: 'Sources', desc: 'What sources do young adults use for life skills?' },
                    { icon: '⏱️', label: 'Time', desc: 'How much time weekly is spent learning?' },
                    { icon: '🎯', label: 'Engagement', desc: 'What keeps learners engaged consistently?' },
                    { icon: '🏆', label: 'Competition', desc: 'Who is the competition and what are they doing?' },
                  ].map((t) => (
                    <div key={t.label} className="bg-[#a78bfa]/10 border border-[#a78bfa]/20 p-4 rounded-2xl text-center">
                      <div className="text-2xl mb-2">{t.icon}</div>
                      <div className="font-medium text-sm mb-1">{t.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Focus Components */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Design Focus Components</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Learnability', desc: 'The product must be easy to use from first interaction' },
                    { label: 'Memorability', desc: 'Users can re-establish proficiency after periods away' },
                    { label: 'Efficiency', desc: 'Efficient temporally and monetarily for all users' },
                    { label: 'Persuasive', desc: 'Gamified to keep users consistently engaged' },
                  ].map((c, i) => (
                    <div key={c.label} className={`p-4 rounded-2xl ${i % 2 === 0 ? 'bg-[#f87171]/10 border border-[#f87171]/20' : 'bg-[#60a5fa]/10 border border-[#60a5fa]/20'}`}>
                      <div className="font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-display)' }}>{c.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{c.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── 03 PARTICIPANT PROFILES ─── */}
            <section id="lp-participants">
              <SectionLabel number="03" title="Research Participant Profiles" color="text-[#34d399]" />
              <p className="text-muted-foreground mt-4 mb-6 text-sm">
                6 participants representing diverse backgrounds, all Gen Z adults aged 18–25
              </p>

              {/* Mobile carousel */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={participantIdx}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className={`${participants[participantIdx].color} text-black p-6 rounded-2xl`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
                            {participants[participantIdx].name}
                          </h3>
                          <p className="text-sm opacity-70">
                            Age {participants[participantIdx].age} · {participants[participantIdx].gender} · {participants[participantIdx].location}
                          </p>
                        </div>
                        <span className="text-4xl">
                          {['🎓', '🎨', '💼', '🌍', '🏭', '💪'][participantIdx]}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Education</label>
                          <p className="text-sm mt-1">{participants[participantIdx].education}</p>
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Background</label>
                          <p className="text-sm mt-1">{participants[participantIdx].background}</p>
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Interests</label>
                          <p className="text-sm mt-1">{participants[participantIdx].interests}</p>
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Goals</label>
                          <p className="text-sm mt-1">{participants[participantIdx].goals}</p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Challenges</label>
                          <p className="text-sm mt-1">{participants[participantIdx].challenges}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setParticipantIdx((i) => (i - 1 + participants.length) % participants.length)}
                    className="p-2 bg-secondary hover:bg-muted rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {participants.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setParticipantIdx(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${i === participantIdx ? 'bg-[#a78bfa] scale-125' : 'bg-muted-foreground/30'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setParticipantIdx((i) => (i + 1) % participants.length)}
                    className="p-2 bg-secondary hover:bg-muted rounded-xl transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>

            {/* ─── 04 KEY INSIGHTS ─── */}
            <section id="lp-insights">
              <SectionLabel number="04" title="Key Insights" color="text-[#fbbf24]" />
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    icon: '🧭',
                    title: 'Direction, Not Information',
                    body: 'Users don\'t lack information — they lack structured direction. The internet has made information abundant but clarity scarce.',
                    color: 'bg-[#fbbf24]/10 border-[#fbbf24]/30',
                  },
                  {
                    icon: '🎮',
                    title: 'Play Accelerates Learning',
                    body: 'Learning is more effective when it feels like play. Gamified experiences reduce cognitive load and increase retention.',
                    color: 'bg-[#a78bfa]/10 border-[#a78bfa]/30',
                  },
                  {
                    icon: '🔗',
                    title: 'Networking Needs a Rethink',
                    body: 'Networking is high effort and low return. 41% of professionals want to network more but can\'t find the time or the right context.',
                    color: 'bg-[#60a5fa]/10 border-[#60a5fa]/30',
                  },
                ].map((insight) => (
                  <motion.div
                    key={insight.title}
                    className={`border p-6 rounded-2xl ${insight.color}`}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  >
                    <div className="text-3xl mb-3">{insight.icon}</div>
                    <h4 className="font-bold mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
                      {insight.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{insight.body}</p>
                  </motion.div>
                ))}
              </div>

              {/* Networking Research Callout */}
              <div className="mt-6 bg-[#1e1b4b] border border-[#4338ca]/40 p-6 rounded-2xl">
                <h4 className="font-bold text-[#818cf8] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  📄 Secondary Research: The Future of Networking
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Research into AI-driven networking and excessive feed filtering revealed that dating-model swiping apps (Bumble Bizz, Ripple) 
                  are attempting to solve professional networking — but fail to ease the initial barriers. 
                  <span className="text-[#818cf8] font-medium"> AI matching based on career goals and interests is the emerging frontier</span>, 
                  enabling smarter connections with less effort.
                </p>
              </div>
            </section>

            {/* ─── 05 PERSONAS ─── */}
            <section id="lp-personas">
              <SectionLabel number="05" title="Personas" color="text-[#f9a8d4]" />
              <p className="text-muted-foreground mt-4 mb-6 text-sm leading-relaxed max-w-2xl">
                Two primary personas emerged from research, capturing the spectrum of early-career decision making.
                The standard service design persona template was used as the framework.
              </p>

              {/* Personas template PDF embedded as-is */}
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg mb-8">
                <div className="bg-secondary px-5 py-3 flex items-center gap-2 border-b border-border">
                  <span className="w-3 h-3 rounded-full bg-[#f87171]" />
                  <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                  <span className="w-3 h-3 rounded-full bg-[#34d399]" />
                  <span className="ml-3 text-xs text-muted-foreground">User Personas</span>
                </div>
                <iframe
                  src={personasPdf}
                  className="w-full"
                  style={{ height: '680px', border: 'none', background: '#fff' }}
                  title="Personas Template"
                />
              </div>

              {/* Two Filled Persona Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#f9a8d4]/15 border border-[#f9a8d4]/30 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#f9a8d4] flex items-center justify-center text-2xl">🌊</div>
                    <div>
                      <h4 className="font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                        The Overwhelmed Explorer
                      </h4>
                      <p className="text-xs text-muted-foreground">Age 21 · Consumes content, lacks clarity</p>
                    </div>
                  </div>
                  <blockquote className="border-l-2 border-[#f9a8d4] pl-4 italic text-sm text-muted-foreground mb-4">
                    "I watch 10 YouTube videos about careers every week but still don't know what to do with my life."
                  </blockquote>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#f9a8d4]">Needs</span>
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• Structured pathways that filter noise</li>
                        <li>• Bite-sized learning modules</li>
                        <li>• Confidence-building micro-wins</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#f9a8d4]">Challenges</span>
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• Information overload</li>
                        <li>• Lack of personalized guidance</li>
                        <li>• Difficulty prioritizing actions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#93c5fd]/15 border border-[#93c5fd]/30 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#93c5fd] flex items-center justify-center text-2xl">🏗️</div>
                    <div>
                      <h4 className="font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                        The Career Builder
                      </h4>
                      <p className="text-xs text-muted-foreground">Age 24 · Wants to optimize, struggles with tradeoffs</p>
                    </div>
                  </div>
                  <blockquote className="border-l-2 border-[#93c5fd] pl-4 italic text-sm text-muted-foreground mb-4">
                    "I know where I want to go, but every path seems equally risky. How do I choose without regret?"
                  </blockquote>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#93c5fd]">Needs</span>
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• Simulated decision scenarios</li>
                        <li>• AI-driven opportunity matching</li>
                        <li>• Financial planning tools</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#93c5fd]">Challenges</span>
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• Analysis paralysis on tradeoffs</li>
                        <li>• Limited real-world experience</li>
                        <li>• Networking is intimidating</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── 06 IDEATION ─── */}
            <section id="lp-ideation">
              <SectionLabel number="06" title="Ideation Process" color="text-[#34d399]" />
              <p className="text-muted-foreground mt-4 mb-6 text-sm leading-relaxed max-w-2xl">
                Three whiteboarding sessions explored distinct problem spaces: the core learning experience,
                AI-driven networking models, and negotiation / decision simulation flows.
              </p>

              {/* Large ideation image viewer */}
              <div className="rounded-2xl overflow-hidden border border-border">
                <div className="relative bg-black" style={{ minHeight: '420px' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={ideationIdx}
                      src={ideationImages[ideationIdx].src}
                      alt={ideationImages[ideationIdx].label}
                      className="w-full object-contain cursor-zoom-in"
                      style={{ height: '420px' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setLightboxImg(ideationImages[ideationIdx].src)}
                    />
                  </AnimatePresence>
                  <button
                    onClick={() => setIdeationIdx((i) => (i - 1 + ideationImages.length) % ideationImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIdeationIdx((i) => (i + 1) % ideationImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-secondary p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{ideationImages[ideationIdx].label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{ideationImages[ideationIdx].caption}</div>
                    </div>
                    <div className="flex gap-2">
                      {ideationImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIdeationIdx(i)}
                          className={`w-2 h-2 rounded-full transition-all ${i === ideationIdx ? 'bg-[#34d399] scale-125' : 'bg-muted-foreground/30'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-3 gap-3 mt-3">
                {ideationImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setIdeationIdx(i)}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${i === ideationIdx ? 'border-[#34d399]' : 'border-transparent hover:border-muted-foreground/30'}`}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>

              {/* Ideation outcomes */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {[
                  { icon: '🎭', label: 'Learn', ideas: ['Role-playing simulations', 'Career scenario walkthroughs', 'Skill-building mini-games'] },
                  { icon: '🤝', label: 'Network', ideas: ['AI matching algorithm', 'Mentor-mentee pairing', 'Context-aware introductions'] },
                  { icon: '⚖️', label: 'Decide', ideas: ['Decision aggregators', 'AI-powered suggestions', 'Risk/reward visualizer'] },
                ].map((c) => (
                  <div key={c.label} className="bg-secondary p-5 rounded-2xl">
                    <div className="text-2xl mb-2">{c.icon}</div>
                    <h5 className="font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>{c.label}</h5>
                    <ul className="space-y-1.5">
                      {c.ideas.map((idea) => (
                        <li key={idea} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-[#34d399] mt-0.5">→</span>{idea}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── 07 DESIGN / APP SCREENS ─── */}
            <section id="lp-design">
              <SectionLabel number="07" title="App Design" color="text-[#a78bfa]" />
              <p className="text-muted-foreground mt-4 mb-6 text-sm leading-relaxed max-w-2xl">
                High-fidelity Figma screens translated the research into a cohesive interface — featuring an onboarding AI path, career simulation modules, and smart networking flows.
              </p>
              <div className="rounded-2xl overflow-hidden border border-border cursor-zoom-in"
                onClick={() => setLightboxImg(appScreenImg)}
              >
                <img
                  src={appScreenImg}
                  alt="Learn & Play App Design Screens"
                  className="w-full object-contain bg-[#1a1a2e]"
                  style={{ maxHeight: '560px' }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">Click to enlarge · Figma high-fidelity prototype screens</p>
            </section>

            {/* ─── 08 SOLUTION ─── */}
            <section id="lp-solution">
              <SectionLabel number="08" title="Solution & Core Features" color="text-[#fbbf24]" />
              <div className="mt-8 bg-[#a78bfa]/10 border border-[#a78bfa]/20 p-6 rounded-2xl mb-8">
                <p className="text-center text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  A <span className="text-[#a78bfa]">gamified AI platform</span> to explore careers, practice decisions, and build networks — making learning feel like play.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '📚', label: 'Learn', color: 'bg-[#a78bfa]', desc: 'Career simulations & roleplay scenarios', text: 'text-white' },
                  { icon: '💰', label: 'Plan', color: 'bg-[#60a5fa]', desc: 'Financial planning & decision tools', text: 'text-black' },
                  { icon: '🤝', label: 'Network', color: 'bg-[#34d399]', desc: 'AI-powered smart connections', text: 'text-black' },
                  { icon: '🎯', label: 'Decide', color: 'bg-[#fbbf24]', desc: 'Career pathway navigator', text: 'text-black' },
                ].map((f) => (
                  <motion.div
                    key={f.label}
                    className={`${f.color} ${f.text} p-6 rounded-2xl text-center`}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -4 }}
                  >
                    <div className="text-3xl mb-3">{f.icon}</div>
                    <div className="font-bold mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{f.label}</div>
                    <div className="text-xs opacity-80 leading-relaxed">{f.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* User Journey */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">User Journey</h4>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {['Set Goal', 'AI Path', 'Simulation', 'Networking', 'Decision'].map((step, i, arr) => (
                    <div key={step} className="flex items-center gap-2 shrink-0">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#a78bfa] text-white flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="text-xs mt-1 text-muted-foreground whitespace-nowrap">{step}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-10 h-0.5 bg-[#a78bfa]/40 shrink-0 mb-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── 09 IMPACT ─── */}
            <section id="lp-impact">
              <SectionLabel number="09" title="Impact" color="text-[#f87171]" />
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {[
                  { icon: '⚡', label: 'Functional', title: 'Saves Time', desc: 'Aggregates career resources, networking, and decision tools in one AI-powered interface — reducing research fatigue.', color: 'bg-[#f87171]' },
                  { icon: '🧠', label: 'Emotional', title: 'Builds Confidence', desc: 'Gamified simulations let users practice real decisions in a low-stakes environment, building self-efficacy over time.', color: 'bg-[#a78bfa]' },
                  { icon: '🌐', label: 'Social', title: 'Stronger Networks', desc: 'AI-matched connections based on context and goals replace cold networking with meaningful professional relationships.', color: 'bg-[#34d399]' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="bg-secondary p-6 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center text-2xl mb-4`}>
                      {item.icon}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                    <h4 className="font-bold mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ─── 10 REFLECTION ─── */}
            <section id="lp-reflection" className="pb-16">
              <SectionLabel number="10" title="Reflection" color="text-[#60a5fa]" />
              <div className="mt-8 bg-secondary p-8 rounded-2xl">
                <blockquote className="text-xl leading-relaxed mb-6" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                  "Learned to design for <span className="text-[#a78bfa]">behavior</span>, not just features. The most important design decision wasn't the UI — it was understanding <span className="text-[#34d399]">why</span> users felt stuck."
                </blockquote>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3 text-[#60a5fa]" style={{ fontFamily: 'var(--font-display)' }}>Key Learnings</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        'Design for behavior change, not just feature access',
                        'Gamification works best when tied to real stakes',
                        'Research revealed the real problem: direction, not information',
                        'AI should enhance human judgment, not replace it',
                      ].map((l) => (
                        <li key={l} className="flex items-start gap-2">
                          <span className="text-[#60a5fa] mt-0.5">✓</span>{l}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 text-[#fbbf24]" style={{ fontFamily: 'var(--font-display)' }}>Future Scope</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        'Deeper AI personalization based on long-term behavior',
                        'Real-world data integration (job market APIs)',
                        'Expanded simulation library for niche careers',
                        'Community-driven mentorship matching at scale',
                      ].map((l) => (
                        <li key={l} className="flex items-start gap-2">
                          <span className="text-[#fbbf24] mt-0.5">→</span>{l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              src={lightboxImg}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-xl"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SectionLabel({ number, title, color }: { number: string; title: string; color: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`text-xs font-bold ${color} opacity-60 tracking-widest`}>{number}</span>
      <div className="flex-1 h-px bg-border" />
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
        {title}
      </h2>
    </div>
  );
}