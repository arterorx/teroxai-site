---
title: 'Ein Abend Website: was sie einer kleinen Mac-App gebracht hat'
description: 'Eine Site in vier Sprachen an einem Abend. Acht Wochen später: jeder sechste Download kommt aus dem Web, jede fünfte Google-Impression ist eine KI-Antwort.'
date: 2026-09-26
lang: de
translationOf: app-website-downloads-case-study
cover: app-site
---

Zwei Jahre lang hatte [Sleep Timer](/de/apps/sleep-timer/) keine Website. Die App lebte im Mac App Store, Leute fanden sie über die Store-Suche oder gar nicht, und ich dachte, so funktioniert ein Werkzeug für 2,99 Dollar eben.

Am 2. August 2026 bekam sie eine Site. Ein Abend, Claude Code und ich: Er schrieb die Entwürfe, ich korrigierte, die Themen haben wir zusammen in einem Brainstorm ausgesucht. Vier Sprachen, Englisch, Deutsch, Französisch und Japanisch, vor allem weil die App sie schon hatte.

Danach habe ich jeden Tag in die Search Console geschaut und auf den ersten Klick gehofft. Erwartet habe ich wenig. Acht Wochen später sind die Zahlen besser als erhofft, und sie sagen etwas Konkretes darüber, was eine Website für eine App tut. Hier sind sie, samt dem, was nicht funktioniert hat.

## Die Zahlen nach acht Wochen

Google Search Console, 2. August bis 25. September:

| | |
|---|---|
| Impressionen | 4.700 |
| Klicks | 91 |
| Durchschnittliche Position, erste Woche | 25 |
| Durchschnittliche Position, letzte Woche | 7 |

![Search Console für sleep-timer.app: Klicks und Impressionen vom Start am 2. August bis 25. September](../../../assets/blog/app-site/gsc-clicks-impressions.png)

App Store Connect, Quellen der Downloads, 26. August bis 24. September:

![App Store Connect, Quellen für Sleep Timer: App-Store-Suche 27, andere Apps 9, Web 9, Stöbern im App Store 7](../../../assets/blog/app-site/asc-sources-downloads.png)

Jeder sechste Erstdownload kommt inzwischen aus dem Web. Nach Erlösen ist der Web-Anteil etwas höher, etwa jeder fünfte. Vor August gab es diese Zeile nicht.

Die Downloads sind die Zahl, die zählt. Alles andere auf dieser Seite erklärt, woher sie kommen.

## Die Startseite ist nicht die Seite, die arbeitet

Ich hatte angenommen, die Startseite trägt die Site. Tut sie nicht. Die Seiten, die Leute bringen, beantworten je eine Frage:

| Seite | Impressionen | Klicks |
|---|---|---|
| Beste Sleep-Timer-Apps für den Mac | 673 | 15 |
| Bildschirm abdunkeln, Musik läuft weiter (Japanisch) | 428 | 12 |
| Startseite | 312 | 10 |
| Beste Sleep-Timer-Apps (Deutsch) | 200 | 10 |
| Spotify-Sleep-Timer am Mac | 564 | 6 |
| Musik nach Timer stoppen | 422 | 5 |

Das Muster: Jemand tippt ein Problem ein, „Bildschirm abdunkeln, Musik weiterlaufen lassen Mac“, landet auf einer Seite, die genau das beantwortet, und ein Teil geht weiter zur App. Die Startseite fängt nur Leute, die den Namen schon kennen.

Das hat verändert, wie ich über eine App-Website denke. Sie ist kein Prospekt mit Download-Button. Sie ist eine Sammlung von Antworten auf Fragen, die Leute ohnehin stellen, und der Download-Button steht am Ende jeder Antwort.

## Japan kam zuerst, und geplant war das nicht

Klicks nach Land im selben Zeitraum:

| Land | Klicks |
|---|---|
| Japan | 23 |
| Deutschland | 13 |
| USA | 11 |
| Frankreich | 10 |

Die japanischen Seiten wurden übersetzt, weil die App schon auf Japanisch war, nicht wegen eines Marktplans. Sie bringen jetzt mehr Klicks als die englischen. Die Suchanfrage dahinter ist „macbook 閉じても音楽再生“, Musik weiterspielen bei zugeklapptem Deckel, und die japanische Seite dazu steht um Platz 9, fast ohne Konkurrenz.

Es ist das zweite Mal, dass eine Landessprache mehr für eine App getan hat als alles auf Englisch. Der [Artikel zu App-Store-Keywords](/de/blog/app-store-keywords-was-gewirkt-hat/) erzählt dieselbe Geschichte über Vietnam. Wenn die App schon lokalisiert ist, sollte es die Site auch sein. Billiger kommt man an Reichweite nicht.

## Ein Fünftel der Impressionen sind KI-Antworten

Die Search Console hat einen neuen Bericht, noch als Beta markiert: Impressionen in Googles generativen KI-Funktionen, den KI-Antworten oben auf der Ergebnisseite.

![Search Console, Bericht zu generativer KI: 918 Impressionen in drei Monaten, von null auf etwa dreißig am Tag](../../../assets/blog/app-site/gsc-generative-ai.png)

Für sleep-timer.app zeigt er 918 Impressionen in drei Monaten, gegenüber 4.700 in der normalen Suche. Etwa jedes fünfte Mal, wenn die Site bei Google erscheint, erscheint sie in einer KI-Antwort. Die Linie geht von null Anfang August auf dreißig bis vierzig am Tag und steigt schneller als die normale.

Vorn liegen dieselben Seiten: die Liste der besten Apps, die Seite zum Abdunkeln, die Seite zum Stoppen der Musik. Seiten, die eine Frage in klaren Worten beantworten, sind die, die eine KI-Antwort zitiert.

Das hat einen Preis, und er steht in den Daten. Mehrere Frage-Suchanfragen zeigen die Site auf Platz 1 mit null Klicks: „can i set a sleep timer on my mac“, „can you put a sleep timer on macbook“. Platz 1, niemand klickt. Die KI-Antwort liefert die Antwort, manchmal mit dem Namen der App, und die Seite wird nie geöffnet. Wie viele davon zu Downloads werden, kann ich nicht messen. Einige schon: Die Web-Zeile in App Store Connect wuchs, während die Klicks flach blieben.

## Was nicht funktioniert hat

**Der Hauptbegriff.** „sleep timer mac“ steht auf Platz 28. „mac sleep timer“ ebenso. Wir haben die Site um ein Bündel von Seiten herum gebaut, in der Hoffnung, diese eine Anfrage zu heben, und nach acht Wochen hat sie sich nicht bewegt. Die erste Seite dafür gehört Apples Support-Seiten, großen Software-Blogs und dem App Store selbst. Eine neue Domain kommt da nicht durch gutes Schreiben hinein. Das braucht Links und Zeit, und vielleicht passiert es nie. Die Gewinne lagen bei den langen Anfragen.

**Erste Seite, keine Klicks.** „macbook sleep timer app“ steht auf Platz 6 mit 87 Impressionen und keinem einzigen Klick. Auf der ersten Seite zu stehen heißt nicht, gewählt zu werden, schon gar nicht unter einer KI-Antwort und einem App-Store-Treffer.

**Kampagnen-Tracking.** Jeder Download-Button trägt einen App-Store-Kampagnenparameter. App Store Connect zeigt dafür nichts: Der Kampagnenbericht braucht mehr Installationen, als ein kleines Werkzeug im Monat bekommt, bevor er etwas anzeigt. Die Tabelle nach Quellentyp funktioniert trotzdem, ich weiß also, dass Web-Verweise existieren, nur nicht, welche Seite sie geschickt hat.

## Was es gekostet hat

Ein Abend für die Site: Struktur, Startseite, sechs Antwortseiten, vier Sprachen. Claude Code hat entworfen, ich habe jede Seite korrigiert, und ich würde nichts veröffentlichen, was ich nicht gelesen habe. Kein Designer. Hosting auf Cloudflare Pages kostet in dieser Größe nichts.

Seit dem Start: nichts. Keine neuen Seiten, kein Linkaufbau, keine Anzeigen. Die Zahlen oben sind das, was eine Ein-Abend-Site von allein tut.

## So wiederholt man es

Wenn du eine App im Store hast und keine Site, ist das die ganze Methode:

1. Schreib die zehn Fragen auf, die Leute stellen, bevor sie deine App finden. Keine Funktionen, Fragen. „Kann ich am Mac einen Sleep Timer stellen?“ „Hat Apple Music einen Sleep Timer?“
2. Gib jeder Frage eine eigene Seite mit einer klaren Antwort, und die App am Ende.
3. Mach eine Seite „beste Apps für X“, die Konkurrenten ehrlich aufführt. Es war unsere stärkste Seite.
4. Übersetze in jede Sprache, die die App schon hat.
5. Häng trotzdem an jeden Store-Link einen Kampagnenparameter. Irgendwann zeigt der Bericht etwas.
6. Trag die Site am Starttag in die Search Console ein, dann lass sie acht Wochen in Ruhe.
7. Bau die Site nicht um einen Hauptbegriff herum. Bau sie um die langen Fragen, und lass den Hauptbegriff kommen, wenn er kommt.

## Fragen, die gestellt werden

### Braucht eine Mac- oder iPhone-App eine Website?

Für die Auffindbarkeit, ja. Die App-Store-Suche findet nur Leute, die schon im App Store sind. Eine Site fängt Leute, die zuerst Google eine Frage stellen, und bei dieser App ist das jeder sechste Download.

### Wie lange dauert eine App-Website?

Ein Abend für eine statische Site mit einer Handvoll Antwortseiten, wenn die Texte von dir kommen und ein Assistent sie entwirft. Die Übersetzung ist der Teil, der kostenlos skaliert, wenn die App schon lokalisiert ist.

### Welche Seiten sollte eine App-Website haben?

Antwortseiten zu echten Fragen, je eine Frage, und einen Vergleich „beste Apps“. Die Startseite zählt weniger, als man denkt.

### Nimmt Googles KI-Antwort Klicks weg?

Ja und nein. Bei Frage-Suchanfragen erscheint die Site auf Platz 1 und bekommt keinen Klick, weil die Antwort auf der Ergebnisseite steht. Aber der App-Name reist mit der Antwort mit, und die Web-Verweise in App Store Connect sind trotzdem gewachsen.

### Sieht man, welche Seite einen Download geschickt hat?

Unterhalb einer gewissen Menge nicht. App Store Connect zeigt den Quellentyp Web, aber der Bericht pro Kampagne bleibt bei einer kleinen App leer.

Wenn du Zahlen von deiner eigenen App-Site hast, die etwas anderes sagen, schreib mir. Ich korrigiere lieber, als eine schöne Geschichte zu behalten, die sich als falsch herausstellt.
