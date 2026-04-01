export interface SlideData {
  id: string
  title: string
  subtitle?: string
  body?: string
  bullets?: string[]
  imageUrl?: string
  layout: 'title' | 'title-content' | 'two-column' | 'image-full' | 'bullets' | 'blank'
  background?: string
  textColor?: string
}

export interface PresentationTemplate {
  id: string
  name: string
  description: string
  icon: string
  transition: 'fade' | 'slide' | 'scale'
  slides: SlideData[]
}

let slideIdCounter = 0
function sid(): string {
  return `slide-${++slideIdCounter}-${Date.now()}`
}

export const presentationTemplates: PresentationTemplate[] = [
  {
    id: 'startup-pitch',
    name: 'Startup Pitch Deck',
    description: 'Investor-ready pitch deck with key startup slides',
    icon: '🚀',
    transition: 'slide',
    slides: [
      {
        id: sid(), layout: 'title',
        title: 'Your Startup Name',
        subtitle: 'Revolutionizing [Industry] with [Key Innovation]',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'The Problem',
        bullets: [
          'Current solutions are slow and expensive',
          '80% of businesses struggle with [pain point]',
          'No existing tool addresses [specific gap]',
          'Market is growing at 25% YoY',
        ],
        background: '#ffffff',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Our Solution',
        bullets: [
          'AI-powered platform that automates [process]',
          '10x faster than existing alternatives',
          'Easy integration with existing workflows',
          'Enterprise-grade security built in',
        ],
        background: '#ffffff',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Market Opportunity',
        bullets: [
          'Total Addressable Market: $50B',
          'Serviceable Addressable Market: $12B',
          'Target Market: $3B by 2028',
          'Growing at 30% CAGR',
        ],
        background: '#f8fafc',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Business Model',
        bullets: [
          'SaaS subscription model — $99/mo to $999/mo',
          'Free tier drives organic adoption',
          'Average contract value: $15,000/year',
          'Net revenue retention: 130%',
        ],
        background: '#ffffff',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'title-content',
        title: 'The Ask',
        body: 'We are raising $5M Series A to scale our go-to-market engine, expand the engineering team, and enter three new markets by Q4 2027.',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff',
      },
    ],
  },
  {
    id: 'quarterly-review',
    name: 'Quarterly Business Review',
    description: 'QBR template with performance metrics and goals',
    icon: '📈',
    transition: 'fade',
    slides: [
      {
        id: sid(), layout: 'title',
        title: 'Q1 2026 Business Review',
        subtitle: '[Company Name] — Quarterly Performance Update',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
        textColor: '#ffffff',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Key Highlights',
        bullets: [
          'Revenue: $4.2M (+18% QoQ)',
          'New customers: 142 (+25% QoQ)',
          'Customer satisfaction: 4.7/5.0',
          'Team growth: 12 new hires',
        ],
        background: '#ffffff',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Goals vs. Actuals',
        bullets: [
          '✅ Revenue target: $4M → Achieved $4.2M',
          '✅ Customer acquisition: 120 → Achieved 142',
          '⚠️ Churn rate target: <2% → Actual 2.3%',
          '✅ NPS target: >60 → Achieved 68',
        ],
        background: '#f8fafc',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Challenges & Learnings',
        bullets: [
          'Higher than expected churn in SMB segment',
          'Onboarding process needs streamlining',
          'Infrastructure costs exceeded budget by 8%',
          'Need dedicated customer success for Enterprise',
        ],
        background: '#ffffff',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Q2 2026 Priorities',
        bullets: [
          'Launch self-serve onboarding flow',
          'Reduce churn to <1.8%',
          'Expand into European market',
          'Ship v2.0 of analytics dashboard',
        ],
        background: '#ffffff',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'title-content',
        title: 'Thank You',
        body: 'Questions? Let\'s discuss how we can make Q2 our best quarter yet.',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
        textColor: '#ffffff',
      },
    ],
  },
  {
    id: 'project-kickoff',
    name: 'Project Kickoff',
    description: 'Project introduction with goals, timeline, and team roles',
    icon: '🎯',
    transition: 'slide',
    slides: [
      {
        id: sid(), layout: 'title',
        title: 'Project Kickoff',
        subtitle: '[Project Name] — Let\'s build something great',
        background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
        textColor: '#ffffff',
      },
      {
        id: sid(), layout: 'title-content',
        title: 'Project Overview',
        body: 'We are building [brief description] to solve [problem]. This project will span 12 weeks and involves cross-functional collaboration between engineering, design, and product teams.',
        background: '#ffffff',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Project Goals',
        bullets: [
          'Deliver MVP by end of Q2 2026',
          'Achieve 95% test coverage on critical paths',
          'Onboard first 50 beta users',
          'Gather feedback for v2 roadmap',
        ],
        background: '#f8fafc',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Team & Roles',
        bullets: [
          '👤 Project Lead: [Name]',
          '🎨 Design Lead: [Name]',
          '💻 Tech Lead: [Name]',
          '📊 Product Owner: [Name]',
        ],
        background: '#ffffff',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'bullets',
        title: 'Timeline & Milestones',
        bullets: [
          'Week 1-2: Discovery & requirements',
          'Week 3-6: Design & development sprint 1',
          'Week 7-10: Development sprint 2 + QA',
          'Week 11-12: Beta launch & feedback',
        ],
        background: '#ffffff',
        textColor: '#1e293b',
      },
      {
        id: sid(), layout: 'title-content',
        title: 'Next Steps',
        body: 'Schedule individual team syncs this week. First sprint planning session is on Monday. Let\'s ship it!',
        background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
        textColor: '#ffffff',
      },
    ],
  },
]
