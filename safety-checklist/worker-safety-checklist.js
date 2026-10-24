/* ============================================================================
 * SiteSafe - Safety Checklist
 * Role: Nhân sự hiện trường
 * Screen: worker-safety-checklist.html
 * ============================================================================*/

// 1. DỮ LIỆU CÔNG TRƯỜNG & CA KIỂM TRA (MOCK DATABASE DÙNG CHUNG)
const siteSafeDatabase = [
  {
    id: "proj-metro",
    code: "MT-B",
    title: "Dự án Metro Tower - Zone B",
    shortTitle: "Metro Tower - Khu B",
    location: "Khu B - Tầng 12 đến 18",
    schedules: [
      {
        id: "sch-metro-morning",
        title: "Hôm nay",
        shiftName: "Ca sáng",
        dateText: "03/10/2026",
        subtitle: "Danh mục hằng ngày · Ca sáng",
        items: [
          {
            id: 1,
            code: "MỤC 01",
            title: "Độ ổn định của giàn giáo",
            desc: "Chân đế, giằng chéo và liên kết chắc chắn.",
            status: "pass",
            file: "gian-giao.jpg",
            previewUrl: null,
            note: "Giằng và chân đế chắc chắn, không rung lắc.",
            failAlert:
              "Cảnh báo: Tạm dừng thi công trên giàn giáo nếu lỏng khóa cùm.",
          },
          {
            id: 2,
            code: "MỤC 02",
            title: "Đồ bảo hộ cá nhân PPE",
            desc: "Mũ, giày, áo phản quang và dây an toàn.",
            status: "pass",
            file: "bao-ho-ppe.jpg",
            previewUrl: null,
            note: "Tổ thi công đã trang bị đầy đủ bảo hộ.",
            failAlert:
              "Cảnh báo: Đình chỉ công nhân không trang bị đủ bảo hộ lao động.",
          },
          {
            id: 3,
            code: "MỤC 03",
            title: "Nối đất thiết bị điện",
            desc: "Dây tiếp địa và tủ điện không hư hỏng.",
            status: "fail",
            file: "tiep-dia-b02.jpg",
            previewUrl: null,
            note: "Máy cắt B-02 thiếu dây tiếp địa. Đã ngắt điện và báo tổ điện.",
            failAlert: "Cô lập thiết bị; chỉ sử dụng lại sau khắc phục.",
          },
          {
            id: 4,
            code: "MỤC 04",
            title: "Lan can và che chắn mép sàn",
            desc: "Lan can đủ chiều cao, lỗ mở được che kín.",
            status: null,
            file: null,
            previewUrl: null,
            note: "",
            failAlert: "Cảnh báo: Che chắn ngay lỗ mở sàn tầng cao.",
          },
          {
            id: 5,
            code: "MỤC 05",
            title: "Lối đi và lối thoát hiểm",
            desc: "Không có vật cản; biển chỉ dẫn rõ ràng.",
            status: null,
            file: null,
            previewUrl: null,
            note: "",
            failAlert: "Cảnh báo: Dọn dẹp chướng ngại vật cản lối thoát nạn.",
          },
          {
            id: 6,
            code: "MỤC 06",
            title: "Thiết bị phòng cháy chữa cháy",
            desc: "Bình chữa cháy còn hạn và dễ tiếp cận.",
            status: null,
            file: null,
            previewUrl: null,
            note: "",
            failAlert: "Cảnh báo: Bổ sung bình chữa cháy đúng vị trí quy định.",
          },
          {
            id: 7,
            code: "MỤC 07",
            title: "An toàn thiết bị nâng hạ",
            desc: "Cáp, móc và chốt an toàn còn nguyên vẹn.",
            status: null,
            file: null,
            previewUrl: null,
            note: "",
            failAlert:
              "Cảnh báo: Cấm nâng tải khi chốt khóa cáp bị mòn hoặc hở.",
          },
          {
            id: 8,
            code: "MỤC 08",
            title: "Vệ sinh và sắp xếp vật liệu",
            desc: "Vật liệu xếp gọn; phế thải được thu gom.",
            status: null,
            file: null,
            previewUrl: null,
            note: "",
            failAlert: "Cảnh báo: Thu gom đinh và sắt vụn trên sàn thao tác.",
          },
        ],
      },
      {
        id: "sch-metro-afternoon",
        title: "Hôm nay",
        shiftName: "Ca chiều",
        dateText: "03/10/2026",
        subtitle: "Danh mục kiểm tra an toàn · Ca chiều",
        items: [
          {
            id: 101,
            code: "MỤC 01",
            title: "Hệ thống đèn chiếu sáng ca đêm",
            desc: "Đảm bảo đủ độ sáng tại các hành lang và hố thang.",
            status: "pass",
            file: "den-chieu-sang.jpg",
            previewUrl: null,
            note: "Đã bổ sung 4 bóng LED công suất lớn tại sảnh thang.",
            failAlert: "Không được thi công ban đêm khi thiếu ánh sáng.",
          },
          {
            id: 102,
            code: "MỤC 02",
            title: "Kiểm tra khóa ngắt nguồn điện máy thi công",
            desc: "Tất cả máy cắt, máy hàn phải ngắt cầu dao sau ca.",
            status: null,
            file: null,
            previewUrl: null,
            note: "",
            failAlert:
              "Cảnh báo: Khóa tủ điện nguồn tránh rò rỉ điện chập cháy.",
          },
          {
            id: 103,
            code: "MỤC 03",
            title: "Bảo quản vật tư trên sàn cao",
            desc: "Vật liệu nhẹ (tôn, xốp) phải được chằng buộc chống gió cuốn.",
            status: null,
            file: null,
            previewUrl: null,
            note: "",
            failAlert:
              "Cảnh báo: Buộc chặt các tấm coppha mép ngoài giàn giáo.",
          },
        ],
      },
      {
        id: "sch-metro-yesterday",
        title: "Hôm qua",
        shiftName: "Ca tăng cường",
        dateText: "02/10/2026",
        subtitle: "Biên bản an toàn đợt đổ bê tông dầm sàn",
        items: [
          {
            id: 201,
            code: "MỤC 01",
            title: "Hệ giáo chống ván khuôn dầm sàn",
            desc: "Kê chân chống, kích U và giằng ngang đúng bản vẽ biện pháp.",
            status: "pass",
            file: "he-giao-chong.jpg",
            previewUrl: null,
            note: "Cán bộ kỹ thuật và tư vấn đã nghiệm thu đạt yêu cầu.",
            failAlert: "Dừng đổ bê tông nếu phát hiện chuyển vị kích U.",
          },
          {
            id: 202,
            code: "MỤC 02",
            title: "An toàn cần bơm bê tông tươi",
            desc: "Chân chống xe bơm đặt trên nền đất cứng, kê gỗ đệm.",
            status: "pass",
            file: "xe-bom.jpg",
            previewUrl: null,
            note: "Đã chèn tà vẹt gỗ 4 góc chân chống vững chắc.",
            failAlert: "Cấm người không phận sự đứng dưới bán kính vòi bơm.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-landmark",
    code: "LM-DD",
    title: "Tòa nhà Landmark Tower - Đống Đa",
    shortTitle: "Landmark Tower - Khối đế",
    location: "Khối tháp chính - Tầng 28",
    schedules: [
      {
        id: "sch-lm-01",
        title: "Hôm nay",
        shiftName: "Ca sáng",
        dateText: "03/10/2026",
        subtitle: "Kiểm tra thiết bị nâng & Công tác trên cao",
        items: [
          {
            id: 301,
            code: "MỤC 01",
            title: "An toàn vận hành Cần trục tháp C1",
            desc: "Cáp cẩu, hệ thống phanh hãm và còi cảnh báo hoạt động tốt.",
            status: "pass",
            file: "can-truc-c1.jpg",
            previewUrl: null,
            note: "Thợ lái cẩu có đầy đủ chứng chỉ kiểm định hợp lệ.",
            failAlert:
              "Dừng cẩu khi sức gió vượt quá cấp 5 hoặc sương mù dày đặc.",
          },
          {
            id: 302,
            code: "MỤC 02",
            title: "Sàn thao tác gondola tầng 28",
            desc: "Dây cứu sinh độc lập và khóa hãm trượt chống rơi.",
            status: "fail",
            file: "gondola-t28.jpg",
            previewUrl: null,
            note: "Dây thừng cứu sinh có vết sờn mép ngoài, cần thay dây mới.",
            failAlert:
              "Ngừng vận hành gondola ngay lập tức; thay dây cứu sinh mới.",
          },
          {
            id: 303,
            code: "MỤC 03",
            title: "Đai an toàn toàn thân 2 móc giảm chấn",
            desc: "Kiểm tra tem kiểm định và đường may chịu lực.",
            status: "pass",
            file: "dai-an-toan.jpg",
            previewUrl: null,
            note: "Tất cả 10 công nhân đu dây đều dùng đai đạt chuẩn EN361.",
            failAlert:
              "Không được dùng đai an toàn đơn một móc khi làm việc cao trên 2m.",
          },
          {
            id: 304,
            code: "MỤC 04",
            title: "Lưới hứng vật rơi quanh chu vi khối tháp",
            desc: "Lưới bao che nguyên vẹn, không rách thủng.",
            status: null,
            file: null,
            previewUrl: null,
            note: "",
            failAlert:
              "Vá kín các lỗ hổng lưới an toàn tránh đá sỏi rơi xuống đường.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-ecogreen",
    code: "ECO-C",
    title: "Khu đô thị Eco Green - Block C",
    shortTitle: "Eco Green - Block C",
    location: "Khu vực đào móng tầng hầm B2",
    schedules: [
      {
        id: "sch-eco-01",
        title: "Hôm nay",
        shiftName: "Ca sáng",
        dateText: "03/10/2026",
        subtitle: "Kiểm tra an toàn thi công phần ngầm & Hố móng",
        items: [
          {
            id: 401,
            code: "MỤC 01",
            title: "Hệ tường vây barrette & Giằng shoring",
            desc: "Quan trắc chuyển vị góc hố đào và áp lực đất.",
            status: "pass",
            file: "quan-trac-ho-mong.jpg",
            previewUrl: null,
            note: "Số liệu đo đạc nằm trong giới hạn an toàn cho phép.",
            failAlert:
              "Báo động khẩn cấp nếu shoring xuất hiện vết nứt biến dạng.",
          },
          {
            id: 402,
            code: "MỤC 02",
            title: "Hàng rào lan can bảo vệ mép hố đào sâu",
            desc: "Rào chắn cao 1.2m có thanh chắn chân chống rơi ngã.",
            status: "pass",
            file: "lan-can-ho-mong.jpg",
            previewUrl: null,
            note: "Đã sơn phản quang vàng đen quanh mép dốc hầm.",
            failAlert: "Cấm đi lại sát mép hố đào chưa lắp lan can bảo vệ.",
          },
          {
            id: 403,
            code: "MỤC 03",
            title: "Hệ thống bơm hạ mực nước ngầm",
            desc: "Máy bơm tự động và rãnh thu gom nước bùn đáy móng.",
            status: null,
            file: null,
            previewUrl: null,
            note: "",
            failAlert: "Xử lý ngay nguy cơ ngập úng làm sạt lở thành hố đào.",
          },
        ],
      },
    ],
  },
];

// 2. STATE MANAGEMENT & BIẾN TOÀN CỤC
let currentProjectId = siteSafeDatabase[0].id;
let currentScheduleId = siteSafeDatabase[0].schedules[0].id;
let currentItems = [];
let activeUploadItemId = null;
let viewMode = "focus";

// Khóa lưu trữ LocalStorage
const STORAGE_KEY_PREFIX = "sitesafe_inspection_";

// 3. KHỞI TẠO ỨNG DỤNG KHI TẢI TRANG
document.addEventListener("DOMContentLoaded", () => {
  initCustomDropdownGlobal();
  buildProjectDropdownMenu();
  loadInspectionData(currentProjectId, currentScheduleId);
  bindUserEventListeners();
});

// 4. QUẢN LÝ CUSTOM DROPDOWN 
function initCustomDropdownGlobal() {
  // Đóng dropdown khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      document
        .querySelectorAll(".custom-dropdown")
        .forEach((dd) => dd.classList.remove("open"));
    }
  });

  // Bắt sự kiện click mở trigger của mọi custom-dropdown
  document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector(".dropdown-trigger");
    if (trigger) {
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains("open");
        document
          .querySelectorAll(".custom-dropdown")
          .forEach((dd) => dd.classList.remove("open"));
        if (!isOpen) {
          dropdown.classList.add("open");
        }
      });
    }
  });
}

/* Xây dựng danh sách tùy chọn cho Dropdown Công Trường */
function buildProjectDropdownMenu() {
  const sidebarMenu = document.getElementById("sidebarProjectOptions");
  const desktopMenu = document.getElementById("desktopProjectOptions");
  const mobileMenu = document.getElementById("mobileProjectOptions");
  const drawerMenu = document.getElementById("drawerProjectOptions");

  if (sidebarMenu) sidebarMenu.innerHTML = "";
  if (desktopMenu) desktopMenu.innerHTML = "";
  if (mobileMenu) mobileMenu.innerHTML = "";
  if (drawerMenu) drawerMenu.innerHTML = "";

  siteSafeDatabase.forEach((project) => {
    const isSelected = project.id === currentProjectId;

    // Item trên Sidebar Desktop & Mobile Drawer (gọn)
    const createSidebarItem = () => {
      const item = document.createElement("div");
      item.className = `dropdown-item ${isSelected ? "selected" : ""}`;
      item.innerHTML = `
            <span>${project.shortTitle}</span>
            ${isSelected ? '<i class="fa-solid fa-check check-mark"></i>' : ""}
        `;
      item.addEventListener("click", () => {
        selectProject(project.id);
      });
      return item;
    };

    if (sidebarMenu) sidebarMenu.appendChild(createSidebarItem());
    if (drawerMenu) drawerMenu.appendChild(createSidebarItem());

    // Item trên Desktop Topbar & Mobile Header (chi tiết)
    const createFullItem = () => {
      const item = document.createElement("div");
      item.className = `dropdown-item ${isSelected ? "selected" : ""}`;
      item.innerHTML = `
            <div>
                <strong>${project.title}</strong>
                <div style="font-size: 11px; color: var(--text-muted);">${project.location}</div>
            </div>
            ${isSelected ? '<i class="fa-solid fa-check check-mark"></i>' : ""}
        `;
      item.addEventListener("click", () => {
        selectProject(project.id);
      });
      return item;
    };

    if (desktopMenu) desktopMenu.appendChild(createFullItem());
    if (mobileMenu) mobileMenu.appendChild(createFullItem());
  });

  // Cập nhật tiêu đề hiển thị
  const currentProj = siteSafeDatabase.find((p) => p.id === currentProjectId);
  if (currentProj) {
    const sidebarTitle = document.getElementById("sidebarProjectTitle");
    const drawerTitle = document.getElementById("drawerProjectTitle");
    const desktopTitle = document.getElementById("desktopProjectTitle");
    const mobileTitle = document.getElementById("mobileProjectTitle");
    const modalProj = document.getElementById("modalUserProfileProject");

    if (sidebarTitle) sidebarTitle.innerText = currentProj.shortTitle;
    if (drawerTitle) drawerTitle.innerText = currentProj.shortTitle;
    if (desktopTitle) desktopTitle.innerText = currentProj.title;
    if (mobileTitle) mobileTitle.innerText = currentProj.title;
    if (modalProj) modalProj.innerText = currentProj.title;
  }

  buildScheduleDropdownMenu();
}

/** Xây dựng danh sách tùy chọn cho Dropdown Lịch/Ca kiểm tra */
function buildScheduleDropdownMenu() {
  const currentProj = siteSafeDatabase.find((p) => p.id === currentProjectId);
  if (!currentProj) return;

  const desktopMenu = document.getElementById("desktopScheduleOptions");
  const mobileMenu = document.getElementById("mobileScheduleOptions");

  if (desktopMenu) desktopMenu.innerHTML = "";
  if (mobileMenu) mobileMenu.innerHTML = "";

  currentProj.schedules.forEach((sch) => {
    const isSelected = sch.id === currentScheduleId;

    const makeItem = () => {
      const item = document.createElement("div");
      item.className = `dropdown-item ${isSelected ? "selected" : ""}`;
      item.innerHTML = `
                <div>
                    <span><strong>${sch.title}</strong> · ${sch.shiftName}</span>
                    <div style="font-size: 11px; color: var(--text-muted);">${sch.dateText}</div>
                </div>
                ${isSelected ? '<i class="fa-solid fa-check check-mark"></i>' : ""}
            `;
      item.addEventListener("click", () => {
        selectSchedule(sch.id);
      });
      return item;
    };

    if (desktopMenu) desktopMenu.appendChild(makeItem());
    if (mobileMenu) mobileMenu.appendChild(makeItem());
  });

  const activeSchedule =
    currentProj.schedules.find((s) => s.id === currentScheduleId) ||
    currentProj.schedules[0];
  const displayText = `${activeSchedule.title}`;

  document.getElementById("desktopScheduleTitle").innerText = displayText;
  document.getElementById("mobileScheduleTitle").innerText = displayText;
  document.getElementById("desktopDateText").innerText =
    activeSchedule.dateText;
  document.getElementById("mobileDateText").innerText = activeSchedule.dateText;
  document.getElementById("scheduleSubtitle").innerText =
    activeSchedule.subtitle;
}

function selectProject(projId) {
  currentProjectId = projId;
  const proj = siteSafeDatabase.find((p) => p.id === projId);
  currentScheduleId = proj.schedules[0].id;
  buildProjectDropdownMenu();
  loadInspectionData(currentProjectId, currentScheduleId);
  document
    .querySelectorAll(".custom-dropdown")
    .forEach((dd) => dd.classList.remove("open"));
  showToast(`Đã chuyển sang công trường: ${proj.title}`);
}

function selectSchedule(schId) {
  currentScheduleId = schId;
  buildScheduleDropdownMenu();
  loadInspectionData(currentProjectId, currentScheduleId);
  document
    .querySelectorAll(".custom-dropdown")
    .forEach((dd) => dd.classList.remove("open"));
  const proj = siteSafeDatabase.find((p) => p.id === currentProjectId);
  const sch = proj.schedules.find((s) => s.id === schId);
  showToast(`Đã chuyển sang: ${sch.shiftName} (${sch.dateText})`);
}

// 5. TẢI DỮ LIỆU & RENDER DANH MỤC CHECKLIST
function loadInspectionData(projId, schId) {
  const proj = siteSafeDatabase.find((p) => p.id === projId);
  const sch = proj.schedules.find((s) => s.id === schId);

  // Kiểm tra xem đã có dữ liệu lưu trong LocalStorage chưa
  const storageKey = `${STORAGE_KEY_PREFIX}${projId}_${schId}`;
  const savedData = localStorage.getItem(storageKey);

  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      currentItems = parsed.items || JSON.parse(JSON.stringify(sch.items));
      if (parsed.isSubmitted) {
        setSubmissionState(true);
      } else {
        setSubmissionState(false);
      }
    } catch (e) {
      currentItems = JSON.parse(JSON.stringify(sch.items));
      setSubmissionState(false);
    }
  } else {
    currentItems = JSON.parse(JSON.stringify(sch.items));
    setSubmissionState(false);
  }

  renderChecklistCards();
  renderRightSummaryPanel();
  updateProgressAndStats();
}

/** Render toàn bộ danh sách thẻ kiểm tra*/
function renderChecklistCards() {
  const container = document.getElementById("checklistContainer");
  if (!container) return;
  container.innerHTML = "";

  currentItems.forEach((item, index) => {
    const card = document.createElement("div");
    const isPass = item.status === "pass";
    const isFail = item.status === "fail";

    card.className = `check-item-card ${isPass ? "is-pass" : ""} ${isFail ? "is-fail" : ""}`;
    card.id = `item-${item.id}`;

    // Tag trạng thái góc trên bên phải thẻ
    let statusTag = `<span class="item-status-tag pending"><i class="fa-regular fa-circle"></i> Chưa trả lời</span>`;
    if (isPass) {
      statusTag = `<span class="item-status-tag checked-pass"><i class="fa-regular fa-circle-check"></i> Đã kiểm tra</span>`;
    } else if (isFail) {
      statusTag = `<span class="item-status-tag checked-fail"><i class="fa-regular fa-circle-xmark"></i> Đã kiểm tra</span>`;
    }

    // Vùng hiển thị file ảnh đã tải
    let fileDisplayHTML = "";
    if (item.file) {
      fileDisplayHTML = `
                <div class="uploaded-file-row">
                    <span class="file-name-info" title="${item.file}">
                        <i class="fa-regular fa-file-image"></i> ${item.file}
                    </span>
                    <div class="file-actions">
                        ${item.previewUrl ? `<span class="btn-file-view" onclick="openImagePreview('${item.previewUrl}', '${item.title}')">Xem ảnh</span>` : ""}
                        <span class="file-status-uploaded">Đã tải lên</span>
                        <span class="btn-file-remove" onclick="removeUploadedImage(${item.id})" title="Xóa ảnh"><i class="fa-solid fa-trash-can"></i></span>
                    </div>
                </div>
            `;
    }

    // Cảnh báo khi Không đạt
    let failWarningHTML = "";
    if (isFail) {
      failWarningHTML = `
                <div class="fail-warning-card">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span>${item.failAlert || "Cô lập thiết bị; chỉ sử dụng lại sau khắc phục."}</span>
                </div>
            `;
    }

    card.innerHTML = `
            <div class="card-item-top">
                <span class="item-code">${item.code}</span>
                ${statusTag}
            </div>

            <h3 class="item-title">${item.title}</h3>
            <p class="item-desc">${item.desc}</p>

            <div class="btn-toggle-group">
                <button class="btn-toggle pass ${isPass ? "active" : ""}" onclick="setItemStatus(${item.id}, 'pass')">
                    <i class="fa-regular fa-circle-check"></i> Đạt
                </button>
                <button class="btn-toggle fail ${isFail ? "active" : ""}" onclick="setItemStatus(${item.id}, 'fail')">
                    <i class="fa-regular fa-circle-xmark"></i> Không đạt
                </button>
            </div>

            <div class="card-input-row">
                <!-- Cột 1: Ảnh minh chứng -->
                <div class="input-block">
                    <label class="input-block-label">
                        Ảnh minh chứng ${isFail ? '<span class="required-star">*</span>' : ""}
                    </label>
                    <div class="upload-box" onclick="triggerPhotoUpload(${item.id})">
                        <i class="fa-solid fa-camera"></i>
                        <span>${item.file ? "Thay đổi ảnh minh chứng" : "Thêm ảnh minh chứng"}</span>
                    </div>
                    ${fileDisplayHTML}
                </div>

                <!-- Cột 2: Ghi chú -->
                <div class="input-block">
                    <label class="input-block-label">
                        Ghi chú ${isFail ? '<span class="required-star">*</span>' : "(không bắt buộc)"}
                    </label>
                    <textarea class="note-textarea" 
                              placeholder="${isFail ? "Bắt buộc nhập hiện trạng hư hỏng..." : "Nhập hiện trạng hoặc lưu ý..."}"
                              oninput="updateItemNote(${item.id}, this.value)">${item.note || ""}</textarea>
                </div>
            </div>

            ${failWarningHTML}
        `;

    container.appendChild(card);
  });

  // Cập nhật số đếm trang/danh mục
  const pageCountText = document.getElementById("pageCountText");
  if (pageCountText) {
    pageCountText.innerText = `Đang hiển thị mục 01–${String(currentItems.length).padStart(2, "0")} / ${String(currentItems.length).padStart(2, "0")}`;
  }

  // Cập nhật link hành động tiếp theo
  updateNextActionLink();
}

/** Cập nhật trạng thái Đạt / Không đạt của 1 mục kiểm tra*/
window.setItemStatus = function (itemId, newStatus) {
  const item = currentItems.find((i) => i.id === itemId);
  if (!item) return;

  // Toggle: nếu click lại vào trạng thái đang chọn thì hủy chọn
  if (item.status === newStatus) {
    item.status = null;
  } else {
    item.status = newStatus;
  }

  renderChecklistCards();
  renderRightSummaryPanel();
  updateProgressAndStats();
  autoSaveInspectionDraft();
};

/** Cập nhật nội dung ghi chú */
window.updateItemNote = function (itemId, text) {
  const item = currentItems.find((i) => i.id === itemId);
  if (item) {
    item.note = text;
    autoSaveInspectionDraft();
    renderRightSummaryPanel(); // Cập nhật cảnh báo nếu có
  }
};

/** Kích hoạt hộp thoại tải ảnh */
window.triggerPhotoUpload = function (itemId) {
  activeUploadItemId = itemId;
  const fileInput = document.getElementById("imageInput");
  if (fileInput) fileInput.click();
};

/** Xóa ảnh minh chứng */
window.removeUploadedImage = function (itemId) {
  const item = currentItems.find((i) => i.id === itemId);
  if (item) {
    item.file = null;
    item.previewUrl = null;
    renderChecklistCards();
    autoSaveInspectionDraft();
    showToast("Đã xóa ảnh minh chứng.");
  }
};

/** Xem trước ảnh lớn qua Modal */
window.openImagePreview = function (url, title) {
  const modal = document.getElementById("imagePreviewModal");
  const modalImg = document.getElementById("modalPreviewImg");
  const modalTitle = document.getElementById("modalImageTitle");
  if (modal && modalImg) {
    modalImg.src = url;
    if (modalTitle) modalTitle.innerText = `Ảnh minh chứng: ${title}`;
    modal.classList.add("active");
  }
};

// 6. XỬ LÝ TẢI FILE ẢNH THỰC TẾ (FileReader API)
function bindUserEventListeners() {
  // Xử lý khi người dùng chọn file ảnh
  const fileInput = document.getElementById("imageInput");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && activeUploadItemId !== null) {
        const item = currentItems.find((i) => i.id === activeUploadItemId);
        if (item) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            item.file = file.name;
            item.previewUrl = evt.target.result;
            renderChecklistCards();
            autoSaveInspectionDraft();
            showToast(`Đã tải ảnh lên: ${file.name}`);
          };
          reader.readAsDataURL(file);
        }
      }
      fileInput.value = "";
    });
  }

  // Nút đóng modal ảnh
  const btnCloseModal = document.getElementById("btnCloseModal");
  const modal = document.getElementById("imagePreviewModal");
  if (btnCloseModal && modal) {
    btnCloseModal.addEventListener("click", () =>
      modal.classList.remove("active"),
    );
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  // Nút nộp bản kiểm tra
  const btnSubmit = document.getElementById("btnSubmitChecklist");
  if (btnSubmit) {
    btnSubmit.addEventListener("click", handleSubmitInspection);
  }

  // Nút chuyển chế độ xem (Bảng tóm tắt bên vs Lưới 2 cột)
  const btnFocus = document.getElementById("btnViewFocus");
  const btnGrid = document.getElementById("btnViewGrid");
  const layout = document.getElementById("checklistMainLayout");
  const viewTitle = document.getElementById("viewModeTitle");

  if (btnFocus && btnGrid && layout) {
    btnFocus.addEventListener("click", () => {
      btnFocus.classList.add("active");
      btnGrid.classList.remove("active");
      layout.classList.remove("grid-mode");
      if (viewTitle)
        viewTitle.innerText = `Xem danh sách · ${currentItems.length} mục kiểm tra`;
    });

    btnGrid.addEventListener("click", () => {
      btnGrid.classList.add("active");
      btnFocus.classList.remove("active");
      layout.classList.add("grid-mode");
      if (viewTitle)
        viewTitle.innerText = `Toàn bộ danh mục · ${currentItems.length} mục kiểm tra`;
    });
  }

  // 1. DATE PICKER (PHẦN LỊCH MỞ RA VÀ CHỌN NGÀY THẬT)
  const calendarInput = document.getElementById("calendarDateInput");
  const mobileDateTrigger = document.getElementById("mobileDatePickerTrigger");
  const desktopDateTrigger = document.getElementById(
    "desktopDatePickerTrigger",
  );

  const openCalendarPicker = () => {
    if (!calendarInput) return;
    if (typeof calendarInput.showPicker === "function") {
      try {
        calendarInput.showPicker();
      } catch (e) {
        calendarInput.click();
      }
    } else {
      calendarInput.click();
    }
  };

  if (mobileDateTrigger) {
    mobileDateTrigger.addEventListener("click", openCalendarPicker);
  }
  if (desktopDateTrigger) {
    desktopDateTrigger.addEventListener("click", openCalendarPicker);
  }

  if (calendarInput) {
    calendarInput.addEventListener("change", (e) => {
      const val = e.target.value; // YYYY-MM-DD
      if (!val) return;
      const parts = val.split("-");
      if (parts.length === 3) {
        const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        const mobileDateText = document.getElementById("mobileDateText");
        const desktopDateText = document.getElementById("desktopDateText");
        const scheduleSubtitle = document.getElementById("scheduleSubtitle");

        if (mobileDateText) mobileDateText.innerText = formattedDate;
        if (desktopDateText) desktopDateText.innerText = formattedDate;
        if (scheduleSubtitle) {
          scheduleSubtitle.innerText = `Danh mục ngày ${formattedDate} · Ca sáng`;
        }
        showToast(`Đã chọn ngày kiểm tra: ${formattedDate}`);
      }
    });
  }

  // 2. MOBILE NAVIGATION DRAWER (ICON 3 GẠCH CHUYỂN TÁC VỤ ROLE)
  const btnMobileNavToggle = document.getElementById("btnMobileNavToggle");
  const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");
  const btnCloseNavDrawer = document.getElementById("btnCloseNavDrawer");

  const openMobileNavDrawer = () => {
    if (mobileNavBackdrop) {
      mobileNavBackdrop.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  };

  const closeMobileNavDrawer = () => {
    if (mobileNavBackdrop) {
      mobileNavBackdrop.classList.remove("show");
      document.body.style.overflow = "";
    }
  };

  if (btnMobileNavToggle) {
    btnMobileNavToggle.addEventListener("click", openMobileNavDrawer);
  }
  if (btnCloseNavDrawer) {
    btnCloseNavDrawer.addEventListener("click", closeMobileNavDrawer);
  }
  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener("click", (e) => {
      if (e.target === mobileNavBackdrop) closeMobileNavDrawer();
    });
  }

  // 3. USER PROFILE SUMMARY MODAL (DESKTOP & MOBILE ĐỒNG BỘ)
  const userProfileBrief = document.getElementById("userProfileBrief");
  const btnMobileUser = document.getElementById("btnMobileUser");
  const btnDrawerOpenProfile = document.getElementById("btnDrawerOpenProfile");
  const userProfileModalBackdrop = document.getElementById(
    "userProfileModalBackdrop",
  );
  const btnCloseUserProfileModal = document.getElementById(
    "btnCloseUserProfileModal",
  );
  const btnModalCloseSecondary = document.getElementById(
    "btnModalCloseSecondary",
  );
  const btnModalLogout = document.getElementById("btnModalLogout");
  const btnLogout = document.getElementById("btnLogout");

  const openUserProfileModal = () => {
    closeMobileNavDrawer();
    if (userProfileModalBackdrop) {
      userProfileModalBackdrop.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  };

  const closeUserProfileModal = () => {
    if (userProfileModalBackdrop) {
      userProfileModalBackdrop.classList.remove("show");
      document.body.style.overflow = "";
    }
  };

  if (userProfileBrief) {
    userProfileBrief.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../profile/profile.html";
    });
  }
  if (btnMobileUser) {
    btnMobileUser.addEventListener("click", openUserProfileModal);
  }
  if (btnDrawerOpenProfile) {
    btnDrawerOpenProfile.addEventListener("click", openUserProfileModal);
  }
  if (btnCloseUserProfileModal) {
    btnCloseUserProfileModal.addEventListener("click", closeUserProfileModal);
  }
  if (btnModalCloseSecondary) {
    btnModalCloseSecondary.addEventListener("click", closeUserProfileModal);
  }
  if (userProfileModalBackdrop) {
    userProfileModalBackdrop.addEventListener("click", (e) => {
      if (e.target === userProfileModalBackdrop) closeUserProfileModal();
    });
  }

  // Nút chuông thông báo trên Mobile Header
  const btnMobileNotification = document.getElementById(
    "btnMobileNotification",
  );
  if (btnMobileNotification) {
    btnMobileNotification.addEventListener("click", () => {
      showToast("Thông báo: Bạn có 3 thông báo mới từ Ban Giám Sát.");
    });
  }

  // Nút thông tin chi tiết trong Drawer Menu
  const btnDrawerAccountDetail = document.getElementById(
    "btnDrawerAccountDetail",
  );
  if (btnDrawerAccountDetail) {
    btnDrawerAccountDetail.addEventListener("click", () => {
      openUserProfileModal();
      showToast("Đang mở thông tin tài khoản.");
    });
  }

  const btnDrawerLogout = document.getElementById("btnDrawerLogout");
  if (btnDrawerLogout) {
    btnDrawerLogout.addEventListener("click", handleLogout);
  }
}

// 7. BẢNG TÓM TẮT BÊN PHẢI (SUMMARY PANEL)
function renderRightSummaryPanel() {
  const listEl = document.getElementById("summaryItemsList");
  const alertCard = document.getElementById("summaryAlertCard");
  const alertDesc = document.getElementById("summaryAlertDesc");
  const navTitle = document.getElementById("summaryNavTitle");

  if (navTitle) navTitle.innerText = `${currentItems.length} mục kiểm tra`;

  if (listEl) {
    listEl.innerHTML = "";
    currentItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "summary-item-link";

      let iconHtml = '<i class="fa-regular fa-circle status-icon pending"></i>';
      if (item.status === "pass") {
        iconHtml =
          '<i class="fa-regular fa-circle-check status-icon pass"></i>';
      } else if (item.status === "fail") {
        iconHtml =
          '<i class="fa-regular fa-circle-xmark status-icon fail"></i>';
      }

      li.innerHTML = `
                <span class="item-name">
                    <span class="item-num">${item.code.replace("MỤC ", "")}.</span>
                    <span>${item.title}</span>
                </span>
                ${iconHtml}
            `;

      // Click vào mục sẽ cuộn mượt đến thẻ đó
      li.addEventListener("click", () => {
        const targetCard = document.getElementById(`item-${item.id}`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
          targetCard.style.outline = "2px solid var(--primary-orange)";
          setTimeout(() => (targetCard.style.outline = "none"), 1600);
        }
      });

      listEl.appendChild(li);
    });
  }

  // Hiển thị cảnh báo nếu có mục Không đạt
  const failedItems = currentItems.filter((i) => i.status === "fail");
  if (alertCard && alertDesc) {
    if (failedItems.length > 0) {
      alertCard.style.display = "block";
      const firstFail = failedItems[0];
      alertDesc.innerText =
        firstFail.note ||
        firstFail.failAlert ||
        `${firstFail.title}: Chưa đạt chuẩn an toàn!`;
    } else {
      alertCard.style.display = "none";
    }
  }
}

// 8. TÍNH TOÁN TIẾN ĐỘ VÀ THỐNG KÊ (%)
function updateProgressAndStats() {
  const total = currentItems.length;
  const passCount = currentItems.filter((i) => i.status === "pass").length;
  const failCount = currentItems.filter((i) => i.status === "fail").length;
  const doneCount = passCount + failCount;
  const pendingCount = total - doneCount;

  const percentage =
    total === 0 ? 0 : ((doneCount / total) * 100).toFixed(1).replace(".", ",");

  // Cập nhật số liệu trên thanh Progress Card
  const cntPass = document.getElementById("cntPass");
  const cntFail = document.getElementById("cntFail");
  const cntPending = document.getElementById("cntPending");
  const progressTitle = document.getElementById("progressTitleText");
  const progressPercent = document.getElementById("progressPercentText");
  const progressBarFill = document.getElementById("progressBarFill");

  if (cntPass) cntPass.innerText = passCount;
  if (cntFail) cntFail.innerText = failCount;
  if (cntPending) cntPending.innerText = pendingCount;
  if (progressTitle)
    progressTitle.innerText = `Đã hoàn thành ${doneCount}/${total} mục`;
  if (progressPercent) progressPercent.innerText = `${percentage}%`;
  if (progressBarFill)
    progressBarFill.style.width = `${(doneCount / total) * 100}%`;

  // Cập nhật chân trang & Sticky Footer
  const stickyPending = document.getElementById("stickyPendingCount");
  const footerPending = document.getElementById("footerPendingNote");
  const footerNoticeTotal = document.getElementById("footerNoticeTotal");
  const summaryCompletionTitle = document.getElementById(
    "summaryCompletionTitle",
  );

  if (stickyPending) {
    stickyPending.innerText =
      pendingCount === 0
        ? "Đã hoàn thành tất cả các mục"
        : `Còn ${pendingCount} mục chưa trả lời`;
  }
  if (footerPending) {
    footerPending.innerText =
      pendingCount === 0
        ? "Tất cả các mục đã sẵn sàng để nộp."
        : `Hoàn thành ${pendingCount} mục còn lại trước khi nộp.`;
  }
  if (footerNoticeTotal) {
    footerNoticeTotal.innerText = `Đã hiển thị đủ ${total} mục kiểm tra`;
  }
  if (summaryCompletionTitle) {
    summaryCompletionTitle.innerText =
      pendingCount === 0
        ? "Đã sẵn sàng nộp"
        : `Hoàn thành ${pendingCount} mục còn lại`;
  }
}

function updateNextActionLink() {
  const nextLink = document.getElementById("nextActionLink");
  if (!nextLink) return;

  // Tìm mục chưa làm hoặc mục bị lỗi đầu tiên
  const nextItem =
    currentItems.find((i) => i.status === "fail") ||
    currentItems.find((i) => i.status === null);
  if (nextItem) {
    nextLink.style.display = "inline-flex";
    nextLink.innerHTML = `Tiếp tục: ${nextItem.title} <i class="fa-solid fa-arrow-right"></i>`;
    nextLink.href = `#item-${nextItem.id}`;
    nextLink.onclick = (e) => {
      e.preventDefault();
      const el = document.getElementById(`item-${nextItem.id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };
  } else {
    nextLink.style.display = "none";
  }
}

// 9. LƯU TRỮ LOCALSTORAGE & XÁC THỰC KHI NỘP BẢN KIỂM TRA
function autoSaveInspectionDraft() {
  const storageKey = `${STORAGE_KEY_PREFIX}${currentProjectId}_${currentScheduleId}`;
  const payload = {
    projectId: currentProjectId,
    scheduleId: currentScheduleId,
    savedAt: new Date().toISOString(),
    isSubmitted: false,
    items: currentItems,
  };
  localStorage.setItem(storageKey, JSON.stringify(payload));

  const stickySave = document.getElementById("stickySaveStatus");
  if (stickySave) {
    stickySave.innerHTML = '<i class="fa-solid fa-check"></i> Đã lưu nháp';
    stickySave.style.color = "var(--status-pass-color)";
  }
}

/** Xử lý khi nhấn nút "Nộp bản kiểm tra" */
function handleSubmitInspection() {
  const pendingItems = currentItems.filter((i) => i.status === null);

  // Kiểm tra còn mục chưa làm
  if (pendingItems.length > 0) {
    showToast(
      `Còn ${pendingItems.length} mục chưa trả lời. Vui lòng hoàn thành trước khi nộp!`,
      "warning",
    );
    const firstPending = document.getElementById(`item-${pendingItems[0].id}`);
    if (firstPending)
      firstPending.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Kiểm tra các mục "Không đạt" có ghi chú hoặc ảnh chưa
  const failedItemsWithoutNote = currentItems.filter(
    (i) => i.status === "fail" && (!i.note || i.note.trim() === ""),
  );
  if (failedItemsWithoutNote.length > 0) {
    showToast(
      `Mục "${failedItemsWithoutNote[0].title}" không đạt, yêu cầu bắt buộc nhập ghi chú lý do!`,
      "warning",
    );
    const el = document.getElementById(`item-${failedItemsWithoutNote[0].id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Lưu vào danh sách nộp thành công
  const storageKey = `${STORAGE_KEY_PREFIX}${currentProjectId}_${currentScheduleId}`;
  const submissionRecord = {
    projectId: currentProjectId,
    scheduleId: currentScheduleId,
    submittedAt: new Date().toLocaleString("vi-VN"),
    inspector: "Nguyễn Văn Minh",
    inspectorRole: "Nhân sự hiện trường",
    isSubmitted: true,
    items: currentItems,
  };
  localStorage.setItem(storageKey, JSON.stringify(submissionRecord));

  // Lưu thêm vào lịch sử chung để các vai trò khác (SV2 Safety Officer, SV3 Manager) có thể đọc
  saveToGlobalInspectionHistory(submissionRecord);

  setSubmissionState(true);
  showToast(
    "Nộp bản kiểm tra an toàn thành công! Dữ liệu đã được chuyển đến Cán bộ an toàn.",
  );
}

function setSubmissionState(isSubmitted) {
  const badgeDesktop = document.getElementById("inspectionStatusBadge");
  const badgeMobile = document.getElementById("mobileStatusBadge");
  const stickySave = document.getElementById("stickySaveStatus");
  const btnSubmit = document.getElementById("btnSubmitChecklist");

  if (isSubmitted) {
    if (badgeDesktop) {
      badgeDesktop.innerText = "Đã nộp";
      badgeDesktop.className = "status-pill-badge submitted";
    }
    if (badgeMobile) {
      badgeMobile.innerText = "Đã nộp";
      badgeMobile.className = "status-pill-badge mobile-only submitted";
    }
    if (stickySave) {
      stickySave.innerHTML =
        '<i class="fa-solid fa-circle-check"></i> Đã gửi duyệt';
    }
    if (btnSubmit) {
      btnSubmit.innerHTML =
        '<i class="fa-solid fa-check-double"></i> Cập nhật bản nộp';
    }
  } else {
    if (badgeDesktop) {
      badgeDesktop.innerText = "Bản nháp";
      badgeDesktop.className = "status-pill-badge";
    }
    if (badgeMobile) {
      badgeMobile.innerText = "Bản nháp";
      badgeMobile.className = "status-pill-badge mobile-only";
    }
    if (btnSubmit) {
      btnSubmit.innerHTML =
        '<i class="fa-solid fa-paper-plane"></i> Nộp bản kiểm tra';
    }
  }
}

/** Đẩy bản ghi vào bảng lịch sử tổng hợp `sitesafe_all_inspections` */
function saveToGlobalInspectionHistory(record) {
  const globalKey = "sitesafe_all_inspections";
  let history = [];
  try {
    const stored = localStorage.getItem(globalKey);
    if (stored) history = JSON.parse(stored);
  } catch (e) {
    history = [];
  }
  // Ghi đè hoặc thêm mới
  const existingIndex = history.findIndex(
    (h) =>
      h.projectId === record.projectId && h.scheduleId === record.scheduleId,
  );
  if (existingIndex >= 0) {
    history[existingIndex] = record;
  } else {
    history.push(record);
  }
  localStorage.setItem(globalKey, JSON.stringify(history));
}

// 10. THÔNG BÁO TOAST
function showToast(message, type = "success") {
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMessage");
  const toastIcon = document.getElementById("toastIcon");

  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  if (type === "warning") {
    toast.className = "toast-notification show warning";
    if (toastIcon)
      toastIcon.className = "fa-solid fa-triangle-exclamation toast-icon";
  } else {
    toast.className = "toast-notification show";
    if (toastIcon) toastIcon.className = "fa-solid fa-circle-check toast-icon";
  }

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
