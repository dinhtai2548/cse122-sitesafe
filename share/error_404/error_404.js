/**
 * SITESAFE - 404 ERROR PAGE SCRIPT (error_404.js)
 * Điều hướng quay về trang an toàn theo Role hiện tại và xử lý lịch sử duyệt web
 */

document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('sitesafe_current_role') || 'worker';
    const ROLE_HOME_MAP = {
        worker: '../../worker/safety-checklist/worker-safety-checklist.html',
        safety: '../../safety/safety_dashboard/safety_dashboard.html',
        manager: '../../manager/zone_risk_map/manager-zone-risk-map.html',
        admin: '../../admin/checklist_template/admin-checklist-template-management.html'
    };

    const targetHome = ROLE_HOME_MAP[role] || ROLE_HOME_MAP.worker;

    // Cập nhật nút về trang chủ và logo
    const btnGoHome = document.getElementById('btnGoHome');
    if (btnGoHome) {
        btnGoHome.href = targetHome;
    }

    const topLogoLink = document.getElementById('topLogoLink');
    if (topLogoLink) {
        topLogoLink.href = targetHome;
    }

    const btnGoBack = document.getElementById('btnGoBack');
    if (btnGoBack) {
        btnGoBack.addEventListener('click', (e) => {
            e.preventDefault();
            const hasHistory = window.history.length > 1;
            const hasReferrer = document.referrer && document.referrer !== window.location.href;

            if (hasHistory && hasReferrer) {
                window.history.back();
            } else {
                window.location.href = targetHome;
            }
        });
    }

    // Phím tắt điều hướng nhanh: Backspace
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            if (btnGoBack) btnGoBack.click();
        }
    });
});
