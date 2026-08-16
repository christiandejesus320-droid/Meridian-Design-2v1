from pathlib import Path
import json, re

root = Path(__file__).parent
index = root / 'index.html'
text = index.read_text()
text = text.replace('<script src="meridian-editorial.js"></script>', '')
index.write_text(text)

# Remove old shop links from public pages and replace old plan copy with Meridian terminology.
for path in root.glob('*.html'):
    if path.name == 'novaxco.html':
        continue
    s = path.read_text()
    s = re.sub(r'<a[^>]+href="novaxco\.html"[^>]*>.*?</a>', '', s, flags=re.I|re.S)
    s = re.sub(r'<a[^>]+href="https://novabomb\.store/[^" ]*"[^>]*>.*?</a>', '', s, flags=re.I|re.S)
    s = s.replace('NOVAXCO', 'Meridian')
    s = s.replace('NovaXCo', 'Meridian')
    path.write_text(s)

# Keep the catalog as a reference file but make it inaccessible from the public navigation.
(root / 'novaxco.html').write_text((root / 'novaxco.html').read_text().replace('NOVAXCO', 'Meridian Legacy Catalog'))

library = {
  'name': 'Meridian Skill Library',
  'version': '2026.08',
  'source_repository': 'https://github.com/vercel-labs/skills',
  'policy': 'Curated and installed only when relevant; no indiscriminate bulk installation.',
  'installed': [
    {'name':'find-skills','path':'skills/find-skills/SKILL.md','source':'vercel-labs/skills','status':'available'}
  ],
  'curated_queue': [
    {'name':'frontend-design','category':'web/design','status':'queued','purpose':'Diseñar landings y sistemas visuales.'},
    {'name':'web-design-guidelines','category':'web/a11y','status':'queued','purpose':'Revisar accesibilidad y patrones web.'},
    {'name':'seo','category':'content/discovery','status':'queued','purpose':'Estructurar páginas y metadatos.'},
    {'name':'content-strategy','category':'editorial','status':'queued','purpose':'Crear investigación, noticias y publicaciones.'},
    {'name':'brand-system','category':'identity','status':'queued','purpose':'Mantener Meridian consistente.'},
    {'name':'mcp-integration','category':'platform','status':'queued','purpose':'Documentar herramientas y conectores MCP.'},
    {'name':'ai-product-copy','category':'product','status':'queued','purpose':'Escribir heroes, CTA y páginas de producto.'},
    {'name':'case-study','category':'editorial','status':'queued','purpose':'Convertir proyectos en historias visuales.'},
    {'name':'performance','category':'web/quality','status':'queued','purpose':'Optimizar carga, imágenes y responsive.'},
    {'name':'skill-creator','category':'operations','status':'queued','purpose':'Crear nuevas skills internas verificables.'}
  ]
}
(root / 'meridian-skill-library.json').write_text(json.dumps(library, ensure_ascii=False, indent=2) + '\n')
(root / 'meridian-skill-library.md').write_text('# Meridian Skill Library\n\nBiblioteca curada para diseño, contenido, MCP, producto y calidad web. La fuente oficial es [Vercel Skills](https://github.com/vercel-labs/skills).\n\nNo se instalarán mil skills de forma indiscriminada: Meridian mantiene una cola seleccionada y verificable para no aumentar dependencias ni introducir instrucciones innecesarias.\n\n## Disponible\n\n- `find-skills` — disponible desde `vercel-labs/skills`.\n\n## Cola curada\n\n- `frontend-design`, `web-design-guidelines`, `seo`, `content-strategy`, `brand-system`, `mcp-integration`, `ai-product-copy`, `case-study`, `performance` y `skill-creator`.\n')
print('Cleaned public navigation and created Meridian Skill Library')
