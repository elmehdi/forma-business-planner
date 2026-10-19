// Interface translations are separate from plan content and stored data values.
let language = globalThis.localStorage?.getItem('forma-language') === 'en' ? 'en' : 'fr';
export const getLanguage = () => language;
export function setLanguage(value) {
  language = value === 'en' ? 'en' : 'fr';
  globalThis.localStorage?.setItem('forma-language', language);
}
export const locale = () => language === 'fr' ? 'fr-MA' : 'en-GB';
const fr = Object.fromEntries(`
Overview|Vue d’ensemble
Compare scenarios|Comparer les scénarios
Scenario strategy|Stratégie du scénario
Work together|Travailler ensemble
This plan changed elsewhere. Reload it before saving.|Ce projet a changé ailleurs. Actualisez-le avant de l’enregistrer.
Could not read workspace files.|Impossible de lire les fichiers de l’espace de travail.
Folder connection needs Chrome or Edge. Use JSON export and import in this browser.|La connexion à un dossier nécessite Chrome ou Edge. Utilisez l’export et l’import JSON dans ce navigateur.
A plan filename does not match its ID.|Le nom d’un fichier de projet ne correspond pas à son identifiant.
Unsupported plan format.|Ce format de projet n’est pas pris en charge.
Invalid scenario.|Ce scénario est invalide.
Version not found.|Version introuvable.
Business plans|Plans d’affaires
Business canvas|Canevas d’affaires
Scenario planning|Scénarios
Financial forecast|Prévisions financières
Version history|Historique des versions
Workspace settings|Paramètres
Workspace|Espace de travail
WORKSPACE|ESPACE DE TRAVAIL
Your personal workspace|Votre espace personnel
All changes saved|Toutes les modifications sont enregistrées
Saved in this browser|Enregistré dans ce navigateur
Saving…|Enregistrement…
Saved in browser · file save failed|Enregistré dans le navigateur · échec de sauvegarde du fichier
Help|Aide
Open navigation|Ouvrir le menu
Language|Langue
Made for the way you build.|Un espace pour concrétiser vos idées.
Local files connected|Fichiers locaux connectés
Private browser storage|Stockage privé du navigateur
Forma workspace|Espace Forma
A LITTLE STRUCTURE. A LOT OF POSSIBILITY.|UN PEU DE STRUCTURE. DE GRANDES POSSIBILITÉS.
A clearer plan forward|Un projet plus clair
A clearer plan forward.|Un projet plus clair.
Shape your ideas, explore the possibilities, and build with confidence.|Structurez vos idées, explorez les possibilités et avancez avec confiance.
New business plan|Nouveau plan d’affaires
YOUR NEXT CHAPTER|VOTRE PROCHAIN CHAPITRE
Good businesses|Les belles entreprises
start with a|commencent par un
plan.|plan.
Bring your vision into focus. One thoughtful|Précisez votre vision. Une bonne
decision at a time.|décision à la fois.
Continue your plan|Poursuivre votre plan
A shared space. Your own possibilities.|Un espace partagé. Vos propres ambitions.
ideas, taking shape.|les idées prennent forme.
Your workspace, at a glance|Votre espace en un coup d’œil
Perspectives per plan|Scénarios par plan
Saved versions|Versions enregistrées
Every step counts|Chaque étape compte
Your ideas have a home here.|Vos idées ont leur place ici.
Your business plans|Vos plans d’affaires
Big ambitions, with a place to begin.|De grandes ambitions, un point de départ.
View all plans|Voir tous les plans
A new idea in mind?|Une nouvelle idée en tête ?
Give it a little structure.|Donnez-lui une structure.
Create a plan|Créer un plan
One plan. Three possibilities.|Un plan. Trois possibilités.
A little perspective makes for better decisions.|Prenez du recul pour mieux décider.
12-month outlook|Prévisions sur 12 mois
Progress over perfection.|Avancer plutôt que viser la perfection.
Your plan is a living document. Make a start, learn something, and come back to it.|Votre plan évolue avec vous. Commencez, apprenez et affinez-le au fil du temps.
See your journey|Voir votre parcours
You|Vous
Plan completeness|Avancement du plan
Open plan|Ouvrir le plan
Draft|Brouillon
In progress|En cours
Ready to share|Prêt à partager
Pessimistic|Pessimiste
Realistic|Réaliste
Optimistic|Optimiste
Prepare for the headwinds.|Anticipez les difficultés.
Your most likely path forward.|Votre trajectoire la plus probable.
Make room for the upside.|Envisagez le meilleur.
BASE CASE|RÉFÉRENCE
projected revenue|chiffre d’affaires prévisionnel
YOUR IDEAS, TAKING SHAPE|VOS IDÉES PRENNENT FORME
A home for every idea worth exploring.|Un espace pour chaque idée à explorer.
Import plan|Importer un plan
All plans|Tous les plans
My plans|Mes plans
Find a business plan…|Rechercher un plan d’affaires…
Search plans|Rechercher des plans
No plans match your search.|Aucun plan ne correspond à votre recherche.
The next big thing.|Votre prochain grand projet.
Start with a blank canvas.|Partez d’une page blanche.
YOUR BUSINESS, ON ONE CANVAS|VOTRE ENTREPRISE SUR UN SEUL CANEVAS
Map the big picture. Click into any block and start writing.|Visualisez votre modèle. Cliquez dans une case pour commencer.
Export plan|Exporter le plan
Save version|Enregistrer une version
Business plan view|Vue du plan d’affaires
Canvas view|Vue canevas
Written plan|Plan rédigé
Two views of your business. Both saved in the same plan.|Deux vues de votre entreprise, enregistrées dans le même plan.
Business Model Canvas|Canevas du modèle d’affaires
Print / PDF|Imprimer / PDF
Expand canvas|Agrandir le canevas
Exit expanded view|Quitter la vue agrandie
Business Model Canvas. Scroll horizontally to see all nine blocks.|Canevas du modèle d’affaires. Faites défiler horizontalement pour voir les neuf cases.
Use short notes or bullet points. Every block autosaves. Scroll sideways on smaller screens.|Utilisez des notes courtes ou des listes. Chaque case est enregistrée automatiquement. Sur petit écran, faites défiler horizontalement.
Key partners|Partenaires clés
Who helps you make this happen?|Qui vous aide à concrétiser votre projet ?
Suppliers, collaborators, distributors, and strategic partners.|Fournisseurs, collaborateurs, distributeurs et partenaires stratégiques.
Key activities|Activités clés
What must your business do well?|Quelles activités devez-vous maîtriser ?
The essential things you do to deliver your offer.|Les activités essentielles pour proposer votre offre.
Key resources|Ressources clés
What do you need to operate?|De quoi avez-vous besoin pour fonctionner ?
People, expertise, equipment, technology, and other assets.|Équipe, savoir-faire, équipements, technologies et autres moyens.
Value propositions|Propositions de valeur
Why will customers choose you?|Pourquoi les clients vous choisiront-ils ?
The problem you solve, the benefit you offer, and what makes it different.|Le problème résolu, les bénéfices proposés et votre différence.
Customer relationships|Relations clients
How do you connect and keep customers?|Comment attirer et fidéliser vos clients ?
Personal service, community, ongoing support, or self-service.|Service personnalisé, communauté, accompagnement ou libre-service.
Channels|Canaux
How will you reach your customers?|Comment atteindrez-vous vos clients ?
Where people discover, buy, and receive your product or service.|Les points de découverte, d’achat et de livraison de votre offre.
Customer segments|Segments de clientèle
Who are you creating value for?|Pour qui créez-vous de la valeur ?
Your specific customer groups, their needs, and buying habits.|Vos groupes de clients, leurs besoins et leurs habitudes d’achat.
Cost structure|Structure des coûts
What does it cost to run the business?|Quels sont les coûts de fonctionnement ?
Your main fixed and variable costs: people, production, rent, tools, and marketing.|Vos principaux coûts fixes et variables : équipe, production, loyer, outils et marketing.
Revenue streams|Sources de revenus
How will the business earn money?|Comment l’entreprise générera-t-elle des revenus ?
What customers pay for, how you price it, and how often they buy.|Ce que les clients achètent, vos tarifs et leur fréquence d’achat.
BUILD SOMETHING YOU BELIEVE IN|DONNEZ VIE À UN PROJET QUI VOUS RESSEMBLE
Export|Exporter
YOUR BUSINESS PLAN|VOTRE PLAN D’AFFAIRES
Autosaved as you write|Enregistrement automatique
Next section|Section suivante
Executive summary|Résumé du projet
The big idea, in a few clear words.|L’essentiel de votre idée, en quelques mots.
Describe your business, who you help, and what makes your approach different.|Décrivez votre entreprise, vos clients et ce qui distingue votre approche.
Problem & solution|Problème et solution
Start with a problem worth solving.|Partez d’un problème qui mérite une solution.
What problem do your customers face? How does your business solve it?|Quel problème rencontrent vos clients ? Comment votre entreprise le résout-elle ?
Market & customers|Marché et clients
Know the people you’re building for.|Comprenez les personnes à qui vous vous adressez.
Describe your target customers, market size, competitors, and competitive advantage.|Décrivez vos clients cibles, la taille du marché, vos concurrents et votre avantage concurrentiel.
Business model|Modèle d’affaires
Turn value into a sustainable business.|Transformez votre valeur en une activité viable.
How will you make money? Explain your pricing, costs, and revenue streams.|Comment gagnerez-vous de l’argent ? Précisez vos tarifs, vos coûts et vos sources de revenus.
Go-to-market strategy|Stratégie commerciale
Find your first customers. Then your next.|Trouvez vos premiers clients, puis les suivants.
Describe your acquisition channels, positioning, launch plan, and retention strategy.|Décrivez vos canaux d’acquisition, votre positionnement, votre lancement et votre stratégie de fidélisation.
Operations & team|Organisation et équipe
The people and process behind the plan.|Les personnes et les processus qui font vivre votre projet.
Who does what? Outline responsibilities, suppliers, delivery, and key resources.|Qui fait quoi ? Précisez les responsabilités, les fournisseurs, la livraison et les ressources clés.
Milestones & risks|Étapes clés et risques
Make the next steps tangible.|Précisez les prochaines étapes.
Set your milestones, success measures, biggest risks, and contingency plans.|Définissez vos étapes clés, vos indicateurs de réussite, les principaux risques et vos solutions de repli.
Your ideas belong here. Start writing…|Vos idées ont leur place ici. Commencez à écrire…
LET THE NUMBERS TELL A STORY|DONNEZ DU SENS À VOS CHIFFRES
See how your assumptions shape the year ahead.|Découvrez comment vos hypothèses façonnent l’année à venir.
Export CSV|Exporter en CSV
The starting point|Le point de départ
Shared across your three scenarios.|Commun à vos trois scénarios.
Initial monthly revenue|Chiffre d’affaires mensuel initial
Monthly fixed costs|Charges fixes mensuelles
Variable costs (% of revenue)|Charges variables (% du CA)
Starting cash|Trésorerie initiale
Update forecast|Actualiser les prévisions
Month 1 is your first operating month. Fixed costs remain constant; revenue compounds monthly.|Le mois 1 correspond au premier mois d’activité. Les charges fixes restent constantes ; le chiffre d’affaires progresse chaque mois.
Annual revenue|Chiffre d’affaires annuel
12-month projection|Prévisions sur 12 mois
Operating profit|Résultat d’exploitation
Ending cash|Trésorerie finale
Cash stays positive|La trésorerie reste positive
Revenue, in perspective|Évolution du chiffre d’affaires
Monthly revenue projection for all three scenarios. The table below includes exact values.|Chiffre d’affaires mensuel prévu pour les trois scénarios. Le tableau ci-dessous présente les valeurs exactes.
Month|Mois
Revenue|Chiffre d’affaires
Total costs|Charges totales
Cash balance|Solde de trésorerie
Profit|Résultat
Costs|Charges
beyond month 12|au-delà du mois 12
Planning estimates before taxes, financing, depreciation, and capital expenditure. Adjust assumptions as you learn.|Estimations avant impôts, financement, amortissements et investissements. Affinez vos hypothèses au fil de vos découvertes.
PLAN FOR WHAT COULD BE|ANTICIPEZ LES POSSIBILITÉS
Three paths. One vision|Trois scénarios. Une vision
Explore the upside, prepare for challenges, and find your likely path.|Explorez le meilleur, préparez les difficultés et identifiez le scénario le plus probable.
Make the possibilities your own|Personnalisez vos scénarios
Each scenario starts with your base revenue, then applies its own demand and monthly growth.|Chaque scénario part de votre chiffre d’affaires de base, puis applique sa demande et sa croissance mensuelle.
Starting demand multiplier|Coefficient de demande initiale
Monthly revenue growth|Croissance mensuelle du CA
Month 1 revenue = base revenue × demand.|CA du mois 1 = CA de base × demande.
Growth starts in month 2.|La croissance commence au mois 2.
Your assumptions, your perspective.|Vos hypothèses, votre perspective.
Update scenarios|Actualiser les scénarios
A year of possibilities|Une année de possibilités
Explore the numbers|Explorer les chiffres
EVERY STEP IS PART OF THE STORY|CHAQUE ÉTAPE FAIT PARTIE DU PARCOURS
Your plan, over time|Votre plan au fil du temps
Keep the thinking behind every decision. Revisit any chapter.|Conservez le raisonnement derrière chaque décision. Revisitez chaque étape.
Save a version|Enregistrer une version
Working draft|Version de travail
Live|Actuelle
Continue editing|Continuer la rédaction
View snapshot|Voir la version
Restore|Restaurer
Every idea has a story.|Chaque idée a son histoire.
Save your first version to capture where you are today.|Enregistrez une première version pour garder une trace de votre avancée.
Save your first version|Enregistrer la première version
A PLACE TO BUILD TOGETHER|UN ESPACE POUR CONSTRUIRE ENSEMBLE
Your workspace|Votre espace
Simple tools. Thoughtful collaboration.|Des outils simples pour mieux collaborer.
Your identity|Votre profil
This name identifies your plans and saved versions. It is a local profile, not an account or access control.|Ce nom identifie vos plans et leurs versions. Il s’agit d’un profil local, sans compte utilisateur ni contrôle d’accès.
Your display name|Votre nom
Save profile|Enregistrer le profil
Storage & collaboration|Stockage et collaboration
Files connected|Fichiers connectés
Browser mode|Mode navigateur
Your plans are saved as readable JSON files in data/plans/. Every saved version is included in its plan’s file.|Vos plans sont enregistrés dans des fichiers JSON lisibles dans data/plans/. Chaque fichier contient aussi les versions du plan.
Your plans are saved in this browser. Export each plan to keep a portable backup or share it with your collaborator.|Vos plans sont enregistrés dans ce navigateur. Exportez-les pour conserver une sauvegarde ou les partager avec votre collaborateur.
Each person creates plans under their own name.|Chaque personne crée des plans sous son propre nom.
Run Forma locally to save directly into|Lancez Forma en local pour enregistrer directement dans
Commit and push your plan files to your private GitHub repository.|Enregistrez vos modifications avec Git, puis envoyez-les vers votre dépôt GitHub privé.
Your partner pulls the changes and refreshes Forma.|Votre collaborateur récupère les modifications et actualise Forma.
Git synchronizes files when you push and pull. Forma does not connect to GitHub automatically. Coordinate before editing the same plan.|Git synchronise les fichiers lors des opérations push et pull. Forma ne se connecte pas automatiquement à GitHub. Coordonnez-vous avant de modifier le même plan.
Import a plan|Importer un plan
Back up workspace|Sauvegarder l’espace
A small workspace, without the overhead.|Un espace simple, sans infrastructure lourde.
No hosted database is required. JSON keeps plans readable, portable, and easy to review in Git. The hosted preview stores data in your browser; the local app saves files directly. Keep the repository private if it contains confidential business information.|Aucune base de données hébergée n’est nécessaire. Le format JSON reste lisible, portable et facile à suivre dans Git. La version hébergée stocke les données dans votre navigateur ; l’application locale enregistre directement les fichiers. Gardez le dépôt privé s’il contient des informations confidentielles.
Add example plans|Ajouter des exemples
A fresh start for your next idea.|Un nouveau départ pour votre prochaine idée.
Create a business plan to explore its possibilities.|Créez un plan d’affaires pour explorer ses possibilités.
Create a business plan|Créer un plan d’affaires
Create business plan|Créer un plan d’affaires
YOUR WORKSPACE|VOTRE ESPACE
Room for your next big idea.|Une place pour votre prochaine grande idée.
Let’s give it a plan.|Donnons-lui un plan.
Big ideas start small.|Les grandes idées commencent petit.
A little clarity today.|Un peu de clarté aujourd’hui.
A stronger business tomorrow.|Une entreprise plus solide demain.
A little guidance|Quelques conseils
Active business plan|Plan d’affaires actif
A new idea, taking shape.|Une nouvelle idée prend forme.
Start with the essentials. You can figure out the rest as you go.|Commencez par l’essentiel. Affinez la suite au fil de votre progression.
Business name|Nom de l’entreprise
What are you building?|Quel est votre projet ?
A little about your idea|Quelques mots sur votre idée
Your big idea, in a sentence or two.|Votre idée en une ou deux phrases.
Industry|Secteur d’activité
Currency|Devise
MAD — Moroccan Dirham|MAD — Dirham marocain
USD — US Dollar|USD — Dollar américain
EUR — Euro|EUR — Euro
GBP — British Pound|GBP — Livre sterling
Lifestyle & retail|Art de vivre et commerce
Technology|Technologie
Food & beverage|Restauration et boissons
Consulting & services|Conseil et services
Health & wellness|Santé et bien-être
Education|Éducation
Other|Autre
Cancel|Annuler
Close dialog|Fermer la fenêtre
Capture this chapter.|Conservez cette étape.
Save a named snapshot of your plan and all three scenarios.|Enregistrez une version nommée de votre plan et des trois scénarios.
Version name|Nom de la version
e.g. First draft, refined pricing, ready to launch|Ex. : Première version, tarifs revus, prêt pour le lancement
Your working draft is autosaved. A version preserves this moment.|Votre brouillon s’enregistre automatiquement. Une version conserve cette étape précise.
This plan already has a home.|Ce plan existe déjà.
Back up current workspace|Sauvegarder l’espace actuel
Replace and import|Remplacer et importer
Financial snapshot|Situation financière enregistrée
Scenario|Scénario
Not written yet.|Pas encore rédigé.
Revisit an earlier chapter.|Revenez à une étape précédente.
as your working draft? We’ll first save your current draft as a safety snapshot, and keep your full version history.|comme version de travail ? Nous enregistrerons d’abord votre brouillon actuel par sécurité et conserverons tout l’historique.
Keep editing|Continuer la rédaction
Restore version|Restaurer la version
Plan details|Détails du plan
Description|Description
Status|Statut
Save changes|Enregistrer les modifications
A little guidance goes a long way.|Quelques conseils pour bien démarrer.
01 · Give your idea a home.|01 · Donnez une place à votre idée.
Create a plan, then work through seven practical sections. Your draft saves as you type.|Créez un plan et complétez les sept sections. Votre brouillon s’enregistre au fil de la rédaction.
02 · Explore three possibilities.|02 · Explorez trois scénarios.
Set starting revenue, costs, and cash. Adjust demand and growth for your pessimistic, realistic, and optimistic cases.|Définissez le chiffre d’affaires, les charges et la trésorerie de départ. Ajustez la demande et la croissance de chaque scénario.
03 · Keep the thinking.|03 · Gardez une trace de votre réflexion.
Save a named version at meaningful milestones. View any snapshot, or restore it while preserving your current draft.|Enregistrez une version nommée aux étapes importantes. Consultez-la ou restaurez-la tout en conservant votre brouillon actuel.
04 · Build together.|04 · Construisez ensemble.
Use separate names and plan files. With the local app, commit your JSON files to a private Git repository and pull your collaborator’s changes. In browser mode, export and import plans to exchange them.|Utilisez des noms et des fichiers distincts. Avec l’application locale, enregistrez les fichiers JSON dans un dépôt Git privé et récupérez les modifications de votre collaborateur. En mode navigateur, échangez les plans par export et import.
A fresh start. Your business plan is ready.|Votre nouveau plan d’affaires est prêt.
Version saved. A moment worth keeping.|Version enregistrée. Une étape à conserver.
Version restored. Your previous draft is safely saved.|Version restaurée. Votre brouillon précédent est conservé.
Forecast updated. A fresh perspective.|Prévisions actualisées.
All three scenarios updated.|Les trois scénarios sont actualisés.
Example plans are ready to explore.|Les exemples sont prêts à être explorés.
File save failed. Your browser copy is safe; export a backup.|L’enregistrement du fichier a échoué. La copie du navigateur est conservée ; exportez une sauvegarde.
Version limit reached. Export an archive before starting a new plan.|Limite de versions atteinte. Exportez une archive avant de créer un nouveau plan.
Version limit reached. Export a backup before restoring.|Limite de versions atteinte. Exportez une sauvegarde avant de restaurer.
Please select a file smaller than 8 MB.|Choisissez un fichier de moins de 8 Mo.
The file contains no plans.|Ce fichier ne contient aucun plan.
The backup contains duplicate plan IDs.|La sauvegarde contient des identifiants de plan en double.
Could not import this file.|Impossible d’importer ce fichier.
Could not read browser data. Import a backup to recover your plans.|Impossible de lire les données du navigateur. Importez une sauvegarde pour récupérer vos plans.
This file is not a valid Forma business plan.|Ce fichier n’est pas un plan d’affaires Forma valide.
A plan section is missing.|Une section du plan est manquante.
Invalid business model canvas.|Le canevas du modèle d’affaires est invalide.
Invalid financial assumptions.|Les hypothèses financières sont invalides.
Invalid scenario assumptions.|Les hypothèses des scénarios sont invalides.
Too many versions.|Le nombre de versions est trop élevé.
Invalid version history.|L’historique des versions est invalide.
at|à
complete|complété
Before restoring|Avant restauration de
`.trim().split('\n').map(line => { const i=line.indexOf('|'); return [line.slice(0,i),line.slice(i+1)]; }));

export function t(value) {
  const text=String(value??'');
  if(language==='en')return text;
  if(fr[text])return fr[text];
  const rules=[
    [/^(\d+) of 9 blocks started$/,(_,n)=>`${n} cases commencées sur 9`],
    [/^(\d+) words$/,(_,n)=>`${n} mot${n==='1'?'':'s'}`],
    [/^Month (\d+)$/,(_,n)=>`Mois ${n}`],
    [/^month (\d+)$/,(_,n)=>`mois ${n}`],
    [/^12 months · (.+)$/,(_,currency)=>`12 mois · ${currency}`],
    [/^(\d+) yours$/,(_,n)=>`${n} à vous`],
    [/^Updated (.+)$/,(_,d)=>`Mis à jour le ${d}`],
    [/^SECTION (\d+) OF 7$/,(_,n)=>`SECTION ${n} SUR 7`],
    [/^VERSION (\d+)$/,(_,n)=>`VERSION ${n}`],
    [/^Your (pessimistic|realistic|optimistic) forecast$/,(_,s)=>`Vos prévisions ${t(s[0].toUpperCase()+s.slice(1)).toLowerCase()}s`],
    [/^([\d.-]+)% operating margin$/,(_,n)=>`${n.replace('.',',')} % de marge d’exploitation`],
    [/^Cash runs out in month (\d+)$/,(_,n)=>`Trésorerie épuisée au mois ${n}`],
    [/^Operating break-even: (.+)$/,(_,n)=>`Seuil de rentabilité : ${t(n)}`],
    [/^Last edited (.+) at (.+) · (\d+)% complete$/,(_,d,h,n)=>`Dernière modification le ${d} à ${h} · ${n} % complété`],
    [/^(\d+)% complete$/,(_,n)=>`${n} % complété`],
    [/^(.+) at (\d{2}:\d{2})$/,(_,d,h)=>`${d} à ${h}`],
    [/^(\d+) plans? imported\.$/,(_,n)=>`${n} plan${n==='1'?'':'s'} importé${n==='1'?'':'s'}.`],
    [/^Options for (.+)$/,(_,name)=>`Options pour ${name}`],
    [/^Profile updated\. Welcome, (.+)\.$/,(_,name)=>`Profil enregistré. Bienvenue, ${name}.`],
    [/^Owned by (.+)\. All three scenarios are included\. Sample financial assumptions are editable\.$/,(_,name)=>`Propriétaire : ${name}. Les trois scénarios sont inclus. Les hypothèses financières d’exemple sont modifiables.`],
    [/^Importing will replace (\d+) existing plans? and their version history\. Export a backup first if you want to keep your current work\.$/,(_,n)=>`L’import remplacera ${n} plan${n==='1'?'':'s'} et leur historique. Exportez d’abord une sauvegarde pour conserver votre travail actuel.`]
  ];
  for(const [pattern,replace] of rules)if(pattern.test(text))return text.replace(pattern,replace);
  return text;
}

// Translate only interface nodes. User writing, names, and historical content stay intact.
const protectedContent='textarea,input,script,style,[data-user-content],.plan-title,.plan-description,.plan-owner,.avatar,.snapshot-text,.canvas-cell-print,.snapshot-canvas p,.version-info h3,.snapshot-meta,.modal.wide .modal-heading h2,.plan-select option';
export function translateUI(root) {
  root.querySelectorAll('option').forEach(el=>{if(!el.hasAttribute('value'))el.setAttribute('value',el.value);});
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
    const node=walker.currentNode;
    if(node.parentElement?.closest(protectedContent))continue;
    const raw=node.textContent, trimmed=raw.trim();
    if(trimmed)node.textContent=raw.replace(trimmed,t(trimmed));
  }
  root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el=>{
    if(el.matches('[data-user-content]')||el.matches('.modal.wide'))return;
    for(const key of ['placeholder','aria-label','title'])if(el.hasAttribute(key))el.setAttribute(key,t(el.getAttribute(key)));
  });
}
