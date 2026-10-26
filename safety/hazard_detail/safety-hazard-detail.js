document.addEventListener("DOMContentLoaded", function () {
    // 1. TẢI DỮ LIỆU MỐI NGUY ĐỘNG TỪ SITESAFESTORE / URL PARAM
    const urlParams = new URLSearchParams(window.location.search);
    const hazardId = urlParams.get('id') || 'HAZ-2026-001';
    let currentHazard = null;

    if (window.SiteSafeStore) {
        currentHazard = window.SiteSafeStore.getHazardById(hazardId);
        if (!currentHazard) {
            const allHazards = window.SiteSafeStore.getHazards();
            currentHazard = allHazards.length > 0 ? allHazards[0] : null;
        }
    }

    if (currentHazard) {
        // Cập nhật Breadcrumb & Mã
        const breadcrumbCurrent = document.querySelector(".duong-dan-trang .hien-tai");
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = currentHazard.ma || currentHazard.id;

        // Cập nhật Tiêu đề
        const h1 = document.querySelector(".tieu-de-chinh h1");
        if (h1) h1.textContent = currentHazard.title;
        const subTitle = document.querySelector(".tieu-de-chinh .tieu-de-phu");
        if (subTitle) subTitle.textContent = `Báo cáo ${currentHazard.ma || currentHazard.id} · ${currentHazard.projectName || 'Dự án Metro Tower - Zone B'}`;

        // Cập nhật Trạng thái
        const statusBadge = document.querySelector(".tieu-de-chinh mark.nhan-trang-thai");
        if (statusBadge) {
            const isPending = currentHazard.status === 'Chờ duyệt';
            statusBadge.className = isPending ? 'nhan-trang-thai cho-xu-ly' : 'nhan-trang-thai hoan-thanh';
            statusBadge.innerHTML = `<i class="fa-regular fa-clock"></i> ${currentHazard.status || 'Chờ duyệt'}`;
        }

        // Cập nhật Lưới thông tin
        const infoItems = document.querySelectorAll(".luoi-thong-tin .muc-thong-tin");
        if (infoItems.length >= 3) {
            infoItems[0].querySelector(".gia-tri-in-dam").textContent = currentHazard.zone || 'Zone B · Tầng 12';
            infoItems[1].querySelector(".gia-tri-in-dam").textContent = currentHazard.reporter || 'Lê Văn Hùng';
            infoItems[2].querySelector(".gia-tri-in-dam").innerHTML = `<time>${currentHazard.time ? currentHazard.time.replace('T', ' ').slice(0, 16) : '03/10/2026 · 09:15'}</time>`;
        }

        // Cập nhật Mô tả & Biện pháp đã thực hiện
        const descEl = document.querySelector(".khoi-phan-doan .van-ban-mo-ta");
        if (descEl) descEl.textContent = currentHazard.description || 'Không có mô tả chi tiết.';
        const actionEl = document.querySelector(".hop-hanh-dong-da-xuat-tri p");
        if (actionEl) actionEl.textContent = currentHazard.actionTaken || 'Đã nhắc nhở công nhân và căng dây cảnh báo tạm thời.';

        // Cập nhật Ảnh
        const mainImg = document.getElementById("mainImg");
        if (mainImg && currentHazard.photos && currentHazard.photos.length > 0) {
            const photoVal = currentHazard.photos[0];
            const imgSrc = (typeof photoVal === 'string') ? (photoVal.startsWith('http') || photoVal.startsWith('data:') ? photoVal : photoVal) : (photoVal.url || 'image_e4fc7a30.jpg');
            mainImg.src = imgSrc;
        }

        // Cập nhật Thẻ AI
        const aiHazardType = document.querySelector(".dong-tri-tue-nhan-tao .phan-loai strong");
        if (aiHazardType && currentHazard.aiClassification) {
            aiHazardType.textContent = currentHazard.aiClassification.hazardType || 'Nguy cơ rơi ngã';
        }
        const aiDesc = document.querySelector(".dong-tri-tue-nhan-tao .giai-thich-ai p");
        if (aiDesc && currentHazard.aiClassification) {
            aiDesc.textContent = currentHazard.aiClassification.analysis || currentHazard.aiClassification.recommendation || 'AI phân tích từ dữ liệu mô tả hiện trường.';
        }
        const aiRec = document.querySelector(".hop-khuyen-nghi p");
        if (aiRec && currentHazard.aiClassification) {
            aiRec.textContent = currentHazard.aiClassification.recommendation || 'Cô lập khu vực và kiểm tra trước khi thi công.';
        }
    }

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
        if (!dateTimeString) return "Hôm nay · 17:00";
        const dateObj = new Date(dateTimeString);
        if (isNaN(dateObj.getTime())) return dateTimeString;

        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes} · ${day}/${month}`;
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

    // BƯỚC 3 TRONG LUỒNG: CÁN BỘ AN TOÀN PHÊ DUYỆT & GIAO VIỆC
    if (nutPheDuyet) {
        nutPheDuyet.addEventListener("click", function () {
            const assigneeText = assigneeSelect ? assigneeSelect.options[assigneeSelect.selectedIndex].text : 'Lê Hoàng (Kết cấu Hòa Bình)';
            const dueDateVal = dueDateInput ? dueDateInput.value : '2026-10-03T17:00';
            const riskText = appliedRisk ? appliedRisk.textContent.trim() : 'Cao';
            const reqText = document.getElementById("taskRequirement")?.value || 'Khắc phục hiện trường và gửi ảnh nghiệm thu.';

            if (currentHazard && window.SiteSafeStore) {
                window.SiteSafeStore.approveHazard(currentHazard.id, {
                    assignee: assigneeText,
                    dueDate: formatDateTime(dueDateVal),
                    dueDateIso: dueDateVal,
                    riskLevel: riskText.toLowerCase().includes('cao') ? 'high' : 'med',
                    riskText: riskText,
                    requirement: reqText
                });
            }

            // Cập nhật trạng thái badge ngay trên giao diện
            const statusBadge = document.querySelector(".tieu-de-chinh mark.nhan-trang-thai");
            if (statusBadge) {
                statusBadge.className = 'nhan-trang-thai hoan-thanh';
                statusBadge.innerHTML = `<i class="fa-solid fa-check"></i> Đang khắc phục`;
            }

            hienThongBaoNoi("Đã duyệt báo cáo & giao việc thành công! Dữ liệu đã chuyển sang bảng Kanban của Quản lý công trường.", "thanh-cong");

            setTimeout(() => {
                if (confirm("Đã duyệt & giao việc thành công! Dữ liệu đã chuyển sang vai trò Quản lý công trường. Bạn có muốn chuyển sang màn hình 'Hành động khắc phục' (Quản lý) để kiểm tra không?")) {
                    window.location.href = '../../manager/corrective-actions/manager-corrective-actions.html';
                }
            }, 1000);
        });
    }

    if (nutTuChoi) {
        nutTuChoi.addEventListener("click", function () {
            const lyDo = prompt("Nhập lý do từ chối báo cáo mối nguy này:", "Thông tin hiện trường chưa đủ minh chứng.");
            if (lyDo) {
                if (currentHazard && window.SiteSafeStore) {
                    window.SiteSafeStore.rejectHazard(currentHazard.id, lyDo);
                }
                const statusBadge = document.querySelector(".tieu-de-chinh mark.nhan-trang-thai");
                if (statusBadge) {
                    statusBadge.className = 'nhan-trang-thai nguy-hiem';
                    statusBadge.innerHTML = `<i class="fa-solid fa-xmark"></i> Bị từ chối`;
                }
                hienThongBaoNoi("Đã từ chối báo cáo mối nguy và thông báo cho nhân sự hiện trường.", "nguy-hiem");
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