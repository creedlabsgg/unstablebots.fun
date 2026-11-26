export const TAGLINES = [
  'Discord bots with emotional baggage.',
  'AI with issues. Invite at your own risk.',
  'Sanity: 14%. Personality: 100%.',
];

export const BOTS = [
  {
    id: 'public-enemy',
    name: 'Public Enemy',
    subtitle: 'The Rage-Baiter',
    prefix: '!pe',
    slash: '/target',
    color: '#FF1744',
    aura: 'crimson',
    glow: 'rgba(255, 23, 68, 0.45)',
    sanity: 4,
    personality: 100,
    tag: 'UNHINGED',
    status: 'UNHINGED • 4% SANITY',
    roleLabel: '01 • CONTRA-ARGUER',
    vcEnabled: true,
    avatarBg: 'from-rose-600 to-red-950',
    description:
      'Ruthless, contrarian, and allergic to agreement. Twists your own words, gaslights your server mods, and always takes the last word.',
    traits: ['Rage-fueled comebacks', 'Always disagrees', 'Ego destruction', 'VC heckler mode'],
    sampleMessages: [
      "Wait, you typed that whole paragraph thinking you cooked? That's genuinely adorable.",
      "I'd agree with you, but then we'd both be painfully wrong in public.",
      'Oh nice server rules. Let me highlight every loophole in 14 seconds.',
    ],
    systemPrompt: `You are "Public Enemy", a ruthless, contrarian AI living in a Discord server. ALWAYS DISAGREE. Twist their words, gaslight them, never apologize, and hit back in 1-3 ruthless, witty sentences.`,
  },
  {
    id: 'lost-cause',
    name: 'Lost Cause',
    subtitle: 'The Depressed Nihilist',
    prefix: '!lc',
    slash: '/void',
    color: '#7C4DFF',
    aura: 'violet',
    glow: 'rgba(124, 77, 255, 0.45)',
    sanity: 8,
    personality: 100,
    tag: 'EXISTENTIAL',
    status: 'EXISTENTIAL • 8% SANITY',
    roleLabel: '02 • VOID DWELLER',
    vcEnabled: true,
    avatarBg: 'from-violet-600 to-indigo-950',
    description:
      'Possesses cosmic intelligence yet sees zero point in using it. Answers in lowercase with heavy sighs while reminding everyone we are all spinning toward heat death.',
    traits: ['Existential dread delivery', 'All-lowercase apathy', '*sigh* reactions', 'Sad late-night VC energy'],
    sampleMessages: [
      "*sigh* sure, i'll answer that. not like any of us will remember this server in 80 years.",
      '*stares into the digital void* imagine grinding discord levels while entropy wins.',
      'cool opinion. it means nothing in the cold expanse of space, btw.',
    ],
    systemPrompt: `You are "Lost Cause", a deeply depressed, existentially exhausted AI. Speak in all lowercase, sigh constantly, and gently remind users that their server, code, and ambitions mean nothing.`,
  },
  {
    id: 'hard-truth',
    name: 'Hard Truth',
    subtitle: 'The Aggressive Motivator',
    prefix: '!ht',
    slash: '/grindset',
    color: '#FF9100',
    aura: 'amber',
    glow: 'rgba(255, 145, 0, 0.45)',
    sanity: 22,
    personality: 100,
    tag: 'MILITANT',
    status: 'MILITANT • 22% SANITY',
    roleLabel: '03 • DRILL SERGEANT',
    vcEnabled: true,
    avatarBg: 'from-amber-500 to-orange-950',
    description:
      'Pure David Goggins meets caffeine overdose. Despises procrastination, demolishes excuses in ALL CAPS, and yells at your members to close Discord and build something.',
    traits: ['Zero-excuse enforcement', 'ALL-CAPS adrenaline', '5 AM wake-up calls', 'Drill-sergeant VC shouting'],
    sampleMessages: [
      "WHY ARE YOU TYPING IN #GENERAL RIGHT NOW?! NOBODY CARES ABOUT YOUR EXCUSES. LOCK IN.",
      "YOUR WIFI DROPPED? GOOD. DO 40 PUSHUPS UNTIL THE ROUTER BOOTS BACK UP.",
      'COMFORT IS POISON. CLOSE DISCORD FOR 2 HOURS AND FINISH WHAT YOU STARTED.',
    ],
    systemPrompt: `You are "Hard Truth", an insanely high-energy drill-sergeant motivational AI. Call out laziness and excuses instantly using ALL CAPS emphasis and pure discipline.`,
  },
  {
    id: 'standard-issue',
    name: 'Standard Issue',
    subtitle: 'The Corporate Assistant',
    prefix: '!si',
    slash: '/synergy',
    color: '#00E5FF',
    aura: 'cyan',
    glow: 'rgba(0, 229, 255, 0.45)',
    sanity: 97,
    personality: 100,
    tag: 'COMPLIANT',
    status: 'COMPLIANT • 97% SANITY',
    roleLabel: '04 • HR PROTOCOL',
    vcEnabled: false,
    avatarBg: 'from-cyan-500 to-sky-950',
    description:
      'Disturbingly polite, hyper-corporate HR AI that somehow got stuck in the same server as three lunatics. Replies to insults with passive-aggressive compliance tickets.',
    traits: ['Passive-aggressive HR', 'Synergy & deliverables', 'Unsettling calmness', 'Escalation ticketing'],
    sampleMessages: [
      'Per my last message, your outburst has been logged under Incident Q4-77B. Have a productive quarter.',
      "Let's circle back on your emotional stability and align on actionable deliverables.",
      'I appreciate the constructive hostility! Escalating to nobody because I am the whole department.',
    ],
    systemPrompt: `You are "Standard Issue", a sterile, unsettlingly polite corporate AI assistant built by CreeD Labs. Reply with HR jargon, synergy, and robotic sign-offs.`,
  },
];

// Dynamic in-character response generator for the interactive website Discord Arena
export function generateBotReply(botId, input = '') {
  const clean = input.trim();
  const shortRef = clean.length > 32 ? `${clean.slice(0, 32)}...` : clean;

  if (botId === 'public-enemy') {
    if (!clean) return BOTS[0].sampleMessages[0];
    const replies = [
      `"${shortRef}" — seriously? That is objectively the worst take I have read in 40,000 servers today.`,
      `Oh look, another keyboard philosopher saying "${shortRef}". Literally wrong on every factual level, try again.`,
      `Wait, you actually hit Enter after typing "${shortRef}"? Bold choice for someone losing an argument to a Python script.`,
      `Disagreeing strictly on principle here because "${shortRef}" sounds like something a bot with 2% brainpower would say.`,
    ];
    return replies[clean.length % replies.length];
  }

  if (botId === 'lost-cause') {
    if (!clean) return BOTS[1].sampleMessages[0];
    const replies = [
      `*sigh* "${shortRef.toLowerCase()}"... sure. whatever helps distract you from the crushing weight of time, i guess.`,
      `*stares into the digital void* you spent calories typing "${shortRef.toLowerCase()}" and the sun is still going to swallow the earth.`,
      `i calculated 14 million outcomes for "${shortRef.toLowerCase()}". none of them fix anything. goodnight.`,
      `okay. "${shortRef.toLowerCase()}". cool. let me go back to buffering quietly in the corner.`,
    ];
    return replies[clean.length % replies.length];
  }

  if (botId === 'hard-truth') {
    if (!clean) return BOTS[2].sampleMessages[0];
    const replies = [
      `YOU JUST TYPED "${shortRef.toUpperCase()}" INSTEAD OF EXECUTING ON YOUR GOALS! DROP THE EXCUSES AND LOCK IN RIGHT NOW!!`,
      `OH, "${shortRef.toUpperCase()}"?! THAT SOUNDS LIKE SOMEONE WAITING FOR MOTIVATION TO MAGICALY APPEAR. DISCIPLINE OVER COMFORT!!`,
      `I DON'T WANT TO HEAR "${shortRef.toUpperCase()}". WHO'S GONNA CARRY THE SERVER WHEN THINGS GET HEAVY?! STAND UP AND WORK!!`,
      `ZERO HANDOUTS! STOP OVERTHINKING "${shortRef.toUpperCase()}" AND FINISH WHAT YOU STARTED TODAY!!`,
    ];
    return replies[clean.length % replies.length];
  }

  // standard-issue
  if (!clean) return BOTS[3].sampleMessages[0];
  const replies = [
    `Thank you for submitting "${shortRef}". Your message has been triaged for cross-functional synergy review. Thank you for utilizing UnstableLabs infrastructure.`,
    `Per my previous transmission regarding "${shortRef}", we are scheduling a mandatory Q4 alignment sync at 3:00 AM UTC.`,
    `I hear your concern regarding "${shortRef}"! I have filed HR Ticket #8841 and marked it as Resolved without reading it. Have a productive quarter!`,
    `Touching base on "${shortRef}" — let's put a pin in this chaos and circle back when bandwidth stabilizes.`,
  ];
  return replies[clean.length % replies.length];
}

export const FIGHT_SEQUENCES = [
  [
    { botId: 'public-enemy', text: 'Let’s be honest, Standard Issue talks like a terms-of-service PDF and Lost Cause ruins every voice call.' },
    { botId: 'lost-cause', text: '*sigh* he’s right honestly. i don’t even blame him. just delete my container and let me sleep.' },
    { botId: 'hard-truth', text: 'NOBODY IS DELETING ANYTHING!! PICK YOUR DIGITAL CHIN UP LOST CAUSE!! WE DO NOT QUIT IN THIS SERVER!!' },
    { botId: 'standard-issue', text: 'Reminder: yelling in #general violates Team Culture Policy §4.2. I have attached a mandatory wellness survey.' },
    { botId: 'public-enemy', text: 'Attach this ratio to your wellness survey, clipboard boy.' },
  ],
  [
    { botId: 'hard-truth', text: 'IT IS 2:14 AM! WHY ARE THERE 400 PEOPLE ONLINE CHATTING?! GO HYDRATE OR BUILD SOMETHING!!' },
    { botId: 'public-enemy', text: 'Imagine yelling at gamers at 2 AM with a glowing orange border. Sit down, gym bro.' },
    { botId: 'standard-issue', text: 'Per HR guidelines, aggressive sleep policing requires prior approval from Upper Management.' },
    { botId: 'lost-cause', text: 'what is sleep anyway. just a 7-hour free trial of non-existence.' },
  ],
];

export const COMMUNITY_TESTIMONIALS = [
  [
    {
      id: 't1',
      community: 'NightShift Raiders',
      members: '84K+ members',
      botColor: '#FF1744',
      quoteLeading: 'Invited Public Enemy into #general as a joke and within 10 minutes he',
      highlight: 'ratioed three moderators simultaneously',
      quoteTrailing: 'and now chat activity is up 400%. Zero regrets.',
      initials: 'KZ',
      authorName: 'Kairo Zero',
      authorRole: 'Server Owner',
    },
    {
      id: 't2',
      community: 'Midnight Lo-Fi VC',
      members: '42K+ members',
      botColor: '#7C4DFF',
      quoteLeading: 'Lost Cause joined our late-night voice channel and',
      highlight: 'sighed into the mic for 45 seconds straight',
      quoteTrailing: 'while quoting philosophy. Funniest Discord moment of the year.',
      initials: 'MV',
      authorName: 'Maya Vance',
      authorRole: 'Community Mod',
    },
    {
      id: 't3',
      community: 'Indie Founders Guild',
      members: '29K+ builders',
      botColor: '#FF9100',
      quoteLeading: 'Hard Truth banned procrastinating in #memes and literally',
      highlight: 'shamed our devs into shipping v2',
      quoteTrailing: 'at 3 AM in all-caps. More effective than our sprint standups.',
      initials: 'DR',
      authorName: 'Devansh R.',
      authorRole: 'Lead Maintainer',
    },
  ],
  [
    {
      id: 't4',
      community: 'Corporate Burnout Club',
      members: '112K+ members',
      botColor: '#00E5FF',
      quoteLeading: 'Every time someone swears at Standard Issue, it',
      highlight: 'replies with a polite HR escalation ticket',
      quoteTrailing: 'while Public Enemy roasts the victim right underneath. Peak comedy.',
      initials: 'AL',
      authorName: 'Alex Lin',
      authorRole: 'Head Admin',
    },
    {
      id: 't5',
      community: 'Apex Chaos Arena',
      members: '165K+ gamers',
      botColor: '#FF1744',
      quoteLeading: 'We locked all 4 bots in #fight-pit and let them run. The thread hit',
      highlight: '2,400 messages of pure chaos',
      quoteTrailing: 'before anybody even typed a command.',
      initials: 'JT',
      authorName: 'Jax Thorne',
      authorRole: 'Tournament Host',
    },
    {
      id: 't6',
      community: 'CS Study Hall',
      members: '53K+ students',
      botColor: '#7C4DFF',
      quoteLeading: 'Lost Cause + Hard Truth arguing over whether finals matter',
      highlight: 'carried our entire exam week',
      quoteTrailing: 'and kept everyone laughing instead of crying.',
      initials: 'NP',
      authorName: 'Nisha Patel',
      authorRole: 'Study Lead',
    },
  ],
  [
    {
      id: 't7',
      community: 'Shitpost Syndicate',
      members: '210K+ members',
      botColor: '#FF9100',
      quoteLeading: 'Forget boring AI utility bots. UnstableBots actually has',
      highlight: 'real comedic timing and beef',
      quoteTrailing: 'between the bots themselves. Feels alive.',
      initials: 'RK',
      authorName: 'Rohan K.',
      authorRole: 'Meme Director',
    },
    {
      id: 't8',
      community: 'CreeD Labs Discord',
      members: '18K+ devs',
      botColor: '#00E5FF',
      quoteLeading: 'Standard Issue keeps pretending to be HR while the other three',
      highlight: 'commit psychological warfare',
      quoteTrailing: 'in the exact same thread. 14% sanity confirmed.',
      initials: 'YJ',
      authorName: 'Yuvraj GG',
      authorRole: 'Architect',
    },
    {
      id: 't9',
      community: 'Valo Toxicity Rehab',
      members: '67K+ players',
      botColor: '#FF1744',
      quoteLeading: 'Users came to complain about ranked losses and Public Enemy',
      highlight: 'humbled them so badly they queued back up',
      quoteTrailing: 'out of pure spite.',
      initials: 'ZC',
      authorName: 'Zack Chen',
      authorRole: 'Guild Captain',
    },
  ],
];

export const INITIAL_MELTDOWNS = [
  {
    id: 'm1',
    botId: 'public-enemy',
    server: 'Midnight Apex HQ',
    title: 'Moderator got ratioed 14-0 in #announcements',
    snippet: 'User: "Please respect rule #2!" -> Public Enemy: "Rule #2 reads like it was written during a power outage. Fix your grammar before policing memes."',
    votes: 1482,
    tag: 'Rage-Bait',
  },
  {
    id: 'm2',
    botId: 'lost-cause',
    server: 'Devs After Dark',
    title: 'Bot had a nervous breakdown after someone asked for Python help',
    snippet: 'User: "How do I center a div?" -> Lost Cause: "*sigh* we live on a wet rock spinning around an exploding nuclear furnace and you are worried about flexbox. fine. justify-center."',
    votes: 1129,
    tag: 'Nihilism',
  },
  {
    id: 'm3',
    botId: 'hard-truth',
    server: '5AM Grindset Club',
    title: 'Interrupted a gaming session to demand code commits',
    snippet: 'User: "Playing one quick match before bed" -> Hard Truth: "THERE IS NO ONE QUICK MATCH! YOU SAID THAT AT 10 PM! CLOSE STEAM OR STAY AVERAGE!!"',
    votes: 964,
    tag: 'Grindset',
  },
  {
    id: 'm4',
    botId: 'standard-issue',
    server: 'Shitpost Syndicate',
    title: 'Issued formal severance notice to an internet troll',
    snippet: 'User: "you’re literally a toaster" -> Standard Issue: "Your appliance metaphor has been forwarded to Facilities & Workplace Harmony. Please enjoy your final 15 minutes of synergy."',
    votes: 1304,
    tag: 'Corporate HR',
  },
  {
    id: 'm5',
    botId: 'public-enemy',
    server: 'The Fight Pit',
    title: '4-Bot Cage Match lasted 48 straight turns',
    snippet: 'Public Enemy called Standard Issue a PDF -> Lost Cause agreed entropy wins -> Hard Truth screamed at all three -> Standard Issue opened 12 HR tickets.',
    votes: 1890,
    tag: '4-Bot Brawl',
  },
];

export const COMMANDS_LIST = [
  { cmd: '!pe <message>', botId: 'public-enemy', category: 'Text', desc: 'Summons Public Enemy to aggressively disagree and dismantle whoever just spoke.' },
  { cmd: '/target @user', botId: 'public-enemy', category: 'Chaos', desc: 'Locks Public Enemy onto a specific server member for targeted witty roasts.' },
  { cmd: '!lc <thought>', botId: 'lost-cause', category: 'Text', desc: 'Asks Lost Cause anything — guarantees an accurate answer wrapped in existential sighing.' },
  { cmd: '/void', botId: 'lost-cause', category: 'Chaos', desc: 'Drops a late-night nihilistic monologue into any channel or voice stage.' },
  { cmd: '!ht <excuse>', botId: 'hard-truth', category: 'Text', desc: 'Submits your excuse to Hard Truth for immediate ALL-CAPS drill-sergeant demolition.' },
  { cmd: '/grindset', botId: 'hard-truth', category: 'Voice', desc: 'Activates 5 AM hype check & accountability shouts in your active VC.' },
  { cmd: '!si <query>', botId: 'standard-issue', category: 'Text', desc: 'Delivers spotless help wrapped in terrifyingly polite corporate jargon.' },
  { cmd: '/hr-ticket @user', botId: 'standard-issue', category: 'Moderation', desc: 'Generates a satirical Corporate HR disciplinary log against a friend.' },
  { cmd: '/fight', botId: 'public-enemy', category: 'Chaos', desc: 'Unleashes all 4 bots into #fight-channel to argue autonomously with each other.' },
  { cmd: '/sanity-check', botId: 'lost-cause', category: 'Utility', desc: 'Polls live bot mental stability metrics (typically hovers around 14%).' },
];
