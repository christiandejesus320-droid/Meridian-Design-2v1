(() => {
  const routes = {
    'href=\"#inicio\"': 'href=\"index.html\"',
    'href=\"#meridian\"': 'href=\"meridian.html\"',
    'href=\"#plataforma\"': 'href=\"plataforma.html\"',
    'href=\"#fundador\"': 'href=\"fundador.html\"',
    'href=\"#trabajos\"': 'href=\"disenos.html\"',
    'href=\"#publicaciones\"': 'href=\"publicaciones.html\"',
    'href=\"ecosystem.html\"': 'href=\"cosmos.html\"',
    'href=\"planes.html\"': 'href=\"planes.html\"',
    'href=\"#chat\"': 'href=\"chat.html\"'
  };
  window.__MERIDIAN_CHUNKS = window.__MERIDIAN_CHUNKS.map(chunk => {
    let output = chunk;
    for (const [from, to] of Object.entries(routes)) output = output.split(from).join(to);
    return output;
  });
})();
