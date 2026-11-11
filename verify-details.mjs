import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
// Mismo stub de documento que verify-catalog.mjs, para cargar app.js y
// obtener los 122 productos reales (nombre y categoría definen el slug).
const nodes=new Map();
const element=()=>({innerHTML:'',textContent:'',value:'',dataset:{},classList:{add(){},toggle(){}},setAttribute(){},addEventListener(){},querySelectorAll(){return []},querySelector(){return element()},showModal(){this.open=true},close(){this.open=false}});
const document={getElementById(id){if(!nodes.has(id))nodes.set(id,element());return nodes.get(id)},querySelectorAll(){return []},createElement(){return element()},body:{append(){}}};
const context=vm.createContext({document,window:{},Date});
vm.runInContext(fs.readFileSync('public/feminine-products.js','utf8'),context);
vm.runInContext(fs.readFileSync('public/detail-profiles.js','utf8'),context);
vm.runInContext(fs.readFileSync('public/detail-view.js','utf8'),context);
vm.runInContext(fs.readFileSync('public/app.js','utf8'),context);
const products=vm.runInContext('products',context);
const profiles=context.window.ROMA_DETAILS;
assert.equal(Object.keys(profiles).length,122,'Deben existir 122 perfiles');
assert.equal(products.length,122,'Deben existir 122 productos');
const unresolved=[];
for(let id=1;id<=122;id++){
 const profile=profiles[id];
 assert(profile,'Falta perfil '+id);
 assert.equal(profile.id,id);
 assert(profile.description?.trim(),'Falta descripción '+id);
 if(profile.status==='needs-variant'){unresolved.push(id);continue;}
 assert.equal(profile.status,'verified','Estado inválido '+id);
 assert(profile.family?.trim(),'Falta familia '+id);
 assert(Object.values(profile.notes||{}).some(notes=>Array.isArray(notes)&&notes.length),'Faltan notas '+id);
 // Las fuentes son opcionales: los perfiles escritos a partir del perfil
 // público de la referencia no llevan enlace externo todavía; cuando un
 // perfil declara fuentes, todas deben ser https.
 if(profile.sources?.length)assert(profile.sources.every(source=>/^https:\/\//.test(source.url)),'Fuente inválida '+id);
}
for(const product of products)assert(fs.statSync('public/'+product.image).size>10000,'Falta imagen: '+product.name);
// Réplicas Nova Roma con foto real (las 122): la ficha debe mostrar la foto
// y mantener el original como referencia. Sin foto, seguiría el envase CSS.
const photoSrcs=new Set();
for(const product of products){
 const html=context.window.renderRomaDetails(product,profiles[product.id]);
 const match=html.match(/src="(assets\/replicas\/[^"]+\.jpg)"/);
 assert(match,'La ficha debe mostrar la foto de la réplica '+product.name);
 assert(fs.statSync('public/'+match[1]).size>10000,'Falta foto de réplica: '+match[1]);
 photoSrcs.add(match[1]);
 assert(html.includes(`src="${product.image}"`),'Debe mostrar el original como referencia');
 assert(html.includes('Versión Nova Roma'),'Debe identificar la versión Nova Roma');
 assert(html.includes('Original de referencia'),'Debe identificar el original');
 assert(!html.includes('roma-packaging'),'Con foto real no se usa el envase CSS');
}
assert.equal(photoSrcs.size,122,'Cada fragancia debe tener una foto de réplica distinta');
const p42=products.find(p=>p.id===42);
const html=context.window.renderRomaDetails(p42,profiles[42]);
assert(html.includes('55 ml'));assert(html.includes('Inspirada en'));assert(!html.includes('detail-pending'));
assert(html.includes('src="assets/perfumes/42.jpg"'),'Debe mostrar el original como referencia');
assert(html.includes('src="assets/replicas/baccarat-rouge-540.jpg"'),'Debe mostrar la foto de la réplica');
console.log(`OK: 122 fichas, ${122-unresolved.length} perfiles verificados, ${photoSrcs.size} réplicas con foto; variantes pendientes: ${unresolved.join(', ')||'ninguna'}.`);
