document.addEventListener("DOMContentLoaded", function () {
    const nutPhongTo = document.getElementById("expandBtn");
    const cuaSoAnh = document.getElementById("imageModal");
    const nutDongCuaSo = document.getElementById("closeModalBtn");

    if (nutPhongTo && cuaSoAnh && nutDongCuaSo) {
        nutPhongTo.addEventListener("click", function () {
            cuaSoAnh.classList.add("kich-hoat");
        });

        nutDongCuaSo.addEventListener("click", function () {
            cuaSoAnh.classList.remove("kich-hoat");
        });

        cuaSoAnh.addEventListener("click", function (e) {
            if (e.target === cuaSoAnh) {
                cuaSoAnh.classList.remove("kich-hoat");
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && cuaSoAnh.classList.contains("kich-hoat")) {
                cuaSoAnh.classList.remove("kich-hoat");
            }
        });
    }

    const assigneeSelect = document.getElementById("assigneeSelect");
    const dueDateInput = document.getElementById("dueDateInput");
    const appliedRisk = document.getElementById("appliedRisk");
    const approvalSummary = document.getElementById("approvalSummary");

    function formatDateTime(dateTimeString) {
        if (!dateTimeString) return "Chưa chọn hạn";
        const dateObj = new Date(dateTimeString);
        if (isNaN(dateObj.getTime())) return dateTimeString;

        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    function updateApprovalSummary() {
        if (!approvalSummary) return;

        const risk = appliedRisk ? appliedRisk.textContent.trim() : "Cao";

        let assigneeName = "Chưa chọn";
        if (assigneeSelect && assigneeSelect.options.length > 0) {
            const selectedText = assigneeSelect.options[assigneeSelect.selectedIndex].text;
            assigneeName = selectedText.split("(")[0].trim();
        }

        const dueDateVal = dueDateInput ? dueDateInput.value : "";
        const formattedDate = formatDateTime(dueDateVal);

        approvalSummary.textContent = `Duyệt mức ${risk} · Giao ${assigneeName} · Hạn ${formattedDate}`;
    }

    if (assigneeSelect) {
        assigneeSelect.addEventListener("change", updateApprovalSummary);
    }

    if (dueDateInput) {
        dueDateInput.addEventListener("input", updateApprovalSummary);
        dueDateInput.addEventListener("change", updateApprovalSummary);
    }

    const nutChapNhanAi = document.getElementById("acceptAiBtn");
    const nutChinhSuaAi = document.getElementById("editAiBtn");
    const nutPheDuyet = document.getElementById("approveBtn");
    const nutTuChoi = document.getElementById("rejectBtn");

    if (nutChapNhanAi) {
        nutChapNhanAi.addEventListener("click", function () {
            hienThongBaoNoi("Đã chấp nhận gợi ý đánh giá rủi ro từ AI!", "thanh-cong");
            if (appliedRisk) appliedRisk.textContent = "Cao (Đã xác nhận AI)";
            updateApprovalSummary();
        });
    }

    if (nutChinhSuaAi) {
        nutChinhSuaAi.addEventListener("click", function () {
            const ruiRoMoi = prompt("Nhập mức độ rủi ro mong muốn (Cao / Trung bình / Thấp):", "Cao");
            if (ruiRoMoi && appliedRisk) {
                appliedRisk.textContent = ruiRoMoi;
                hienThongBaoNoi("Đã cập nhật mức độ rủi ro thủ công.", "thanh-cong");
                updateApprovalSummary();
            }
        });
    }

    if (nutPheDuyet) {
        nutPheDuyet.addEventListener("click", function () {
            hienThongBaoNoi("Đã duyệt báo cáo và giao việc thành công!", "thanh-cong");
        });
    }

    if (nutTuChoi) {
        nutTuChoi.addEventListener("click", function () {
            const lyDo = prompt("Nhập lý do từ chối báo cáo mối nguy này:");
            if (lyDo) {
                hienThongBaoNoi("Đã từ chối báo cáo mối nguy.", "nguy-hiem");
            }
        });
    }

    function hienThongBaoNoi(noiDung, loai = "thanh-cong") {
        const khungChua = document.getElementById("toastContainer");
        if (!khungChua) return;

        const thongBao = document.createElement("div");
        thongBao.className = `thong-bao-noi ${loai}`;
        thongBao.innerHTML = `
            <i class="fa-solid ${loai === "thanh-cong" ? "fa-circle-check" : "fa-circle-xmark"}"></i>
            <span>${noiDung}</span>
        `;

        khungChua.appendChild(thongBao);

        setTimeout(() => {
            thongBao.remove();
        }, 3000);
    }

    updateApprovalSummary();

    // Mobile drawer toggle
    const nutMenu = document.getElementById("nutMenuMobile");
    const nutDong = document.getElementById("nutDongMenuMobile");
    const lopPhu = document.getElementById("lopPhuMobile");
    const thanhBen = document.getElementById("thanhBen");

    function moMenu(e) {
        if (e) e.stopPropagation();
        if (thanhBen) thanhBen.classList.add("mo-menu-mobile");
        if (lopPhu) lopPhu.classList.add("hien-thi");
        document.body.style.overflow = "hidden";
    }

    function dongMenu(e) {
        if (e) e.stopPropagation();
        if (thanhBen) thanhBen.classList.remove("mo-menu-mobile");
        if (lopPhu) lopPhu.classList.remove("hien-thi");
        document.body.style.overflow = "";
    }

    if (nutMenu) nutMenu.addEventListener("click", moMenu);
    if (nutDong) nutDong.addEventListener("click", dongMenu);
    if (lopPhu) lopPhu.addEventListener("click", dongMenu);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") dongMenu(e);
    });

    // Sync current project
    const siteSelect = document.getElementById("siteSelect");
    const topbarTitle = document.getElementById("topbarProjectTitle");
    const savedProject = localStorage.getItem("sitesafe_current_project") || "Metro Tower - Khu B";

    if (siteSelect) {
        siteSelect.value = savedProject;
        siteSelect.addEventListener("change", function (e) {
            const val = e.target.value;
            localStorage.setItem("sitesafe_current_project", val);
            if (topbarTitle) {
                topbarTitle.innerHTML = `${val} <i class="fa-solid fa-chevron-down"></i>`;
            }
        });
    }

    if (topbarTitle) {
        topbarTitle.innerHTML = `${savedProject} <i class="fa-solid fa-chevron-down"></i>`;
    }
});