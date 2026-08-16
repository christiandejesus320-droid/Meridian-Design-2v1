from pathlib import Path
import json

snippet = Path('flow-section.html').read_text()
Path('meridian-flow.js').write_text('window.__MERIDIAN_CHUNKS.push(' + json.dumps(snippet, ensure_ascii=False) + ');\n')
