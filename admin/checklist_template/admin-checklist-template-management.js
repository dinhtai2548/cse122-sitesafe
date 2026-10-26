const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let boDemThongBao, mucDangSua=null;

function thongBao(message){
  const el=$('#thongBaoNoi');
  el.textContent=message;
  el.classList.add('hien-thi');
  clearTimeout(boDemThongBao);
  boDemThongBao=setTimeout(()=>el.classList.remove('hien-thi'),2600);
}

function capNhatSoLuong(){
  const items=$$('.muc-kiem-tra'),selected=items.filter(item=>item.querySelector('input[type="checkbox"]').checked).length;
  $('#soLuongMuc').textContent=`${items.length} mục kiểm tra`;
  $('#chuSoLuongChon').textContent=`${selected}/${items.length} mục được chọn`;
  $('#chuSoLuongLuu').textContent=`${selected} mục đã chọn`;
}

$$('#danhSachKiemTra .nut-chon-muc input').forEach(input=>input.addEventListener('change',capNhatSoLuong));

function moHopThoaiSua(item){
  mucDangSua=item;
  $('#tieuDeHopThoaiSua').textContent='Chỉnh sửa mục kiểm tra';
  $('#noiDungMucSua').value=item.querySelector('.noi-dung-muc b').textContent+'\n'+item.querySelector('.noi-dung-muc p').textContent;
  $('#thamChieuSua').value=item.querySelector('.tham-chieu span').textContent;
  $('#hopThoaiSua').showModal();
}

$$('.sua-muc').forEach(button=>button.addEventListener('click',()=>moHopThoaiSua(button.closest('.muc-kiem-tra'))));

$('#nutDongSua').addEventListener('click',()=>$('#hopThoaiSua').close());
$('#nutHuySua').addEventListener('click',()=>$('#hopThoaiSua').close());

$('#bieuMauSua').addEventListener('submit',e=>{
  e.preventDefault();
  if(!mucDangSua)return;
  const lines=$('#noiDungMucSua').value.split('\n').map(s=>s.trim()).filter(Boolean);
  mucDangSua.querySelector('.noi-dung-muc b').textContent=lines[0]||'Mục kiểm tra mới';
  mucDangSua.querySelector('.noi-dung-muc p').textContent=lines.slice(1).join(' ')||'Nội dung cần được cán bộ HSE xác nhận.';
  mucDangSua.querySelector('.tham-chieu span').textContent=$('#thamChieuSua').value.trim()||'Cần HSE xác nhận';
  $('#hopThoaiSua').close();
  thongBao('Đã cập nhật mục kiểm tra.');
});

$('#nutThemMuc').addEventListener('click',()=>{
  const list=$('#danhSachKiemTra'),num=list.querySelectorAll('.muc-kiem-tra').length+1;
  const item=document.createElement('article');
  item.className='muc-kiem-tra';
  item.innerHTML=`<label class="nut-chon-muc"><input type="checkbox" checked><span class="o-tich-gia"></span></label><span class="so-thu-tu">${String(num).padStart(2,'0')}</span><div class="noi-dung-muc"><b>Mục kiểm tra mới</b><p>Nhấn biểu tượng chỉnh sửa để nhập nội dung chi tiết.</p></div><div class="tham-chieu"><span>Cần HSE xác nhận</span><small>Cần HSE xác nhận</small></div><button class="sua-muc" aria-label="Sửa mục kiểm tra">✎</button>`;
  list.appendChild(item);
  item.querySelector('input').addEventListener('change',capNhatSoLuong);
  item.querySelector('.sua-muc').addEventListener('click',()=>moHopThoaiSua(item));
  capNhatSoLuong();
  moHopThoaiSua(item);
});

$('#nutTaoAi').addEventListener('click',()=>{
  const desc=$('#moTaCongViec').value.trim();
  if(!desc){
    $('#moTaCongViec').focus();
    thongBao('Vui lòng nhập mô tả công việc.');
    return;
  }
  thongBao('Đã cập nhật mô tả. Đây là bản demo, chưa kết nối dịch vụ AI thật.');
});

$('#nutTaoMauMoi').addEventListener('click',()=>{
  if(confirm('Tạo mẫu mới? Các thay đổi chưa lưu có thể bị mất.')){location.reload();}
});

$('#nutHuy').addEventListener('click',()=>{
  if(confirm('Bạn có muốn rời trang tạo mẫu? Các thay đổi chưa lưu sẽ không được giữ.'))
    thongBao('Đây là bản demo — chưa có dữ liệu nào được lưu.');
});

$('#nutLuu').addEventListener('click',()=>{
  const selected=$$('.muc-kiem-tra input[type="checkbox"]:checked').length;
  if(!$('#tenMau').value.trim()){
    $('#tenMau').focus();
    thongBao('Vui lòng nhập tên mẫu kiểm tra.');
    return;
  }
  if(selected===0){
    thongBao('Hãy chọn ít nhất một mục kiểm tra.');
    return;
  }
  if(!$('#xacNhanRaSoat').checked){
    thongBao('Vui lòng xác nhận đã rà soát nội dung trước khi lưu.');
    return;
  }
  thongBao(`Đã lưu bản nháp “${$('#tenMau').value.trim()}” trong phiên demo.`);
});

// Xử lý Đóng / Mở Sidebar & Backdrop trên Mobile
const thanhDieuHuong = $('#thanhDieuHuong');
const menuDiDong = $('#menuDiDong');
const lopPhuMenu = $('#lopPhuMenu');
const nutDongMenuMobile = $('#nutDongMenuMobile');

function toggleSidebar() {
  if (!thanhDieuHuong) return;
  const isOpen = thanhDieuHuong.classList.toggle('mo-menu');
  if (lopPhuMenu) {
    lopPhuMenu.classList.toggle('hien-thi', isOpen);
  }
}

function closeSidebar() {
  if (thanhDieuHuong) thanhDieuHuong.classList.remove('mo-menu');
  if (lopPhuMenu) {
    lopPhuMenu.classList.remove('hien-thi');
  }
}

if (menuDiDong) {
  menuDiDong.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
  });
} 

if (nutDongMenuMobile) {
  nutDongMenuMobile.addEventListener('click', closeSidebar);
}

if (lopPhuMenu) {
  lopPhuMenu.addEventListener('click', closeSidebar);
}

// Tự động đóng menu khi bấm vào các liên kết trong sidebar trên màn hình nhỏ
$$('.thanh-dieu-huong nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 850) {
      closeSidebar();
    }
  });
});

// Đồng bộ danh sách công trường
const siteSelect = $('#siteSelect');
const topbarProjectTitle = $('#topbarProjectTitle');
const savedProject = localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B';

if (siteSelect) {
  siteSelect.value = savedProject;
  siteSelect.addEventListener('change', (e) => {
    localStorage.setItem('sitesafe_current_project', e.target.value);
    if (topbarProjectTitle) {
      topbarProjectTitle.textContent = e.target.value + ' ⌄';
    }
  });
}
if (topbarProjectTitle) {
  topbarProjectTitle.textContent = savedProject + ' ⌄';
}

if ($('#timKiemToanCuc')) {
  $('#timKiemToanCuc').addEventListener('keydown',e=>{if(e.key==='Enter')thongBao('Tìm kiếm: '+(e.target.value||'nhập từ khóa trước'))});
}

capNhatSoLuong();