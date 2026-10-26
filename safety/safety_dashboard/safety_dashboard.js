document.addEventListener('DOMContentLoaded', function () {
  khoiTaoSuKienCanhBao();
  khoiTaoChucNangLocSuCo();
  khoiTaoNutHanhDongNhanh();
  khoiTaoDongBoDuAnVaMenuMobile();
  khoiTaoNutThaoTacDashboard();
  napDanhSachMoiNguyDaLuu();
});

function khoiTaoDongBoDuAnVaMenuMobile() {
  // Mobile drawer toggle
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

  // Sync current project
  const siteSelect = document.getElementById('siteSelect');
  const topbarTitle = document.getElementById('topbarProjectTitle');

  const savedProject = localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B';

  if (siteSelect) {
    siteSelect.value = savedProject;
    siteSelect.addEventListener('change', function (e) {
      const val = e.target.value;
      localStorage.setItem('sitesafe_current_project', val);
      if (topbarTitle) {
        topbarTitle.innerHTML = `${val} <i class="fa-solid fa-chevron-down"></i>`;
      }
    });
  }

  if (topbarTitle) {
    topbarTitle.innerHTML = `${savedProject} <i class="fa-solid fa-chevron-down"></i>`;
  }
}

function khoiTaoSuKienCanhBao() {
  const lienKet = document.querySelector('.lien-ket-canh-bao');
  if (lienKet) {
    lienKet.addEventListener('click', function (e) {
      e.preventDefault();
      const danhSachSuCo = document.querySelector('.danh-sach-su-co');
      if (danhSachSuCo) {
        danhSachSuCo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showToast('Đã di chuyển tới danh sách sự cố ưu tiên!');
    });
  }
}

function khoiTaoChucNangLocSuCo() {
  const danhSachTab = document.querySelectorAll('.tab-nho');
  const danhSachSuCo = document.querySelectorAll('.the-su-co');

  danhSachTab.forEach(function (tab) {
    tab.addEventListener('click', function () {
      danhSachTab.forEach(function (t) { t.classList.remove('kich-hoat'); });
      tab.classList.add('kich-hoat');

      const loai = tab.textContent.trim();
      danhSachSuCo.forEach(function (the) {
        if (loai.includes('Quá hạn')) {
          the.style.display = the.classList.contains('nguy-hiem') ? 'block' : 'none';
        } else if (loai.includes('Chờ duyệt')) {
          the.style.display = the.classList.contains('canh-bao') ? 'block' : 'none';
        } else {
          the.style.display = 'block';
        }
      });
    });
  });
}

function khoiTaoNutHanhDongNhanh() {
  const danhSachNut = document.querySelectorAll('.chan-su-co .nut-chinh');
  danhSachNut.forEach(function (nut) {
    nut.addEventListener('click', function () {
      showToast('Đã gửi yêu cầu xử lý thành công!');
    });
  });
}

function khoiTaoNutThaoTacDashboard() {
  const btnXuat = document.getElementById('btnXuatBaoCao');
  const btnGhiNhan = document.getElementById('btnGhiNhanMoiNguy');
  const dialog = document.getElementById('hopThoaiGhiNhanMoiNguy');
  const form = document.getElementById('formGhiNhanMoiNguy');
  const btnDong = document.getElementById('btnDongHopThoaiMoiNguy');
  const btnHuy = document.getElementById('btnHuyHopThoaiMoiNguy');
  const inputHan = document.getElementById('inputHanXuLy');

  // 1. Xử lý xuất báo cáo an toàn CSV
  if (btnXuat) {
    btnXuat.addEventListener('click', function () {
      const projectName = localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B';
      const now = new Date();

      let csv = '\uFEFFBÁO CÁO TỔNG QUAN AN TOÀN SITESAFE\n';
      csv += `Dự án,${projectName}\n`;
      csv += `Thời điểm xuất,${now.toLocaleString('vi-VN')}\n`;
      csv += `Người lập báo cáo,Nguyễn Thanh (Cán bộ an toàn HSE)\n\n`;
      csv += `CHỈ SỐ AN TOÀN,GIÁ TRỊ,MỤC TIÊU TIÊU CHUẨN\n`;
      csv += `Tỷ lệ tuân thủ an toàn,94.2%,>= 95%\n`;
      csv += `Checklist kiểm tra đã hoàn thành,28/30 ca,100%\n`;
      csv += `Mối nguy chưa xử lý dứt điểm,03 sự cố,0 sự cố\n`;
      csv += `Số giờ an toàn liên tục,428 giờ,500 giờ\n\n`;
      csv += `DANH SÁCH MỐI NGUY HIỆN TRƯỜNG\n`;
      csv += `Mã,Tên mối nguy,Khu vực,Mức độ rủi ro,Trạng thái,Người phụ trách\n`;
      csv += `SC-01,Mép sàn tầng 12 chưa lắp lan can,Zone A · Tầng 12,Rủi ro cao,Quá hạn,Trần Nam\n`;
      csv += `SC-02,Tủ điện tạm thiếu nắp che mưa,Zone C · Tầng 6,Rủi ro cao,Quá hạn,Lê Hoàng\n`;
      csv += `SC-03,Giàn giáo thiếu giằng chéo,Zone B · Tầng 3,Rủi ro cao,Quá hạn,Trần Hùng\n`;

      try {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Bao_cao_an_toan_${projectName.replace(/\s+/g, '_')}_${now.toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (err) {
        const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csv);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Bao_cao_an_toan_${projectName.replace(/\s+/g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      showToast('Đã xuất và tải xuống báo cáo an toàn tổng quan (CSV)!');
    });
  }

  // 2. Xử lý ghi nhận mối nguy mới
  if (inputHan) {
    const defaultDue = new Date();
    defaultDue.setHours(defaultDue.getHours() + 4);
    inputHan.value = defaultDue.toISOString().slice(0, 16);
  }

  if (btnGhiNhan && dialog) {
    btnGhiNhan.addEventListener('click', function () {
      dialog.showModal();
    });
  }

  if (btnDong && dialog) btnDong.addEventListener('click', () => dialog.close());
  if (btnHuy && dialog) btnHuy.addEventListener('click', () => dialog.close());

  if (dialog) {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  if (form && dialog) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const ten = document.getElementById('inputTenMoiNguy')?.value?.trim() || 'Mối nguy mới ghi nhận';
      const khuVuc = document.getElementById('selectKhuVucMoiNguy')?.value || 'Zone A · Tầng 12';
      const mucDo = document.getElementById('selectMucDoRuiRo')?.value || 'canh-bao';
      const moTa = document.getElementById('inputMoTaMoiNguy')?.value?.trim() || 'Hiện trường cần giám sát an toàn.';
      const nguoi = document.getElementById('selectNguoiPhuTrachMoiNguy')?.value || 'Trần Nam';

      const hazardItem = {
        id: `SC-${Math.floor(100 + Math.random() * 900)}`,
        ten,
        khuVuc,
        mucDo,
        moTa,
        nguoi,
        ngayTao: new Date().toLocaleDateString('vi-VN')
      };

      themTheMoiNguyVaoGiaoDien(hazardItem, true);
      luuMoiNguyVaoLocalStorage(hazardItem);

      // Cập nhật số liệu thống kê KPI
      const elTong = document.getElementById('valTongMoiNguy');
      const elMo = document.getElementById('valHanhDongMo');
      const elDescTong = document.getElementById('descTongMoiNguy');
      const elDescMo = document.getElementById('descHanhDongMo');

      if (elTong) {
        let countTong = parseInt(elTong.textContent) || 128;
        countTong++;
        elTong.innerHTML = `${countTong} <small>Zone B</small>`;
        if (elDescTong) elDescTong.textContent = `104 đã đóng · ${countTong - 104} đang mở`;
      }
      if (elMo) {
        let countMo = parseInt(elMo.textContent) || 24;
        countMo++;
        elMo.innerHTML = `${countMo} <small>hành động</small>`;
        if (elDescMo) elDescMo.textContent = `18 đang xử lý · ${countMo - 18} chờ duyệt`;
      }

      dialog.close();
      showToast(`Đã ghi nhận thành công mối nguy: "${ten}"!`);
    });
  }
}

function themTheMoiNguyVaoGiaoDien(item, prepend = true) {
  const danhSach = document.querySelector('.danh-sach-su-co');
  if (!danhSach) return;

  const nhanText = item.mucDo === 'nguy-hiem' ? 'Chờ duyệt · Rủi ro cao' : item.mucDo === 'canh-bao' ? 'Chờ duyệt · Rủi ro TB' : 'Chờ duyệt · Rủi ro thấp';
  const theClass = item.mucDo === 'nguy-hiem' ? 'the-su-co nguy-hiem' : 'the-su-co canh-bao';

  const article = document.createElement('article');
  article.className = theClass;
  article.style.animation = 'fadeInCard 0.35s ease';
  article.innerHTML = `
    <div class="dau-su-co"><span class="ma">${item.id}</span><span class="han">Vừa tạo: ${item.ngayTao || 'Hôm nay'}</span></div>
    <h4>${item.ten}</h4>
    <p class="vi-tri">${item.khuVuc} · ${item.nguoi}</p>
    <p class="mo-ta">${item.moTa}</p>
    <div class="chan-su-co">
      <mark class="nhan-trang-thai ${item.mucDo}">${nhanText}</mark>
      <button type="button" class="nut-chinh nut-nho">Yêu cầu xử lý</button>
    </div>
  `;

  article.querySelector('button')?.addEventListener('click', function () {
    showToast('Đã gửi yêu cầu xử lý thành công!');
  });

  if (prepend && danhSach.firstChild) {
    danhSach.insertBefore(article, danhSach.firstChild);
  } else {
    danhSach.appendChild(article);
  }
}

function luuMoiNguyVaoLocalStorage(item) {
  try {
    let list = [];
    const stored = localStorage.getItem('sitesafe_safety_hazards');
    if (stored) list = JSON.parse(stored);
    list.unshift(item);
    localStorage.setItem('sitesafe_safety_hazards', JSON.stringify(list));
  } catch (e) {}
}

function napDanhSachMoiNguyDaLuu() {
  try {
    const stored = localStorage.getItem('sitesafe_safety_hazards');
    if (!stored) return;
    const list = JSON.parse(stored);
    if (Array.isArray(list)) {
      list.slice().reverse().forEach(item => {
        themTheMoiNguyVaoGiaoDien(item, true);
      });
    }
  } catch (e) {}
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (!toast) {
    alert(message);
    return;
  }
  if (msgEl) msgEl.textContent = message;
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3200);
}
