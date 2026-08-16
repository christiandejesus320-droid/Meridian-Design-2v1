from pathlib import Path
import json

snippet = Path('founder-section.html').read_text()
Path('meridian-founder.js').write_text('window.__MERIDIAN_CHUNKS.push(' + json.dumps(snippet, ensure_ascii=False) + ');\n')
