(() => {
 const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 // Réplicas Nova Roma: fotos reales en public/assets/replicas/<slug>.jpg.
 // El slug es el Identificador de URL del producto (mismo valor que SKU e
 // Identificador de URL del CSV de carga masiva). Cada tanda nueva agrega
 // sus slugs a este conjunto.
 const replicaSlugs=new Set(['1-million','azzaro','miss-dior-cherie','toy-2','my-way','nina','olympea','opium','organza','oui-la-vie-est-belle','poeme','poison-girl','black-xs-masculino','pure-poison','pure-xs-femenino','q','ralph','red-door','samsara','scandal-femenino','si','born-in-roma','venus','black-xs-aphrodisiaque','very-irresistible-femenino','white-tea','woman','ch-prive','aventus','dolce-gabbana-masculino','fahrenheit','gentleman','invictus','invictus-intense','1-million-elixir','kenzo-pour-homme','kenzo-homme-intense','l-eau-d-issey-masculino','le-male','light-blue-masculino','megamare','million-gold-masculino','ombre-leather','phantom','polo-blue','212-masculino','pure-xs-masculino','sauvage','scandal-masculino','stronger-with-you','terre-d-hermes','tommy','ultra-male','very-irresistible-masculino','eros','ck-one','212-sexy-masculino','oud-wood','oud-for-greatness','baccarat-rouge-540','arabians-tonka','erba-pura','santal-33','lost-cherry','khamrah-qahwa','teriaq','costa-azzurra','212-heroes','212-femenino','212-sexy-femenino','212-vip-femenino','212-vip-rose','5th-avenue','acqua-di-gioia','alien','amarige','amor-amor','ange-ou-demon','212-vip-masculino','angel-nova','ari','armani-code','be-delicious','black-xs-femenino','blue','bombshell','cabotine','carolina-herrera','ch','212-vip-black','chance-eau-tendre','n-5','cool-water','dahab','dolce-gabbana-femenino','eden','extravagance-d-amarige','fame','flower','giorgio','acqua-di-gio','good-girl','gucci-bloom','hot-couture','idole','irresistible','j-adore','amour','parfum-d-ete','jeu-d-amour','world','bad-boy','la-bomba','l-eau-d-issey-femenino','l-interdit','l-interdit-rouge','la-vie-est-belle','lady-million','yara','libre','light-blue-femenino','million-gold-femenino']);
 const duplicateBaseSlugs=new Set(['212','212-sexy','212-vip','black-xs','dolce-gabbana','l-eau-d-issey','light-blue','million-gold','pure-xs','scandal','very-irresistible']);
 function productSlug(product){
  const base=String(product.name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  if(duplicateBaseSlugs.has(base)){
   if(product.category==='Masculinas')return base+'-masculino';
   if(product.category==='Femeninas')return base+'-femenino';
  }
  return base;
 }
 const packagingColors=['#9b355e','#7546a1','#16584f','#a14d22','#273f74','#71364e','#176a88','#855025','#4b4777','#a33243','#3e6351'];
 const bottleShapes=[
  ['8% 8% 15% 15%',88,140],['42% 42% 23% 23%',106,117],
  ['14% 14% 35% 35%',89,151],['46% 46% 46% 46%',110,111],
  ['9% 9% 9% 9%',112,112],['30% 30% 10% 10%',73,149],
  ['8% 8% 46% 46%',104,125],['40% 40% 12% 12%',82,145]
 ];
 const capShapes=['4px','50% 50% 6px 6px','12px 12px 4px 4px','45%','6px 6px 16px 16px','18px 18px 2px 2px','8px 20px 8px 20px'];
 function renderPackaging(product) {
  const index=Number(product.id)-1;
  const [shape,width,height]=bottleShapes[index%bottleShapes.length];
  const color=packagingColors[index%packagingColors.length];
  const cap=capShapes[index%capShapes.length];
  const boxColor=packagingColors[(index*3+4)%packagingColors.length];
  const borderStyle=['solid','double','dashed'][Math.floor(index/8)%3];
  const style=`--roma-glass:${color};--roma-carton:${boxColor};--roma-shape:${shape};--roma-width:${width}px;--roma-height:${height}px;--roma-cap:${cap};--roma-frame:${borderStyle}`;
  return `<div class="roma-packaging" style="${style}" role="img" aria-label="Diseño ilustrativo de frasco y caja Nova Roma para ${escape(product.name)}"><div class="roma-carton" aria-hidden="true"><span>NOVA ROMA</span><small>${escape(product.name)}</small></div><div class="roma-bottle" aria-hidden="true"><div class="roma-cap"></div><div class="roma-glass"><span>NOVA ROMA</span></div></div></div>`;
 }
 // Foto real de la réplica cuando existe; si no, el envase ilustrativo CSS.
 function renderRomaVisual(product) {
  const slug=productSlug(product);
  if(replicaSlugs.has(slug))return `<div class="roma-photo"><img src="assets/replicas/${slug}.jpg" alt="Versión Nova Roma de ${escape(product.name)}" loading="lazy"></div>`;
  return renderPackaging(product);
 }
 const list=values=>values.map(value=>`<span>${escape(value)}</span>`).join('');
 window.renderRomaDetails=(product,profile={})=>{
  const notes=profile.notes||{};
  const groups=[['Salida','01',notes.top],['Corazón','02',notes.heart],['Fondo','03',notes.base]].filter(([, ,values])=>values?.length);
  const keyNotes=notes.key||[];
  const notesHTML=groups.length?`<div class="note-pyramid">${groups.map(([label,num,values])=>`<section class="note-level"><span class="note-index">${num}</span><div><h4>${label}</h4><div class="note-tags">${list(values)}</div></div></section>`).join('')}</div>`:keyNotes.length?`<div class="key-notes note-tags">${list(keyNotes)}</div>`:'<p class="profile-pending">Estamos completando el perfil de esta referencia.</p>';
  const sources=(profile.sources||[]).filter(source=>/^https:\/\//.test(source.url));
  return `<button class="dialog-close" aria-label="Cerrar detalle">×</button>
   <div class="detail-shell" data-category="${escape(product.category)}">
    <div class="detail-visual detail-comparison">
     <figure><div class="detail-original"><img src="${escape(product.image)}" alt="Frasco de referencia de ${escape(product.name)}"></div><figcaption><strong>Original de referencia</strong><span>${escape(product.brand||product.name)}</span></figcaption></figure>
     <figure>${renderRomaVisual(product)}<figcaption><strong>Versión Nova Roma</strong><span>${replicaSlugs.has(productSlug(product))?'Envase propio · 55 ml':'Diseño de envase ilustrativo'}</span></figcaption></figure>
    </div>
    <div class="detail-content"><p class="eyebrow">ROMA BY BARBIES · ${escape(product.category)}</p><span class="detail-intro">Inspirada en</span><h2 id="perfume-detail-title">${escape(product.name)}</h2><p class="detail-reference-brand">${escape(product.brand)}</p><div class="detail-pills"><span>55 ml</span><span>Fragancia inspirada</span></div>
    <p class="detail-description">${escape(profile.description||'Una nueva forma de llevar tu esencia. Descubrí nuestra interpretación de esta fragancia.')}</p>
    ${profile.family?`<section class="olfactory-family"><span aria-hidden="true">✧</span><div><p>FAMILIA OLFATIVA DE REFERENCIA</p><h3>${escape(profile.family)}</h3></div></section>`:''}
    ${groups.length||keyNotes.length?`<section class="detail-notes"><div class="detail-section-title"><span>EL RECORRIDO DEL AROMA</span><h3>${groups.length?'Notas olfativas':'Notas destacadas'}</h3></div>${notesHTML}</section>`:''}
    ${(profile.occasions||[]).length?`<section class="detail-occasions"><div class="detail-section-title"><span>ENCONTRÁ TU MOMENTO</span><h3>Sugerencias de uso</h3></div><div class="occasion-tags">${list(profile.occasions)}</div></section>`:''}
    <details class="reference-disclosure"><summary>Sobre esta inspiración</summary><p>La familia y las notas describen la fragancia original de referencia. Roma by Barbies ofrece una versión inspirada, en su propia presentación de 55 ml.</p>${sources.map(source=>`<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title||'Conocé la referencia')} ↗</a>`).join('')}</details>
    <a class="button" href="https://novaromabybarbies2.mitiendanube.com/" target="_blank" rel="noopener noreferrer">Consultar en la tienda ↗</a><button class="dialog-back">Seguir explorando <span>↗</span></button></div></div>`;
 };
})();
