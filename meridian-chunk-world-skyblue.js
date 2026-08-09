window.__MERIDIAN_CHUNKS.push(`
<style>
  .meridian-live-world{background:#03070b!important;color:#f0f9ff!important}
  .meridian-live-world::before{background:radial-gradient(circle at 72% 30%,rgba(56,189,248,.22),transparent 28%),radial-gradient(circle at 18% 10%,rgba(125,211,252,.08),transparent 22%),linear-gradient(rgba(125,211,252,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(125,211,252,.028) 1px,transparent 1px)!important;background-size:auto,auto,44px 44px,44px 44px!important}
  .meridian-live-kicker{border-color:rgba(125,211,252,.18)!important;background:rgba(2,132,199,.07)!important;color:#bae6fd!important}
  .meridian-live-kicker i{background:#38bdf8!important;box-shadow:0 0 0 5px rgba(56,189,248,.12),0 0 28px rgba(56,189,248,.9)!important}
  .meridian-live-title{color:#f0f9ff!important;text-shadow:0 8px 50px rgba(56,189,248,.06)}
  .meridian-live-title span{color:#7dd3fc!important;text-shadow:0 0 36px rgba(56,189,248,.2)}
  .meridian-live-desc{color:#94a3b8!important}
  .meridian-live-note{color:#64748b!important}.meridian-live-note b{color:#a5f3fc!important}
  .meridian-live-actions .primary{background:#e0f2fe!important;color:#071018!important;border-color:#bae6fd!important;box-shadow:0 12px 34px rgba(56,189,248,.12)}
  .meridian-live-actions .secondary{border-color:rgba(125,211,252,.18)!important;color:#bae6fd!important;background:rgba(56,189,248,.04)!important}
  .meridian-live-actions .secondary:hover{border-color:#38bdf8!important;color:#e0f2fe!important;box-shadow:0 0 28px rgba(56,189,248,.12)}
  .meridian-live-metric{border-color:rgba(125,211,252,.10)!important;background:linear-gradient(180deg,rgba(56,189,248,.045),rgba(255,255,255,.015))!important}
  .meridian-live-metric strong{color:#e0f2fe!important}.meridian-live-metric span{color:#64748b!important}
  .meridian-world-orbit{border-color:rgba(125,211,252,.13)!important;box-shadow:0 0 0 60px rgba(56,189,248,.022),0 0 0 120px rgba(56,189,248,.012),inset 0 0 100px rgba(56,189,248,.025)!important;animation:meridianSkyOrbit 18s linear infinite}
  .meridian-world-orbit::before,.meridian-world-orbit::after{border-color:rgba(56,189,248,.23)!important}
  .meridian-world-orbit::after{border-color:rgba(125,211,252,.11)!important}
  @keyframes meridianSkyOrbit{to{transform:rotate(360deg)}}
  .meridian-world-frame{filter:drop-shadow(0 32px 95px rgba(14,165,233,.18))}
  .meridian-world-frame::before{content:'';position:absolute;inset:13%;border-radius:50%;background:radial-gradient(circle at 35% 28%,rgba(186,230,253,.11),transparent 20%),radial-gradient(circle at 50% 55%,rgba(14,165,233,.10),transparent 62%);filter:blur(12px);pointer-events:none;animation:meridianAtmosphere 4.8s ease-in-out infinite alternate}
  .meridian-world-frame::after{border-color:rgba(56,189,248,.32)!important;box-shadow:0 0 45px rgba(56,189,248,.12)!important}
  .meridian-world-frame.sky-pulse{filter:drop-shadow(0 0 44px rgba(56,189,248,.72)) drop-shadow(0 28px 80px rgba(14,165,233,.22))!important}
  @keyframes meridianAtmosphere{from{opacity:.55;transform:scale(.98)}to{opacity:1;transform:scale(1.025)}}
  #meridian-globe-canvas-sky{position:relative;z-index:2;width:100%;height:100%;display:block;cursor:grab;touch-action:none;filter:drop-shadow(0 28px 82px rgba(2,132,199,.24));border-radius:50%}
  #meridian-globe-canvas-sky:active{cursor:grabbing}
  .meridian-world-status{border-color:rgba(125,211,252,.14)!important;background:rgba(3,10,16,.78)!important;color:#94a3b8!important}
  .meridian-world-status.online i{background:#38bdf8!important;box-shadow:0 0 20px rgba(56,189,248,.95)!important}
  .meridian-world-status.online{color:#bae6fd!important}
  .meridian-world-caption{border-color:rgba(125,211,252,.13)!important;background:rgba(3,10,16,.78)!important}
  .meridian-world-caption small{color:#64748b!important}.meridian-world-caption strong{color:#e0f2fe!important}
  .meridian-live-panel{border-color:rgba(125,211,252,.09)!important;background:linear-gradient(180deg,rgba(56,189,248,.04),rgba(255,255,255,.012))!important}
  .meridian-live-panel-head{border-color:rgba(125,211,252,.08)!important}.meridian-live-panel-head h3{color:#bae6fd!important}
  .meridian-live-row .event-icon{background:rgba(56,189,248,.11)!important;border-color:rgba(125,211,252,.17)!important;color:#7dd3fc!important}
  .meridian-live-row strong{color:#dff6ff!important}.meridian-live-row small,.meridian-live-row time{color:#64748b!important}
  .meridian-review-stars{color:#38bdf8!important}.meridian-review p{color:#cbd5e1!important}
  .meridian-city i{background:#38bdf8!important;box-shadow:0 0 19px rgba(56,189,248,.78)!important}.meridian-city strong{color:#dff6ff!important}.meridian-city span{color:#64748b!important}
  @media(prefers-reduced-motion:reduce){.meridian-world-orbit,.meridian-world-frame::before{animation:none!important}}
</style>
<script src="meridian-world-skyblue.js"></script>
`);
