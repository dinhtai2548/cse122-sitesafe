document.addEventListener('DOMContentLoaded', function () {
  khoiTaoBoDuLieuKhung();
  khoiTaoDongBoDuAnVaMenuMobile();
  khoiTaoBoLocLich();
  khoiTaoModalLenLich();
  khoiTaoModalXemChiTiet();
  khoiTaoNutHomNay();
});

let danhSachKiemTra = [];

function khoiTaoBoDuLieuKhung() {
  const duLieuLuu = localStorage.getItem('sitesafe_inspection_list');
  if (duLieuLuu) {
    try {
      danhSachKiemTra = JSON.parse(duLieuLuu);
    } catch (e) {
      napDuLieuMacDinh();
    }
  } else {
    napDuLieuMacDinh();
  }
  renderLichTuan();
}

function napDuLieuMacDinh() {
  danhSachKiemTra = [
    { id: 'KT-0241', ten: 'An toàn giàn giáo', khuVuc: 'Tầng 12 · Khu B1', khuVucCode: 'Khu B1', nguoiPhuTrach: 'Nguyễn Minh Anh', avatar: 'MA', ngay: '28/09/2026', gio: '08:00 – 10:00', hangMuc: '18/18', trangThai: 'Hoàn thành' },
    { id: 'KT-0242', ten: 'Thiết bị nâng hạ', khuVuc: 'Bãi cẩu · Khu B2', khuVucCode: 'Khu B2', nguoiPhuTrach: 'Trần Quốc Huy', avatar: 'QH', ngay: '28/09/2026', gio: '13:00 – 15:00', hangMuc: '24/24', trangThai: 'Hoàn thành' },
    { id: 'KT-0243', ten: 'An toàn điện tạm', khuVuc: 'Tầng 08 · Khu B1', khuVucCode: 'Khu B1', nguoiPhuTrach: 'Lê Hoàng Nam', avatar: 'HN', ngay: '29/09/2026', gio: '09:00 – 11:00', hangMuc: '16/16', trangThai: 'Hoàn thành' },
    { id: 'KT-0244', ten: 'Phòng cháy chữa cháy', khuVuc: 'Kho vật tư · Khu B3', khuVucCode: 'Khu B3', nguoiPhuTrach: 'Phạm Thu Hà', avatar: 'TH', ngay: '29/09/2026', gio: '14:00 – 16:00', hangMuc: '22/22', trangThai: 'Hoàn thành' },
    { id: 'KT-0245', ten: 'Làm việc trên cao', khuVuc: 'Tầng 15 · Khu B1', khuVucCode: 'Khu B1', nguoiPhuTrach: 'Nguyễn Minh Anh', avatar: 'MA', ngay: '30/09/2026', gio: '08:00 – 10:00', hangMuc: '20/20', trangThai: 'Hoàn thành' },
    { id: 'KT-0246', ten: 'An toàn đào đất', khuVuc: 'Hầm B2 · Khu B2', khuVucCode: 'Khu B2', nguoiPhuTrach: 'Trần Quốc Huy', avatar: 'QH', ngay: '01/10/2026', gio: '10:00 – 12:00', hangMuc: '15/15', trangThai: 'Hoàn thành' },
    { id: 'KT-0247', ten: 'Vệ sinh công trường', khuVuc: 'Toàn bộ · Khu B', khuVucCode: 'Khu B', nguoiPhuTrach: 'Phạm Thu Hà', avatar: 'TH', ngay: '02/10/2026', gio: '09:00 – 11:00', hangMuc: '12/12', trangThai: 'Hoàn thành' },
    { id: 'KT-0248', ten: 'Kiểm tra HSE định kỳ', khuVuc: 'Tầng 10 · Khu B1', khuVucCode: 'Khu B1', nguoiPhuTrach: 'Nguyễn Minh Anh', avatar: 'MA', ngay: '03/10/2026', gio: '08:00 – 10:00', hangMuc: '14/28', trangThai: 'Đang thực hiện' },
    { id: 'KT-0249', ten: 'An toàn hàn cắt', khuVuc: 'Xưởng cơ khí · Khu B3', khuVucCode: 'Khu B3', nguoiPhuTrach: 'Lê Hoàng Nam', avatar: 'HN', ngay: '03/10/2026', gio: '13:00 – 15:00', hangMuc: '0/18', trangThai: 'Đã lên lịch' },
    { id: 'KT-0250', ten: 'Kiểm tra bảo hộ cá nhân', khuVuc: 'Cổng chính · Khu B', khuVucCode: 'Khu B', nguoiPhuTrach: 'Phạm Thu Hà', avatar: 'TH', ngay: '04/10/2026', gio: '10:00 – 12:00', hangMuc: '0/14', trangThai: 'Đã lên lịch' }
  ];
  luuVaoLocalStorage();
}

function luuVaoLocalStorage() {
  localStorage.setItem('sitesafe_inspection_list', JSON.stringify(danhSachKiemTra));
}

const CAC_MOC_GIO = [
  '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const CAC_NGAY_TRONG_TUAN = [
  { text: 'Thứ hai', date: '28/09/2026', shortDate: '28/09', isToday: false },
  { text: 'Thứ ba', date: '29/09/2026', shortDate: '29/09', isToday: false },
  { text: 'Thứ tư', date: '30/09/2026', shortDate: '30/09', isToday: false },
  { text: 'Thứ năm', date: '01/10/2026', shortDate: '01/10', isToday: false },
  { text: 'Thứ sáu', date: '02/10/2026', shortDate: '02/10', isToday: false },
  { text: 'Thứ bảy · Hôm nay', date: '03/10/2026', shortDate: '03/10', isToday: true },
  { text: 'Chủ nhật', date: '04/10/2026', shortDate: '04/10', isToday: false }
];

function renderLichTuan() {
  const oNhapTimKiem = document.getElementById('oNhapTimKiem');
  const boLocKhuVuc = document.getElementById('boLocKhuVuc');
  const boLocTrangThai = document.getElementById('boLocTrangThai');
  const boLocNguoiPhuTrach = document.getElementById('boLocNguoiPhuTrach');

  const tuKhoa = oNhapTimKiem ? oNhapTimKiem.value.toLowerCase().trim() : '';
  const khuVucVal = boLocKhuVuc ? boLocKhuVuc.value : '';
  const trangThaiVal = boLocTrangThai ? boLocTrangThai.value : '';
  const nguoiVal = boLocNguoiPhuTrach ? boLocNguoiPhuTrach.value : '';

  const danhSachLoc = danhSachKiemTra.filter(item => {
    const khopTuKhoa = !tuKhoa || item.ten.toLowerCase().includes(tuKhoa) || item.id.toLowerCase().includes(tuKhoa);
    const khopKhuVuc = !khuVucVal || item.khuVucCode === khuVucVal || item.khuVuc.includes(khuVucVal);
    const khopTrangThai = !trangThaiVal || item.trangThai === trangThaiVal;
    const khopNguoi = !nguoiVal || item.nguoiPhuTrach === nguoiVal;

    return khopTuKhoa && khopKhuVuc && khopTrangThai && khopNguoi;
  });

  capNhatThongKeKPI(danhSachLoc);

  const tbody = document.querySelector('.bang-lich-tuan tbody');
  if (!tbody) return;

  // Ma trận theo dõi ô đã bị chiếm bởi rowspan
  // occupiedCols[dayIndex] = số dòng còn lại bị chiếm
  const occupiedCols = new Array(CAC_NGAY_TRONG_TUAN.length).fill(0);

  tbody.innerHTML = '';

  CAC_MOC_GIO.forEach((gioMoc) => {
    const tr = document.createElement('tr');

    // Cột hiển thị giờ
    const tdGio = document.createElement('td');
    tdGio.className = 'cot-gio';
    tdGio.textContent = gioMoc;
    tr.appendChild(tdGio);

    CAC_NGAY_TRONG_TUAN.forEach((ngayObj, dayIdx) => {
      if (occupiedCols[dayIdx] > 0) {
        occupiedCols[dayIdx]--;
        return; // Bị dòng trước kéo dài qua rowspan, không thêm ô mới
      }

      const td = document.createElement('td');
      if (ngayObj.isToday) {
        td.className = 'cot-hom-nay';
      }

      // Tìm sự kiện phù hợp ngày này và bắt đầu vào khung giờ này
      const suKien = danhSachLoc.find(item => {
        if (item.ngay !== ngayObj.date) return false;
        const gioBatDau = item.gio.split('–')[0].split('-')[0].trim();
        return gioBatDau === gioMoc || gioBatDau.startsWith(gioMoc.split(':')[0]);
      });

      if (suKien) {
        // Mặc định sự kiện kéo dài 2 khung giờ
        td.rowSpan = 2;
        occupiedCols[dayIdx] = 1;

        let lopMau = 'xanh-la';
        if (suKien.trangThai === 'Đang thực hiện') lopMau = 'cam';
        if (suKien.trangThai === 'Đã lên lịch') lopMau = 'xanh-duong';

        const divSuKien = document.createElement('div');
        divSuKien.className = `su-kien-lich ${lopMau}`;
        divSuKien.setAttribute('data-id', suKien.id);
        divSuKien.setAttribute('data-ten', suKien.ten);
        divSuKien.setAttribute('data-khu-vuc', suKien.khuVucCode);
        divSuKien.setAttribute('data-nguoi', suKien.nguoiPhuTrach);
        divSuKien.setAttribute('data-trang-thai', suKien.trangThai);

        divSuKien.innerHTML = `
          <span class="gio-su-kien">${suKien.gio}</span>
          <strong>${suKien.ten}</strong>
          <p>${suKien.khuVuc}<br>${suKien.nguoiPhuTrach}</p>
          <span class="trang-thai ${lopMau}">• ${suKien.trangThai}</span>
        `;

        divSuKien.addEventListener('click', () => {
          moModalChiTiet(suKien);
        });

        td.appendChild(divSuKien);
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

function capNhatThongKeKPI(danhSachLoc) {
  const kpiTong = document.getElementById('kpiTong');
  const kpiDaLenLich = document.getElementById('kpiDaLenLich');
  const kpiDangThucHien = document.getElementById('kpiDangThucHien');
  const kpiHoanThanh = document.getElementById('kpiHoanThanh');
  const nhanDemLich = document.getElementById('nhanDemLich');

  const tong = danhSachLoc.length;
  const daLenLich = danhSachLoc.filter(i => i.trangThai === 'Đã lên lịch').length;
  const dangThucHien = danhSachLoc.filter(i => i.trangThai === 'Đang thực hiện').length;
  const hoanThanh = danhSachLoc.filter(i => i.trangThai === 'Hoàn thành').length;

  if (kpiTong) kpiTong.textContent = tong < 10 ? `0${tong}` : tong;
  if (kpiDaLenLich) kpiDaLenLich.textContent = daLenLich < 10 ? `0${daLenLich}` : daLenLich;
  if (kpiDangThucHien) kpiDangThucHien.textContent = dangThucHien < 10 ? `0${dangThucHien}` : dangThucHien;
  if (kpiHoanThanh) kpiHoanThanh.textContent = hoanThanh < 10 ? `0${hoanThanh}` : hoanThanh;
  if (nhanDemLich) nhanDemLich.textContent = `${tong} đợt kiểm tra`;
}

function moModalChiTiet(item) {
  const ctMa = document.getElementById('ctMa');
  const ctTen = document.getElementById('ctTen');
  const ctKhuVuc = document.getElementById('ctKhuVuc');
  const ctNguoi = document.getElementById('ctNguoi');
  const ctThoiGian = document.getElementById('ctThoiGian');
  const ctHangMuc = document.getElementById('ctHangMuc');
  const ctTrangThai = document.getElementById('ctTrangThai');

  if (ctMa) ctMa.textContent = item.id;
  if (ctTen) ctTen.textContent = item.ten;
  if (ctKhuVuc) ctKhuVuc.textContent = item.khuVuc;
  if (ctNguoi) ctNguoi.textContent = item.nguoiPhuTrach;
  if (ctThoiGian) ctThoiGian.textContent = `${item.gio} (${item.ngay})`;
  if (ctHangMuc) ctHangMuc.textContent = `${item.hangMuc} hạng mục`;

  let lopTrangThai = 'hoan-thanh';
  if (item.trangThai === 'Đang thực hiện') lopTrangThai = 'dang-thuc-hien';
  if (item.trangThai === 'Đã lên lịch') lopTrangThai = 'da-len-lich';

  if (ctTrangThai) {
    ctTrangThai.innerHTML = `<mark class="nhan-trang-thai ${lopTrangThai}">• ${item.trangThai}</mark>`;
  }

  const modalXem = document.getElementById('modalXemChiTiet');
  if (modalXem) modalXem.showModal();
}

function khoiTaoModalXemChiTiet() {
  const modal = document.getElementById('modalXemChiTiet');
  const nutDong = document.getElementById('nutDongModalXem');
  const nutDongFooter = document.getElementById('nutDongXemFooter');

  if (nutDong && modal) nutDong.onclick = () => modal.close();
  if (nutDongFooter && modal) nutDongFooter.onclick = () => modal.close();
}

function khoiTaoModalLenLich() {
  const modal = document.getElementById('modalLenLich');
  const nutMo = document.getElementById('nutLenLichMoi');
  const nutDong = document.getElementById('nutDongModal');
  const nutHuy = document.getElementById('nutHuyModal');
  const form = document.getElementById('formLenLichMoi');

  if (nutMo && modal) {
    nutMo.onclick = () => {
      if (form) form.reset();
      modal.showModal();
    };
  }

  if (nutDong && modal) nutDong.onclick = () => modal.close();
  if (nutHuy && modal) nutHuy.onclick = () => modal.close();

  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();

      const ten = document.getElementById('tenDotKiemTra').value.trim();
      const khuVuc = document.getElementById('khuVucMoi').value;
      const nguoiPhuTrach = document.getElementById('nguoiPhuTrachMoi').value;
      const ngayRaw = document.getElementById('ngayKiemTraMoi').value;
      const gio = document.getElementById('gioKiemTraMoi').value;

      const parts = ngayRaw.split('-');
      const ngayFormat = `${parts[2]}/${parts[1]}/${parts[0]}`;

      const nameParts = nguoiPhuTrach.split(' ');
      const avatar = nameParts.length >= 2
        ? (nameParts[nameParts.length - 2][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : 'CB';

      const maMoi = `KT-0${251 + danhSachKiemTra.length - 10}`;
      const banGhiMoi = {
        id: maMoi,
        ten: ten,
        khuVuc: khuVuc,
        khuVucCode: khuVuc.includes('B1') ? 'Khu B1' : khuVuc.includes('B2') ? 'Khu B2' : 'Khu B3',
        nguoiPhuTrach: nguoiPhuTrach,
        avatar: avatar,
        ngay: ngayFormat,
        gio: gio,
        hangMuc: '0/15',
        trangThai: 'Đã lên lịch'
      };

      danhSachKiemTra.unshift(banGhiMoi);
      luuVaoLocalStorage();
      renderLichTuan();

      alert(`Đã thêm đợt kiểm tra mới "${ten}" (${maMoi}) thành công!`);
      form.reset();
      modal.close();
    };
  }
}

function khoiTaoBoLocLich() {
  const oNhapTimKiem = document.getElementById('oNhapTimKiem');
  const boLocKhuVuc = document.getElementById('boLocKhuVuc');
  const boLocTrangThai = document.getElementById('boLocTrangThai');
  const boLocNguoiPhuTrach = document.getElementById('boLocNguoiPhuTrach');
  const nutResetBoLoc = document.getElementById('nutResetBoLoc');

  if (oNhapTimKiem) oNhapTimKiem.addEventListener('input', renderLichTuan);
  if (boLocKhuVuc) boLocKhuVuc.addEventListener('change', renderLichTuan);
  if (boLocTrangThai) boLocTrangThai.addEventListener('change', renderLichTuan);
  if (boLocNguoiPhuTrach) boLocNguoiPhuTrach.addEventListener('change', renderLichTuan);

  if (nutResetBoLoc) {
    nutResetBoLoc.addEventListener('click', () => {
      if (oNhapTimKiem) oNhapTimKiem.value = '';
      if (boLocKhuVuc) boLocKhuVuc.value = '';
      if (boLocTrangThai) boLocTrangThai.value = '';
      if (boLocNguoiPhuTrach) boLocNguoiPhuTrach.value = '';
      renderLichTuan();
    });
  }
}

function khoiTaoNutHomNay() {
  const nutHomNay = document.getElementById('nutHomNay');
  if (nutHomNay) {
    nutHomNay.addEventListener('click', function () {
      const cotHomNay = document.querySelector('.cot-hom-nay');
      if (cotHomNay) {
        cotHomNay.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      alert('Đã chuyển tới cột lịch hôm nay (Thứ bảy · 03/10/2026)!');
    });
  }
}

function khoiTaoDongBoDuAnVaMenuMobile() {
  const nutMenu = document.getElementById('nutMenuMobile');
  const nutDong = document.getElementById('nutDongMenuMobile');
  const lopPhu = document.getElementById('lopPhuMobile');
  const thanhBen = document.getElementById('thanhBen');

  function moMenu(e) {
    if (e) e.stopPropagation();
    if (thanhBen) thanhBen.classList.add('mo-menu-mobile');
    if (lopPhu) lopPhu.classList.add('hien-thi');
    document.body.style.overflow = 'hidden';
  }

  function dongMenu(e) {
    if (e) e.stopPropagation();
    if (thanhBen) thanhBen.classList.remove('mo-menu-mobile');
    if (lopPhu) lopPhu.classList.remove('hien-thi');
    document.body.style.overflow = '';
  }

  if (nutMenu) nutMenu.addEventListener('click', moMenu);
  if (nutDong) nutDong.addEventListener('click', dongMenu);
  if (lopPhu) lopPhu.addEventListener('click', dongMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dongMenu(e);
  });

  const siteSelect = document.getElementById('siteSelect');
  const topbarTitle = document.getElementById('topbarProjectTitle');
  const savedProject = localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B';

  if (siteSelect) {
    siteSelect.value = savedProject;
    siteSelect.addEventListener('change', function (e) {
      const val = e.target.value;
      localStorage.setItem('sitesafe_current_project', val);
      if (topbarTitle) topbarTitle.textContent = val;
    });
  }

  if (topbarTitle) topbarTitle.textContent = savedProject;
}
