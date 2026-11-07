// Pure definitions (safe to import from both server and client code).
// Every editable text/image in the public site is declared here with its default value.

export type FieldType = 'text' | 'textarea' | 'image';
export type FieldDef = { key: string; label: string; type: FieldType; value: string };
export type SectionDef = { title: string; fields: FieldDef[] };
export type PageDef = { slug: string; label: string; sections: SectionDef[] };

const t = (key: string, label: string, value: string): FieldDef => ({ key, label, type: 'text', value });
const ta = (key: string, label: string, value: string): FieldDef => ({ key, label, type: 'textarea', value });
const img = (key: string, label: string, value = ''): FieldDef => ({ key, label, type: 'image', value });

export const PAGES: PageDef[] = [
  {
    slug: 'site', label: 'Site (global)',
    sections: [
      { title: 'Contact & footer', fields: [
        t('site.phone', 'Phone', '+8801781288659'),
        t('site.email', 'Email', 'info@neverlandelc.com'),
        t('site.address', 'Address', '[STREET ADDRESS], Banani, Dhaka'),
        t('site.hours', 'Opening hours', 'Sun–Thu · 8:00 – 6:00'),
        t('site.footer', 'Footer line', 'Banani, Dhaka · Sun–Thu 8:00–6:00 · info@neverlandelc.com'),
      ]},
    ],
  },
  {
    slug: 'home', label: 'Home',
    sections: [
      { title: 'Hero', fields: [
        t('home.hero.eyebrow', 'Eyebrow', 'EARLY LEARNING CENTRE · LONG DAY CARE'),
        ta('home.hero.title', 'Title (new line = line break)', 'Every child\nspeaks a\nhundred\nlanguages.'),
        ta('home.hero.promise', 'Promise', '[ONE-LINE PROMISE] An EYLF (Australia) curriculum, delivered through play and a Reggio-inspired atelier, for children from 6 months to 5 years.'),
        img('home.hero.image', 'Hero photo'),
        img('home.hero.bg', 'Background image'),
      ]},
      { title: 'Info band', fields: [
        ta('home.info.items', 'Items (one per line)', 'Ages 6 months – 5 years\nSun–Thu · 8:00 – 6:00\nBanani, Dhaka\nEYLF (Australia) curriculum'),
      ]},
      { title: 'Why families choose us', fields: [
        t('home.values.eyebrow', 'Eyebrow', 'WHY FAMILIES CHOOSE US'),
        t('home.values.title', 'Title', 'Three things you can trust'),
        t('home.card1.title', 'Card 1 title', 'Guided by\nAustralia’s EYLF'),
        ta('home.card1.body', 'Card 1 text', 'Our main curriculum: Belonging, Being and Becoming shapes every day.'),
        t('home.card2.title', 'Card 2 title', 'A Reggio-inspired\natelier'),
        ta('home.card2.body', 'Card 2 text', 'Clay, paint, light and loose parts, with learning made visible.'),
        t('home.card3.title', 'Card 3 title', 'A safe, nut-free\ncentre'),
        ta('home.card3.body', 'Card 3 text', 'Clear child-protection and safety standards.'),
        img('home.values.bg', 'Background image'),
      ]},
      { title: 'Tour call to action', fields: [
        t('home.cta.title', 'Title', 'Come and see the atelier.'),
        ta('home.cta.body', 'Text', 'Tours are relaxed, personal and child-friendly.'),
        img('home.cta.bg', 'Background image'),
      ]},
    ],
  },
  {
    slug: 'about', label: 'About',
    sections: [
      { title: 'Hero', fields: [
        t('about.hero.eyebrow', 'Eyebrow', 'ABOUT NEVERLAND'),
        t('about.hero.title', 'Title', 'A place where childhood is never rushed.'),
        img('about.hero.bg', 'Background image'),
      ]},
      { title: 'Story', fields: [
        t('about.story.eyebrow', 'Eyebrow', 'WHAT NEVERLAND IS ALL ABOUT'),
        t('about.story.title', 'Title', 'Children are capable,\ncurious and full of ideas.'),
        ta('about.story.body', 'Text', 'Days at Neverland unfold through play, relationships and projects that follow each child’s interests, in rooms designed to be the third teacher. [CENTRE STORY – 2 short paragraphs]'),
        ta('about.values.items', 'Value chips (one per line)', 'Curiosity\nBelonging\nWonder\nRespect'),
      ]},
      { title: 'Founders', fields: [
        t('about.founders.eyebrow', 'Eyebrow', 'MEET THE FOUNDERS'),
        t('about.founders.title', 'Title', 'The people behind Neverland'),
        img('about.founders.bg', 'Background image'),
        t('about.founder1.name', 'Founder 1 name', '[FOUNDER NAME]'),
        t('about.founder1.role', 'Founder 1 role', '[Role]'),
        ta('about.founder1.story', 'Founder 1 story', '[Two-line story: why Neverland began.]'),
        img('about.founder1.photo', 'Founder 1 photo'),
        t('about.founder2.name', 'Founder 2 name', '[FOUNDER NAME]'),
        t('about.founder2.role', 'Founder 2 role', '[Role]'),
        ta('about.founder2.story', 'Founder 2 story', '[Two-line story: why Neverland began.]'),
        img('about.founder2.photo', 'Founder 2 photo'),
        t('about.founder3.name', 'Founder 3 name', '[FOUNDER NAME]'),
        t('about.founder3.role', 'Founder 3 role', '[Role]'),
        ta('about.founder3.story', 'Founder 3 story', '[Two-line story: why Neverland began.]'),
        img('about.founder3.photo', 'Founder 3 photo'),
      ]},
      { title: 'Curriculum banner', fields: [
        t('about.banner.eyebrow', 'Eyebrow', 'OUR MAIN CURRICULUM'),
        t('about.banner.title', 'Title', 'EYLF (Australia) is our main\ncurriculum'),
        ta('about.banner.body', 'Text', 'We follow Australia’s Early Years Learning Framework, Belonging, Being and Becoming, and bring it to life through the Reggio Emilia belief in the hundred languages of children.'),
        img('about.banner.bg', 'Background image'),
      ]},
    ],
  },
  {
    slug: 'curriculum', label: 'Curriculum',
    sections: [
      { title: 'Hero', fields: [
        t('curriculum.hero.eyebrow', 'Eyebrow', 'CURRICULUM & PROGRAMS'),
        t('curriculum.hero.title', 'Title', 'Learning that begins with play.'),
        img('curriculum.hero.bg', 'Background image'),
      ]},
      { title: 'Framework', fields: [
        t('curriculum.framework.eyebrow', 'Eyebrow', 'OUR MAIN CURRICULUM'),
        t('curriculum.framework.title', 'Title', 'Early Years Learning Framework (Australia)'),
        ta('curriculum.framework.body', 'Text', 'Belonging, Being and Becoming guides everything we plan: five principles, eight practices and five learning outcomes, delivered through play and a Reggio-inspired atelier.'),
        t('curriculum.principles.title', 'Principles card title', '5 Principles'),
        ta('curriculum.principles.body', 'Principles card text', 'Secure, respectful and reciprocal relationships · Partnerships · High expectations and equity · Respect for diversity · Ongoing learning and reflective practice'),
        t('curriculum.practices.title', 'Practices card title', '8 Practices'),
        ta('curriculum.practices.body', 'Practices card text', 'Holistic approaches · Responsiveness to children · Learning through play · Intentional teaching · Learning environments · Cultural competence · Continuity of learning and transitions · Assessment for learning'),
      ]},
      { title: 'Learning cycle & play', fields: [
        t('curriculum.cycle.eyebrow', 'Cycle eyebrow', 'HOW EYLF LIVES HERE'),
        t('curriculum.cycle.title', 'Cycle title', 'The learning cycle'),
        ta('curriculum.cycle.body', 'Cycle text', 'Observe · Analyse · Plan · Implement · Reflect. Educators document each cycle as visible learning for children and families.'),
        t('curriculum.play.eyebrow', 'Play eyebrow', 'PLAY-BASED LEARNING'),
        t('curriculum.play.title', 'Play title', 'A hundred languages'),
        ta('curriculum.play.tags', 'Tags (comma separated)', 'Drawing, Clay, Movement, Music, Light & shadow, Loose parts'),
      ]},
      { title: 'Learning outcomes', fields: [
        t('curriculum.outcomes.eyebrow', 'Eyebrow', 'FIVE EYLF LEARNING OUTCOMES'),
        ta('curriculum.outcomes.items', 'Outcomes (one per line)', 'A strong sense of identity\nConnected with and contributing to their world\nA strong sense of wellbeing\nConfident and involved learners\nEffective communicators'),
        img('curriculum.outcomes.bg', 'Background image'),
      ]},
      { title: 'Rooms', fields: [
        t('curriculum.rooms.eyebrow', 'Eyebrow', 'OUR ROOMS'),
        t('curriculum.rooms.title', 'Title', 'Find your child’s room'),
        t('curriculum.room1.name', 'Room 1 name', 'Nursery'),
        t('curriculum.room1.age', 'Room 1 age', '6 months – 2 years'),
        ta('curriculum.room1.desc', 'Room 1 text', '[One line on rhythms, sensory play and care.]'),
        t('curriculum.room2.name', 'Room 2 name', 'Toddlers'),
        t('curriculum.room2.age', 'Room 2 age', '2 – 3 years'),
        ta('curriculum.room2.desc', 'Room 2 text', '[One line on exploring, language and movement.]'),
        t('curriculum.room3.name', 'Room 3 name', 'Preschool'),
        t('curriculum.room3.age', 'Room 3 age', '3 – 5 years'),
        ta('curriculum.room3.desc', 'Room 3 text', '[One line on projects, atelier and school readiness.]'),
      ]},
    ],
  },
  {
    slug: 'enrolment', label: 'Enrolment',
    sections: [
      { title: 'Hero', fields: [
        t('enrolment.hero.eyebrow', 'Eyebrow', 'ENROLMENT & FEES'),
        t('enrolment.hero.title', 'Title', 'Begin your Neverland journey.'),
        img('enrolment.hero.bg', 'Background image'),
      ]},
      { title: 'Steps & documents', fields: [
        t('enrolment.steps.eyebrow', 'Steps eyebrow', 'ENROLMENT STEPS'),
        ta('enrolment.steps.items', 'Steps (one per line)', 'Book a tour\nJoin the waitlist\nReceive your offer\nComplete enrolment and orientation'),
        t('enrolment.docs.eyebrow', 'Documents eyebrow', 'DOCUMENTS REQUIRED'),
        ta('enrolment.docs.items', 'Documents (one per line)', 'Child’s birth certificate\nImmunisation record\nParent or guardian ID\nEmergency contacts and authorised pick-ups\nMedical and allergy information'),
        t('enrolment.form.title', 'Form title', 'Book a tour or join the waitlist'),
      ]},
      { title: 'Fees & subsidies', fields: [
        t('enrolment.fees.eyebrow', 'Eyebrow', 'FEES & SUBSIDIES'),
        t('enrolment.fees.nursery', 'Nursery fee', '[BDT — / month]'),
        t('enrolment.fees.toddlers', 'Toddlers fee', '[BDT — / month]'),
        t('enrolment.fees.preschool', 'Preschool fee', '[BDT — / month]'),
        ta('enrolment.fees.note', 'Subsidies & payment note', '[Subsidies, sibling discounts and payment terms]'),
        img('enrolment.fees.bg', 'Background image'),
      ]},
    ],
  },
  {
    slug: 'contact', label: 'Contact',
    sections: [
      { title: 'Hero', fields: [
        t('contact.hero.eyebrow', 'Eyebrow', 'CONTACT'),
        t('contact.hero.title', 'Title', 'Come and say hello.'),
        img('contact.hero.bg', 'Background image'),
      ]},
      { title: 'Visit & form', fields: [
        t('contact.visit.eyebrow', 'Eyebrow', 'VISIT US'),
        t('contact.map.label', 'Map placeholder label', '[MAP – Banani, Dhaka]'),
        t('contact.form.title', 'Form title', 'Send an enquiry'),
      ]},
    ],
  },
  {
    slug: 'privacy', label: 'Privacy',
    sections: [
      { title: 'Privacy policy', fields: [
        t('privacy.title', 'Title', 'Privacy Policy'),
        ta('privacy.notice', 'Notice', 'Draft — requires Neverland review before public launch.'),
        ta('privacy.body', 'Body (one paragraph per line)', 'We collect name, email, phone and message for enquiries. Tour and waitlist requests also collect a child\'s date of birth and preferred date.\nSubmissions are emailed to Neverland\'s central inbox; no separate website submission database is maintained. Email providers process submissions and acknowledgements. We use spam checks and rate limits.\nGoogle Analytics loads only with your consent. Retention periods for enquiry, tour and waitlist emails are pending approval.\nContact: info@neverlandelc.com'),
      ]},
    ],
  },
];

export const FIELD_TYPES: Record<string, FieldType> = {};
export const DEFAULTS: Record<string, string> = {};
for (const page of PAGES) for (const section of page.sections) for (const f of section.fields) {
  FIELD_TYPES[f.key] = f.type;
  DEFAULTS[f.key] = f.value;
}
