/**
 * SITESAFE - 404 ERROR PAGE SCRIPT (error_404.js)
 * Điều hướng quay về trang an toàn và xử lý lịch sử duyệt web
 */

document.addEventListener('DOMContentLoaded', () => {
    const btnGoBack = document.getElementById('btnGoBack');
    const DEFAULT_HOME_URL = '../safety-checklist/worker-safety-checklist.html';

    // Nút "Quay lại trang trước"
    if (btnGoBack) {
        btnGoBack.addEventListener('click', (e) => {
            e.preventDefault();

            // Kiểm tra xem có lịch sử trang trước trong phiên làm việc hay không
            const hasHistory = window.history.length > 1;
            const hasReferrer = document.referrer && document.referrer !== window.location.href;

            if (hasHistory && hasReferrer) {
                window.history.back();
            } else {
                // Nếu mở tab mới hoặc không có trang trước, chuyển về Trang chủ An toàn
                window.location.href = DEFAULT_HOME_URL;
            }
        });
    }

    // Phím tắt điều hướng nhanh: Backspace (khi không nhập văn bản)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            if (btnGoBack) btnGoBack.click();
        }
    });
});
