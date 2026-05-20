import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, ArrowLeft, BrainCircuit, ShoppingCart, FileText,
  ChevronRight, Target, Lightbulb, Zap, TrendingUp, Users
} from 'lucide-react';

interface Props { onClose: () => void; }

const projects = [
  {
    id: 'licensing',
    title: 'State Licensing Platform',
    subtitle: 'Digitizing public sector workflows through scalable product design',
    badge: 'Confidential',
    role: 'Product + Front-End Engineering',
    timeline: '12 weeks · 2021',
    tools: ['Salesforce LWC', 'HTML', 'CSS', 'JavaScript'],
    color: 'bg-[#a78bfa]',
    darkColor: 'bg-[#2e1065]',
    accentColor: 'text-[#a78bfa]',
    borderColor: 'border-[#a78bfa]/30',
    bgLight: 'bg-[#a78bfa]/10',
    icon: FileText,
    problem: 'Legacy workflows were manual, fragmented, and inefficient — causing significant processing delays, inconsistent data handling, and a poor user experience for both internal staff and external applicants navigating the licensing process.',
    goal: 'Build a centralized digital licensing portal to streamline end-to-end workflows, reduce manual touchpoints, and improve usability for public sector users who previously relied on paper-based and siloed systems.',
    productThinking: [
      'Identified workflow fragmentation as the root cause — not just a UI problem — requiring process redesign before interface work',
      'Standardized workflows across departments to reduce inconsistency and enable scalable rollout',
      'Applied modular, component-driven design to ensure reusability and compliance with existing design system standards',
      'Prioritized accessibility and ease of use for non-technical government users with varied digital literacy',
    ],
    execution: [
      'Conducted requirements gathering sessions with stakeholders to map current-state workflows and pain points',
      'Led UX redesign of key user journeys — application submission, status tracking, and approval routing',
      'Developed UI components using Salesforce Lightning Web Components (LWC), HTML, CSS, and JavaScript',
      'Ensured backward compatibility and system integration with existing Salesforce infrastructure throughout delivery',
    ],
    impact: [
      'Reduced workflow friction significantly by eliminating manual handoffs and paper-based steps',
      'Improved usability and task completion rates for licensing applicants and internal reviewers alike',
      'Delivered a scalable, modular platform enabling future digital services to be built on the same foundation',
    ],
    reflection: 'This project sharpened my ability to translate ambiguity into structured product solutions. Working in a constrained public sector environment taught me that great product thinking isn\'t about the latest tech — it\'s about deeply understanding user needs and designing systems that hold up under real-world complexity.',
  },
  {
    id: 'movie',
    title: 'Movie Recommendation System',
    subtitle: 'Data-driven personalization using collaborative filtering',
    badge: 'Academic',
    role: 'Product + Data Modeling',
    timeline: '4 weeks · 2018',
    tools: ['Python', 'Scikit-learn', 'K-Means Clustering', 'MovieLens Dataset'],
    color: 'bg-[#60a5fa]',
    darkColor: 'bg-[#1e3a5f]',
    accentColor: 'text-[#60a5fa]',
    borderColor: 'border-[#60a5fa]/30',
    bgLight: 'bg-[#60a5fa]/10',
    icon: BrainCircuit,
    problem: 'Users struggled to discover relevant movies due to a lack of personalization — the existing system surfaced generic content without understanding individual preferences or taste patterns.',
    goal: 'Build a recommendation engine that surfaces relevant movies to users based on their historical rating patterns and similarity clustering.',
    productThinking: [
      'Focused on user preference modeling as the core problem — not just content ranking',
      'Used clustering to identify behavioral similarity across users, not just content tags',
      'Optimized for precision and speed — the model had to be both relevant and performant',
      'Validated recommendations against held-out data to measure actual relevance gains',
    ],
    execution: [
      'Collected and analyzed MovieLens dataset with ratings across thousands of users and films',
      'Applied collaborative filtering to identify patterns in user rating behavior',
      'Implemented K-means clustering using sklearn.cluster to group similar users',
      'Minimized mean-squared error to improve the accuracy of predicted ratings',
    ],
    impact: [
      'Improved recommendation relevance through behavioral similarity modeling',
      'Built a scalable prediction framework reusable across different content domains',
      'Demonstrated measurable gains in recommendation precision vs. baseline',
    ],
    reflection: 'This project built my foundational understanding of data-driven decision making. Seeing how clustering and optimization algorithms directly shaped user experience made me appreciate the power of combining product thinking with data science.',
  },
  {
    id: 'grocery',
    title: 'Grocery Management System',
    subtitle: 'iON – Tata · Real-time ordering and inventory platform',
    badge: 'Industry Project',
    role: 'Product + Full Stack Development',
    timeline: '6 weeks · 2016',
    tools: ['PHP', 'MySQL', 'HTML', 'CSS'],
    color: 'bg-[#34d399]',
    darkColor: 'bg-[#064e3b]',
    accentColor: 'text-[#34d399]',
    borderColor: 'border-[#34d399]/30',
    bgLight: 'bg-[#34d399]/10',
    icon: ShoppingCart,
    problem: 'There was no seamless way for customers to browse grocery inventory and place orders with real-time availability tracking — leading to out-of-stock surprises and manual, error-prone ordering processes.',
    goal: 'Design and build a web platform for real-time grocery ordering with live inventory tracking, enabling customers to make accurate, timely purchases.',
    productThinking: [
      'Structured navigation by department to reduce cognitive load for users browsing categories',
      'Prioritized accuracy of inventory data — stale stock information would break user trust',
      'Designed each department page to display price, quantity, and delivery time transparently',
      'Focused on usability first, ensuring non-technical users could complete orders without friction',
    ],
    execution: [
      'Built frontend using PHP with department-based navigation and product display pages',
      'Implemented MySQL backend storing price, quantity, delivery time, and item ratings',
      'Connected frontend to database in real time to reflect live inventory and ordering state',
      'Ensured data accuracy through structured table queries with availability validation',
    ],
    impact: [
      'Reduced ordering errors through real-time inventory availability display',
      'Improved ordering efficiency with intuitive department-based browsing flow',
      'Demonstrated end-to-end ownership across frontend, backend, and data modeling',
    ],
    reflection: 'This was my first experience with end-to-end product development — from user flows to database design. It taught me that product quality lives in the details: accurate data, clear navigation, and reliable real-time feedback.',
  },
];

const FloatingIcon = ({ Icon, color, delay = 0 }: { Icon: React.FC<{ className?: string }>, color: string, delay?: number }) => (
  <motion.div
    className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shrink-0`}
    animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    <Icon className="w-7 h-7 text-white" />
  </motion.div>
);

export function ProjectsCollectionPage({ onClose }: Props) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const active = projects.find(p => p.id === activeProject);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeProject) setActiveProject(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeProject, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-background"
      initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border flex items-center justify-between px-6 py-3 shrink-0">
        <button
          onClick={activeProject ? () => setActiveProject(null) : onClose}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {activeProject ? 'All Projects' : 'Back to Portfolio'}
        </button>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-3 h-3 rounded-full bg-[#34d399]"
            animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
          />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }} className="text-base">
            Projects Collection
          </span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!activeProject ? (
            /* ── Project List View ── */
            <motion.div
              key="list"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6 py-12"
            >
              {/* Hero */}
              <div className="relative bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] rounded-3xl overflow-hidden mb-12 p-10">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #34d399 0%, transparent 60%)' }} />
                <div className="relative">
                  <div className="flex flex-wrap gap-2 mb-5">
                    {['Product Thinking', 'UX Design', 'Technical Execution'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/20 text-white rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                  <h1 className="text-white mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>
                    Product Case Studies
                  </h1>
                  <p className="text-green-200 text-base max-w-xl leading-relaxed">
                    A collection of end-to-end product experiences showcasing problem framing, user insights, and scalable solution design.
                  </p>
                </div>
              </div>

              {/* Closing Statement Banner */}
              <div className="bg-secondary border border-border p-6 rounded-2xl mb-10 text-center">
                <p className="text-muted-foreground leading-relaxed">
                  Across these projects, I operate at the intersection of{' '}
                  <span className="text-[#34d399] font-medium">product thinking</span>,{' '}
                  <span className="text-[#60a5fa] font-medium">UX design</span>, and{' '}
                  <span className="text-[#a78bfa] font-medium">technical execution</span>.
                  I aim to build products that simplify complexity and drive meaningful user impact.
                </p>
              </div>

              {/* Project Cards */}
              <div className="space-y-5">
                {projects.map((project, i) => {
                  const Icon = project.icon;
                  return (
                    <motion.button
                      key={project.id}
                      onClick={() => setActiveProject(project.id)}
                      className={`w-full text-left p-6 rounded-2xl border ${project.borderColor} ${project.bgLight} group hover:scale-[1.01] transition-transform`}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-5">
                        <FloatingIcon Icon={Icon as React.FC<{ className?: string }>} color={project.color} delay={i * 0.5} />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-0.5 bg-background rounded-full border border-border text-muted-foreground">{project.badge}</span>
                            <span className="text-xs text-muted-foreground">{project.timeline}</span>
                          </div>
                          <h3 className="mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tools.slice(0, 4).map(t => (
                              <span key={t} className={`text-xs px-2 py-0.5 rounded-full ${project.bgLight} ${project.accentColor}`}>{t}</span>
                            ))}
                            {project.tools.length > 4 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">+{project.tools.length - 4}</span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 ${project.accentColor} shrink-0 mt-1 group-hover:translate-x-1 transition-transform`} />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : active ? (
            /* ── Single Project Detail View ── */
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="max-w-4xl mx-auto px-6 py-12"
            >
              {/* Project Hero */}
              <div className={`${active.darkColor} rounded-3xl overflow-hidden mb-10 p-10 relative`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 80% 20%, white 0%, transparent 60%)` }} />
                <div className="relative flex items-start gap-5">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl ${active.color} flex items-center justify-center shrink-0`}
                    animate={{ y: [0, -8, 0], rotate: [0, 3, 0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <active.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs">{active.badge}</span>
                      <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs">{active.role}</span>
                      <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs">{active.timeline}</span>
                    </div>
                    <h2 className="text-white mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700 }}>
                      {active.title}
                    </h2>
                    <p className="text-white/70 text-sm">{active.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {active.tools.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 bg-white/15 text-white/90 rounded-full border border-white/20">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Problem */}
                <ProjectSection icon={Target} label="Problem" color={active.accentColor} bgColor={active.bgLight} borderColor={active.borderColor}>
                  <p className="text-muted-foreground text-sm leading-relaxed">{active.problem}</p>
                </ProjectSection>

                {/* Goal */}
                <ProjectSection icon={Lightbulb} label="Goal" color={active.accentColor} bgColor={active.bgLight} borderColor={active.borderColor}>
                  <p className="text-muted-foreground text-sm leading-relaxed">{active.goal}</p>
                </ProjectSection>

                {/* Product Thinking */}
                <ProjectSection icon={BrainCircuit} label="Product Thinking" color={active.accentColor} bgColor={active.bgLight} borderColor={active.borderColor}>
                  <ul className="space-y-2">
                    {active.productThinking.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className={`${active.accentColor} mt-0.5 shrink-0`}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </ProjectSection>

                {/* Execution */}
                <ProjectSection icon={Zap} label="Execution" color={active.accentColor} bgColor={active.bgLight} borderColor={active.borderColor}>
                  <ul className="space-y-2">
                    {active.execution.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className={`${active.accentColor} mt-0.5 shrink-0 font-bold`}>{i + 1}.</span>{item}
                      </li>
                    ))}
                  </ul>
                </ProjectSection>

                {/* Impact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {active.impact.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`p-5 rounded-2xl border ${active.borderColor} ${active.bgLight}`}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <TrendingUp className={`w-5 h-5 ${active.accentColor} mb-2`} />
                      <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Reflection */}
                <div className={`p-7 rounded-2xl border ${active.borderColor} bg-secondary`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className={`w-4 h-4 ${active.accentColor}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${active.accentColor}`}>Reflection</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">"{active.reflection}"</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ProjectSection({
  icon: Icon,
  label,
  color,
  bgColor,
  borderColor,
  children,
}: {
  icon: React.FC<{ className?: string }>;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`p-6 rounded-2xl border ${borderColor} ${bgColor}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className={`text-xs font-bold uppercase tracking-wider ${color}`}>{label}</span>
      </div>
      {children}
    </div>
  );
}