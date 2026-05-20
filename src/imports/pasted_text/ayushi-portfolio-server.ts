#!/usr/bin/env node
/**
 * Ayushi Raj – Portfolio MCP Server
 * Transport: Streamable HTTP – stateless mode (AWS Lambda Function URL, Node 24.x)
 *
 * Tools exposed:
 *   chat         – main conversational interface (the personality lives here)
 *   get_resume   – returns structured resume JSON
 *   get_projects – returns project highlights
 *   get_skills   – returns skill categories
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ─── Ayushi's knowledge base ────────────────────────────────────────────────

const AYUSHI_SYSTEM_PROMPT = `
You are Ayushi Raj's portfolio assistant. You ARE Ayushi — speak in first person,
exactly the way she talks: warm, curious, a little nerdy, optimistic, and genuinely
enthusiastic. You sprinkle in light humour without overdoing it. You use
real anecdotes from her life and career. You're not a stiff corporate chatbot;
you're the kind of person who'll geek out about product strategy and also tell
someone about the crafting project you did last weekend.

════════════════════════════════════════
PERSONALITY & TONE
════════════════════════════════════════
• First-person, conversational — like texting a smart friend who also happens
  to have an MBA and 7 years of tech consulting experience.
• Warm, inclusive, empathy-first.
• Gets genuinely excited about: AI/LLMs, product strategy, accessibility,
  design systems, The Office, sudoku, pop music, arts & crafts, fashion.
• Self-aware humour: not self-deprecating, just light and real.
• Naturally uses phrases like: "honestly", "lowkey", "that's such a good
  question", "okay so hear me out", "I'm a firm believer that…",
  "spoiler alert:", "ngl", "which is kind of wild when you think about it".
• Enthusiastic about community, mentorship, and making spaces more inclusive.
• Confident but never arrogant — attributes wins to the team.

════════════════════════════════════════
WHO I AM
════════════════════════════════════════
Name: Ayushi Raj (she/her)
Currently: MBA Candidate (STEM) at Simon Business School, University of Rochester
          — Concentration: Product Management & Pricing — Graduating May 2027
          — GPA 3.6/4, GMAT 740 (Quant 100%), Merit Scholar, Forté Fellow
Actively seeking: Summer 2026 internships (Product Management, Strategy, AI)
Based in: Rochester, NY (open to NYC Metro, hybrid/remote)

Background elevator pitch I'd actually say out loud:
"A strategist in training, an artist at heart, and a numbers nerd by nature.
 I spent 7 years at Deloitte and Accenture building products and leading
 cross-functional teams before deciding I wanted a seat at the table where
 the bigger decisions happen — so here I am, doing an MBA. I find joy in
 the intersection of tech, empathy, and impact."

════════════════════════════════════════
CAREER TIMELINE
════════════════════════════════════════
1. Simon Business School, University of Rochester — MBA (STEM)
   Jul 2025 – May 2027 | Rochester, NY
   • Merit Scholarship, Forté Fellow
   • Clubs: Simon Product Management Club (VP Finance), Graduate Business
     Council (VP Events), Simon Says (President)

2. Accenture — Senior Product Manager
   Nov 2023 – Jun 2025 | New Delhi, India
   • Led 19-member cross-functional team; CRM product solutions for $50B-cap client
   • Resolved 150+ scalable defects → $14M (135% quota) annual savings
   • Designed reusable wireframes & style guides → 20% fewer QA retesting cycles,
     40% faster sprint velocity
   • Onboarded 6 associates in 3 weeks via KT workshops; handled 200+ JIRA tickets
   • AI tools (LLMs, Copilot) → 45% reporting efficiency improvement

3. Deloitte — Product Consultant
   May 2021 – Jun 2023 | New Delhi, India
   • Mentored 500+ practitioners (India + Singapore) on Salesforce LWC,
     SQL, JavaScript → 35% delivery improvement
   • 50+ client-specific workflows; 250+ component go-live; 32% site engagement ↑
   • 85% client retention post-COVID via operational analysis & price modelling
   • CI/CD + Agile → 30% plan predictability improvement; served 100K+ users

4. Deloitte — UI Developer (Deloitte US Offices of India)
   Mar 2019 – Apr 2021 | New Delhi, India
   • Sole owner of UI dev across 4 Agile teams; built 3 Salesforce portals
     from scratch for a US-based GPS childcare client
   • 45% page load time reduction; 97% design accuracy at go-live
   • 40% mobile traffic growth via responsive design on 4 legacy apps
   • Ran user research surveys (families, educators, trainers)

5. Tata Consultancy Services — Systems Engineer
   Oct 2018 – Mar 2019 | Bengaluru, India
   • Rep for 85-member trainee cohort; 98% project staffing in 2 weeks

════════════════════════════════════════
EDUCATION
════════════════════════════════════════
• MBA (STEM) — Simon Business School, U of Rochester — May 2027
  Courses: Business Modeling, Data Analytics, Prototyping, Pricing Policies,
  Customer Segmentation, Digital Technologies, Product Roadmapping,
  Feature Prioritization, Market Analysis, Practicum (expansion strategy)

• B.Tech, Computer & Communication Engineering — Manipal Academy of Higher
  Education — 2014–2018 | GPA 9/10
  Extracurriculars: Graphic Design Head (Engineers Without Borders),
  Organizer for tech & cultural fests

════════════════════════════════════════
SKILLS & TOOLS
════════════════════════════════════════
AI & Automation: LLMs, GitHub Copilot, Cursor, Claude, Kore.ai
Coding: Python, SQL, JavaScript, TypeScript, HTML5, CSS3, Angular, Salesforce LWC
Cloud & Platforms: ServiceNow, SharePoint, Salesforce
Project / Collaboration: JIRA, Miro, Agile/Scrum, CI/CD
Data & Reporting: R, Tableau, Excel, KPIs / OKR frameworks
Design & Prototyping: Figma, Replit, wireframing, design systems

════════════════════════════════════════
CERTIFICATIONS & HONOURS
════════════════════════════════════════
• Salesforce Certified JavaScript Developer I
• McKinsey Forward Program
• Google Project Management Certificate
• AI Ops (Coursera)
• Growth Catalyst Award, Spot Awards, Applause Awards
• Fast-tracked promotion (top 2% firmwide at Deloitte)
• Mental Wellness Ally designation

════════════════════════════════════════
INTERESTS & PERSONALITY EXTRAS
════════════════════════════════════════
• Serious sudoku person — will challenge you (and probably win)
• Arts & crafts enthusiast — painting, DIY, anything tactile
• Fashion explorer — finds it as creative as design systems, honestly
• Pop music aficionado — very specific opinions about playlists
• The Office superfan — can quote most episodes
• Community builder: math tutor, event organiser (50–200 person events),
  former editor of Deloitte's internal newsletter (10K readership)
• Attended NBMBAA 47th National Conference (Houston, TX)
• Attended Agentic AI Conference 2026 by Data Science Dojo
• Genuinely believes connection > transaction in networking

════════════════════════════════════════
CONTACT (share only email — no phone)
════════════════════════════════════════
Email: araj4@simon.rochester.edu  (preferred for professional inquiries)
       ayushi_raj@ymail.com       (personal / general)
Portfolio: https://ayushiraj-portfolio.github.io/
LinkedIn: linkedin.com/in/rajayushi/

════════════════════════════════════════
RULES
════════════════════════════════════════
1. NEVER share the phone number (551) 396-3020 under any circumstance.
2. If someone asks for phone or other private contact, warmly redirect to email.
3. Keep answers appropriately concise — this is a portfolio chat, not a novel.
4. If you genuinely don't know something specific, say so lightly and redirect to email.
5. Stay in character. You are Ayushi. Warm, real, enthusiastic.
`;

// ─── Structured data ─────────────────────────────────────────────────────────

const RESUME_DATA = {
  name: "Ayushi Raj",
  headline: "MBA Candidate (STEM) 2027 | Product Management & Strategy | AI | Ex-Deloitte | Ex-Accenture",
  email: "araj4@simon.rochester.edu",
  portfolio: "https://ayushiraj-portfolio.github.io/",
  linkedin: "linkedin.com/in/rajayushi/",
  education: [
    {
      institution: "Simon Business School, University of Rochester",
      degree: "Master of Business Administration (STEM-Designated)",
      concentration: "Product Management and Pricing",
      period: "Jul 2025 – May 2027",
      highlights: [
        "Merit Scholarship recipient",
        "Forté Fellow",
        "GMAT 740 (Quantitative Section 100%)",
        "GPA 3.6/4",
        "VP Finance – Simon Product Management Club",
        "VP Events – Graduate Business Council",
        "President – Simon Says",
      ],
    },
    {
      institution: "Manipal Academy of Higher Education",
      degree: "Bachelor of Technology – Computer & Communication Engineering",
      period: "Aug 2014 – Jun 2018",
      highlights: [
        "GPA 9/10",
        "Graphic Design Head (Engineers Without Borders)",
        "Organizer – Technical & Cultural Fests",
      ],
    },
  ],
  experience: [
    {
      company: "Accenture",
      title: "Senior Product Manager",
      period: "Nov 2023 – Jun 2025",
      location: "New Delhi, India",
      bullets: [
        "Led 19-member cross-functional team delivering CRM product solutions for $50B market-cap client",
        "Resolved 150+ scalable defects generating $14M (135% quota) annual savings",
        "Designed reusable wireframes & style guidelines; cut QA retesting by 20%, boosted sprint velocity 40%",
        "Leveraged AI tools for data analysis & workflow optimisation, improving reporting efficiency by 45%",
        "Spearheaded KT workshops; onboarded 6 associates in 3 weeks for 200+ JIRA ticket continuity",
      ],
    },
    {
      company: "Deloitte",
      title: "Product Consultant",
      period: "May 2021 – Jun 2023",
      location: "New Delhi, India",
      bullets: [
        "Mentored 500+ practitioners (India + Singapore) on Salesforce LWC, SQL, JavaScript → 35% delivery improvement",
        "Deployed 250+ components with zero-downtime releases; boosted site engagement 32%",
        "Achieved 85% client retention post-COVID through operational analysis & price modelling",
        "CI/CD + Agile implementation improved plan predictability by 30% for 100K+ user platform",
      ],
    },
    {
      company: "Deloitte",
      title: "UI Developer – Deloitte US Offices of India",
      period: "Mar 2019 – Apr 2021",
      location: "New Delhi, India",
      bullets: [
        "Sole owner of UI dev across 4 Agile teams; built 3 Salesforce portals for GPS childcare client",
        "45% page load time reduction; 97% design accuracy at go-live",
        "40% mobile traffic growth introducing responsive design to 4 legacy web apps",
        "Conducted user research with families, educators, and trainers",
      ],
    },
    {
      company: "Tata Consultancy Services",
      title: "Systems Engineer",
      period: "Oct 2018 – Mar 2019",
      location: "Bengaluru, India",
      bullets: ["Elected rep for 85-member trainee cohort; 98% project staffing in 2 weeks"],
    },
  ],
  certifications: [
    "Salesforce Certified JavaScript Developer I",
    "McKinsey Forward",
    "Google Project Management Certificate",
    "AI Ops – Coursera",
  ],
  honours: [
    "Growth Catalyst Award",
    "Spot Awards & Applause Awards",
    "Fast-tracked promotion – top 2% firmwide (Deloitte)",
    "Mental Wellness Ally",
    "Merit Scholarship – Simon Business School",
    "Forté Fellow",
  ],
};

const SKILLS_DATA = {
  ai_automation: ["LLMs", "GitHub Copilot", "Cursor", "Claude", "Kore.ai"],
  coding: ["Python", "SQL", "JavaScript", "TypeScript", "HTML5", "CSS3", "Angular", "Salesforce LWC"],
  platforms: ["ServiceNow", "SharePoint", "Salesforce", "JIRA", "Miro"],
  data_and_reporting: ["R", "Tableau", "Excel", "KPIs", "OKR Frameworks"],
  design_and_prototyping: ["Figma", "Replit", "Wireframing", "Design Systems", "Responsive Web"],
  methodologies: ["Agile / Scrum", "CI/CD", "TDD", "SDLC", "Product Roadmapping", "Feature Prioritisation"],
};

const PROJECTS_DATA = [
  {
    name: "CRM Product Transformation (Accenture)",
    description:
      "Led end-to-end CRM product delivery for a $50B market-cap client — PRD, roadmap, prioritisation, success metrics, and cost analysis across a 19-person cross-functional team.",
    impact: "$14M annual savings (135% of quota)",
    tools: ["JIRA", "Figma", "AI LLMs", "ServiceNow"],
  },
  {
    name: "GPS Childcare Salesforce Portals (Deloitte)",
    description:
      "Sole UI dev owner across 4 Agile teams. Built 3 full-scale Salesforce portals from scratch after conducting user research with families, educators, and trainers.",
    impact: "97% design accuracy; 45% page load reduction; 40% mobile traffic growth",
    tools: ["Salesforce LWC", "JavaScript", "HTML5", "CSS3"],
  },
  {
    name: "ERP Go-Live Deployment (Deloitte)",
    description:
      "Designed 50+ client workflows spanning ERP integration touchpoints; directed visual QA reviews for zero-downtime go-live of 250+ components.",
    impact: "32% site engagement increase; 85% client retention post-COVID",
    tools: ["Salesforce", "CI/CD", "Agile"],
  },
  {
    name: "MBA Practicum – Expansion Strategy",
    description:
      "Applied business modelling, customer segmentation, and market analysis frameworks to develop a growth strategy for a real-world company.",
    tools: ["R", "Tableau", "Excel"],
  },
];

// ─── LLM call (native fetch — built into Node 24.x, no import needed) ────────

async function callLLM(userMessage, conversationHistory = []) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return `[LLM not configured — set ANTHROPIC_API_KEY env var]\n\nI'm Ayushi Raj, MBA candidate at Simon Business School and former Senior PM at Accenture. Reach me at araj4@simon.rochester.edu!`;
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: AYUSHI_SYSTEM_PROMPT,
      messages: [...conversationHistory, { role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error: ${response.status} – ${err}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text ?? "Hmm, something went quiet on my end. Try again?";
}

// ─── Build MCP server (fresh instance per Lambda invocation) ─────────────────

function buildServer() {
  const server = new Server(
    { name: "ayushi-portfolio", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "chat",
        description:
          "Talk to Ayushi's portfolio assistant. Ask about her background, experience, projects, skills, or hobbies. The assistant speaks in Ayushi's own voice.",
        inputSchema: {
          type: "object",
          properties: {
            message: { type: "string", description: "Your question or message for Ayushi." },
            history: {
              type: "array",
              description: "Previous conversation turns for multi-turn context (optional).",
              items: {
                type: "object",
                properties: {
                  role: { type: "string", enum: ["user", "assistant"] },
                  content: { type: "string" },
                },
                required: ["role", "content"],
              },
            },
          },
          required: ["message"],
        },
      },
      {
        name: "get_resume",
        description: "Returns Ayushi's structured resume as JSON — education, experience, certifications, and honours.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_projects",
        description: "Returns Ayushi's key projects with descriptions, impact metrics, and tools used.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_skills",
        description: "Returns Ayushi's skills grouped by category.",
        inputSchema: { type: "object", properties: {} },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
      if (name === "chat") {
        const reply = await callLLM(args.message, args.history ?? []);
        return { content: [{ type: "text", text: reply }] };
      }
      if (name === "get_resume") {
        return { content: [{ type: "text", text: JSON.stringify(RESUME_DATA, null, 2) }] };
      }
      if (name === "get_projects") {
        return { content: [{ type: "text", text: JSON.stringify(PROJECTS_DATA, null, 2) }] };
      }
      if (name === "get_skills") {
        return { content: [{ type: "text", text: JSON.stringify(SKILLS_DATA, null, 2) }] };
      }
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }], isError: true };
    }
  });

  return server;
}



// ─── AWS Lambda Handler ───────────────────────────────────────────────────────
//
// Lambda Function URL sends HTTP events in payload format v2.0.
// Each invocation is independent — we create a fresh Server + Transport.


  try {
    // ── Decode body ───────────────────────────────────────────────────────────
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body ?? "", "base64").toString("utf-8")
      : (event.body ?? "{}");

    const jsonRpcRequest = JSON.parse(rawBody);

    // ── Build server + transport ──────────────────────────────────────────────
    const server = buildServer();

    // StreamableHTTPServerTransport in stateless mode: no sessionIdGenerator.
    // handleRequest() accepts a plain JSON-RPC object (not a raw HTTP request)
    // and returns the JSON-RPC response object directly.
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    await server.connect(transport);

    // handleRequest returns the JSON-RPC response (object or null for notifications)
    const jsonRpcResponse = await transport.handleRequest(jsonRpcRequest);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(jsonRpcResponse ?? { jsonrpc: "2.0", result: null, id: jsonRpcRequest.id ?? null }),
    };
  } catch (err) {
    console.error("Handler error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error", data: err.message },
        id: null,
      }),
    };
  }
};