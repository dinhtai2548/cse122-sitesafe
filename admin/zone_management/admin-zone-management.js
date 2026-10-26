const timKiemZone = document.querySelector("#timKiemZone");
const boLocTrangThai = document.querySelector("#boLocTrangThai");
const boLocNhanVien = document.querySelector("#boLocNhanVien");
const thongBaoNoi = document.querySelector("#thongBaoNoi");
let boDemThongBao;

function hienThongBao(message) {
  thongBaoNoi.textContent = message;
  thongBaoNoi.classList.add("hien-thi");
  clearTimeout(boDemThongBao);
  boDemThongBao = setTimeout(() => thongBaoNoi.classList.remove("hien-thi"), 2600);
}

function apDungBoLoc() {
  const query = (timKiemZone?.value || "").trim().toLocaleLowerCase("vi");
  const status = boLocTrangThai?.value || "all";
  const staff = boLocNhanVien?.value || "all";

  document.querySelectorAll(".the-zone").forEach(card => {
    const text = `${card.dataset.code} ${card.querySelector("h4")?.textContent || ""} ${card.querySelector("p")?.textContent || ""} ${card.dataset.staff}`.toLocaleLowerCase("vi");
    const matchesQuery = !query || text.includes(query);
    const matchesStatus = status === "all" || card.dataset.status === status;
    const matchesStaff = staff === "all" || card.dataset.staff === staff;
    card.hidden = !(matchesQuery && matchesStatus && matchesStaff);
  });

  document.querySelectorAll(".the-block").forEach(block => {
    const visibleZones = [...block.querySelectorAll(".the-zone")].some(card => !card.hidden);
    const blockMatchesQuery = !query || block.dataset.block.toLocaleLowerCase("vi").includes(query);
    block.hidden = !(visibleZones || (blockMatchesQuery && status === "all" && staff === "all"));
  });
}
timKiemZone?.addEventListener("input", apDungBoLoc);
boLocTrangThai?.addEventListener("change", apDungBoLoc);
boLocNhanVien?.addEventListener("change", apDungBoLoc);

document.querySelectorAll(".nut-gat").forEach(toggle => {
  toggle.addEventListener("click", () => {
    const card = toggle.closest(".the-zone");
    const isOn = !toggle.classList.contains("dang-bat");
    toggle.classList.toggle("dang-bat", isOn);
    card.dataset.status = isOn ? "on" : "off";
    const label = toggle.parentElement.querySelector(".nhan-trang-thai");
    if (label) label.textContent = isOn ? "Bật" : "Tắt";
    toggle.setAttribute("aria-label", `${isOn ? "Tắt" : "Bật"} zone ${card.dataset.code}`);
    capNhatThongKe();
    apDungBoLoc();
    hienThongBao(`${card.dataset.code} đã ${isOn ? "được bật" : "được tắt"}.`);
  });
});

function capNhatThongKe() {
  const cards = [...document.querySelectorAll(".the-zone")];
  const on = cards.filter(card => card.dataset.status === "on").length;
  const off = cards.length - on;
  const zoneStat = document.querySelectorAll(".so-thong-ke")[2];
  if (zoneStat) zoneStat.innerHTML = `${String(cards.length).padStart(2, "0")} <small>${on} bật · ${off} tắt</small>`;
  document.querySelectorAll(".the-block").forEach(block => {
    const zones = [...block.querySelectorAll(".the-zone")];
    const active = zones.filter(card => card.dataset.status === "on").length;
    const count = block.querySelector(".so-luong-block");
    if (count) count.textContent = `${active} bật · ${zones.length - active} tắt`;
  });
}

function thietLapThuGon(button, target, label) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isCollapsed = target.classList.toggle("thu-gon");
    button.classList.toggle("da-thu-gon", isCollapsed);
    button.setAttribute("aria-label", isCollapsed ? `Mở ${label}` : `Thu gọn ${label}`);
  });
}
const siteToggle = document.querySelector(".nut-thu-gon-cong-truong");
const blocks = document.querySelector(".danh-sach-block");
if (siteToggle && blocks) thietLapThuGon(siteToggle, blocks, "công trường");
document.querySelectorAll(".mui-ten-block").forEach(button => {
  const target = button.closest(".the-block")?.querySelector(".danh-sach-zone");
  if (target) thietLapThuGon(button, target, "Block");
});

const dialog = document.querySelector("#hopThoaiDon");
const dialogTitle = document.querySelector("#tieuDeHopThoai");
const dialogDescription = document.querySelector("#moTaHopThoai");
const dialogInput = document.querySelector("#truongNhapHopThoai");
let currentDialogType = "Zone";

function moHopThoaiThem(type) {
  currentDialogType = type;
  dialogTitle.textContent = `Thêm ${type} mới`;
  dialogDescription.textContent = `Nhập tên ${type.toLocaleLowerCase("vi")} để thêm vào cấu trúc công trường.`;
  dialogInput.value = "";
  dialogInput.placeholder = `Ví dụ: ${type === "Block" ? "Block C - Tòa tháp mới" : type === "Công trường" ? "Dự án mới" : "MT-A-04 · Tầng 04"}`;
  dialog.showModal();
  setTimeout(() => dialogInput.focus(), 50);
}
document.querySelector("#themCongTruong")?.addEventListener("click", () => moHopThoaiThem("Công trường"));
document.querySelector("#themZone")?.addEventListener("click", () => moHopThoaiThem("Zone"));
document.querySelectorAll(".nut-them-block").forEach(button => button.addEventListener("click", () => moHopThoaiThem("Block")));
document.querySelectorAll(".nut-them-zone").forEach(button => button.addEventListener("click", () => moHopThoaiThem("Zone")));
document.querySelectorAll(".nut-sua").forEach(button => button.addEventListener("click", () => {
  const card = button.closest(".the-zone, .the-block, .khung-cong-truong");
  const name = card?.querySelector("h4, h3, h2")?.textContent?.trim() || "mục này";
  hienThongBao(`Chế độ chỉnh sửa: ${name}`);
}));

document.querySelector("#nutLuuHopThoai")?.addEventListener("click", event => {
  if (!dialogInput.value.trim()) {
    event.preventDefault();
    dialogInput.focus();
    return;
  }
  event.preventDefault();
  const name = dialogInput.value.trim();
  dialog.close();

  if (currentDialogType === "Zone") {
    const code = `MT-Z-${Math.floor(10 + Math.random() * 90)}`;
    const newZone = {
      siteId: 'proj-metro',
      siteName: localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B',
      block: 'Block B',
      code: code,
      name: name,
      status: 'on',
      staff: 'Lê Văn Hùng',
      riskLevel: 'Trung bình'
    };
    if (window.SiteSafeStore) {
      window.SiteSafeStore.addZone(newZone);
    }
    // Chèn thẻ Zone mới vào block đầu tiên
    const targetList = document.querySelector(".danh-sach-zone");
    if (targetList) {
      const art = document.createElement("article");
      art.className = "the-zone";
      art.dataset.code = code;
      art.dataset.staff = "Lê Văn Hùng";
      art.dataset.status = "on";
      art.innerHTML = `<div class="dau-zone"><span class="ma-zone">${code}</span><div class="thao-tac-zone"><span class="nhan-trang-thai">Bật</span><button class="nut-gat dang-bat" aria-label="Tắt zone ${code}" type="button"></button><button class="nut-sua" aria-label="Sửa zone ${code}" type="button"><i class="fa-solid fa-pen"></i></button></div></div><h4>${name}</h4><p>Khu vực mới thiết lập · 500 m²</p><div class="chan-zone"><span class="nhan-nhan-vien"><i class="fa-solid fa-user-check"></i> Cán bộ phụ trách · Lê Văn Hùng</span></div>`;
      targetList.prepend(art);
      
      const toggle = art.querySelector(".nut-gat");
      toggle?.addEventListener("click", () => {
        const isOn = !toggle.classList.contains("dang-bat");
        toggle.classList.toggle("dang-bat", isOn);
        art.dataset.status = isOn ? "on" : "off";
        const label = toggle.parentElement.querySelector(".nhan-trang-thai");
        if (label) label.textContent = isOn ? "Bật" : "Tắt";
        capNhatThongKe();
        apDungBoLoc();
      });
      capNhatThongKe();
      apDungBoLoc();
    }
    hienThongBao(`Đã tạo và đồng bộ Zone mới: ${code} - ${name}`);
  } else {
    hienThongBao(`Đã ghi nhận ${currentDialogType.toLocaleLowerCase("vi")}: ${name}`);
  }
});

const thanhDieuHuong = document.querySelector("#thanhDieuHuong");
const menuDiDong = document.querySelector("#menuDiDong");
const lopPhuMenu = document.querySelector("#lopPhuMenu");
const nutDongMenuMobile = document.querySelector("#nutDongMenuMobile");

function toggleSidebar() {
  if (!thanhDieuHuong) return;
  const isOpen = thanhDieuHuong.classList.toggle("mo-menu");
  if (lopPhuMenu) {
    lopPhuMenu.classList.toggle("hien-thi", isOpen);
  }
}

function closeSidebar() {
  if (thanhDieuHuong) thanhDieuHuong.classList.remove("mo-menu");
  if (lopPhuMenu) {
    lopPhuMenu.classList.remove("hien-thi");
  }
}

menuDiDong?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleSidebar();
});

nutDongMenuMobile?.addEventListener("click", closeSidebar);
lopPhuMenu?.addEventListener("click", closeSidebar);

// Tự động đóng menu khi bấm vào các liên kết trong sidebar trên màn hình nhỏ
document.querySelectorAll('.thanh-dieu-huong nav a, .thanh-dieu-huong .muc-dieu-huong').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 850) {
      closeSidebar();
    }
  });
});

// Đồng bộ dự án chọn
const siteSelect = document.querySelector('#siteSelect');
const topbarProjectTitle = document.querySelector('#topbarProjectTitle');
const savedProject = localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B';

if (siteSelect) {
  siteSelect.value = savedProject;
  siteSelect.addEventListener('change', (e) => {
    localStorage.setItem('sitesafe_current_project', e.target.value);
    if (topbarProjectTitle) {
      topbarProjectTitle.innerHTML = `${e.target.value} <span class="dau-mui-ten">⌄</span>`;
    }
  });
}
if (topbarProjectTitle) {
  topbarProjectTitle.innerHTML = `${savedProject} <span class="dau-mui-ten">⌄</span>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('sitesafe_user_name');
    if (savedName) {
        const userNameElements = document.querySelectorAll('.chu-nguoi-dung strong, .ten-nguoi-dung, #summaryUserName');
        userNameElements.forEach(el => {
            el.textContent = savedName;
        });
    }
});