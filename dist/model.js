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
export const STRATEGY_FIELDS = ['context','strategy','risks','milestones'];
const blankSections = () => Object.fromEntries(SECTIONS.map(([id]) => [id, '']));
export function newScenario() {
  return { sections:blankSections(), canvas:emptyCanvas(), context:'', strategy:'', risks:'', milestones:'', assumptions:{monthlyRevenue:0,fixedCosts:0,variableCosts:0,startingCash:0,monthlyGrowth:0} };
}
export function newPlan({title,owner,description='',industry='Other',currency='MAD'}) {
  const now=new Date().toISOString();
  return {schemaVersion:2,id:crypto.randomUUID(),title,owner,description,industry,currency,status:'Draft',createdAt:now,updatedAt:now,lastEditedBy:owner,scenarios:Object.fromEntries(SCENARIOS.map(s=>[s.id,newScenario()])),versions:[]};
}
// Upgrade a copy; leave saved historical snapshots byte-for-byte intact.
export function migratePlan(input) {
  const p=structuredClone(input);
  if(p.schemaVersion===2)return p;
  const oldScenarios=p.scenarios;
  p.scenarios=Object.fromEntries(SCENARIOS.map(s=>{
    const old=oldScenarios?.[s.id]||{volume:1,growth:0};
    return [s.id,{...newScenario(),sections:structuredClone(p.sections||blankSections()),canvas:structuredClone(p.canvas||emptyCanvas()),assumptions:{...p.assumptions,monthlyRevenue:(p.assumptions?.monthlyRevenue||0)*old.volume,monthlyGrowth:old.growth}}];
  }));
  p.schemaVersion=2;
  p.migratedFrom=1;
  delete p.sections;delete p.canvas;delete p.assumptions;
  return p;
}
export function scenarioData(plan,id='realistic') {return plan.schemaVersion===2?plan.scenarios[id]:migratePlan(plan).scenarios[id];}
export function forecast(plan,id='realistic') {
  const a=scenarioData(plan,id).assumptions;
  let cash=a.startingCash;
  return Array.from({length:12},(_,month)=>{const revenue=a.monthlyRevenue*Math.pow(1+a.monthlyGrowth/100,month);const cost=a.fixedCosts+revenue*a.variableCosts/100;const profit=revenue-cost;cash+=profit;return {month,revenue,cost,profit,cash};});
}
export function metrics(plan,id='realistic') {
  const rows=forecast(plan,id),revenue=rows.reduce((n,r)=>n+r.revenue,0),profit=rows.reduce((n,r)=>n+r.profit,0);
  return {revenue,profit,margin:revenue?profit/revenue*100:0,endingCash:rows.at(-1).cash,breakEven:rows.findIndex(r=>r.profit>=0),runway:rows.findIndex(r=>r.cash<0)};
}
export function progress(plan,id) {
  const ids=id?[id]:SCENARIOS.map(s=>s.id);
  const values=ids.flatMap(key=>{const s=scenarioData(plan,key);return [...Object.values(s.sections),...Object.values(s.canvas),...STRATEGY_FIELDS.map(k=>s[k])];});
  return Math.round(values.filter(v=>v.trim()).length/values.length*100);
}
export function snapshot(plan,name,author) {
  const {versions,...data}=structuredClone(plan);
  return {id:crypto.randomUUID(),number:Math.max(0,...versions.map(v=>v.number))+1,name,author,createdAt:new Date().toISOString(),data};
}
export function restoreSnapshot(plan,id,author) {
  const v=plan.versions.find(v=>v.id===id);if(!v)throw Error('Version not found.');
  const restored=migratePlan({...v.data,versions:[]});
  restored.versions=[...structuredClone(plan.versions),snapshot(plan,'Before restore · '+v.name,author)];
  restored.updatedAt=new Date().toISOString();restored.lastEditedBy=author;
  return restored;
}
export function copyScenario(plan,from,to) {
  if(!SCENARIOS.some(s=>s.id===from)||!SCENARIOS.some(s=>s.id===to)||from===to)throw Error('Invalid scenario.');
  plan.scenarios[to]=structuredClone(plan.scenarios[from]);
}
export function changedFields(current,previous) {
  const a=migratePlan({...current,versions:[]}),b=migratePlan({...previous,versions:[]}),changes=[];
  for(const key of ['title','description','owner','industry','currency','status'])if(a[key]!==b[key])changes.push({scenario:null,group:'project',key,before:b[key]??'',after:a[key]??''});
  for(const {id} of SCENARIOS){
    for(const group of ['sections','canvas','assumptions'])for(const key of Object.keys(a.scenarios[id][group]))if(a.scenarios[id][group][key]!==b.scenarios[id][group][key])changes.push({scenario:id,group,key,before:b.scenarios[id][group][key],after:a.scenarios[id][group][key]});
    for(const key of STRATEGY_FIELDS)if(a.scenarios[id][key]!==b.scenarios[id][key])changes.push({scenario:id,group:'strategy',key,before:b.scenarios[id][key],after:a.scenarios[id][key]});
  }
  return changes;
}
function checkTexts(value,keys,message) {if(!value||typeof value!=='object'||keys.some(key=>typeof value[key]!=='string'))throw Error(message);}
function checkAssumptions(a,v2=true) {
  if(!a||['monthlyRevenue','fixedCosts','variableCosts','startingCash',...(v2?['monthlyGrowth']:[])].some(k=>!Number.isFinite(a[k])||a[k]>(k==='monthlyGrowth'?100:1e12)||a[k]<(k==='monthlyGrowth'?-100:0))||a.variableCosts>100)throw Error('Invalid financial assumptions.');
}
export function validatePlan(p) {
  if(!p||typeof p!=='object'||!/^[a-zA-Z0-9-]{1,80}$/.test(p.id)||typeof p.title!=='string'||!p.title.trim()||p.title.length>160||typeof p.owner!=='string'||!p.owner.trim()||!['MAD','USD','EUR','GBP'].includes(p.currency)||!Array.isArray(p.versions)||!p.scenarios||p.versions.length>1000)throw Error('This file is not a valid Forma business plan.');
  if(p.schemaVersion!==undefined&&p.schemaVersion!==1&&p.schemaVersion!==2)throw Error('Unsupported plan format.');
  if(p.schemaVersion===2){
    for(const {id} of SCENARIOS){const s=p.scenarios[id];if(!s)throw Error('Invalid scenario.');checkTexts(s.sections,SECTIONS.map(([k])=>k),'A plan section is missing.');checkTexts(s.canvas,CANVAS_BLOCKS.map(([k])=>k),'Invalid business model canvas.');checkTexts(s,STRATEGY_FIELDS,'Invalid scenario.');checkAssumptions(s.assumptions);}
  }else{
    checkTexts(p.sections,SECTIONS.map(([k])=>k),'A plan section is missing.');if(p.canvas!==undefined)checkTexts(p.canvas,CANVAS_BLOCKS.map(([k])=>k),'Invalid business model canvas.');checkAssumptions(p.assumptions,false);
    for(const {id} of SCENARIOS){const s=p.scenarios[id];if(!s||!Number.isFinite(s.volume)||s.volume<0||s.volume>10||!Number.isFinite(s.growth)||s.growth< -100||s.growth>100)throw Error('Invalid scenario assumptions.');}
  }
  for(const v of p.versions){if(!v||!/^[a-zA-Z0-9-]{1,80}$/.test(v.id)||!Number.isInteger(v.number)||v.number<1||typeof v.name!=='string'||typeof v.author!=='string'||!v.data||v.data.id!==p.id||v.data.versions!==undefined)throw Error('Invalid version history.');validatePlan({...v.data,versions:[]});}
  return p;
}
export function demoPlans(owner='Mehdi') {
  const p=newPlan({title:'Atelier Atlas',owner,description:'Un atelier de mobilier local, pensé pour durer.',industry:'Lifestyle & retail'});
  p.id='atelier-atlas-demo';
  const examples={
    pessimistic:{context:'Les commandes arrivent lentement et les fournisseurs augmentent leurs prix.',strategy:'Limiter la gamme à trois produits. Produire uniquement sur commande et reporter le recrutement.',risks:'Retards de livraison et trésorerie insuffisante.',milestones:'Valider 10 commandes en trois mois. Si les ventes restent faibles, réduire les dépenses fixes.',revenue:8000,costs:7000,variable:40,cash:35000,growth:1,market:'Particuliers locaux avec un budget limité.',offer:'Trois meubles essentiels, fabriqués sur commande.',channels:'Recommandations et vente directe.',operations:'Le fondateur assure la production avec un artisan partenaire.'},
    realistic:{context:'La demande progresse régulièrement et les coûts restent proches des devis.',strategy:'Lancer six produits et développer les ventes en ligne. Embaucher après validation de la demande.',risks:'Acquisition client trop coûteuse et dépendance à un fournisseur.',milestones:'Atteindre 30 commandes à six mois. Valider la marge avant de recruter.',revenue:15000,costs:8500,variable:30,cash:50000,growth:5,market:'Jeunes actifs et familles recherchant du mobilier durable.',offer:'Une collection de six meubles durables à prix accessible.',channels:'Boutique en ligne, réseaux sociaux et événements locaux.',operations:'Une petite équipe et deux fournisseurs locaux.'},
    optimistic:{context:'Les recommandations accélèrent les ventes et un hôtel souhaite commander une collection.',strategy:'Ouvrir un canal professionnel, augmenter la capacité de production et recruter plus tôt.',risks:'Croissance trop rapide et manque de capacité de livraison.',milestones:'Signer deux contrats professionnels à six mois. Augmenter la capacité avant toute nouvelle campagne.',revenue:24000,costs:12000,variable:28,cash:70000,growth:9,market:'Particuliers, hôtels et architectes d’intérieur.',offer:'Collections personnalisables pour particuliers et professionnels.',channels:'Vente en ligne, architectes et partenariats hôteliers.',operations:'Une équipe élargie et un atelier équipé pour de plus grands volumes.'}
  };
  for(const {id} of SCENARIOS){const e=examples[id],s=p.scenarios[id];for(const k of STRATEGY_FIELDS)s[k]=e[k];s.sections.summary=e.offer;s.sections.market=e.market;s.sections.marketing=e.channels;s.sections.operations=e.operations;s.sections.milestones=e.milestones;s.canvas.value=e.offer;s.canvas.customers=e.market;s.canvas.channels=e.channels;s.canvas.resources=e.operations;s.assumptions={monthlyRevenue:e.revenue,fixedCosts:e.costs,variableCosts:e.variable,startingCash:e.cash,monthlyGrowth:e.growth};}
  for(const {id} of SCENARIOS){const s=p.scenarios[id],e=examples[id];
    s.sections.problem=id==='pessimistic'?'Des clients sensibles au prix. Proposer peu de références et éviter les stocks invendus.':id==='realistic'?'Un manque de mobilier local durable et abordable. Répondre avec une collection cohérente et un service fiable.':'Des particuliers et professionnels recherchent du mobilier local personnalisable. Assurer qualité et capacité de livraison.';
    s.sections.business=id==='pessimistic'?'Vente sur commande avec acompte. Limiter les engagements financiers et conserver une structure légère.':id==='realistic'?'Vente directe en ligne et lors d’événements. Préserver la marge et réinvestir progressivement.':'Vente directe et contrats professionnels. Négocier les volumes tout en finançant l’augmentation de capacité.';
    s.canvas.partners=id==='pessimistic'?'Un artisan local et un transporteur à la demande.':id==='realistic'?'Deux fournisseurs locaux, un artisan et un partenaire logistique.':'Fournisseurs multiples, architectes, hôtels et partenaire logistique professionnel.';
    s.canvas.activities=id==='pessimistic'?'Produire sur commande, contrôler les coûts et entretenir les recommandations.':id==='realistic'?'Concevoir, fabriquer, vendre en ligne et assurer le suivi des clients.':'Développer les contrats professionnels, augmenter la production et suivre la qualité.';
    s.canvas.relationships=id==='pessimistic'?'Contact direct avec le fondateur, devis simples et suivi individuel.':id==='realistic'?'Conseils personnalisés, suivi de commande et service après-vente.':'Accompagnement des projets professionnels, interlocuteur dédié et fidélisation.';
    s.canvas.costs=`Charges fixes mensuelles : ${e.costs} MAD. Charges variables : ${e.variable} % du chiffre d’affaires. Adapter la production aux commandes.`;
    s.canvas.revenue=id==='pessimistic'?'Ventes unitaires sur commande, acompte avant production.':id==='realistic'?'Ventes de la collection principale, livraison et options de finition.':'Ventes de collections, personnalisation et contrats de fourniture professionnels.';
  }
  p.versions.push(snapshot(p,'Première étude des trois scénarios',owner));
  return [p];
}
