const subcontractors = [
  {rank:'01',name:'Cơ khí Việt Thành',detail:'Cơ khí · Cầu thang, lan can',total:12,closed:12,overdue:0},
  {rank:'02',name:'Cốp pha Thành Đạt',detail:'Cốp pha · Sàn, lan đỡ',total:22,closed:20,overdue:0},
  {rank:'03',name:'Kết cấu Hòa Bình',detail:'Kết cấu · Lắp ván cốp pha',total:32,closed:26,overdue:1},
  {rank:'04',name:'Hoàn thiện Minh Phát',detail:'Hoàn thiện · Lối đi, PCCC',total:20,closed:16,overdue:0},
  {rank:'05',name:'Giàn giáo Đại Việt',detail:'Giàn giáo · Sàn thao tác',total:24,closed:18,overdue:1},
  {rank:'06',name:'Cơ điện An Khang',detail:'Cơ điện · Điện tạm',total:18,closed:12,overdue:1}
];
const groups = [
  {name:'Trên cao',total:36,high:18,mid:10,low:8},
  {name:'Giàn giáo',total:28,high:12,mid:10,low:6},
  {name:'Điện',total:24,high:9,mid:9,low:6},
  {name:'Thiết bị',total:16,high:5,mid:6,low:5},
  {name:'Lối đi',total:14,high:4,mid:5,low:5},
  {name:'PCCC',total:8,high:2,mid:3,low:3}
];
const toast = document.getElementById('toast');
let toastTimer;
function notify(message){
  toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);
}
function renderBars(){
  const chart=document.getElementById('barChart');
  chart.innerHTML=groups.map(g=>`
    <div class="bar-item" title="${g.name}: ${g.total} mối nguy">
      <span class="bar-total">${g.total}</span>
      <div class="bar-stack" style="--height:${g.total/40*100}">
        <div class="bar-segment" style="height:${g.high/g.total*100}%">${g.high}</div>
        <div class="bar-segment mid" style="height:${g.mid/g.total*100}%">${g.mid}</div>
        <div class="bar-segment low" style="height:${g.low/g.total*100}%">${g.low}</div>
      </div><span class="bar-label">${g.name}</span>
    </div>`).join('');
}
function renderRanking(){
  const body=document.getElementById('rankingBody');
  body.innerHTML=subcontractors.map(s=>{
    const open=s.total-s.closed, rate=s.closed/s.total*100;
    const rateText=rate.toLocaleString('vi-VN',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';
    const good=rate>=80;
    return `<tr>
      <td>${s.rank}</td>
      <td><b>${s.name}</b><small>${s.detail}</small></td>
      <td>${s.total}</td><td>${s.closed}</td><td>${open}</td>
      <td class="${s.overdue?'red-text':''}">${s.overdue}</td>
      <td><div class="rate-cell"><span class="rate-track"><span class="rate-fill ${good?'':'warn'}" style="display:block;width:${rate}%"></span></span><b>${rateText}</b></div></td>
      <td><span class="rating ${good?'good':'warn'}">${good?'Đạt mục tiêu':rate>=70?'Gần đạt':'Cần cải thiện'}</span></td>
    </tr>`;
  }).join('');
}
renderBars();renderRanking();
document.getElementById('exportBtn').addEventListener('click',()=>{
  const rows=[['Hạng','Thầu phụ','Hạng mục','Mối nguy','Đã đóng','Đang mở','Quá hạn','Tỷ lệ đóng','Đánh giá']];
  subcontractors.forEach(s=>{
    const rate=s.closed/s.total*100,open=s.total-s.closed;
    rows.push([s.rank,s.name,s.detail,s.total,s.closed,open,s.overdue,rate.toFixed(1)+'%',rate>=80?'Đạt mục tiêu':rate>=70?'Gần đạt':'Cần cải thiện']);
  });
  rows.push(['Tổng','Dự án Zone B','','128','104','24','3','81,3%','Đạt mục tiêu']);
  const csv='\ufeff'+rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
  const a=document.createElement('a');a.href=url;a.download='bao-cao-phan-tich-an-toan.csv';a.click();URL.revokeObjectURL(url);
  notify('Đã xuất báo cáo CSV. Bạn có thể mở bằng Excel.');
});
document.getElementById('assignBtn').addEventListener('click',()=>notify('Báo cáo tổng hợp dành cho ban quản lý công trường.'));
document.querySelector('.chart-menu').addEventListener('click',()=>notify('Biểu đồ mối nguy theo nhóm rủi ro.'));
document.querySelectorAll('.chart-menu')[1].addEventListener('click',()=>notify('Biểu đồ tiến độ khắc phục.'));
document.getElementById('dateRange').addEventListener('change',e=>{
  document.getElementById('reportSubtitle').textContent=`Khoảng thời gian: ${e.target.value} · Phân tích dữ liệu mẫu`;
  notify('Đã cập nhật khoảng thời gian hiển thị.');
});
document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach(item=>item.addEventListener('click',()=>{
  document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));item.classList.add('active');
  if(!item.textContent.includes('Báo cáo an toàn'))notify('Mục này đang là giao diện minh họa.');
  document.getElementById('sidebar').classList.remove('open');
}));
