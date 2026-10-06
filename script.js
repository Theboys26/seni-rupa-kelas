const $=s=>document.querySelector(s),app=$('#app'),nav=$('#nav'),V={};
const LS=(k,v)=>{try{if(v===undefined)return JSON.parse(localStorage.getItem(k));localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}};
const sh=a=>[...a].sort(()=>Math.random()-.5);
let P=LS('p')||{m:[],k:0,e:0},cur='home',mi=0,Q=null,tm,evT=Date.now();
const docsURL=()=>LS('docs')||GOOGLE_DOCS_URL,sheetURL=()=>LS('sheets')||GOOGLE_SHEETS_URL;
const ready=u=>u&&!u.startsWith('TEMPEL');
const MENU=[['home','🏠 Beranda'],['materi','📚 Materi'],['galeri','🎨 Galeri'],['aktif','🧩 Aktivitas'],['kuis','📝 Kuis'],['eval','📊 Evaluasi'],['hasil','🏆 Hasil'],['modul','📖 Modul'],['guru','👩‍🏫 Guru']];
const pct=()=>Math.round((P.m.length+P.k+P.e)/9*100);
const kat=n=>n>=90?'Sangat Baik':n>=80?'Baik':n>=70?'Cukup':'Perlu Belajar Lagi';
const ask=(q,o,a,h)=>`<div class="q" data-h="${h}"><p><b>${q}</b></p>${o.map((x,i)=>`<button class="opt" data-ok="${i==a?1:0}">${x}</button>`).join('')}<p class="fb"></p></div>`;
const ident=()=>`<input id="nm" placeholder="Nama peserta didik" value="${LS('nm')||''}"><input id="kl" placeholder="Kelas (mis. VII A)" value="${LS('kl')||''}">`;
const saveIdent=()=>{const n=$('#nm').value.trim();if(!n){alert('Isi nama dulu.');return false}LS('nm',n);LS('kl',$('#kl').value.trim());return true};

function render(){
 if(cur!='kuis')clearInterval(tm);
 nav.innerHTML=MENU.map(([k,l])=>`<button data-go="${k}" class="${k==cur?'on':''}">${l}</button>`).join('');
 app.innerHTML=V[cur]();V[cur+'_']&&V[cur+'_']();scrollTo(0,0);
}
const go=p=>{cur=p;render()};

V.home=()=>`<div class="card"><h1>🎨 MEDIA PEMBELAJARAN SENI RUPA</h1><h3>Seni Budaya Kelas VII SMP</h3>
<p><b>Capaian Pembelajaran:</b> "Peserta didik memahami seni rupa."</p><p>👩‍🏫 ${GURU}<br>🏫 ${SEKOLAH}</p>
<div class="bar"><i style="width:${pct()}%"></i></div><small>Progres belajar ${pct()}%</small>
<div class="grid" style="margin-top:10px"><button class="btn" data-go="materi">MULAI BELAJAR</button><button class="btn" data-go="materi">MATERI</button><button class="btn" data-go="kuis">KUIS</button><button class="btn" data-go="eval">EVALUASI</button></div></div>
<div class="card"><h3>📋 Petunjuk Pembelajaran</h3><ol><li>Pelajari materi secara berurutan.</li><li>Amati gambar/contoh karya.</li><li>Kerjakan aktivitas interaktif.</li><li>Kerjakan kuis.</li><li>Lihat hasil evaluasi.</li></ol>
${MATERI.map((m,i)=>`<div>Materi ${i+1} ${P.m.includes(i)?'✓':'○'}</div>`).join('')}<div>Kuis ${P.k?'✓':'○'}</div><div>Evaluasi ${P.e?'✓':'○'}</div></div>`;

V.materi=()=>{const m=MATERI[mi];if(!P.m.includes(mi)){P.m.push(mi);LS('p',P)}
 return `<div class="card"><small>Materi ${mi+1} dari ${MATERI.length}</small><h2>${m.t}</h2><p>${m.r}</p><p>💡 <b>Contoh:</b> ${m.c}</p>${ask(m.q[0],m.q[1],m.q[2],'Materi '+(mi+1))}
 <button class="btn" data-m="-1" ${mi?'':'disabled'}>◀ Materi Sebelumnya</button><button class="btn" data-m="1" ${mi<MATERI.length-1?'':'disabled'}>Materi Berikutnya ▶</button></div>`};

V.galeri=()=>`<div class="card"><h2>🎨 Galeri Seni Rupa</h2><p>Ketuk karya untuk melihat informasinya.</p><div class="grid">${GALERI.map((g,i)=>`<div><button class="tile" style="background:${g.c}" data-g="${i}" aria-label="${g.n}">${g.img?`<img src="${g.img}" alt="${g.n}">`:g.e}</button><small>${g.n}</small></div>`).join('')}</div></div>`;
function modal(i){const g=GALERI[i],d=document.createElement('div');d.className='modal';
 d.innerHTML=`<div class="card"><h3>${g.n}</h3><div class="tile" style="background:${g.c};cursor:default">${g.img?`<img src="${g.img}" alt="${g.n}">`:g.e}</div><p><b>Jenis:</b> ${g.j}<br><b>Teknik:</b> ${g.te}<br><b>Unsur terlihat:</b> ${g.u}</p><p>${g.d}</p><button class="btn" id="cl">Tutup</button></div>`;
 d.onclick=e=>{if(e.target==d||e.target.id=='cl')d.remove()};document.body.appendChild(d)}

V.aktif=()=>`<div class="card"><h2>1. Tebak Jenis Karya</h2>${JENIS.map(x=>ask(x[0]+' '+x[1]+' termasuk...',['Seni rupa 2 dimensi','Seni rupa 3 dimensi'],x[2],'Materi 5 dan 6')).join('')}</div>
<div class="card"><h2>2. Tebak Unsur Seni Rupa</h2>${UNSUR.map(x=>ask(x[0]+' — unsur yang dominan?',['Titik','Garis','Warna','Tekstur'],x[1],'Materi 3')).join('')}</div>
<div class="card"><h2>3. Benar atau Salah</h2>${BS.map(x=>ask(x[0],['BENAR','SALAH'],x[1],'Materi 3 sampai 6')).join('')}</div>`;

function done(jenis,benar,total,t0,uraian){
 const n=Math.round(benar/total*100),H={nama:LS('nm')||'-',kelas:LS('kl')||'-',nilai:n,benar,salah:total-benar,persen:n+'%',status:n>=KKM?'Tuntas':'Belum Tuntas',waktu:Math.round((Date.now()-t0)/1000)+' detik',jenis,uraian:uraian||'',kat:kat(n)};
 LS('h',H);if(jenis=='Kuis')P.k=1;else P.e=1;LS('p',P);
 const u=sheetURL();if(ready(u))fetch(u,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify(H)}).catch(()=>{});
 go('hasil');
}
function fin(){clearInterval(tm);const b=Q.items.filter((x,i)=>Q.ans[i]===x.c).length,n=Q.items.length,t=Q.t0;Q=null;done('Kuis',b,n,t)}
V.kuis=()=>{
 if(!Q)return `<div class="card"><h2>📝 Kuis (${KUIS.length} soal)</h2>${ident()}<label><input type="checkbox" id="tmx" style="width:auto"> Aktifkan timer 15 menit</label><button class="btn" id="go">Mulai Kuis</button></div>`;
 const x=Q.items[Q.i];
 return `<div class="card"><small>Soal ${Q.i+1}/${Q.items.length} <span id="tmr"></span></small><div class="bar"><i style="width:${Q.i/Q.items.length*100}%"></i></div><p><b>${x.q}</b></p>${x.o.map((o,j)=>`<button class="opt${Q.ans[Q.i]===o?' sel':''}" data-pick="${j}">${'ABCD'[j]}. ${o}</button>`).join('')}<button class="btn" id="nx">${Q.i<Q.items.length-1?'Berikutnya':'Selesai'}</button></div>`};
V.kuis_=()=>{
 if(!Q){$('#go').onclick=()=>{if(!saveIdent())return;Q={items:sh(KUIS).map(([q,o,a])=>({q,o:sh(o),c:o[a]})),i:0,ans:[],t0:Date.now(),end:$('#tmx').checked?Date.now()+9e5:0};render()};return}
 $('#nx').onclick=()=>{if(!Q.ans[Q.i])return alert('Pilih jawaban dulu.');if(Q.i<Q.items.length-1){Q.i++;render()}else fin()};
 clearInterval(tm);if(Q.end)tm=setInterval(()=>{const s=Math.round((Q.end-Date.now())/1000);if(s<=0)fin();else if($('#tmr'))$('#tmr').textContent='⏱ '+Math.floor(s/60)+':'+String(s%60).padStart(2,'0')},1000);
};

const fs=(n,t,o)=>`<fieldset><legend><b>${t}</b></legend>${o.map((v,i)=>`<label class="opt"><input type="radio" name="${n}" value="${i}">${v}</label>`).join('')}</fieldset>`;
V.eval=()=>{evT=Date.now();return `<div class="card"><h2>📊 Evaluasi Akhir</h2>${ident()}<h3>A. Pilihan Ganda</h3>${EV_MC.map((x,i)=>fs('mc'+i,(i+1)+'. '+x[0],x[1])).join('')}<h3>B. Benar/Salah</h3>${EV_TF.map((x,i)=>fs('tf'+i,(i+1)+'. '+x[0],['BENAR','SALAH'])).join('')}<h3>C. Uraian Singkat</h3>${EV_ES.map((q,i)=>`<p><b>${i+1}. ${q}</b></p><textarea id="es${i}" rows="3"></textarea>`).join('')}<button class="btn" id="sd">Kirim Hasil</button></div>`};
V.eval_=()=>$('#sd').onclick=()=>{if(!saveIdent())return;let b=0;const ck=(n,a)=>{const r=document.querySelector(`[name=${n}]:checked`);if(r&&+r.value===a)b++};
 EV_MC.forEach((x,i)=>ck('mc'+i,x[2]));EV_TF.forEach((x,i)=>ck('tf'+i,x[1]));
 done('Evaluasi',b,EV_MC.length+EV_TF.length,evT,EV_ES.map((q,i)=>$('#es'+i).value.trim()).join(' | '))};

V.hasil=()=>{const h=LS('h');if(!h)return `<div class="card"><h2>🏆 Hasil</h2><p>Belum ada hasil. Kerjakan kuis atau evaluasi dulu.</p></div>`;
 return `<div class="card"><h2>🏆 Hasil Belajar (${h.jenis})</h2><p>${h.nama} — Kelas ${h.kelas}</p><h1>${h.nilai}</h1><p><b>${h.kat}</b></p><p>✅ Benar: ${h.benar} | ❌ Salah: ${h.salah}<br>Persentase: ${h.persen}<br>Status: ${h.status}<br>⏱ Waktu: ${h.waktu}</p><button class="btn" data-go="kuis">Ulangi Kuis</button></div>`};

V.modul=()=>`<div class="card"><h2>📖 Modul Pembelajaran</h2><p>Materi lengkap tersedia di Google Docs.</p><button class="btn" id="dc">BUKA MODUL GOOGLE DOCS</button></div>`;
V.modul_=()=>$('#dc').onclick=()=>ready(docsURL())?window.open(docsURL(),'_blank','noopener'):alert('Link Google Docs belum diatur guru.');

const lnk=u=>ready(u)?`<a href="${u}" target="_blank" rel="noopener">buka tautan</a>`:'belum diatur';
V.guru=()=>`<div class="card"><h2>👩‍🏫 Dashboard Guru</h2><p><b>Petunjuk:</b> ganti nama guru/sekolah di data.js; buat Google Docs dan Spreadsheet (lihat README); atur URL di bawah. Pengaturan ini tersimpan di browser perangkat ini; agar permanen, tempel URL di data.js.</p>
<p>Google Docs: ${lnk(docsURL())}<br>Google Sheets/Apps Script: ${lnk(sheetURL())}</p>
<button class="btn" id="s1">Atur URL Google Docs</button><button class="btn" id="s2">Atur URL Google Sheets (Apps Script)</button>
<p><small>Peserta didik tidak perlu akun; hanya nama dan kelas yang diminta.</small></p></div>`;
V.guru_=()=>{const set=(id,key,msg)=>$(id).onclick=()=>{const v=prompt(msg);if(v&&v.trim().startsWith('https://')){LS(key,v.trim());go('guru')}else if(v)alert('URL harus diawali https://')};
 set('#s1','docs','Tempel link Google Docs:');set('#s2','sheets','Tempel URL Web App Apps Script (…/exec):')};

document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.go)return go(b.dataset.go);
 if(b.dataset.m){mi+=+b.dataset.m;return render()}
 if(b.dataset.g)return modal(+b.dataset.g);
 if(b.dataset.pick){Q.ans[Q.i]=Q.items[Q.i].o[+b.dataset.pick];return render()}
 const q=b.closest('.q');if(q&&b.dataset.ok!==undefined&&!q.dataset.done){q.dataset.done=1;const ok=b.dataset.ok=='1';b.classList.add(ok?'ok':'bad');if(!ok)q.querySelector('[data-ok="1"]').classList.add('ok');
  q.querySelector('.fb').textContent=ok?'✅ Jawaban benar!':'❌ Belum tepat. Pelajari kembali '+q.dataset.h+'.'}});
addEventListener('keydown',e=>{if(cur!='materi')return;if(e.key=='ArrowRight'&&mi<MATERI.length-1){mi++;render()}if(e.key=='ArrowLeft'&&mi>0){mi--;render()}});
const th=LS('th');if(th)document.documentElement.dataset.theme=th;
$('#theme').onclick=()=>{const d=document.documentElement.dataset.theme=='dark'?'light':'dark';document.documentElement.dataset.theme=d;LS('th',d)};
onscroll=()=>{$('#top').hidden=scrollY<300};
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});
render();
