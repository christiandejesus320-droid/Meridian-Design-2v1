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
  var last=performance.now();

  function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
  function validCoord(lat,lng){return Number.isFinite(lat)&&Number.isFinite(lng)&&lat>=-90&&lat<=90&&lng>=-180&&lng<=180;}
  function pulse(){
    frame.classList.remove('sky-pulse');
    void frame.offsetWidth;
    frame.classList.add('sky-pulse');
    setTimeout(function(){frame.classList.remove('sky-pulse');},900);
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
    currentMarkers=merged.slice(0,32);
  }
  function groupPresence(state){
    var groups=new Map();
    Object.keys(state||{}).forEach(function(key){
      var entries=state[key]||[];
      entries.forEach(function(p){
        var lat=Number(p.latitude),lng=Number(p.longitude);
        if(!validCoord(lat,lng))return;
        var k=lat.toFixed(2)+':'+lng.toFixed(2);
        var existing=groups.get(k)||{lat:lat,lng:lng,count:0};
        existing.count+=1;
        groups.set(k,existing);
      });
    });
    onlineMarkers=Array.from(groups.values()).map(function(g){
      return {location:[g.lat,g.lng],size:Math.min(.07,.022+Math.log2(g.count+1)*.012)};
    });
    rebuildMarkers();
  }
  function addEventSignal(row){
    if(!row)return;
    var lat=Number(row.latitude),lng=Number(row.longitude);
    if(!validCoord(lat,lng))return;
    eventMarkers.unshift({location:[lat,lng],size:.024});
    eventMarkers=eventMarkers.slice(0,18);
    rebuildMarkers();
    pulse();
  }

  try{
    var cobeMod=await import('https://cdn.jsdelivr.net/npm/cobe@0.6.3/+esm');
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
      diffuse:2.15,
      mapSamples:24000,
      mapBrightness:10.5,
      baseColor:[.055,.20,.30],
      markerColor:[.22,.74,1],
      glowColor:[.07,.34,.52],
      markerElevation:.07,
      markers:currentMarkers
    });

    function animate(now){
      var dt=Math.min(40,Math.max(0,now-last));
      last=now;
      if(!dragging)phi+=dt*.00012;
      var breathing=Math.sin(now/5200)*.035;
      if(globe){
        globe.update({
          phi:phi+phiOffset+drag.phi,
          theta:clamp(.23+thetaOffset+drag.theta+breathing,-.62,.72),
          markers:currentMarkers
        });
      }
      raf=requestAnimationFrame(animate);
    }
    raf=requestAnimationFrame(animate);

    canvas.addEventListener('pointerdown',function(e){
      pointer={x:e.clientX,y:e.clientY};
      dragging=true;
      canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor='grabbing';
    });
    canvas.addEventListener('pointermove',function(e){
      if(!pointer)return;
      drag.phi=(e.clientX-pointer.x)/175;
      drag.theta=(e.clientY-pointer.y)/540;
    });
    function release(){
      if(pointer){
        phiOffset+=drag.phi;
        thetaOffset=clamp(thetaOffset+drag.theta,-.42,.42);
      }
      pointer=null;
      drag={phi:0,theta:0};
      dragging=false;
      canvas.style.cursor='grab';
    }
    canvas.addEventListener('pointerup',release);
    canvas.addEventListener('pointercancel',release);
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

    var recent=await client.from('meridian_live_events').select('latitude,longitude,created_at').not('latitude','is',null).not('longitude','is',null).order('created_at',{ascending:false}).limit(18);
    if(recent.data){
      eventMarkers=recent.data.filter(function(r){return validCoord(Number(r.latitude),Number(r.longitude));}).map(function(r){return {location:[Number(r.latitude),Number(r.longitude)],size:.022};});
      rebuildMarkers();
    }

    var presence=client.channel('meridian-world',{config:{presence:{key:'viewer-'+Math.random().toString(36).slice(2)}}});
    presence.on('presence',{event:'sync'},function(){groupPresence(presence.presenceState());});
    presence.on('presence',{event:'join'},function(){groupPresence(presence.presenceState());pulse();});
    presence.on('presence',{event:'leave'},function(){groupPresence(presence.presenceState());});
    presence.subscribe();

    var events=client.channel('meridian-world-sky-events');
    events.on('postgres_changes',{event:'INSERT',schema:'public',table:'meridian_live_events'},function(payload){addEventSignal(payload.new);});
    events.subscribe();
  }catch(err){
    console.error('[Meridian World] realtime globe feed error',err);
  }
})();
