from pathlib import Path
root=Path(__file__).parent
mapping={
 'index.html':('meridian-chunk-world-skyblue.js','assets/meridian-3d-orbit.jpg'),
 'meridian.html':('assets/visual-05.png','assets/meridian-3d-orbit.jpg'),
 'plataforma.html':('assets/visual-06.png','assets/meridian-3d-orbit.jpg'),
 'mcp.html':('assets/visual-06.png','assets/meridian-3d-mcp.jpg'),
 'cosmos.html':('assets/visual-02.png','assets/meridian-3d-mcp.jpg'),
 'publicaciones.html':('assets/visual-03.png','assets/meridian-3d-lab.jpg'),
 'disenos.html':('assets/visual-07.jpg','assets/meridian-3d-lab.jpg'),
 'chat.html':('assets/visual-01.png','assets/meridian-3d-orbit.jpg'),
 'openai.html':('assets/visual-03.png','assets/meridian-3d-orbit.jpg'),
 'claude.html':('assets/visual-05.png','assets/meridian-3d-lab.jpg'),
 'google.html':('assets/visual-01.png','assets/meridian-3d-orbit.jpg'),
 'github.html':('assets/visual-07.jpg','assets/meridian-3d-mcp.jpg'),
 'vercel.html':('assets/visual-02.png','assets/meridian-3d-orbit.jpg'),
 'supabase.html':('assets/visual-06.png','assets/meridian-3d-mcp.jpg'),
 'notion.html':('assets/visual-05.png','assets/meridian-3d-lab.jpg'),
 'figma.html':('assets/visual-03.png','assets/meridian-3d-lab.jpg'),
}
for filename,(old,new) in mapping.items():
 p=root/filename
 if p.exists():
  s=p.read_text()
  s=s.replace(old,new)
  p.write_text(s)
print('Applied 3D assets to',len(mapping),'pages')
