from pathlib import Path
root=Path(__file__).parent
needles=['justify-content:center">','justify-content:center','Llamar ahora','Visitar el estudio']
for p in sorted(root.glob('*.js'))+sorted(root.glob('*.html')):
    s=p.read_text(errors='ignore')
    hits=[]
    for needle in needles:
        start=0
        while True:
            i=s.find(needle,start)
            if i<0: break
            hits.append((i,needle,s[max(0,i-90):i+150]))
            start=i+len(needle)
    if hits:
        print(f'FILE {p.name} HITS {len(hits)}')
        for _,needle,ctx in hits[:8]:
            print('NEEDLE',repr(needle),'CONTEXT',repr(ctx))
