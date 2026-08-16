from pathlib import Path
root = Path(__file__).parent
for path in root.glob('*.html'):
    path.write_text('\n'.join(line.rstrip() for line in path.read_text().splitlines()) + '\n')
