export const df036RailRowLayoutHtml = (width: number): string => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .row { display:flex; width:${width}px; gap:8px; align-items:center; padding:0 14px; box-sizing:border-box; }
    .label { display:flex; flex:1 1 auto; min-width:8rem; align-items:center; gap:12px; overflow:hidden; }
    .avatar { width:32px; height:32px; flex-shrink:0; }
    .name { font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; display:block; }
    .chip { display:flex; max-width:45%; min-width:0; flex-shrink:1; overflow:hidden; }
    .chip span { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .menu { width:28px; flex-shrink:0; }
  </style>
</head>
<body>
  <div class="row" id="row">
    <button type="button" class="label">
      <span class="avatar"></span>
      <span class="name" id="name">Claude</span>
    </button>
    <button type="button" class="chip" id="chip">
      <span>Checks in only when asked</span>
    </button>
    <button type="button" class="menu" id="menu">⋯</button>
  </div>
</body>
</html>`;
