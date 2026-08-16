from pathlib import Path
p=Path(__file__).parent/'meridian-chunk-08.js'
s=p.read_text()
start=s.find('<div class=\\"portfolio\\">')
end=s.find('</div></div></section>\\r\\n\\r\\n<section class=\\"section genesis', start)
if start == -1 or end == -1:
    raise SystemExit(f'portfolio block not found: {start}, {end}')
new='''<div class=\\"portfolio\\"><figure class=\\"work\\"><img src=\\"assets/meridian-vivid-hero.jpg\\" alt=\\"Esfera orbital 3D de Meridian\\"><figcaption><b>01 — Meridian Orbit</b><span>Una identidad de producto construida con materia, luz y sistemas conectados.</span></figcaption></figure><figure class=\\"work\\"><img src=\\"assets/meridian-vivid-research.jpg\\" alt=\\"Artefacto de investigación 3D de Meridian\\"><figcaption><b>02 — Research Signal</b><span>Investigación visual para convertir preguntas complejas en señales claras.</span></figcaption></figure><figure class=\\"work\\"><img src=\\"assets/meridian-vivid-cosmos.jpg\\" alt=\\"Sistema Cosmos 3D de Meridian\\"><figcaption><b>03 — Cosmos System</b><span>Un universo de herramientas, modelos y decisiones diseñado para avanzar.</span></figcaption></figure></div>'''
s=s[:start]+new+s[end:]
p.write_text(s)
print('replaced portfolio block')
