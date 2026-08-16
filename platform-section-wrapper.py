from pathlib import Path
import json

snippet = Path('platform-section.html').read_text()
Path('meridian-platform.js').write_text('window.__MERIDIAN_CHUNKS.push(' + json.dumps(snippet, ensure_ascii=False) + ');\n')
