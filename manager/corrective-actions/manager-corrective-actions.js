/**
 * SITESAFE - TIẾN ĐỘ XỬ LÝ SỰ CỐ (T3.JS)
 * Quản lý bảng Kanban 4 cột, hiển thị Modal chi tiết sự cố theo Ảnh 2,
 * Cho phép cập nhật trạng thái di chuyển thẻ, lọc & xuất báo cáo mượt mà.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. DỮ LIỆU 12 SỰ CỐ CHI TIẾT (CHUẨN XÁC THEO ẢNH 1 VÀ ẢNH 2)
    // ==========================================================================
    let danhSachSuCo = (window.SiteSafeStore && window.SiteSafeStore.getCorrectiveActions()) || [
        // --- CỘT 1: CẦN LÀM ---
        {
            id: 'B-128',
            ma: 'B-128',
            tieuDe: 'Thiếu lan can tại mép sàn',
            viTri: 'Tầng 12 · Khu B1',
            khuVuc: 'Zone B',
            thauPhu: 'Kết cấu Hòa Bình',
            hanXuLy: 'Quá hạn · 02/10 · 16:00',
            hanLoai: 'qua-han',
            trangThai: 'can-lam',
            anh: 'Ảnh hiện trường.png',
            avatar: 'LH',
            nguoiPhuTrach: 'Lê Hoàng',
            soAnh: 2,
            soBinhLuan: 4,
            uuTien: true,
            moTa: 'Khu vực mép sàn biên tầng 12 chưa lắp đặt lan can an toàn tiêu chuẩn 1.1m, nguy cơ rơi ngã từ trên cao khi công nhân thi công cốp pha.'
        },
        {
            id: 'B-126',
            ma: 'B-126',
            tieuDe: 'Vật liệu chắn lối thoát hiểm',
            viTri: 'Tầng 2 · Hành lang B',
            khuVuc: 'Zone B',
            thauPhu: 'Hoàn thiện Minh Phát',
            hanXuLy: 'Hôm nay · 03/10 · 14:00',
            hanLoai: 'den-han',
            trangThai: 'can-lam',
            anh: 'Ảnh hiện trường (1).png',
            avatar: 'TH',
            nguoiPhuTrach: 'Trần Hương',
            soAnh: 2,
            soBinhLuan: 2,
            uuTien: true,
            moTa: 'Kiện vật liệu tấm thạch cao và bao xi măng xếp chiếm hơn một nửa chiều rộng hành lang thoát hiểm tầng 2, cần di dời vào kho phụ.'
        },
        {
            id: 'B-130',
            ma: 'B-130',
            tieuDe: 'Thép chờ chưa có nắp bảo vệ',
            viTri: 'Tầng 5 · Trục B-C',
            khuVuc: 'Zone B',
            thauPhu: 'Kết cấu Hòa Bình',
            hanXuLy: 'Ngày mai · 04/10 · 09:00',
            hanLoai: 'den-han',
            trangThai: 'can-lam',
            anh: 'Ảnh hiện trường (2).jpg',
            avatar: 'LH',
            nguoiPhuTrach: 'Lê Hoàng',
            soAnh: 2,
            soBinhLuan: 1,
            uuTien: true,
            moTa: 'Đầu thép chờ cột chưa được bọc nắp nhựa bảo hộ (rebar caps), tiềm ẩn rủi ro chấn thương nặng khi di chuyển quanh sàn thi công.'
        },

        // --- CỘT 2: ĐANG XỬ LÝ ---
        {
            id: 'B-121',
            ma: 'B-121',
            tieuDe: 'Giàn giáo thiếu giằng chéo',
            viTri: 'Tầng 3 · Khu B2',
            khuVuc: 'Zone B',
            thauPhu: 'Giàn giáo Đại Việt',
            hanXuLy: 'Quá hạn · 02/10 · 17:00',
            hanLoai: 'qua-han',
            trangThai: 'dang-xu-ly',
            anh: 'Ảnh hiện trường (3).jpg',
            avatar: 'DG',
            nguoiPhuTrach: 'Đội Giàn giáo Việt',
            soAnh: 4,
            soBinhLuan: 6,
            uuTien: true,
            moTa: 'Cần kiểm tra hiện trường, xác nhận biện pháp khắc phục và cập nhật minh chứng trước khi đóng sự cố.'
        },
        {
            id: 'B-117',
            ma: 'B-117',
            tieuDe: 'Tủ điện tạm chưa che chắn',
            viTri: 'Tầng 6 · Trục C2',
            khuVuc: 'Zone B',
            thauPhu: 'Cơ điện An Khang',
            hanXuLy: 'Quá hạn · 01/10 · 17:00',
            hanLoai: 'qua-han',
            trangThai: 'dang-xu-ly',
            anh: 'Ảnh hiện trường (4).jpg',
            avatar: 'PT',
            nguoiPhuTrach: 'Phạm Tuấn',
            soAnh: 3,
            soBinhLuan: 5,
            uuTien: true,
            moTa: 'Cánh cửa tủ điện tạm thi công bị gãy bản lề, hở các aptomat và cáp tiếp điểm ngoài trời, nguy cơ giật điện khi thời tiết ẩm ướt.'
        },
        {
            id: 'B-129',
            ma: 'B-129',
            tieuDe: 'Dây điện vắt qua lối đi',
            viTri: 'Tầng 8 · Hành lang A',
            khuVuc: 'Zone B',
            thauPhu: 'Cơ điện An Khang',
            hanXuLy: 'Hôm nay · 03/10 · 16:00',
            hanLoai: 'den-han',
            trangThai: 'dang-xu-ly',
            anh: 'Ảnh hiện trường (5).jpg',
            avatar: 'PT',
            nguoiPhuTrach: 'Phạm Tuấn',
            soAnh: 2,
            soBinhLuan: 3,
            uuTien: true,
            moTa: 'Dây nguồn máy hàn kéo ngang qua luồng di chuyển chính của công nhân, đã đặt cọc tiêu tạm thời nhưng cần treo cầu dây cáp trên cao.'
        },

        // --- CỘT 3: ĐANG NGHIỆM THU ---
        {
            id: 'B-124',
            ma: 'B-124',
            tieuDe: 'Đã lắp dây cứu sinh trên mái',
            viTri: 'Tầng mái · Khu B',
            khuVuc: 'Zone B',
            thauPhu: 'Kết cấu Hòa Bình',
            hanXuLy: 'Hôm nay · 03/10 · 15:00',
            hanLoai: 'den-han',
            trangThai: 'nghiem-thu',
            anh: 'Ảnh hiện trường (6).jpg',
            avatar: 'NM',
            nguoiPhuTrach: 'Nguyễn Minh',
            soAnh: 5,
            soBinhLuan: 2,
            uuTien: true,
            moTa: 'Đội kết cấu đã hoàn thành căng dây cáp cứu sinh bọc nhựa dọc theo mép tường bao tầng mái, đang chờ cán bộ HSE nghiệm thu lực căng.'
        },
        {
            id: 'B-123',
            ma: 'B-123',
            tieuDe: 'Đã che kín lỗ mở sàn',
            viTri: 'Tầng 7 · Trục A3',
            khuVuc: 'Zone B',
            thauPhu: 'Cốp pha Thành Đạt',
            hanXuLy: 'Ngày mai · 04/10 · 10:00',
            hanLoai: 'den-han',
            trangThai: 'nghiem-thu',
            anh: 'Ảnh hiện trường (7).jpg',
            avatar: 'NM',
            nguoiPhuTrach: 'Nguyễn Minh',
            soAnh: 3,
            soBinhLuan: 1,
            uuTien: true,
            moTa: 'Lỗ mở kỹ thuật xuyên tầng đã được đậy bằng tấm cốp pha gỗ dày 18mm, cố định chống trượt và dán băng keo sọc vàng đen cảnh báo.'
        },
        {
            id: 'B-127',
            ma: 'B-127',
            tieuDe: 'Đã bổ sung bình chữa cháy',
            viTri: 'Tầng 1 · Kho vật tư',
            khuVuc: 'Zone B',
            thauPhu: 'Hoàn thiện Minh Phát',
            hanXuLy: 'Ngày mai · 04/10 · 15:00',
            hanLoai: 'den-han',
            trangThai: 'nghiem-thu',
            anh: 'Ảnh hiện trường (8).jpg',
            avatar: 'TH',
            nguoiPhuTrach: 'Trần Hương',
            soAnh: 2,
            soBinhLuan: 2,
            uuTien: true,
            moTa: 'Đã bổ sung 02 bình bột MFZ4 và 01 bình khí CO2 MT3 tại kệ giá đỡ kho vật tư tầng 1, có bảng nội quy PCCC đầy đủ.'
        },

        // --- CỘT 4: ĐÃ ĐÓNG ---
        {
            id: 'B-119',
            ma: 'B-119',
            tieuDe: 'Đã xử lý nước đọng trên sàn',
            viTri: 'Tầng 4 · Hành lang B',
            khuVuc: 'Zone B',
            thauPhu: 'Hoàn thiện Minh Phát',
            hanXuLy: 'Đã đóng · 03/10 · 09:30',
            hanLoai: 'da-dong',
            ghiChuDong: 'Hạn xử lý: 03/10/2026 - Đã nghiệm thu',
            trangThai: 'da-dong',
            anh: 'Ảnh hiện trường (9).jpg',
            avatar: 'TH',
            nguoiPhuTrach: 'Trần Hương',
            soAnh: 3,
            soBinhLuan: 2,
            uuTien: true,
            moTa: 'Nước mưa đọng sau bão tại sàn hành lang tầng 4 đã được hút cạn và lau khô, không còn hiện tượng trơn trượt.'
        },
        {
            id: 'B-115',
            ma: 'B-115',
            tieuDe: 'Đã cố định lan can cầu thang',
            viTri: 'Tầng 3 · Thang bộ B',
            khuVuc: 'Zone B',
            thauPhu: 'Cơ khí Việt Thành',
            hanXuLy: 'Đã đóng · 02/10 · 15:20',
            hanLoai: 'da-dong',
            ghiChuDong: 'Hạn xử lý: 02/10/2026 - Đã nghiệm thu',
            trangThai: 'da-dong',
            anh: 'Ảnh hiện trường (10).jpg',
            avatar: 'LH',
            nguoiPhuTrach: 'Lê Hoàng',
            soAnh: 4,
            soBinhLuan: 3,
            uuTien: true,
            moTa: 'Tay vịn lan can thang bộ tầng 3 đã được hàn cố định chân trụ sắt và bắt bu-lông neo chắc chắn vào bậc thang bê tông.'
        },
        {
            id: 'B-112',
            ma: 'B-112',
            tieuDe: 'Đã phân luồng khu vực cẩu',
            viTri: 'Sân B · Khu tập kết',
            khuVuc: 'Zone B',
            thauPhu: 'Nâng hạ Đại Việt',
            hanXuLy: 'Đã đóng · 02/10 · 11:10',
            hanLoai: 'da-dong',
            ghiChuDong: 'Hạn xử lý: 02/10/2026 - Đã nghiệm thu',
            trangThai: 'da-dong',
            anh: 'Ảnh hiện trường (11).jpg',
            avatar: 'TH',
            nguoiPhuTrach: 'Trần Hưng',
            soAnh: 3,
            soBinhLuan: 1,
            uuTien: true,
            moTa: 'Đã cắm biển báo vùng nguy hiểm bán kính quay xe cẩu, rào chắn dây xích nhựa phản quang và bố trí người xi-nhan chỉ dẫn giao thông.'
        }
    ];

    if (window.SiteSafeStore) {
        danhSachSuCo = window.SiteSafeStore.getCorrectiveActions();
    }

    // Ánh xạ tên gọi trạng thái
    const tenTrangThai = {
        'can-lam': 'Cần làm',
        'dang-xu-ly': 'Đang xử lý',
        'nghiem-thu': 'Đang nghiệm thu',
        'da-dong': 'Đã đóng'
    };

    let suCoDangChon = null;
    let chiLocUuTien = false;

    // ==========================================================================
    // 2. KHAI BÁO CÁC PHẦN TỬ DOM
    // ==========================================================================
    const danhSachCanLamEl = document.getElementById('danhSachCanLam');
    const danhSachDangXuLyEl = document.getElementById('danhSachDangXuLy');
    const danhSachNghiemThuEl = document.getElementById('danhSachNghiemThu');
    const danhSachDaDongEl = document.getElementById('danhSachDaDong');

    const demCanLamEl = document.getElementById('demCanLam');
    const demDangXuLyEl = document.getElementById('demDangXuLy');
    const demNghiemThuEl = document.getElementById('demNghiemThu');
    const demDaDongEl = document.getElementById('demDaDong');

    const nhanTongUuTien = document.getElementById('nhanTongUuTien');
    const soSuCoDangMo = document.getElementById('soSuCoDangMo');
    const soQuaHanEl = document.getElementById('soQuaHan');
    const soDenHanEl = document.getElementById('soDenHan');
    const soDaDongEl = document.getElementById('soDaDong');
    const vanBanDemKetQua = document.getElementById('vanBanDemKetQua');

    const oTimKiem = document.getElementById('oTimKiemSuCo');
    const boLocThauPhu = document.getElementById('boLocThauPhu');
    const nutLocUuTien = document.getElementById('nutLocUuTien');
    const nutMoBoLoc = document.getElementById('nutMoBoLoc');

    const bangKanbanChinh = document.getElementById('bangKanbanChinh');
    const bangDanhSachChiTiet = document.getElementById('bangDanhSachChiTiet');
    const thanBangDanhSach = document.getElementById('thanBangDanhSach');
    const nutCheDoKanban = document.getElementById('nutCheDoKanban');
    const nutCheDoDanhSach = document.getElementById('nutCheDoDanhSach');

    // Modal Chi tiết sự cố (Ảnh 2)
    const modalChiTiet = document.getElementById('modalChiTietSuCo');
    const modalMaSuCo = document.getElementById('modalMaSuCo');
    const tieuDeModalChiTiet = document.getElementById('tieuDeModalChiTiet');
    const modalAnhHienTruong = document.getElementById('modalAnhHienTruong');
    const modalKhuVuc = document.getElementById('modalKhuVuc');
    const modalTrangThai = document.getElementById('modalTrangThai');
    const modalNguoiPhuTrach = document.getElementById('modalNguoiPhuTrach');
    const modalMoTaSuCo = document.getElementById('modalMoTaSuCo');
    const selectCapNhatTrangThai = document.getElementById('selectCapNhatTrangThai');
    const nutLuuTrangThaiModal = document.getElementById('nutLuuTrangThaiModal');
    const nutDongModalChiTiet = document.getElementById('nutDongModalChiTiet');
    const nutDongModalChiTietPhu = document.getElementById('nutDongModalChiTietPhu');

    // Toast
    const thongBaoToast = document.getElementById('thongBaoToast');
    const noiDungToast = document.getElementById('noiDungToast');
    let toastTimeout;

    function hienToast(tinNhan) {
        if (!thongBaoToast) return;
        noiDungToast.textContent = tinNhan;
        thongBaoToast.classList.add('hien-thi');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            thongBaoToast.classList.remove('hien-thi');
        }, 3200);
    }

    // ==========================================================================
    // 3. RENDER THẺ KANBAN & BẢNG DANH SÁCH
    // ==========================================================================
    function taoTheKanbanHTML(suCo) {
        const classHan = suCo.hanLoai === 'qua-han' 
            ? 'han-qua-han' 
            : suCo.hanLoai === 'den-han' 
                ? 'han-den-han' 
                : 'han-da-dong';

        const bieuTuongCham = suCo.hanLoai === 'da-dong' ? '●' : '●';

        return `
            <article class="the-su-co-kanban" data-id="${suCo.id}" tabindex="0" role="button" aria-label="Xem chi tiết ${suCo.ma} - ${suCo.tieuDe}">
                <div class="dau-the-su-co">
                    <span class="ma-the-su-co">${suCo.ma}</span>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <span class="nhan-the-uu-tien"><i class="fa-solid fa-flag"></i> Ưu tiên</span>
                        <span class="nut-the-menu"><i class="fa-solid fa-ellipsis"></i></span>
                    </div>
                </div>

                <div class="anh-minh-hoa-the">
                    <img src="${suCo.anh}" alt="${escapeHtml(suCo.tieuDe)}" loading="lazy">
                </div>

                <h4 class="tieu-de-the-su-co">${escapeHtml(suCo.tieuDe)}</h4>
                <div class="vi-tri-the-su-co">${escapeHtml(suCo.viTri)}</div>

                <div class="doi-thi-cong-the">
                    <i class="fa-solid fa-helmet-safety"></i>
                    <span>${escapeHtml(suCo.thauPhu)}</span>
                </div>

                <div class="dong-han-chot ${classHan}">
                    <span>${bieuTuongCham} ${escapeHtml(suCo.hanXuLy)}</span>
                </div>
                ${suCo.ghiChuDong ? `<span class="chu-thich-nghiem-thu">${escapeHtml(suCo.ghiChuDong)}</span>` : ''}

                <div class="chan-the-su-co">
                    <div class="nguoi-phu-trach-the">
                        <span class="anh-dai-dien-nho">${suCo.avatar || 'CB'}</span>
                        <span>${escapeHtml(suCo.nguoiPhuTrach)}</span>
                    </div>
                    <div class="so-lieu-dinh-kem">
                        <span><i class="fa-solid fa-camera"></i> ${suCo.soAnh || 1}</span>
                        <span><i class="fa-regular fa-comment"></i> ${suCo.soBinhLuan || 0}</span>
                    </div>
                </div>
            </article>
        `;
    }

    function locDanhSach() {
        const tuKhoa = (oTimKiem?.value || '').trim().toLowerCase();
        const thauPhu = boLocThauPhu?.value || 'all';

        return danhSachSuCo.filter(item => {
            const khopTuKhoa = !tuKhoa || 
                item.ma.toLowerCase().includes(tuKhoa) ||
                item.tieuDe.toLowerCase().includes(tuKhoa) ||
                item.viTri.toLowerCase().includes(tuKhoa) ||
                item.thauPhu.toLowerCase().includes(tuKhoa) ||
                item.nguoiPhuTrach.toLowerCase().includes(tuKhoa);

            const khopThauPhu = thauPhu === 'all' || item.thauPhu === thauPhu;
            const khopUuTien = !chiLocUuTien || item.uuTien === true;

            return khopTuKhoa && khopThauPhu && khopUuTien;
        });
    }

    function renderGiaoDien() {
        const ketQua = locDanhSach();

        // Lọc theo từng cột
        const canLam = ketQua.filter(s => s.trangThai === 'can-lam');
        const dangXuLy = ketQua.filter(s => s.trangThai === 'dang-xu-ly');
        const nghiemThu = ketQua.filter(s => s.trangThai === 'nghiem-thu');
        const daDong = ketQua.filter(s => s.trangThai === 'da-dong');

        if (danhSachCanLamEl) danhSachCanLamEl.innerHTML = canLam.map(taoTheKanbanHTML).join('');
        if (danhSachDangXuLyEl) danhSachDangXuLyEl.innerHTML = dangXuLy.map(taoTheKanbanHTML).join('');
        if (danhSachNghiemThuEl) danhSachNghiemThuEl.innerHTML = nghiemThu.map(taoTheKanbanHTML).join('');
        if (danhSachDaDongEl) danhSachDaDongEl.innerHTML = daDong.map(taoTheKanbanHTML).join('');

        // Cập nhật số đếm trên đầu cột
        if (demCanLamEl) demCanLamEl.textContent = canLam.length;
        if (demDangXuLyEl) demDangXuLyEl.textContent = dangXuLy.length;
        if (demNghiemThuEl) demNghiemThuEl.textContent = nghiemThu.length;
        if (demDaDongEl) demDaDongEl.textContent = daDong.length;

        // Cập nhật thanh tóm tắt banner
        const tongDangMo = danhSachSuCo.filter(s => s.trangThai !== 'da-dong').length;
        const tongQuaHan = danhSachSuCo.filter(s => s.hanLoai === 'qua-han' && s.trangThai !== 'da-dong').length;
        const tongDenHan = danhSachSuCo.filter(s => s.hanLoai === 'den-han' && s.trangThai !== 'da-dong').length;
        const tongDaDong = danhSachSuCo.filter(s => s.trangThai === 'da-dong').length;

        if (soSuCoDangMo) soSuCoDangMo.textContent = tongDangMo;
        if (soQuaHanEl) soQuaHanEl.textContent = tongQuaHan;
        if (soDenHanEl) soDenHanEl.textContent = tongDenHan;
        if (soDaDongEl) soDaDongEl.textContent = tongDaDong;
        if (vanBanDemKetQua) vanBanDemKetQua.textContent = `Hiển thị ${ketQua.length} sự cố · Ưu tiên các sự cố quá hạn`;

        const soLuongXuatBaoCao = document.getElementById('soLuongXuatBaoCao');
        if (soLuongXuatBaoCao) soLuongXuatBaoCao.textContent = ketQua.length;

        // Render bảng danh sách (Table List View)
        if (thanBangDanhSach) {
            thanBangDanhSach.innerHTML = ketQua.map(item => `
                <tr data-id="${item.id}" tabindex="0" role="button" title="Xem chi tiết ${item.ma}">
                    <td><strong class="ma-the-su-co">${item.ma}</strong></td>
                    <td>
                        <img src="${item.anh}" alt="${escapeHtml(item.tieuDe)}" class="anh-thumbnail-bang">
                    </td>
                    <td>
                        <strong class="ten-su-co-bang">${escapeHtml(item.tieuDe)}</strong>
                        <div class="mo-ta-nho-bang">${escapeHtml(item.moTa || '').slice(0, 48)}...</div>
                    </td>
                    <td>${escapeHtml(item.viTri)}</td>
                    <td><span class="doi-thi-cong-the"><i class="fa-solid fa-helmet-safety"></i> ${escapeHtml(item.thauPhu)}</span></td>
                    <td><span class="nhan-trang-thai-bang tt-${item.trangThai}">${tenTrangThai[item.trangThai]}</span></td>
                    <td class="${item.hanLoai === 'qua-han' ? 'chi-so-nhan mau-do' : item.hanLoai === 'den-han' ? 'chi-so-nhan mau-cam' : 'chi-so-nhan mau-xanh'}">
                        <strong>${escapeHtml(item.hanXuLy)}</strong>
                    </td>
                    <td>
                        <div class="nguoi-phu-trach-the">
                            <span class="anh-dai-dien-nho">${item.avatar || 'CB'}</span>
                            <span>${escapeHtml(item.nguoiPhuTrach)}</span>
                        </div>
                    </td>
                    <td style="text-align: right;">
                        <button type="button" class="nut-xem-chi-tiet-dong" data-id="${item.id}">
                            <i class="fa-solid fa-eye"></i> Xem
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        // Gắn sự kiện click mở modal cho tất cả các thẻ
        ganSuKienClickThe();
    }

    // ==========================================================================
    // 4. MỞ MODAL CHI TIẾT SỰ CỐ (ẢNH 2)
    // ==========================================================================
    function moModalChiTietSuCo(idSuCo) {
        const suCo = danhSachSuCo.find(s => s.id === idSuCo);
        if (!suCo) return;

        suCoDangChon = suCo;

        if (modalMaSuCo) modalMaSuCo.textContent = `MÃ SỰ CỐ ${suCo.ma}`;
        if (tieuDeModalChiTiet) tieuDeModalChiTiet.textContent = suCo.tieuDe;
        if (modalAnhHienTruong) {
            modalAnhHienTruong.src = suCo.anh;
            modalAnhHienTruong.alt = suCo.tieuDe;
        }
        if (modalKhuVuc) modalKhuVuc.textContent = suCo.khuVuc || 'Zone B';
        if (modalTrangThai) modalTrangThai.textContent = tenTrangThai[suCo.trangThai] || 'Cần làm';
        
        if (modalNguoiPhuTrach) {
            modalNguoiPhuTrach.innerHTML = `
                <span class="anh-dai-dien-mini">${suCo.avatar || 'CB'}</span>
                <span>${escapeHtml(suCo.nguoiPhuTrach)}</span>
            `;
        }

        if (modalMoTaSuCo) modalMoTaSuCo.textContent = suCo.moTa || 'Cần kiểm tra hiện trường, xác nhận biện pháp khắc phục và cập nhật minh chứng trước khi đóng sự cố.';
        if (selectCapNhatTrangThai) selectCapNhatTrangThai.value = suCo.trangThai;

        if (modalChiTiet) {
            modalChiTiet.hidden = false;
        }
    }

    function dongModalChiTietSuCo() {
        if (modalChiTiet) modalChiTiet.hidden = true;
        suCoDangChon = null;
    }

    function ganSuKienClickThe() {
        document.querySelectorAll('.the-su-co-kanban, #thanBangDanhSach tr').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.dataset.id;
                if (id) moModalChiTietSuCo(id);
            });

            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const id = el.dataset.id;
                    if (id) moModalChiTietSuCo(id);
                }
            });
        });
    }

    // Đóng modal chi tiết
    if (nutDongModalChiTiet) nutDongModalChiTiet.addEventListener('click', dongModalChiTietSuCo);
    if (nutDongModalChiTietPhu) nutDongModalChiTietPhu.addEventListener('click', dongModalChiTietSuCo);
    modalChiTiet?.addEventListener('click', (e) => {
        if (e.target === modalChiTiet) dongModalChiTietSuCo();
    });

    // Lưu trạng thái mới từ modal
    if (nutLuuTrangThaiModal) {
        nutLuuTrangThaiModal.addEventListener('click', () => {
            if (!suCoDangChon || !selectCapNhatTrangThai) return;

            const trangThaiMoi = selectCapNhatTrangThai.value;
            const trangThaiCu = suCoDangChon.trangThai;

            suCoDangChon.trangThai = trangThaiMoi;

            if (trangThaiMoi === 'da-dong') {
                suCoDangChon.hanLoai = 'da-dong';
                const now = new Date();
                const gio = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                const ngay = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
                suCoDangChon.hanXuLy = `Đã đóng · ${ngay} · ${gio}`;
                suCoDangChon.ghiChuDong = `Hạn xử lý: ${ngay}/2026 - Đã nghiệm thu`;

                if (window.SiteSafeStore) {
                    window.SiteSafeStore.closeCorrectiveAction(suCoDangChon.id, suCoDangChon.ghiChuDong);
                }
            } else if (trangThaiCu === 'da-dong' && trangThaiMoi !== 'da-dong') {
                suCoDangChon.hanLoai = 'den-han';
                suCoDangChon.ghiChuDong = '';
                if (window.SiteSafeStore) {
                    window.SiteSafeStore.updateActionStatus(suCoDangChon.id, trangThaiMoi);
                }
            } else {
                if (window.SiteSafeStore) {
                    window.SiteSafeStore.updateActionStatus(suCoDangChon.id, trangThaiMoi);
                }
            }

            renderGiaoDien();
            dongModalChiTietSuCo();
            hienToast(`Đã chuyển sự cố ${suCoDangChon.ma} sang trạng thái "${tenTrangThai[trangThaiMoi]}" thành công!`);
        });
    }

    // Nút Nghiệm thu & Đóng sự cố (BƯỚC 4 TRONG LUỒNG QUẢN LÝ)
    const nutNghiemThuDongSuCo = document.getElementById('nutNghiemThuDongSuCo');
    if (nutNghiemThuDongSuCo) {
        nutNghiemThuDongSuCo.addEventListener('click', () => {
            if (!suCoDangChon) return;
            const now = new Date();
            const gio = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const ngay = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

            suCoDangChon.trangThai = 'da-dong';
            suCoDangChon.hanLoai = 'da-dong';
            suCoDangChon.hanXuLy = `Đã đóng · ${ngay} · ${gio}`;
            suCoDangChon.ghiChuDong = `Quản lý công trường đã kiểm tra hiện trường đạt chuẩn và đóng sự cố.`;

            if (window.SiteSafeStore) {
                window.SiteSafeStore.closeCorrectiveAction(suCoDangChon.id, suCoDangChon.ghiChuDong);
            }

            renderGiaoDien();
            dongModalChiTietSuCo();
            hienToast(`Đã nghiệm thu và ĐÓNG sự cố ${suCoDangChon.ma} thành công! Dữ liệu đã đồng bộ về phía Cán bộ an toàn và Hiện trường.`);
        });
    }

    // Đọc tham số URL ?zone=... từ Bản đồ rủi ro chuyển sang
    const urlParams = new URLSearchParams(window.location.search);
    const zoneFilterParam = urlParams.get('zone');
    if (zoneFilterParam && oTimKiem) {
        oTimKiem.value = zoneFilterParam;
        hienToast(`Đang lọc danh sách sự cố theo khu vực: "${zoneFilterParam}"`);
    }

    // ==========================================================================
    // 5. CÁC TƯƠNG TÁC LỌC, TÌM KIẾM & CHUYỂN CHẾ ĐỘ XEM
    // ==========================================================================
    if (oTimKiem) oTimKiem.addEventListener('input', renderGiaoDien);
    if (boLocThauPhu) boLocThauPhu.addEventListener('change', renderGiaoDien);

    if (nutLocUuTien) {
        nutLocUuTien.addEventListener('click', () => {
            chiLocUuTien = !chiLocUuTien;
            nutLocUuTien.classList.toggle('dang-chon', chiLocUuTien);
            renderGiaoDien();
            hienToast(chiLocUuTien ? 'Đang lọc: Chỉ hiển thị các sự cố ưu tiên' : 'Đã bỏ lọc ưu tiên');
        });
    }

    if (nutMoBoLoc) {
        nutMoBoLoc.addEventListener('click', () => {
            if (boLocThauPhu) boLocThauPhu.value = 'all';
            if (oTimKiem) oTimKiem.value = '';
            chiLocUuTien = false;
            nutLocUuTien?.classList.remove('dang-chon');
            renderGiaoDien();
            hienToast('Đã cài đặt lại toàn bộ bộ lọc về mặc định.');
        });
    }

    // Chuyển đổi giữa chế độ xem Kanban và Bảng danh sách
    if (nutCheDoKanban && nutCheDoDanhSach && bangKanbanChinh && bangDanhSachChiTiet) {
        nutCheDoKanban.addEventListener('click', () => {
            nutCheDoKanban.classList.add('active');
            nutCheDoDanhSach.classList.remove('active');
            bangKanbanChinh.hidden = false;
            bangKanbanChinh.style.display = 'grid';
            bangDanhSachChiTiet.hidden = true;
            bangDanhSachChiTiet.style.display = 'none';
            hienToast('Đang xem ở chế độ Bảng Kanban');
        });

        nutCheDoDanhSach.addEventListener('click', () => {
            nutCheDoDanhSach.classList.add('active');
            nutCheDoKanban.classList.remove('active');
            bangKanbanChinh.hidden = true;
            bangKanbanChinh.style.display = 'none';
            bangDanhSachChiTiet.hidden = false;
            bangDanhSachChiTiet.style.display = 'block';
            hienToast('Đang xem ở chế độ Danh sách chi tiết');
        });
    }

    // ==========================================================================
    // 6. XUẤT BÁO CÁO (MẶC ĐỊNH LÀ BẢNG TÍNH EXCEL)
    // ==========================================================================
    const modalXuat = document.getElementById('modalXuatBaoCao');
    const nutMoXuat = document.getElementById('nutXuatBaoCao');
    const nutDongXuat = document.getElementById('nutDongModalXuat');
    const nutHuyXuat = document.getElementById('nutHuyModalXuat');
    const nutXacNhanXuat = document.getElementById('nutXacNhanXuatBaoCao');
    const cacLuaChonXuat = document.querySelectorAll('.muc-lua-chon-xuat');

    function moModalXuat() {
        if (!modalXuat) return;
        modalXuat.hidden = false;
    }

    function dongModalXuat() {
        if (modalXuat) modalXuat.hidden = true;
    }

    if (nutMoXuat) nutMoXuat.addEventListener('click', moModalXuat);
    if (nutDongXuat) nutDongXuat.addEventListener('click', dongModalXuat);
    if (nutHuyXuat) nutHuyXuat.addEventListener('click', dongModalXuat);

    modalXuat?.addEventListener('click', (e) => {
        if (e.target === modalXuat) dongModalXuat();
    });

    // Thay đổi trạng thái radio lựa chọn định dạng
    cacLuaChonXuat.forEach(item => {
        item.addEventListener('click', () => {
            cacLuaChonXuat.forEach(el => el.classList.remove('kich-hoat'));
            item.classList.add('kich-hoat');
            const radio = item.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    function xuatExcelTuDong() {
        const ngayHienTai = new Date().toISOString().slice(0, 10);
        const duLieuXuat = locDanhSach();

        // Tiêu đề cột tiếng Việt chuẩn
        const tieuDeCot = [
            'STT',
            'Mã sự cố',
            'Tiêu đề sự cố',
            'Khu vực',
            'Vị trí cụ thể',
            'Thầu phụ / Đội thi công',
            'Trạng thái',
            'Hạn xử lý',
            'Người phụ trách',
            'Mức độ nghiêm trọng',
            'Mô tả chi tiết'
        ];
        const cacHang = [tieuDeCot];

        duLieuXuat.forEach((s, idx) => {
            cacHang.push([
                idx + 1,
                s.ma,
                s.tieuDe,
                s.khuVuc,
                s.viTri,
                s.thauPhu,
                tenTrangThai[s.trangThai] || s.trangThai,
                s.hanXuLy,
                s.nguoiPhuTrach,
                s.nghiemTrong ? 'Nghiêm trọng (Ưu tiên)' : 'Bình thường',
                s.moTa || ''
            ]);
        });

        // Ký tự UTF-8 BOM (\uFEFF) giúp Excel tự động hiển thị đúng tiếng Việt có dấu
        const noiDungCSV = '\uFEFF' + cacHang.map(hang =>
            hang.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')
        ).join('\r\n');

        const blob = new Blob([noiDungCSV], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SiteSafe_Tien_Do_Xu_Ly_Su_Co_${ngayHienTai}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        hienToast('Đã tải xuống bảng tính Excel (.csv) thành công!');
    }

    if (nutXacNhanXuat) {
        nutXacNhanXuat.addEventListener('click', () => {
            const dinhDang = 'csv';
            const ngayHienTai = new Date().toISOString().slice(0, 10);
            const duLieuXuat = locDanhSach();

            if (dinhDang === 'csv') {
                xuatExcelTuDong();
            } else if (dinhDang === 'txt') {
                let vanBan = `BÁO CÁO TIẾN ĐỘ XỬ LÝ SỰ CỐ SITESAFE\n`;
                vanBan += `Thời gian xuất: ${new Date().toLocaleString('vi-VN')}\n`;
                vanBan += `Dự án: Metro Tower - Zone B\n`;
                vanBan += `Tổng số sự cố: ${duLieuXuat.length}\n`;
                vanBan += `-----------------------------------------------------------\n\n`;

                duLieuXuat.forEach((s, idx) => {
                    vanBan += `${idx + 1}. [${s.ma}] ${s.tieuDe}\n`;
                    vanBan += `   - Vị trí: ${s.viTri}\n`;
                    vanBan += `   - Thầu phụ: ${s.thauPhu} | Phụ trách: ${s.nguoiPhuTrach}\n`;
                    vanBan += `   - Trạng thái: ${tenTrangThai[s.trangThai]} (${s.hanXuLy})\n`;
                    vanBan += `   - Ghi chú: ${s.moTa}\n\n`;
                });

                const blob = new Blob([vanBan], { type: 'text/plain;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `SiteSafe_Tien_Do_Su_Co_${ngayHienTai}.txt`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                hienToast('Đã tải xuống bản tóm tắt ca làm việc (.txt)!');
            } else {
                // Đóng hộp thoại trước khi in để hộp thoại không xuất hiện trong PDF
                dongModalXuat();
                setTimeout(() => window.print(), 250);
                hienToast('Đang khởi tạo bản in / PDF của tiến độ sự cố...');
            }

            dongModalXuat();
        });
    }

    // ==========================================================================
    // 7. CÁC PHÍM TẮT & MENU MOBILE
    // ==========================================================================


    const oNhapTimKiemTren = document.getElementById('oNhapTimKiemTren');
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            oNhapTimKiemTren?.focus();
        }
        if (e.key === 'Escape') {
            dongModalChiTietSuCo();
            dongModalXuat();
        }
    });

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ==========================================================================
    // 8. KHỞI CHẠY LẦN ĐẦU
    // ==========================================================================
    renderGiaoDien();
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
