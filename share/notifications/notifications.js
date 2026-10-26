/**
 * ============================================================================
 * SITESAFE - NOTIFICATION CENTER JAVASCRIPT (notifications.js)
 * Multi-Role Data Routing & Complete Synchronized Interactions
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------------------------------
    // 1. DATA REPOSITORY CHO 4 ROLES TRONG HỆ THỐNG
    // ------------------------------------------------------------------------
    const rolesData = {
        supervisor: {
            roleKey: 'supervisor',
            userName: 'Đinh Trọng Tài',
            roleName: 'Cán bộ An toàn',
            roleHeading: 'CÁN BỘ AN TOÀN',
            avatarText: 'ĐT',
            avatarBg: '#0284c7',
            navItems: [
                { title: 'Tổng quan an toàn', icon: 'fa-solid fa-chart-pie', link: '../../safety/safety_dashboard/safety_dashboard.html' },
                { title: 'Chi tiết mối nguy', icon: 'fa-solid fa-triangle-exclamation', link: '../../safety/hazard_detail/safety-hazard-detail.html' },
                { title: 'Quản lý kiểm tra', icon: 'fa-solid fa-clipboard-check', link: '../../safety/inspection_management_table/safety-inspection-management_table.html' },
                { title: 'Trung tâm thông báo', icon: 'fa-solid fa-bell', link: 'notifications.html?role=safety', active: true }
            ],
            notifications: [
                {
                    id: 'sup-1',
                    type: 'hazard',
                    iconClass: 'icon-box-hazard',
                    icon: 'fa-solid fa-triangle-exclamation',
                    title: 'Mối nguy mới',
                    unread: true,
                    isHigh: true,
                    isAi: false,
                    desc: 'Lê Văn Hùng vừa báo cáo thiếu lan can tại mép sàn tầng 12. Mức độ rủi ro: Cao.',
                    location: 'Zone B · Tầng 12',
                    time: '5 phút trước',
                    targetLink: '../../safety/hazard_detail/safety-hazard-detail.html?id=HAZ-2026-001'
                },
                {
                    id: 'sup-2',
                    type: 'ai',
                    iconClass: 'icon-box-ai',
                    icon: 'fa-solid fa-wand-magic-sparkles',
                    title: 'Cảnh báo điểm nóng',
                    unread: true,
                    isHigh: false,
                    isAi: true,
                    desc: 'AI phát hiện mật độ sự cố tăng 38% quanh khu vực vận thăng trong 7 ngày gần đây.',
                    location: 'Zone C - Khu vận thăng',
                    time: '18 phút trước',
                    targetLink: '../../manager/zone_risk_map/manager-zone-risk-map.html'
                },
                {
                    id: 'sup-3',
                    type: 'completed',
                    iconClass: 'icon-box-completed',
                    icon: 'fa-solid fa-circle-check',
                    title: 'Hành động đã hoàn thành',
                    unread: true,
                    isHigh: false,
                    isAi: false,
                    desc: 'Hạng mục lắp bổ sung lan can bảo vệ đã được Trần Minh Đức xác nhận hoàn thành.',
                    location: 'Zone A · Tầng 8',
                    time: '1 giờ trước',
                    targetLink: '../../worker/my_hazard/worker-my-hazard.html'
                },
                {
                    id: 'sup-4',
                    type: 'hazard',
                    iconClass: 'icon-box-hazard',
                    icon: 'fa-solid fa-triangle-exclamation',
                    title: 'Mối nguy mới',
                    unread: true,
                    isHigh: false,
                    isAi: false,
                    desc: 'Hệ thống ghi nhận dây điện tạm đi qua vùng sàn ẩm; cần cô lập và kiểm tra ngay.',
                    location: 'Zone C · Tầng 2',
                    time: '2 giờ trước',
                    targetLink: '../../worker/my_hazard/worker-my-hazard.html'
                },
                {
                    id: 'sup-5',
                    type: 'ai',
                    iconClass: 'icon-box-ai',
                    icon: 'fa-solid fa-wand-magic-sparkles',
                    title: 'Cảnh báo AI vi phạm BHLĐ',
                    unread: false,
                    isHigh: true,
                    isAi: true,
                    desc: 'Camera AI phát hiện 2 công nhân tổ giàn giáo chưa cài quai nón bảo hộ tại sàn thao tác ngoài.',
                    location: 'Zone B · Tầng 14',
                    time: '3 giờ trước',
                    targetLink: '../../worker/my_hazard/worker-my-hazard.html'
                },
                {
                    id: 'sup-6',
                    type: 'system',
                    iconClass: 'icon-box-system',
                    icon: 'fa-solid fa-clipboard-check',
                    title: 'Yêu cầu nghiệm thu an toàn',
                    unread: false,
                    isHigh: false,
                    isAi: false,
                    desc: 'Đội thầu cơ điện MEP gửi biên bản đề nghị nghiệm thu tủ điện nguồn tạm trước ca thi công đêm.',
                    location: 'Zone A · Tầng hầm B1',
                    time: '4 giờ trước',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'sup-7',
                    type: 'completed',
                    iconClass: 'icon-box-completed',
                    icon: 'fa-solid fa-circle-check',
                    title: 'Báo cáo kiểm tra hoàn tất',
                    unread: false,
                    isHigh: false,
                    isAi: false,
                    desc: 'Biên bản kiểm tra an toàn tuần 42 khối Zone B đã hoàn tất và lưu trữ hồ sơ dự án.',
                    location: 'Zone B · Toàn khu vực',
                    time: 'Hôm qua',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'sup-8',
                    type: 'ai',
                    iconClass: 'icon-box-ai',
                    icon: 'fa-solid fa-wand-magic-sparkles',
                    title: 'Cảnh báo AI cảm biến tải trọng',
                    unread: false,
                    isHigh: false,
                    isAi: true,
                    desc: 'Hệ thống IoT ghi nhận cần cẩu tháp số 2 chạm 92% ngưỡng tải an toàn trong 2 chu kỳ nâng hàng.',
                    location: 'Zone B · Cẩu tháp C2',
                    time: '2 ngày trước',
                    targetLink: '../../manager/zone_risk_map/manager-zone-risk-map.html'
                }
            ]
        },

        manager: {
            roleKey: 'manager',
            userName: 'Nguyễn Văn Minh',
            roleName: 'Quản lý công trường',
            roleHeading: 'QUẢN LÝ CÔNG TRƯỜNG',
            avatarText: 'NM',
            avatarBg: '#059669',
            navItems: [
                { title: 'Bản đồ rủi ro', icon: 'fa-solid fa-table-cells-large', link: '../../manager/zone_risk_map/manager-zone-risk-map.html' },
                { title: 'Hành động khắc phục', icon: 'fa-solid fa-triangle-exclamation', link: '../../manager/corrective-actions/manager-corrective-actions.html' },
                { title: 'Báo cáo an toàn', icon: 'fa-regular fa-file-lines', link: '../../manager/safety_report/manager-safety-report.html' },
                { title: 'Trung tâm thông báo', icon: 'fa-solid fa-bell', link: 'notifications.html?role=manager', active: true }
            ],
            notifications: [
                {
                    id: 'mgr-1',
                    type: 'danger',
                    iconClass: 'icon-box-danger',
                    icon: 'fa-solid fa-triangle-exclamation',
                    title: 'Chỉ số rủi ro Zone B vượt ngưỡng',
                    unread: true,
                    isHigh: true,
                    isAi: false,
                    desc: 'Zone B ghi nhận điểm rủi ro an toàn 84/100 (vùng Đỏ) do phát hiện 3 vi phạm mép sàn cùng lúc.',
                    location: 'Zone B · Sàn tầng 12',
                    time: '10 phút trước',
                    targetLink: '../../manager/zone_risk_map/manager-zone-risk-map.html'
                },
                {
                    id: 'mgr-2',
                    type: 'ai',
                    iconClass: 'icon-box-ai',
                    icon: 'fa-solid fa-wand-magic-sparkles',
                    title: 'Cảnh báo AI tiến độ & an toàn',
                    unread: true,
                    isHigh: true,
                    isAi: true,
                    desc: 'AI phân tích nguy cơ chậm tiến độ 1.5 ngày do thời tiết xấu và sự cố vận thăng tại Zone C.',
                    location: 'Zone C · Tháp văn phòng',
                    time: '25 phút trước',
                    targetLink: '../../manager/zone_risk_map/manager-zone-risk-map.html'
                },
                {
                    id: 'mgr-3',
                    type: 'system',
                    iconClass: 'icon-box-system',
                    icon: 'fa-solid fa-file-signature',
                    title: 'Yêu cầu phê duyệt công tác đêm',
                    unread: true,
                    isHigh: false,
                    isAi: false,
                    desc: 'HSE Đinh Trọng Tài vừa gửi phương án chiếu sáng và an toàn đổ bê tông dầm sàn ca đêm chờ bạn ký duyệt.',
                    location: 'Zone A · Khối Podium',
                    time: '1 giờ trước',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'mgr-4',
                    type: 'completed',
                    iconClass: 'icon-box-completed',
                    icon: 'fa-solid fa-circle-check',
                    title: 'Báo cáo an toàn tuần 42',
                    unread: true,
                    isHigh: false,
                    isAi: false,
                    desc: 'Báo cáo tổng hợp an toàn tuần 42 với tỷ lệ khắc phục đạt 94.2% đã được hệ thống xuất bản tự động.',
                    location: 'Toàn dự án Metro Tower',
                    time: '3 giờ trước',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'mgr-5',
                    type: 'completed',
                    iconClass: 'icon-box-completed',
                    icon: 'fa-solid fa-circle-check',
                    title: 'Sự cố điện đã khắc phục',
                    unread: false,
                    isHigh: false,
                    isAi: false,
                    desc: 'Tổ điện đã thay mới đường cáp bọc cao su chịu tải qua vùng ẩm tầng 2, đã kiểm định đóng điện lại an toàn.',
                    location: 'Zone C · Tầng 2',
                    time: 'Hôm qua',
                    targetLink: '../../worker/my_hazard/worker-my-hazard.html'
                },
                {
                    id: 'mgr-6',
                    type: 'ai',
                    iconClass: 'icon-box-ai',
                    icon: 'fa-solid fa-wand-magic-sparkles',
                    title: 'Cảnh báo AI mật độ nhân công',
                    unread: false,
                    isHigh: false,
                    isAi: true,
                    desc: 'Mật độ tập trung công nhân vượt quá định mức 15 người/sàn thao tác tại nhịp khung trục 4-6.',
                    location: 'Zone B · Tầng 10',
                    time: '2 ngày trước',
                    targetLink: '../../manager/zone_risk_map/manager-zone-risk-map.html'
                }
            ]
        },

        worker: {
            roleKey: 'worker',
            userName: 'Lê Văn Hùng',
            roleName: 'Nhân sự hiện trường',
            roleHeading: 'NHÂN SỰ HIỆN TRƯỜNG',
            avatarText: 'LH',
            avatarBg: '#d97706',
            navItems: [
                { title: 'Kiểm tra an toàn', icon: 'fa-solid fa-clipboard-check', link: '../../worker/safety-checklist/worker-safety-checklist.html' },
                { title: 'Báo cáo mối nguy', icon: 'fa-solid fa-triangle-exclamation', link: '../../worker/hazard_create/worker-hazard-create.html' },
                { title: 'Mối nguy của tôi', icon: 'fa-solid fa-folder-open', link: '../../worker/my_hazard/worker-my-hazard.html' },
                { title: 'Trung tâm thông báo', icon: 'fa-solid fa-bell', link: 'notifications.html?role=worker', active: true }
            ],
            notifications: [
                {
                    id: 'wrk-1',
                    type: 'system',
                    iconClass: 'icon-box-system',
                    icon: 'fa-solid fa-bullhorn',
                    title: 'Nhắc nhở họp Toolbox đầu ca',
                    unread: true,
                    isHigh: true,
                    isAi: false,
                    desc: 'Họp an toàn 15 phút đầu giờ tại Zone B lúc 07:00. Yêu cầu toàn tổ kiểm tra móc khóa dây an toàn 2 móc.',
                    location: 'Zone B · Sân thi công',
                    time: '15 phút trước',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'wrk-2',
                    type: 'danger',
                    iconClass: 'icon-box-danger',
                    icon: 'fa-solid fa-cloud-bolt',
                    title: 'Cảnh báo thời tiết giông lốc',
                    unread: true,
                    isHigh: true,
                    isAi: false,
                    desc: 'Dự báo gió giật cấp 6 từ 14:00. Yêu cầu toàn bộ thợ kết cấu tầng 12 trở lên thu dọn vật tư và xuống sàn an toàn.',
                    location: 'Zone B & Zone C',
                    time: '40 phút trước',
                    targetLink: '../../worker/my_hazard/worker-my-hazard.html'
                },
                {
                    id: 'wrk-3',
                    type: 'completed',
                    iconClass: 'icon-box-completed',
                    icon: 'fa-solid fa-circle-check',
                    title: 'Mối nguy bạn báo cáo đã xử lý',
                    unread: true,
                    isHigh: false,
                    isAi: false,
                    desc: 'Mối nguy "Dây điện tạm trần sàn ẩm" do bạn báo cáo sáng nay đã được đội bảo trì bọc ống bảo hộ an toàn.',
                    location: 'Zone C · Tầng 2',
                    time: '2 giờ trước',
                    targetLink: '../../worker/my_hazard/worker-my-hazard.html'
                },
                {
                    id: 'wrk-4',
                    type: 'ai',
                    iconClass: 'icon-box-ai',
                    icon: 'fa-solid fa-wand-magic-sparkles',
                    title: 'Khuyến nghị an toàn từ AI',
                    unread: true,
                    isHigh: false,
                    isAi: true,
                    desc: 'AI khuyến nghị kiểm tra neo giằng thành hố đào trước khi đưa máy đầm xuống làm việc.',
                    location: 'Zone A · Khu vực hố móng',
                    time: '3 giờ trước',
                    targetLink: '../../worker/my_hazard/worker-my-hazard.html'
                },
                {
                    id: 'wrk-5',
                    type: 'completed',
                    iconClass: 'icon-box-completed',
                    icon: 'fa-solid fa-circle-check',
                    title: 'Checklist đã được duyệt',
                    unread: false,
                    isHigh: false,
                    isAi: false,
                    desc: 'Danh mục kiểm tra an toàn giàn giáo bao che ca sáng của tổ bạn đã được HSE Đinh Trọng Tài ký xác nhận.',
                    location: 'Zone B · Tầng 12',
                    time: 'Hôm qua',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'wrk-6',
                    type: 'system',
                    iconClass: 'icon-box-system',
                    icon: 'fa-solid fa-wrench',
                    title: 'Kiểm định máy cắt sắt',
                    unread: false,
                    isHigh: false,
                    isAi: false,
                    desc: 'Máy cắt sắt số hiệu MC-08 đã đến hạn dán tem kiểm định an toàn tháng 10.',
                    location: 'Kho thiết bị hiện trường',
                    time: '2 ngày trước',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                }
            ]
        },

        admin: {
            roleKey: 'admin',
            userName: 'Trần Đình Thắng',
            roleName: 'Quản trị viên',
            roleHeading: 'QUẢN TRỊ VIÊN HỆ THỐNG',
            avatarText: 'TT',
            avatarBg: '#7c3aed',
            navItems: [
                { title: 'Mẫu kiểm tra', icon: 'fa-solid fa-table-list', link: '../../admin/checklist_template/admin-checklist-template-management.html' },
                { title: 'Quản lý khu vực', icon: 'fa-solid fa-map-location-dot', link: '../../admin/zone_management/admin-zone-management.html' },
                { title: 'Quản lý người dùng', icon: 'fa-solid fa-users-gear', link: '../../admin/user-management/admin-user-management.html' },
                { title: 'Trung tâm thông báo', icon: 'fa-solid fa-bell', link: 'notifications.html?role=admin', active: true }
            ],
            notifications: [
                {
                    id: 'adm-1',
                    type: 'system',
                    iconClass: 'icon-box-system',
                    icon: 'fa-solid fa-user-plus',
                    title: '4 tài khoản nhà thầu phụ chờ kích hoạt',
                    unread: true,
                    isHigh: true,
                    isAi: false,
                    desc: 'Nhà thầu xây dựng Hòa Bình vừa gửi danh sách đề xuất cấp quyền cho 4 giám sát an toàn vào Zone B.',
                    location: 'Quản lý tài khoản',
                    time: '8 phút trước',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'adm-2',
                    type: 'ai',
                    iconClass: 'icon-box-ai',
                    icon: 'fa-solid fa-wand-magic-sparkles',
                    title: 'Cảnh báo AI đăng nhập bất thường',
                    unread: true,
                    isHigh: true,
                    isAi: true,
                    desc: 'Phát hiện 5 lượt đăng nhập sai mật khẩu liên tiếp từ địa chỉ IP lạ ngoài phạm vi công trường.',
                    location: 'Bảo mật hệ thống',
                    time: '20 phút trước',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'adm-3',
                    type: 'completed',
                    iconClass: 'icon-box-completed',
                    icon: 'fa-solid fa-circle-check',
                    title: 'Sao lưu dữ liệu tự động thành công',
                    unread: true,
                    isHigh: false,
                    isAi: false,
                    desc: 'Bản Snapshot dữ liệu SiteSafe Cloud v2.4 (dung lượng 1.84 GB) đã đồng bộ an toàn vào Google Cloud Storage.',
                    location: 'Database Backup',
                    time: '1.5 giờ trước',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'adm-4',
                    type: 'hazard',
                    iconClass: 'icon-box-hazard',
                    icon: 'fa-solid fa-server',
                    title: 'Cảnh báo tài nguyên lưu trữ Cloud',
                    unread: true,
                    isHigh: false,
                    isAi: false,
                    desc: 'Dung lượng ảnh hiện trường tải lên trong tháng đã chạm 85% hạn mức gói Enterprise.',
                    location: 'Hạ tầng máy chủ',
                    time: '3 giờ trước',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                },
                {
                    id: 'adm-5',
                    type: 'system',
                    iconClass: 'icon-box-system',
                    icon: 'fa-solid fa-circle-info',
                    title: 'Bản cập nhật SiteSafe v2.4.1',
                    unread: false,
                    isHigh: false,
                    isAi: false,
                    desc: 'Hotfix tối ưu tốc độ nạp bản đồ rủi ro SVG và sửa lỗi chọn ngày giờ trên thiết bị di động đã sẵn sàng triển khai.',
                    location: 'Hệ thống cốt lõi',
                    time: 'Hôm qua',
                    targetLink: '../../worker/safety-checklist/worker-safety-checklist.html'
                }
            ]
        }
    };
    rolesData.safety = rolesData.supervisor;

    // ------------------------------------------------------------------------
    // 2. STATE KHỞI TẠO
    // ------------------------------------------------------------------------
    let currentRoleKey = 'supervisor';
    let currentFilter = 'all';
    let isForceEmptyState = false;
    let searchQuery = '';

    // Khởi tạo role từ URL param (?role=...) hoặc localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role');
    const storedRole = localStorage.getItem('sitesafe_current_role');

    if (roleParam && rolesData[roleParam]) {
        currentRoleKey = roleParam;
    } else if (storedRole && rolesData[storedRole]) {
        currentRoleKey = storedRole;
    }

    // ------------------------------------------------------------------------
    // 3. TOAST HELPER
    // ------------------------------------------------------------------------
    const toastPopup = document.getElementById('toastPopup');
    const toastText = document.getElementById('toastText');
    const toastIcon = document.getElementById('toastIcon');
    let toastTimeout = null;

    function showToast(message, iconClass = 'fa-circle-check', isWarning = false) {
        if (!toastPopup || !toastText) return;

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastText.textContent = message;
        if (toastIcon) {
            toastIcon.className = `fa-solid ${iconClass} toast-icon`;
            toastIcon.style.color = isWarning ? '#ef4444' : '#ff6b00';
        }

        toastPopup.classList.add('show');
        toastTimeout = setTimeout(() => {
            toastPopup.classList.remove('show');
        }, 3200);
    }

    // ------------------------------------------------------------------------
    // 4. ROLE SWITCHING & RENDER GIAO DIỆN CHÍNH
    // ------------------------------------------------------------------------
    function switchRole(newRoleKey) {
        if (!rolesData[newRoleKey]) return;
        currentRoleKey = newRoleKey;
        localStorage.setItem('sitesafe_current_role', newRoleKey);

        const currentRole = rolesData[currentRoleKey];

        // 4.1. Cập nhật Sidebar Desktop
        const sidebarUserName = document.getElementById('sidebarUserName');
        const sidebarUserRole = document.getElementById('sidebarUserRole');
        const sidebarAvatar = document.getElementById('sidebarAvatar');
        const sidebarNavMenu = document.getElementById('sidebarNavMenu');

        if (sidebarUserName) sidebarUserName.textContent = currentRole.userName;
        if (sidebarUserRole) sidebarUserRole.textContent = currentRole.roleName;
        if (sidebarAvatar) {
            sidebarAvatar.textContent = currentRole.avatarText;
            sidebarAvatar.style.backgroundColor = currentRole.avatarBg;
        }

        if (sidebarNavMenu) {
            sidebarNavMenu.innerHTML = currentRole.navItems.map(item => `
                <a href="${item.link}" class="menu-item ${item.active ? 'active' : ''}" title="${item.title}">
                    <i class="${item.icon} nav-icon"></i>
                    <span>${item.title}</span>
                </a>
            `).join('');
        }

        // 4.2. Cập nhật Topbar Role Switcher Dropdown
        const roleSwitcherLabel = document.getElementById('roleSwitcherLabel');
        if (roleSwitcherLabel) roleSwitcherLabel.textContent = currentRole.roleName;

        document.querySelectorAll('.role-option').forEach(opt => {
            if (opt.getAttribute('data-role') === currentRoleKey) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });

        // 4.3. Cập nhật Mobile Drawer
        const drawerUserName = document.getElementById('drawerUserName');
        const drawerUserRole = document.getElementById('drawerUserRole');
        const drawerAvatar = document.getElementById('drawerAvatar');
        const drawerRoleHeading = document.getElementById('drawerRoleHeading');
        const drawerNavMenuList = document.getElementById('drawerNavMenuList');

        if (drawerUserName) drawerUserName.textContent = currentRole.userName;
        if (drawerUserRole) drawerUserRole.textContent = currentRole.roleName;
        if (drawerAvatar) {
            drawerAvatar.textContent = currentRole.avatarText;
            drawerAvatar.style.backgroundColor = currentRole.avatarBg;
        }
        if (drawerRoleHeading) drawerRoleHeading.textContent = currentRole.roleHeading;

        if (drawerNavMenuList) {
            drawerNavMenuList.innerHTML = currentRole.navItems.map(item => `
                <a href="${item.link}" class="drawer-menu-item ${item.active ? 'active' : ''}">
                    <i class="${item.icon}"></i>
                    <span>${item.title}</span>
                </a>
            `).join('');
        }

        // 4.4. Cập nhật Footer Signature
        const footerRoleSignature = document.getElementById('footerRoleSignature');
        if (footerRoleSignature) {
            footerRoleSignature.textContent = `${currentRole.userName} · ${currentRole.roleName}`;
        }

        // 4.5. Cập nhật link Profile & Logo theo Role
        const profileLinks = [
            document.getElementById('userProfileBrief'),
            document.getElementById('btnMobileUserProfile'),
            document.getElementById('drawerUserProfileBrief')
        ];
        profileLinks.forEach(link => {
            if (link) link.href = `../profile/profile.html?role=${currentRoleKey}`;
        });

        const homeLink = currentRoleKey === 'worker' ? '../../worker/safety-checklist/worker-safety-checklist.html' :
                         (currentRoleKey === 'supervisor' || currentRoleKey === 'safety') ? '../../safety/safety_dashboard/safety_dashboard.html' :
                         currentRoleKey === 'manager' ? '../../manager/zone_risk_map/manager-zone-risk-map.html' :
                         '../../admin/checklist_template/admin-checklist-template-management.html';

        const brandLogoLinks = [
            document.querySelector('.brand-logo-area a'),
            document.querySelector('.mobile-logo-link'),
            document.querySelector('.drawer-logo-link')
        ];
        brandLogoLinks.forEach(link => {
            if (link) link.href = homeLink;
        });

        // 4.6. Render lại danh sách thông báo
        renderNotifications();
    }

    // ------------------------------------------------------------------------
    // 5. RENDER THÔNG BÁO VÀ BADGES
    // ------------------------------------------------------------------------
    function renderNotifications() {
        const currentRole = rolesData[currentRoleKey];
        const allNotifications = currentRole.notifications;

        // Tích hợp thông báo mới từ SiteSafeStore
        if (window.SiteSafeStore) {
            const roleFilter = currentRoleKey === 'supervisor' ? 'safety' : currentRoleKey;
            const storeNotifs = window.SiteSafeStore.getNotifications(roleFilter);
            storeNotifs.forEach(sn => {
                if (!allNotifications.some(n => n.id === sn.id)) {
                    allNotifications.unshift({
                        id: sn.id,
                        type: 'hazard',
                        iconClass: 'icon-box-hazard',
                        icon: 'fa-solid fa-triangle-exclamation',
                        title: sn.title,
                        unread: sn.unread !== false,
                        isHigh: true,
                        isAi: false,
                        desc: sn.desc,
                        location: 'Metro Tower - Khu B',
                        time: sn.time || 'Vừa xong',
                        targetLink: sn.targetLink || '../../safety/safety_dashboard/safety_dashboard.html'
                    });
                }
            });
        }

        // Tính toán các số liệu thống kê
        const totalCount = allNotifications.length;
        const unreadCount = allNotifications.filter(n => n.unread).length;
        const highCount = allNotifications.filter(n => n.isHigh).length;
        const aiCount = allNotifications.filter(n => n.isAi).length;

        // Cập nhật các badge số đếm
        const badgeAll = document.getElementById('badgeAll');
        const badgeUnread = document.getElementById('badgeUnread');
        const badgeHigh = document.getElementById('badgeHigh');
        const badgeAi = document.getElementById('badgeAi');
        const listSummaryTotal = document.getElementById('listSummaryTotal');
        const listSummaryUnread = document.getElementById('listSummaryUnread');
        const mobileBellBadge = document.getElementById('mobileBellBadge');

        if (badgeAll) badgeAll.textContent = totalCount;
        if (badgeUnread) badgeUnread.textContent = unreadCount;
        if (badgeHigh) badgeHigh.textContent = highCount;
        if (badgeAi) badgeAi.textContent = aiCount;

        if (listSummaryTotal) listSummaryTotal.textContent = `${totalCount} thông báo`;
        if (listSummaryUnread) {
            listSummaryUnread.textContent = `${unreadCount} chưa đọc`;
            listSummaryUnread.style.display = unreadCount > 0 ? 'inline-block' : 'none';
        }

        if (mobileBellBadge) {
            mobileBellBadge.textContent = unreadCount;
            mobileBellBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
        }

        // Lọc danh sách theo Tab hiện tại
        let filteredList = allNotifications.slice();

        if (currentFilter === 'unread') {
            filteredList = filteredList.filter(n => n.unread);
        } else if (currentFilter === 'high') {
            filteredList = filteredList.filter(n => n.isHigh);
        } else if (currentFilter === 'ai') {
            filteredList = filteredList.filter(n => n.isAi);
        }

        // Lọc theo từ khóa tìm kiếm (nếu có)
        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            filteredList = filteredList.filter(n =>
                n.title.toLowerCase().includes(q) ||
                n.desc.toLowerCase().includes(q) ||
                n.location.toLowerCase().includes(q)
            );
        }

        const cardsContainer = document.getElementById('notificationCardsList');
        const leftEmptyState = document.getElementById('leftEmptyStateContainer');
        const listFooterLinkArea = document.getElementById('listFooterLinkArea');

        // Kiểm tra xem có hiển thị Trạng thái Rỗng không
        if (isForceEmptyState || filteredList.length === 0) {
            if (cardsContainer) cardsContainer.style.display = 'none';
            if (leftEmptyState) leftEmptyState.style.display = 'flex';
            if (listFooterLinkArea) listFooterLinkArea.style.display = 'none';
            return;
        }

        // Hiển thị danh sách card
        if (cardsContainer) cardsContainer.style.display = 'flex';
        if (leftEmptyState) leftEmptyState.style.display = 'none';
        if (listFooterLinkArea) listFooterLinkArea.style.display = 'block';

        if (cardsContainer) {
            cardsContainer.innerHTML = filteredList.map(item => `
                <article class="notification-card ${item.unread ? 'is-unread' : ''}" data-id="${item.id}">
                    <div class="card-main-content">
                        <div class="card-icon-box ${item.iconClass}">
                            <i class="${item.icon}"></i>
                        </div>
                        <div class="card-body-texts">
                            <div class="card-title-row">
                                <h3 class="card-title">${item.title}</h3>
                                <span class="unread-dot" title="Chưa đọc"></span>
                            </div>
                            <p class="card-description">${item.desc}</p>
                            <div class="card-meta-row">
                                <span class="card-meta-item"><i class="fa-solid fa-location-dot"></i> ${item.location}</span>
                                <span class="meta-dot-separator">•</span>
                                <span class="card-meta-item">${item.time}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-action-side">
                        <button type="button" class="btn-mark-read ${!item.unread ? 'is-read-state' : ''}" data-id="${item.id}">
                            ${item.unread ? 'Đánh dấu đã đọc' : '✓ Đã đọc'}
                        </button>
                    </div>
                </article>
            `).join('');

            // Gắn sự kiện click cho các nút Đánh dấu đã đọc đơn lẻ
            cardsContainer.querySelectorAll('.btn-mark-read').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const notifId = btn.getAttribute('data-id');
                    markSingleAsRead(notifId);
                });
            });

            // Gắn sự kiện click card để chuyển tới màn hình tương ứng
            cardsContainer.querySelectorAll('.notification-card').forEach(card => {
                card.addEventListener('click', () => {
                    const notifId = card.getAttribute('data-id');
                    const notif = allNotifications.find(n => n.id === notifId);
                    if (notif && notif.targetLink) {
                        window.location.href = notif.targetLink;
                    }
                });
            });
        }
    }

    // ------------------------------------------------------------------------
    // 6. CÁC HÀNH ĐỘNG THÔNG BÁO (ĐÁNH DẤU ĐÃ ĐỌC, LÀM MỚI, TOGGLE EMPTY)
    // ------------------------------------------------------------------------
    function markSingleAsRead(id) {
        const currentRole = rolesData[currentRoleKey];
        const notif = currentRole.notifications.find(n => n.id === id);
        if (notif && notif.unread) {
            notif.unread = false;
            showToast(`Đã đánh dấu thông báo "${notif.title}" là đã đọc.`);
            renderNotifications();
        }
    }

    function markAllAsRead() {
        const currentRole = rolesData[currentRoleKey];
        let changed = false;
        currentRole.notifications.forEach(n => {
            if (n.unread) {
                n.unread = false;
                changed = true;
            }
        });

        if (changed) {
            showToast('Đã đánh dấu tất cả thông báo là đã đọc.');
        } else {
            showToast('Tất cả thông báo đều đã được đọc.');
        }
        renderNotifications();
    }

    const btnMarkAllRead = document.getElementById('btnMarkAllRead');
    if (btnMarkAllRead) {
        btnMarkAllRead.addEventListener('click', markAllAsRead);
    }

    // Switch: Trạng thái Rỗng
    const emptyStateToggle = document.getElementById('emptyStateToggle');
    if (emptyStateToggle) {
        emptyStateToggle.addEventListener('change', (e) => {
            isForceEmptyState = e.target.checked;
            renderNotifications();
            if (isForceEmptyState) {
                showToast('Đang bật chế độ xem trước Trạng thái Rỗng.');
            } else {
                showToast('Đã khôi phục danh sách thông báo.');
            }
        });
    }

    // Nút làm mới thông báo ở cột phải và cột trái
    function refreshNotifications() {
        // Tắt công tắc rỗng nếu đang bật
        if (emptyStateToggle && emptyStateToggle.checked) {
            emptyStateToggle.checked = false;
            isForceEmptyState = false;
        }

        // Đặt lại một số thông báo chưa đọc mẫu
        const currentRole = rolesData[currentRoleKey];
        if (currentRole && currentRole.notifications.length > 0) {
            currentRole.notifications.slice(0, 3).forEach(n => n.unread = true);
        }

        // Cập nhật text thời gian
        const lastUpdatedText = document.getElementById('lastUpdatedText');
        if (lastUpdatedText) {
            lastUpdatedText.textContent = 'Vừa cập nhật xong';
        }

        renderNotifications();
        showToast('Đã làm mới dữ liệu thông báo mới nhất!', 'fa-arrows-rotate');
    }

    const btnRefreshNotifications = document.getElementById('btnRefreshNotifications');
    const btnRefreshFromLeft = document.getElementById('btnRefreshFromLeft');

    if (btnRefreshNotifications) {
        btnRefreshNotifications.addEventListener('click', refreshNotifications);
    }
    if (btnRefreshFromLeft) {
        btnRefreshFromLeft.addEventListener('click', refreshNotifications);
    }

    // Nút xem các thông báo trước đó
    const btnViewPrevious = document.getElementById('btnViewPrevious');
    if (btnViewPrevious) {
        btnViewPrevious.addEventListener('click', () => {
            showToast('Đã tải toàn bộ lịch sử 30 ngày qua.');
        });
    }

    // ------------------------------------------------------------------------
    // 7. FILTER TABS HANDLER
    // ------------------------------------------------------------------------
    const filterTabsGroup = document.getElementById('filterTabsGroup');
    if (filterTabsGroup) {
        const tabs = filterTabsGroup.querySelectorAll('.filter-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentFilter = tab.getAttribute('data-filter') || 'all';
                renderNotifications();
            });
        });
    }

    // ------------------------------------------------------------------------
    // 8. TÌM KIẾM TOÀN CỤC & PHÍM TẮT (CTRL+K / CMD+K)
    // ------------------------------------------------------------------------
    const globalSearchInput = document.getElementById('globalSearchInput');
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderNotifications();
        });
    }

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (globalSearchInput) {
                globalSearchInput.focus();
                globalSearchInput.select();
            }
        }
    });

    // ------------------------------------------------------------------------
    // 9. ROLE SWITCHER DROPDOWN HANDLER
    // ------------------------------------------------------------------------
    const roleSwitcherDropdown = document.getElementById('roleSwitcherDropdown');
    const roleSwitcherBtn = document.getElementById('roleSwitcherBtn');

    if (roleSwitcherBtn && roleSwitcherDropdown) {
        roleSwitcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            roleSwitcherDropdown.classList.toggle('open');
        });

        document.querySelectorAll('.role-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const selectedRole = opt.getAttribute('data-role');
                if (selectedRole) {
                    switchRole(selectedRole);
                    roleSwitcherDropdown.classList.remove('open');
                    showToast(`Đã chuyển sang vai trò: ${rolesData[selectedRole].roleName}`);
                }
            });
        });
    }

    // ------------------------------------------------------------------------
    // 10. CUSTOM SELECT DROPDOWNS (CHỌN CÔNG TRƯỜNG ĐỒNG BỘ 100%)
    // ------------------------------------------------------------------------
    function setupCustomDropdown(containerId, titleId, optionsId) {
        const container = document.getElementById(containerId);
        const titleEl = document.getElementById(titleId);
        const optionsEl = document.getElementById(optionsId);
        if (!container || !titleEl || !optionsEl) return;

        const trigger = container.querySelector('.dropdown-trigger');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Đóng các dropdown khác trước khi mở
                document.querySelectorAll('.custom-dropdown').forEach(d => {
                    if (d !== container) d.classList.remove('open');
                });
                if (roleSwitcherDropdown) roleSwitcherDropdown.classList.remove('open');
                container.classList.toggle('open');
            });
        }

        optionsEl.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedVal = item.getAttribute('data-value');
                titleEl.textContent = selectedVal;
                optionsEl.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                container.classList.remove('open');

                // Đồng bộ tiêu đề công trường trên tất cả dropdowns
                syncAllProjectDropdowns(selectedVal);
                showToast(`Đang theo dõi: ${selectedVal}`);
            });
        });
    }

    function syncAllProjectDropdowns(val) {
        localStorage.setItem('sitesafe_current_project', val);
        ['sidebarProjectTitle', 'desktopProjectTitle', 'mobileProjectTitle', 'drawerProjectTitle'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        });

        document.querySelectorAll('.custom-dropdown .dropdown-item').forEach(item => {
            if (item.getAttribute('data-value') === val) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    setupCustomDropdown('sidebarProjectSelect', 'sidebarProjectTitle', 'sidebarProjectOptions');
    setupCustomDropdown('desktopProjectSelect', 'desktopProjectTitle', 'desktopProjectOptions');
    setupCustomDropdown('mobileProjectSelect', 'mobileProjectTitle', 'mobileProjectOptions');
    setupCustomDropdown('drawerProjectSelect', 'drawerProjectTitle', 'drawerProjectOptions');

    // Khởi tạo công trường từ localStorage
    const savedProject = localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B';
    syncAllProjectDropdowns(savedProject);

    // Đóng dropdown khi click bên ngoài
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
        if (roleSwitcherDropdown) roleSwitcherDropdown.classList.remove('open');
    });

    // ------------------------------------------------------------------------
    // 11. MOBILE DRAWER NAVIGATION (TRƯỢT TỪ BÊN TRÁI)
    // ------------------------------------------------------------------------
    const btnMobileNavToggle = document.getElementById('btnMobileNavToggle');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const btnCloseNavDrawer = document.getElementById('btnCloseNavDrawer');

    function openMobileDrawer() {
        if (mobileNavBackdrop) {
            mobileNavBackdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileDrawer() {
        if (mobileNavBackdrop) {
            mobileNavBackdrop.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    if (btnMobileNavToggle) {
        btnMobileNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openMobileDrawer();
        });
    }

    if (btnCloseNavDrawer) {
        btnCloseNavDrawer.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileDrawer();
        });
    }

    if (mobileNavBackdrop) {
        mobileNavBackdrop.addEventListener('click', (e) => {
            if (e.target === mobileNavBackdrop) {
                closeMobileDrawer();
            }
        });
    }

    // ------------------------------------------------------------------------
    // 12. DESKTOP HELP BUTTON
    // ------------------------------------------------------------------------
    const btnDesktopHelp = document.getElementById('btnDesktopHelp');
    if (btnDesktopHelp) {
        btnDesktopHelp.addEventListener('click', () => {
            showToast('SiteSafe Notification Hub: Quản lý cảnh báo & hành động trực tiếp.', 'fa-circle-question');
        });
    }

    // ------------------------------------------------------------------------
    // 13. KHỞI CHẠY LẦN ĐẦU
    // ------------------------------------------------------------------------
    switchRole(currentRoleKey);

});

