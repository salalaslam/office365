import type { JSONContent } from '@tiptap/react'

export interface DocumentTemplate {
  id: string
  name: string
  description: string
  icon: string
  content: JSONContent
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'business-proposal',
    name: 'Business Proposal',
    description: 'Professional proposal with executive summary, scope, and pricing',
    icon: '📋',
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Business Proposal' }] },
        { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'italic' }], text: 'Prepared for [Client Name] — [Date]' }] },
        { type: 'horizontalRule' },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Executive Summary' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'This proposal outlines our approach to delivering [project/service description]. Our team brings extensive experience in [relevant field], and we are confident that our solution will meet your objectives while staying within budget and timeline constraints.' }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Project Scope' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'The project encompasses the following key deliverables:' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Requirements analysis and technical architecture design' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Development and implementation of core features' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Quality assurance testing and deployment' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Post-launch support and maintenance (30 days)' }] }] },
        ] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Timeline' }] },
        { type: 'table', content: [
          { type: 'tableRow', content: [
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Phase' }] }] },
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Duration' }] }] },
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Deliverables' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Discovery' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '2 weeks' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Requirements document, project plan' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Development' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '6 weeks' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Working software, test reports' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Deployment' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '1 week' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Production deployment, documentation' }] }] },
          ] },
        ] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Pricing' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Total project investment: ' }, { type: 'text', marks: [{ type: 'bold' }], text: '$XX,XXX' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Payment terms: 50% upon signing, 25% at midpoint review, 25% upon delivery.' }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Next Steps' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'We look forward to discussing this proposal with you. Please reach out at [email] or [phone] to schedule a follow-up meeting.' }] },
      ],
    },
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Structured meeting minutes with action items and follow-ups',
    icon: '📝',
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Meeting Notes' }] },
        { type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'Date: ' },
          { type: 'text', text: '[Meeting Date]' },
        ] },
        { type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'Attendees: ' },
          { type: 'text', text: '[List of participants]' },
        ] },
        { type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'Facilitator: ' },
          { type: 'text', text: '[Name]' },
        ] },
        { type: 'horizontalRule' },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Agenda' }] },
        { type: 'orderedList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Review of previous action items' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Project status update' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Discussion: [Topic]' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Open floor' }] }] },
        ] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Discussion Notes' }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '1. Previous Action Items' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '[Action item 1] — Status: Complete / In Progress / Blocked' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '[Action item 2] — Status: Complete / In Progress / Blocked' }] }] },
        ] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '2. Project Status' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Summary of current progress, blockers, and upcoming milestones.' }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '3. Key Decisions' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Decision 1: [Description and rationale]' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Decision 2: [Description and rationale]' }] }] },
        ] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Action Items' }] },
        { type: 'table', content: [
          { type: 'tableRow', content: [
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Action' }] }] },
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Owner' }] }] },
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Due Date' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '[Action description]' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '[Name]' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '[Date]' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '[Action description]' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '[Name]' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '[Date]' }] }] },
          ] },
        ] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Next Meeting' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Scheduled for [date] at [time]. Location: [room/link].' }] },
      ],
    },
  },
  {
    id: 'project-report',
    name: 'Project Report',
    description: 'Comprehensive project status report with metrics and risks',
    icon: '📊',
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Project Status Report' }] },
        { type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'Project: ' },
          { type: 'text', text: '[Project Name]' },
        ] },
        { type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'Reporting Period: ' },
          { type: 'text', text: '[Start Date] — [End Date]' },
        ] },
        { type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'Overall Status: ' },
          { type: 'text', text: '🟢 On Track' },
        ] },
        { type: 'horizontalRule' },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Summary' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Provide a brief overview of project progress during this reporting period. Highlight key achievements and any significant changes to scope, timeline, or budget.' }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Key Metrics' }] },
        { type: 'table', content: [
          { type: 'tableRow', content: [
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Metric' }] }] },
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Target' }] }] },
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Actual' }] }] },
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Status' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Budget Spent' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '60%' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '55%' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '🟢' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Tasks Completed' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '40' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '38' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '🟡' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Timeline Progress' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '50%' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '48%' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '🟢' }] }] },
          ] },
        ] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Accomplishments' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Completed feature module A ahead of schedule' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Resolved critical integration issue with third-party API' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Onboarded two new team members' }] }] },
        ] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Risks & Issues' }] },
        { type: 'table', content: [
          { type: 'tableRow', content: [
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Risk' }] }] },
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Impact' }] }] },
            { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Mitigation' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Vendor delivery delay' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Medium' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Exploring alternative vendors' }] }] },
          ] },
          { type: 'tableRow', content: [
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Resource availability' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Low' }] }] },
            { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Cross-training team members' }] }] },
          ] },
        ] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Next Steps' }] },
        { type: 'orderedList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Begin Phase 3 development sprint' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Conduct stakeholder review meeting' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Finalize testing plan for integration tests' }] }] },
        ] },
      ],
    },
  },
]
