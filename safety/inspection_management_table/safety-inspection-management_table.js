document.addEventListener('DOMContentLoaded', function () {
  khoiTaoBoDuLieuKhung();
  khoiTaoDongBoDuAnVaMenuMobile();
  khoiTaoBoLocBang();
  khoiTaoChonTatCaCheckbox();
  khoiTaoModalLenLichVaSua();
  khoiTaoModalXemChiTiet();
  khoiTaoMenuDropdownKhac();
  khoiTaoNutXuatCSV();
});

let danhSachKiemTra = [];
let dangChonId = null; // ID bản ghi đang bấm nút 3 chấm

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
  hienThiDanhSachBang();
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

function hienThiDanhSachBang() {
  const oNhapTimKiem = document.getElementById('oNhapTimKiem');
  const boLocKhuVuc = document.getElementById('boLocKhuVuc');
  const boLocTrangThai = document.getElementById('boLocTrangThai');
  const boLocNguoiPhuTrach = document.getElementById('boLocNguoiPhuTrach');

  const thanBangKiemTra = document.getElementById('thanBangKiemTra');
  const khoiEmptyState = document.getElementById('khoiEmptyState');
  const bangKiemTra = document.getElementById('bangKiemTra');

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

  if (!thanBangKiemTra) return;
  thanBangKiemTra.innerHTML = '';

  if (danhSachLoc.length === 0) {
    if (bangKiemTra) bangKiemTra.style.display = 'none';
    if (khoiEmptyState) khoiEmptyState.style.display = 'block';
  } else {
    if (bangKiemTra) bangKiemTra.style.display = 'table';
    if (khoiEmptyState) khoiEmptyState.style.display = 'none';

    danhSachLoc.forEach(item => {
      let lopTrangThai = 'hoan-thanh';
      if (item.trangThai === 'Đang thực hiện') lopTrangThai = 'dang-thuc-hien';
      if (item.trangThai === 'Đã lên lịch') lopTrangThai = 'da-len-lich';

      const tr = document.createElement('tr');
      if (item.trangThai === 'Đang thực hiện') tr.className = 'hang-kich-hoat';

      tr.innerHTML = `
        <td><input type="checkbox"></td>
        <td><strong>${item.ten}</strong><br><small class="van-ban-xam">${item.id} · ${item.hangMuc} hạng mục</small></td>
        <td><i class="fa-solid fa-location-dot bieu-tuong-xam"></i> ${item.khuVuc}</td>
        <td><div class="hang-nguoi-dung"><span class="anh-da-dien-nho">${item.avatar}</span> ${item.nguoiPhuTrach}</div></td>
        <td><strong>${item.ngay}</strong><br><small class="van-ban-xam">${item.gio}</small></td>
        <td><mark class="nhan-trang-thai ${lopTrangThai}">• ${item.trangThai}</mark></td>
        <td class="van-ban-phai">
          <button type="button" class="nut-thao-tac-bang nut-xem-chi-tiet" data-id="${item.id}" title="Xem chi tiết"><i class="fa-regular fa-eye"></i></button>
          <button type="button" class="nut-thao-tac-bang nut-chinh-sua" data-id="${item.id}" title="Chỉnh sửa"><i class="fa-regular fa-pen-to-square"></i></button>
          <button type="button" class="nut-thao-tac-bang nut-menu-khac" data-id="${item.id}" title="Thao tác khác"><i class="fa-solid fa-ellipsis"></i></button>
        </td>
      `;
      thanBangKiemTra.appendChild(tr);
    });
  }

  ganSuKienChoNutThaoTac();
  khoiTaoChonTatCaCheckbox();
}

/* GẮN SỰ KIỆN CLICK CHO 3 NÚT THAO TÁC TRONG BẢNG */
function ganSuKienChoNutThaoTac() {
  // 1. NÚT XEM CHI TIẾT (MẮT)
  document.querySelectorAll('.nut-xem-chi-tiet').forEach(btn => {
    btn.onclick = function (e) {
      e.stopPropagation();
      const id = this.dataset.id;
      const item = danhSachKiemTra.find(i => i.id === id);
      if (item) {
        document.getElementById('ctMa').textContent = item.id;
        document.getElementById('ctTen').textContent = item.ten;
        document.getElementById('ctKhuVuc').textContent = item.khuVuc;
        document.getElementById('ctNguoi').textContent = item.nguoiPhuTrach;
        document.getElementById('ctThoiGian').textContent = `${item.gio} (${item.ngay})`;
        document.getElementById('ctHangMuc').textContent = `${item.hangMuc} hạng mục`;

        let lopTrangThai = 'hoan-thanh';
        if (item.trangThai === 'Đang thực hiện') lopTrangThai = 'dang-thuc-hien';
        if (item.trangThai === 'Đã lên lịch') lopTrangThai = 'da-len-lich';

        document.getElementById('ctTrangThai').innerHTML = `<mark class="nhan-trang-thai ${lopTrangThai}">• ${item.trangThai}</mark>`;

        const modalXem = document.getElementById('modalXemChiTiet');
        if (modalXem) modalXem.showModal();
      }
    };
  });

  // 2. NÚT CHỈNH SỬA (BÚT CHÌ)
  document.querySelectorAll('.nut-chinh-sua').forEach(btn => {
    btn.onclick = function (e) {
      e.stopPropagation();
      const id = this.dataset.id;
      const item = danhSachKiemTra.find(i => i.id === id);
      if (item) {
        document.getElementById('editIdHidden').value = item.id;
        document.getElementById('tenDotKiemTra').value = item.ten;
        document.getElementById('khuVucMoi').value = item.khuVuc;
        document.getElementById('nguoiPhuTrachMoi').value = item.nguoiPhuTrach;

        // Convert DD/MM/YYYY -> YYYY-MM-DD cho input date
        const parts = item.ngay.split('/');
        if (parts.length === 3) {
          document.getElementById('ngayKiemTraMoi').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }

        document.getElementById('gioKiemTraMoi').value = item.gio;
        const totalHM = item.hangMuc.split('/')[1] || 15;
        document.getElementById('soHangMucMoi').value = totalHM;
        document.getElementById('trangThaiMoi').value = item.trangThai;

        document.getElementById('tieuDeModalForm').innerHTML = `<i class="fa-regular fa-pen-to-square bieu-tuong-cam"></i> Chỉnh sửa đợt kiểm tra (${item.id})`;
        document.getElementById('nutLuuForm').textContent = 'Cập nhật thay đổi';

        const modalForm = document.getElementById('modalLenLich');
        if (modalForm) modalForm.showModal();
      }
    };
  });

  // 3. NÚT THAO TÁC KHÁC (3 CHẤM)
  document.querySelectorAll('.nut-menu-khac').forEach(btn => {
    btn.onclick = function (e) {
      e.stopPropagation();
      dangChonId = this.dataset.id;
      const menu = document.getElementById('menuThaoTacKhac');

      const rect = this.getBoundingClientRect();
      menu.style.top = `${rect.bottom + window.scrollY + 4}px`;
      menu.style.left = `${rect.left + window.scrollX - 130}px`;

      menu.classList.add('hien-thi');
    };
  });
}

function khoiTaoMenuDropdownKhac() {
  const menu = document.getElementById('menuThaoTacKhac');

  // Ẩn menu khi click ra ngoài
  document.addEventListener('click', () => {
    if (menu) menu.classList.remove('hien-thi');
  });

  // In phiếu
  document.getElementById('nutInPhieu').onclick = function () {
    alert(`Đang khởi tạo lệnh in phiếu kiểm tra cho đợt (${dangChonId})...`);
  };

  // Đổi trạng thái nhanh
  document.getElementById('nutDoiTrangThai').onclick = function () {
    const item = danhSachKiemTra.find(i => i.id === dangChonId);
    if (item) {
      if (item.trangThai === 'Đã lên lịch') item.trangThai = 'Đang thực hiện';
      else if (item.trangThai === 'Đang thực hiện') item.trangThai = 'Hoàn thành';
      else item.trangThai = 'Đã lên lịch';

      luuVaoLocalStorage();
      hienThiDanhSachBang();
      alert(`Đã cập nhật trạng thái mới cho đợt (${item.id}): "${item.trangThai}"`);
    }
  };

  // Xóa đợt kiểm tra
  document.getElementById('nutXoaDotKiemTra').onclick = function () {
    if (confirm(`Bạn có chắc chắn muốn xóa đợt kiểm tra (${dangChonId}) này không?`)) {
      danhSachKiemTra = danhSachKiemTra.filter(i => i.id !== dangChonId);
      luuVaoLocalStorage();
      hienThiDanhSachBang();
      alert('Đã xóa đợt kiểm tra thành công!');
    }
  };
}

function khoiTaoModalXemChiTiet() {
  const modal = document.getElementById('modalXemChiTiet');
  const nutDong = document.getElementById('nutDongModalXem');
  const nutDongFooter = document.getElementById('nutDongXemFooter');

  if (nutDong && modal) nutDong.onclick = () => modal.close();
  if (nutDongFooter && modal) nutDongFooter.onclick = () => modal.close();
}

function khoiTaoModalLenLichVaSua() {
  const modal = document.getElementById('modalLenLich');
  const nutMo = document.getElementById('nutLenLichMoi');
  const nutDong = document.getElementById('nutDongModal');
  const nutHuy = document.getElementById('nutHuyModal');
  const form = document.getElementById('formLenLichMoi');

  if (nutMo && modal) {
    nutMo.onclick = () => {
      document.getElementById('editIdHidden').value = '';
      form.reset();
      document.getElementById('tieuDeModalForm').innerHTML = `<i class="fa-solid fa-calendar-plus bieu-tuong-cam"></i> Lên lịch kiểm tra an toàn mới`;
      document.getElementById('nutLuuForm').textContent = 'Lưu & Lên lịch';
      modal.showModal();
    };
  }

  if (nutDong && modal) nutDong.onclick = () => modal.close();
  if (nutHuy && modal) nutHuy.onclick = () => modal.close();

  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();

      const editId = document.getElementById('editIdHidden').value;
      const ten = document.getElementById('tenDotKiemTra').value.trim();
      const khuVuc = document.getElementById('khuVucMoi').value;
      const nguoiPhuTrach = document.getElementById('nguoiPhuTrachMoi').value;
      const ngayRaw = document.getElementById('ngayKiemTraMoi').value;
      const gio = document.getElementById('gioKiemTraMoi').value;
      const soHangMuc = document.getElementById('soHangMucMoi').value || 15;
      const trangThai = document.getElementById('trangThaiMoi').value || 'Đã lên lịch';

      const parts = ngayRaw.split('-');
      const ngayFormat = `${parts[2]}/${parts[1]}/${parts[0]}`;

      const nameParts = nguoiPhuTrach.split(' ');
      const avatar = nameParts.length >= 2 
        ? (nameParts[nameParts.length - 2][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : 'CB';

      if (editId) {
        // CHỈNH SỬA
        const index = danhSachKiemTra.findIndex(i => i.id === editId);
        if (index !== -1) {
          const currentDone = danhSachKiemTra[index].hangMuc.split('/')[0] || '0';
          danhSachKiemTra[index].ten = ten;
          danhSachKiemTra[index].khuVuc = khuVuc;
          danhSachKiemTra[index].khuVucCode = khuVuc.includes('B1') ? 'Khu B1' : khuVuc.includes('B2') ? 'Khu B2' : 'Khu B3';
          danhSachKiemTra[index].nguoiPhuTrach = nguoiPhuTrach;
          danhSachKiemTra[index].avatar = avatar;
          danhSachKiemTra[index].ngay = ngayFormat;
          danhSachKiemTra[index].gio = gio;
          danhSachKiemTra[index].hangMuc = `${currentDone}/${soHangMuc}`;
          danhSachKiemTra[index].trangThai = trangThai;

          alert(`Đã cập nhật đợt kiểm tra "${editId}" thành công!`);
        }
      } else {
        // TẠO MỚI
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
          hangMuc: `0/${soHangMuc}`,
          trangThai: trangThai
        };
        danhSachKiemTra.unshift(banGhiMoi);
        alert(`Đã thêm đợt kiểm tra mới "${ten}" (${maMoi}) thành công!`);
      }

      luuVaoLocalStorage();
      hienThiDanhSachBang();
      form.reset();
      modal.close();
    };
  }
}

function capNhatThongKeKPI(danhSachLoc) {
  const kpiTong = document.getElementById('kpiTong');
  const kpiDaLenLich = document.getElementById('kpiDaLenLich');
  const kpiDangThucHien = document.getElementById('kpiDangThucHien');
  const kpiHoanThanh = document.getElementById('kpiHoanThanh');
  const nhanDemSoLuong = document.getElementById('nhanDemSoLuong');
  const nhanHienThiPhanTrang = document.getElementById('nhanHienThiPhanTrang');

  const tong = danhSachLoc.length;
  const daLenLich = danhSachLoc.filter(i => i.trangThai === 'Đã lên lịch').length;
  const dangThucHien = danhSachLoc.filter(i => i.trangThai === 'Đang thực hiện').length;
  const hoanThanh = danhSachLoc.filter(i => i.trangThai === 'Hoàn thành').length;

  if (kpiTong) kpiTong.textContent = tong < 10 ? `0${tong}` : tong;
  if (kpiDaLenLich) kpiDaLenLich.textContent = daLenLich < 10 ? `0${daLenLich}` : daLenLich;
  if (kpiDangThucHien) kpiDangThucHien.textContent = dangThucHien < 10 ? `0${dangThucHien}` : dangThucHien;
  if (kpiHoanThanh) kpiHoanThanh.textContent = hoanThanh < 10 ? `0${hoanThanh}` : hoanThanh;

  if (nhanDemSoLuong) nhanDemSoLuong.textContent = `${tong} đợt`;
  if (nhanHienThiPhanTrang) nhanHienThiPhanTrang.textContent = `Hiển thị 1–${tong} trong tổng số ${tong} đợt kiểm tra`;
}

function khoiTaoBoLocBang() {
  const oNhapTimKiem = document.getElementById('oNhapTimKiem');
  const boLocKhuVuc = document.getElementById('boLocKhuVuc');
  const boLocTrangThai = document.getElementById('boLocTrangThai');
  const boLocNguoiPhuTrach = document.getElementById('boLocNguoiPhuTrach');
  const nutResetBoLoc = document.getElementById('nutResetBoLoc');
  const nutXoaBoLocEmpty = document.getElementById('nutXoaBoLocEmpty');

  if (oNhapTimKiem) oNhapTimKiem.addEventListener('input', hienThiDanhSachBang);
  if (boLocKhuVuc) boLocKhuVuc.addEventListener('change', hienThiDanhSachBang);
  if (boLocTrangThai) boLocTrangThai.addEventListener('change', hienThiDanhSachBang);
  if (boLocNguoiPhuTrach) boLocNguoiPhuTrach.addEventListener('change', hienThiDanhSachBang);

  function resetBoLoc() {
    if (oNhapTimKiem) oNhapTimKiem.value = '';
    if (boLocKhuVuc) boLocKhuVuc.value = '';
    if (boLocTrangThai) boLocTrangThai.value = '';
    if (boLocNguoiPhuTrach) boLocNguoiPhuTrach.value = '';
    hienThiDanhSachBang();
  }

  if (nutResetBoLoc) nutResetBoLoc.addEventListener('click', resetBoLoc);
  if (nutXoaBoLocEmpty) nutXoaBoLocEmpty.addEventListener('click', resetBoLoc);
}

function khoiTaoChonTatCaCheckbox() {
  const chonTatCa = document.getElementById('chonTatCa');
  const danhSachOTich = document.querySelectorAll('#thanBangKiemTra input[type="checkbox"]');

  if (chonTatCa) {
    chonTatCa.addEventListener('change', function (e) {
      const trangThai = e.target.checked;
      danhSachOTich.forEach(function (oTich) {
        oTich.checked = trangThai;
      });
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

function khoiTaoNutXuatCSV() {
  const nutXuatCSV = document.getElementById('nutXuatCSV');
  if (nutXuatCSV) {
    nutXuatCSV.onclick = function () {
      let csvContent = "data:text/csv;charset=utf-8,Ma,TenDotKiemTra,KhuVuc,NguoiPhuTrach,NgayGio,TrangThai\n";
      danhSachKiemTra.forEach(item => {
        csvContent += `${item.id},"${item.ten}","${item.khuVuc}","${item.nguoiPhuTrach}","${item.ngay} ${item.gio}",${item.trangThai}\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Danh_Sach_Kiem_Tra_SiteSafe.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }
}