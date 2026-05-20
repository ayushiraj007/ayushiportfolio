import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ArrowLeft } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const sections = [
  { id: 'overview', label: '01  Overview' },
  { id: 'problem',  label: '02  Problem' },
  { id: 'goals',    label: '03  Goals' },
  { id: 'personas', label: '04  Personas' },
  { id: 'stories',  label: '05  User Stories' },
  { id: 'scope',    label: '06  Scope' },
  { id: 'arch',     label: '07  Architecture' },
  { id: 'stack',    label: '08  Tech Stack' },
  { id: 'prompts',  label: '09  Prompt Eng.' },
  { id: 'risks',    label: '10  Risks' },
  { id: 'future',   label: '11  Future' },
];

function SectionLabel({ number, title, color }: { number: string; title: string; color: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className={`text-xs font-bold ${color} opacity-60 tracking-widest shrink-0`}>{number}</span>
      <div className="flex-1 h-px bg-border" />
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>{title}</h2>
    </div>
  );
}

const goals = [
  "Enable visitors to get accurate, personalized answers about Ayushi's background without waiting for an email response",
  "Represent Ayushi's voice, personality, and values — not a generic assistant",
  "Demonstrate end-to-end ownership of an AI product: design, prompt engineering, deployment, and frontend integration",
  "Keep infrastructure cost under $5/month for typical portfolio traffic",
];

const personas = [
  { name: 'Recruiter / Hiring Manager', goal: 'Assess fit for a PM, strategy, or AI role', need: 'Quick answers on experience, skills, availability, and how to reach out', icon: '👔', color: 'bg-[#818cf8]/10 border-[#818cf8]/25' },
  { name: 'Fellow MBA Student / Peer', goal: "Learn about Ayushi's background or collaborate", need: 'Conversational, peer-level engagement; project details', icon: '🎓', color: 'bg-[#f9a8d4]/10 border-[#f9a8d4]/25' },
  { name: 'Curious Visitor', goal: 'Explore the portfolio out of general interest', need: "Interesting, human responses that reflect Ayushi's personality", icon: '🔍', color: 'bg-[#fbbf24]/10 border-[#fbbf24]/25' },
  { name: 'Technical Evaluator', goal: 'Assess technical depth or AI product skills', need: 'Evidence that this was built and shipped, not just described', icon: '⚙️', color: 'bg-[#34d399]/10 border-[#34d399]/25' },
];

const userStories = [
  { id: 'US-01', story: "As a recruiter, I want to ask about Ayushi's experience in product management so I can quickly assess her fit for an open role.", ac: 'Agent responds with relevant experience, specific metrics, and offers to connect via email for next steps.' },
  { id: 'US-02', story: "As a visitor, I want the agent to feel like I'm talking to Ayushi, not a generic chatbot.", ac: "Responses use first-person voice, match her personality (warm, curious, occasionally witty), and reflect her actual values and interests." },
  { id: 'US-03', story: 'As a visitor, I want to ask follow-up questions in a natural conversation without losing context.', ac: 'Full conversation history is passed to the API on each turn; the agent maintains context across multiple exchanges.' },
  { id: 'US-04', story: 'As a visitor asking for contact details, I want to be given only her public email — not her phone or institutional email.', ac: 'Agent shares ayushi_raj@ymail.com only. Phone number and school email are never surfaced regardless of how the question is phrased.' },
  { id: 'US-05', story: 'As a portfolio visitor on mobile, I want the chat widget to be accessible and usable on a small screen.', ac: 'Widget is responsive, input is tappable, and chat window fits within viewport on screens 375px and wider.' },
];

const inScope = [
  'Conversational Q&A about background, skills, and experience',
  'Multi-turn conversation with full history context',
  "Personality-driven responses in Ayushi's voice",
  'Contact information routing (email only)',
  'Floating chat widget embedded in portfolio',
  'Serverless deployment (AWS Lambda Function URL)',
  'CORS configuration for portfolio domain',
];

const outScope = [
  'Voice interface',
  'CRM / lead capture integration',
  'Analytics dashboard for chat usage',
  'Calendar / scheduling integration',
  'Autonomous web browsing or tool use',
  'User authentication',
  'Persistent conversation history across sessions',
];

const keyDecisions = [
  { title: 'Stateless backend', body: 'No database. Full conversation history is maintained client-side and passed on every request, keeping infrastructure minimal and cost near zero.' },
  { title: 'System prompt as knowledge base', body: "All of Ayushi's background, personality, and rules are encoded in a structured system prompt. No RAG or vector search required at this scale." },
  { title: 'Function URL over API Gateway', body: 'Eliminates an infrastructure layer, reduces latency, and simplifies CORS configuration for a single-origin use case.' },
  { title: 'API key as Lambda environment variable', body: "Never hardcoded. Injected at runtime via Lambda's environment variable configuration." },
];

const techStack = [
  { layer: 'AI / Intelligence', tool: 'Anthropic Claude API', desc: 'claude-sonnet-4 — conversational intelligence, system prompt reasoning', color: 'border-[#818cf8]/40 bg-[#818cf8]/5' },
  { layer: 'Backend / Serverless', tool: 'AWS Lambda (Node.js 20)', desc: 'Serverless function handler; scales to zero when idle', color: 'border-[#f97316]/40 bg-[#f97316]/5' },
  { layer: 'Networking', tool: 'Lambda Function URL', desc: 'Public HTTPS endpoint with built-in CORS; replaces API Gateway', color: 'border-[#fbbf24]/40 bg-[#fbbf24]/5' },
  { layer: 'SDK', tool: '@anthropic-ai/sdk', desc: 'Official Node.js SDK for Claude API calls', color: 'border-[#a78bfa]/40 bg-[#a78bfa]/5' },
  { layer: 'Frontend', tool: 'React + Tailwind CSS', desc: 'Self-contained chat widget integrated in portfolio', color: 'border-[#60a5fa]/40 bg-[#60a5fa]/5' },
  { layer: 'Hosting', tool: 'GitHub Pages / Figma Make', desc: 'Static portfolio site hosting; widget embedded directly', color: 'border-[#34d399]/40 bg-[#34d399]/5' },
  { layer: 'Secrets Management', tool: 'Lambda Env Variables', desc: 'ANTHROPIC_API_KEY stored securely; never in source code', color: 'border-[#f87171]/40 bg-[#f87171]/5' },
  { layer: 'Development', tool: 'Claude.ai + VS Code', desc: 'Prompt engineering, code generation, and iteration', color: 'border-[#f9a8d4]/40 bg-[#f9a8d4]/5' },
];

const promptStructure = [
  { n: '1', label: 'Identity declaration', desc: 'Establishes first-person voice and prohibits generic AI framing' },
  { n: '2', label: 'Current context', desc: 'MBA status, internship goals, availability' },
  { n: '3', label: 'Career history', desc: 'Structured by role with specific metrics and outcomes' },
  { n: '4', label: 'Personal narrative', desc: 'Origin story, design philosophy, what drives her work' },
  { n: '5', label: 'Interests & personality', desc: 'Hobbies, values, conversation style' },
  { n: '6', label: 'Hard rules', desc: 'Contact info restrictions, confidentiality guardrails' },
  { n: '7', label: 'Behavioral instructions', desc: 'Tone calibration, response length, handling unknown questions' },
];

const risks = [
  { risk: 'Agent shares confidential client information', likelihood: 'Low', mitigation: 'Client names removed from system prompt; prompt explicitly prohibits sharing confidential details' },
  { risk: 'Agent shares private contact details', likelihood: 'Low', mitigation: 'Hard rule in system prompt: only public email shared, phone and school email explicitly blocked' },
  { risk: 'High unexpected traffic inflates API costs', likelihood: 'Low', mitigation: 'Lambda scales to zero when idle; can add AWS WAF rate limiting if needed' },
  { risk: 'Model hallucinates incorrect career details', likelihood: 'Medium', mitigation: 'System prompt provides specific, verified facts; model instructed to redirect to email if uncertain' },
  { risk: 'CORS misconfiguration blocks widget', likelihood: 'Low', mitigation: 'CORS configured on Lambda Function URL with explicit allowed origin; tested with curl before launch' },
];

const futureItems = [
  { feature: 'Medium article integration — agent can discuss published writing', value: 'Richer conversations; showcases thought leadership', priority: 'High' },
  { feature: 'Streaming responses (token-by-token display)', value: 'Feels faster and more conversational', priority: 'Medium' },
  { feature: 'Chat usage analytics (message count, common questions)', value: 'Understand what visitors are curious about', priority: 'Medium' },
  { feature: 'Rate limiting per IP', value: 'Protect against API cost abuse', priority: 'Medium' },
  { feature: 'Suggested prompts on widget open', value: 'Reduces friction for first-time visitors', priority: 'Low' },
];

const requestFlowSteps = [
  'Visitor types message',
  'Widget sends history as JSON',
  'Lambda receives POST',
  'Claude generates response',
  'Lambda returns reply',
  'Widget displays response',
];

const metaGrid = [
  { label: 'Author', value: 'Ayushi Raj' },
  { label: 'Created', value: 'April 2026' },
  { label: 'Type', value: 'Personal / Portfolio' },
  { label: 'Stack', value: 'Claude · Lambda · React' },
];

const metrics = [
  { value: '< 5s', label: 'Target response latency' },
  { value: '< $3', label: 'Estimated monthly API cost' },
  { value: '0', label: 'Client / confidential data exposed' },
];

export function PortfolioAIAgentPanel({ onClose }: Props) {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    const container = document.getElementById('prd-scroll');
    if (!container) return;
    const onScroll = () => {
      for (const sec of sections) {
        const el = document.getElementById(`prd-${sec.id}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 200) { setActiveSection(sec.id); break; }
      }
    };
    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(`prd-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
        <button onClick={onClose} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </button>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#818cf8]" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }} className="text-base">Portfolio AI Agent</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="hidden lg:flex flex-col gap-1 w-48 shrink-0 py-8 px-4 border-r border-border overflow-y-auto">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`text-left px-3 py-2 rounded-xl text-xs transition-all ${
                activeSection === s.id
                  ? 'bg-[#818cf8]/20 text-[#818cf8] font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Scrollable Content */}
        <div id="prd-scroll" className="flex-1 overflow-y-auto">

          {/* Hero */}
          <div className="relative bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 15% 60%, #818cf8 0%, transparent 45%), radial-gradient(circle at 85% 20%, #a78bfa 0%, transparent 45%)'
            }} />
            <div className="relative max-w-4xl mx-auto px-8 py-20">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs">Product Requirements Document</span>
                  <span className="px-3 py-1 bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/30 rounded-full text-xs font-semibold">Shipped — v1.0</span>
                </div>
                <h1 className="text-white mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
                  Portfolio AI Agent
                </h1>
                <p className="text-indigo-200 mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontStyle: 'italic' }}>
                  "Ask Ayushi"
                </p>
                <p className="text-indigo-300 text-base max-w-xl leading-relaxed mb-8">
                  An agentic, Claude-powered chatbot that represents Ayushi Raj on her personal portfolio website
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {metaGrid.map((m) => (
                    <div key={m.label} className="bg-white/10 border border-white/10 rounded-xl p-3">
                      <div className="text-indigo-400 text-xs uppercase tracking-wider mb-1">{m.label}</div>
                      <div className="text-white text-sm font-medium">{m.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 space-y-20">

            {/* 01 OVERVIEW */}
            <section id="prd-overview">
              <SectionLabel number="01" title="Overview" color="text-[#818cf8]" />
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                "Ask Ayushi" is a conversational AI agent embedded in Ayushi Raj's personal portfolio website. It is powered by Anthropic's Claude API and hosted on AWS Lambda via a Function URL, enabling visitors — recruiters, collaborators, or peers — to have a natural, first-person conversation with an AI that represents Ayushi's voice, background, and expertise.
              </p>
              <div className="bg-[#818cf8]/10 border-l-4 border-[#818cf8] p-5 rounded-r-2xl text-sm text-muted-foreground leading-relaxed">
                This project is both a functional portfolio feature and a demonstration of applied AI product thinking — from system prompt engineering and context design to serverless deployment and frontend integration.
              </div>
            </section>

            {/* 02 PROBLEM */}
            <section id="prd-problem">
              <SectionLabel number="02" title="Problem Statement" color="text-[#f87171]" />
              <div className="grid md:grid-cols-2 gap-5 mb-6">
                <div className="bg-[#f87171]/10 border border-[#f87171]/25 p-6 rounded-2xl">
                  <div className="text-3xl mb-3">📄</div>
                  <h4 className="font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Static Portfolios Don't Engage</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">A traditional portfolio presents information but doesn't answer specific questions — about a project, a skill, or how Ayushi's background maps to a role.</p>
                </div>
                <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/25 p-6 rounded-2xl">
                  <div className="text-3xl mb-3">🏗️</div>
                  <h4 className="font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Show, Don't Tell</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Actively exploring PM, strategy, and AI roles, Ayushi wanted her portfolio to itself be a demonstration of her ability to build and ship AI-powered products.</p>
                </div>
              </div>
              <div className="bg-secondary p-5 rounded-2xl border-l-4 border-[#818cf8] text-sm leading-relaxed">
                <strong>Core insight:</strong> A portfolio that lets you have a conversation is more memorable, more useful, and more authentic than one you just scroll through.
              </div>
            </section>

            {/* 03 GOALS */}
            <section id="prd-goals">
              <SectionLabel number="03" title="Goals & Success Metrics" color="text-[#34d399]" />
              <ul className="space-y-3 mb-8">
                {goals.map((g, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-[#34d399]/20 text-[#34d399] flex items-center justify-center text-xs shrink-0 mt-0.5">{i + 1}</span>
                    {g}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-3 gap-4">
                {metrics.map((m) => (
                  <div key={m.value} className="bg-secondary border border-border p-5 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-[#818cf8] mb-1" style={{ fontFamily: 'var(--font-display)' }}>{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 PERSONAS */}
            <section id="prd-personas">
              <SectionLabel number="04" title="User Personas" color="text-[#f9a8d4]" />
              <div className="grid md:grid-cols-2 gap-4">
                {personas.map((p) => (
                  <motion.div
                    key={p.name}
                    className={`border p-5 rounded-2xl ${p.color}`}
                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{p.icon}</span>
                      <h4 className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>{p.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2"><span className="font-semibold text-foreground/70">Goal:</span> {p.goal}</p>
                    <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground/70">Needs:</span> {p.need}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 05 USER STORIES */}
            <section id="prd-stories">
              <SectionLabel number="05" title="User Stories" color="text-[#a78bfa]" />
              <div className="space-y-4">
                {userStories.map((s, i) => (
                  <motion.div
                    key={s.id}
                    className="bg-secondary border border-border rounded-2xl p-5"
                    initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="text-xs font-bold tracking-widest text-muted-foreground mb-2">{s.id}</div>
                    <p className="text-sm font-medium mb-3 leading-relaxed">{s.story}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground/70">Acceptance criteria:</span> {s.ac}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 06 SCOPE */}
            <section id="prd-scope">
              <SectionLabel number="06" title="Scope" color="text-[#60a5fa]" />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-sm mb-3 text-[#34d399] uppercase tracking-wider">In Scope — v1.0</h4>
                  <div className="space-y-2">
                    {inScope.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-muted-foreground bg-[#34d399]/5 border border-[#34d399]/15 rounded-xl px-3 py-2">
                        <span className="text-[#34d399] shrink-0">→</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-3 text-[#f87171] uppercase tracking-wider">Out of Scope</h4>
                  <div className="space-y-2">
                    {outScope.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-muted-foreground bg-[#f87171]/5 border border-[#f87171]/15 rounded-xl px-3 py-2">
                        <span className="text-[#f87171] shrink-0">✕</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 07 ARCHITECTURE */}
            <section id="prd-arch">
              <SectionLabel number="07" title="System Design & Architecture" color="text-[#fbbf24]" />
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                The system follows a simple three-layer architecture: a static frontend widget, a serverless backend, and the Claude AI API.
              </p>
              <div className="bg-[#065f46]/30 border border-[#34d399]/25 p-5 rounded-2xl mb-6">
                <div className="text-xs font-bold text-[#34d399] uppercase tracking-wider mb-3">Request Flow</div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {requestFlowSteps.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/25 px-2 py-1 rounded-lg">{step}</span>
                      {i < requestFlowSteps.length - 1 && <span className="text-[#34d399]">→</span>}
                    </div>
                  ))}
                </div>
              </div>
              <h4 className="font-bold text-sm mb-4" style={{ fontFamily: 'var(--font-display)' }}>Key Design Decisions</h4>
              <div className="space-y-3">
                {keyDecisions.map((d) => (
                  <div key={d.title} className="bg-secondary rounded-2xl p-4 border-l-4 border-[#818cf8]">
                    <div className="font-semibold text-sm mb-1">{d.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{d.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 08 TECH STACK */}
            <section id="prd-stack">
              <SectionLabel number="08" title="Tech Stack" color="text-[#818cf8]" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {techStack.map((s) => (
                  <motion.div
                    key={s.tool}
                    className={`border rounded-2xl p-4 ${s.color}`}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{s.layer}</div>
                    <div className="font-semibold text-sm mb-1">{s.tool}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{s.desc}</div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 09 PROMPT ENGINEERING */}
            <section id="prd-prompts">
              <SectionLabel number="09" title="Prompt Engineering Approach" color="text-[#f9a8d4]" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                The system prompt is the core product artifact of this project. It encodes Ayushi's identity, professional history, personality, values, and conversation rules — functioning as a structured knowledge base that the model reasons over at inference time.
              </p>
              <h4 className="font-bold text-sm mb-4" style={{ fontFamily: 'var(--font-display)' }}>Prompt Structure</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {promptStructure.map((item) => (
                  <div key={item.n} className="bg-secondary rounded-xl p-4 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#f9a8d4]/25 text-[#f9a8d4] text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
                    <div>
                      <div className="font-semibold text-xs mb-1">{item.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-secondary border-l-4 border-[#f9a8d4] p-4 rounded-r-2xl text-sm text-muted-foreground leading-relaxed">
                Iterative prompt refinement was a core part of the build process — adjusting tone, adding depth on specific topics, and hardening guardrails based on test conversations.
              </div>
            </section>

            {/* 10 RISKS */}
            <section id="prd-risks">
              <SectionLabel number="10" title="Risks & Mitigations" color="text-[#f87171]" />
              <div className="space-y-3">
                {risks.map((r) => (
                  <div key={r.risk} className="bg-secondary rounded-2xl p-4 grid md:grid-cols-5 gap-3 items-start">
                    <div className="md:col-span-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Risk</div>
                      <p className="text-sm font-medium">{r.risk}</p>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Likelihood</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.likelihood === 'Medium' ? 'bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-[#34d399]/20 text-[#34d399]'}`}>
                        {r.likelihood}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Mitigation</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{r.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 11 FUTURE */}
            <section id="prd-future" className="pb-16">
              <SectionLabel number="11" title="Future Iterations" color="text-[#34d399]" />
              <div className="space-y-3">
                {futureItems.map((f) => (
                  <motion.div
                    key={f.feature}
                    className="bg-secondary rounded-2xl p-4 grid md:grid-cols-5 gap-3 items-start"
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  >
                    <div className="md:col-span-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Feature</div>
                      <p className="text-sm">{f.feature}</p>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Value</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.value}</p>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Priority</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        f.priority === 'High' ? 'bg-[#f87171]/20 text-[#f87171]'
                        : f.priority === 'Medium' ? 'bg-[#fbbf24]/20 text-[#fbbf24]'
                        : 'bg-[#60a5fa]/20 text-[#60a5fa]'
                      }`}>
                        {f.priority}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                <span>Ayushi Raj · Portfolio AI Agent PRD · v1.0 · April 2026</span>
                <span>ayushi_raj@ymail.com</span>
              </div>
            </section>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
