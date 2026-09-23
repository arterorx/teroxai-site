---
title: 'App Store keywords: what moved rankings for us and what did not'
description: 'Two years of ASO on one photo app, measured, not guessed. The keyword field mistakes, the rule about events, and why Vietnam beat the US.'
date: 2026-09-24
lang: en
translationOf: app-store-keywords-was-gewirkt-hat
cover: aso
---

A user acquisition specialist wrote to me last week asking how I approach App Store keywords. I answered in a few paragraphs and promised a longer write-up. This is it, with the numbers.

The app is [AI Photo Generator: TeroxAI](/apps/ai-photo-generator/). It has been in the store since June 2024, and I have changed its metadata more times than I want to admit. Most of those changes did nothing. A few did a lot. The difference between them is the point of this article.

One warning before the numbers. Everything below is measured with the iTunes Search API, not inside the App Store app. The two are close, and almost every ASO tool is built on the same API, but the store adds personalisation, device and ads on top. So when I write "position 3", read it as "position 3 in the iTunes Search API on that date", checked by hand on a phone now and then. I do not know a more honest number, and I do not trust anyone who claims to.

## Where the search volume really lives

There is no tool I know of that shows real App Store search volume. The only place real numbers exist is Apple Ads, in the keyword picker when you set up an ad group. Apple's API does not expose them: we tried every endpoint that looked promising and got 404 or 503 on each one.

Everything third-party tools show you is their own estimate. We caught one such dataset with numbers that were plainly invented. So the workflow is boring: read the volume off the Apple Ads screen with your own eyes, then measure your positions yourself with a script against the search API. No subscription needed for either.

## How the fields weigh

The name counts most, the subtitle next, the 100-character keyword field last. Apple builds phrases from words across all three fields, so a word only needs to appear once.

Two rules follow from that:

- A word with strong intent goes into the name, which frees characters in the keyword field.
- Never repeat a word across fields. A repeat is a wasted slot, nothing more.

## The keyword field: three mistakes we made for two years

I change the keyword field when there is a reason, not with every release. A reason is a new feature, a new market, or a measurement that shows a word is dead. Here is what the field looked like on 21 September 2026:

```
editor,picture,nano,banana,headshot,anime,cartoon,logo,tattoo,realistic,drawing,prompt,text,upscale
```

Three things are wrong with it, and all three sat there for years.

**Single generic words.** `picture`, `art`, `free`, `portrait`, `text`, `prompt`, `drawing`. They win nothing on their own and they eat characters. Nobody searches "picture" and downloads whatever comes up. The field now holds phrases with intent and words tied to one concrete use, such as `linkedin` next to `headshot`, or `profile picture` as one phrase.

**Words that already sit in the name or subtitle.** Same word twice, one slot wasted.

**A phrase split into words.** `nano banana` is a model people search for by name. In our field it sat for months as `nano` and `banana`, separated by a comma. That is not the same phrase, and the store does not stitch it back together for you. Now it is one entry.

I am not publishing the new field word for word. It is the one part of the metadata nobody can see in the store, so there is no reason to hand it over as a list. The rule is what matters: each entry is either a phrase people type, or a single word that only makes sense next to a use case.

## Events index too

Something few people mention: In-App Events are indexed by App Store search. We create them for the storefront, but also to get words in that fit neither the name nor the keyword field. `resume`, `professional`, `background`, `cinematic` went in through events.

The limits are tight: event name up to 30 characters, short description 50, long description 120. And the event has to be an actual occasion with dates, not a feature description. Apple rejected two of ours for exactly that. The text described what the app always does, not what happens between those dates. Fair rejection.

## What worked: a Vietnamese name

In June 2026 we localised the name for Vietnam: "AI Tạo Ảnh", with keywords built from what Vietnamese users actually type. Metadata for 26 locales went in on 21 June.

I did not measure positions right away, which I regret. The first measurement was 6 September: position 4 for "tạo hình ảnh", 17 for "ai tạo ảnh". On 22 September: 3 and 20. So the app holds third or fourth place for the head term in Vietnamese. How fast it got there, I do not know, because nobody measured the weeks in between. I am not drawing an arrow up that I cannot back.

What I can back: at the end of summer almost half of the app's first installs in a month came from Vietnam, a market we never pushed on purpose. A localised name opened a door that the English listing could not.

## What did not work: the United States

The US keyword field has carried the fashionable model names for a long time: nano banana, seedream, midjourney, flux. Measured on 22 September, US storefront:

| Query | Position |
|---|---|
| ai photo generator | 88 |
| nano banana | 87 |
| seedream | 122 |
| ai headshot | not in the top 200 |
| linkedin photo | not in the top 200 |
| ai avatar | not in the top 200 |
| anime ai | not in the top 200 |
| photo editor ai | not in the top 200 |

And `headshot` was in the keyword field the whole time. Reordering words did nothing. The words were not the problem.

## The part that explains both

Ratings on the same day, straight from the store:

| Country | Ratings | Average |
|---|---|---|
| United States | 75 | 4.43 |
| Vietnam | 17 | 4.65 |
| Germany | 10 | |
| United Kingdom | 1 | |

Seventeen ratings hold third place in Vietnam. Seventy-five ratings are invisible in the US for every query that matters. The number of ratings is not the variable. The weight of the competition around you is.

That is the whole lesson. ASO does not create weight, it only spends the weight you have. In a crowded market with no ratings, no arrangement of words gets you seen. In a market where the competition is thin and the language is local, one change to the name puts you in the top three. A weak market in its own language is cheaper than any word in the English field.

## Measure or it did not happen

Every change to metadata gets a date and a number next to it: the query, the country, the position before and after. Without that, "we improved conversion" a month later is a sentence nobody can confirm or deny, including you.

The script is small. It calls the iTunes Search API for a list of queries and countries, finds your app id in the results, and writes the position to a file with the date. Run it before a change and two weeks after. That is the entire method.

## Questions people ask

### Do I need a paid ASO tool?

Not for this. Volume comes from the Apple Ads keyword picker, which is free to look at. Positions come from the iTunes Search API, which is free to call. Paid tools add convenience and their own volume estimates, and the estimates are the part I would not trust.

### Should I put the same word in the name and the keyword field?

No. Apple combines words from all fields into phrases, so one occurrence is enough. A repeat spends a slot for nothing.

### How often should I change the keyword field?

When you have a reason and a measurement. A new feature, a new country, or a word that a measurement shows is dead. Changing it with every release makes the results impossible to read.

### Does localising the app name help?

It was the single most effective change we made. It only works where the local language is the search language and the competition is thinner than in English. In the US the same app with more ratings is invisible.

### Are In-App Events good for keywords?

Yes, they index. But the event has to be a real dated occasion. Describe a permanent feature and it gets rejected.

If you have measurements of your own that disagree with any of this, write to me. I would rather update the article than be wrong in public.
