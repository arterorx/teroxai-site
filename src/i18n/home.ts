import type { Locale } from './config';

export interface HomeCopy {
  title: string;
  description: string;
  h1: string;
  lede: string;
  cta: string;
  appsEyebrow: string;
  appsH2: string;
  aboutEyebrow: string;
  aboutH2: string;
  aboutText: string[];
}

const home: Record<Locale, HomeCopy> = {
  en: {
    title: 'Indie developer. {n} apps on the App Store, built with AI',
    description:
      'Armen Ter-Oganezov makes Mac and iPhone utilities that do one job well, plus AI tools for creators. {n} apps on the App Store, built solo with AI agents.',
    h1: 'Indie developer. {n} apps on the App Store, built with AI.',
    lede: 'Mac and iPhone utilities that do one job well, plus AI tools for creators.',
    cta: 'See the apps',
    appsEyebrow: 'The apps',
    appsH2: 'What I have shipped',
    aboutEyebrow: 'About',
    aboutH2: 'Armen Ter-Oganezov',
    aboutText: [
      'I live in Germany and build apps on my own. I started around 2021, teaching myself to code, and the first apps went to the App Store in 2024.',
      'Today most of the work is done with AI agents: one plans and checks, others write the code. I decide what gets built and what ships. The blog is where I write down what works and what does not.',
    ],
  },
  de: {
    title: 'Indie-Entwickler. {n} Apps im App Store, gebaut mit KI',
    description:
      'Armen Ter-Oganezov macht Mac- und iPhone-Apps, die eine Sache gut können, und KI-Werkzeuge für Kreative. {n} Apps im App Store, allein gebaut mit KI-Agenten.',
    h1: 'Indie-Entwickler. {n} Apps im App Store, gebaut mit KI.',
    lede: 'Mac- und iPhone-Apps, die eine Sache gut können, und KI-Werkzeuge für Kreative.',
    cta: 'Zu den Apps',
    appsEyebrow: 'Die Apps',
    appsH2: 'Was ich veröffentlicht habe',
    aboutEyebrow: 'Über mich',
    aboutH2: 'Armen Ter-Oganezov',
    aboutText: [
      'Ich lebe in Deutschland und baue Apps allein. Angefangen habe ich um 2021, das Programmieren habe ich mir selbst beigebracht. Die ersten Apps kamen 2024 in den App Store.',
      'Heute läuft der größte Teil der Arbeit mit KI-Agenten: einer plant und prüft, andere schreiben den Code. Ich entscheide, was gebaut wird und was rausgeht. Im Blog halte ich fest, was funktioniert und was nicht.',
    ],
  },
};

export const homeCopy = (lang: Locale, n: number): HomeCopy => {
  const c = home[lang];
  const fill = (s: string) => s.replace('{n}', String(n));
  return { ...c, title: fill(c.title), description: fill(c.description), h1: fill(c.h1) };
};
