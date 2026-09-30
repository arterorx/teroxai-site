---
title: 'Wie lange das App-Store-Review 2026 dauert: 91 Einreichungen gemessen'
description: 'Im Median 20 Stunden in der Warteschlange, 36 Minuten echtes Review. Daten aus 91 Einreichungen von acht Apps, und wie beschleunigtes Review funktioniert.'
date: 2026-09-30
lang: de
translationOf: app-store-review-time-2026
cover: review-time
---

Kurze Antwort, aus meinen eigenen Einreichungen zwischen April und September 2026: Eine App wartet etwa 20 Stunden in der Warteschlange, danach dauert das eigentliche Review etwa 36 Minuten. Die Hälfte aller Entscheidungen kam innerhalb eines Tages nach dem Einreichen. Erste Versionen dauern länger, und der Grund sind Ablehnungen, nicht die Warteschlange.

Ich veröffentliche acht Apps für iPhone und Mac, und jede Statusänderung schickt eine Mail aus App Store Connect. Ich habe alle durchgesehen: 91 Einreichungen, bei 61 davon sind Beginn des Reviews und Entscheidung dokumentiert. Das sagen sie.

## Die Zahlen

| Schritt | Median | Hälfte der Fälle zwischen | Neun von zehn unter |
|---|---|---|---|
| Waiting for Review bis In Review | 19,6 h | 15 und 50 h | 93 h |
| In Review bis zur Entscheidung | 36 min | 6 min und 2,2 h | 22 h |
| Einreichen bis Entscheidung | 24,4 h | 18 und 66 h | 143 h |

27 der 61 Entscheidungen kamen weniger als 24 Stunden nach dem Einreichen, 41 in weniger als 48. Die schnellste Freigabe dauerte 1 Stunde 10 Minuten vom Einreichen bis zum Ergebnis. Die längste Wartezeit in der Schlange waren 13 Tage.

Wenn eine App also einen Tag auf „Waiting for Review“ steht, ist nichts kaputt. Das ist der Normalzustand. Das Review selbst ist kurz: In 38 von 61 Fällen hat der Prüfer in weniger als einer Stunde entschieden.

## Wohin die Zeit wirklich geht

Fast alles ist Warteschlange. So lange dauerte das Review, nachdem es begonnen hatte:

| Review dauerte | Einreichungen |
|---|---|
| unter 15 Minuten | 21 |
| 15 bis 60 Minuten | 17 |
| 1 bis 6 Stunden | 15 |
| 6 bis 24 Stunden | 2 |
| mehr als einen Tag | 6 |

Die sechs langen sind der interessante Teil. Jedes davon ist ein Review, das mit einer Frage stehen blieb: Der Prüfer wollte ein Demovideo, einen funktionierenden Kauf, eine Antwort im Resolution Center. Die Uhr läuft weiter, während die App auf „In Review“ steht, und auf deiner Seite weiß niemand, dass sie auf dich wartet.

## Freigegeben oder abgelehnt

| Ergebnis | Einreichungen | Median Einreichen bis Entscheidung |
|---|---|---|
| Freigegeben | 38 | 20 h |
| Abgelehnt | 23 | 51 h |

Eine Ablehnung kommt nicht schneller als eine Freigabe. Sie kommt später, und dann beginnt der ganze Zyklus von vorn. Abgelehnte Einreichungen haben auch länger in der Schlange gewartet, bevor jemand hingesehen hat: 44 Stunden im Median gegenüber 18 bei freigegebenen. Warum, lässt sich aus den Mails allein nicht sagen. Ich vermute, dass Wiedereinreichungen nach einer Ablehnung in einer anderen Schlange landen, aber das ist eine Vermutung.

Praktisch heißt das: Eine Ablehnung kostet etwa zwei Tage, nicht einen. 23 meiner 61 Einreichungen wurden abgelehnt, fast alle davon erste Versionen.

## Warum erste Versionen länger dauern

Jede Ablehnung in diesem Datensatz hat mir eine Regel beigebracht:

- **2.4.5(iii), Autostart.** Die Mac-App hat sich standardmäßig als Anmeldeobjekt eingetragen. Zustimmung muss eine Handlung des Nutzers sein, auch wenn der Schalter sichtbar ist.
- **5.1.1(iv), Berechtigungsbutton.** Ein Button vor der Kameraabfrage hieß „Allow“. Er muss „Continue“ heißen.
- **2.1(a) und 2.1(b), unerreichbarer Kauf.** Ohne die Hardware, die die App braucht, fand der Prüfer den In-App-Kauf nicht.
- **5.2.5, Apple-Marken.** Das Wort „Mac“ im App-Namen in zwei Sprachen.
- **Mac-Menü.** Eine Mac-App bekam zwei Ablehnungen hintereinander, weil der Menüpunkt „New Window“ nichts tat.
- **In-App-Kauf nicht angehängt.** Ein neuer Kauf muss zusammen mit der Version eingereicht werden, nicht allein.

Die erste davon, eine Webcam-App für den Mac, brauchte vom ersten Einreichen bis in den Store 14 einhalb Tage und vier Ablehnungen. Die Geschichte steht ausführlich hier: [Vier Ablehnungen im App Review in 15 Tagen](/de/blog/mac-app-review-vier-ablehnungen/). Ihre späteren Updates brauchten weniger als zwei Tage, das letzte 15 Stunden 52 Minuten.

## iPhone und Mac

| Plattform | Einreichungen | Median Warteschlange |
|---|---|---|
| iOS | 41 | 19 h |
| macOS | 20 | 23 h |

Die Mac-Schlange war etwas langsamer. Der größere Unterschied: Beides sind getrennte Einreichungen, getrennt entschieden, von Prüfern, die Unterschiedliches prüfen. Eine App, die auf dem iPhone freigegeben ist, kann in derselben Woche auf dem Mac wegen eines Menüpunkts abgelehnt werden.

## Wird das App Review langsamer?

Von hier aus sah es nicht so aus. Median der Wartezeit nach Monat:

| Monat | Einreichungen | Median Warteschlange |
|---|---|---|
| Juli 2026 | 9 | 32 h |
| August 2026 | 14 | 40 h |
| September 2026 | 35 | 18 h |

Der September war bisher der schnellste Monat des Jahres. Der August der langsamste, was zum üblichen Andrang vor einem neuen iOS passt.

## Wann das Review beginnt

In Review begann 22 von 61 Mal an einem Montag, öfter als an jedem anderen Tag. Die meisten meiner Einreichungen gingen an einem Sonntag raus, eine Einreichung am Wochenende beginnt also einfach am Montag. Viel länger gewartet hat sie trotzdem nicht: Einreichungen von Freitag bis Sonntag hatten einen Median von 21 Stunden, von Montag bis Donnerstag 19,5.

Die meisten Reviews begannen zwischen 13 und 19 Uhr Berliner Zeit, das ist früher Morgen in Kalifornien.

## So beantragst du ein beschleunigtes Review

Ich habe es einmal beantragt, am 14. September, nach der dritten Ablehnung der Webcam-App. Was ich nicht erwartet hatte:

1. Der Antrag ist ein Formular auf developer.apple.com unter Contact, Thema „Request an expedited app review“.
2. 2026 fragt das Formular nur nach App-Name und Plattform. Es gibt kein Feld für den Grund.
3. Es wurde am selben Tag gewährt.
4. Es wurde übertragen. Als die App erneut abgelehnt wurde, ging die Wiedereinreichung ohne neuen Antrag zurück in die beschleunigte Schlange, und Apples Antwort sagte das auch.

Nutze es für etwas Echtes: ein kaputtes Release, eine Frist, einen Sicherheitsfix. Es ist kein Werkzeug für jedes Update, und bei einem Median von 20 Stunden brauchen die meisten Updates es nicht.

## Fallen, die Tage kosten

- **Antworten ist nicht Wiedereinreichen.** Wenn du nach einer Ablehnung einen neuen Build hochlädst, reicht die Antwort an den Prüfer nicht. Du musst „Resubmit to App Review“ drücken, sonst bleibt die Version in „Prepare for Submission“ liegen, und niemand öffnet sie.
- **Die Binärprüfung kommt zuerst.** Sieben meiner Einreichungen flogen innerhalb einer Minute als „Invalid Binary“ raus, noch vor jeder Schlange. Prüf die Verarbeitungs-Mail, bevor du wartest.
- **„Complete“ heißt nichts.** In der App Store Connect API ist eine abgeschlossene Einreichung „COMPLETE“, ob freigegeben, abgelehnt oder zurückgezogen. Nur die Status-Mails sagen, was davon.
- **Die Mails gehen an deine Apple-ID.** Nicht an deine Arbeitsadresse, nicht an dein Team. Wer die eigenen Review-Zeiten messen will, findet nur in diesem Postfach die vollständige Aufzeichnung.

## Wie man weniger Zeit im Review verbringt

1. Updates ohne neue Versprechen einreichen. Meine gingen in Stunden durch.
2. Vor einer ersten Version die Richtlinien lesen, an denen man am wahrscheinlichsten hängen bleibt: 2.1, 2.3, 2.4.5, 5.1.1, 5.2.5.
3. Den genauen Klickweg zu jeder bezahlten Funktion ganz oben in die Hinweise für das Review schreiben.
4. Braucht die App Hardware, mit der ersten Einreichung ein Video schicken und jeden Bildschirm ohne sie erreichbar machen.
5. Neue In-App-Käufe an die Version hängen.
6. Nach einer Ablehnung am selben Tag korrigieren und neu einreichen. Die Tage vergehen in der Schlange, nicht beim Korrigieren.
7. Das beschleunigte Review für den Tag aufheben, an dem man es wirklich braucht.

## Fragen, die gestellt werden

### Wie lange dauert das App-Store-Review 2026?

In meinen Daten im Median 24 Stunden vom Einreichen bis zur Entscheidung: etwa 20 Stunden Warteschlange und etwa 36 Minuten Review. Die Hälfte aller Entscheidungen kam innerhalb eines Tages.

### Warum hängt meine App auf „Waiting for Review“?

Fast sicher, weil sie in der Warteschlange steht. Ein Tag ist normal, zwei Tage sind häufig, und jede zehnte wartet länger als vier Tage. Das Review selbst dauert meist weniger als eine Stunde, wenn es einmal begonnen hat.

### Wie beantrage ich ein beschleunigtes App-Store-Review?

Über das Kontaktformular auf developer.apple.com, Thema „Request an expedited app review“. 2026 fragt es nur nach App-Name und Plattform. Meines wurde am selben Tag gewährt und galt auch nach einer Ablehnung weiter.

### Macht eine Ablehnung das nächste Review schneller?

Nein. Abgelehnte Einreichungen haben in meinen Daten länger gedauert, im Median 51 Stunden vom Einreichen bis zur Entscheidung gegenüber 20 bei freigegebenen.

### Ist das Review im Mac App Store langsamer als bei iOS?

Etwas: im Median 23 Stunden in der Schlange gegenüber 19. Der größere Unterschied ist, dass Mac-Prüfer Mac-Dinge prüfen, etwa funktionierende Menüpunkte.

## Wie ich gemessen habe

Alle Zahlen stammen aus den Status-Mails von App Store Connect für acht Apps von April bis September 2026. „Waiting for Review“ markiert die Einreichung, „In Review“ den Beginn, und die Mail „submission is complete“ oder „There's an issue“ die Entscheidung. Das Ergebnis kommt aus den Mails der folgenden Stunde. Von 91 Einreichungen haben 61 einen klaren Beginn, eine Entscheidung und ein Ergebnis; die übrigen habe ich zurückgezogen, sie flogen als ungültige Binärdatei raus, oder die Mails zeigen kein klares Ergebnis. Die Zeiten sind Berliner Zeit. Es sind die Apps eines Entwicklers, also eine Stichprobe, kein Durchschnitt von Apple.

Wenn deine Zahlen anders aussehen, schreib mir. Ich würde sie gern ergänzen.
