window.__MERIDIAN_CHUNKS.push(`
<style>
  .meridian-live-world{position:relative;min-height:100vh;padding:110px 34px 72px;background:#080808;color:#f7f2ea;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.08);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
  .meridian-live-world *{box-sizing:border-box}
  .meridian-live-world::before{content:'';position:absolute;inset:-20%;background:radial-gradient(circle at 72% 30%,rgba(225,122,93,.16),transparent 25%),radial-gradient(circle at 15% 12%,rgba(255,255,255,.06),transparent 22%),linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:auto,auto,44px 44px,44px 44px;mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.95) 72%,transparent 100%);pointer-events:none}
  .meridian-live-shell{position:relative;z-index:2;max-width:1480px;margin:0 auto}
  .meridian-live-top{display:grid;grid-template-columns:minmax(0,.82fr) minmax(520px,1.18fr);gap:52px;align-items:center}
  .meridian-live-copy{max-width:650px}
  .meridian-live-kicker{display:inline-flex;align-items:center;gap:10px;padding:9px 13px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(255,255,255,.04);backdrop-filter:blur(12px);font-size:11px;font-weight:750;letter-spacing:.14em;text-transform:uppercase;color:#c9c3bb}
  .meridian-live-kicker i{display:block;width:8px;height:8px;border-radius:50%;background:#e17a5d;box-shadow:0 0 0 5px rgba(225,122,93,.12),0 0 24px rgba(225,122,93,.7);animation:meridianLiveBlink 1.8s ease-in-out infinite}
  @keyframes meridianLiveBlink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.48;transform:scale(.78)}}
  .meridian-live-title{margin:24px 0 18px;font-size:clamp(3.5rem,7vw,7rem);line-height:.86;letter-spacing:-.067em;font-weight:850;color:#f7f2ea}
  .meridian-live-title span{display:block;color:#e17a5d}
  .meridian-live-desc{max-width:580px;margin:0;color:#9f9a93;font-size:clamp(1rem,1.5vw,1.18rem);line-height:1.7}
  .meridian-live-note{display:flex;gap:10px;align-items:flex-start;margin-top:20px;color:#6e6a65;font-size:12px;line-height:1.5}
  .meridian-live-note b{color:#9b958e;font-weight:650}
  .meridian-live-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
  .meridian-live-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:12px;text-decoration:none;font-size:13px;font-weight:750;transition:.2s ease}
  .meridian-live-actions .primary{background:#f4efe5;color:#111;border:1px solid #f4efe5}
  .meridian-live-actions .primary:hover{transform:translateY(-2px);background:#fff}
  .meridian-live-actions .secondary{background:rgba(255,255,255,.04);color:#d8d2ca;border:1px solid rgba(255,255,255,.12)}
  .meridian-live-actions .secondary:hover{border-color:rgba(225,122,93,.55);color:#fff}
  .meridian-live-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:38px}
  .meridian-live-metric{padding:16px 14px;border:1px solid rgba(255,255,255,.09);border-radius:15px;background:rgba(255,255,255,.025);min-width:0}
  .meridian-live-metric strong{display:block;font-size:clamp(1.45rem,2.6vw,2.2rem);letter-spacing:-.04em;color:#fff;font-weight:820;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .meridian-live-metric span{display:block;margin-top:5px;font-size:9px;line-height:1.3;letter-spacing:.13em;text-transform:uppercase;color:#77726d;font-weight:760}
  .meridian-world-visual{position:relative;min-height:680px;display:flex;align-items:center;justify-content:center}
  .meridian-world-orbit{position:absolute;width:min(690px,90%);aspect-ratio:1;border:1px solid rgba(255,255,255,.06);border-radius:50%;box-shadow:0 0 0 60px rgba(255,255,255,.015),0 0 0 120px rgba(255,255,255,.01);pointer-events:none}
  .meridian-world-orbit::before,.meridian-world-orbit::after{content:'';position:absolute;inset:12%;border:1px dashed rgba(225,122,93,.11);border-radius:50%;transform:rotate(28deg) scaleY(.38)}
  .meridian-world-orbit::after{inset:25%;transform:rotate(-22deg) scaleY(.62);border-color:rgba(255,255,255,.07)}
  .meridian-world-frame{position:relative;width:min(650px,92vw);aspect-ratio:1;display:flex;align-items:center;justify-content:center;transition:filter .25s ease}
  .meridian-world-frame.is-pulsing{filter:drop-shadow(0 0 26px rgba(225,122,93,.45))}
  .meridian-world-frame::after{content:'';position:absolute;inset:7%;border:1px solid rgba(225,122,93,.08);border-radius:50%;pointer-events:none;animation:meridianWorldHalo 3.2s ease-out infinite}
  @keyframes meridianWorldHalo{0%{transform:scale(.9);opacity:.45}75%,100%{transform:scale(1.08);opacity:0}}
  #meridian-globe-canvas{width:100%;height:100%;display:block;cursor:grab;touch-action:none;filter:drop-shadow(0 30px 70px rgba(0,0,0,.72))}
  #meridian-globe-canvas:active{cursor:grabbing}
  .meridian-world-status{position:absolute;top:8%;left:4%;z-index:4;display:flex;align-items:center;gap:9px;padding:10px 12px;border-radius:11px;border:1px solid rgba(255,255,255,.1);background:rgba(10,10,10,.72);backdrop-filter:blur(18px);font-size:10px;font-weight:760;letter-spacing:.12em;text-transform:uppercase;color:#8f8a84}
  .meridian-world-status i{width:6px;height:6px;border-radius:50%;background:#777;transition:.2s ease}
  .meridian-world-status.online i{background:#6ee7a2;box-shadow:0 0 18px rgba(110,231,162,.7)}
  .meridian-world-status.online{color:#c4c0ba}
  .meridian-world-caption{position:absolute;right:3%;bottom:10%;z-index:4;width:205px;padding:14px 15px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(10,10,10,.72);backdrop-filter:blur(18px)}
  .meridian-world-caption small{display:block;color:#6f6a65;font-size:9px;letter-spacing:.12em;text-transform:uppercase;font-weight:760}
  .meridian-world-caption strong{display:block;margin-top:6px;color:#eee8df;font-size:13px;line-height:1.45;font-weight:650}
  .meridian-world-controls{position:absolute;left:4%;bottom:10%;z-index:4;padding:10px 12px;border:1px solid rgba(255,255,255,.09);border-radius:11px;background:rgba(10,10,10,.66);backdrop-filter:blur(16px);color:#8e8982;font-size:9px;letter-spacing:.08em;text-transform:uppercase;pointer-events:none}
  .meridian-live-panels{display:grid;grid-template-columns:1.18fr .9fr .82fr;gap:12px;margin-top:26px}
  .meridian-live-panel{min-height:310px;border:1px solid rgba(255,255,255,.09);border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.02));overflow:hidden}
  .meridian-live-panel-head{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.07)}
  .meridian-live-panel-head h3{margin:0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#b9b3ac;font-weight:800}
  .meridian-live-panel-head span{font-size:10px;color:#5f5b57}
  .meridian-live-feed,.meridian-review-list,.meridian-city-list{padding:8px;max-height:380px;overflow:auto;scrollbar-width:thin;scrollbar-color:#252525 transparent}
  .meridian-live-row{display:grid;grid-template-columns:32px minmax(0,1fr) auto;gap:11px;align-items:center;padding:12px 10px;border-radius:12px;transition:.18s ease}
  .meridian-live-row:hover{background:rgba(255,255,255,.035)}
  .meridian-live-row .event-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:rgba(225,122,93,.11);border:1px solid rgba(225,122,93,.13);font-size:12px;color:#e59a83}
  .meridian-live-row strong{display:block;color:#e7e1d9;font-size:12px;font-weight:670;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .meridian-live-row small{display:block;margin-top:3px;color:#6f6a65;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .meridian-live-row time{font-size:9px;color:#5e5955;text-align:right}
  .meridian-empty{padding:36px 18px;color:#68635e;font-size:11px;line-height:1.7;text-align:center}
  .meridian-review{padding:14px 12px;border-bottom:1px solid rgba(255,255,255,.055)}
  .meridian-review:last-child{border-bottom:0}
  .meridian-review-stars{font-size:10px;letter-spacing:2px;color:#e17a5d}
  .meridian-review p{margin:8px 0 10px;color:#c9c2ba;font-size:12px;line-height:1.55}
  .meridian-review footer{display:flex;justify-content:space-between;gap:12px;color:#68635f;font-size:9px}
  .meridian-review footer b{color:#8f8983;font-weight:650}
  .meridian-city{display:grid;grid-template-columns:10px minmax(0,1fr) auto;gap:10px;align-items:center;padding:12px 11px;border-bottom:1px solid rgba(255,255,255,.05)}
  .meridian-city:last-child{border-bottom:0}
  .meridian-city i{width:7px;height:7px;border-radius:50%;background:#e17a5d;box-shadow:0 0 16px rgba(225,122,93,.45)}
  .meridian-city strong{font-size:11px;color:#d0c9c1;font-weight:650;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .meridian-city span{font-size:9px;color:#68635e}
  .meridian-live-footnote{margin:18px 2px 0;color:#514d49;font-size:9px;line-height:1.55;text-align:right}
  @media(max-width:1080px){.meridian-live-top{grid-template-columns:1fr}.meridian-live-copy{max-width:780px}.meridian-world-visual{min-height:560px}.meridian-live-panels{grid-template-columns:1fr 1fr}.meridian-live-panel:first-child{grid-column:1/-1}}
  @media(max-width:720px){.meridian-live-world{padding:88px 16px 50px}.meridian-live-title{font-size:clamp(3.1rem,17vw,5.2rem)}.meridian-live-metrics{grid-template-columns:1fr 1fr}.meridian-world-visual{min-height:430px;margin-top:20px}.meridian-world-status{top:4%;left:0}.meridian-world-caption{right:0;bottom:2%;width:180px}.meridian-live-panels{grid-template-columns:1fr}.meridian-live-panel:first-child{grid-column:auto}.meridian-live-panel{min-height:250px}}
  @media(prefers-reduced-motion:reduce){.meridian-live-kicker i,.meridian-world-frame::after{animation:none}.meridian-live-actions a{transition:none}}
</style>
<section class="meridian-live-world" id="meridian-globe" aria-label="Meridian Live World">
  <div class="meridian-live-shell">
    <div class="meridian-live-top">
      <div class="meridian-live-copy">
        <div class="meridian-live-kicker"><i></i><span>Meridian completo · señal en vivo</span></div>
        <h2 class="meridian-live-title">Meridian está<span>vivo.</span></h2>
        <p class="meridian-live-desc">Una vista en tiempo real de la actividad pública y agregada del ecosistema Meridian. Cada pulso del globo proviene de una sesión o evento real de Meridian completo.</p>
        <div class="meridian-live-note"><span>◎</span><span><b>Privacidad por diseño:</b> solo mostramos ciudad/país aproximados y actividad de producto. Nunca emails, IP, chats, documentos, CRM ni ubicación exacta.</span></div>
        <div class="meridian-live-actions"><a class="primary" href="https://meridian-completo.vercel.app/">Abrir Meridian</a><a class="secondary" href="#meridian-live-activity">Ver actividad global</a></div>
        <div class="meridian-live-metrics">
          <div class="meridian-live-metric"><strong id="mw-online">0</strong><span>Online ahora</span></div>
          <div class="meridian-live-metric"><strong id="mw-today">0</strong><span>Eventos hoy</span></div>
          <div class="meridian-live-metric"><strong id="mw-countries">0</strong><span>Países activos</span></div>
          <div class="meridian-live-metric"><strong id="mw-reviews">0</strong><span>Reseñas públicas</span></div>
        </div>
      </div>
      <div class="meridian-world-visual" aria-hidden="true">
        <div class="meridian-world-orbit"></div>
        <div class="meridian-world-frame" id="meridian-world-frame"><canvas id="meridian-globe-canvas" tabindex="0" aria-label="Globo 3D interactivo de Meridian. Arrastra para girar y usa la rueda para acercar."></canvas></div>
        <div class="meridian-world-status" id="mw-status"><i></i><span id="mw-status-text">Conectando Realtime</span></div><div class="meridian-world-controls" aria-live="polite">Arrastra para explorar · rueda para acercar</div>
        <div class="meridian-world-caption"><small>Última señal</small><strong id="mw-last-signal">Esperando actividad real…</strong></div>
      </div>
    </div>
    <div class="meridian-live-panels" id="meridian-live-activity">
      <section class="meridian-live-panel">
        <div class="meridian-live-panel-head"><h3>Live Activity</h3><span>Meridian completo</span></div>
        <div class="meridian-live-feed" id="mw-feed"><div class="meridian-empty">Conectando con la actividad real de Meridian…</div></div>
      </section>
      <section class="meridian-live-panel">
        <div class="meridian-live-panel-head"><h3>Community Reviews</h3><span>Verificadas</span></div>
        <div class="meridian-review-list" id="mw-review-list"><div class="meridian-empty">Las reseñas aprobadas aparecerán aquí en tiempo real.</div></div>
      </section>
      <section class="meridian-live-panel">
        <div class="meridian-live-panel-head"><h3>Active Locations</h3><span>Agregado</span></div>
        <div class="meridian-city-list" id="mw-city-list"><div class="meridian-empty">Esperando ciudades activas…</div></div>
      </section>
    </div>
    <div class="meridian-live-footnote">Datos públicos agregados desde Supabase Realtime · coordenadas reducidas a precisión de ciudad.</div>
  </div>
</section>
`);

(function(){
  var SUPABASE_URL = "https://ywhufiiecrgtosmfsyug.supabase.co";
  var SUPABASE_PUBLISHABLE_KEY = "sb_publishable_JG73DLHFCShOifFilpIUSw_i8nUFoDC";
  var state = { events: [], reviews: [], presence: [], todayCount: 0, reviewCount: 0, countries: 0 };
  var globe = null;
  var currentMarkers = [];
  var pointer = null;
  var drag = { phi: 0, theta: 0 };
  var phiOffset = 0;
  var thetaOffset = 0;
  var paused = false;
  var phi = 0;

  function $(id){ return document.getElementById(id); }
  function escapeHtml(value){ return String(value == null ? "" : value).replace(/[&<>"']/g,function(ch){ return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"})[ch]; }); }
  function formatNumber(value){ try{return new Intl.NumberFormat("es-DO",{notation:value>9999?"compact":"standard",maximumFractionDigits:1}).format(value||0);}catch(e){return String(value||0);} }
  function countryName(code){ if(!code)return "Ubicación privada"; try{var d=new Intl.DisplayNames(["es"],{type:"region"});return d.of(code)||code;}catch(e){return code;} }
  function humanTime(iso){
    var t = new Date(iso).getTime(); if(!t)return "ahora";
    var s = Math.max(0,Math.round((Date.now()-t)/1000));
    if(s<10)return "ahora"; if(s<60)return "hace "+s+"s"; if(s<3600)return "hace "+Math.floor(s/60)+"m"; if(s<86400)return "hace "+Math.floor(s/3600)+"h"; return "hace "+Math.floor(s/86400)+"d";
  }
  function moduleFromPath(path){
    path = String(path||"").toLowerCase();
    if(path.indexOf("ai-workspace")>=0||path.indexOf("/ai")>=0)return "AI Workspace";
    if(path.indexOf("crm")>=0)return "CRM";
    if(path.indexOf("task")>=0)return "Tasks";
    if(path.indexOf("calendar")>=0)return "Calendar";
    if(path.indexOf("note")>=0)return "Notes";
    if(path.indexOf("analytic")>=0)return "Analytics";
    if(path.indexOf("skill")>=0)return "Skills";
    if(path.indexOf("integration")>=0)return "Integrations";
    if(path.indexOf("dashboard")>=0)return "Dashboard";
    return "Meridian";
  }
  function eventCopy(event){
    var type = event.event_type || "activity";
    if(type==="session_start")return ["Nueva sesión activa","Usuario conectado a Meridian"];
    if(type==="login")return ["Inicio de sesión","Acceso verificado a Meridian"];
    if(type==="signup")return ["Nuevo usuario","Cuenta creada en Meridian"];
    if(type==="feature_use")return ["Función utilizada","Actividad dentro de "+moduleFromPath(event.path)];
    if(type==="export")return ["Exportación completada","Trabajo exportado desde Meridian"];
    if(type==="search")return ["Búsqueda en Meridian","Explorando el workspace"];
    if(type==="page_view")return ["Actividad en "+moduleFromPath(event.path),"Navegación dentro de Meridian"];
    return ["Actividad de Meridian","Evento de producto"];
  }
  function eventIcon(type){ if(type==="session_start"||type==="login")return "●"; if(type==="signup")return "+"; if(type==="search")return "⌕"; if(type==="export")return "↗"; if(type==="feature_use")return "✦"; return "◎"; }
  function locationLabel(item){ return item.city ? item.city+" · "+countryName(item.country_code||item.countryCode) : countryName(item.country_code||item.countryCode); }

  function flashWorld(){ var frame=$("meridian-world-frame"); if(!frame)return; frame.classList.remove("is-pulsing"); void frame.offsetWidth; frame.classList.add("is-pulsing"); setTimeout(function(){frame.classList.remove("is-pulsing");},900); }

  function buildMarkers(){
    var groups = {};
    function add(lat,lng,weight){ if(typeof lat!=="number"||typeof lng!=="number"||!isFinite(lat)||!isFinite(lng))return; var key=lat.toFixed(1)+","+lng.toFixed(1); if(!groups[key])groups[key]={lat:lat,lng:lng,count:0}; groups[key].count+=weight||1; }
    state.presence.forEach(function(p){ add(Number(p.latitude),Number(p.longitude),2); });
    state.events.slice(0,45).forEach(function(e){ add(Number(e.latitude),Number(e.longitude),1); });
    currentMarkers = Object.keys(groups).slice(0,45).map(function(key){ var g=groups[key]; return { location:[g.lat,g.lng], size:Math.min(.075,.018+(Math.log(g.count+1)*.012)) }; });
  }

  function renderStats(){
    if($("mw-online")) $("mw-online").textContent=formatNumber(state.presence.length);
    if($("mw-today")) $("mw-today").textContent=formatNumber(state.todayCount);
    if($("mw-countries")) $("mw-countries").textContent=formatNumber(state.countries);
    if($("mw-reviews")) $("mw-reviews").textContent=formatNumber(state.reviewCount);
  }
  function renderFeed(){
    var root=$("mw-feed"); if(!root)return;
    if(!state.events.length){root.innerHTML='<div class="meridian-empty">Todavía no hay actividad pública registrada. La primera sesión real de Meridian aparecerá aquí.</div>';return;}
    root.innerHTML=state.events.slice(0,12).map(function(e){var copy=eventCopy(e);return '<div class="meridian-live-row"><div class="event-icon">'+escapeHtml(eventIcon(e.event_type))+'</div><div><strong>'+escapeHtml(copy[0])+'</strong><small>'+escapeHtml(locationLabel(e))+' · '+escapeHtml(copy[1])+'</small></div><time>'+escapeHtml(humanTime(e.created_at))+'</time></div>';}).join('');
    var latest=state.events[0]; var copy=eventCopy(latest); if($("mw-last-signal"))$("mw-last-signal").textContent=copy[0]+" · "+locationLabel(latest);
  }
  function renderReviews(){
    var root=$("mw-review-list"); if(!root)return;
    if(!state.reviews.length){root.innerHTML='<div class="meridian-empty">Aún no hay reseñas públicas aprobadas. Cuando exista una, entrará aquí automáticamente.</div>';return;}
    root.innerHTML=state.reviews.slice(0,8).map(function(r){var stars='★★★★★'.slice(0,Math.max(1,Math.min(5,Number(r.rating)||5)));return '<article class="meridian-review"><div class="meridian-review-stars">'+stars+'</div><p>“'+escapeHtml(r.comment)+'”</p><footer><b>'+escapeHtml(r.display_name||'Meridian user')+'</b><span>'+escapeHtml(locationLabel(r))+' · '+escapeHtml(humanTime(r.created_at))+'</span></footer></article>';}).join('');
  }
  function renderCities(){
    var root=$("mw-city-list"); if(!root)return;
    var map={};
    state.presence.forEach(function(p){var label=locationLabel(p);if(label==="Ubicación privada")return; map[label]=(map[label]||0)+1;});
    state.events.slice(0,80).forEach(function(e){var label=locationLabel(e);if(label==="Ubicación privada")return;if(!map[label])map[label]=0;});
    var entries=Object.keys(map).map(function(k){return [k,map[k]];}).sort(function(a,b){return b[1]-a[1];}).slice(0,10);
    if(!entries.length){root.innerHTML='<div class="meridian-empty">Las ubicaciones reales aparecerán cuando haya sesiones o actividad con geolocalización disponible.</div>';return;}
    root.innerHTML=entries.map(function(entry){return '<div class="meridian-city"><i></i><strong>'+escapeHtml(entry[0])+'</strong><span>'+ (entry[1]>0?escapeHtml(entry[1]+" online"):"actividad reciente") +'</span></div>';}).join('');
  }
  function renderAll(){buildMarkers();renderStats();renderFeed();renderReviews();renderCities();}

  function initGlobe(){
    var canvas=$("meridian-globe-canvas"); if(!canvas||typeof createGlobe==="undefined"||globe)return;
    var size=Math.max(340,Math.round(canvas.getBoundingClientRect().width||620));
    var zoom=1;
    globe=createGlobe(canvas,{devicePixelRatio:Math.min(window.devicePixelRatio||1,2),width:size*2,height:size*2,phi:0,theta:.18,scale:zoom,dark:1,diffuse:1.25,mapSamples:18000,mapBrightness:7.5,baseColor:[.17,.17,.17],markerColor:[.88,.48,.36],glowColor:[.07,.055,.045],markers:currentMarkers,markerElevation:.035});
    canvas.addEventListener('pointerdown',function(e){pointer={x:e.clientX,y:e.clientY};paused=true;canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing';});
    canvas.addEventListener('pointerup',function(e){if(pointer){phiOffset+=drag.phi;thetaOffset+=drag.theta;drag={phi:0,theta:0};}pointer=null;paused=false;canvas.releasePointerCapture&&canvas.releasePointerCapture(e.pointerId);canvas.style.cursor='grab';});
    canvas.addEventListener('pointercancel',function(){pointer=null;drag={phi:0,theta:0};paused=false;canvas.style.cursor='grab';});
    canvas.addEventListener('pointermove',function(e){if(pointer){drag={phi:(e.clientX-pointer.x)/300,theta:(e.clientY-pointer.y)/1000};}});
    canvas.addEventListener('wheel',function(e){e.preventDefault();zoom=Math.max(.78,Math.min(1.34,zoom+(e.deltaY<0?.06:-.06)));if(globe)globe.update({scale:zoom});},{passive:false});
    function animate(){if(!paused)phi+=.0017; if(globe)globe.update({phi:phi+phiOffset+drag.phi,theta:.18+thetaOffset+drag.theta,scale:zoom,markers:currentMarkers}); requestAnimationFrame(animate);} animate();
  }

  function loadGlobe(){
    if(typeof createGlobe!=="undefined"){initGlobe();return;}
    var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/cobe@0.6.3/dist/index.min.js';s.async=true;s.onload=initGlobe;s.onerror=function(){if($("mw-status-text"))$("mw-status-text").textContent='Globo no disponible';};document.head.appendChild(s);
  }

  async function connectRealtime(){
    try{
      var mod=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.110.7/+esm');
      var client=mod.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{'x-client-info':'meridian-design-live-world'}}});
      var start=new Date();start.setHours(0,0,0,0);var startIso=start.toISOString();
      var results=await Promise.all([
        client.from('meridian_live_events').select('id,event_type,path,city,country_code,latitude,longitude,source,created_at').order('created_at',{ascending:false}).limit(80),
        client.from('meridian_live_events').select('id',{count:'exact',head:true}).gte('created_at',startIso),
        client.from('meridian_live_events').select('country_code').gte('created_at',startIso).limit(1000),
        client.from('meridian_live_reviews').select('id,display_name,rating,comment,city,country_code,created_at').order('created_at',{ascending:false}).limit(12),
        client.from('meridian_live_reviews').select('id',{count:'exact',head:true})
      ]);
      state.events=results[0].data||[];
      state.todayCount=results[1].count||0;
      var countrySet={};(results[2].data||[]).forEach(function(r){if(r.country_code)countrySet[r.country_code]=1;});state.countries=Object.keys(countrySet).length;
      state.reviews=results[3].data||[];state.reviewCount=results[4].count||0;
      renderAll();

      var presenceChannel=client.channel('meridian-world');
      function syncPresence(){var raw=presenceChannel.presenceState();var flattened=[];Object.keys(raw||{}).forEach(function(key){(raw[key]||[]).forEach(function(p){if(p&&p.source==='meridian-completo')flattened.push(p);});});var seen={};state.presence=flattened.filter(function(p){var k=p.sessionId||Math.random().toString(36);if(seen[k])return false;seen[k]=1;return true;});var pc={};state.presence.forEach(function(p){if(p.countryCode)pc[p.countryCode]=1;});Object.keys(pc).forEach(function(k){countrySet[k]=1;});state.countries=Object.keys(countrySet).length;renderAll();}
      presenceChannel.on('presence',{event:'sync'},syncPresence).on('presence',{event:'join'},function(){flashWorld();}).subscribe(function(status){if(status==='SUBSCRIBED'){var el=$("mw-status");if(el)el.classList.add('online');if($("mw-status-text"))$("mw-status-text").textContent='Supabase Realtime conectado';}});

      client.channel('meridian-live-world-db')
        .on('postgres_changes',{event:'INSERT',schema:'public',table:'meridian_live_events'},function(payload){var row=payload.new||{};state.events.unshift(row);state.events=state.events.slice(0,100);var created=new Date(row.created_at);if(created>=start)state.todayCount+=1;if(row.country_code){countrySet[row.country_code]=1;state.countries=Object.keys(countrySet).length;}flashWorld();renderAll();})
        .on('postgres_changes',{event:'INSERT',schema:'public',table:'meridian_live_reviews'},function(payload){var row=payload.new||{};if(row.is_approved===false)return;state.reviews.unshift(row);state.reviews=state.reviews.slice(0,20);state.reviewCount+=1;flashWorld();renderAll();})
        .subscribe();
    }catch(error){
      if($("mw-status-text"))$("mw-status-text").textContent='Realtime temporalmente no disponible';
      var feed=$("mw-feed");if(feed)feed.innerHTML='<div class="meridian-empty">No se pudo conectar con Supabase Realtime. El globo seguirá disponible y reintentará al recargar.</div>';
    }
  }

  loadGlobe();
  connectRealtime();
  var originalHero=document.getElementById('inicio');if(originalHero)originalHero.style.display='none';
})();
