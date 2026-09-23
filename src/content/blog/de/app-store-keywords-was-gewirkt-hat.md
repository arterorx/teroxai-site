---
title: 'App-Store-Keywords: was unsere Platzierungen bewegt hat und was nicht'
description: 'Zwei Jahre ASO an einer Foto-App, gemessen statt geraten. Die Fehler im Keyword-Feld, die Regel zu Events, und warum Vietnam die USA geschlagen hat.'
date: 2026-09-24
lang: de
translationOf: app-store-keywords-what-moved
cover: aso
---

Letzte Woche schrieb mir ein Spezialist für Nutzerakquise und fragte, wie ich an App-Store-Keywords herangehe. Ich habe in ein paar Absätzen geantwortet und einen längeren Text versprochen. Das ist er, mit Zahlen.

Die App ist [AI Photo Generator: TeroxAI](/de/apps/ai-photo-generator/). Sie ist seit Juni 2024 im Store, und ich habe ihre Metadaten öfter geändert, als ich zugeben möchte. Die meisten Änderungen haben nichts gebracht. Ein paar sehr viel. Der Unterschied zwischen beiden ist der Punkt dieses Artikels.

Eine Warnung vor den Zahlen. Alles unten ist mit der iTunes Search API gemessen, nicht in der App-Store-App selbst. Beides liegt nah beieinander, und fast jedes ASO-Werkzeug baut auf derselben API auf, aber der Store legt Personalisierung, Gerät und Werbung darüber. Wenn ich also „Platz 3“ schreibe, lies es als „Platz 3 in der iTunes Search API an diesem Tag“, ab und zu von Hand am Telefon geprüft. Eine ehrlichere Zahl kenne ich nicht, und wer etwas anderes behauptet, dem traue ich nicht.

## Wo das Suchvolumen wirklich liegt

Ich kenne kein Werkzeug, das echtes Suchvolumen im App Store zeigt. Der einzige Ort mit echten Zahlen ist Apple Ads, in der Keyword-Auswahl beim Anlegen einer Anzeigengruppe. Apples API gibt sie nicht her: Wir haben jeden Endpunkt probiert, der vielversprechend aussah, und jedes Mal 404 oder 503 bekommen.

Alles, was Drittanbieter-Werkzeuge zeigen, ist deren eigene Schätzung. Einen solchen Datensatz haben wir mit offensichtlich erfundenen Zahlen erwischt. Der Ablauf ist deshalb unspektakulär: Volumen mit eigenen Augen vom Apple-Ads-Bildschirm ablesen, dann die Positionen selbst mit einem Skript gegen die Such-API messen. Für beides braucht es kein Abo.

## Wie die Felder gewichtet sind

Der Name zählt am meisten, dann der Untertitel, zuletzt das Keyword-Feld mit 100 Zeichen. Apple baut Phrasen aus Wörtern über alle drei Felder hinweg, ein Wort muss also nur einmal vorkommen.

Daraus folgen zwei Regeln:

- Ein Wort mit klarer Absicht gehört in den Namen. Das macht Zeichen im Keyword-Feld frei.
- Kein Wort in zwei Feldern. Eine Wiederholung ist ein verschenkter Platz, mehr nicht.

## Das Keyword-Feld: drei Fehler, die wir zwei Jahre gemacht haben

Ich ändere das Keyword-Feld, wenn es einen Grund gibt, nicht mit jedem Release. Ein Grund ist eine neue Funktion, ein neuer Markt oder eine Messung, die zeigt, dass ein Wort tot ist. So sah das Feld am 21. September 2026 aus:

```
editor,picture,nano,banana,headshot,anime,cartoon,logo,tattoo,realistic,drawing,prompt,text,upscale
```

Drei Dinge daran sind falsch, und alle drei standen jahrelang da.

**Einzelne allgemeine Wörter.** `picture`, `art`, `free`, `portrait`, `text`, `prompt`, `drawing`. Für sich gewinnen sie nichts und fressen Zeichen. Niemand sucht „picture“ und lädt, was gerade kommt. Jetzt stehen im Feld Phrasen mit Absicht und Wörter für einen konkreten Anwendungsfall, etwa `linkedin` neben `headshot` oder `profile picture` als eine Phrase.

**Wörter, die schon im Namen oder Untertitel stehen.** Dasselbe Wort zweimal, ein Platz verschenkt.

**Eine Phrase in Einzelwörter zerlegt.** `nano banana` ist ein Modell, das Leute mit Namen suchen. In unserem Feld lag es monatelang als `nano` und `banana`, durch ein Komma getrennt. Das ist nicht dieselbe Phrase, und der Store setzt sie nicht für dich wieder zusammen. Jetzt ist es ein Eintrag.

Das neue Feld veröffentliche ich nicht Wort für Wort. Es ist der einzige Teil der Metadaten, den niemand im Store sehen kann, und es gibt keinen Grund, ihn als Liste herauszugeben. Die Regel ist das Entscheidende: Jeder Eintrag ist entweder eine Phrase, die Leute tippen, oder ein einzelnes Wort, das nur neben einem Anwendungsfall Sinn ergibt.

## Events werden auch indexiert

Etwas, das kaum jemand erwähnt: In-App-Events werden von der App-Store-Suche indexiert. Wir legen sie für das Schaufenster an, aber auch, um Wörter unterzubringen, die weder in den Namen noch ins Keyword-Feld passen. `resume`, `professional`, `background`, `cinematic` kamen über Events hinein.

Die Grenzen sind eng: Eventname bis 30 Zeichen, kurze Beschreibung 50, lange Beschreibung 120. Und das Event muss ein echter Anlass mit Datum sein, keine Funktionsbeschreibung. Apple hat zwei von unseren genau deshalb abgelehnt. Der Text beschrieb, was die App immer tut, nicht, was zwischen diesen Daten passiert. Berechtigte Ablehnung.

## Was funktioniert hat: ein vietnamesischer Name

Im Juni 2026 haben wir den Namen für Vietnam lokalisiert: „AI Tạo Ảnh“, mit Keywords aus dem, was vietnamesische Nutzer wirklich tippen. Die Metadaten für 26 Sprachen gingen am 21. Juni rein.

Ich habe die Positionen nicht sofort gemessen, was ich bereue. Die erste Messung war am 6. September: Platz 4 für „tạo hình ảnh“, 17 für „ai tạo ảnh“. Am 22. September: 3 und 20. Die App hält also Platz drei oder vier für den Hauptbegriff auf Vietnamesisch. Wie schnell sie dorthin kam, weiß ich nicht, weil niemand die Wochen dazwischen gemessen hat. Ich zeichne keinen Pfeil nach oben, den ich nicht belegen kann.

Was ich belegen kann: Am Ende des Sommers kam in einem Monat fast die Hälfte der Erstinstallationen der App aus Vietnam, einem Markt, den wir nie absichtlich beworben haben. Ein lokalisierter Name hat eine Tür geöffnet, die der englische Eintrag nicht öffnen konnte.

## Was nicht funktioniert hat: die USA

Das US-Keyword-Feld trägt seit langem die angesagten Modellnamen: nano banana, seedream, midjourney, flux. Gemessen am 22. September, US-Storefront:

| Suchanfrage | Platz |
|---|---|
| ai photo generator | 88 |
| nano banana | 87 |
| seedream | 122 |
| ai headshot | nicht unter den ersten 200 |
| linkedin photo | nicht unter den ersten 200 |
| ai avatar | nicht unter den ersten 200 |
| anime ai | nicht unter den ersten 200 |
| photo editor ai | nicht unter den ersten 200 |

Und `headshot` stand die ganze Zeit im Keyword-Feld. Wörter umzustellen hat nichts gebracht. Die Wörter waren nicht das Problem.

## Der Teil, der beides erklärt

Bewertungen am selben Tag, direkt aus dem Store:

| Land | Bewertungen | Durchschnitt |
|---|---|---|
| USA | 75 | 4,43 |
| Vietnam | 17 | 4,65 |
| Deutschland | 10 | |
| Großbritannien | 1 | |

Siebzehn Bewertungen halten in Vietnam Platz drei. Fünfundsiebzig Bewertungen sind in den USA bei jeder wichtigen Suchanfrage unsichtbar. Die Zahl der Bewertungen ist nicht die Variable. Das Gewicht der Konkurrenz um dich herum ist es.

Das ist die ganze Lektion. ASO erzeugt kein Gewicht, es gibt nur das Gewicht aus, das du hast. In einem überfüllten Markt ohne Bewertungen bringt dich keine Anordnung von Wörtern nach oben. In einem Markt mit dünner Konkurrenz und lokaler Sprache bringt dich eine Änderung am Namen in die Top drei. Ein schwacher Markt in seiner eigenen Sprache ist billiger als jedes Wort im englischen Feld.

## Messen, sonst ist es nicht passiert

Jede Änderung an den Metadaten bekommt ein Datum und eine Zahl daneben: die Suchanfrage, das Land, die Position davor und danach. Ohne das ist „wir haben die Conversion verbessert“ einen Monat später ein Satz, den niemand bestätigen oder widerlegen kann, du selbst eingeschlossen.

Das Skript ist klein. Es ruft die iTunes Search API für eine Liste von Suchanfragen und Ländern auf, findet deine App-ID in den Ergebnissen und schreibt die Position mit Datum in eine Datei. Vor einer Änderung laufen lassen und zwei Wochen danach. Das ist die ganze Methode.

## Fragen, die gestellt werden

### Brauche ich ein bezahltes ASO-Werkzeug?

Dafür nicht. Das Volumen kommt aus der Keyword-Auswahl von Apple Ads, die man kostenlos ansehen kann. Die Positionen kommen aus der iTunes Search API, die man kostenlos abfragen kann. Bezahlte Werkzeuge bringen Komfort und eigene Volumenschätzungen, und die Schätzungen sind der Teil, dem ich nicht trauen würde.

### Soll dasselbe Wort im Namen und im Keyword-Feld stehen?

Nein. Apple kombiniert Wörter aus allen Feldern zu Phrasen, einmal reicht. Eine Wiederholung verschenkt einen Platz.

### Wie oft soll ich das Keyword-Feld ändern?

Wenn du einen Grund und eine Messung hast. Eine neue Funktion, ein neues Land oder ein Wort, das laut Messung tot ist. Mit jedem Release zu ändern macht die Ergebnisse unlesbar.

### Hilft es, den App-Namen zu lokalisieren?

Es war die wirksamste einzelne Änderung, die wir gemacht haben. Sie funktioniert nur dort, wo die Landessprache die Suchsprache ist und die Konkurrenz dünner als auf Englisch. In den USA ist dieselbe App mit mehr Bewertungen unsichtbar.

### Sind In-App-Events gut für Keywords?

Ja, sie werden indexiert. Aber das Event muss ein echter Anlass mit Datum sein. Wer eine dauerhafte Funktion beschreibt, wird abgelehnt.

Wenn du eigene Messungen hast, die dem hier widersprechen, schreib mir. Ich aktualisiere lieber den Artikel, als öffentlich falsch zu liegen.
