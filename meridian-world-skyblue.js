(async function(){
  var frame=document.getElementById('meridian-world-frame');
  var oldCanvas=document.getElementById('meridian-globe-canvas');
  if(!frame||!oldCanvas)return;

  var canvas=document.createElement('canvas');
  canvas.id='meridian-globe-canvas-sky';
  canvas.setAttribute('aria-label','Meridian Live World 3D');
  oldCanvas.replaceWith(canvas);

  var SUPABASE_URL='https://ywhufiiecrgtosmfsyug.supabase.co';
  var SUPABASE_KEY='sb_publishable_JG73DLHFCShOifFilpIUSw_i8nUFoDC';
  var globe=null;
  var currentMarkers=[];
  var onlineMarkers=[];
  var eventMarkers=[];
  var phi=0;
  var phiOffset=0;
  var thetaOffset=0;
  var drag={phi:0,theta:0};
  var pointer=null;
  var dragging=false;
  var raf=0;

  var COUNTRY_FALLBACKS={
    DO:[18.7,-70.2],US:[39.5,-98.4],PR:[18.2,-66.5],CA:[56.1,-106.3],MX:[23.6,-102.5],
    CO:[4.6,-74.3],ES:[40.4,-3.7],GB:[54.8,-4.6],FR:[46.2,2.2],DE:[51.2,10.4],IT:[42.8,12.5],
    PT:[39.4,-8.2],BR:[-14.2,-51.9],AR:[-38.4,-63.6],JP:[36.2,138.3],AU:[-25.3,133.8]
  };

  function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
  function validCoord(lat,lng){return Number.isFinite(lat)&&Number.isFinite(lng)&&lat>=-90&&lat<=90&&lng>=-180&&lng<=180;}
  function pulse(){
    frame.classList.remove('sky-pulse');
    void frame.offsetWidth;
    frame.classList.add('sky-pulse');
    setTimeout(function(){frame.classList.remove('sky-pulse');},900);
  }
  function coordsForPresence(p){
    var lat=Number(p&&p.latitude),lng=Number(p&&p.longitude);
    if(validCoord(lat,lng))return [lat,lng];
    var code=((p&&p.countryCode)||'').toUpperCase();
    return COUNTRY_FALLBACKS[code]||null;
  }
  function rebuildMarkers(){
    var merged=[];
    var seen=new Set();
    onlineMarkers.concat(eventMarkers).forEach(function(m){
      var key=m.location[0].toFixed(2)+':'+m.location[1].toFixed(2);
      if(seen.has(key))return;
      seen.add(key);
      merged.push(m);
    });
    currentMarkers=merged.slice(0,40);
  }
  function groupPresence(state){
    var groups=new Map();
    var total=0;
    Object.keys(state||{}).forEach(function(key){
      var entries=state[key]||[];
      entries.forEach(function(p){
        if(!p||p.source!=='meridian-completo')return;
        total+=1;
        var coords=coordsForPresence(p);
        if(!coords)return;
        var k=coords[0].toFixed(2)+':'+coords[1].toFixed(2);
        var existing=groups.get(k)||{lat:coords[0],lng:coords[1],count:0};
        existing.count+=1;
        groups.set(k,existing);
      });
    });
    onlineMarkers=Array.from(groups.values()).map(function(g){
      return {location:[g.lat,g.lng],size:Math.min(.085,.032+Math.log2(g.count+1)*.014),color:[.22,.74,1]};
    });
    rebuildMarkers();
    var online=document.getElementById('mw-online');
    if(online)online.textContent=String(total);
  }
  function addEventSignal(row){
    if(!row)return;
    var lat=Number(row.latitude),lng=Number(row.longitude);
    if(!validCoord(lat,lng)){
      var fb=COUNTRY_FALLBACKS[String(row.country_code||'').toUpperCase()];
      if(!fb)return;
      lat=fb[0];lng=fb[1];
    }
    eventMarkers.unshift({location:[lat,lng],size:.028,color:[.49,.83,.99]});
    eventMarkers=eventMarkers.slice(0,20);
    rebuildMarkers();
    pulse();
  }

  try{
    var cobeMod=await import('https://cdn.jsdelivr.net/npm/cobe@2.0.1/+esm');
    var create=cobeMod.default;
    var rect=canvas.getBoundingClientRect();
    var cssSize=Math.max(360,Math.round(rect.width||620));
    var dpr=Math.min(window.devicePixelRatio||1,2);

    globe=create(canvas,{
      devicePixelRatio:dpr,
      width:Math.round(cssSize*dpr),
      height:Math.round(cssSize*dpr),
      phi:0,
      theta:.23,
      dark:1,
      diffuse:2.25,
      mapSamples:28000,
      mapBrightness:11.5,
      mapBaseBrightness:.04,
      baseColor:[.035,.18,.29],
      markerColor:[.22,.74,1],
      glowColor:[.08,.40,.62],
      markerElevation:.08,
      markers:currentMarkers
    });

    function animate(){
      if(!dragging)phi+=.0042;
      if(globe){
        globe.update({
          phi:phi+phiOffset+drag.phi,
          theta:clamp(.23+thetaOffset+drag.theta,-.58,.68),
          markers:currentMarkers
        });
      }
      raf=requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener('pointerdown',function(e){
      pointer={x:e.clientX,y:e.clientY};
      dragging=true;
      if(canvas.setPointerCapture)canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor='grabbing';
    });
    canvas.addEventListener('pointermove',function(e){
      if(!pointer)return;
      drag.phi=(e.clientX-pointer.x)/165;
      drag.theta=(e.clientY-pointer.y)/500;
    });
    function release(){
      if(pointer){
        phiOffset+=drag.phi;
        thetaOffset=clamp(thetaOffset+drag.theta,-.38,.38);
      }
      pointer=null;
      drag={phi:0,theta:0};
      dragging=false;
      canvas.style.cursor='grab';
    }
    canvas.addEventListener('pointerup',release);
    canvas.addEventListener('pointercancel',release);
    canvas.addEventListener('pointerleave',function(){if(pointer)release();});
    window.addEventListener('blur',release);

    var ro=new ResizeObserver(function(entries){
      if(!globe||!entries[0])return;
      var w=Math.max(320,Math.round(entries[0].contentRect.width));
      globe.update({width:Math.round(w*dpr),height:Math.round(w*dpr)});
    });
    ro.observe(canvas);
  }catch(err){
    var status=document.getElementById('mw-status-text');
    if(status)status.textContent='Renderer 3D no disponible';
    console.error('[Meridian World] COBE renderer error',err);
    return;
  }

  try{
    var supabaseMod=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.110.7/+esm');
    var client=supabaseMod.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{'x-client-info':'meridian-design-sky-world'}}});

    var recent=await client.from('meridian_live_events').select('latitude,longitude,country_code,created_at').order('created_at',{ascending:false}).limit(20);
    if(recent.data){recent.data.forEach(addEventSignal);}

    var presence=client.channel('meridian-world');
    presence.on('presence',{event:'sync'},function(){groupPresence(presence.presenceState());});
    presence.on('presence',{event:'join'},function(){groupPresence(presence.presenceState());pulse();});
    presence.on('presence',{event:'leave'},function(){groupPresence(presence.presenceState());});
    presence.subscribe(function(status){
      var label=document.getElementById('mw-status-text');
      if(status==='SUBSCRIBED'&&label)label.textContent='Supabase Realtime conectado';
    });

    var events=client.channel('meridian-world-sky-events');
    events.on('postgres_changes',{event:'INSERT',schema:'public',table:'meridian_live_events'},function(payload){addEventSignal(payload.new);});
    events.subscribe();
  }catch(err){
    console.error('[Meridian World] realtime globe feed error',err);
  }
})();
