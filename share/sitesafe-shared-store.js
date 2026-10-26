/**
 * ============================================================================
 * SITESAFE - SHARED DATA STORE & MULTI-ROLE ORCHESTRATION ENGINE
 * File: share/sitesafe-shared-store.js
 * Quản lý kho dữ liệu LocalStorage dùng chung và điều phối luồng nghiệp vụ giữa:
 *   [Quản trị viên] -> [Nhân sự hiện trường] -> [Cán bộ an toàn] -> [Quản lý công trường]
 * ============================================================================
 */

(function (window) {
  'use strict';

  // 1. CÁC KHÓA LƯU TRỮ CHUẨN TRONG LOCALSTORAGE
  const KEYS = {
    PROJECT_CURRENT: 'sitesafe_current_project',
    ROLE_CURRENT: 'sitesafe_current_role',
    USER_CURRENT: 'sitesafe_current_user',
    ZONES_DB: 'sitesafe_zones_db',
    CHECKLIST_TEMPLATES: 'sitesafe_checklist_templates',
    ACCOUNTS_DB: 'sitesafe_accounts_db',
    HAZARDS: 'sitesafe_hazards',
    CORRECTIVE_ACTIONS: 'sitesafe_corrective_actions',
    INSPECTIONS: 'sitesafe_all_inspections',
    NOTIFICATIONS: 'sitesafe_notifications_db'
  };

  // 2. DỮ LIỆU MẪU MẶC ĐỊNH (DEFAULT SEED DATA)
  const SEED_DATA = {
    // Dự án & Khu vực
    zones: [
      {
        siteId: 'proj-metro',
        siteName: 'Metro Tower - Khu B',
        block: 'Block B',
        code: 'MT-B-12',
        name: 'Tầng 12 · Mép sàn phía Đông',
        status: 'on',
        staff: 'Lê Văn Hùng',
        riskLevel: 'Cao'
      },
      {
        siteId: 'proj-metro',
        siteName: 'Metro Tower - Khu B',
        block: 'Block B',
        code: 'MT-B-14',
        name: 'Tầng 12 · Khu vực giàn giáo phía Bắc',
        status: 'on',
        staff: 'Lê Văn Hùng',
        riskLevel: 'Cao'
      },
      {
        siteId: 'proj-metro',
        siteName: 'Metro Tower - Khu B',
        block: 'Block B',
        code: 'MT-B-03',
        name: 'Tầng 3 · Khu B2',
        status: 'on',
        staff: 'Trần Minh Đức',
        riskLevel: 'Cao'
      },
      {
        siteId: 'proj-metro',
        siteName: 'Metro Tower - Khu B',
        block: 'Block B',
        code: 'MT-B-05',
        name: 'Tầng 5 · Trục B-C',
        status: 'on',
        staff: 'Lê Hoàng',
        riskLevel: 'Trung bình'
      },
      {
        siteId: 'proj-metro',
        siteName: 'Metro Tower - Khu B',
        block: 'Block B',
        code: 'MT-B-08',
        name: 'Tầng 8 · Hành lang A',
        status: 'on',
        staff: 'Phạm Tuấn',
        riskLevel: 'Trung bình'
      },
      {
        siteId: 'proj-metro',
        siteName: 'Metro Tower - Khu B',
        block: 'Block B',
        code: 'MT-B-TECH',
        name: 'Zone B · Lối đi hành lang kỹ thuật',
        status: 'on',
        staff: 'Trần Hương',
        riskLevel: 'Trung bình'
      },
      {
        siteId: 'proj-metro',
        siteName: 'Metro Tower - Khu B',
        block: 'Block B',
        code: 'MT-B-00',
        name: 'Tầng trệt · Khu vực bốc dỡ vật tư',
        status: 'on',
        staff: 'Nguyễn Văn Minh',
        riskLevel: 'Thấp'
      }
    ],

    // Mẫu kiểm tra Checklist
    templates: [
      {
        id: 'TPL-DAILY-01',
        name: 'Danh mục kiểm tra an toàn hằng ngày (Ca sáng)',
        category: 'Tổng hợp',
        description: 'Đánh giá điều kiện an toàn đầu ca làm việc: giàn giáo, PPE, tiếp địa, lan can mép sàn, thoát hiểm và PCCC.',
        status: 'active',
        createdAt: '2026-10-01',
        items: [
          { id: 1, code: 'MỤC 01', title: 'Độ ổn định của giàn giáo', desc: 'Chân đế, giằng chéo và khóa cùm chắc chắn.', standard: 'TCVN 5308:1991', defaultStatus: 'pass' },
          { id: 2, code: 'MỤC 02', title: 'Đồ bảo hộ cá nhân PPE', desc: 'Mũ, giày, áo phản quang và dây an toàn 2 móc.', standard: 'QCVN 18:2021/BXD', defaultStatus: 'pass' },
          { id: 3, code: 'MỤC 03', title: 'Nối đất thiết bị điện thi công', desc: 'Dây tiếp địa không hở, tủ điện có nắp đậy và chống giật ELCB.', standard: 'TCVN 4086:1985', defaultStatus: 'fail' },
          { id: 4, code: 'MỤC 04', title: 'Lan can và che chắn mép sàn', desc: 'Lan can cao tối thiểu 1.1m, lỗ mở sàn được đậy kín.', standard: 'QCVN 18:2021/BXD', defaultStatus: null },
          { id: 5, code: 'MỤC 05', title: 'Lối đi và lối thoát hiểm', desc: 'Không có vật cản, biển chỉ dẫn rõ ràng.', standard: 'TCVN 3890:2023', defaultStatus: null },
          { id: 6, code: 'MỤC 06', title: 'Thiết bị phòng cháy chữa cháy PCCC', desc: 'Bình chữa cháy còn nguyên niêm chì và dễ tiếp cận.', standard: 'TCVN 3890:2023', defaultStatus: null }
        ]
      }
    ],

    // Mối nguy & Sự cố (Hazards) - Có sẵn các mẫu ở mọi trạng thái để demo ngay
    hazards: [
      // 1. Mẫu mới chờ Cán bộ an toàn duyệt (Pending Approval)
      {
        id: 'HAZ-2026-001',
        ma: 'B-129',
        title: 'Thiếu lan can tại mép sàn',
        zone: 'Tầng 12 · Mép sàn phía Đông',
        projectId: 'proj-metro',
        projectName: 'Metro Tower - Khu B',
        time: '2026-10-03T09:15',
        reporter: 'Lê Văn Hùng',
        reporterRole: 'Nhân sự hiện trường · Tổ thi công',
        receiver: 'Đinh Trọng Tài - Cán bộ an toàn',
        description: 'Mép sàn phía Đông tầng 12 chưa có lan can bảo vệ tiêu chuẩn 1.1m. Công nhân đang di chuyển gần khu vực hở thi công cốt thép, tiềm ẩn nguy cơ ngã từ trên cao.',
        actionTaken: 'Đã căng dây phản quang cảnh báo tạm thời và nhắc nhở tổ thép.',
        photos: ['image_e4fc7a30.jpg'],
        status: 'Chờ duyệt', // 'Chờ duyệt' -> 'Đang khắc phục' -> 'Chờ nghiệm thu' -> 'Đã đóng'
        riskLevel: 'high',
        riskText: 'Rủi ro cao',
        aiClassification: {
          hazardType: 'Ngã từ trên cao',
          riskLevel: 'high',
          riskText: 'Rủi ro cao',
          analysis: 'Ảnh hiện trường phát hiện mép sàn không có lan can lan can chắn. Khoảng cách rơi > 30m, đề xuất mức rủi ro CAO.',
          recommendation: 'Cô lập khu vực ngay lập tức; lắp lan can tiêu chuẩn 1.1m có thanh chắn chân trước khi cho công nhân thao tác tiếp.'
        },
        createdAt: '2026-10-03T09:18:00.000Z'
      },
      // 2. Mẫu mới thứ hai chờ duyệt
      {
        id: 'HAZ-2026-002',
        ma: 'B-135',
        title: 'Giàn giáo ngoài tầng 14 thiếu neo giằng chéo',
        zone: 'Tầng 12 · Khu vực giàn giáo phía Bắc',
        projectId: 'proj-metro',
        projectName: 'Metro Tower - Khu B',
        time: '2026-10-03T10:00',
        reporter: 'Lê Văn Hùng',
        reporterRole: 'Nhân sự hiện trường · Tổ thi công',
        receiver: 'Đinh Trọng Tài - Cán bộ an toàn',
        description: 'Hệ giàn giáo bao che ngoài trục 3-4 bị tháo bớt chốt khóa cùm để cẩu tấm cốp pha, hệ khung bị vặn và rung mạnh khi gió lớn.',
        actionTaken: 'Yêu cầu 2 công nhân di chuyển khỏi giàn giáo.',
        photos: ['Ảnh hiện trường (3).jpg'],
        status: 'Chờ duyệt',
        riskLevel: 'high',
        riskText: 'Rủi ro cao',
        aiClassification: {
          hazardType: 'Vật thể trên cao / Mất ổn định giàn giáo',
          riskLevel: 'high',
          riskText: 'Rủi ro cao',
          analysis: 'Thiếu liên kết giằng chéo chịu lực. Nguy cơ mất ổn định cục bộ và sập đổ hệ giàn giáo ngoài.',
          recommendation: 'Đình chỉ di chuyển trên giáo; cử đội cơ điện & giàn giáo siết chặt cùm giằng và liên kết neo tường.'
        },
        createdAt: '2026-10-03T10:05:00.000Z'
      },
      // 3. Mẫu đang được khắc phục (In Progress)
      {
        id: 'B-128',
        ma: 'B-128',
        title: 'Thiếu lan can mép biên sàn khu B1',
        zone: 'Tầng 12 · Mép sàn phía Đông',
        projectId: 'proj-metro',
        projectName: 'Metro Tower - Khu B',
        time: '2026-10-02T14:00',
        reporter: 'Nguyễn Văn Minh',
        reporterRole: 'Nhân sự hiện trường',
        receiver: 'Đinh Trọng Tài - Cán bộ an toàn',
        description: 'Khu vực mép sàn biên tầng 12 chưa lắp đặt lan can an toàn tiêu chuẩn 1.1m, nguy cơ rơi ngã từ trên cao khi công nhân thi công cốp pha.',
        actionTaken: 'HSE đã lập biên bản đình chỉ khu vực mép sàn.',
        photos: ['Ảnh hiện trường.png'],
        status: 'Đang khắc phục',
        assignee: 'Lê Hoàng (Kết cấu Hòa Bình)',
        dueDate: 'Quá hạn · 02/10 · 16:00',
        dueDateIso: '2026-10-02T16:00',
        riskLevel: 'high',
        riskText: 'Rủi ro cao',
        aiClassification: {
          hazardType: 'Ngã từ trên cao',
          riskLevel: 'high',
          riskText: 'Rủi ro cao',
          recommendation: 'Lắp bổ sung lan can bảo vệ 1.1m.'
        },
        createdAt: '2026-10-02T14:10:00.000Z'
      },
      // 4. Mẫu đang chờ nghiệm thu (Under Review)
      {
        id: 'B-121',
        ma: 'B-121',
        title: 'Giàn giáo thiếu giằng chéo tầng 3',
        zone: 'Tầng 3 · Khu B2',
        projectId: 'proj-metro',
        projectName: 'Metro Tower - Khu B',
        time: '2026-10-02T11:00',
        reporter: 'Lê Văn Hùng',
        reporterRole: 'Nhân sự hiện trường',
        receiver: 'Đinh Trọng Tài - Cán bộ an toàn',
        description: 'Thiếu 2 thanh giằng chéo tại chân giàn giáo trục B2.',
        actionTaken: 'Đội giàn giáo Đại Việt đã bổ sung thanh giằng và chụp ảnh nghiệm thu.',
        photos: ['Ảnh hiện trường (3).jpg'],
        status: 'Chờ nghiệm thu',
        assignee: 'Đội Giàn giáo Việt',
        dueDate: '02/10 · 17:00',
        dueDateIso: '2026-10-02T17:00',
        riskLevel: 'high',
        riskText: 'Rủi ro cao',
        aiClassification: {
          hazardType: 'Ổn định giàn giáo',
          riskLevel: 'high',
          riskText: 'Rủi ro cao',
          recommendation: 'Kiểm tra siết khóa cùm giằng.'
        },
        createdAt: '2026-10-02T11:15:00.000Z'
      },
      // 5. Mẫu đã đóng hoàn tất (Closed)
      {
        id: 'B-114',
        ma: 'B-114',
        title: 'Thiếu tiếp địa máy hàn thi công',
        zone: 'Zone B · Lối đi hành lang kỹ thuật',
        projectId: 'proj-metro',
        projectName: 'Metro Tower - Khu B',
        time: '2026-10-01T08:30',
        reporter: 'Lê Văn Hùng',
        reporterRole: 'Nhân sự hiện trường',
        receiver: 'Đinh Trọng Tài - Cán bộ an toàn',
        description: 'Đã đấu nối cọc tiếp địa đồng D16 và đo điện trở đất < 4 Ohm đạt chuẩn kiểm định.',
        actionTaken: 'Quản lý công trường đã nghiệm thu biên bản đo đạc và đóng sự cố.',
        photos: ['Ảnh hiện trường (11).jpg'],
        status: 'Đã đóng',
        assignee: 'Cơ điện An Khang',
        dueDate: '01/10 · 15:00',
        riskLevel: 'med',
        riskText: 'Rủi ro trung bình',
        aiClassification: {
          hazardType: 'An toàn cơ điện',
          riskLevel: 'med',
          riskText: 'Rủi ro trung bình',
          recommendation: 'Kiểm định thiết bị trước khi tái sử dụng.'
        },
        createdAt: '2026-10-01T08:35:00.000Z',
        closedAt: '2026-10-01T14:45:00.000Z'
      }
    ],

    // 12 Hành động khắc phục ban đầu trên bảng Kanban của Quản lý công trường
    correctiveActions: [
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
        moTa: 'Dây nguồn máy đầm cóc vắt ngang đường vận chuyển vật tư mà không có ống bọc cao su bảo vệ chống dập nát cáp.'
      },
      {
        id: 'B-125',
        ma: 'B-125',
        tieuDe: 'Thiếu dây an toàn khi lắp kính',
        viTri: 'Tầng 10 · Mặt ngoài',
        khuVuc: 'Zone B',
        thauPhu: 'Nhôm kính Eurowindow',
        hanXuLy: 'Chờ duyệt · 03/10 · 10:30',
        hanLoai: 'den-han',
        trangThai: 'nghiem-thu',
        anh: 'Ảnh hiện trường (6).jpg',
        avatar: 'NM',
        nguoiPhuTrach: 'Nguyễn Mạnh',
        soAnh: 3,
        soBinhLuan: 2,
        uuTien: true,
        moTa: 'Đội lắp kính đã trang bị dây an toàn toàn thân 2 móc chống sốc và căng dây cứu sinh lifeline dọc sàn công tác.'
      },
      {
        id: 'B-122',
        ma: 'B-122',
        tieuDe: 'Lỗ mở sàn chưa đậy nắp',
        viTri: 'Tầng 7 · Hộp kỹ thuật',
        khuVuc: 'Zone B',
        thauPhu: 'Kết cấu Hòa Bình',
        hanXuLy: 'Chờ duyệt · 03/10 · 09:15',
        hanLoai: 'den-han',
        trangThai: 'nghiem-thu',
        anh: 'Ảnh hiện trường (7).jpg',
        avatar: 'NM',
        nguoiPhuTrach: 'Nguyễn Mạnh',
        soAnh: 2,
        soBinhLuan: 1,
        uuTien: true,
        moTa: 'Đã gia công tấm đan thép hộp phủ ván ép sơn vàng cảnh báo và cố định chặt vào sàn bê tông.'
      },
      {
        id: 'B-119',
        ma: 'B-119',
        tieuDe: 'Biển cảnh báo hố móng bị đổ',
        viTri: 'Tầng hầm B1 · Trục 1',
        khuVuc: 'Zone B',
        thauPhu: 'Hạ tầng Fecon',
        hanXuLy: 'Chờ duyệt · 02/10 · 16:30',
        hanLoai: 'den-han',
        trangThai: 'nghiem-thu',
        anh: 'Ảnh hiện trường (8).jpg',
        avatar: 'TH',
        nguoiPhuTrach: 'Trần Hương',
        soAnh: 1,
        soBinhLuan: 1,
        uuTien: false,
        moTa: 'Biển báo nguy hiểm sâu 4m đã được hàn dựng lại chắc chắn kèm đèn chớp cảnh báo ban đêm.'
      },
      {
        id: 'B-118',
        ma: 'B-118',
        tieuDe: 'Bình chữa cháy hết hạn kiểm định',
        viTri: 'Tầng 4 · Cụm cầu thang 1',
        khuVuc: 'Zone B',
        thauPhu: 'PCCC Thăng Long',
        hanXuLy: 'Đã đóng · 01/10 · 14:00',
        hanLoai: 'da-dong',
        trangThai: 'da-dong',
        anh: 'Ảnh hiện trường (9).jpg',
        avatar: 'TH',
        nguoiPhuTrach: 'Trần Hương',
        soAnh: 2,
        soBinhLuan: 3,
        uuTien: false,
        moTa: 'Đã thay thế cụm 4 bình bột MFZ4 mới có dán tem kiểm định PCCC hợp quy.'
      },
      {
        id: 'B-114',
        ma: 'B-114',
        tieuDe: 'Tiếp địa máy hàn chưa đạt',
        viTri: 'Tầng hầm B2 · Trục C',
        khuVuc: 'Zone B',
        thauPhu: 'Cơ điện An Khang',
        hanXuLy: 'Đã đóng · 01/10 · 11:30',
        hanLoai: 'da-dong',
        trangThai: 'da-dong',
        anh: 'Ảnh hiện trường (10).jpg',
        avatar: 'LH',
        nguoiPhuTrach: 'Lê Hoàng',
        soAnh: 3,
        soBinhLuan: 4,
        uuTien: false,
        moTa: 'Đã đo lại điện trở tiếp đất đạt 3.2 Ohm theo tiêu chuẩn an toàn điện công trường.'
      },
      {
        id: 'B-112',
        ma: 'B-112',
        tieuDe: 'Chiếu sáng cầu thang bộ yếu',
        viTri: 'Cầu thang thoát hiểm B',
        khuVuc: 'Zone B',
        thauPhu: 'Cơ điện An Khang',
        hanXuLy: 'Đã đóng · 30/09 · 17:00',
        hanLoai: 'da-dong',
        trangThai: 'da-dong',
        anh: 'Ảnh hiện trường (11).jpg',
        avatar: 'TH',
        nguoiPhuTrach: 'Trần Hương',
        soAnh: 2,
        soBinhLuan: 2,
        uuTien: false,
        moTa: 'Đã bổ sung 6 bóng đèn LED chống ẩm 20W dọc từ tầng 1 lên tầng 5.'
      }
    ],

    // Đợt kiểm tra an toàn (Inspections)
    inspections: [
      {
        id: 'INSP-2026-001',
        title: 'Kiểm tra an toàn tổng hợp ca sáng',
        projectId: 'proj-metro',
        projectName: 'Metro Tower - Khu B',
        scheduleTitle: 'Hôm nay · Ca sáng',
        dateText: '03/10/2026',
        inspector: 'Lê Văn Hùng',
        totalItems: 6,
        passedItems: 4,
        failedItems: 2,
        uninspectedItems: 0,
        status: 'completed',
        submittedAt: '2026-10-03T11:30:00.000Z'
      }
    ],

    // Thông báo cho các vai trò
    notifications: [
      {
        id: 'notif-1',
        roleTarget: 'safety',
        title: 'Mối nguy mới cần phê duyệt',
        desc: 'Lê Văn Hùng vừa báo cáo mối nguy "Thiếu lan can tại mép sàn" tại Tầng 12 · Mép sàn phía Đông. Mức độ rủi ro: Cao.',
        time: '10 phút trước',
        unread: true,
        targetLink: '../../safety/hazard_detail/safety-hazard-detail.html?id=HAZ-2026-001'
      },
      {
        id: 'notif-2',
        roleTarget: 'safety',
        title: 'Mối nguy mới cần phê duyệt',
        desc: 'Lê Văn Hùng vừa báo cáo mối nguy "Giàn giáo ngoài tầng 14 thiếu neo giằng" tại Tầng 12. Mức độ rủi ro: Cao.',
        time: '35 phút trước',
        unread: true,
        targetLink: '../../safety/hazard_detail/safety-hazard-detail.html?id=HAZ-2026-002'
      },
      {
        id: 'notif-3',
        roleTarget: 'manager',
        title: 'Hành động khắc phục cần đôn đốc',
        desc: 'Sự cố B-128 "Thiếu lan can tại mép sàn" đã quá hạn xử lý tại Tầng 12.',
        time: '1 giờ trước',
        unread: true,
        targetLink: '../../manager/corrective-actions/manager-corrective-actions.html'
      },
      {
        id: 'notif-4',
        roleTarget: 'worker',
        title: 'Báo cáo của bạn đã được tiếp nhận',
        desc: 'Cán bộ an toàn Đinh Trọng Tài đã tiếp nhận mối nguy B-129 của bạn.',
        time: 'Hôm nay',
        unread: false,
        targetLink: '../../worker/my_hazard/worker-my-hazard.html'
      }
    ]
  };

  // 3. TIỆN ÍCH LOCALSTORAGE AN TOÀN
  function getItem(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      return JSON.parse(data);
    } catch (e) {
      console.warn('[SiteSafeStore] Read error for key:', key, e);
      return fallback;
    }
  }

  function setItem(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('[SiteSafeStore] Write error for key:', key, e);
    }
  }

  // 4. KHỞI TẠO DỮ LIỆU ĐẦU (SEED DATA INITIALIZER)
  function initSeedData(forceReset = false) {
    if (forceReset || !localStorage.getItem(KEYS.HAZARDS)) {
      setItem(KEYS.HAZARDS, SEED_DATA.hazards);
    }
    if (forceReset || !localStorage.getItem(KEYS.CORRECTIVE_ACTIONS)) {
      setItem(KEYS.CORRECTIVE_ACTIONS, SEED_DATA.correctiveActions);
    }
    if (forceReset || !localStorage.getItem(KEYS.ZONES_DB)) {
      setItem(KEYS.ZONES_DB, SEED_DATA.zones);
    }
    if (forceReset || !localStorage.getItem(KEYS.CHECKLIST_TEMPLATES)) {
      setItem(KEYS.CHECKLIST_TEMPLATES, SEED_DATA.templates);
    }
    if (forceReset || !localStorage.getItem(KEYS.INSPECTIONS)) {
      setItem(KEYS.INSPECTIONS, SEED_DATA.inspections);
    }
    if (forceReset || !localStorage.getItem(KEYS.NOTIFICATIONS)) {
      setItem(KEYS.NOTIFICATIONS, SEED_DATA.notifications);
    }
    if (!localStorage.getItem(KEYS.PROJECT_CURRENT)) {
      localStorage.setItem(KEYS.PROJECT_CURRENT, 'Metro Tower - Khu B');
    }
  }

  // Tự động seed data khi load store
  initSeedData(false);

  // 5. CÁC API THAO TÁC DỮ LIỆU TẬP TRUNG (PUBLIC API)
  const SiteSafeStore = {
    KEYS,

    // --- RESET DỮ LIỆU DEMO ---
    resetDemoData() {
      initSeedData(true);
      // Giữ nguyên tài khoản nếu có
      localStorage.setItem(KEYS.PROJECT_CURRENT, 'Metro Tower - Khu B');
      alert('Đã khôi phục toàn bộ dữ liệu mẫu ban đầu của SiteSafe thành công!');
      window.location.reload();
    },

    // --- HAZARDS (MỐI NGUY) ---
    getHazards() {
      return getItem(KEYS.HAZARDS, SEED_DATA.hazards);
    },

    getHazardById(id) {
      const list = this.getHazards();
      return list.find(h => h.id === id || h.ma === id) || null;
    },

    saveHazards(list) {
      setItem(KEYS.HAZARDS, list);
    },

    /**
     * Bước 2: Worker tạo báo cáo mối nguy
     * Gửi sang cho Cán bộ an toàn (Safety Officer)
     */
    createHazard(hazardData) {
      const list = this.getHazards();
      const id = hazardData.id || `HAZ-${Date.now()}`;
      const code = hazardData.ma || `B-${Math.floor(100 + Math.random() * 900)}`;

      const newHazard = {
        id: id,
        ma: code,
        title: hazardData.title || 'Mối nguy an toàn mới phát hiện',
        zone: hazardData.zone || 'Zone B · Tầng 12',
        projectId: hazardData.projectId || 'proj-metro',
        projectName: hazardData.projectName || (localStorage.getItem(KEYS.PROJECT_CURRENT) || 'Metro Tower - Khu B'),
        time: hazardData.time || new Date().toISOString(),
        reporter: hazardData.reporter || 'Lê Văn Hùng',
        reporterRole: hazardData.reporterRole || 'Nhân sự hiện trường · Tổ thi công',
        receiver: hazardData.receiver || 'Đinh Trọng Tài - Cán bộ an toàn',
        description: hazardData.description || 'Ghi nhận hiện trường thi công cần kiểm tra an toàn.',
        actionTaken: hazardData.actionTaken || '',
        photos: hazardData.photos && hazardData.photos.length ? hazardData.photos : ['image_e4fc7a30.jpg'],
        status: 'Chờ duyệt', // Bắt đầu ở trạng thái Chờ duyệt
        riskLevel: hazardData.riskLevel || 'high',
        riskText: hazardData.riskText || (hazardData.riskLevel === 'high' ? 'Rủi ro cao' : 'Rủi ro trung bình'),
        aiClassification: hazardData.aiClassification || {
          hazardType: 'Nguy cơ thi công',
          riskLevel: 'high',
          riskText: 'Rủi ro cao',
          analysis: 'Phân tích tự động từ mô tả hiện trường.',
          recommendation: 'Cần khảo sát và cô lập khu vực.'
        },
        createdAt: new Date().toISOString()
      };

      // Đẩy lên đầu danh sách
      list.unshift(newHazard);
      this.saveHazards(list);

      // Đồng thời lưu vào my_hazards của Worker
      setItem('sitesafe_my_hazards', list);

      // Tự động tạo thông báo gửi Cán bộ an toàn
      this.addNotification({
        roleTarget: 'safety',
        title: 'Mối nguy mới cần phê duyệt',
        desc: `${newHazard.reporter} vừa báo cáo sự cố "${newHazard.title}" tại ${newHazard.zone}. Mức độ: ${newHazard.riskText}.`,
        time: 'Vừa xong',
        unread: true,
        targetLink: `../../safety/hazard_detail/safety-hazard-detail.html?id=${newHazard.id}`
      });

      return newHazard;
    },

    /**
     * Bước 3: Cán bộ an toàn phê duyệt & giao việc khắc phục
     * Chuyển trạng thái Hazard sang 'Đang khắc phục' và sinh Corrective Action sang cho Quản lý
     */
    approveHazard(hazardId, approvalData) {
      const list = this.getHazards();
      const hazard = list.find(h => h.id === hazardId || h.ma === hazardId);
      if (!hazard) return null;

      hazard.status = 'Đang khắc phục';
      hazard.assignee = approvalData.assignee || 'Lê Hoàng (Kết cấu Hòa Bình)';
      hazard.dueDate = approvalData.dueDate || 'Hôm nay · 17:00';
      hazard.dueDateIso = approvalData.dueDateIso || '';
      hazard.riskLevel = approvalData.riskLevel || hazard.riskLevel || 'high';
      hazard.riskText = approvalData.riskText || (hazard.riskLevel === 'high' ? 'Rủi ro cao' : 'Rủi ro trung bình');
      hazard.taskRequirement = approvalData.requirement || 'Khắc phục hiện trường và cập nhật ảnh hoàn tất.';
      hazard.approvedAt = new Date().toISOString();
      hazard.approvedBy = 'Đinh Trọng Tài - Cán bộ an toàn';

      this.saveHazards(list);
      setItem('sitesafe_my_hazards', list);

      // TỰ ĐỘNG TẠO 1 HÀNH ĐỘNG KHẮC PHỤC TRÊN BẢNG KANBAN CỦA QUẢN LÝ CÔNG TRƯỜNG
      const actions = this.getCorrectiveActions();
      const existingActionIndex = actions.findIndex(a => a.id === hazard.id || a.ma === hazard.ma);

      const actionItem = {
        id: hazard.id,
        ma: hazard.ma,
        tieuDe: hazard.title,
        viTri: hazard.zone,
        khuVuc: hazard.zone.includes('Zone') ? hazard.zone : 'Zone B',
        thauPhu: hazard.assignee.includes('(') ? hazard.assignee.split('(')[1].replace(')', '') : 'Đội thi công',
        hanXuLy: hazard.dueDate,
        hanLoai: 'den-han',
        trangThai: 'can-lam', // Cột 1 Kanban
        anh: hazard.photos && hazard.photos[0] ? hazard.photos[0] : 'Ảnh hiện trường.png',
        avatar: hazard.assignee.substring(0, 2).toUpperCase(),
        nguoiPhuTrach: hazard.assignee.split('(')[0].trim(),
        soAnh: (hazard.photos && hazard.photos.length) || 1,
        soBinhLuan: 1,
        uuTien: hazard.riskLevel === 'high',
        moTa: hazard.description
      };

      if (existingActionIndex >= 0) {
        actions[existingActionIndex] = actionItem;
      } else {
        actions.unshift(actionItem);
      }
      this.saveCorrectiveActions(actions);

      // Gửi thông báo đến Quản lý công trường
      this.addNotification({
        roleTarget: 'manager',
        title: 'Hành động khắc phục mới cần giám sát',
        desc: `Cán bộ an toàn đã duyệt sự cố ${hazard.ma} "${hazard.title}" tại ${hazard.zone} và giao cho ${hazard.assignee}.`,
        time: 'Vừa xong',
        unread: true,
        targetLink: `../../manager/corrective-actions/manager-corrective-actions.html`
      });

      // Gửi thông báo đến Worker
      this.addNotification({
        roleTarget: 'worker',
        title: 'Báo cáo của bạn đã được duyệt',
        desc: `Báo cáo "${hazard.title}" đã được Cán bộ an toàn duyệt và giao cho ${hazard.assignee} khắc phục.`,
        time: 'Vừa xong',
        unread: true,
        targetLink: `../../worker/my_hazard/worker-my-hazard.html`
      });

      return hazard;
    },

    rejectHazard(hazardId, reason) {
      const list = this.getHazards();
      const hazard = list.find(h => h.id === hazardId || h.ma === hazardId);
      if (!hazard) return null;

      hazard.status = 'Từ chối';
      hazard.rejectReason = reason || 'Thông tin chưa đầy đủ hoặc không thuộc phạm vi xử lý.';
      hazard.rejectedAt = new Date().toISOString();
      this.saveHazards(list);
      setItem('sitesafe_my_hazards', list);

      // Thông báo cho Worker
      this.addNotification({
        roleTarget: 'worker',
        title: 'Báo cáo bị từ chối',
        desc: `Báo cáo "${hazard.title}" đã bị Cán bộ an toàn từ chối. Lý do: ${hazard.rejectReason}`,
        time: 'Vừa xong',
        unread: true,
        targetLink: `../../worker/my_hazard/worker-my-hazard.html`
      });

      return hazard;
    },

    // --- CORRECTIVE ACTIONS (HÀNH ĐỘNG KHẮC PHỤC - KANBAN) ---
    getCorrectiveActions() {
      return getItem(KEYS.CORRECTIVE_ACTIONS, SEED_DATA.correctiveActions);
    },

    saveCorrectiveActions(list) {
      setItem(KEYS.CORRECTIVE_ACTIONS, list);
    },

    /**
     * Bước 4: Quản lý công trường nghiệm thu & đóng sự cố (Close)
     */
    closeCorrectiveAction(actionId, closeNote = '') {
      const actions = this.getCorrectiveActions();
      const action = actions.find(a => a.id === actionId || a.ma === actionId);
      if (action) {
        action.trangThai = 'da-dong';
        action.hanLoai = 'da-dong';
        action.ghiChuDong = closeNote || 'Đã kiểm tra hiện trường đạt yêu cầu và nghiệm thu đóng sự cố.';
        action.dongLuc = new Date().toISOString();
        this.saveCorrectiveActions(actions);
      }

      // ĐỒNG BỘ TRẠNG THÁI TRONG KHO HAZARDS VỀ 'Đã đóng'
      const hazards = this.getHazards();
      const hazard = hazards.find(h => h.id === actionId || h.ma === actionId);
      if (hazard) {
        hazard.status = 'Đã đóng';
        hazard.closedAt = new Date().toISOString();
        hazard.closeNote = closeNote || 'Quản lý công trường đã nghiệm thu và đóng sự cố.';
        this.saveHazards(hazards);
        setItem('sitesafe_my_hazards', hazards);
      }

      // Thông báo đến Cán bộ an toàn & Worker
      const maText = action ? action.ma : actionId;
      this.addNotification({
        roleTarget: 'safety',
        title: 'Sự cố đã được nghiệm thu & đóng',
        desc: `Quản lý công trường đã nghiệm thu hoàn thành sự cố ${maText}.`,
        time: 'Vừa xong',
        unread: true,
        targetLink: `../../safety/safety_dashboard/safety_dashboard.html`
      });

      this.addNotification({
        roleTarget: 'worker',
        title: 'Sự cố bạn báo cáo đã hoàn tất xử lý',
        desc: `Sự cố ${maText} đã được Quản lý công trường nghiệm thu đạt chuẩn và đóng hồ sơ!`,
        time: 'Vừa xong',
        unread: true,
        targetLink: `../../worker/my_hazard/worker-my-hazard.html`
      });

      return action;
    },

    updateActionStatus(actionId, newStatus) {
      const actions = this.getCorrectiveActions();
      const action = actions.find(a => a.id === actionId || a.ma === actionId);
      if (!action) return null;

      action.trangThai = newStatus;
      if (newStatus === 'da-dong') {
        return this.closeCorrectiveAction(actionId);
      } else {
        // Đồng bộ sang hazard tương ứng
        const hazards = this.getHazards();
        const hazard = hazards.find(h => h.id === actionId || h.ma === actionId);
        if (hazard) {
          if (newStatus === 'can-lam' || newStatus === 'dang-xu-ly') {
            hazard.status = 'Đang khắc phục';
          } else if (newStatus === 'nghiem-thu') {
            hazard.status = 'Chờ nghiệm thu';
          }
          this.saveHazards(hazards);
          setItem('sitesafe_my_hazards', hazards);
        }
      }

      this.saveCorrectiveActions(actions);
      return action;
    },

    // --- ZONES (KHU VỰC) ---
    getZones() {
      return getItem(KEYS.ZONES_DB, SEED_DATA.zones);
    },

    addZone(zone) {
      const zones = this.getZones();
      zones.push(zone);
      setItem(KEYS.ZONES_DB, zones);
      return zone;
    },

    // --- CHECKLIST TEMPLATES (MẪU KIỂM TRA) ---
    getTemplates() {
      return getItem(KEYS.CHECKLIST_TEMPLATES, SEED_DATA.templates);
    },

    saveTemplate(template) {
      const templates = this.getTemplates();
      const index = templates.findIndex(t => t.id === template.id);
      if (index >= 0) {
        templates[index] = template;
      } else {
        templates.push(template);
      }
      setItem(KEYS.CHECKLIST_TEMPLATES, templates);
      return template;
    },

    // --- INSPECTIONS (PHIẾU KIỂM TRA AN TOÀN) ---
    getInspections() {
      return getItem(KEYS.INSPECTIONS, SEED_DATA.inspections);
    },

    saveInspection(record) {
      const list = this.getInspections();
      const existing = list.findIndex(i => i.id === record.id);
      if (existing >= 0) {
        list[existing] = record;
      } else {
        list.unshift(record);
      }
      setItem(KEYS.INSPECTIONS, list);

      // Bắn thông báo cho Cán bộ an toàn
      this.addNotification({
        roleTarget: 'safety',
        title: 'Đợt kiểm tra an toàn mới đã nộp',
        desc: `${record.inspector || 'Nhân sự hiện trường'} vừa nộp kết quả kiểm tra tại ${record.projectName || 'công trường'}. Đạt: ${record.passedItems || 0}, Lỗi: ${record.failedItems || 0}.`,
        time: 'Vừa xong',
        unread: true,
        targetLink: `../../safety/inspection_management_table/safety-inspection-management_table.html`
      });

      return record;
    },

    // --- NOTIFICATIONS (THÔNG BÁO) ---
    getNotifications(role) {
      const all = getItem(KEYS.NOTIFICATIONS, SEED_DATA.notifications);
      if (!role) return all;
      return all.filter(n => !n.roleTarget || n.roleTarget === role || n.roleTarget === 'all');
    },

    addNotification(notif) {
      const all = getItem(KEYS.NOTIFICATIONS, SEED_DATA.notifications);
      const newNotif = {
        id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        unread: true,
        time: 'Vừa xong',
        ...notif
      };
      all.unshift(newNotif);
      setItem(KEYS.NOTIFICATIONS, all);
      return newNotif;
    }
  };

  // 6. ROLE SWITCHERS (DESKTOP TOP-RIGHT & MOBILE UNDER-PROJECT)
  function injectRoleSwitchers() {
    // Không chèn trên trang login, register, reset-password hoặc 404
    const p = window.location.pathname.toLowerCase();
    if (p.includes('login.html') || p.includes('create_account.html') || p.includes('reset password.html') || p.includes('404')) {
      return;
    }

    if (document.getElementById('sitesafe-desktop-role-wrap') || document.getElementById('sitesafe-mobile-role-card')) {
      return;
    }

    // Xác định vai trò hiện tại
    const urlParams = new URLSearchParams(window.location.search);
    let currentRole = urlParams.get('role');
    if (!currentRole) {
      if (p.includes('/safety/')) currentRole = 'safety';
      else if (p.includes('/manager/')) currentRole = 'manager';
      else if (p.includes('/admin/')) currentRole = 'admin';
      else if (p.includes('/worker/')) currentRole = 'worker';
      else currentRole = localStorage.getItem(KEYS.ROLE_CURRENT) || 'worker';
    }
    localStorage.setItem(KEYS.ROLE_CURRENT, currentRole);

    function getRootPrefix() {
      const path = window.location.pathname.replace(/\\/g, '/');
      if (path.includes('/worker/') || path.includes('/safety/') || path.includes('/manager/') || path.includes('/admin/') || path.includes('/share/')) {
        return '../../';
      }
      return './';
    }
    const prefix = getRootPrefix();

    const roleInfo = {
      worker: {
        id: 'worker',
        num: '1',
        name: 'Hiện trường (Worker)',
        shortName: 'Hiện trường',
        desc: 'Kiểm tra an toàn & Báo cáo sự cố',
        icon: 'fa-hard-hat',
        color: '#ff6b00',
        bgSoft: 'rgba(255, 107, 0, 0.12)',
        link: `${prefix}worker/safety-checklist/worker-safety-checklist.html`
      },
      safety: {
        id: 'safety',
        num: '2',
        name: 'Cán bộ An toàn (HSE)',
        shortName: 'Cán bộ HSE',
        desc: 'Duyệt sự cố & Giao việc khắc phục',
        icon: 'fa-shield-halved',
        color: '#0284c7',
        bgSoft: 'rgba(2, 132, 199, 0.12)',
        link: `${prefix}safety/safety_dashboard/safety_dashboard.html`
      },
      manager: {
        id: 'manager',
        num: '3',
        name: 'Quản lý công trường',
        shortName: 'Quản lý',
        desc: 'Bản đồ rủi ro, Kanban & Nghiệm thu',
        icon: 'fa-clipboard-check',
        color: '#10b981',
        bgSoft: 'rgba(16, 185, 129, 0.12)',
        link: `${prefix}manager/zone_risk_map/manager-zone-risk-map.html`
      },
      admin: {
        id: 'admin',
        num: '4',
        name: 'Quản trị viên (Admin)',
        shortName: 'Admin',
        desc: 'Cấu hình mẫu checklist & Khu vực',
        icon: 'fa-gear',
        color: '#8b5cf6',
        bgSoft: 'rgba(139, 92, 246, 0.12)',
        link: `${prefix}admin/checklist_template/admin-checklist-template-management.html`
      }
    };

    const demoAccounts = {
      worker: { name: 'Lê Văn Hùng', email: 'worker@sitesafe.vn', role: 'worker', sv: 'SV1', project: 'Metro Tower - Khu B' },
      safety: { name: 'Đinh Trọng Tài', email: 'safety@sitesafe.vn', role: 'safety', sv: 'SV2', project: 'Metro Tower - Khu B' },
      manager: { name: 'Nguyễn Văn Minh', email: 'manager@sitesafe.vn', role: 'manager', sv: 'SV3', project: 'Metro Tower - Khu B' },
      admin: { name: 'Trần Đình Thắng', email: 'admin@sitesafe.vn', role: 'admin', sv: 'SV4', project: 'Toàn bộ hệ thống SiteSafe' }
    };

    const cur = roleInfo[currentRole] || roleInfo.worker;

    // Chèn Global Styles cho Role Switcher (Desktop & Mobile)
    const styleEl = document.createElement('style');
    styleEl.id = 'sitesafe-role-switcher-styles';
    styleEl.textContent = `
      /* ================= DESKTOP ROLE SWITCHER ================= */
      .ss-desktop-role-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        margin-right: 8px;
        font-family: inherit;
        z-index: 9999;
      }
      @media (max-width: 850px) {
        .ss-desktop-role-wrap {
          display: none !important;
        }
      }
      .ss-desktop-role-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 38px;
        padding: 0 12px;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-size: 13px;
        color: #1e293b;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        transition: all 0.15s ease;
      }
      .ss-desktop-role-btn:hover {
        background: #f8fafc;
        border-color: #94a3b8;
        transform: translateY(-1px);
      }
      .ss-desktop-role-icon {
        width: 22px;
        height: 22px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        flex-shrink: 0;
      }
      .ss-desktop-role-text {
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
      }
      .ss-desktop-role-sub {
        font-size: 11px;
        color: #64748b;
        font-weight: 500;
      }
      .ss-desktop-role-title {
        font-size: 13px;
        color: #0f172a;
        font-weight: 700;
      }
      .ss-desktop-role-arrow {
        font-size: 10px;
        color: #64748b;
        margin-left: 2px;
        transition: transform 0.2s ease;
      }
      .ss-desktop-role-btn.open .ss-desktop-role-arrow {
        transform: rotate(180deg);
      }
      .ss-role-dropdown-menu {
        display: none;
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        width: 300px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 12px 30px -4px rgba(15, 23, 42, 0.18), 0 4px 6px -2px rgba(15, 23, 42, 0.05);
        padding: 10px;
        z-index: 999999;
      }
      .ss-role-dropdown-menu.open {
        display: block;
        animation: ssDropdownFade 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes ssDropdownFade {
        from { opacity: 0; transform: translateY(-6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .ss-menu-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 8px 8px;
        border-bottom: 1px solid #f1f5f9;
        margin-bottom: 6px;
      }
      .ss-menu-header-text {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        color: #64748b;
        letter-spacing: 0.05em;
      }
      .ss-badge-demo {
        font-size: 10px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 999px;
        background: #f1f5f9;
        color: #475569;
      }
      .ss-role-opt-item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 10px;
        border-radius: 8px;
        border: none;
        background: transparent;
        cursor: pointer;
        text-align: left;
        transition: all 0.15s ease;
        margin-bottom: 3px;
      }
      .ss-role-opt-item:hover {
        background: #f8fafc;
      }
      .ss-role-opt-item.active {
        background: #f1f5f9;
      }
      .ss-opt-icon {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        flex-shrink: 0;
      }
      .ss-opt-info {
        flex: 1;
        min-width: 0;
      }
      .ss-opt-title {
        font-size: 12.5px;
        font-weight: 700;
        color: #0f172a;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .ss-opt-desc {
        font-size: 11px;
        color: #64748b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 1px;
      }
      .ss-opt-active-check {
        font-size: 12px;
        color: #10b981;
      }
      .ss-menu-footer {
        margin-top: 6px;
        padding-top: 6px;
        border-top: 1px solid #f1f5f9;
      }
      .ss-btn-reset-demo {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        padding: 7px;
        border-radius: 6px;
        border: 1px solid #fee2e2;
        background: #fef2f2;
        color: #dc2626;
        font-size: 11.5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .ss-btn-reset-demo:hover {
        background: #fee2e2;
        color: #b91c1c;
      }

      /* ================= MOBILE UNDER-PROJECT ROLE SWITCHER ================= */
      .ss-mobile-role-card {
        display: block;
        margin-top: 8px;
        margin-bottom: 6px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 10px;
        padding: 8px 10px;
        font-family: inherit;
        position: relative;
        z-index: 50;
      }
      @media (min-width: 851px) {
        .ss-mobile-role-card,
        .ss-mobile-standalone-block {
          display: none !important;
        }
      }
      .ss-mobile-role-sub {
        font-size: 10px;
        font-weight: 700;
        color: #94a3b8;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .ss-mobile-role-trigger {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 8px 10px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .ss-mobile-role-trigger:hover,
      .ss-mobile-role-trigger:active {
        background: rgba(0, 0, 0, 0.38);
        border-color: rgba(255, 255, 255, 0.22);
      }
      .ss-mobile-role-trigger-left {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
      }
      .ss-role-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .ss-mobile-role-name {
        font-size: 13px;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ss-mobile-role-trigger-right {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }
      .ss-mobile-switch-tag {
        font-size: 10px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.15);
        color: #e2e8f0;
      }
      .ss-mobile-role-dropdown {
        display: none;
        margin-top: 8px;
        background: #181b20;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        padding: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      }
      .ss-mobile-role-dropdown.open {
        display: block;
        animation: ssDropdownFade 0.18s ease-out;
      }
      .ss-mobile-opt-item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 10px;
        border-radius: 8px;
        border: none;
        background: transparent;
        color: #e2e8f0;
        cursor: pointer;
        text-align: left;
        margin-bottom: 4px;
      }
      .ss-mobile-opt-item:hover,
      .ss-mobile-opt-item:active {
        background: rgba(255, 255, 255, 0.08);
      }
      .ss-mobile-opt-item.active {
        background: rgba(255, 107, 0, 0.16);
        color: #ff8533;
      }
      .ss-mobile-opt-icon {
        width: 28px;
        height: 28px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        flex-shrink: 0;
      }
      .ss-mobile-opt-title {
        font-size: 12.5px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .ss-mobile-opt-desc {
        font-size: 11px;
        color: #94a3b8;
        margin-top: 1px;
      }
      .ss-mobile-standalone-block {
        display: block;
        background: #0f172a;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 12px 16px;
        color: #ffffff;
        margin-bottom: 14px;
        border-radius: 10px;
      }
    `;
    document.head.appendChild(styleEl);

    function createRoleItemsHtml(isMobile) {
      return Object.values(roleInfo).map(r => {
        const isActive = r.id === currentRole;
        if (isMobile) {
          return `
            <button type="button" class="ss-mobile-opt-item ${isActive ? 'active' : ''}" data-role="${r.id}">
              <span class="ss-mobile-opt-icon" style="background: ${r.color}; color: #fff;">
                <i class="fa-solid ${r.icon}"></i>
              </span>
              <div style="flex:1; min-width:0;">
                <div class="ss-mobile-opt-title">
                  <span>${r.name}</span>
                  ${isActive ? '<i class="fa-solid fa-check" style="font-size:11px; color:#10b981;"></i>' : ''}
                </div>
                <div class="ss-mobile-opt-desc">${r.desc}</div>
              </div>
            </button>
          `;
        }
        return `
          <button type="button" class="ss-role-opt-item ${isActive ? 'active' : ''}" data-role="${r.id}">
            <span class="ss-opt-icon" style="background: ${r.bgSoft}; color: ${r.color};">
              <i class="fa-solid ${r.icon}"></i>
            </span>
            <div class="ss-opt-info">
              <div class="ss-opt-title">
                <span>${r.name}</span>
                ${isActive ? '<i class="fa-solid fa-check ss-opt-active-check"></i>' : ''}
              </div>
              <div class="ss-opt-desc">${r.desc}</div>
            </div>
          </button>
        `;
      }).join('');
    }

    function switchRole(targetRole) {
      localStorage.setItem(KEYS.ROLE_CURRENT, targetRole);
      if (demoAccounts[targetRole]) {
        sessionStorage.setItem('sitesafe_current_user', JSON.stringify(demoAccounts[targetRole]));
      }
      window.location.href = roleInfo[targetRole].link;
    }

    // 1. INJECT DESKTOP ROLE SWITCHER VÀO TOP-RIGHT HEADER
    const desktopTopRight = document.querySelector('.topbar-right, .dau-trang-phai, .khu-vuc-hanh-dong-tren, .ha-dong-thao-tac-tren');
    if (desktopTopRight) {
      // Bỏ nút trợ giúp (gợi ý) nếu có trên desktop topbar
      desktopTopRight.querySelectorAll('#btnDesktopHelp, .nut-tro-giup, [title*="Trợ giúp"], [title*="gợi ý"], [title*="Trợ giúp"]').forEach(el => el.remove());

      const desktopWrap = document.createElement('div');
      desktopWrap.className = 'ss-desktop-role-wrap';
      desktopWrap.id = 'sitesafe-desktop-role-wrap';
      desktopWrap.innerHTML = `
        <button type="button" class="ss-desktop-role-btn" id="ssDesktopRoleBtn" title="Chuyển đổi vai trò làm việc">
          <span class="ss-desktop-role-icon" style="background: ${cur.bgSoft}; color: ${cur.color};">
            <i class="fa-solid ${cur.icon}"></i>
          </span>
          <span class="ss-desktop-role-text">
            <span class="ss-desktop-role-sub">Vai trò:</span>
            <strong class="ss-desktop-role-title">${cur.shortName}</strong>
          </span>
          <i class="fa-solid fa-chevron-down ss-desktop-role-arrow" id="ssDesktopArrow"></i>
        </button>
        <div class="ss-role-dropdown-menu" id="ssDesktopRoleMenu">
          <div class="ss-menu-header">
            <span class="ss-menu-header-text">VAI TRÒ HỆ THỐNG (DEMO)</span>
            <span class="ss-badge-demo">SiteSafe</span>
          </div>
          <div class="ss-menu-list">
            ${createRoleItemsHtml(false)}
          </div>
          <div class="ss-menu-footer">
            <button type="button" class="ss-btn-reset-demo" id="ssDesktopResetBtn">
              <i class="fa-solid fa-arrow-rotate-left"></i> Khôi phục dữ liệu mẫu
            </button>
          </div>
        </div>
      `;

      // Chèn lên đầu danh sách nút thao tác phải (trước nút thông báo & hồ sơ)
      desktopTopRight.insertBefore(desktopWrap, desktopTopRight.firstChild);

      const desktopBtn = desktopWrap.querySelector('#ssDesktopRoleBtn');
      const desktopMenu = desktopWrap.querySelector('#ssDesktopRoleMenu');
      const desktopReset = desktopWrap.querySelector('#ssDesktopResetBtn');

      desktopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = desktopMenu.classList.toggle('open');
        desktopBtn.classList.toggle('open', isOpen);
      });

      document.addEventListener('click', (e) => {
        if (!desktopWrap.contains(e.target)) {
          desktopMenu.classList.remove('open');
          desktopBtn.classList.remove('open');
        }
      });

      desktopWrap.querySelectorAll('.ss-role-opt-item').forEach(btn => {
        btn.addEventListener('click', () => {
          switchRole(btn.dataset.role);
        });
      });

      if (desktopReset) {
        desktopReset.addEventListener('click', () => {
          if (confirm('Bạn có chắc muốn khôi phục lại dữ liệu mẫu ban đầu của SiteSafe? Các báo cáo bạn vừa tạo để test sẽ được reset về mẫu chuẩn.')) {
            SiteSafeStore.resetDemoData();
          }
        });
      }
    }

    // 2. INJECT MOBILE ROLE SWITCHER DƯỚI PHẦN CHỌN DỰ ÁN TRÊN MOBILE
    function buildMobileRoleCard() {
      const card = document.createElement('div');
      card.className = 'ss-mobile-role-card';
      card.id = 'sitesafe-mobile-role-card';
      card.innerHTML = `
        <div class="ss-mobile-role-sub">
          <i class="fa-solid fa-users-gear"></i> VAI TRÒ TRUY CẬP (DEMO)
        </div>
        <button type="button" class="ss-mobile-role-trigger" id="ssMobileRoleTrigger">
          <div class="ss-mobile-role-trigger-left">
            <span class="ss-role-dot" style="background: ${cur.color}; box-shadow: 0 0 6px ${cur.color};"></span>
            <span class="ss-mobile-role-name"><strong>${cur.shortName}</strong> · ${cur.name}</span>
          </div>
          <div class="ss-mobile-role-trigger-right">
            <span class="ss-mobile-switch-tag">Đổi vai trò</span>
            <i class="fa-solid fa-chevron-down" id="ssMobileArrow" style="font-size:10px; transition:transform 0.2s;"></i>
          </div>
        </button>
        <div class="ss-mobile-role-dropdown" id="ssMobileRoleDropdown">
          ${createRoleItemsHtml(true)}
          <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1);">
            <button type="button" class="ss-btn-reset-demo" id="ssMobileResetBtn" style="background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.3); color: #f87171;">
              <i class="fa-solid fa-arrow-rotate-left"></i> Khôi phục dữ liệu mẫu
            </button>
          </div>
        </div>
      `;

      const trigger = card.querySelector('#ssMobileRoleTrigger');
      const dropdown = card.querySelector('#ssMobileRoleDropdown');
      const arrow = card.querySelector('#ssMobileArrow');
      const resetBtn = card.querySelector('#ssMobileResetBtn');

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('open');
        arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      });

      document.addEventListener('click', (e) => {
        if (!card.contains(e.target)) {
          dropdown.classList.remove('open');
          arrow.style.transform = 'rotate(0deg)';
        }
      });

      card.querySelectorAll('.ss-mobile-opt-item').forEach(btn => {
        btn.addEventListener('click', () => {
          switchRole(btn.dataset.role);
        });
      });

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('Bạn có chắc muốn khôi phục lại dữ liệu mẫu ban đầu của SiteSafe? Các báo cáo bạn vừa tạo để test sẽ được reset về mẫu chuẩn.')) {
            SiteSafeStore.resetDemoData();
          }
        });
      }

      return card;
    }

    const mobileProj = document.querySelector('.mobile-project-info, .mobile-project-badge-card, #mobileProjectSection');
    if (mobileProj) {
      // Đặt ngay dưới phần chọn, đổi dự án, công trường
      mobileProj.insertAdjacentElement('afterend', buildMobileRoleCard());
    } else {
      // Trường hợp trang Safety hoặc Admin chưa có .mobile-project-info riêng biệt trên mobile:
      // Tạo block gồm chọn công trường và chọn role ngay phía dưới header
      const safetyBody = document.querySelector('.than-trang');
      const adminBody = document.querySelector('.noi-dung');
      const targetBody = safetyBody || adminBody || document.querySelector('main');
      if (targetBody) {
        const block = document.createElement('div');
        block.className = 'ss-mobile-standalone-block';
        block.innerHTML = `
          <div class="mobile-project-info" style="display:flex; flex-direction:column; gap:2px; margin-bottom:8px;">
            <span class="sub-label" style="font-size:10px; font-weight:700; color:#94a3b8; letter-spacing:0.05em; text-transform:uppercase;">CÔNG TRƯỜNG ĐANG THEO DÕI</span>
            <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
              <span style="font-size:14px; font-weight:700; color:#ffffff;">Metro Tower - Khu B</span>
              <i class="fa-solid fa-chevron-down" style="font-size:11px; color:#94a3b8;"></i>
            </div>
          </div>
        `;
        block.appendChild(buildMobileRoleCard());
        targetBody.insertBefore(block, targetBody.firstChild);
      }
    }
  }

  // Khởi chạy Switcher khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectRoleSwitchers);
  } else {
    injectRoleSwitchers();
  }

  // Xuất API toàn cục
  window.SiteSafeStore = SiteSafeStore;

})(window);
