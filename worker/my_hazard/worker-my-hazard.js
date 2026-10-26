/**
 * ============================================================================
 * SiteSafe - My Hazards (Mối Nguy Đã Báo Cáo) Application Logic
 * Role: Nhân sự hiện trường (Worker / Safety Inspector)
 * Screen: my_hazard.html (worker-my-hazards.html)
 * Operations: CRUD (Read / Filter / Search / View Details / Delete)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. DỮ LIỆU CÔNG TRƯỜNG & DANH SÁCH MỐI NGUY MẪU 
// ----------------------------------------------------------------------------
const siteSafeProjects = [
  {
    id: "proj-metro",
    title: "Dự án Metro Tower - Zone B",
    shortTitle: "Metro Tower - Khu B",
  },
  {
    id: "proj-landmark",
    title: "Tòa nhà Landmark Tower - Đống Đa",
    shortTitle: "Landmark Tower - Khối đế",
  },
  {
    id: "proj-ecogreen",
    title: "Khu đô thị Eco Green - Block C",
    shortTitle: "Eco Green - Block C",
  },
];

// Danh sách báo cáo mối nguy mẫu theo từng công trường
const defaultSampleHazards = [
  // 1. Dự án Metro Tower - Zone B
  {
    id: "HAZ-001",
    projectId: "proj-metro",
    title: "Thiếu lan can tại mép sàn",
    location: "Zone A - Tầng 4",
    status: "pending", // 'pending' = Chờ duyệt, 'processing' = Đang xử lý, 'resolved' = Đã đóng/Đã khắc phục
    statusText: "Chờ duyệt",
    time: "03/10/2026 · 09:15",
    riskLevel: "Rủi ro cao",
    receiver: "Trần Minh Đức - Giám sát an toàn",
    description:
      "Mép sàn phía Đông tầng 4 chưa được lắp đặt lan can bảo vệ. Công nhân đang thi công gần mép hở bê tông, tiềm ẩn nguy cơ rơi ngã từ trên cao.",
    aiRecommendation:
      "Cô lập khu vực mép sàn; lắp lan can tiêu chuẩn cao 1.2m và kiểm tra liên kết trước khi tiếp tục thi công.",
    actionTaken:
      "Đã căng dây phản quang cảnh báo tạm thời và báo cáo giám sát an toàn.",
    imageUrl:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "HAZ-002",
    projectId: "proj-metro",
    title: "Giàn giáo bị hư hỏng",
    location: "Zone B - Tầng 12",
    status: "processing",
    statusText: "Đang xử lý",
    time: "03/10/2026 · 08:30",
    riskLevel: "Rủi ro cao",
    receiver: "Trần Minh Đức - Giám sát an toàn",
    description:
      "Phát hiện một thanh giằng chéo của hệ giáo ngoài bị móp méo và lỏng cùm khóa, gây rung lắc mạnh khi di chuyển trên khung sàn giáo.",
    aiRecommendation:
      "Tạm dừng mọi hoạt động trên khung giàn giáo này; thay thế thanh giằng mới và siết chặt toàn bộ cùm khóa.",
    actionTaken:
      "Đã treo biển cảnh báo nguy hiểm và ngưng cho thợ trèo lên giàn giáo.",
    imageUrl:
      "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "HAZ-003",
    projectId: "proj-metro",
    title: "Dây điện tràn gần sàn ướt",
    location: "Zone C - Tầng 2",
    status: "resolved",
    statusText: "Đã đóng",
    time: "02/10/2026 · 15:40",
    riskLevel: "Rủi ro cao",
    receiver: "Lê Hoàng Nam - Trưởng ban an toàn",
    description:
      "Đường dây điện nguồn máy cắt bị kéo lê qua vũng nước tù đọng sau cơn mưa, vỏ bọc cáp nguồn có dấu hiệu nứt xước hở lõi đồng.",
    aiRecommendation:
      "Cắt cầu dao điện nguồn ngay lập tức; treo dây điện lên cao tối thiểu 2m bằng giá đỡ cách điện tiêu chuẩn.",
    actionTaken:
      "Đã ngắt nguồn điện, thay đoạn dây bị rách và treo cao trên giá đỡ gỗ.",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "HAZ-004",
    projectId: "proj-metro",
    title: "Cầu thang không an toàn",
    location: "Zone A - Tầng 8",
    status: "pending",
    statusText: "Chờ duyệt",
    time: "02/10/2026 · 14:10",
    riskLevel: "Rủi ro trung bình",
    receiver: "Trần Minh Đức - Giám sát an toàn",
    description:
      "Cầu thang bộ tạm thời giữa tầng 7 và tầng 8 thiếu tay vịn bảo vệ hai bên và chưa có đèn chiếu sáng vào buổi chiều tối.",
    aiRecommendation:
      "Lắp tay vịn tạm thời bằng ống thép chắc chắn và bổ sung bóng đèn chiếu sáng 50W dọc vế thang bộ.",
    actionTaken: "Đã thông báo tổ coppha bổ sung thanh chắn tay vịn.",
    imageUrl:
      "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "HAZ-005",
    projectId: "proj-metro",
    title: "Bụi bẩn gần miệng gió",
    location: "Zone D - Tầng 6",
    status: "processing",
    statusText: "Đang xử lý",
    time: "02/10/2026 · 10:20",
    riskLevel: "Rủi ro thấp",
    receiver: "Vũ Quốc Anh - Cán bộ kỹ thuật",
    description:
      "Khu vực thi công mài sàn tạo nhiều bụi mịn cạnh cửa lấy gió tươi của hệ thống ống gió thông khí tòa nhà.",
    aiRecommendation:
      "Bọc kín miệng gió bằng màng nilon bảo vệ; sử dụng máy mài sàn có gắn hệ thống máy hút bụi công nghiệp.",
    actionTaken: "Đã phủ bạt che kín miệng gió tạm thời.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "HAZ-006",
    projectId: "proj-metro",
    title: "Dầu tràn trên sàn",
    location: "Zone B - Tầng 3",
    status: "resolved",
    statusText: "Đã đóng",
    time: "01/10/2026 · 16:00",
    riskLevel: "Rủi ro trung bình",
    receiver: "Trần Minh Đức - Giám sát an toàn",
    description:
      "Máy cắt sắt thủy lực bị xì gioăng làm rò rỉ dầu ra mặt sàn bê tông, tạo vệt trơn trượt trên lối đi chính của công nhân.",
    aiRecommendation:
      "Rải mùn cưa/cát khô để thấm hút sạch dầu; kiểm tra và thay gioăng phớt máy trước khi đưa vào vận hành lại.",
    actionTaken: "Đã rải cát làm sạch dầu và đặt khay hứng dưới gầm máy cắt.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80",
  },

  // 2. Dự án Landmark Tower
  {
    id: "HAZ-101",
    projectId: "proj-landmark",
    title: "Vật liệu chặn lối thoát hiểm",
    location: "Tầng hầm B1 - Khu dốc xe",
    status: "pending",
    statusText: "Chờ duyệt",
    time: "04/10/2026 · 10:15",
    riskLevel: "Rủi ro cao",
    receiver: "Vũ Quốc Anh - Cán bộ kỹ thuật",
    description:
      "Các kiện thép hộp và pallet gỗ xếp chồng lấn chiếm cửa thoát hiểm cầu thang bộ hầm B1, cản trở di tản khi có sự cố.",
    aiRecommendation:
      "Di dời toàn bộ vật liệu sang bãi tập kết tạm; giải phóng hoàn toàn hành lang thoát nạn tối thiểu 1.2m.",
    actionTaken:
      "Đã nhắc nhở tổ cơ điện di dời vật liệu và gắn biển cấm để đồ.",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "HAZ-102",
    projectId: "proj-landmark",
    title: "Thiếu rào chắn hố thang máy",
    location: "Khối đế - Trục kỹ thuật E",
    status: "processing",
    statusText: "Đang xử lý",
    time: "03/10/2026 · 16:30",
    riskLevel: "Rủi ro cao",
    receiver: "Lê Hoàng Nam - Trưởng ban an toàn",
    description:
      "Hố thang máy sâu đang chờ lắp đặt khung ray nhưng không có rào chắn cứng hoặc lưới an toàn chắn vật rơi.",
    aiRecommendation:
      "Lắp rào chắn thép 2 tầng sơn đỏ trắng phản quang cao 1.2m và giăng lưới hứng vật rơi dưới hố.",
    actionTaken:
      "Đã căng dây cảnh báo phản quang xung quanh miệng hố thang máy.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "HAZ-103",
    projectId: "proj-landmark",
    title: "Hàn cắt không có bạt chống cháy",
    location: "Tầng 5 - Sảnh thang máy",
    status: "resolved",
    statusText: "Đã đóng",
    time: "02/10/2026 · 11:20",
    riskLevel: "Rủi ro trung bình",
    receiver: "Trần Minh Đức - Giám sát an toàn",
    description:
      "Thợ hàn gia công khung cửa thép gần thùng xốp bảo ôn nhưng chưa che chắn bạt chịu nhiệt.",
    aiRecommendation:
      "Trang bị bạt chống cháy sợi thủy tinh và bố trí bình chữa cháy bột 4kg tại vị trí hàn.",
    actionTaken:
      "Đã bổ sung bạt che chống xỉ hàn và bố trí 2 bình chữa cháy cạnh vị trí thi công.",
    imageUrl:
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
  },

  // 3. Dự án Eco Green - Block C
  {
    id: "HAZ-201",
    projectId: "proj-ecogreen",
    title: "Cần trục tháp quay góc nguy hiểm",
    location: "Bãi cẩu trung tâm",
    status: "pending",
    statusText: "Chờ duyệt",
    time: "04/10/2026 · 08:45",
    riskLevel: "Rủi ro cao",
    receiver: "Trần Minh Đức - Giám sát an toàn",
    description:
      "Cần trục tháp nâng tải đi qua phần hành lang lưu thông của công nhân mà không có còi hú cảnh báo.",
    aiRecommendation:
      "Kiểm tra hệ thống còi báo và đèn xoay của cẩu tháp; phân luồng người đi bộ tránh xa bán kính quay cần.",
    actionTaken:
      "Đã yêu cầu tài xế cẩu dừng cẩu tải và điều chỉnh góc quay an toàn.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "HAZ-202",
    projectId: "proj-ecogreen",
    title: "Công nhân không đội mũ bảo hộ",
    location: "Cổng tiếp nhận vật tư số 2",
    status: "processing",
    statusText: "Đang xử lý",
    time: "03/10/2026 · 14:15",
    riskLevel: "Rủi ro trung bình",
    receiver: "Vũ Quốc Anh - Cán bộ kỹ thuật",
    description:
      "Nhóm phụ xe tải bốc xếp gạch lát không trang bị mũ bảo hộ và giày mũi sắt khi làm việc dưới khu vực nâng hạ.",
    aiRecommendation:
      "Đình chỉ công việc bốc xếp; trang bị đầy đủ PPE tiêu chuẩn trước khi cho phép vào công trường.",
    actionTaken:
      "Đã cấp phát mũ bảo hộ tạm thời và lập biên bản nhắc nhở nhà cung cấp.",
    imageUrl:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "HAZ-203",
    projectId: "proj-ecogreen",
    title: "Đường công vụ sình lầy trơn trượt",
    location: "Tuyến D1 nội bộ",
    status: "resolved",
    statusText: "Đã đóng",
    time: "01/10/2026 · 17:00",
    riskLevel: "Rủi ro thấp",
    receiver: "Lê Hoàng Nam - Trưởng ban an toàn",
    description:
      "Đoạn đường dốc dẫn vào hầm xe bị đọng bùn non sau mưa, dễ trượt ngã cho xe chở vật tư và xe máy.",
    aiRecommendation:
      "Rải đá dăm 1x2 gia cố mặt đường dốc; đặt biển cảnh báo đường trơn trượt.",
    actionTaken: "Đã đổ 2 xe đá dăm và lu lèn phẳng mặt đường tạm.",
    imageUrl:
      "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80",
  },
];

// ----------------------------------------------------------------------------
// 2. STATE MANAGEMENT
// ----------------------------------------------------------------------------
let currentProjectId = siteSafeProjects[0].id;
let allHazardsList = [];
let activeFilterStatus = "all"; // 'all', 'pending', 'processing', 'resolved'
let searchKeyword = "";
let currentViewingHazard = null;
let isDemoEmptyMode = false;

// ----------------------------------------------------------------------------
// 3. KHỞI TẠO ỨNG DỤNG KHI TẢI TRANG
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const savedProject = localStorage.getItem('sitesafe_current_project');
  if (savedProject) {
    const p = siteSafeProjects.find(x => x.shortTitle === savedProject || x.title === savedProject || savedProject.includes(x.shortTitle));
    if (p) currentProjectId = p.id;
  }
  initCustomDropdowns();
  buildProjectDropdown();
  loadHazardsData();
  bindEvents();
});

// ----------------------------------------------------------------------------
// 4. DROPDOWN CÔNG TRƯỜNG
// ----------------------------------------------------------------------------
function initCustomDropdowns() {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      document
        .querySelectorAll(".custom-dropdown")
        .forEach((dd) => dd.classList.remove("open"));
    }
  });

  document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector(".dropdown-trigger");
    if (trigger) {
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains("open");
        document
          .querySelectorAll(".custom-dropdown")
          .forEach((dd) => dd.classList.remove("open"));
        if (!isOpen) dropdown.classList.add("open");
      });
    }
  });
}

function buildProjectDropdown() {
  const sidebarMenu = document.getElementById("sidebarProjectOptions");
  const desktopMenu = document.getElementById("desktopProjectOptions");
  const mobileMenu = document.getElementById("mobileProjectOptions");
  const drawerMenu = document.getElementById("drawerProjectOptions");

  if (sidebarMenu) sidebarMenu.innerHTML = "";
  if (desktopMenu) desktopMenu.innerHTML = "";
  if (mobileMenu) mobileMenu.innerHTML = "";
  if (drawerMenu) drawerMenu.innerHTML = "";

  siteSafeProjects.forEach((project) => {
    const isSelected = project.id === currentProjectId;

    // Item trên Sidebar Desktop & Mobile Drawer (gọn)
    const createSidebarItem = () => {
      const item = document.createElement("div");
      item.className = `dropdown-item ${isSelected ? "selected" : ""}`;
      item.innerHTML = `
            <span>${project.shortTitle}</span>
            ${isSelected ? '<i class="fa-solid fa-check check-mark"></i>' : ""}
        `;
      item.addEventListener("click", () => selectProject(project.id));
      return item;
    };

    if (sidebarMenu) sidebarMenu.appendChild(createSidebarItem());
    if (drawerMenu) drawerMenu.appendChild(createSidebarItem());

    // Item trên Desktop Topbar & Mobile Header (chi tiết)
    const createFullItem = () => {
      const item = document.createElement("div");
      item.className = `dropdown-item ${isSelected ? "selected" : ""}`;
      item.innerHTML = `
            <div><strong>${project.title}</strong></div>
            ${isSelected ? '<i class="fa-solid fa-check check-mark"></i>' : ""}
        `;
      item.addEventListener("click", () => selectProject(project.id));
      return item;
    };

    if (desktopMenu) desktopMenu.appendChild(createFullItem());
    if (mobileMenu) mobileMenu.appendChild(createFullItem());
  });

  const activeProject = siteSafeProjects.find((p) => p.id === currentProjectId);
  if (activeProject) {
    const sidebarTitle = document.getElementById("sidebarProjectTitle");
    const drawerTitle = document.getElementById("drawerProjectTitle");
    const desktopTitle = document.getElementById("desktopProjectTitle");
    const mobileTitle = document.getElementById("mobileProjectTitle");
    const sheetProj = document.getElementById("sheetProjectTitle");
    const projContext = document.getElementById("projectContextText");
    const modalUserProfileProject = document.getElementById("modalUserProfileProject");

    if (sidebarTitle) sidebarTitle.innerText = activeProject.shortTitle;
    if (drawerTitle) drawerTitle.innerText = activeProject.shortTitle;
    if (desktopTitle) desktopTitle.innerText = activeProject.title;
    if (mobileTitle) mobileTitle.innerText = activeProject.title;
    if (sheetProj) sheetProj.innerText = activeProject.title;
    if (projContext)
      projContext.innerText = `${activeProject.title} · Báo cáo của tôi`;
    if (modalUserProfileProject)
      modalUserProfileProject.innerText = activeProject.title;
  }
}

function selectProject(projId) {
  currentProjectId = projId;
  const proj = siteSafeProjects.find((p) => p.id === projId);
  if (proj) {
    localStorage.setItem('sitesafe_current_project', proj.shortTitle);
  }
  buildProjectDropdown();
  document
    .querySelectorAll(".custom-dropdown")
    .forEach((dd) => dd.classList.remove("open"));
  loadHazardsData();
  showToast(
    `Đã chuyển sang công trường: ${proj.title}`,
    "info",
    "Đổi công trường",
  );
}

// ----------------------------------------------------------------------------
// 5. TẢI DỮ LIỆU & LOCALSTORAGE
// ----------------------------------------------------------------------------
function loadHazardsData() {
  // Đọc từ LocalStorage (bao gồm các báo cáo vừa tạo từ trang hazard_create)
  const stored = localStorage.getItem("sitesafe_my_hazards");
  let localItems = [];
  if (stored) {
    try {
      localItems = JSON.parse(stored);
    } catch (e) {
      localItems = [];
    }
  }

  // Kết hợp dữ liệu mẫu và dữ liệu người dùng tạo mới
  const combined = [...localItems, ...defaultSampleHazards];

  // Lọc theo công trường đang chọn (hoặc tất cả nếu phù hợp)
  allHazardsList = combined.filter(
    (item) => !item.projectId || item.projectId === currentProjectId,
  );

  // Chuẩn hóa trạng thái nếu người dùng tạo từ form
  allHazardsList.forEach((item) => {
    if (!item.status) item.status = "pending";
    if (item.status === "Chờ duyệt") item.status = "pending";
    if (item.status === "Đang xử lý") item.status = "processing";
    if (item.status === "Đã đóng" || item.status === "Đã khắc phục")
      item.status = "resolved";

    if (!item.statusText) {
      if (item.status === "pending") item.statusText = "Chờ duyệt";
      else if (item.status === "processing") item.statusText = "Đang xử lý";
      else item.statusText = "Đã đóng";
    }

    // Đảm bảo có ảnh hiển thị
    if (!item.imageUrl && item.photos && item.photos.length > 0) {
      item.imageUrl = item.photos[0].url;
    } else if (!item.imageUrl) {
      item.imageUrl =
        "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=600&auto=format&fit=crop&q=80";
    }
  });

  renderHazards();
  updateTabCounts();
}

// ----------------------------------------------------------------------------
// 6. RENDER CARDS & BỘ LỌC TÌM KIẾM
// ----------------------------------------------------------------------------
function renderHazards() {
  const gridContainer = document.getElementById("hazardCardsGrid");
  const emptyCard = document.getElementById("emptyStateCard");
  const reminderBanner = document.getElementById("safetyReminderBanner");
  const reportsCountText = document.getElementById("reportsCountText");
  const desktopSubTitle = document.getElementById("desktopSubTitle");
  const mobileSubTitle = document.getElementById("mobileSubTitle");

  if (!gridContainer || !emptyCard) return;

  // Xử lý chế độ Demo Empty Mode
  if (isDemoEmptyMode) {
    gridContainer.style.display = "none";
    emptyCard.style.display = "flex";
    reminderBanner.style.display = "flex";
    reportsCountText.innerText = "0 báo cáo";
    if (desktopSubTitle)
      desktopSubTitle.innerText = "Dự án Metro Tower · Báo cáo của tôi";
    if (mobileSubTitle)
      mobileSubTitle.innerText = "Dự án Metro Tower · Báo cáo của tôi";
    updateTabCounts(0, 0, 0, 0);
    return;
  }

  // Lọc theo từ khóa tìm kiếm & tab trạng thái
  const filteredList = allHazardsList.filter((item) => {
    const matchesStatus =
      activeFilterStatus === "all" || item.status === activeFilterStatus;
    const matchesKeyword =
      searchKeyword === "" ||
      item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (item.location &&
        item.location.toLowerCase().includes(searchKeyword.toLowerCase()));
    return matchesStatus && matchesKeyword;
  });

  reportsCountText.innerText = `${filteredList.length} báo cáo`;
  if (desktopSubTitle)
    desktopSubTitle.innerText =
      "Theo dõi các sự cố đã báo cáo tại công trường và trạng thái xử lý của từng sự cố.";
  if (mobileSubTitle)
    mobileSubTitle.innerText =
      "Theo dõi các sự cố đã báo cáo tại công trường và trạng thái xử lý của từng sự cố.";

  // Nếu không có kết quả nào sau khi lọc
  if (filteredList.length === 0) {
    gridContainer.style.display = "none";
    emptyCard.style.display = "flex";
    reminderBanner.style.display = "flex";
    return;
  }

  // Hiển thị dạng lưới thẻ
  gridContainer.style.display = "grid";
  emptyCard.style.display = "none";
  reminderBanner.style.display = "none";

  gridContainer.innerHTML = "";
  filteredList.forEach((item) => {
    const card = document.createElement("div");
    card.className = "hazard-card-item";
    card.id = `hazard-${item.id}`;

    let statusClass = "status-pending";
    if (item.status === "processing") statusClass = "status-processing";
    else if (item.status === "resolved") statusClass = "status-resolved";

    card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${item.imageUrl}" alt="${item.title}" class="card-img" loading="lazy">
            </div>
            <div class="card-body-content">
                <div>
                    <h3 class="card-heading-title" title="${item.title}">${item.title}</h3>
                    <div class="card-location-line">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${item.location || "Khu vực chưa xác định"}</span>
                    </div>
                </div>
                <div class="card-bottom-row">
                    <span class="status-pill ${statusClass}">${item.statusText}</span>
                    <i class="fa-solid fa-chevron-right card-arrow-icon"></i>
                </div>
            </div>
        `;

    // Click vào card để mở chi tiết
    card.addEventListener("click", () => openHazardDetail(item));
    gridContainer.appendChild(card);
  });
}

function updateTabCounts(
  customAll,
  customPending,
  customProcessing,
  customResolved,
) {
  if (customAll !== undefined) {
    document.getElementById("countAll").innerText = customAll;
    document.getElementById("countPending").innerText = customPending;
    document.getElementById("countProcessing").innerText = customProcessing;
    document.getElementById("countResolved").innerText = customResolved;
    return;
  }

  const all = allHazardsList.length;
  const pending = allHazardsList.filter((i) => i.status === "pending").length;
  const processing = allHazardsList.filter(
    (i) => i.status === "processing",
  ).length;
  const resolved = allHazardsList.filter((i) => i.status === "resolved").length;

  document.getElementById("countAll").innerText = all;
  document.getElementById("countPending").innerText = pending;
  document.getElementById("countProcessing").innerText = processing;
  document.getElementById("countResolved").innerText = resolved;
}

// ----------------------------------------------------------------------------
// 7. MODAL CHI TIẾT & THAO TÁC XÓA 
// ----------------------------------------------------------------------------
function openHazardDetail(item) {
  currentViewingHazard = item;
  const modal = document.getElementById("hazardDetailModal");
  if (!modal) return;

  document.getElementById("modalHazardId").innerText = item.id;
  document.getElementById("modalHazardTitle").innerText = item.title;
  document.getElementById("modalHazardImg").src = item.imageUrl;
  document.getElementById("modalHazardStatus").innerText = item.statusText;
  document.getElementById("modalHazardLocation").innerText =
    item.location || "Đang cập nhật";
  document.getElementById("modalHazardTime").innerText =
    item.time || "03/10/2026 · 09:15";
  document.getElementById("modalHazardRisk").innerText =
    item.riskLevel || "Rủi ro cao";
  document.getElementById("modalHazardReceiver").innerText =
    item.receiver || "Trần Minh Đức";
  document.getElementById("modalHazardDesc").innerText =
    item.description || "Không có mô tả chi tiết.";
  document.getElementById("modalHazardAI").innerText =
    item.aiRecommendation || "Cô lập khu vực và kiểm tra an toàn.";
  document.getElementById("modalHazardAction").innerText =
    item.actionTaken || "Đã căng dây cảnh báo.";

  modal.classList.add("active");
}

function closeHazardDetail() {
  const modal = document.getElementById("hazardDetailModal");
  if (modal) modal.classList.remove("active");
  currentViewingHazard = null;
}

function deleteCurrentHazard() {
  if (!currentViewingHazard) return;
  openConfirmDeleteModal(currentViewingHazard);
}

// Mở hộp thoại xác nhận xóa tùy chỉnh (Thay thế window.confirm mặc định)
let hazardPendingDelete = null;

function openConfirmDeleteModal(item) {
  hazardPendingDelete = item || currentViewingHazard;
  if (!hazardPendingDelete) return;

  const modal = document.getElementById("confirmDeleteModal");
  const targetIdElem = document.getElementById("confirmTargetId");
  const targetTitleElem = document.getElementById("confirmTargetTitle");

  if (targetIdElem) targetIdElem.innerText = hazardPendingDelete.id || "HAZARD";
  if (targetTitleElem)
    targetTitleElem.innerText = `"${hazardPendingDelete.title}"`;

  if (modal) modal.classList.add("active");
}

// Đóng hộp thoại xác nhận xóa
function closeConfirmDeleteModal() {
  const modal = document.getElementById("confirmDeleteModal");
  if (modal) modal.classList.remove("active");
  hazardPendingDelete = null;
}

// Thực thi xóa báo cáo sau khi người dùng ấn "Xóa vĩnh viễn"
function executeDeleteHazard() {
  const target = hazardPendingDelete || currentViewingHazard;
  if (!target) return;

  const idToDelete = target.id;
  const titleToDelete = target.title;

  // Hiệu ứng mờ dần trên card trước khi xóa (nếu có trên màn hình)
  const cardElem = document.getElementById(`hazard-${idToDelete}`);
  if (cardElem) {
    cardElem.style.transition = "all 0.25s ease";
    cardElem.style.opacity = "0";
    cardElem.style.transform = "scale(0.92)";
  }

  // Xóa khỏi danh sách dữ liệu trong bộ nhớ
  allHazardsList = allHazardsList.filter((i) => i.id !== idToDelete);

  // Cập nhật lại LocalStorage
  const stored = localStorage.getItem("sitesafe_my_hazards");
  if (stored) {
    try {
      let localItems = JSON.parse(stored);
      localItems = localItems.filter((i) => i.id !== idToDelete);
      localStorage.setItem("sitesafe_my_hazards", JSON.stringify(localItems));
    } catch (e) {
      console.error("Lỗi cập nhật LocalStorage:", e);
    }
  }

  // Đóng cả 2 modal (Xác nhận & Chi tiết)
  closeConfirmDeleteModal();
  closeHazardDetail();

  // Làm mới danh sách và số lượng đếm trên các tab
  setTimeout(() => {
    renderHazards();
    updateTabCounts();
  }, 200);

  // Hiển thị thông báo Toast Danger đồng bộ hệ thống SiteSafe
  showToast(
    `Đã xóa vĩnh viễn báo cáo "${titleToDelete}" khỏi hệ thống.`,
    "danger",
    "Đã xóa báo cáo",
  );
}

// ----------------------------------------------------------------------------
// 8. SỰ KIỆN TƯƠNG TÁC
// ----------------------------------------------------------------------------
function bindEvents() {
  // 1. Tìm kiếm theo từ khóa
  const searchInput = document.getElementById("hazardSearchInput");
  const clearBtn = document.getElementById("btnClearSearch");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchKeyword = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = searchKeyword ? "block" : "none";
      renderHazards();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchKeyword = "";
      clearBtn.style.display = "none";
      renderHazards();
    });
  }

  // 2. Chuyển đổi các Tab lọc trạng thái
  document.querySelectorAll(".filter-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilterStatus = btn.getAttribute("data-status");
      renderHazards();
    });
  });

  // 3. Modal chi tiết (đóng / mở)
  const btnClose = document.getElementById("btnCloseModal");
  const btnCloseAction = document.getElementById("btnCloseModalAction");
  const detailModal = document.getElementById("hazardDetailModal");
  const btnDelete = document.getElementById("btnDeleteCurrentReport");

  if (btnClose) btnClose.addEventListener("click", closeHazardDetail);
  if (btnCloseAction)
    btnCloseAction.addEventListener("click", closeHazardDetail);
  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) closeHazardDetail();
    });
  }
  // Khi click "Xóa báo cáo" trong modal chi tiết -> mở hộp thoại xác nhận
  if (btnDelete) {
    btnDelete.addEventListener("click", () => {
      if (currentViewingHazard) openConfirmDeleteModal(currentViewingHazard);
    });
  }

  // 4. Modal xác nhận xóa (Hủy / Đồng ý)
  const btnCancelDelete = document.getElementById("btnCancelDelete");
  const btnConfirmDelete = document.getElementById("btnConfirmDelete");
  const confirmModal = document.getElementById("confirmDeleteModal");

  if (btnCancelDelete)
    btnCancelDelete.addEventListener("click", closeConfirmDeleteModal);
  if (btnConfirmDelete)
    btnConfirmDelete.addEventListener("click", executeDeleteHazard);
  if (confirmModal) {
    confirmModal.addEventListener("click", (e) => {
      if (e.target === confirmModal) closeConfirmDeleteModal();
    });
  }

  // 5. Nút đóng Toast thông báo
  const toastCloseBtn = document.getElementById("toastCloseBtn");
  if (toastCloseBtn) {
    toastCloseBtn.addEventListener("click", hideToast);
  }

  // 6. Phím tắt ESC để đóng modal đang mở
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const confirmM = document.getElementById("confirmDeleteModal");
      const detailM = document.getElementById("hazardDetailModal");
      const profileM = document.getElementById("userProfileModalBackdrop");
      const drawerM = document.getElementById("mobileNavBackdrop");
      if (confirmM && confirmM.classList.contains("active")) {
        closeConfirmDeleteModal();
      } else if (detailM && detailM.classList.contains("active")) {
        closeHazardDetail();
      } else if (profileM && profileM.classList.contains("show")) {
        profileM.classList.remove("show");
        document.body.style.overflow = "";
      } else if (drawerM && drawerM.classList.contains("show")) {
        drawerM.classList.remove("show");
        document.body.style.overflow = "";
      }
    }
  });

  // 7. Nút chuyển đổi nhanh Demo Minh họa (Empty State ↔ Data Grid)
  const btnDemo = document.getElementById("btnToggleDemoMode");
  const btnMobileDemo = document.getElementById("btnMobileDemoToggle");
  const demoText = document.getElementById("demoModeText");

  const toggleDemo = () => {
    isDemoEmptyMode = !isDemoEmptyMode;
    if (demoText) {
      demoText.innerText = isDemoEmptyMode
        ? "Trống (0 báo cáo)"
        : "Có dữ liệu (6)";
    }
    renderHazards();
    showToast(
      isDemoEmptyMode
        ? "Đã chuyển sang giao diện Chưa có báo cáo nào (Ảnh 1/2)"
        : "Đã chuyển sang giao diện Danh sách 6 báo cáo (Ảnh 3/4)",
      "info",
      "Chế độ Demo",
    );
  };

  if (btnDemo) btnDemo.addEventListener("click", toggleDemo);
  if (btnMobileDemo) btnMobileDemo.addEventListener("click", toggleDemo);

  // 8. Nút chuông thông báo trên Mobile Header
  const btnMobileNotification = document.getElementById("btnMobileNotification");
  if (btnMobileNotification) {
    btnMobileNotification.addEventListener("click", () => {
      window.location.href = "../../share/notifications/notifications.html?role=worker";
    });
  }

  // 9. Mobile Navigation Drawer 
  const btnMobileNavToggle = document.getElementById("btnMobileNavToggle");
  const btnCloseNavDrawer = document.getElementById("btnCloseNavDrawer");
  const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");

  const openMobileNavDrawer = () => {
    closeUserProfileModal();
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

  // 10. User Profile Summary Modal
  const userProfileBrief = document.getElementById("userProfileBrief");
  const btnMobileUser = document.getElementById("btnMobileUser");
  const btnDrawerAccountDetail = document.getElementById("btnDrawerAccountDetail");
  const userProfileModalBackdrop = document.getElementById("userProfileModalBackdrop");
  const btnCloseUserProfileModal = document.getElementById("btnCloseUserProfileModal");
  const btnModalCloseSecondary = document.getElementById("btnModalCloseSecondary");
  const btnModalLogout = document.getElementById("btnModalLogout");
  const btnLogout = document.getElementById("btnLogout");
  const btnDrawerLogout = document.getElementById("btnDrawerLogout");

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
      window.location.href = "../../share/profile/profile.html?role=worker";
    });
  }
  const drawerUserProfileBrief = document.getElementById("drawerUserProfileBrief");
  if (drawerUserProfileBrief) {
    drawerUserProfileBrief.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../../share/profile/profile.html?role=worker";
    });
  }
  const btnMobileUserProfile = document.getElementById("btnMobileUserProfile");
  if (btnMobileUserProfile) {
    btnMobileUserProfile.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../../share/profile/profile.html?role=worker";
    });
  }
  if (btnMobileUser) {
    btnMobileUser.addEventListener("click", openUserProfileModal);
  }
  if (btnDrawerAccountDetail) {
    btnDrawerAccountDetail.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../../share/profile/profile.html?role=worker";
    });
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

  const handleLogout = (e) => {
    if (e) e.preventDefault();
    try {
      sessionStorage.clear();
      localStorage.removeItem("currentUser");
    } catch (err) {}
    window.location.href = "../../share/login/login.html";
  };

  if (btnModalLogout) btnModalLogout.addEventListener("click", handleLogout);
  if (btnLogout) btnLogout.addEventListener("click", handleLogout);
  if (btnDrawerLogout) btnDrawerLogout.addEventListener("click", handleLogout);
}

// ----------------------------------------------------------------------------
// 9. TOAST THÔNG BÁO NÂNG CAO
// ----------------------------------------------------------------------------
let toastTimer = null;

function showToast(message, type = "success", title = null) {
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMessage");
  const toastTitle = document.getElementById("toastTitle");
  const toastIcon = document.getElementById("toastIcon");
  if (!toast || !toastMsg) return;

  // Reset các class trạng thái
  toast.classList.remove(
    "toast-success",
    "toast-danger",
    "toast-info",
    "toast-warning",
  );

  if (type === "danger") {
    toast.classList.add("toast-danger");
    if (toastTitle) toastTitle.innerText = title || "Đã xóa thành công";
    if (toastIcon) toastIcon.className = "fa-solid fa-trash-can toast-icon";
  } else if (type === "info") {
    toast.classList.add("toast-info");
    if (toastTitle) toastTitle.innerText = title || "Thông báo";
    if (toastIcon) toastIcon.className = "fa-solid fa-circle-info toast-icon";
  } else if (type === "warning") {
    toast.classList.add("toast-warning");
    if (toastTitle) toastTitle.innerText = title || "Cảnh báo";
    if (toastIcon)
      toastIcon.className = "fa-solid fa-triangle-exclamation toast-icon";
  } else {
    toast.classList.add("toast-success");
    if (toastTitle) toastTitle.innerText = title || "Thành công";
    if (toastIcon) toastIcon.className = "fa-solid fa-circle-check toast-icon";
  }

  toastMsg.innerText = message;
  toast.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    hideToast();
  }, 3200);
}

function hideToast() {
  const toast = document.getElementById("toastNotification");
  if (toast) toast.classList.remove("show");
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }
}
