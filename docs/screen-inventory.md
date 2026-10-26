# Bảng Kiểm Kê Màn Hình - Dự Án SiteSafe

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD | AI | SV |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Nhân sự hiện trường** | Thực hiện kiểm tra an toàn | Chọn khu vực, tích chọn checklist | Safety Checklist | `worker-safety-checklist.html` | R/C | | Tài |
| **Nhân sự hiện trường** | Báo cáo nguy cơ sự cố | Nhập mô tả, vị trí, ảnh chụp | Hazard Create | `worker-hazard-create.html` | C | AI-1 (Classifier) | Tài |
| **Nhân sự hiện trường** | Theo dõi rủi ro đã báo | Kiểm tra tiến độ xử lý rủi ro | My Hazards | `worker-my-hazards.html` | R/U/D | | Tài |
| **Cán bộ an toàn** | Giám sát an toàn toàn diện | Xem tổng quan chỉ số sự cố | Safety Dashboard | `safety-dashboard.html` | R | | Thanh |
| **Cán bộ an toàn** | Duyệt & Phân công | Duyệt hazard, giao việc khắc phục | Hazard Detail | `safety-hazard-detail.html` | R/U | AI-1 (Gợi ý phân loại) | Thanh |
| **Cán bộ an toàn** | Quản lý đợt kiểm tra | Lên lịch kiểm tra định kỳ | Inspection Management | `safety-inspection-management.html` | C/R/U | | Thanh |
| **Quản lý công trường** | Theo dõi rủi ro mặt bằng | Phân tích điểm nóng nguy hiểm | Zone Risk Map | `manager-zone-risk-map.html` | R | AI-3 (Risk Insight) | Tâm |
| **Quản lý công trường** | Đôn đốc khắc phục | Kiểm tra tiến độ các đội thi công | Corrective Actions | `manager-corrective-actions.html` | C/R/U | | Tâm |
| **Quản lý công trường** | Đánh giá & Xuất báo cáo | Xuất báo cáo an toàn tổng hợp | Safety Report | `manager-safety-report.html` | C/R/U | | Tâm |
| **Quản trị viên** | Chuẩn hóa mẫu kiểm tra | Tạo & cập nhật các mẫu checklist | Checklist Template Mgmt | `admin-checklist-template-management.html` | C/R/U | AI-2 | Tâm |
| **Quản trị viên** | Quản lý sơ đồ dự án | Thiết lập danh sách Sites & Zones | Zone Management | `admin-zone-management.html` | C/R/U/D | | Tâm |
| **Quản trị viên** | Cấp quyền & Tài khoản | Quản lý người dùng & Vai trò | User Management | `admin-user-management.html` | C/R/U/D | | Tâm |
| **Dùng chung** | Truy cập hệ thống | Đăng nhập & Chọn nhanh vai trò Demo | Login | `login.html` | | | Thanh |
| **Dùng chung** | Quản lý tài khoản cá nhân | Xem thông tin vai trò, khu vực phụ trách | Profile | `profile.html` | | | Tài |
| **Dùng chung** | Cập nhật tức thời | Xem thông báo giao việc/nghiệm thu | Notifications | `notifications.html` | | | Tài |
| **Dùng chung** | Báo lỗi điều hướng | Hiển thị khi truy cập sai đường dẫn | Error | `404.html` | | | Tài |
