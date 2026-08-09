(async function(){
  var frame=document.getElementById('meridian-world-frame');
  var oldCanvas=document.getElementById('meridian-globe-canvas');
  if(!frame||!oldCanvas)return;

  var canvas=document.createElement('canvas');
  canvas.id='meridian-globe-canvas-sky';
  canvas.setAttribute('aria-label','Meridian Live World 3D');
  oldCanvas.replaceWith(canvas);

  var labelsLayer=document.createElement('div');
  labelsLayer.id='meridian-live-user-labels';
  labelsLayer.style.cssText='position:absolute;inset:0;z-index:5;pointer-events:none;';
  frame.appendChild(labelsLayer);

  var style=document.createElement('style');
  style.textContent=`
    .meridian-user-marker-label{position:absolute;translate:-50% -10px;min-width:150px;max-width:220px;padding:8px 10px;border:1px solid rgba(125,211,252,.28);border-radius:12px;background:rgba(2,12,20,.86);box-shadow:0 10px 34px rgba(14,165,233,.18),0 0 22px rgba(56,189,248,.12);backdrop-filter:blur(14px);color:#e0f2fe;white-space:nowrap;transition:opacity .18s ease,filter .18s ease,transform .18s ease;pointer-events:none}
    .meridian-user-marker-label .muw-row{display:flex;align-items:center;gap:8px}
    .meridian-user-marker-label .muw-avatar{width:25px;height:25px;border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid rgba(125,211,252,.35);background:rgba(56,189,248,.12);color:#7dd3fc;font:800 10px/1 Inter,system-ui,sans-serif;box-shadow:0 0 18px rgba(56,189,248,.16)}
    .meridian-user-marker-label .muw-avatar img{width:100%;height:100%;object-fit:cover;display:block}
    .meridian-user-marker-label .muw-copy{min-width:0}
    .meridian-user-marker-label strong{display:block;max-width:150px;overflow:hidden;text-overflow:ellipsis;color:#f0f9ff;font:750 11px/1.25 Inter,system-ui,sans-serif}
    .meridian-user-marker-label small{display:block;margin-top:3px;max-width:165px;overflow:hidden;text-overflow:ellipsis;color:#7dd3fc;font:600 9px/1.2 Inter,system-ui,sans-serif}
    .meridian-user-marker-label .muw-live{width:7px;height:7px;border-radius:50%;background:#38bdf8;box-shadow:0 0 0 4px rgba(56,189,248,.10),0 0 18px rgba(56,189,248,.95);flex:0 0 auto}
    @supports not (anchor-name:--test){.meridian-user-marker-label{display:none!important}}
  `;
  document.head.appendChild(style);

  var SUPABASE_URL='https://ywhufiiecrgtosmfsyug.supabase.co';
  var SUPABASE_KEY='sb_publishable_JG73DLHFCShOifFilpIUSw_i8nUFoDC';
  var globe=null;
  var currentMarkers=[];
  var currentUsers=[];
  var phi=0;
  var theta=.23;
  var dragStart=null;
  var dragPhi=0;
  var dragTheta=0;
  var dragging=false;

  var COUNTRY_FALLBACKS={
    DO:[18.7,-70.2],US:[39.5,-98.4],PR:[18.2,-66.5],CA:[56.1,-106.3],MX:[23.6,-102.5],
    CO:[4.6,-74.3],ES:[40.4,-3.7],GB:[54.8,-4.6],FR:[46.2,2.2],DE:[51.2,10.4],IT:[42.8,12.5],
    PT:[39.4,-8.2],BR:[-14.2,-51.9],AR:[-38.4,-63.6],JP:[36.2,138.3],AU:[-25.3,133.8]
  };

  function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
  function validCoord(lat,lng){return Number.isFinite(lat)&&Number.isFinite(lng)&&lat>=-90&&lat<=90&&lng>=-180&&lng<=180;}
  function safeId(value){return 'user-'+String(value||Math.random().toString(36).slice(2)).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,24);}
  function initials(name){return String(name||'M').trim().split(/\s+/).slice(0,2).map(function(p){return p.charAt(0).toUpperCase();}).join('')||'M';}
  function moduleName(path){
    var p=String(path||'');
    if(p.indexOf('/ai-workspace')>=0)return 'AI Workspace';
    if(p.indexOf('/crm')>=0)return 'CRM';
    if(p.indexOf('/tasks')>=0)return 'Tasks';
    if(p.indexOf('/calendar')>=0)return 'Calendar';
    if(p.indexOf('/notes')>=0)return 'Notes';
    if(p.indexOf('/analytics')>=0)return 'Analytics';
    if(p.indexOf('/integrations')>=0)return 'Integrations';
    if(p.indexOf('/skills')>=0)return 'Skills';
    if(p.indexOf('/dashboard')>=0)return 'Dashboard';
    return 'Meridian';
  }
  function coordsForPresence(p){
    var lat=Number(p&&p.latitude),lng=Number(p&&p.longitude);
    if(validCoord(lat,lng))return [lat,lng];
    var code=((p&&p.countryCode)||'').toUpperCase();
    return COUNTRY_FALLBACKS[code]||null;
  }
  function pulse(){
    frame.classList.remove('sky-pulse');
    void frame.offsetWidth;
    frame.classList.add('sky-pulse');
    setTimeout(function(){frame.classList.remove('sky-pulse');},850);
  }

  function renderLabels(users){
    labelsLayer.replaceChildren();
    users.forEach(function(user){
      var label=document.createElement('div');
      label.className='meridian-user-marker-label';
      label.style.positionAnchor='--cobe-'+user.markerId;
      label.style.left='anchor(center)';
      label.style.bottom='anchor(top)';
      label.style.opacity='var(--cobe-visible-'+user.markerId+', 0)';
      label.style.filter='blur(calc((1 - var(--cobe-visible-'+user.markerId+', 0)) * 6px))';

      var row=document.createElement('div');row.className='muw-row';
      var live=document.createElement('span');live.className='muw-live';
      var avatar=document.createElement('span');avatar.className='muw-avatar';
      if(user.avatarUrl){
        var img=document.createElement('img');img.src=user.avatarUrl;img.alt='';img.referrerPolicy='no-referrer';avatar.appendChild(img);
      }else{avatar.textContent=initials(user.displayName);}
      var copy=document.createElement('span');copy.className='muw-copy';
      var strong=document.createElement('strong');strong.textContent=user.displayName;
      var small=document.createElement('small');
      small.textContent=[user.city||user.countryCode||'Ubicación privada',moduleName(user.path),'ONLINE'].filter(Boolean).join(' · ');
      copy.appendChild(strong);copy.appendChild(small);
      row.appendChild(live);row.appendChild(avatar);row.appendChild(copy);
      label.appendChild(row);labelsLayer.appendChild(label);
    });
  }

  function syncPresence(state){
    var users=[];
    var seen=new Set();
    Object.keys(state||{}).forEach(function(key){
      (state[key]||[]).forEach(function(p){
        if(!p||p.source!=='meridian-completo'||!p.displayName)return;
        var sid=String(p.sessionId||key||'');
        if(seen.has(sid))return;
        seen.add(sid);
        var coords=coordsForPresence(p);
        if(!coords)return;
        users.push({
          markerId:safeId(sid),
          sessionId:sid,
          displayName:String(p.displayName).slice(0,80),
          avatarUrl:p.avatarUrl||null,
          city:p.city||null,
          countryCode:p.countryCode||null,
          path:p.path||'/',
          location:coords
        });
      });
    });

    currentUsers=users.slice(0,60);
    currentMarkers=currentUsers.map(function(user){
      return {id:user.markerId,location:user.location,size:.045,color:[.22,.74,1]};
    });
    if(globe)globe.update({markers:currentMarkers});
    renderLabels(currentUsers);

    var online=document.getElementById('mw-online');
    if(online)online.textContent=String(currentUsers.length);

    var cityRoot=document.getElementById('mw-city-list');
    if(cityRoot){
      cityRoot.replaceChildren();
      if(!currentUsers.length){
        var empty=document.createElement('div');empty.className='meridian-empty';empty.textContent='No hay usuarios conectados ahora mismo.';cityRoot.appendChild(empty);
      }else{
        currentUsers.slice(0,20).forEach(function(user){
          var item=document.createElement('div');item.className='meridian-city';
          var dot=document.createElement('i');
          var name=document.createElement('strong');name.textContent=user.displayName;
          var meta=document.createElement('span');meta.textContent=(user.city||user.countryCode||'Online')+' · '+moduleName(user.path);
          item.appendChild(dot);item.appendChild(name);item.appendChild(meta);cityRoot.appendChild(item);
        });
      }
    }
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
      phi:phi,
      theta:theta,
      dark:1,
      diffuse:2.25,
      mapSamples:28000,
      mapBrightness:11.5,
      mapBaseBrightness:.04,
      baseColor:[.035,.18,.29],
      markerColor:[.22,.74,1],
      glowColor:[.08,.40,.62],
      markerElevation:.08,
      markers:currentMarkers,
      onRender:function(state){
        if(!dragging)phi+=.0032;
        state.phi=phi+dragPhi;
        state.theta=clamp(theta+dragTheta,-.58,.68);
        state.markers=currentMarkers;
      }
    });

    canvas.addEventListener('pointerdown',function(e){
      dragStart={x:e.clientX,y:e.clientY};
      dragging=true;
      if(canvas.setPointerCapture)canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor='grabbing';
    });
    canvas.addEventListener('pointermove',function(e){
      if(!dragStart)return;
      dragPhi=(e.clientX-dragStart.x)/165;
      dragTheta=(e.clientY-dragStart.y)/500;
    });
    function release(){
      if(dragStart){
        phi+=dragPhi;
        theta=clamp(theta+dragTheta,-.58,.68);
      }
      dragStart=null;dragPhi=0;dragTheta=0;dragging=false;canvas.style.cursor='grab';
    }
    canvas.addEventListener('pointerup',release);
    canvas.addEventListener('pointercancel',release);
    window.addEventListener('blur',release);

    var ro=new ResizeObserver(function(entries){
      if(!globe||!entries[0])return;
      var w=Math.max(320,Math.round(entries[0].contentRect.width));
      globe.update({width:Math.round(w*dpr),height:Math.round(w*dpr),markers:currentMarkers});
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
    var client=supabaseMod.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{'x-client-info':'meridian-design-live-users'}}});

    var presence=client.channel('meridian-world');
    presence
      .on('presence',{event:'sync'},function(){syncPresence(presence.presenceState());})
      .on('presence',{event:'join'},function(){syncPresence(presence.presenceState());pulse();})
      .on('presence',{event:'leave'},function(){syncPresence(presence.presenceState());})
      .subscribe(function(status){
        var label=document.getElementById('mw-status-text');
        var badge=document.getElementById('mw-status');
        if(status==='SUBSCRIBED'){
          if(label)label.textContent='Usuarios reales · Realtime';
          if(badge)badge.classList.add('online');
          syncPresence(presence.presenceState());
        }
      });
  }catch(err){
    console.error('[Meridian World] realtime presence error',err);
  }
})();