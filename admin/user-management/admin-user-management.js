const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const thongBaoNoi = $("#thongBaoNoi");
let thoiGianThongBao;

function hienThongBao(message) {
  thongBaoNoi.textContent = message;
  thongBaoNoi.classList.add("hien-thi");
  clearTimeout(thoiGianThongBao);
  thoiGianThongBao = setTimeout(() => thongBaoNoi.classList.remove("hien-thi"), 2600);
}

let vaiTroDuocChon = "all";
let hangDangThaoTac = null;

function apDungBoLoc() {
  const query = ($("#timKiemNguoiDung").value || "").trim().toLocaleLowerCase("vi");
  const status = $("#boLocTrangThai").value;
  const role = $("#boLocVaiTro").value;
  const project = $("#boLocDuAn").value;
  let visible = 0;

  $$("#thanBangNguoiDung tr").forEach(row => {
    const haystack = `${row.dataset.name} ${row.dataset.email} ${row.dataset.id} ${row.querySelector(".phan-cong").textContent}`.toLocaleLowerCase("vi");
    const roleOk = (role === "all" || row.dataset.role === role) && (vaiTroDuocChon === "all" || row.dataset.role === vaiTroDuocChon);
    const statusOk = status === "all" || row.dataset.status === status;
    const projectOk = project === "all" || row.dataset.project === project;
    const show = haystack.includes(query) && roleOk && statusOk && projectOk;
    row.hidden = !show;
    if (show) visible++;
  });

  $("#soLuongTaiKhoan").textContent = `${String(visible).padStart(2, "0")} tài khoản`;
  $("#chuHienThiKetQua").textContent = visible ? `Hiển thị 1–${visible} / ${visible} người dùng · Toàn bộ dự án` : "Không tìm thấy người dùng phù hợp";
}

$("#timKiemNguoiDung").addEventListener("input", apDungBoLoc);
["boLocTrangThai", "boLocVaiTro", "boLocDuAn"].forEach(id => $(`#${id}`).addEventListener("change", apDungBoLoc));

$$(".the-vai-tro").forEach(pill => pill.addEventListener("click", () => {
  vaiTroDuocChon = pill.dataset.role;
  $$(".the-vai-tro").forEach(p => p.classList.toggle("dang-chon", p === pill));
  $("#boLocVaiTro").value = "all";
  apDungBoLoc();
}));

function capNhatThongKe() {
  const rows = $$("#thanBangNguoiDung tr");
  const active = rows.filter(row => row.dataset.status === "active").length;
  $("#tongNguoiDung").textContent = String(rows.length).padStart(2, "0");
  $("#nguoiDungKichHoat").textContent = String(active).padStart(2, "0");
  $("#nguoiDungVoHieuHoa").textContent = String(rows.length - active).padStart(2, "0");
}

function doiTrangThaiNguoiDung(row) {
  const toggle = $(".nut-gạt-trang-thai", row);
  const active = !toggle.classList.contains("hoat-dong");
  toggle.classList.toggle("hoat-dong", active);
  row.dataset.status = active ? "active" : "disabled";
  const text = $(".chu-trang-thai", row);
  text.textContent = active ? "Đang kích hoạt" : "Đã vô hiệu hóa";
  text.classList.toggle("chu-hoat-dong", active);
  text.classList.toggle("chu-vo-hieu-hoa", !active);
  toggle.setAttribute("aria-label", `${active ? "Vô hiệu hóa" : "Kích hoạt"} ${row.dataset.name}`);
  capNhatThongKe();
  apDungBoLoc();
  hienThongBao(`Tài khoản ${row.dataset.name} đã ${active ? "được kích hoạt" : "vô hiệu hóa"}.`);
}

$$(".nut-gạt-trang-thai").forEach(toggle => toggle.addEventListener("click", () => doiTrangThaiNguoiDung(toggle.closest("tr"))));

$("#chonTatCa").addEventListener("change", event => {
  $$("#thanBangNguoiDung tr:not([hidden]) .o-tich-hang").forEach(box => box.checked = event.target.checked);
  capNhatChuKhiChon();
});

$$(".o-tich-hang").forEach(box => box.addEventListener("change", capNhatChuKhiChon));

function capNhatChuKhiChon() {
  const selected = $$(".o-tich-hang:checked").length;
  $("#chuHienThiKetQua").textContent = selected ? `Đã chọn ${selected} người dùng` : `${$$("#thanBangNguoiDung tr:not([hidden])").length} người dùng đang hiển thị · Toàn bộ dự án`;
}

const hopThoaiNguoiDung = $("#hopThoaiNguoiDung");

function moHopThoai() {
  $("#bieuMauNguoiDung").reset();
  hopThoaiNguoiDung.showModal();
  setTimeout(() => $("#tenMoi").focus(), 50);
}

$("#nutThemNguoiDung").addEventListener("click", moHopThoai);
$("#dongHopThoai").addEventListener("click", () => hopThoaiNguoiDung.close());
$("#huyHopThoai").addEventListener("click", () => hopThoaiNguoiDung.close());

$("#bieuMauNguoiDung").addEventListener("submit", event => {
  event.preventDefault();
  const name = $("#tenMoi").value.trim();
  const email = $("#emailMoi").value.trim();
  const role = $("#vaiTroMoi").value;
  const project = $("#duAnMoi").value;
  const id = `ND-${String($$("#thanBangNguoiDung tr").length + 1).padStart(3, "0")}`;
  const initials = name.split(/\s+/).slice(-2).map(part => part[0]).join("").toLocaleUpperCase("vi");
  const roleClass = role === "HSE" ? "hse" : role === "Admin" ? "admin" : role === "Quản lý" ? "quan-ly" : "cong-nhan";
  const assignment = project === "A" ? "Tòa A · Phân công mới" : project === "B" ? "Tòa B · Phân công mới" : "Khối đế · Phân công mới";

  const row = document.createElement("tr");
  row.dataset.name = name; 
  row.dataset.email = email; 
  row.dataset.id = id; 
  row.dataset.role = role; 
  row.dataset.status = "active"; 
  row.dataset.project = project;

  row.innerHTML = `<td><input type="checkbox" class="o-tich-hang" aria-label="Chọn ${mãHoaHtml(name)}"></td>
    <td><div class="o-nguoi-dung"><span class="anh-da-dien-nguoi-dung">${mãHoaHtml(initials)}</span><div><strong>${mãHoaHtml(name)}</strong><small>${id} · ${mãHoaHtml(email)}</small></div></div></td>
    <td><span class="huy-hieu-vai-tro ${roleClass}">◆ ${mãHoaHtml(role)}</span></td>
    <td><strong class="phan-cong">${assignment}</strong><small class="dong-phu">Nhà thầu mới</small></td>
    <td><div class="dong-trang-thai"><button class="nut-gạt-trang-thai hoat-dong" aria-label="Vô hiệu hóa ${mãHoaHtml(name)}"></button><span class="chu-trang-thai chu-hoat-dong">Đang kích hoạt</span></div><small class="dong-phu thoi-gian-dang-nhap">Chưa đăng nhập</small></td>
    <td><button class="nut-them-thao-tac" aria-label="Thao tác ${mãHoaHtml(name)}">···</button></td>`;

  $("#thanBangNguoiDung").appendChild(row);
  ganSuKienHang(row);
  hopThoaiNguoiDung.close();
  capNhatThongKe();
  apDungBoLoc();
  hienThongBao(`Đã thêm tài khoản ${name} (bản demo).`);
});

function mãHoaHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
}

function ganSuKienHang(row) {
  $(".nut-gạt-trang-thai", row)?.addEventListener("click", () => doiTrangThaiNguoiDung(row));
  $(".o-tich-hang", row)?.addEventListener("change", capNhatChuKhiChon);
  $(".nut-them-thao-tac", row)?.addEventListener("click", event => moMenuNguoiCanh(event.currentTarget, row));
}

$$(".nut-them-thao-tac").forEach(button => button.addEventListener("click", event => moMenuNguoiCanh(event.currentTarget, event.currentTarget.closest("tr"))));

const menuNguoiCanh = $("#menuNguoiCanh");

function moMenuNguoiCanh(button, row) {
  hangDangThaoTac = row;
  const rect = button.getBoundingClientRect();
  menuNguoiCanh.style.top = `${Math.min(rect.bottom + 4, window.innerHeight - 120)}px`;
  menuNguoiCanh.style.left = `${Math.max(8, Math.min(rect.right - 165, window.innerWidth - 175))}px`;
  menuNguoiCanh.classList.add("mo-menu");
}

menuNguoiCanh.addEventListener("click", event => {
  const action = event.target.dataset.action;
  if (!action) return;
  menuNguoiCanh.classList.remove("mo-menu");
  if (!hangDangThaoTac) return;
  if (action === "toggle") doiTrangThaiNguoiDung(hangDangThaoTac);
  if (action === "edit") hienThongBao(`Chỉnh sửa thông tin: ${hangDangThaoTac.dataset.name} (bản demo).`);
});

document.addEventListener("click", event => {
  if (!menuNguoiCanh.contains(event.target) && !event.target.closest(".nut-them-thao-tac")) menuNguoiCanh.classList.remove("mo-menu");
});

const thanhDieuHuong = $("#thanhDieuHuong");
const menuDiDong = $("#menuDiDong");
const lopPhuMenu = $("#lopPhuMenu");
const nutDongMenuMobile = $("#nutDongMenuMobile");

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

if (menuDiDong) {
  menuDiDong.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSidebar();
  });
}

if (nutDongMenuMobile) {
  nutDongMenuMobile.addEventListener("click", closeSidebar);
}

if (lopPhuMenu) {
  lopPhuMenu.addEventListener("click", closeSidebar);
}

// Tự động đóng menu khi bấm vào các liên kết trong sidebar trên màn hình nhỏ
$$('.thanh-dieu-huong nav a, .thanh-dieu-huong .muc-dieu-huong').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 850) {
      closeSidebar();
    }
  });
});

// Đồng bộ danh sách công trường
const siteSelect = $("#siteSelect");
const topbarProjectTitle = $("#topbarProjectTitle");
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

$("#nutQuanLyPhanQuyen")?.addEventListener("click", () => hienThongBao("Quản lý 4 vai trò: Admin, HSE, Quản lý, Công nhân."));
$("#nutNhatKy")?.addEventListener("click", () => hienThongBao("Nhật ký phân quyền sẽ hiển thị tại đây khi kết nối hệ thống."));

capNhatThongKe();