# CSE122-SITE-SAFE – Hệ thống Số hóa Kiểm tra An toàn Lao động Tại Hiện trường

> **Lĩnh vực:** Xây dựng / ConstructionTech  
> **Mô tả:** Mini-product Frontend quản lý an toàn công trường đa vai trò, tích hợp quy trình nghiệp vụ thực tế và các tính năng AI mô phỏng phía client.

---
## 1. Giới thiệu & Ngữ cảnh bài toán

Công trường xây dựng là môi trường lao động có độ rủi ro cao với các đội nhóm làm việc phân tán. Công tác an toàn lao động truyền thống thường bị rời rạc, phụ thuộc vào checklist giấy hoặc tin nhắn qua Zalo/Messenger khiến dữ liệu dễ bị trôi, mất vết xử lý và thiếu minh chứng theo thời gian.

**SITE-SAFE** được xây dựng nhằm giải quyết triệt để các vấn đề:
- **Checklist không đồng nhất:** Thiếu chuẩn hóa theo quy định an toàn giữa các khu vực thi công.
- **Mất vết xử lý nguy cơ (Hazard Tracking):** Phát hiện mối nguy hiểm (giàn giáo hở, thiếu dây an toàn) nhưng chỉ báo miệng/nhắn tin, không rõ ai chịu trách nhiệm khắc phục và thời hạn hoàn thành.
- **Thiếu minh chứng theo thời gian:** Ảnh chụp sự cố không gắn liền với lịch sử xử lý, dễ dẫn đến đổ lỗi.
- **Quản lý mù thông tin:** Cán bộ quản lý thiếu cái nhìn toàn cục về các "điểm nóng" (Hotspot) rủi ro trên sơ đồ mặt bằng.

---
## 2. Mục tiêu sản phẩm

- Xây dựng ứng dụng Frontend hoàn chỉnh với hành trình người dùng rõ ràng theo từng phân quyền (Role-based UI).
- Đảm bảo mỗi vai trò có hệ thống màn hình chức năng độc lập, thực hiện đầy đủ các thao tác CRUD và chuyển đổi trạng thái nghiệp vụ.
- Ứng dụng JavaScript/DOM để xử lý tìm kiếm, lọc dữ liệu, xác thực form, modal, hiển thị trạng thái và kết xuất động.
- Lưu trữ dữ liệu giả lập thông minh thông qua `LocalStorage` và JSON.
- Mô phỏng thành công các tính năng AI hỗ trợ phân tích và gợi ý ngay trên phía Frontend.

---
## 3. Công nghệ sử dụng

- **Frontend Core:** HTML5, CSS3 (CSS Variables, CSS Grid, Flexbox, Media Queries), JavaScript (ES6+ / DOM Manipulation).
- **Lưu trữ dữ liệu:** LocalStorage API.
- **Công cụ thiết kế & Quản lý:** Figma, Git & GitHub (quản lý mã nguồn theo nhánh và pull request), Trello.

---
## 4. Phân quyền Người dùng & Hệ thống Màn hình (Screen Inventory)

### 1. Nhân sự hiện trường (`SV1`)
*Mục tiêu: Thực hiện kiểm tra an toàn và báo cáo nguy cơ sự cố.*
- **Safety Checklist (`worker-safety-checklist.html`):** Chọn khu vực, tích chọn checklist đánh giá điều kiện an toàn.
- **Hazard Create (`worker-hazard-create.html`):** Nhập mô tả, vị trí, chụp ảnh minh họa mối nguy – *Tích hợp AI-1 (Classifier tự động phân loại mức độ nguy hiểm)*.
- **My Hazards (`worker-my-hazards.html`):** Theo dõi tiến độ xử lý các rủi ro đã báo cáo.

### 2. Cán bộ an toàn (`SV2`)
*Mục tiêu: Giám sát an toàn toàn diện, duyệt hazard và lên lịch kiểm tra.*
- **Safety Dashboard (`safety-dashboard.html`):** Xem tổng quan các chỉ số sự cố và trạng thái an toàn.
- **Hazard Detail (`safety-hazard-detail.html`):** Phê duyệt hazard, phân công công việc khắc phục – *Tích hợp AI-1 (Gợi ý phân loại phương án xử lý)*.
- **Inspection Management (`safety-inspection-management.html`):** Lên lịch và quản lý các đợt kiểm tra định kỳ.

### 3. Quản lý công trường (`SV3`)
*Mục tiêu: Theo dõi rủi ro mặt bằng, đôn đốc khắc phục và xuất báo cáo.*
- **Zone Risk Map (`manager-zone-risk-map.html`):** Phân tích điểm nóng nguy hiểm trên sơ đồ mặt bằng – *Tích hợp AI-3 (Risk Insight phân tích vùng rủi ro cao)*.
- **Corrective Actions (`manager-corrective-actions.html`):** Kiểm tra và đôn đốc tiến độ khắc phục của các đội thi công.
- **Safety Report (`manager-safety-report.html`):** Đánh giá tổng hợp và xuất báo cáo an toàn.

### 4. Quản trị viên (`SV2`)
*Mục tiêu: Chuẩn hóa mẫu kiểm tra, quản lý sơ đồ dự án và phân quyền.*
- **Checklist Template Mgmt (`admin-checklist-template-management.html`):** Tạo và cập nhật các mẫu checklist chuẩn – *Tích hợp AI-2 (Gợi ý tối ưu bộ tiêu chí)*.
- **Zone Management (`admin-zone-management.html`):** Thiết lập danh sách các Sites & Zones.
- **User Management (`admin-user-management.html`):** Quản lý tài khoản người dùng và phân quyền vai trò.

### 5. Dùng chung (Common Views)
- **Login (`login.html`):** Đăng nhập hệ thống và chọn nhanh vai trò Demo.
- **Profile (`profile.html`):** Quản lý thông tin cá nhân, vai trò và khu vực phụ trách.
- **Notifications (`notifications.html`):** Nhận thông báo tức thời về việc giao việc và nghiệm thu.
- **Error 404 (`404.html`):** Trang hiển thị khi truy cập sai đường dẫn.

---
## 5. Hướng dẫn chạy dự án

### Cách 1: Chạy trực tiếp trên trình duyệt
1. Clone hoặc tải mã nguồn dự án về máy.
2. Mở thư mục dự án và nhấp đúp chuột vào file `login.html` để mở bằng trình duyệt (Chrome, Edge, Cốc Cốc,...).

### Cách 2: Sử dụng Live Server trên Visual Studio Code (Khuyến nghị)
1. Mở thư mục dự án trong **VS Code**.
2. Cài đặt tiện ích mở rộng **Live Server**.
3. Nhấp chuột phải vào file `login.html` và chọn **Open with Live Server** để trải nghiệm.

---
## 6. Cấu trúc thư mục dự án

```text
SITE_SAFE/
├── README.md  
│
├── assets/
│   └── logo_SiteSafe.png
│
├── share/
| ├── login/
| │   ├── login.html
| │   ├── login.css
| │   └── login.js
| │
| ├── profile/
| │   ├── profile.html
| │   ├── profile.css
| │   └── profile.js
| │
| ├── notifications/ 
| │   ├── notifications.html
| │   ├── notifications.css
| │   └── notifications.js
│ |
| └── error-404/ 
|     ├── error_404.html
|     ├── error_404.css
|     └── error_404.js
│
├── worker/
│   ├── safety-checklist/
│   │   ├── worker-safety-checklist.html
│   │   ├── worker-safety-checklist.css
│   │   └── worker-safety-checklist.js
│   │
│   ├── hazard-create/
│   │   ├── worker-hazard-create.html
│   │   ├── worker-hazard-create.css
│   │   └── worker-hazard-create.js
│   │
│   └── my-hazards/ 
│       ├── worker-my-hazards.html
│       ├── worker-my-hazards.css
│       └── worker-my-hazards.js
│
├── safety/
│   ├── safety-dashboard/ 
│   │   ├── safety-dashboard.html
│   │   ├── safety-dashboard.css
│   │   └── safety-dashboard.js
│   │
│   ├── hazard-detail/ 
│   │   ├── safety-hazard-detail.html
│   │   ├── safety-hazard-detail.css
│   │   └── safety-hazard-detail.js
│   │
│   └── inspection-management/ 
│       ├── safety-inspection-management.html
│       ├── safety-inspection-management.css
│       └── safety-inspection-management.js
│
├── manager/ 
│   ├── zone-risk-map/
│   │   ├── manager-zone-risk-map.html
│   │   ├── manager-zone-risk-map.css
│   │   └── manager-zone-risk-map.js
│   │
│   ├── corrective-actions/ 
│   │   ├── manager-corrective-actions.html
│   │   ├── manager-corrective-actions.css
│   │   └── manager-corrective-actions.js
│   │
│   └── safety-report/ 
│       ├── manager-safety-report.html
│       ├── manager-safety-report.css
│       └── manager-safety-report.js
│
└── admin/  
    ├── checklist-template/  
    │   ├── admin-checklist-template.html
    │   ├── admin-checklist-template.css
    │   └── admin-checklist-template.js
    │
    ├── zone-management/  
    │   ├── admin-zone-management.html
    │   ├── admin-zone-management.css
    │   └── admin-zone-management.js
    │
    └── user-management/  
        ├── admin-user-management.html
        ├── admin-user-management.css
        └── admin-user-management.js
```

---
## 7. Link playlist minh chứng

- Đinh Trọng Tài: https://www.youtube.com/playlist?list=PLf-etCQbhUns
- Nguyễn Thị Tâm: https://m.youtube.com/playlist?list=PLRqPSxmqU9ew&si=j1xMK0MsjzAW8mXj
- Nguyễn Ngọc Phương Thanh: https://www.youtube.com/playlist?list=PLSo8VXwUsFwg
