export const SCENARIOS = [
  { id: 'pessimistic', name: 'Pessimistic', color: '#bc8c5b', description: 'Prepare for the headwinds.', growth: 2, volume: 0.7 },
  { id: 'realistic', name: 'Realistic', color: '#6c8354', description: 'Your most likely path forward.', growth: 6, volume: 1 },
  { id: 'optimistic', name: 'Optimistic', color: '#698caa', description: 'Make room for the upside.', growth: 10, volume: 1.35 }
];
export const SECTIONS = [
  ['summary', 'Executive summary', 'The big idea, in a few clear words.', 'Describe your business, who you help, and what makes your approach different.'],
  ['problem', 'Problem & solution', 'Start with a problem worth solving.', 'What problem do your customers face? How does your business solve it?'],
  ['market', 'Market & customers', 'Know the people you’re building for.', 'Describe your target customers, market size, competitors, and competitive advantage.'],
  ['business', 'Business model', 'Turn value into a sustainable business.', 'How will you make money? Explain your pricing, costs, and revenue streams.'],
  ['marketing', 'Go-to-market strategy', 'Find your first customers. Then your next.', 'Describe your acquisition channels, positioning, launch plan, and retention strategy.'],
  ['operations', 'Operations & team', 'The people and process behind the plan.', 'Who does what? Outline responsibilities, suppliers, delivery, and key resources.'],
  ['milestones', 'Milestones & risks', 'Make the next steps tangible.', 'Set your milestones, success measures, biggest risks, and contingency plans.']
];
export const CANVAS_BLOCKS = [
  ['partners', 'Key partners', 'Who helps you make this happen?', 'Suppliers, collaborators, distributors, and strategic partners.', 'people'],
  ['activities', 'Key activities', 'What must your business do well?', 'The essential things you do to deliver your offer.', 'check'],
  ['resources', 'Key resources', 'What do you need to operate?', 'People, expertise, equipment, technology, and other assets.', 'folder'],
  ['value', 'Value propositions', 'Why will customers choose you?', 'The problem you solve, the benefit you offer, and what makes it different.', 'sprout'],
  ['relationships', 'Customer relationships', 'How do you connect and keep customers?', 'Personal service, community, ongoing support, or self-service.', 'people'],
  ['channels', 'Channels', 'How will you reach your customers?', 'Where people discover, buy, and receive your product or service.', 'arrow'],
  ['customers', 'Customer segments', 'Who are you creating value for?', 'Your specific customer groups, their needs, and buying habits.', 'people'],
  ['costs', 'Cost structure', 'What does it cost to run the business?', 'Your main fixed and variable costs: people, production, rent, tools, and marketing.', 'wallet'],
  ['revenue', 'Revenue streams', 'How will the business earn money?', 'What customers pay for, how you price it, and how often they buy.', 'trend']
];
export function emptyCanvas() { return Object.fromEntries(CANVAS_BLOCKS.map(([id]) => [id, ''])); }
export function forecast(plan, scenarioId = 'realistic') {
  const a = plan.assumptions;
  const s = plan.scenarios[scenarioId];
  let cash = a.startingCash;
  return Array.from({ length: 12 }, (_, month) => {
    const revenue = a.monthlyRevenue * s.volume * Math.pow(1 + s.growth / 100, month);
    const cost = revenue * a.variableCosts / 100 + a.fixedCosts;
    const profit = revenue - cost;
    cash += profit;
    return { month, revenue, cost, profit, cash };
  });
}
export function metrics(plan, id = 'realistic') {
  const rows = forecast(plan, id);
  const revenue = rows.reduce((n, r) => n + r.revenue, 0);
  const profit = rows.reduce((n, r) => n + r.profit, 0);
  return { revenue, profit, margin: revenue ? profit / revenue * 100 : 0, endingCash: rows.at(-1).cash, breakEven: rows.findIndex(r => r.profit >= 0), runway: rows.findIndex(r => r.cash < 0) };
}
export function progress(plan) { return Math.round(SECTIONS.filter(([id]) => (plan.sections[id] || '').trim()).length / SECTIONS.length * 100); }
export function newPlan({ title, owner, description = '', currency = 'MAD', industry = 'Other' }) {
  const now = new Date().toISOString();
  return { id: crypto.randomUUID(), title, owner, description, currency, industry, status: 'Draft', createdAt: now, updatedAt: now, sections: Object.fromEntries(SECTIONS.map(([id]) => [id, ''])), canvas: emptyCanvas(), assumptions: { monthlyRevenue: 12000, fixedCosts: 9000, variableCosts: 25, startingCash: 50000 }, scenarios: Object.fromEntries(SCENARIOS.map(s => [s.id, { growth: s.growth, volume: s.volume }])), versions: [] };
}
export function snapshot(plan, name, author) {
  const { versions, ...data } = structuredClone(plan);
  return { id: crypto.randomUUID(), number: Math.max(0, ...versions.map(v => v.number)) + 1, name, author, createdAt: new Date().toISOString(), data };
}
export function validatePlan(p) {
  if (!p || typeof p !== 'object' || !/^[a-zA-Z0-9-]{1,80}$/.test(p.id) || typeof p.title !== 'string' || !p.title.trim() || p.title.length > 160 || typeof p.owner !== 'string' || !p.owner.trim() || !['USD', 'EUR', 'MAD', 'GBP'].includes(p.currency) || !p.sections || !p.assumptions || !p.scenarios || !Array.isArray(p.versions)) throw new Error('This file is not a valid Forma business plan.');
  for (const [id] of SECTIONS) if (typeof p.sections[id] !== 'string') throw new Error('A plan section is missing.');
  // Older plans and snapshots remain valid without a canvas. Rendering treats it as empty.
  if (p.canvas !== undefined && (!p.canvas || typeof p.canvas !== 'object' || Array.isArray(p.canvas) || CANVAS_BLOCKS.some(([id]) => typeof p.canvas[id] !== 'string'))) throw new Error('Invalid business model canvas.');
  for (const key of ['monthlyRevenue', 'fixedCosts', 'variableCosts', 'startingCash']) if (!Number.isFinite(p.assumptions[key]) || p.assumptions[key] < 0 || (key === 'variableCosts' && p.assumptions[key] > 100) || p.assumptions[key] > 1e12) throw new Error('Invalid financial assumptions.');
  for (const {id} of SCENARIOS) if (!p.scenarios[id] || !Number.isFinite(p.scenarios[id].growth) || p.scenarios[id].growth < -100 || p.scenarios[id].growth > 100 || !Number.isFinite(p.scenarios[id].volume) || p.scenarios[id].volume < 0 || p.scenarios[id].volume > 10) throw new Error('Invalid scenario assumptions.');
  if (p.versions.length > 1000) throw new Error('Too many versions.');
  for (const v of p.versions) { if (!v || !/^[a-zA-Z0-9-]{1,80}$/.test(v.id) || !Number.isInteger(v.number) || v.number < 1 || typeof v.name !== 'string' || typeof v.author !== 'string' || !v.data || v.data.id !== p.id || !Array.isArray(v.data.versions ?? [])) throw new Error('Invalid version history.'); validatePlan({...v.data, versions: []}); }
  return p;
}
export function demoPlans() {
  const a = newPlan({ title: 'The Sunday Studio', owner: 'Mehdi', description: 'Thoughtful spaces. Everyday rituals.', industry: 'Lifestyle & retail' });
  a.id = 'the-sunday-studio'; a.status = 'In progress';
  a.sections.summary = 'The Sunday Studio is a thoughtfully curated home and lifestyle brand for people who believe that everyday spaces can feel extraordinary. We bring together small-batch homewares, considered design, and a slower approach to living.\n\nOur first chapter is an online collection of essentials, supported by intimate pop-up experiences. We aim to become the go-to destination for accessible, independent design.';
  a.sections.problem = 'Design-conscious customers often choose between mass-market products with little character and independent pieces priced out of reach. We bridge the gap with a carefully edited collection, transparent sourcing, and approachable pricing.';
  a.sections.market = 'Our primary audience is urban professionals aged 25–40 who value design, sustainability, and a personal connection to the things they buy. We will begin with a focused local audience and validate demand through a small launch collection.';
  a.sections.business = 'Direct-to-consumer sales through our online store, complemented by seasonal pop-ups. Our target variable cost is 25% of revenue. A focused product range and small initial production runs help us learn before scaling.';
  a.sections.marketing = 'Start with a founder-led community on Instagram and Pinterest, a weekly editorial newsletter, and collaborations with local interior designers. Launch with a limited collection and collect customer feedback before expanding.';
  a.versions.push(snapshot(a, 'The first chapter', 'Mehdi'));
  const b = newPlan({ title: 'Gather & Ground', owner: 'Partner', description: 'A neighborhood coffee concept with community at its heart.', industry: 'Food & beverage' }); b.id = 'gather-and-ground'; b.sections.summary = 'A welcoming neighborhood café that pairs specialty coffee with space to connect. Our plan starts with one location, a simple menu, and a loyal local community.'; b.assumptions.monthlyRevenue = 18000; b.assumptions.fixedCosts = 14000;
  return [a,b];
}
