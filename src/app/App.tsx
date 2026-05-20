import { PortfolioAIAgentPanel } from './components/PortfolioAIAgentPanel';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Code2, Briefcase, GraduationCap, Mail, Linkedin,
  Gamepad2, Type, Link2, Grid3x3, BrainCircuit, Cpu, Lightbulb,
  Terminal, BarChart2, Database, Cloud, Target, Map, TrendingUp,
  DollarSign, FlaskConical, Users, Search, Plug, Zap, Share2,
  Star, RefreshCw, Camera, Crown, Handshake, User,
  MessageSquare, Send,
  Menu, X as XIcon,
} from 'lucide-react';

// ── Image imports ──
import faviconImg from '../imports/favicon.png';
import profileImg from '../imports/profile2.jpeg';
import simonLogo from '../imports/Simon_logo_bottom.png';
import manipalLogo from '../imports/manipal.png';
import deloitteLogo from '../imports/DeloitteNewLogo.png';
import accentureLogo from '../imports/Accenture_logo.svg?url';
import tcsLogo from '../imports/Tata_Consultancy_Services_Logo_2020.png';

// ── Components ──
import { WordGuess } from './components/WordGuess';
import { NumberGrid } from './components/NumberGrid';
import { WordMatch } from './components/WordMatch';
import { ChatAgent } from './components/ChatAgent';
import { LearnAndPlayCaseStudy } from './components/LearnAndPlayCaseStudy';
import { ProjectsCollectionPage } from './components/ProjectsCollectionPage';
import { ResumePanel } from './components/ResumePanel';
import { PhotographyPanel } from './components/PhotographyPanel';

// ── Animated Icon helper ──
function AnimIcon({
  icon: Icon,
  bg,
  anim = 'float',
  size = 'md',
  delay = 0,
}: {
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  bg: string;
  anim?: 'float' | 'spin' | 'pulse' | 'bounce';
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}) {
  const sizeMap = { sm: 'w-10 h-10', md: 'w-12 h-12', lg: 'w-16 h-16' };
  const iconSizeMap = { sm: 'w-5 h-5', md: 'w-6 h-6', lg: 'w-8 h-8' };
  const animProps =
    anim === 'float'
      ? { y: [0, -7, 0], rotate: [0, 3, 0, -3, 0] }
      : anim === 'spin'
      ? { rotate: [0, 360] }
      : anim === 'pulse'
      ? { scale: [1, 1.15, 1] }
      : { y: [0, -10, 0] };
  const transProps =
    anim === 'spin'
      ? { duration: 6, repeat: Infinity, ease: 'linear' as const, delay }
      : { duration: 3 + delay * 0.3, repeat: Infinity, ease: 'easeInOut' as const, delay };

  return (
    <motion.div
      className={`${sizeMap[size]} ${bg} rounded-2xl flex items-center justify-center shrink-0`}
      animate={animProps}
      transition={transProps}
    >
      <Icon className={`${iconSizeMap[size]} text-white`} strokeWidth={1.8} />
    </motion.div>
  );
}

// ── Skills data ──
const skills = [
  { name: 'Generative AI (LLMs)', icon: BrainCircuit, gradient: 'from-[#7c3aed] to-[#a855f7]', ring: 'ring-[#a855f7]/40' },
  { name: 'Agentic AI Workflows', icon: Cpu, gradient: 'from-[#6d28d9] to-[#8b5cf6]', ring: 'ring-[#8b5cf6]/40' },
  { name: 'AI Product Prototyping', icon: Lightbulb, gradient: 'from-[#f59e0b] to-[#fbbf24]', ring: 'ring-[#fbbf24]/40' },
  { name: 'Prompt Engineering', icon: Terminal, gradient: 'from-[#334155] to-[#64748b]', ring: 'ring-[#64748b]/40' },
  { name: 'Data Analysis & Visualization', icon: BarChart2, gradient: 'from-[#2563eb] to-[#60a5fa]', ring: 'ring-[#60a5fa]/40' },
  { name: 'SQL & Data Modeling', icon: Database, gradient: 'from-[#1d4ed8] to-[#3b82f6]', ring: 'ring-[#3b82f6]/40' },
  { name: 'Cloud Functions (AWS Lambda)', icon: Cloud, gradient: 'from-[#0284c7] to-[#38bdf8]', ring: 'ring-[#38bdf8]/40' },
  { name: 'Product Strategy', icon: Target, gradient: 'from-[#059669] to-[#34d399]', ring: 'ring-[#34d399]/40' },
  { name: 'Product Roadmapping', icon: Map, gradient: 'from-[#10b981] to-[#6ee7b7]', ring: 'ring-[#6ee7b7]/40' },
  { name: 'Go-to-Market Strategy', icon: TrendingUp, gradient: 'from-[#047857] to-[#10b981]', ring: 'ring-[#10b981]/40' },
  { name: 'Pricing & Business Strategy', icon: DollarSign, gradient: 'from-[#065f46] to-[#059669]', ring: 'ring-[#34d399]/40' },
  { name: 'Experimentation (A/B Testing)', icon: FlaskConical, gradient: 'from-[#0d9488] to-[#2dd4bf]', ring: 'ring-[#2dd4bf]/40' },
  { name: 'User Research (Qual + Quant)', icon: Search, gradient: 'from-[#d97706] to-[#fbbf24]', ring: 'ring-[#fbbf24]/40' },
  { name: 'Customer Insights', icon: Users, gradient: 'from-[#b45309] to-[#f59e0b]', ring: 'ring-[#f59e0b]/40' },
  { name: 'API Integrations', icon: Plug, gradient: 'from-[#dc2626] to-[#f87171]', ring: 'ring-[#f87171]/40' },
  { name: 'Workflow Automation', icon: Zap, gradient: 'from-[#ea580c] to-[#fb923c]', ring: 'ring-[#fb923c]/40' },
  { name: 'System Design Thinking', icon: Share2, gradient: 'from-[#c2410c] to-[#f97316]', ring: 'ring-[#f97316]/40' },
  { name: 'Cross-Functional Leadership', icon: Crown, gradient: 'from-[#be185d] to-[#f472b6]', ring: 'ring-[#f472b6]/40' },
  { name: 'Stakeholder Management', icon: Handshake, gradient: 'from-[#9d174d] to-[#ec4899]', ring: 'ring-[#ec4899]/40' },
  { name: 'Agile / SDLC', icon: RefreshCw, gradient: 'from-[#831843] to-[#be185d]', ring: 'ring-[#be185d]/40' },
];

// ── Experience data ──
const experience = [
  {
    company: 'Accenture',
    role: 'Senior Consultant',
    period: 'Nov 2023 — Jun 2025',
    logo: accentureLogo,
    color: 'bg-[#a78bfa]',
    logoBg: 'bg-white',
    desc: 'Led AI-driven product initiatives and cross-functional delivery teams across digital transformation programs.',
  },
  {
    company: 'Deloitte',
    role: 'Consultant',
    period: 'May 2021 — Jun 2023',
    logo: deloitteLogo,
    color: 'bg-[#818cf8]',
    logoBg: 'bg-white',
    desc: 'Owned end-to-end product delivery, requirements definition, and stakeholder engagement across enterprise platforms.',
  },
  {
    company: 'Deloitte',
    role: 'Analyst',
    period: 'Mar 2019 — May 2021',
    logo: deloitteLogo,
    color: 'bg-[#fb923c]',
    logoBg: 'bg-white',
    desc: 'UI development and design system implementation for public sector clients using Angular and Salesforce LWC.',
  },
  {
    company: 'Tata Consultancy Services',
    role: 'Associate Software Engineer',
    period: 'Oct 2018 — Feb 2019',
    logo: tcsLogo,
    color: 'bg-[#fbbf24]',
    logoBg: 'bg-white',
    desc: 'Built front-end features for enterprise applications, gaining foundational experience in scalable UI development.',
  },
];

// ── Projects data (ordered: AI Agent, L&P, Case Studies, Photography, articles) ──
const projects = [
  {
    title: 'Portfolio AI Agent',
    description: 'An agentic Claude-powered chatbot representing Ayushi\'s voice — end-to-end AI product ownership from prompt engineering to serverless deployment.',
    color: 'bg-[#818cf8]',
    textColor: 'text-white',
    icon: BrainCircuit,
    iconBg: 'bg-white/20',
    isInternal: true,
    internalKey: 'aiagent',
    anim: 'pulse' as const,
    cta: 'View Build & Architecture →',
  },
  {
    title: 'Learn & Play',
    description: 'AI-powered platform helping young professionals navigate career decisions through gamified learning, simulations, and structured pathways.',
    color: 'bg-[#a78bfa]',
    textColor: 'text-white',
    icon: Gamepad2,
    iconBg: 'bg-white/20',
    isInternal: true,
    internalKey: 'learnplay',
    anim: 'bounce' as const,
    cta: 'See How It Works →',
  },
  {
    title: 'Product Case Studies',
    description: 'A collection of end-to-end product experiences showcasing problem framing, user insights, and scalable solution design.',
    color: 'bg-[#34d399]',
    textColor: 'text-black',
    icon: Code2,
    iconBg: 'bg-black/15',
    isInternal: true,
    internalKey: 'projects',
    anim: 'float' as const,
    cta: 'Explore My Work →',
  },
  {
    title: 'Photography',
    description: 'Personal photography — candid moments, travel, and visual storytelling through the lens.',
    color: 'bg-[#fb923c]',
    textColor: 'text-black',
    icon: Camera,
    iconBg: 'bg-black/15',
    isInternal: true,
    internalKey: 'photography',
    anim: 'pulse' as const,
    cta: 'Explore Visual Story →',
  },
  {
    title: 'HauteFinds — Paper Prototype',
    description: 'Prototyping the next evolution of fashion discovery with intuitive UI/UX design.',
    color: 'bg-[#fbbf24]',
    textColor: 'text-black',
    icon: FileText,
    iconBg: 'bg-black/15',
    link: 'https://medium.com/@ayushi.raj7a/hautefinds-paper-prototype-bcb517881b85',
    anim: 'float' as const,
  },
  {
    title: 'ESPN Cricinfo UX Study',
    description: "Deep dive into improving cricket fans' digital experience through research and design.",
    color: 'bg-[#f87171]',
    textColor: 'text-black',
    icon: Target,
    iconBg: 'bg-black/15',
    link: 'https://medium.com/@ayushi.raj7a/espn-cricinfo-ux-study-76a131cd0269',
    anim: 'pulse' as const,
  },
];

const rotatingTexts = [
  'Product Management',
  'Strategic Leadership',
  'User-Centered Design',
  'UI/UX Development',
];

const NAV_ITEMS = [
  { label: 'Home',  href: '#home',    hoverCls: 'hover:bg-[#a78bfa]/20 hover:text-[#a78bfa]' },
  { label: 'Work',  href: '#work',    hoverCls: 'hover:bg-[#34d399]/20 hover:text-[#34d399]' },
  { label: 'About', href: '#about',   hoverCls: 'hover:bg-[#60a5fa]/20 hover:text-[#60a5fa]' },
];

export default function App() {
  const [currentDate] = useState(
    new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
  );
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [rotatingTextIndex, setRotatingTextIndex] = useState(0);
  const [showLearnAndPlay, setShowLearnAndPlay] = useState(false);
  const [showProjectsCollection, setShowProjectsCollection] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showPhotography, setShowPhotography] = useState(false);
  const [showAIAgent, setShowAIAgent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleProjectClick = (project: (typeof projects)[0]) => {
    if (project.internalKey === 'learnplay') setShowLearnAndPlay(true);
    else if (project.internalKey === 'projects') setShowProjectsCollection(true);
    else if (project.internalKey === 'photography') setShowPhotography(true);
    else if (project.internalKey === 'aiagent') setShowAIAgent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <motion.a
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.img
                src={faviconImg}
                alt="Ayushi"
                className="w-9 h-9 object-contain"
                animate={{ rotate: [0, 6, 0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.a>

            {/* Nav — desktop */}
            <nav className="hidden md:flex items-center gap-1 text-sm">
              {NAV_ITEMS.map(({ label, href, hoverCls }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  className={`px-3 py-1.5 rounded-xl transition-colors font-medium ${hoverCls}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {label}
                </motion.a>
              ))}

              {/* Resume pill */}
              <motion.button
                onClick={() => setShowResume(true)}
                className="px-3 py-1.5 rounded-xl bg-[#fbbf24]/15 text-[#fbbf24] hover:bg-[#fbbf24]/30 transition-colors font-medium border border-[#fbbf24]/30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.21 }}
              >
                Resume
              </motion.button>

              {/* Contact CTA */}
              <motion.a
                href="#contact"
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white hover:from-[#6d28d9] hover:to-[#9333ea] transition-all font-medium shadow-md shadow-[#a78bfa]/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                Contact
              </motion.a>
            </nav>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <nav className="flex flex-col px-6 py-4 gap-2">
                {NAV_ITEMS.map(({ label, href, hoverCls }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl transition-colors font-medium text-sm ${hoverCls}`}
                  >
                    {label}
                  </a>
                ))}
                <button
                  onClick={() => { setShowResume(true); setMobileMenuOpen(false); }}
                  className="px-4 py-3 rounded-xl bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30 font-medium text-sm text-left"
                >
                  Resume
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white font-medium text-sm text-center"
                >
                  Contact
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Main ── */}
      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* ── Hero ── */}
        <motion.section
          id="home"
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2
            className="mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1 }}
          >
            Hi,<br />I'm Ayushi
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            I Am Into{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingTextIndex}
                className="text-foreground font-medium inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {rotatingTexts[rotatingTextIndex]}
              </motion.span>
            </AnimatePresence>
          </p>
          <motion.a
            href="#about"
            className="inline-block px-6 py-3 bg-secondary rounded-2xl hover:bg-muted transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Me →
          </motion.a>
        </motion.section>

        {/* ── Work ── */}
        <section id="work" className="mb-16">
          <motion.h3
            className="mb-6 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimIcon icon={Code2} bg="bg-[#a78bfa]" anim="float" size="sm" />
            Work
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => {
              const Icon = project.icon;
              const cardContent = (
                <>
                  <motion.div
                    className={`w-14 h-14 ${project.iconBg} rounded-2xl flex items-center justify-center mb-4`}
                    animate={
                      project.anim === 'float' ? { y: [0, -7, 0], rotate: [0, 3, 0, -3, 0] }
                      : project.anim === 'pulse' ? { scale: [1, 1.15, 1] }
                      : project.anim === 'bounce' ? { y: [0, -10, 0] }
                      : { rotate: [0, 360] }
                    }
                    transition={{
                      duration: project.anim === 'spin' ? 5 : 3,
                      repeat: Infinity,
                      ease: project.anim === 'spin' ? 'linear' : 'easeInOut',
                      delay: index * 0.2,
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                  </motion.div>
                  <h4
                    className="mb-2"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}
                  >
                    {project.title}
                  </h4>
                  <p className="text-sm opacity-90">{project.description}</p>
                  {project.isInternal && (
                    <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-medium">
                      {project.cta}
                    </div>
                  )}
                </>
              );

              return project.isInternal ? (
                <motion.div
                  key={project.title}
                  onClick={() => handleProjectClick(project)}
                  className={`${project.color} ${project.textColor} p-6 rounded-2xl cursor-pointer relative overflow-hidden`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {cardContent}
                </motion.div>
              ) : (
                <motion.a
                  key={project.title}
                  href={(project as { link?: string }).link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${project.color} ${project.textColor} p-6 rounded-2xl cursor-pointer relative overflow-hidden block`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {cardContent}
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="mb-16">
          <motion.h3
            className="mb-6 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimIcon icon={User} bg="bg-[#60a5fa]" anim="float" size="sm" />
            About Me
          </motion.h3>

          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Translucent background photo */}
            <div className="absolute inset-0">
              <img src={profileImg} alt="" className="w-full h-full object-cover object-[center_10%]" />
              <div className="absolute inset-0 bg-background/68" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/65 to-background/30" />
            </div>
            {/* Content */}
            <div className="relative px-8 py-10 md:px-12 md:py-14 max-w-2xl">
              <h4 className="mb-5" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700 }}>Hello!</h4>
              <div className="space-y-4 text-sm leading-relaxed text-foreground/80">
                <p>
                  Hi! I'm a product-oriented problem solver with ~7 years of experience across Deloitte and Accenture, working at the intersection of technology, user experience, and business impact.
                </p>
                <p>
                  My background in UI development shaped how I approach product building today—starting with the user, thinking in systems, and ensuring what we build is both functional and thoughtful. Over time, I've taken on end-to-end ownership across product development, from defining user needs and features to driving execution and measuring outcomes.
                </p>
                <p>
                  I'm particularly interested in AI-driven systems and how they can augment decision-making, simplify complexity, and unlock new ways of working.
                </p>
                <p>
                  Outside of work, I explore photography, arts, and design—spaces that continuously refine my understanding of aesthetics and human behavior.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="mb-16">
          <motion.h3
            className="mb-6 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimIcon icon={Star} bg="bg-[#fbbf24]" anim="spin" size="sm" />
            Skills &amp; Abilities
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  className={`relative overflow-hidden bg-secondary rounded-2xl p-4 flex flex-col items-center gap-3 ring-1 ${skill.ring} group cursor-default`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                >
                  {/* Gradient glow behind card */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-[0.08] group-hover:opacity-[0.18] transition-opacity rounded-2xl`} />
                  {/* Icon bubble */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                  </div>
                  <div className="relative text-xs font-medium leading-tight text-center">{skill.name}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" className="mb-16">
          <motion.h3
            className="mb-6 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimIcon icon={GraduationCap} bg="bg-[#c4b5fd]" anim="float" size="sm" />
            Education
          </motion.h3>

          <div className="space-y-4">
            <motion.div
              className="bg-[#c4b5fd] text-black p-6 rounded-2xl"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="flex-shrink-0">
                  <img src={simonLogo} alt="Simon Business School" className="w-40 h-auto object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Masters of Business Administration</h4>
                  <p className="font-medium mb-1">Strategy and Product Management</p>
                  <p className="text-sm mb-1">Simon Business School · University of Rochester</p>
                  <p className="text-sm font-medium">May 2027</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-[#93c5fd] text-black p-6 rounded-2xl"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="flex-shrink-0 bg-white p-4 rounded-xl">
                  <img src={manipalLogo} alt="Manipal Institute of Technology" className="w-32 h-auto object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Bachelor of Technology</h4>
                  <p className="font-medium mb-1">Computer and Communication Engineering</p>
                  <p className="text-sm mb-2">Manipal Institute of Technology</p>
                  <p className="text-sm font-medium">2014 – 2018</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="mb-16">
          <motion.h3
            className="mb-8 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimIcon icon={Briefcase} bg="bg-[#34d399]" anim="float" size="sm" />
            Experience
          </motion.h3>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-0">
              {experience.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.role}`}
                  className="relative flex gap-6 pb-10 last:pb-0"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  {/* Logo bubble */}
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl ${exp.color} flex items-center justify-center shadow-lg p-2`}
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <div className="w-full h-full bg-white rounded-lg flex items-center justify-center p-1">
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    className="flex-1 bg-secondary p-5 rounded-2xl mb-2"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{exp.company}</h4>
                        <p className="font-medium text-sm text-muted-foreground">{exp.role}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full ${exp.color} text-black font-medium shrink-0`}>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Games ── */}
        <section id="games" className="mb-16">
          <motion.h3
            className="mb-6 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimIcon icon={Gamepad2} bg="bg-[#fbbf24]" anim="bounce" size="sm" />
            Games
          </motion.h3>

          {!activeGame ? (
            <>
              <motion.p
                className="text-muted-foreground mb-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Play daily puzzles and challenges — inspired by NYT Games
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: 'wordguess',  label: 'Word Guess',   sub: 'Guess the 5-letter word in 6 tries',        color: 'bg-[#fbbf24]', Icon: Type,    anim: 'float' as const },
                  { key: 'wordmatch',  label: 'Word Match',   sub: 'Group words that share a common thread',    color: 'bg-[#a78bfa]', Icon: Link2,   anim: 'pulse' as const },
                  { key: 'numbergrid', label: 'Number Grid',  sub: 'Fill the grid with numbers 1-5',            color: 'bg-[#60a5fa]', Icon: Grid3x3, anim: 'spin' as const },
                ].map(({ key, label, sub, color, Icon, anim }, i) => (
                  <motion.div
                    key={key}
                    onClick={() => setActiveGame(key)}
                    className={`${color} text-black p-6 rounded-2xl cursor-pointer`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div
                      animate={anim === 'float' ? { y: [0, -8, 0] } : anim === 'pulse' ? { scale: [1, 1.2, 1] } : { rotate: [0, 360] }}
                      transition={{ duration: anim === 'spin' ? 4 : 3, repeat: Infinity, ease: anim === 'spin' ? 'linear' : 'easeInOut' }}
                      className="mb-3 w-fit"
                    >
                      <Icon className="w-12 h-12" strokeWidth={1.5} />
                    </motion.div>
                    <h4 className="font-bold mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>{label}</h4>
                    <p className="text-sm opacity-90">{sub}</p>
                    <div className="text-xs mt-2 opacity-70">{currentDate}</div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              className="bg-secondary rounded-2xl max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h4 className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {activeGame === 'wordguess' && 'Word Guess'}
                  {activeGame === 'wordmatch' && 'Word Match'}
                  {activeGame === 'numbergrid' && 'Number Grid'}
                </h4>
                <button onClick={() => setActiveGame(null)} className="px-4 py-2 bg-background hover:bg-muted rounded-lg text-sm">
                  ← Back to Games
                </button>
              </div>
              {activeGame === 'wordguess'  && <WordGuess />}
              {activeGame === 'wordmatch'  && <WordMatch />}
              {activeGame === 'numbergrid' && <NumberGrid />}
            </motion.div>
          )}
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="mb-16">
          <motion.h3
            className="mb-4 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimIcon icon={Send} bg="bg-[#f87171]" anim="float" size="sm" />
            Let's Connect
          </motion.h3>

          <motion.p
            className="text-muted-foreground mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Life is more fun with collaboration. I'd love to hear from you.
          </motion.p>

          <motion.div
            className="bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] p-8 rounded-2xl mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <MessageSquare className="w-12 h-12 text-white mx-auto" strokeWidth={1.5} />
            </motion.div>
            <h4 className="text-white mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
              Open to Opportunities
            </h4>
            <p className="text-purple-200 text-sm mb-5 max-w-md mx-auto">
              Currently seeking roles in Product Management, Strategy, and AI Product Development. Let's build something meaningful together.
            </p>
            <a
              href="mailto:ayushi_raj@ymail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#7c3aed] rounded-2xl font-medium hover:bg-purple-50 transition-colors"
            >
              <Mail className="w-4 h-4" /> Say Hello
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.a
              href="mailto:ayushi_raj@ymail.com"
              className="bg-[#fbbf24] text-black p-6 rounded-2xl cursor-pointer block"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-fit mb-3">
                <Mail className="w-8 h-8" strokeWidth={1.5} />
              </motion.div>
              <div className="font-medium mb-1">Email</div>
              <div className="text-sm opacity-80">ayushi_raj@ymail.com</div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/ayushi-raj-57b811120/"
              target="_blank" rel="noopener noreferrer"
              className="bg-[#60a5fa] text-black p-6 rounded-2xl cursor-pointer block"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.8, repeat: Infinity }} className="w-fit mb-3">
                <Linkedin className="w-8 h-8" strokeWidth={1.5} />
              </motion.div>
              <div className="font-medium mb-1">LinkedIn</div>
              <div className="text-sm opacity-80">Ayushi Raj</div>
            </motion.a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-border pt-8 pb-12 text-center text-sm text-muted-foreground">
          <p>© 2026 Ayushi Raj · Built with React &amp; Tailwind CSS</p>
          <p className="mt-2">Thank you for visiting my portfolio.</p>
        </footer>
      </main>

      {/* ── Floating Chat ── */}
      <ChatAgent />

      {/* ── Overlays ── */}
      <AnimatePresence>
        {showLearnAndPlay && <LearnAndPlayCaseStudy onClose={() => setShowLearnAndPlay(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showProjectsCollection && <ProjectsCollectionPage onClose={() => setShowProjectsCollection(false)} />}
      </AnimatePresence>
      {showResume && <ResumePanel onClose={() => setShowResume(false)} />}
      <AnimatePresence>
        {showPhotography && <PhotographyPanel onClose={() => setShowPhotography(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showAIAgent && <PortfolioAIAgentPanel onClose={() => setShowAIAgent(false)} />}
      </AnimatePresence>
    </div>
  );
}