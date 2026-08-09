window.__MERIDIAN_CHUNKS.push(`
<style>
  .meridian-globe-hero{position:relative;min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:40px;padding:100px 40px 80px;background:#f4efe5;overflow:hidden}
  .meridian-globe-hero::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:.04;pointer-events:none}
  .meridian-globe-content{position:relative;z-index:2;display:flex;flex-direction:column;gap:28px}
  .meridian-globe-badge{display:inline-flex;align-items:center;gap:10px;padding:10px 20px;border:2px solid #181715;border-radius:999px;background:#fffaf0;width:fit-content}
  .meridian-globe-badge .dot{width:10px;height:10px;border-radius:50%;background:#e17a5d;animation:meridian-pulse 2s ease-in-out infinite}
  @keyframes meridian-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.85)}}
  .meridian-globe-badge span{font-size:.75rem;font-weight:700;color:#181715;letter-spacing:.12em;text-transform:uppercase}
  .meridian-globe-title{font-size:clamp(3rem,6vw,5.5rem);font-weight:900;color:#181715;line-height:.88;letter-spacing:-.04em;margin:0}
  .meridian-globe-title em{font-style:normal;color:#e17a5d}
  .meridian-globe-desc{font-size:1.1rem;color:#54504a;line-height:1.7;max-width:500px}
  .meridian-globe-cta{display:flex;gap:14px;flex-wrap:wrap}
  .meridian-globe-cta a{padding:16px 28px;border-radius:999px;font-weight:800;font-size:.9rem;text-decoration:none;transition:all .25s;cursor:pointer;border:2px solid #181715}
  .meridian-globe-cta .cta-primary{background:#e17a5d;color:#fffaf0;border-color:#e17a5d}
  .meridian-globe-cta .cta-primary:hover{background:#c96a4e;transform:translateY(-2px);box-shadow:6px 6px 0 #181715}
  .meridian-globe-cta .cta-secondary{background:transparent;color:#181715}
  .meridian-globe-cta .cta-secondary:hover{background:#181715;color:#fffaf0}
  .meridian-globe-visual{position:relative;display:flex;align-items:center;justify-content:center}
  .meridian-globe-canvas{position:relative;width:100%;max-width:500px;aspect-square}
  .meridian-globe-canvas canvas{width:100%!important;height:100%!important;border-radius:50%;cursor:grab}
  .meridian-globe-canvas canvas:active{cursor:grabbing}
  .meridian-globe-panel{position:absolute;bottom:30px;left:-20px;width:260px;padding:18px;background:#fffaf0;border:2px solid #181715;border-radius:20px;box-shadow:7px 7px 0 #181715}
  .meridian-globe-panel h4{font-size:.7rem;font-weight:800;color:#181715;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px;display:flex;align-items:center;gap:8px}
  .meridian-globe-panel h4::before{content:'';width:8px;height:8px;border-radius:50%;background:#e17a5d}
  .meridian-globe-feed{display:flex;flex-direction:column;gap:6px}
  .meridian-globe-item{padding:10px 12px;background:#f4efe5;border-radius:10px;border:1px solid #e5e0d6}
  .meridian-globe-item .item-user{font-size:.65rem;font-weight:700;color:#e17a5d}
  .meridian-globe-item .item-text{font-size:.7rem;color:#54504a;line-height:1.4;margin-top:2px}
  .meridian-globe-stats{position:absolute;top:30px;right:-10px;display:flex;flex-direction:column;gap:12px}
  .meridian-globe-stat{padding:14px 18px;background:#181715;border-radius:16px;color:#fffaf0;text-align:center;min-width:90px}
  .meridian-globe-stat .stat-num{font-size:1.3rem;font-weight:900;color:#e17a5d}
  .meridian-globe-stat .stat-label{font-size:.6rem;color:#9a9590;text-transform:uppercase;letter-spacing:.08em}
  @media(max-width:900px){
    .meridian-globe-hero{grid-template-columns:1fr;text-align:center;padding:80px 20px 60px}
    .meridian-globe-content{align-items:center}
    .meridian-globe-desc{margin:0 auto}
    .meridian-globe-cta{justify-content:center}
    .meridian-globe-visual{order:-1}
    .meridian-globe-canvas{max-width:300px}
    .meridian-globe-panel{left:auto;right:auto;bottom:-10px;width:90%;max-width:280px}
    .meridian-globe-stats{flex-direction:row;top:auto;right:auto;bottom:-60px;left:50%;transform:translateX(-50%)}
  }
</style>

<section class="meridian-globe-hero" id="meridian-globe">
  <div class="meridian-globe-content">
    <div class="meridian-globe-badge"><span class="dot"></span><span>Global Pulse / En Vivo</span></div>
    <h2 class="meridian-globe-title">Tu negocio.<br><em>Una sola inteligencia.</em></h2>
    <p class="meridian-globe-desc">Meridian conecta CRM, tareas, calendario, notas y analíticas en un solo sistema potenciado por IA. Monitorea actividad global en tiempo real.</p>
    <div class="meridian-globe-cta">
      <a class="cta-primary" href="#meridian">Conocer Meridian</a>
      <a class="cta-secondary" href="#chat">Hablar con IA</a>
    </div>
  </div>
  <div class="meridian-globe-visual">
    <div class="meridian-globe-canvas">
      <canvas id="meridian-globe-canvas"></canvas>
    </div>
    <div class="meridian-globe-panel">
      <h4>Actividad Reciente</h4>
      <div class="meridian-globe-feed" id="meridian-feed">
        <div class="meridian-globe-item">
          <div class="item-user">Sistema Meridian</div>
          <div class="item-text">Conexión establecida con el nodo principal.</div>
        </div>
        <div class="meridian-globe-item">
          <div class="item-user">CRM</div>
          <div class="item-text">42 clientes activos monitoreados.</div>
        </div>
        <div class="meridian-globe-item">
          <div class="item-user">Tareas</div>
          <div class="item-text">18 tareas en progreso, 3 completadas hoy.</div>
        </div>
      </div>
    </div>
    <div class="meridian-globe-stats">
      <div class="meridian-globe-stat"><div class="stat-num">42</div><div class="stat-label">Clientes</div></div>
      <div class="meridian-globe-stat"><div class="stat-num">18</div><div class="stat-label">Tareas</div></div>
      <div class="meridian-globe-stat"><div class="stat-num">99%</div><div class="stat-label">Uptime</div></div>
    </div>
  </div>
</section>
`);

(function(){
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/dist/index.min.js';
  script.onload = function(){
    setTimeout(function(){
      var canvas = document.getElementById('meridian-globe-canvas');
      if(!canvas || typeof createGlobe === 'undefined') return;
      var pointer = null;
      var drag = {phi:0,theta:0};
      var phiOff = 0;
      var thetaOff = 0;
      var paused = false;
      var phi = 0;
      var globe = null;

      canvas.addEventListener('pointerdown', function(e){
        pointer = {x:e.clientX,y:e.clientY};
        canvas.style.cursor = 'grabbing';
        paused = true;
      });
      window.addEventListener('pointerup', function(){
        if(pointer){
          phiOff += drag.phi;
          thetaOff += drag.theta;
          drag = {phi:0,theta:0};
        }
        pointer = null;
        if(canvas) canvas.style.cursor = 'grab';
        paused = false;
      });
      window.addEventListener('pointermove', function(e){
        if(pointer){
          drag = {
            phi: (e.clientX - pointer.x)/300,
            theta: (e.clientY - pointer.y)/1000
          };
        }
      });

      function init(){
        var w = canvas.offsetWidth;
        if(w === 0) return;
        globe = createGlobe(canvas, {
          devicePixelRatio: Math.min(window.devicePixelRatio||1,2),
          width: w, height: w,
          phi: 0, theta: 0.15, dark: 0, diffuse: 1.2,
          mapSamples: 12000, mapBrightness: 6,
          baseColor: [0.957,0.937,0.898],
          markerColor: [0.882,0.478,0.365],
          glowColor: [0.957,0.937,0.898],
          markerElevation: 0.03,
          markers: [
            {location:[18.4861,-69.9312],size:0.04},
            {location:[40.71,-74.01],size:0.025},
            {location:[51.51,-0.13],size:0.025},
            {location:[35.68,139.65],size:0.025},
            {location:[-33.87,151.21],size:0.02},
            {location:[-23.55,-46.63],size:0.02},
            {location:[19.43,-99.13],size:0.025}
          ]
        });
        function animate(){
          if(!paused) phi += 0.002;
          globe.update({
            phi: phi + phiOff + drag.phi,
            theta: 0.15 + thetaOff + drag.theta
          });
          requestAnimationFrame(animate);
        }
        animate();
      }

      if(canvas.offsetWidth > 0) init();
      else{
        var ro = new ResizeObserver(function(e){
          if(e[0]&&e[0].contentRect.width>0){ro.disconnect();init();}
        });
        ro.observe(canvas);
      }
    }, 200);
  };
  document.head.appendChild(script);

  var origHero = document.getElementById('inicio');
  if(origHero) origHero.style.display = 'none';
})();
