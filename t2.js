// SiteSafe t2: điều hướng, xuất báo cáo và ghi nhận mối nguy
(() => {
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const sidebar=$('#sidebar'),backdrop=$('#sidebarBackdrop'),detail=$('#dangerDetailCard');
 const exportModal=$('#exportModal'),hazardModal=$('#hazardModal'),toast=$('#toastNotification'),toastMsg=$('#toastMessage');
 let timer,step=1;
 function notify(msg){if(!toast){alert(msg);return;}if(toastMsg)toastMsg.textContent=msg;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),3000);}
 function showModal(el){if(!el)return;el.classList.add('modal-open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
 function hideModal(el){if(!el)return;el.classList.remove('modal-open');el.setAttribute('aria-hidden','true');if(!$('.modal-overlay.modal-open'))document.body.style.overflow='';}
 function closeSidebar(){sidebar?.classList.remove('is-open');backdrop?.classList.remove('visible');}
 const zoneInfo={
  A:{name:'Kho vật liệu',score:58,level:'Rủi ro trung bình',issues:[
   {code:'A-121',title:'Vật liệu xếp sát mép lối đi',status:'Chưa xử lý',time:'08:20',person:'Lê Hoàng',team:'Đội vật tư'},
   {code:'A-122',title:'Thiếu biển cảnh báo khu vực nâng hạ',status:'Đang xử lý',time:'09:05',person:'Trần Hùng',team:'Đội vận chuyển'}]},
  B:{name:'Hố đào & móng',score:82,level:'Rủi ro cao',issues:[
   {code:'B-129',title:'Hệ thống dây điện chưa nối đất',status:'Chưa xử lý',time:'08:42',person:'Phạm Tuấn',team:'Đội M&E'},
   {code:'B-130',title:'Cáp điện đặt tại lối đi',status:'Đang xử lý',time:'09:15',person:'Trần Hùng',team:'Đội kết cấu'},
   {code:'B-132',title:'Tủ điện thiếu nắp bảo vệ',status:'Chưa xử lý',time:'09:48',person:'Lê Hoàng',team:'Đội kết cấu'}]},
  C:{name:'Gia công',score:0,level:'An toàn',issues:[]},
  D:{name:'Văn phòng / HSE',score:0,level:'An toàn',issues:[]}
 };
 let selectedZone='B';
 function renderZoneIssues(z){
  const info=zoneInfo[z]||zoneInfo.B, list=$('#issuesList'); if(!list)return;
  let issues=[...info.issues];
  // Mối nguy mới ghi nhận được lọc theo đúng Zone đang mở.
  const saved=getRecords().filter(r=>String(r.zoneCode||r.zone||'').includes(z));
  saved.forEach(r=>issues.unshift({code:r.code,title:r.description,status:'Mới ghi nhận',time:r.createdAt||'',person:r.assignee||'Chưa phân công',team:r.zone||`Zone ${z}`}));
  list.innerHTML='';
  if(!issues.length){list.innerHTML='<div class="issue-item"><div class="issue-dot" style="background:#0db884"></div><div class="issue-content"><div class="issue-main-row"><span class="issue-title">Chưa ghi nhận mối nguy đang mở</span><span class="status-tag tag-processing">An toàn</span></div><div class="issue-meta">Khu vực này hiện không có mối nguy mẫu.</div></div></div>';}
  issues.forEach(it=>{const item=document.createElement('div');item.className='issue-item';const statusClass=/Đang xử lý/i.test(it.status)?'tag-processing':(/Mới ghi nhận/i.test(it.status)?'tag-processing':'tag-unresolved');item.innerHTML=`<div class="issue-dot ${statusClass==='tag-processing'?'':'dot-red'}"></div><div class="issue-content"><div class="issue-main-row"><span class="issue-title"></span><span class="status-tag ${statusClass}"></span></div><div class="issue-meta"></div></div>`;$('.issue-title',item).textContent=it.title;$('.status-tag',item).textContent=it.status;$('.issue-meta',item).textContent=[it.code,it.time,it.person,it.team].filter(Boolean).join(' · ');list.appendChild(item);});
  if($('#detailRiskScore')){$('#detailRiskScore').textContent=`${info.level} · ${info.score}/100`;$('#detailRiskScore').className='badge-pill '+(info.level==='An toàn'?'badge-pill-safe':(info.score>=70?'badge-pill-danger':'badge-pill-text'));}
  if($('#detailIssuesCount'))$('#detailIssuesCount').textContent=`${issues.length} mối nguy đang mở · ${issues.filter(i=>/Chưa xử lý|Mới ghi nhận/i.test(i.status)).length} cần xử lý`;
  const dispatch=$('#dispatchActionBtn');if(dispatch)dispatch.textContent=`Giao xử lý ${issues.length} mối nguy`;
 }
 function openDetails(z='B'){if(!detail)return;selectedZone=z;const info=zoneInfo[z]||zoneInfo.B;if($('#detailZoneTitle'))$('#detailZoneTitle').textContent=`Zone ${z} · ${info.name}`;if($('#zoneSelectionStatus'))$('#zoneSelectionStatus').textContent=`Đang xem chi tiết Zone ${z} · ${info.name}`;renderZoneIssues(z);detail.classList.add('visible');detail.setAttribute('aria-hidden','false');if(matchMedia('(max-width:700px)').matches)detail.scrollIntoView({behavior:'smooth',block:'nearest'});}
 function closeDetails(){detail?.classList.remove('visible');detail?.setAttribute('aria-hidden','true');}

 // Menu chuyển trang, giống t3/t4.
 const current=location.pathname.split('/').pop()||'t2.html';
 $$('.sidebar-nav .nav-item').forEach(a=>{a.classList.toggle('active',a.getAttribute('href')===current);a.addEventListener('click',()=>{if(a.getAttribute('href')!==current)closeSidebar();});});
 $('#menuToggleBtn')?.addEventListener('click',()=>{sidebar?.classList.toggle('is-open');backdrop?.classList.toggle('visible');});
 $('#sidebarCloseBtn')?.addEventListener('click',closeSidebar);backdrop?.addEventListener('click',closeSidebar);

 ['A','B','C','D'].forEach(z=>{const el=$(`#zone${z}`);el?.addEventListener('click',()=>openDetails(z));el?.setAttribute('tabindex','0');el?.setAttribute('role','button');el?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openDetails(z);}});});
 $('#hotspotB')?.addEventListener('click',()=>openDetails('B'));$('#kpiHotspotCard')?.addEventListener('click',()=>openDetails('B'));
 $$('[data-detail]').forEach(el=>el.addEventListener('click',()=>openDetails(el.dataset.zone||'B')));
 $('#closeDetailCardBtn')?.addEventListener('click',closeDetails);
 $('#toggleDetailModeBtn')?.addEventListener('click',()=>detail?.classList.contains('visible')?closeDetails():openDetails('B'));
 $('#viewZoneProfileLink')?.addEventListener('click',e=>{e.preventDefault();const info=zoneInfo[selectedZone]||zoneInfo.B;notify(`Hồ sơ Zone ${selectedZone} · ${info.name} · ${info.issues.length} mối nguy mẫu.`);});
 $('#dispatchActionBtn')?.addEventListener('click',()=>{const info=zoneInfo[selectedZone]||zoneInfo.B;notify(`Đã ghi nhận yêu cầu giao xử lý cho Zone ${selectedZone} (${info.name}).`);closeDetails();});

 const exportOpener=$('#openExportModalBtn');
 exportOpener?.addEventListener('click',()=>showModal(exportModal));
 $('#closeExportModal')?.addEventListener('click',()=>hideModal(exportModal));
 $('#cancelExportBtn')?.addEventListener('click',()=>hideModal(exportModal));
 exportModal?.addEventListener('click',e=>{if(e.target===exportModal)hideModal(exportModal);});
 $$('[data-type]').forEach(card=>card.addEventListener('click',()=>{$$('[data-type]').forEach(c=>c.classList.toggle('selected',c===card));const r=$('input[name="reportType"]',card);if(r)r.checked=true;const sec=$('#zoneFilterSection');if(sec)sec.style.display=card.dataset.type==='zone'?'block':'none';previewExport();}));
 $$('[data-fmt]').forEach(card=>card.addEventListener('click',()=>{$$('[data-fmt]').forEach(c=>c.classList.toggle('selected',c===card));const r=$('input[name="exportFmt"]',card);if(r)r.checked=true;previewExport();}));
 $$('input[name="exportFmt"]').forEach(r=>r.addEventListener('change',previewExport));
 $$('[data-range]').forEach(chip=>chip.addEventListener('click',()=>{ $$('[data-range]').forEach(c=>c.classList.toggle('active',c===chip));const now=new Date(),from=$('#exportDateFrom'),to=$('#exportDateTo');const f=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;if(to)to.value=f(now);if(from){let d=new Date(now);if(chip.dataset.range==='week')d.setDate(d.getDate()-6);if(chip.dataset.range==='month')d.setDate(1);from.value=f(d);}previewExport();}));
 ['exportDateFrom','exportDateTo'].forEach(id=>$('#'+id)?.addEventListener('change',previewExport));
 function previewExport(){const fmt=$('input[name="exportFmt"]:checked')?.value||'pdf',type=$('input[name="reportType"]:checked')?.value||'full';const name=type==='zone'?'Báo cáo theo khu vực':type==='incident'?'Danh sách mối nguy':type==='hazards'?'Danh sách mối nguy':'Báo cáo tổng hợp';if($('#exportPreviewText'))$('#exportPreviewText').textContent=`Sẽ xuất: ${name} · ${fmt.toUpperCase()} · ${$('#exportDateFrom')?.value||''} – ${$('#exportDateTo')?.value||''}`;}
 function getRecords(){try{return JSON.parse(localStorage.getItem('sitesafe_hazards')||'[]');}catch(e){return [];}}
 function download(name,content,mime){const url=URL.createObjectURL(new Blob([content],{type:mime}));const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 $('#doExportBtn')?.addEventListener('click',()=>{
  const fmt=$('input[name="exportFmt"]:checked')?.value||'pdf',type=$('input[name="reportType"]:checked')?.value||'full';
  let records=getRecords();const zones=$$('input[name="zone"]:checked').map(x=>x.value);
  if(type==='zone'&&zones.length)records=records.filter(x=>zones.some(z=>String(x.zone).includes(z)));
  const head=['Mã mối nguy','Khu vực','Vị trí','Mô tả','Loại','Mức độ','Người xử lý','Hạn xử lý','Ngày ghi nhận'];
  const rows=records.map(x=>[x.code,x.zone,x.location,x.description,x.type,x.level,x.assignee,x.deadline,x.createdAt]);
  if(!rows.length)rows.push(['HZ-001','Zone B','Hố đào & móng','Hệ thống dây điện chưa nối đất','Điện','Cao','Đội M&E','','Dữ liệu mẫu']);
  if(fmt==='excel'){
   const csv='\ufeff'+[['Báo cáo SiteSafe - Bản đồ nhiệt rủi ro'],head,...rows].map(row=>row.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\r\n');
   download('sitesafe_bao_cao_moi_nguy.csv',csv,'text/csv;charset=utf-8;');hideModal(exportModal);notify('Đã tải báo cáo CSV, có thể mở bằng Excel.');return;
  }
  const table=`<h1>Báo cáo SiteSafe - Bản đồ nhiệt rủi ro</h1><p>Ngày xuất: ${new Date().toLocaleString('vi-VN')}</p><table><thead><tr>${head.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  const style='body{font:12px Arial;padding:24px;color:#222}h1{font-size:20px}table{width:100%;border-collapse:collapse}th{background:#eef2f7}td,th{padding:7px;text-align:left;border:1px solid #bbb}';
  if(fmt==='word'){download('sitesafe_bao_cao_moi_nguy.doc',`<html><head><meta charset="utf-8"><style>${style}</style></head><body>${table}</body></html>`,'application/msword;charset=utf-8;');hideModal(exportModal);notify('Đã tải báo cáo Word (.doc).');return;}
  const win=window.open('','_blank');if(!win){notify('Trình duyệt chặn cửa sổ in. Hãy cho phép pop-up rồi thử lại.');return;}
  win.document.write(`<html><head><meta charset="utf-8"><title>Báo cáo SiteSafe</title><style>${style}</style></head><body>${table}<script>window.onload=()=>window.print()<\/script></body></html>`);win.document.close();hideModal(exportModal);notify('Chọn “Lưu thành PDF” trong hộp thoại in.');
 });

 // Wizard ghi nhận mối nguy
 $('#openHazardModalBtn')?.addEventListener('click',()=>{setStep(1);showModal(hazardModal);});
 $('#closeHazardModal')?.addEventListener('click',()=>hideModal(hazardModal));
 $('#cancelHazardBtn')?.addEventListener('click',()=>hideModal(hazardModal));
 hazardModal?.addEventListener('click',e=>{if(e.target===hazardModal)hideModal(hazardModal);});
 function setStep(n){step=Math.max(1,Math.min(3,n));[1,2,3].forEach(i=>{$(`#step${i}`)?.classList.toggle('active',i===step);$(`.stepper-item[data-step="${i}"]`)?.classList.toggle('active',i===step);$(`.stepper-item[data-step="${i}"]`)?.classList.toggle('completed',i<step);});if($('#hazardBackBtn'))$('#hazardBackBtn').disabled=step===1;if($('#hazardNextText'))$('#hazardNextText').textContent=step===3?'Lưu ghi nhận':'Tiếp theo';if($('#hazardModalTitle'))$('#hazardModalTitle').textContent=step===3?'Xác nhận ghi nhận mối nguy':'Ghi nhận mối nguy mới';updateSummary();}
 function updateSummary(){if($('#summaryZone'))$('#summaryZone').textContent=$('#hazardZone')?.selectedOptions?.[0]?.textContent||'Chưa chọn khu vực';const typ=$('input[name="hazardType"]:checked');if($('#summaryType'))$('#summaryType').textContent=typ?.closest('label')?.innerText?.trim()||'Chưa chọn';if($('#summaryAssignee'))$('#summaryAssignee').textContent=$('#assignee')?.selectedOptions?.[0]?.textContent||'Chưa phân công';if($('#summaryDeadline'))$('#summaryDeadline').textContent=$('#deadline')?.value?new Date($('#deadline').value).toLocaleString('vi-VN'):'Chưa đặt hạn';}
 $('#hazardBackBtn')?.addEventListener('click',()=>setStep(step-1));
 $('#hazardNextBtn')?.addEventListener('click',()=>{
  if(step===1){if(!$('#hazardZone')?.value){notify('Vui lòng chọn khu vực.');return;}if(!$('#hazardDesc')?.value.trim()){$('#hazardDesc')?.focus();notify('Vui lòng mô tả mối nguy.');return;}setStep(2);return;}
  if(step===2){if(!$('input[name="hazardType"]:checked')){notify('Vui lòng chọn loại mối nguy.');return;}setStep(3);return;}
  const desc=$('#hazardDesc')?.value.trim();if(!desc){setStep(1);notify('Vui lòng nhập mô tả mối nguy.');return;}
  const rec={code:'HZ-'+String(Date.now()).slice(-6),zoneCode:$('#hazardZone')?.value||'B',zone:$('#hazardZone')?.selectedOptions?.[0]?.textContent||'Zone B',location:$('#hazardLocation')?.value.trim()||'Chưa xác định vị trí',description:desc,type:$('input[name="hazardType"]:checked')?.closest('label')?.innerText?.trim()||'Khác',level:$('input[name="severity"]:checked')?.value||$('input[name="hazardSeverity"]:checked')?.value||'Trung bình',assignee:$('#assignee')?.selectedOptions?.[0]?.textContent||'Chưa phân công',deadline:$('#deadline')?.value||'',createdAt:new Date().toLocaleString('vi-VN')};
  const all=getRecords();all.push(rec);try{localStorage.setItem('sitesafe_hazards',JSON.stringify(all));}catch(e){notify('Trình duyệt không cho lưu dữ liệu.');return;}
  if(rec.zoneCode===selectedZone && detail?.classList.contains('visible'))renderZoneIssues(selectedZone);hideModal(hazardModal);setStep(1);$('#hazardDesc').value='';$('#hazardLocation').value='';$$('input[name="hazardType"]').forEach(r=>r.checked=false);if($('#descCharCount'))$('#descCharCount').textContent='0';notify(`Đã ghi nhận mối nguy ${rec.code} thành công.`);
 });
 function addRecordToDetail(rec){if(rec.zoneCode===selectedZone&&detail?.classList.contains('visible'))renderZoneIssues(selectedZone);const count=$('#detailIssuesCount');if(count&&detail?.classList.contains('visible'))count.textContent=$('#issuesList')?.children.length+' mối nguy đang mở';}
 ['hazardZone','assignee','deadline','hazardDesc'].forEach(id=>$('#'+id)?.addEventListener('input',updateSummary));
 $$('input[name="hazardType"]').forEach(r=>r.addEventListener('change',updateSummary));
 $('#hazardDesc')?.addEventListener('input',e=>{if($('#descCharCount'))$('#descCharCount').textContent=e.target.value.length;});
 $$('[data-dl]').forEach(b=>b.addEventListener('click',()=>{const d=new Date();if(b.dataset.dl==='2h')d.setHours(d.getHours()+2);else if(b.dataset.dl==='tomorrow')d.setDate(d.getDate()+1);else d.setHours(23,59,0,0);$('#deadline').value=new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16);updateSummary();}));
 $('#uploadZone')?.addEventListener('click',()=>$('#fileInput')?.click());
 $('#fileInput')?.addEventListener('change',e=>{const files=[...(e.target.files||[])],grid=$('#uploadPreviewGrid');if(grid){grid.innerHTML='';files.filter(f=>f.type.startsWith('image/')).forEach(file=>{const img=document.createElement('img');img.src=URL.createObjectURL(file);img.alt=file.name;img.style.cssText='width:64px;height:64px;object-fit:cover;border-radius:6px;margin:4px';grid.appendChild(img);});}$('#uploadPlaceholder')?.classList.toggle('hidden',files.length>0);if(files.length)notify(`Đã chọn ${files.length} tệp minh chứng.`);});
 $('#uploadZone')?.addEventListener('dragover',e=>e.preventDefault());
 $('#uploadZone')?.addEventListener('drop',e=>{e.preventDefault();if($('#fileInput')&&e.dataTransfer?.files){$('#fileInput').files=e.dataTransfer.files;$('#fileInput').dispatchEvent(new Event('change'));}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){hideModal(exportModal);hideModal(hazardModal);closeDetails();closeSidebar();}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){$('.search-box input')?.focus();}});
 updateSummary();previewExport();
})();