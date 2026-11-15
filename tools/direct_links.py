# One-time helper: find the direct PDF download link on each MyMathsCloud page listed in the Calculus books.
import json, re, urllib.request, time, html
src = open("ap-calculus-ab/released.js", encoding="utf-8").read()
pages = sorted(set(re.findall(r'https://www\.mymathscloud\.com/maths/documents/past-papers/[a-z0-9\-/]+', src)))
out = {}
for p in pages:
    for attempt in range(3):
        try:
            req = urllib.request.Request(p, headers={"User-Agent": "Mozilla/5.0 (Z-Math link checker)"})
            body = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
            links = re.findall(r'https://www\.mymathscloud\.com/api/download/[^"\'<>]+?\.pdf\?id=[A-Za-z0-9_\-]+', html.unescape(body))
            links = [l for l in links if "AP-Calculus" in l or "AP%20Calculus" in l]
            if links: out[p] = links[0].replace(" ", "%20")
            break
        except Exception as e:
            time.sleep(2)
    time.sleep(0.3)
json.dump(out, open("tools/direct_links.json", "w"), indent=0)
print(len(pages), "pages,", len(out), "direct links")
