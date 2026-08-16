from pathlib import Path
import json

snippet = Path('platform-section.html').read_text()
public = Path('build-in-public.html').read_text()
if '</section>' in snippet:
    snippet = snippet.replace('</section>', public + '</section>', 1)
Path('meridian-platform.js').write_text('window.__MERIDIAN_CHUNKS.push(' + json.dumps(snippet, ensure_ascii=False) + ');\n')
