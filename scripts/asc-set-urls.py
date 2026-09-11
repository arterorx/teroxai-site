#!/usr/bin/env python3
"""Point the three AI apps' Support, Marketing and Privacy URLs at teroxai.com.
Metadata only: no build, no review. Uses portfolio-hq/Scripts/asc.py.
Idempotent; run: python3 scripts/asc-set-urls.py [--dry-run]"""
import json, subprocess, sys, tempfile, urllib.request

ASC = "/Users/artero/Downloads/portfolio-hq/Scripts/asc.py"
SITE = "https://teroxai.com"
APPS = {"6503450897": "ai-photo-generator", "6504455552": "ai-video-generator", "6740177765": "text-to-music"}
DRY = "--dry-run" in sys.argv

def asc(method, path, body=None):
    args = [ASC, method, path]
    if body is not None:
        f = tempfile.NamedTemporaryFile("w", suffix=".json", delete=False); json.dump(body, f); f.close(); args.append(f.name)
    r = subprocess.run(args, capture_output=True, text=True)
    status = next((l.strip() for l in r.stderr.splitlines() if l.startswith("HTTP")), "HTTP ?")
    payload = r.stdout.strip()
    payload = payload[payload.index("{"):] if "{" in payload else ""
    return status, (json.loads(payload) if payload else {})

def alive(url):
    try:
        return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=20).status == 200
    except Exception as e:
        print("  not reachable:", url, e); return False

for app_id, slug in APPS.items():
    marketing, support, privacy = f"{SITE}/apps/{slug}/", f"{SITE}/apps/{slug}/support/", f"{SITE}/apps/{slug}/privacy/"
    print(f"\n== {slug} ({app_id})")
    if not all(alive(u) for u in (marketing, support, privacy)):
        sys.exit("A page is down, not writing anything.")
    # Live version: READY_FOR_SALE on iOS
    _, vers = asc("GET", f"/v1/apps/{app_id}/appStoreVersions?filter[appStoreState]=READY_FOR_SALE&filter[platform]=IOS&fields[appStoreVersions]=versionString,appStoreState&limit=5")
    live = vers.get("data", [])
    if not live:
        print("  no READY_FOR_SALE version found, skipping version URLs")
    # The filter also returns superseded versions; only the highest one is the live listing.
    key = lambda v: tuple(int(x) for x in v["attributes"]["versionString"].split("."))
    live = sorted(live, key=key, reverse=True)[:1]
    for v in live:
        print(f"  live version {v['attributes']['versionString']} ({v['id']})")
        _, locs = asc("GET", f"/v1/appStoreVersions/{v['id']}/appStoreVersionLocalizations?fields[appStoreVersionLocalizations]=locale,supportUrl,marketingUrl&limit=200")
        tally = {}
        for loc in locs.get("data", []):
            a = loc["attributes"]
            if a.get("supportUrl") == support and a.get("marketingUrl") == marketing:
                tally["already set"] = tally.get("already set", 0) + 1; continue
            if DRY:
                print(f"    {a['locale']}: would set (support {a.get('supportUrl')!r} -> {support}, marketing {a.get('marketingUrl')!r} -> {marketing})"); continue
            st, _ = asc("PATCH", f"/v1/appStoreVersionLocalizations/{loc['id']}",
                        {"data": {"type": "appStoreVersionLocalizations", "id": loc["id"], "attributes": {"supportUrl": support, "marketingUrl": marketing}}})
            tally[st] = tally.get(st, 0) + 1
        print("    version localizations:", tally)
    # Privacy policy URL on every appInfo localization (live and in-progress)
    _, info = asc("GET", f"/v1/apps/{app_id}/appInfos?fields[appInfos]=state&limit=5")
    states = {i["id"]: i["attributes"].get("state") for i in info.get("data", [])}
    print("  appInfos:", states)
    included = []
    for info_id, state in states.items():
        if state == "READY_FOR_DISTRIBUTION":
            print(f"    {info_id}: live app info, privacyPolicyUrl is locked by Apple until a new version exists")
            continue
        _, locs = asc("GET", f"/v1/appInfos/{info_id}/appInfoLocalizations?fields[appInfoLocalizations]=locale,privacyPolicyUrl&limit=200")
        included += locs.get("data", [])
    ptally = {}
    for loc in included:
        a = loc["attributes"]
        if a.get("privacyPolicyUrl") == privacy:
            ptally["already set"] = ptally.get("already set", 0) + 1; continue
        if DRY:
            print(f"    privacy {a['locale']}: would set {a.get('privacyPolicyUrl')!r} -> {privacy}"); continue
        st, _ = asc("PATCH", f"/v1/appInfoLocalizations/{loc['id']}",
                    {"data": {"type": "appInfoLocalizations", "id": loc["id"], "attributes": {"privacyPolicyUrl": privacy}}})
        print(f"    privacy {a['locale']}: {st}")
print("\ndone" + (" (dry run)" if DRY else ""))
