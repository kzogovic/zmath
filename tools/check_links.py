import json, urllib.request, time
d = json.load(open("tools/direct_links.json"))
urls = list(d.values())
for k in ["ab", "bc"]:
    for y in ["19", "21", "22", "23", "24", "25", "26"]:
        b = f"https://apcentral.collegeboard.org/media/pdf/ap{y}"
        urls += [f"{b}-frq-calculus-{k}.pdf", f"{b}-sg-calculus-{k}.pdf"]
        if y != "26": urls += [f"{b}-apc-calculus-{k}-q{q}.pdf" for q in range(1, 7)]
res = {}
for u in urls:
    st = "ERR"
    for a in range(2):
        try:
            req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 (Z-Math link checker)", "Range": "bytes=0-1023"})
            r = urllib.request.urlopen(req, timeout=40); head = r.read(8)
            st = f"{r.status} {'PDF' if head.startswith(b'%PDF') else 'NOT-PDF'}"; break
        except Exception as e:
            st = "ERR " + str(e)[:60]; time.sleep(2)
    res[u] = st; time.sleep(0.2)
json.dump(res, open("tools/link_check.json", "w"), indent=0)
