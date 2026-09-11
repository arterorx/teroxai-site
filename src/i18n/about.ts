import type { Locale } from './config';

export interface AboutCopy {
  title: string;
  description: string;
  h1: string;
  lede: string;
  sections: { h2: string; paras: string[] }[];
  contactH2: string;
  contactText: string;
}

export const aboutCopy: Record<Locale, AboutCopy> = {
  en: {
    title: 'About Armen Ter-Oganezov',
    description: 'Indie developer in Germany. Self-taught since 2021, apps on the App Store since 2024, built solo with AI agents. Open to projects.',
    h1: 'About me',
    lede: 'I am Armen. I live in Germany and make apps for Mac and iPhone on my own.',
    sections: [
      {
        h2: 'How I got here',
        paras: [
          'I started learning to code around 2021 with no plan beyond curiosity. For a while it was small tools and experiments that never left my laptop.',
          'In 2024 the first apps reached the App Store: a sleep timer for the Mac in May, then AI tools for making pictures, videos and music. In 2026 came more utilities: a cut list optimizer for woodworkers, a home inventory app, an envelope budget.',
        ],
      },
      {
        h2: 'How I work',
        paras: [
          'Most of the work now runs through AI agents. One session acts as the planning desk: it reads the numbers from App Store Connect, decides what to build and writes the brief. Other sessions write the code, one app per folder. I sit in between, decide what ships, and check the result with my own eyes before it goes out.',
          'The utilities are built the same way on purpose: a native app, one purchase, no account, no server. If the app does not need the internet, it does not use it.',
        ],
      },
      {
        h2: 'What I am open to',
        paras: [
          'Projects and partnerships of any kind: building an app for Mac or iPhone, helping a team put AI agents to work in their development, or something neither of us has named yet. Write and tell me what you have in mind.',
        ],
      },
    ],
    contactH2: 'Contact',
    contactText: 'Email is best.',
  },
  de: {
    title: 'Über Armen Ter-Oganezov',
    description: 'Indie-Entwickler in Deutschland. Seit 2021 selbst beigebracht, seit 2024 Apps im App Store, allein gebaut mit KI-Agenten. Offen für Projekte.',
    h1: 'Über mich',
    lede: 'Ich bin Armen. Ich lebe in Deutschland und mache Apps für Mac und iPhone, allein.',
    sections: [
      {
        h2: 'Wie es dazu kam',
        paras: [
          'Um 2021 habe ich angefangen, mir das Programmieren beizubringen, aus Neugier, ohne Plan. Eine Weile waren es kleine Werkzeuge und Experimente, die meinen Laptop nie verlassen haben.',
          '2024 kamen die ersten Apps in den App Store: im Mai ein Sleep Timer für den Mac, danach KI-Werkzeuge für Bilder, Videos und Musik. 2026 folgten weitere Utilities: ein Zuschnittoptimierer für Holzwerker, ein Hausinventar, ein Umschlag-Budget.',
        ],
      },
      {
        h2: 'Wie ich arbeite',
        paras: [
          'Der größte Teil der Arbeit läuft heute über KI-Agenten. Eine Sitzung ist die Planungsstelle: Sie liest die Zahlen aus App Store Connect, entscheidet, was gebaut wird, und schreibt den Auftrag. Andere Sitzungen schreiben den Code, eine App pro Ordner. Ich sitze dazwischen, entscheide, was rausgeht, und prüfe das Ergebnis mit eigenen Augen, bevor es live geht.',
          'Die Utilities sind mit Absicht alle gleich gebaut: native App, ein Kauf, kein Konto, kein Server. Wenn die App kein Internet braucht, benutzt sie keins.',
        ],
      },
      {
        h2: 'Wofür ich offen bin',
        paras: [
          'Projekte und Partnerschaften jeder Art: eine App für Mac oder iPhone bauen, einem Team helfen, KI-Agenten in der Entwicklung einzusetzen, oder etwas, das noch keinen Namen hat. Schreib mir, was du vorhast.',
        ],
      },
    ],
    contactH2: 'Kontakt',
    contactText: 'Am besten per E-Mail.',
  },
};
