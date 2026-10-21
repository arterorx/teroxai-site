---
title: 'Kein Sleep-Timer am Mac, also habe ich selbst einen gebaut'
description: 'macOS hat keinen Sleep-Timer. Ich habe jeden Abend einen Terminalbefehl getippt, dann Sleep Timer gebaut. Von 2.1 bis 4.6, plus die kostenlosen Wege.'
date: 2026-10-21
lang: de
translationOf: mac-sleep-timer
cover: mac-sleep-timer
---

Lange endeten meine Abende gleich. Eine Serie auf dem MacBook, Licht aus, und bevor ich eingeschlafen bin, habe ich das Terminal geöffnet und eine Zeile wie diese getippt:

```
sleep 3600 && pmset sleepnow
```

Eine Stunde warten, dann den Mac schlafen legen. Das funktioniert, aber jeden Abend, im Halbschlaf, einen Befehl in ein schwarzes Fenster tippen. Der Mac hat keinen Sleep-Timer. Apple hat sogar den alten Zeitplan für den Ruhezustand aus den Einstellungen entfernt. Also habe ich 2024 selbst einen gebaut, und daraus wurde meine erste App: [Sleep Timer](/de/apps/sleep-timer/), [einmalig 2,99 $ im Mac App Store](https://apps.apple.com/app/id6502469655).

<div class="cta"><img class="cta__icon" src="/cta/sleep-timer.png" alt="" width="64" height="64"><div class="cta__text"><strong>Sleep Timer: Menu Bar &amp; Widget</strong><span>Einmalig 2,99 $, ohne Abo. Ab macOS 14.</span></div><a class="cta__badge" href="https://apps.apple.com/app/id6502469655" rel="noopener" target="_blank"><img src="/cta/mac-app-store-de.svg" alt="Im Mac App Store laden" width="172" height="44"></a></div>

So wurde aus einem Projekt von einer Woche die Version 4.6. Und am Ende stehen die kostenlosen Wege, falls du gar keine App willst.

## Version eins: eine Woche in Flutter

Die erste Version habe ich selbst in Flutter geschrieben, weil ich Flutter kannte. Das hat etwa eine Woche gedauert. Ein Symbol in der Menüleiste, ein paar feste Zeiten, ein Countdown und am Ende derselbe `pmset`-Aufruf, den ich vorher von Hand getippt hatte.

Die erste Version im App Store heißt 2.1. Nicht, weil es zwei frühere Veröffentlichungen gab. Ich hatte schlicht keine Ahnung, wie App Store Connect funktioniert, wie man dort eine App anlegt und was die Versionsnummern bedeuten. Ich habe gebaut, getestet, gebaut, getestet, und als sie fertig war, stand die Nummer bei 2.1. Im Mai 2024 ging sie in den Verkauf.

In dem Jahr folgten drei kleine Updates. In der ganzen Zeit kam genau ein Wunsch: Jemand wollte sehr kurze Zeiten, eine, drei und fünf Minuten, weil meine Voreinstellungen zu hoch anfingen. Das kam rein. Bis heute ist es der einzige Wunsch, den ich für diese App bekommen habe.

## Fünfzehn Monate Ruhe

Nach Version 2.4 im April 2025 habe ich die App über ein Jahr nicht angefasst. Sie brauchte nichts. Sie hat ihre eine Aufgabe erledigt.

Zurückgebracht hat mich nicht die App, sondern Claude Code. Ich wollte wissen, wie weit ich mit einem KI-Agenten an einem echten Produkt komme, und Sleep Timer war der naheliegende Test: klein, meins und jeden Abend von mindestens einem Menschen benutzt.

Die größte Überraschung kam früh. In einer einzigen Sitzung hat der Agent die ganze App von Flutter auf natives Swift in Xcode umgezogen. Ich hatte mit Wochen gerechnet.

## Was 4.0 geändert hat

Version 4.0 erschien im Juli 2026. Zwei Dinge waren am wichtigsten.

**Sie versteht Musik.** Die meisten nutzen einen Sleep-Timer, um bei etwas einzuschlafen: einer Playlist, einem Podcast, einer Serie. Deshalb wird die Lautstärke in den letzten Minuten langsam leiser, statt abrupt zu enden, und Apple Music wird kurz vor dem Ruhezustand pausiert.

**Der Bildschirm kann abdunkeln statt schlafen.** Manchmal will ich gar nicht, dass der Mac einschläft. Ich will einen dunklen Bildschirm, und im Hintergrund soll leise etwas weiterlaufen. Die Aktion „Bildschirm abdunkeln“ blendet das Display auf Schwarz und lässt den Ton laufen.

![Sleep Timer am Mac: Voreinstellungen von 3 bis 180 Minuten, eine genaue Uhrzeit und ein Schalter zwischen Ruhezustand und Bildschirm abdunkeln](../../../assets/apps/sleep-timer/shot-1.png)

Nach 4.0 kamen die Updates schnell: sechs Versionen in weniger als drei Monaten. Ein Zeitplan mit eigener Uhrzeit für jeden Tag, ein Widget, eine Taste im Kontrollzentrum unter macOS 26, Aktionen für Siri und Kurzbefehle, eine Warnung eine Minute vorher mit Verlängern, Jetzt schlafen oder Abbrechen, und ein ruhiger Modus für alle, die „Bewegung reduzieren“ eingeschaltet haben.

![Der Zeitplan in Sleep Timer: wochentags um 23 Uhr, Freitag und Samstag um 1 Uhr](../../../assets/apps/sleep-timer/shot-2.png)

Aus meinen eigenen Abenden kam noch etwas dazu: ein Countdown über den ganzen Bildschirm, den man vom Bett aus lesen kann, mit Tasten für 15 Minuten mehr, Jetzt schlafen oder Abbrechen. Dabei werden alle Bildschirme dunkel, nicht nur einer.

![Ein roter Countdown im Vollbild auf schwarzem Grund, 59:39, mit Tasten für plus 15 Minuten, Jetzt schlafen und Abbrechen](../../../assets/apps/sleep-timer/shot-3.png)

## Was sich in den Zahlen geändert hat

Im August 2026 bekam die App eine eigene Website, [sleep-timer.app](https://sleep-timer.app). Über diesen Abend habe ich [eine eigene Fallstudie](/de/blog/app-website-downloads-fallstudie/) geschrieben. Seitdem hat Google sie 7.680 Mal gezeigt und 145 Klicks geschickt, für Suchen wie „sleep timer mac“, „sleep timer macbook“ und viele längere Fragen.

![Google Search Console für sleep-timer.app seit August 2026: 145 Klicks, 7.680 Impressionen, durchschnittliche Position 10,1](../../../assets/blog/mac-sleep-timer/gsc-sleep-timer-app.png)

Im App Store sieht man die Änderung deutlicher. Bis Juni hatte die Produktseite eine Handvoll Aufrufe am Tag. Seit Version 4.0 im Juli sind es oft zwei- bis dreimal so viele.

![Aufrufe der Produktseite von Sleep Timer im App Store, Januar bis Oktober 2026: niedrig bis Juni, ab Juli deutlich höher](../../../assets/blog/mac-sleep-timer/asc-page-views.png)

Die Verkäufe sind mitgewachsen, spürbar. Die Geldbeträge behalte ich für mich, wie in jedem Artikel hier.

<div class="cta"><img class="cta__icon" src="/cta/sleep-timer.png" alt="" width="64" height="64"><div class="cta__text"><strong>Sleep Timer: Menu Bar &amp; Widget</strong><span>Einmalig 2,99 $, ohne Abo. Ab macOS 14.</span></div><a class="cta__badge" href="https://apps.apple.com/app/id6502469655" rel="noopener" target="_blank"><img src="/cta/mac-app-store-de.svg" alt="Im Mac App Store laden" width="172" height="44"></a></div>

## Wenn du keine App willst

Verständlich. Das hier funktioniert ohne, alles im Oktober 2026 auf einem MacBook mit macOS 27.2 getestet.

**Einmal, nach einer bestimmten Zeit.** Die Zeile vom Anfang dieses Artikels. Öffne das Terminal und tippe `sleep 3600 && pmset sleepnow`. 3600 Sekunden sind eine Stunde, 1800 eine halbe. Das Fenster muss offen bleiben, Control und C bricht ab. Soll nur der Bildschirm ausgehen und die Musik weiterlaufen, nimm stattdessen `pmset displaysleepnow`.

**Jeden Abend zur gleichen Zeit, im Terminal.** `sudo pmset repeat sleep MTWRFSU 23:30:00` fragt nach dem Administratorpasswort und legt den Mac jeden Abend um 23:30 schlafen. Die Buchstaben sind die englischen Wochentage, R ist Donnerstag, U ist Sonntag. `pmset -g sched` zeigt den Zeitplan, `sudo pmset repeat cancel` entfernt ihn. Apple beschreibt das in seiner [Anleitung](https://support.apple.com/de-de/guide/mac-help/mchl40376151/mac).

**Jeden Abend ohne Terminal.** Seit macOS 26 kann die App Kurzbefehle einen Kurzbefehl zu einer Tageszeit ausführen. Erstelle einen neuen Kurzbefehl, suche in den Aktionen nach „Tageszeit“ (Time of Day) und füge sie als Auslöser hinzu, stell die Uhrzeit und „Jeden Tag“ ein, lass die Mitteilung aus. Darunter kommt „Shell-Skript ausführen“ mit `pmset sleepnow`. In meinem Test ist der Mac genau zu dieser Minute eingeschlafen, ohne zu fragen.

![Eine Automation in Kurzbefehle unter macOS 27.2: um 20:28, danach Shell-Skript ausführen mit pmset sleepnow](../../../assets/blog/mac-sleep-timer/shortcuts-automation.png)

**Was es nicht mehr gibt.** Auf meinem MacBook steht in den Batterie-Einstellungen kein Zeitplan mehr, und die Musik-App hat auch keinen Sleep-Timer. Spotify hat 2025 einen für die Desktop-App angekündigt, auf meinem Mac habe ich ihn im Oktober 2026 nicht gefunden.

![Das Menü Steuerung der Musik-App unter macOS 27.2: Lautstärke, Zufall und Wiederholen, kein Sleep-Timer](../../../assets/blog/mac-sleep-timer/music-controls.png)

Die kostenlosen Wege legen den Mac zu einem festen Moment schlafen, egal was du gerade tust. Genau da verdient eine App ihren Preis: ein sichtbarer Countdown, eine Warnung vorher, Musik, die leiser wird, statt abzubrechen, eine andere Uhrzeit am Freitag. Wenn du das willst: [Sleep Timer kostet einmalig 2,99 $](https://apps.apple.com/app/id6502469655), ab macOS 14. Wer nur jeden Abend eine feste Zeit braucht, bekommt das mit der Kurzbefehle-Automation kostenlos. Es gibt auch andere Apps: Sleepr und das kostenlose, quelloffene C4 for Mac.

## Fragen, die gestellt werden

### Hat der Mac einen Sleep-Timer?

Nein. Man baut sich einen mit einem Terminalbefehl, `sleep 3600 && pmset sleepnow`, mit einer Automation in Kurzbefehle oder mit einer App wie Sleep Timer.

### Wie lege ich den Mac nach einer Stunde schlafen?

Öffne das Terminal, tippe `sleep 3600 && pmset sleepnow` und lass das Fenster offen. Oder nimm eine App mit Countdown.

### Kann ich den Mac jeden Abend automatisch schlafen legen?

Ja. Im Terminal mit `sudo pmset repeat sleep MTWRFSU 23:30:00` oder ohne Terminal mit einer Automation in Kurzbefehle zu einer Tageszeit, die `pmset sleepnow` ausführt. Beides hat unter macOS 27.2 funktioniert.

### Hat Apple Music am Mac einen Sleep-Timer?

Nein. Wenn der ganze Mac schlafen geht, stoppt die Musik, und Sleep Timer pausiert Apple Music kurz vorher.

### Hört die Musik auf, wenn der Mac einschläft?

Ja, in jeder App. Soll sie bei dunklem Bildschirm weiterlaufen, dunkle den Bildschirm ab, statt den Mac schlafen zu legen.
