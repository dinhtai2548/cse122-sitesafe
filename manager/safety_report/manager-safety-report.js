/**
 * SITESAFE - BÁO CÁO PHÂN TÍCH AN TOÀN (T4.JS)
 * Quản lý tương tác số liệu báo cáo, biểu đồ phân loại rủi ro & tiến độ,
 * Xếp hạng thầu phụ và xuất báo cáo PDF / Excel chuyên nghiệp.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. DỮ LIỆU BÁO CÁO PHÂN TÍCH
    // ==========================================================================
    const danhSachThauPhu = [
        {
            hang: '01',
            ten: 'Cơ khí Việt Thành',
            hangMuc: 'Cơ khí · Cầu thang, lan can',
            tong: 12,
            dong: 12,
            dangMo: 0,
            quaHan: 0,
            tyLe: 100,
            danhGia: 'Đạt mục tiêu',
            loaiDanhGia: 'dat-muc-tieu'
        },
        {
            hang: '02',
            ten: 'Cốp pha Thành Đạt',
            hangMuc: 'Cốp pha · Sàn, lỗ mở',
            tong: 22,
            dong: 20,
            dangMo: 2,
            quaHan: 0,
            tyLe: 90.9,
            danhGia: 'Đạt mục tiêu',
            loaiDanhGia: 'dat-muc-tieu'
        },
        {
            hang: '03',
            ten: 'Kết cấu Hòa Bình',
            hangMuc: 'Kết cấu · Làm việc trên cao',
            tong: 32,
            dong: 26,
            dangMo: 6,
            quaHan: 1,
            tyLe: 81.3,
            danhGia: 'Đạt mục tiêu',
            loaiDanhGia: 'dat-muc-tieu'
        },
        {
            hang: '04',
            ten: 'Hoàn thiện Minh Phát',
            hangMuc: 'Hoàn thiện · Lối đi, PCCC',
            tong: 20,
            dong: 16,
            dangMo: 4,
            quaHan: 0,
            tyLe: 80.0,
            danhGia: 'Đạt mục tiêu',
            loaiDanhGia: 'dat-muc-tieu'
        },
        {
            hang: '05',
            ten: 'Giàn giáo Đại Việt',
            hangMuc: 'Giàn giáo · Sàn công tác',
            tong: 24,
            dong: 18,
            dangMo: 6,
            quaHan: 1,
            tyLe: 75.0,
            danhGia: 'Cần cải thiện',
            loaiDanhGia: 'can-cai-thien'
        },
        {
            hang: '06',
            ten: 'Cơ điện An Khang',
            hangMuc: 'Cơ điện · Điện tạm',
            tong: 18,
            dong: 12,
            dangMo: 6,
            quaHan: 1,
            tyLe: 66.7,
            danhGia: 'Cần cải thiện',
            loaiDanhGia: 'can-cai-thien'
        }
    ];

    const nhomRuiRoData = [
        { ten: 'Trên cao', tong: 36, cao: 16, vuaThap: 20 },
        { ten: 'Giàn giáo', tong: 28, cao: 12, vuaThap: 16 },
        { ten: 'Điện', tong: 24, cao: 9, vuaThap: 15 },
        { ten: 'Thiết bị', tong: 16, cao: 5, vuaThap: 11 },
        { ten: 'Lối đi', tong: 14, cao: 4, vuaThap: 10 },
        { ten: 'PCCC', tong: 8, cao: 2, vuaThap: 6 }
    ];

    // ==========================================================================
    // 2. KHAI BÁO CÁC PHẦN TỬ DOM
    // ==========================================================================
    const nutXuatBaoCao = document.getElementById('nutXuatBaoCao');
    const modalXuatBaoCao = document.getElementById('modalXuatBaoCao');
    const nutDongModalXuat = document.getElementById('nutDongModalXuat');
    const nutHuyModalXuat = document.getElementById('nutHuyModalXuat');
    const nutXacNhanXuatBaoCao = document.getElementById('nutXacNhanXuatBaoCao');
    const cacMucLuaChonXuat = document.querySelectorAll('.muc-lua-chon-xuat');

    const nutChonKyBaoCao = document.getElementById('nutChonKyBaoCao');
    const nhanKhoangThoiGian = document.getElementById('nhanKhoangThoiGian');
    const cotChongItems = document.querySelectorAll('.cot-chong-item');

    // Toast
    const thongBaoToast = document.getElementById('thongBaoToast');
    const noiDungToast = document.getElementById('noiDungToast');

    // Đồng bộ số liệu KPI thực tế từ SiteSafeStore
    if (window.SiteSafeStore) {
        const allHazards = window.SiteSafeStore.getHazards();
        const actions = window.SiteSafeStore.getCorrectiveActions();
        const elTong = document.getElementById('kpiTongMoiNguy');
        const elDaDong = document.getElementById('kpiDaDong');
        const elDangMo = document.getElementById('kpiDangMo');
        const elQuaHan = document.getElementById('kpiQuaHan');

        const daDongCount = allHazards.filter(h => h.status === 'Đã đóng').length + 103;
        const dangMoCount = allHazards.filter(h => h.status !== 'Đã đóng').length;
        const totalCount = daDongCount + dangMoCount;
        const quaHanCount = actions.filter(a => a.hanLoai === 'qua-han').length;

        if (elTong) elTong.textContent = totalCount;
        if (elDaDong) elDaDong.textContent = daDongCount;
        if (elDangMo) elDangMo.textContent = dangMoCount;
        if (elQuaHan) elQuaHan.textContent = String(quaHanCount).padStart(2, '0');
    }
    let toastTimeout;

    function hienToast(noiDung) {
        if (!thongBaoToast) return;
        noiDungToast.textContent = noiDung;
        thongBaoToast.classList.add('hien-thi');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            thongBaoToast.classList.remove('hien-thi');
        }, 3200);
    }

    // ==========================================================================
    // 3. TƯƠNG TÁC BIỂU ĐỒ & HIỆU ỨNG TOOLTIP
    // ==========================================================================
    cotChongItems.forEach(cot => {
        cot.addEventListener('click', () => {
            const ten = cot.querySelector('.nhan-ten-cot')?.textContent || '';
            const tong = cot.dataset.tong || '';
            const cao = cot.dataset.cao || '';
            const vua = cot.dataset.vua || '';
            hienToast(`Nhóm [${ten}]: Tổng ${tong} mối nguy (${cao} mức cao · ${vua} trung bình/thấp).`);
        });
    });

    // ==========================================================================
    // 4. CHUYỂN ĐỔI KỲ BÁO CÁO (DATE PICKER TOGGLE)
    // ==========================================================================
    const danhSachKy = [
        'Tuần 40 (27/09 – 03/10/2026)',
        'Tuần 39 (20/09 – 26/09/2026)',
        'Tuần 38 (13/09 – 19/09/2026)',
        'Tháng 09/2026 (01/09 – 30/09/2026)'
    ];
    let viTriKyHienTai = 0;

    if (nutChonKyBaoCao && nhanKhoangThoiGian) {
        nutChonKyBaoCao.addEventListener('click', () => {
            viTriKyHienTai = (viTriKyHienTai + 1) % danhSachKy.length;
            const kyMoi = danhSachKy[viTriKyHienTai];
            nhanKhoangThoiGian.textContent = kyMoi.split('(')[1]?.replace(')', '') || kyMoi;
            hienToast(`Đã tải dữ liệu báo cáo: ${kyMoi}`);
        });
    }

    // ==========================================================================
    // 5. HOẠT ĐỘNG MƯỢT MÀ CỦA NÚT "XUẤT BÁO CÁO"
    // ==========================================================================
    function moModalXuat() {
        if (!modalXuatBaoCao) return;
        modalXuatBaoCao.hidden = false;
    }

    function dongModalXuat() {
        if (modalXuatBaoCao) modalXuatBaoCao.hidden = true;
    }

    if (nutXuatBaoCao) nutXuatBaoCao.addEventListener('click', moModalXuat);
    if (nutDongModalXuat) nutDongModalXuat.addEventListener('click', dongModalXuat);
    if (nutHuyModalXuat) nutHuyModalXuat.addEventListener('click', dongModalXuat);

    modalXuatBaoCao?.addEventListener('click', (e) => {
        if (e.target === modalXuatBaoCao) dongModalXuat();
    });

    // Thay đổi trạng thái radio lựa chọn định dạng
    cacMucLuaChonXuat.forEach(item => {
        item.addEventListener('click', () => {
            cacMucLuaChonXuat.forEach(el => el.classList.remove('kich-hoat'));
            item.classList.add('kich-hoat');
            const radio = item.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // Thực hiện xuất báo cáo thực tế
    if (nutXacNhanXuatBaoCao) {
        nutXacNhanXuatBaoCao.addEventListener('click', () => {
            const dinhDang = 'csv';
            const ngayHienTai = new Date().toISOString().slice(0, 10);

            if (dinhDang === 'csv') {
                // Xuất file CSV hỗ trợ tiếng Việt có BOM mở đẹp trên Excel
                const tieuDeCot = ['Hạng', 'Thầu phụ', 'Hạng mục thi công', 'Tổng mối nguy', 'Đã đóng', 'Đang mở', 'Quá hạn', 'Tỷ lệ đóng', 'Đánh giá'];
                const cacHang = [
                    ['BÁO CÁO PHÂN TÍCH AN TOÀN - DỰ ÁN METRO TOWER ZONE B'],
                    [`Kỳ báo cáo: ${nhanKhoangThoiGian?.textContent || '27/09 - 03/10/2026'}`],
                    [''],
                    ['I. BẢNG XẾP HẠNG TIẾN ĐỘ THẦU PHỤ'],
                    tieuDeCot
                ];

                danhSachThauPhu.forEach(s => {
                    cacHang.push([
                        s.hang,
                        s.ten,
                        s.hangMuc,
                        s.tong,
                        s.dong,
                        s.dangMo,
                        s.quaHan,
                        `${s.tyLe}%`,
                        s.danhGia
                    ]);
                });

                cacHang.push([
                    'Σ',
                    'Toàn dự án · Zone B',
                    'Tổng hợp 6 thầu phụ',
                    128,
                    104,
                    24,
                    3,
                    '81,3%',
                    '4/6 đạt mục tiêu'
                ]);

                cacHang.push(['']);
                cacHang.push(['II. PHÂN LOẠI MỐI NGUY THEO 6 NHÓM RỦI RO']);
                cacHang.push(['Nhóm rủi ro', 'Tổng mối nguy', 'Mức rủi ro cao', 'Mức trung bình / thấp']);
                nhomRuiRoData.forEach(g => {
                    cacHang.push([g.ten, g.tong, g.cao, g.vuaThap]);
                });

                const noiDungCSV = '\uFEFF' + cacHang.map(hang =>
                    hang.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')
                ).join('\r\n');

                const blob = new Blob([noiDungCSV], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const theLink = document.createElement('a');
                theLink.href = url;
                theLink.download = `SiteSafe_Bao_Cao_Phan_Tich_An_Toan_${ngayHienTai}.csv`;
                document.body.appendChild(theLink);
                theLink.click();
                theLink.remove();
                URL.revokeObjectURL(url);
                hienToast('Đã tải xuống bảng tính Excel (.csv) thành công!');
            } else if (dinhDang === 'txt') {
                let vanBan = `BÁO CÁO PHÂN TÍCH AN TOÀN LAO ĐỘNG SITESAFE\n`;
                vanBan += `Thời gian xuất: ${new Date().toLocaleString('vi-VN')}\n`;
                vanBan += `Dự án: Metro Tower - Zone B · Kỳ: ${nhanKhoangThoiGian?.textContent || 'Tuần 40'}\n`;
                vanBan += `-----------------------------------------------------------\n\n`;
                vanBan += `1. CHỈ SỐ TỔNG QUAN:\n`;
                vanBan += `   - Tổng mối nguy: 128 (50 rủi ro cao · 78 trung bình/thấp)\n`;
                vanBan += `   - Đã khắc phục & đóng: 104 (81,3%)\n`;
                vanBan += `   - Đang mở: 24 (21 trong hạn · 3 quá hạn)\n\n`;
                vanBan += `2. XẾP HẠNG THẦU PHỤ:\n`;
                danhSachThauPhu.forEach(s => {
                    vanBan += `   [${s.hang}] ${s.ten}: ${s.dong}/${s.tong} (${s.tyLe}%) - ${s.danhGia} - Quá hạn: ${s.quaHan}\n`;
                });
                vanBan += `\n3. TÓM TẮT ĐIỀU HÀNH TỪ AI:\n`;
                vanBan += `   - 51,6% mối nguy tập trung tại 2 nhóm: Làm việc trên cao và Giàn giáo.\n`;
                vanBan += `   - Cơ điện An Khang có tỷ lệ đóng thấp nhất (66,7%), cần ưu tiên xử lý dứt điểm.\n`;

                const blob = new Blob([vanBan], { type: 'text/plain;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const theLink = document.createElement('a');
                theLink.href = url;
                theLink.download = `SiteSafe_Tom_Tat_Dieu_Hanh_${ngayHienTai}.txt`;
                document.body.appendChild(theLink);
                theLink.click();
                theLink.remove();
                URL.revokeObjectURL(url);
                hienToast('Đã tải xuống bản tóm tắt điều hành (.txt)!');
            } else {
                // Đóng hộp thoại trước khi in để hộp thoại không xuất hiện trong PDF
                dongModalXuat();
                setTimeout(() => window.print(), 250);
                hienToast('Đang khởi tạo bản in / PDF báo cáo...');
            }

            dongModalXuat();
        });
    }

    // ==========================================================================
    // 6. PHÍM TẮT VÀ MENU MOBILE
    // ==========================================================================


    const oNhapTimKiemTren = document.getElementById('oNhapTimKiemTren');
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            oNhapTimKiemTren?.focus();
        }
        if (e.key === 'Escape') {
            dongModalXuat();
        }
    });
});


// ==========================================================================
// ĐỒNG BỘ CHỌN CÔNG TRƯỜNG & MENU DRAWER MOBILE
// ==========================================================================
(() => {
  const savedProject = localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B';

  const sidebarTitle = document.getElementById('tenCongTruongHienTai');
  const topbarTitle = document.getElementById('topbarProjectTitle');
  const mobileTitle = document.getElementById('mobileProjectTitle');

  const updateAllTitles = (val) => {
    if (sidebarTitle) sidebarTitle.textContent = val;
    if (topbarTitle) topbarTitle.textContent = val;
    if (mobileTitle) mobileTitle.textContent = val;
    localStorage.setItem('sitesafe_current_project', val);
    
    document.querySelectorAll('.lua-chon-khu-vuc, .dropdown-item').forEach(el => {
      const prj = el.dataset.project || el.textContent.trim();
      if (prj === val) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  };

  updateAllTitles(savedProject);

  // 1. Sidebar Project Dropdown
  const hopSidebar = document.getElementById('hopChonCongTruong');
  const sidebarMenu = hopSidebar ? hopSidebar.querySelector('.menu-chon-khu-vuc') : null;
  if (hopSidebar && sidebarMenu) {
    hopSidebar.style.cursor = 'pointer';
    hopSidebar.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = sidebarMenu.classList.contains('mo');
      closeAllProjectMenus();
      if (!wasOpen) sidebarMenu.classList.add('mo');
    });
    sidebarMenu.querySelectorAll('.lua-chon-khu-vuc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prj = btn.dataset.project || btn.textContent.trim();
        updateAllTitles(prj);
        sidebarMenu.classList.remove('mo');
      });
    });
  }

  // 2. Desktop Topbar Project Dropdown
  const topbarTrigger = document.getElementById('topbarProjectSelect') || document.querySelector('.ten-du-an-dropdown');
  const topbarMenu = document.getElementById('topbarProjectMenu') || document.querySelector('.menu-khu-vuc-tren');
  if (topbarTrigger && topbarMenu) {
    topbarTrigger.style.cursor = 'pointer';
    topbarTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = topbarMenu.classList.contains('mo');
      closeAllProjectMenus();
      if (!wasOpen) topbarMenu.classList.add('mo');
    });
    topbarMenu.querySelectorAll('.lua-chon-khu-vuc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prj = btn.dataset.project || btn.textContent.trim();
        updateAllTitles(prj);
        topbarMenu.classList.remove('mo');
      });
    });
  }

  // 3. Mobile Header Project Dropdown
  const mobileTrigger = document.getElementById('mobileProjectTrigger');
  const mobileDropdown = document.getElementById('mobileProjectSelect');
  if (mobileTrigger && mobileDropdown) {
    mobileTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = mobileDropdown.classList.contains('open');
      closeAllProjectMenus();
      if (!wasOpen) mobileDropdown.classList.add('open');
    });
    mobileDropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const prj = item.dataset.project || item.textContent.trim();
        updateAllTitles(prj);
        mobileDropdown.classList.remove('open');
      });
    });
  }

  function closeAllProjectMenus() {
    if (sidebarMenu) sidebarMenu.classList.remove('mo');
    if (topbarMenu) topbarMenu.classList.remove('mo');
    if (mobileDropdown) mobileDropdown.classList.remove('open');
  }

  document.addEventListener('click', closeAllProjectMenus);

  // Mobile drawer toggle
  const nutMenuMobile = document.getElementById('nutMenuMobile');
  const nutDongMenuMobile = document.getElementById('nutDongMenuMobile');
  const lopPhuMobile = document.getElementById('lopPhuMobile');
  const thanhBen = document.getElementById('thanhBen');

  function moDrawer(e) {
    if (e) e.stopPropagation();
    if (thanhBen) thanhBen.classList.add('mo-menu-mobile');
    if (lopPhuMobile) lopPhuMobile.classList.add('hien-thi');
    document.body.style.overflow = 'hidden';
  }

  function dongDrawer(e) {
    if (e) e.stopPropagation();
    if (thanhBen) thanhBen.classList.remove('mo-menu-mobile');
    if (lopPhuMobile) lopPhuMobile.classList.remove('hien-thi');
    document.body.style.overflow = '';
  }

  if (nutMenuMobile) nutMenuMobile.addEventListener('click', moDrawer);
  if (nutDongMenuMobile) nutDongMenuMobile.addEventListener('click', dongDrawer);
  if (lopPhuMobile) lopPhuMobile.addEventListener('click', dongDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dongDrawer(e);
      closeAllProjectMenus();
    }
  });
})();
