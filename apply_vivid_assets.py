from pathlib import Path
root=Path(__file__).parent
mapping={
 'index.html': 'assets/meridian-vivid-hero.jpg',
 'meridian.html': 'assets/meridian-vivid-hero.jpg',
 'plataforma.html': 'assets/meridian-vivid-hero.jpg',
 'mcp.html': 'assets/meridian-3d-mcp.jpg',
 'cosmos.html': 'assets/meridian-vivid-cosmos.jpg',
 'publicaciones.html': 'assets/meridian-vivid-research.jpg',
 'disenos.html': 'assets/meridian-3d-lab.jpg',
 'chat.html': 'assets/meridian-vivid-hero.jpg',
 'openai.html': 'assets/meridian-vivid-hero.jpg',
 'claude.html': 'assets/meridian-3d-lab.jpg',
 'google.html': 'assets/meridian-vivid-business.jpg',
 'github.html': 'assets/meridian-3d-mcp.jpg',
 'vercel.html': 'assets/meridian-vivid-business.jpg',
 'supabase.html': 'assets/meridian-3d-mcp.jpg',
 'notion.html': 'assets/meridian-3d-lab.jpg',
 'figma.html': 'assets/meridian-3d-lab.jpg',
}
for name,new in mapping.items():
 p=root/name
 if not p.exists(): continue
 s=p.read_text()
 for old in ('assets/meridian-3d-orbit.jpg','assets/meridian-3d-mcp.jpg','assets/meridian-3d-lab.jpg','assets/visual-01.png','assets/visual-02.png','assets/visual-03.png','assets/visual-05.png','assets/visual-06.png','assets/visual-07.jpg'):
  s=s.replace(old,new)
 p.write_text(s)
print('Applied vivid assets to',len(mapping),'pages')
