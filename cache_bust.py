from pathlib import Path
root=Path(__file__).parent
version='vivid-2036'
for p in root.glob('*.html'):
 s=p.read_text()
 for name in ['meridian-chunk-08.js','meridian-platform.js','meridian-chunk-01.js','meridian-chunk-02.js','meridian-chunk-03.js','meridian-chunk-04.js','meridian-chunk-05x.js','meridian-chunk-06.js','meridian-chunk-07.js','meridian-chunk-09.js','meridian-flow.js','meridian-founder.js','meridian-chunk-10.js','meridian-chunk-11.js','meridian-chunk-globe-hero.js','meridian-nav-router.js','meridian-landing.css','meridian-system.css']:
  s=s.replace(f'src="{name}"',f'src="{name}?{version}"')
  s=s.replace(f'href="{name}"',f'href="{name}?{version}"')
 p.write_text(s)
print('cache bust applied')
