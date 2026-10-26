/**
 * ============================================================================
 * SiteSafe - Hazard Report Application Logic
 * Role: Nhân sự hiện trường (Worker / Safety Inspector)
 * Screen: hazard_create.html (worker-hazard-create.html)
 * Feature: AI-1 Hazard Classifier (Mô phỏng phân loại mối nguy bằng AI)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. DỮ LIỆU CÔNG TRƯỜNG & KHU VỰC (ĐỒNG BỘ VỚI TRANG CHECKLIST)
// ----------------------------------------------------------------------------
const siteSafeProjects = [
    {
        id: 'proj-metro',
        title: 'Dự án Metro Tower - Zone B',
        shortTitle: 'Metro Tower - Khu B',
        zones: [
            'Tầng 12 · Mép sàn phía Đông',
            'Tầng 12 · Khu vực giàn giáo phía Bắc',
            'Zone B · Lối đi hành lang kỹ thuật',
            'Tầng 15 · Hố thang máy số 2',
            'Tầng trệt · Khu vực bốc dỡ vật tư'
        ],
        receivers: [
            'Trần Minh Đức - Giám sát an toàn',
            'Lê Hoàng Nam - Trưởng ban an toàn',
            'Vũ Quốc Anh - Cán bộ kỹ thuật'
        ]
    },
    {
        id: 'proj-landmark',
        title: 'Tòa nhà Landmark Tower - Đống Đa',
        shortTitle: 'Landmark Tower - Khối đế',
        zones: [
            'Khối tháp chính - Tầng 28',
            'Khu vực Gondola mặt ngoài tầng 28',
            'Chân Cần trục tháp C1',
            'Tầng hầm B1 · Trạm biến áp'
        ],
        receivers: [
            'Trần Minh Đức - Giám sát an toàn',
            'Nguyễn Hữu Thắng - Chỉ huy trưởng'
        ]
    },
    {
        id: 'proj-ecogreen',
        title: 'Khu đô thị Eco Green - Block C',
        shortTitle: 'Eco Green - Block C',
        zones: [
            'Khu vực đào móng tầng hầm B2',
            'Mép tường vây Barrette phía Tây',
            'Trạm bơm hạ mực nước ngầm',
            'Đường dốc xe tải chở đất'
        ],
        receivers: [
            'Lê Hoàng Nam - Trưởng ban an toàn',
            'Phạm Tuấn Anh - Kỹ sư an toàn'
        ]
    }
];

// AI Preset Profiles dựa trên từ khóa mô tả
const aiKnowledgeBase = [
    {
        keywords: ['lan can', 'mép sàn', 'ngã', 'rơi', 'mép'],
        hazardType: 'Ngã từ trên cao',
        riskLevel: 'high',
        riskText: 'Rủi ro cao',
        analysis: 'Ảnh cho thấy mép sàn không có lan can. Kết hợp mô tả có người di chuyển gần mép, AI đề xuất mức rủi ro cao do khả năng ngã gây chấn thương nghiêm trọng.',
        recommendation: 'Cô lập khu vực; lắp lan can và kiểm tra trước khi tiếp tục thi công.'
    },
    {
        keywords: ['giàn giáo', 'ống', 'lỏng', 'cố định', 'khung'],
        hazardType: 'Vật thể trên cao không cố định',
        riskLevel: 'high',
        riskText: 'Rủi ro cao',
        analysis: 'Phát hiện ống giàn giáo bị lỏng trong ảnh. Kết hợp khu vực thi công gần lối đi của công nhân, AI đề xuất mức rủi ro cao do nguy cơ vật rơi tự do.',
        recommendation: 'Cô lập khu vực bên dưới; cố định ống giàn giáo và kiểm tra các liên kết trước khi tiếp tục thi công.'
    },
    {
        keywords: ['điện', 'tiếp địa', 'nối đất', 'máy cắt', 'dây', 'tủ điện'],
        hazardType: 'Nguy cơ điện giật & Rò rỉ điện',
        riskLevel: 'high',
        riskText: 'Rủi ro cao',
        analysis: 'Ảnh và mô tả cho thấy thiết bị thiếu dây tiếp địa bảo vệ. Môi trường công trường ẩm ướt dễ dẫn đến nguy cơ điện giật chết người.',
        recommendation: 'Ngắt nguồn điện ngay lập tức; cắm biển cảnh báo và cử thợ điện đấu nối tiếp địa chuẩn trước khi mở máy.'
    },
    {
        keywords: ['cháy', 'bình', 'khói', 'lửa', 'pccc'],
        hazardType: 'Nguy cơ cháy nổ / Thiếu thiết bị PCCC',
        riskLevel: 'med',
        riskText: 'Rủi ro trung bình',
        analysis: 'Thiếu bình chữa cháy tại khu vực có thao tác hàn cắt nhiệt, tiềm ẩn khả năng bùng phát hỏa hoạn cục bộ.',
        recommendation: 'Trang bị ngay 2 bình bọt/khí CO2 và cử người giám sát trực lửa trong suốt ca làm việc.'
    }
];

// ----------------------------------------------------------------------------
// 2. STATE MANAGEMENT
// ----------------------------------------------------------------------------
let currentProjectId = siteSafeProjects[0].id;
let uploadedPhotos = [
    {
        id: 'photo-1',
        name: 'mep-san-tang-12.jpg',
        size: '2,4 MB · 09:15',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=600&auto=format&fit=crop&q=80'
    }
];

// AI States: 'ready' -> 'scanning' -> 'result' -> 'accepted'
let aiCurrentState = 'result'; 
let currentAIResult = {
    hazardType: 'Ngã từ trên cao',
    riskLevel: 'high',
    riskText: 'Rủi ro cao',
    analysis: 'Ảnh cho thấy mép sàn không có lan can. Kết hợp mô tả có người di chuyển gần mép, AI đề xuất mức rủi ro cao do khả năng ngã gây chấn thương nghiêm trọng.',
    recommendation: 'Cô lập khu vực; lắp lan can và kiểm tra trước khi tiếp tục thi công.',
    isAccepted: false
};

// ----------------------------------------------------------------------------
// 3. KHỞI TẠO TRANG & XỬ LÝ LIÊN KẾT CHECKLIST
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const savedProject = localStorage.getItem('sitesafe_current_project');
    if (savedProject) {
        const p = siteSafeProjects.find(x => x.shortTitle === savedProject || x.title === savedProject || savedProject.includes(x.shortTitle));
        if (p) currentProjectId = p.id;
    }
    initCustomDropdowns();
    buildProjectDropdown();
    parseUrlParameters(); // Kiểm tra xem có được gọi từ màn hình Checklist không
    setupEvidenceUpload();
    bindActionEvents();
    renderAIState();
});

/**
 * Đọc tham số URL nếu được chuyển tiếp từ mục Checklist không đạt
 * Ví dụ: hazard_create.html?ref=checklist&item=3&title=Nối đất thiết bị điện&note=Máy cắt B-02 thiếu tiếp địa
 */
function parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const fromChecklist = urlParams.get('from_checklist') || urlParams.get('ref');
    const titleParam = urlParams.get('title');
    const noteParam = urlParams.get('note');
    const zoneParam = urlParams.get('zone');

    if (fromChecklist) {
        showToast('Đã nhận thông tin sự cố từ Danh mục kiểm tra an toàn!');
        if (titleParam) {
            document.getElementById('hazardTitle').value = titleParam;
        }
        if (noteParam) {
            document.getElementById('hazardDesc').value = noteParam;
        }
        if (zoneParam) {
            document.getElementById('selectedZoneText').innerText = zoneParam;
        }

        // Tự động điều chỉnh kết quả AI phù hợp với dữ liệu truyền sang
        generateAIAnalysisResult(noteParam || titleParam || '');
    }
}

// ----------------------------------------------------------------------------
// 4. CUSTOM DROPDOWNS & DỮ LIỆU CÔNG TRƯỜNG
// ----------------------------------------------------------------------------
function initCustomDropdowns() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-dropdown')) {
            document.querySelectorAll('.custom-dropdown').forEach(dd => dd.classList.remove('open'));
        }
    });

    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = dropdown.classList.contains('open');
                document.querySelectorAll('.custom-dropdown').forEach(dd => dd.classList.remove('open'));
                if (!isOpen) {
                    dropdown.classList.add('open');
                }
            });
        }
    });
}

function buildProjectDropdown() {
    const sidebarMenu = document.getElementById('sidebarProjectOptions');
    const desktopMenu = document.getElementById('desktopProjectOptions');
    const mobileMenu = document.getElementById('mobileProjectOptions');
    const drawerMenu = document.getElementById('drawerProjectOptions');

    if (sidebarMenu) sidebarMenu.innerHTML = '';
    if (desktopMenu) desktopMenu.innerHTML = '';
    if (mobileMenu) mobileMenu.innerHTML = '';
    if (drawerMenu) drawerMenu.innerHTML = '';

    siteSafeProjects.forEach(project => {
        const isSelected = project.id === currentProjectId;

        // Item cho Sidebar và Drawer (gọn)
        const createSidebarItem = () => {
            const item = document.createElement('div');
            item.className = `dropdown-item ${isSelected ? 'selected' : ''}`;
            item.innerHTML = `
                <span>${project.shortTitle}</span>
                ${isSelected ? '<i class="fa-solid fa-check check-mark"></i>' : ''}
            `;
            item.addEventListener('click', () => selectProject(project.id));
            return item;
        };

        if (sidebarMenu) sidebarMenu.appendChild(createSidebarItem());
        if (drawerMenu) drawerMenu.appendChild(createSidebarItem());

        // Item cho Desktop Topbar và Mobile Header (chi tiết)
        const createFullItem = () => {
            const item = document.createElement('div');
            item.className = `dropdown-item ${isSelected ? 'selected' : ''}`;
            item.innerHTML = `
                <div>
                    <strong>${project.title}</strong>
                </div>
                ${isSelected ? '<i class="fa-solid fa-check check-mark"></i>' : ''}
            `;
            item.addEventListener('click', () => selectProject(project.id));
            return item;
        };

        if (desktopMenu) desktopMenu.appendChild(createFullItem());
        if (mobileMenu) mobileMenu.appendChild(createFullItem());
    });

    const activeProject = siteSafeProjects.find(p => p.id === currentProjectId);
    if (activeProject) {
        const sidebarTitle = document.getElementById('sidebarProjectTitle');
        const drawerTitle = document.getElementById('drawerProjectTitle');
        const desktopTitle = document.getElementById('desktopProjectTitle');
        const mobileTitle = document.getElementById('mobileProjectNameDisplay');
        const cardProj = document.getElementById('cardProjectName');
        const modalProj = document.getElementById('modalUserProfileProject');

        if (sidebarTitle) sidebarTitle.innerText = activeProject.shortTitle;
        if (drawerTitle) drawerTitle.innerText = activeProject.shortTitle;
        if (desktopTitle) desktopTitle.innerText = activeProject.title;
        if (mobileTitle) mobileTitle.innerText = activeProject.title;
        if (cardProj) cardProj.innerText = activeProject.title;
        if (modalProj) modalProj.innerText = activeProject.title;
    }

    buildZoneDropdown(activeProject);
    buildReceiverDropdown(activeProject);
}

function selectProject(projId) {
    currentProjectId = projId;
    const proj = siteSafeProjects.find(p => p.id === projId);
    if (proj) {
        localStorage.setItem('sitesafe_current_project', proj.shortTitle);
    }
    buildProjectDropdown();
    document.querySelectorAll('.custom-dropdown').forEach(dd => dd.classList.remove('open'));
    showToast(`Đã chuyển công trường: ${proj.title}`);
}

function buildZoneDropdown(project) {
    const zoneOptions = document.getElementById('zoneLocationOptions');
    if (!zoneOptions) return;
    zoneOptions.innerHTML = '';

    project.zones.forEach((zone, idx) => {
        const item = document.createElement('div');
        item.className = `dropdown-item ${idx === 0 ? 'selected' : ''}`;
        item.innerHTML = `<span>${zone}</span>`;
        item.addEventListener('click', () => {
            document.getElementById('selectedZoneText').innerText = zone;
            document.querySelectorAll('#zoneLocationOptions .dropdown-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            document.getElementById('zoneLocationSelect').classList.remove('open');
        });
        zoneOptions.appendChild(item);
    });

    document.getElementById('selectedZoneText').innerText = project.zones[0];
}

function buildReceiverDropdown(project) {
    const receiverOptions = document.getElementById('receiverOptions');
    if (!receiverOptions) return;
    receiverOptions.innerHTML = '';

    project.receivers.forEach((rcv, idx) => {
        const item = document.createElement('div');
        item.className = `dropdown-item ${idx === 0 ? 'selected' : ''}`;
        item.innerHTML = `
            <span>${rcv}</span>
            ${idx === 0 ? '<i class="fa-solid fa-check check-mark"></i>' : ''}
        `;
        item.addEventListener('click', () => {
            document.getElementById('selectedReceiverText').innerText = rcv;
            document.querySelectorAll('#receiverOptions .dropdown-item').forEach(i => {
                i.classList.remove('selected');
                const check = i.querySelector('.check-mark');
                if (check) check.remove();
            });
            item.classList.add('selected');
            item.innerHTML += '<i class="fa-solid fa-check check-mark"></i>';
            document.getElementById('receiverSelect').classList.remove('open');
        });
        receiverOptions.appendChild(item);
    });

    document.getElementById('selectedReceiverText').innerText = project.receivers[0];
}

// ----------------------------------------------------------------------------
// 5. TẢI ẢNH MINH CHỨNG (FILEREADER API)
// ----------------------------------------------------------------------------
function setupEvidenceUpload() {
    const fileInput = document.getElementById('hazardPhotoInput');
    const deleteBtn = document.getElementById('btnDeleteEvidence');

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    const newPhoto = {
                        id: `photo-${Date.now()}`,
                        name: file.name,
                        size: `${(file.size / (1024 * 1024)).toFixed(1).replace('.', ',')} MB · ${getCurrentTimeFormatted()}`,
                        url: evt.target.result
                    };
                    uploadedPhotos = [newPhoto]; // Cho phép ảnh mới thay thế
                    renderEvidenceImages();
                    showToast(`Đã tải ảnh lên: ${file.name}`);

                    // Khi có ảnh mới, kích hoạt gợi ý AI
                    aiCurrentState = 'ready';
                    renderAIState();
                };
                reader.readAsDataURL(file);
            }
            fileInput.value = '';
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            uploadedPhotos = [];
            renderEvidenceImages();
            showToast('Đã xóa ảnh minh chứng.');
        });
    }
}

window.triggerEvidenceUpload = function() {
    const fileInput = document.getElementById('hazardPhotoInput');
    if (fileInput) fileInput.click();
};

function renderEvidenceImages() {
    const container = document.getElementById('uploadedImagesContainer');
    const countBadge = document.getElementById('imageCountText');
    if (!container) return;

    container.innerHTML = '';
    countBadge.innerText = `${uploadedPhotos.length}/5 ảnh`;

    if (uploadedPhotos.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'flex';
    uploadedPhotos.forEach(p => {
        const item = document.createElement('div');
        item.className = 'evidence-image-item';
        item.innerHTML = `
            <div class="evidence-thumb-wrap">
                <img src="${p.url}" alt="Minh chứng" class="evidence-thumb">
            </div>
            <div class="evidence-meta">
                <div class="evidence-filename">${p.name}</div>
                <div class="evidence-details">
                    <span>${p.size}</span>
                    <span class="evidence-status-ok"><i class="fa-solid fa-check"></i> Đã tải lên</span>
                </div>
            </div>
            <button class="btn-delete-evidence" onclick="deleteEvidencePhoto('${p.id}')" title="Xóa ảnh">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        container.appendChild(item);
    });
}

window.deleteEvidencePhoto = function(photoId) {
    uploadedPhotos = uploadedPhotos.filter(p => p.id !== photoId);
    renderEvidenceImages();
    showToast('Đã xóa ảnh minh chứng.');
};

// ----------------------------------------------------------------------------
// 6. AI PHÂN LOẠI MỐI NGUY (AI-1 CLASSIFIER SIMULATION)
// ----------------------------------------------------------------------------
function generateAIAnalysisResult(text) {
    const cleanText = (text || '').trim();
    if (!cleanText || cleanText.length < 10) {
        aiCurrentState = 'insufficient_data';
        currentAIResult = null;
        renderAIState();
        return;
    }

    const lower = cleanText.toLowerCase();
    const matched = aiKnowledgeBase.find(kb => kb.keywords.some(k => lower.includes(k)));

    if (matched) {
        currentAIResult = {
            hazardType: matched.hazardType,
            riskLevel: matched.riskLevel,
            riskText: matched.riskText,
            analysis: matched.analysis,
            recommendation: matched.recommendation,
            isAccepted: false
        };
    } else {
        // Mặc định an toàn
        currentAIResult = {
            hazardType: 'Mối nguy thi công cao tầng',
            riskLevel: 'high',
            riskText: 'Rủi ro cao',
            analysis: 'Dựa trên mô tả hiện trường và phân tích hình ảnh, phát hiện yếu tố mất an toàn cần chấn chỉnh ngay trước khi tiếp tục làm việc.',
            recommendation: 'Tạm dừng công việc tại khu vực; báo giám sát an toàn để lập biên bản kiểm tra.',
            isAccepted: false
        };
    }

    aiCurrentState = 'result';
    renderAIState();
}

/**
 * Render giao diện AI Classifier theo các trạng thái
 */
function renderAIState() {
    const statusSummary = document.getElementById('aiStatusSummary');
    const scanBtn = document.getElementById('btnScanAI');
    const statusPill = document.getElementById('aiStatusPill');
    const skeletonBox = document.getElementById('aiSkeletonLoading');
    const readyBox = document.getElementById('aiReadyScanView');
    const resultContent = document.getElementById('aiResultContent');
    const insufficientBox = document.getElementById('aiInsufficientDataView');
    const btnAccept = document.getElementById('btnAcceptAI');
    const footnote = document.getElementById('aiFootnoteNotice');
    const stickyNotice = document.getElementById('stickyNoticeText');
    const stickyMessage = document.getElementById('stickyWarningMessage');
    const btnSubmit = document.getElementById('btnSubmitHazard');

    // 1. TRẠNG THÁI: SẴN SÀNG QUÉT 
    if (aiCurrentState === 'ready') {
        statusSummary.innerText = 'Quét 1 ảnh và mô tả để nhận gợi ý phân loại.';
        scanBtn.className = 'btn-scan-ai';
        scanBtn.innerHTML = '<i class="fa-solid fa-expand"></i> Quét bằng AI';
        scanBtn.disabled = false;

        statusPill.className = 'ai-status-pill ready';
        statusPill.innerText = 'Sẵn sàng quét';

        skeletonBox.style.display = 'none';
        readyBox.style.display = 'block';
        resultContent.style.display = 'none';
        if (insufficientBox) insufficientBox.style.display = 'none';

        btnAccept.className = 'btn-accept-ai';
        btnAccept.innerHTML = '<i class="fa-solid fa-check"></i> Chấp nhận gợi ý AI';
        btnAccept.disabled = true;
        btnAccept.style.opacity = '0.5';
        btnAccept.style.cursor = '';

        footnote.innerText = 'Chưa có gợi ý AI. Quét ảnh hoặc phân loại thủ công trước khi gửi báo cáo.';
        stickyNotice.innerText = 'Sẵn sàng gửi báo cáo mối nguy.';
        stickyMessage.className = 'sticky-warning-message ready-to-send';
        btnSubmit.className = 'btn-submit-orange enabled';
    }

    // 2. TRẠNG THÁI: ĐANG PHÂN TÍCH VỚI SKELETON 
    else if (aiCurrentState === 'scanning') {
        statusSummary.innerText = 'Đang phân tích 1 ảnh và mô tả hiện trường...';
        scanBtn.className = 'btn-scan-ai scanning';
        scanBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang phân tích...';
        scanBtn.disabled = true;

        statusPill.className = 'ai-status-pill';
        statusPill.innerHTML = '● Đang phân tích';

        skeletonBox.style.display = 'flex';
        readyBox.style.display = 'none';
        resultContent.style.display = 'none';
        if (insufficientBox) insufficientBox.style.display = 'none';

        btnAccept.disabled = true;
        btnAccept.style.opacity = '0.5';
        btnAccept.style.cursor = '';

        footnote.innerText = 'Vui lòng chờ trong giây lát. Bạn có thể kiểm tra và xác nhận gợi ý khi phân tích hoàn tất.';
        stickyNotice.innerText = 'Đang phân tích AI... Bạn vẫn có thể gửi báo cáo ngay.';
        stickyMessage.className = 'sticky-warning-message ready-to-send';
        btnSubmit.className = 'btn-submit-orange enabled';
    }

    // 3. TRẠNG THÁI: CHỜ XÁC NHẬN 
    else if (aiCurrentState === 'result') {
        statusSummary.innerText = 'Đã phân tích 1 ảnh và mô tả hiện trường.';
        scanBtn.className = 'btn-scan-ai';
        scanBtn.innerHTML = '<i class="fa-solid fa-expand"></i> Quét bằng AI';
        scanBtn.disabled = false;

        statusPill.className = 'ai-status-pill';
        statusPill.innerText = 'Chờ bạn xác nhận';

        skeletonBox.style.display = 'none';
        readyBox.style.display = 'none';
        resultContent.style.display = 'flex';
        if (insufficientBox) insufficientBox.style.display = 'none';

        // Đổ dữ liệu kết quả AI nếu có
        if (currentAIResult) {
            document.getElementById('aiHazardTypeTitle').innerText = currentAIResult.hazardType;
            document.getElementById('aiRiskBadge').innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${currentAIResult.riskText}`;
            document.getElementById('aiRiskBadge').className = `risk-badge risk-${currentAIResult.riskLevel}`;
            document.getElementById('aiAnalysisReasoning').innerText = currentAIResult.analysis;
            document.getElementById('aiRecommendationText').innerText = currentAIResult.recommendation;
        }

        btnAccept.className = 'btn-accept-ai';
        btnAccept.innerHTML = '<i class="fa-solid fa-check"></i> Chấp nhận gợi ý AI';
        btnAccept.disabled = false;
        btnAccept.style.opacity = '1';
        btnAccept.style.cursor = '';

        footnote.innerText = 'Gợi ý AI đã sẵn sàng. Bạn có thể xác nhận hoặc chỉnh sửa linh hoạt trước khi gửi.';
        stickyNotice.innerText = 'Sẵn sàng gửi báo cáo mối nguy.';
        stickyMessage.className = 'sticky-warning-message ready-to-send';
        btnSubmit.className = 'btn-submit-orange enabled';
    }

    // 4. TRẠNG THÁI: ĐÃ CHẤP NHẬN GỢI Ý (HUMAN CONFIRMED)
    else if (aiCurrentState === 'accepted') {
        statusSummary.innerText = 'Đã áp dụng kết quả phân loại từ AI.';
        statusPill.className = 'ai-status-pill accepted';
        statusPill.innerHTML = '<i class="fa-solid fa-check"></i> Đã áp dụng';

        skeletonBox.style.display = 'none';
        readyBox.style.display = 'none';
        resultContent.style.display = 'flex';
        if (insufficientBox) insufficientBox.style.display = 'none';

        btnAccept.className = 'btn-accept-ai accepted';
        btnAccept.innerHTML = '<i class="fa-solid fa-check-double"></i> Đã chấp nhận gợi ý';
        btnAccept.style.cursor = '';

        footnote.innerText = 'Đã xác nhận phân loại. Báo cáo đã sẵn sàng để gửi đến giám sát an toàn.';
        stickyNotice.innerText = 'Đã xác nhận phân loại. Sẵn sàng gửi báo cáo.';
        stickyMessage.className = 'sticky-warning-message ready-to-send';
        btnSubmit.className = 'btn-submit-orange enabled';
    }

    // 5. TRẠNG THÁI: KHÔNG ĐỦ DỮ LIỆU ĐỂ PHÂN TÍCH
    else if (aiCurrentState === 'insufficient_data') {
        statusSummary.innerText = 'Chưa thể phân tích: Dữ liệu mô tả quá ít hoặc đang để trống.';
        scanBtn.className = 'btn-scan-ai';
        scanBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Quét lại sau khi nhập';
        scanBtn.disabled = false;

        statusPill.className = 'ai-status-pill warning';
        statusPill.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Thiếu dữ liệu';

        skeletonBox.style.display = 'none';
        readyBox.style.display = 'none';
        resultContent.style.display = 'none';
        if (insufficientBox) insufficientBox.style.display = 'flex';

        btnAccept.className = 'btn-accept-ai disabled';
        btnAccept.innerHTML = '<i class="fa-solid fa-ban"></i> Không có gợi ý AI';
        btnAccept.disabled = true;
        btnAccept.style.opacity = '0.4';
        btnAccept.style.cursor = 'not-allowed';

        footnote.innerText = 'AI không thể đưa ra gợi ý khi thiếu dữ liệu. Bạn có thể bổ sung mô tả hoặc tự chọn phân loại thủ công.';
        stickyNotice.innerText = 'AI chưa có phân loại. Bạn có thể tự phân loại thủ công hoặc bổ sung mô tả.';
        stickyMessage.className = 'sticky-warning-message';
        btnSubmit.className = 'btn-submit-orange enabled';
    }
}

// ----------------------------------------------------------------------------
// 7. SỰ KIỆN TƯƠNG TÁC NGƯỜI DÙNG
// ----------------------------------------------------------------------------
function bindActionEvents() {
    // 1. Bấm nút "Quét bằng AI"
    const btnScan = document.getElementById('btnScanAI');
    if (btnScan) {
        btnScan.addEventListener('click', () => {
            const desc = (document.getElementById('hazardDesc')?.value || '').trim();
            const title = (document.getElementById('hazardTitle')?.value || '').trim();
            const combined = `${title} ${desc}`.trim();

            // Chuyển sang trạng thái quét (skeleton loading)
            aiCurrentState = 'scanning';
            renderAIState();

            // Giả lập xử lý AI trong 1.2 giây
            setTimeout(() => {
                if (!combined || combined.length < 10) {
                    aiCurrentState = 'insufficient_data';
                    currentAIResult = null;
                    renderAIState();

                    const descEl = document.getElementById('aiInsufficientDesc');
                    if (descEl) {
                        if (!combined) {
                            descEl.innerText = 'Ô tiêu đề và mô tả hiện trường đang để trống hoàn toàn. AI không có dữ kiện để nhận diện mối nguy.';
                        } else {
                            descEl.innerText = `Nội dung nhập quá ngắn ("${combined}" - chỉ ${combined.length} ký tự). AI cần tối thiểu 10 ký tự mô tả cụ thể về hiện trạng để nhận diện chính xác.`;
                        }
                    }
                    showToast('Thiếu dữ liệu: Không đủ thông tin để AI đưa ra gợi ý phân loại!', 'warning');
                } else {
                    generateAIAnalysisResult(combined);
                    showToast('AI đã hoàn tất phân tích hình ảnh và hiện trạng!');
                }
            }, 1200);
        });
    }

    // 1b. Nút tiện ích test: Xóa nhanh dữ liệu để thử trường hợp thiếu thông tin
    const btnTestClear = document.getElementById('btnTestClearData');
    if (btnTestClear) {
        btnTestClear.addEventListener('click', () => {
            const titleInput = document.getElementById('hazardTitle');
            const descInput = document.getElementById('hazardDesc');
            if (titleInput) titleInput.value = '';
            if (descInput) {
                descInput.value = '';
                descInput.focus();
            }
            aiCurrentState = 'ready';
            renderAIState();
            showToast('Đã xóa trắng thông tin! Nhấn "Quét bằng AI" để kiểm tra phản hồi thiếu dữ liệu.', 'warning');
        });
    }

    // 1c. Nút "Điền mô tả mẫu để thử lại" trong thông báo thiếu dữ liệu
    const btnFillSample = document.getElementById('btnFillSampleDesc');
    if (btnFillSample) {
        btnFillSample.addEventListener('click', () => {
            const titleInput = document.getElementById('hazardTitle');
            const descInput = document.getElementById('hazardDesc');
            if (titleInput) titleInput.value = 'Thiếu lan can an toàn tại mép sàn';
            if (descInput) descInput.value = 'Mép sàn phía Đông tầng 12 chưa có lan can bảo vệ. Công nhân đang di chuyển gần khu vực hở, có nguy cơ ngã từ độ cao.';

            showToast('Đã điền mô tả mẫu! Đang quét lại bằng AI...');
            aiCurrentState = 'scanning';
            renderAIState();

            setTimeout(() => {
                generateAIAnalysisResult(`${titleInput.value} ${descInput.value}`);
                showToast('AI đã hoàn tất phân tích từ dữ liệu mẫu!');
            }, 1200);
        });
    }

    // 1d. Nút "Tự phân loại thủ công" từ hộp thoại thiếu dữ liệu
    const btnManualFromEmpty = document.getElementById('btnManualFromEmpty');
    const modal = document.getElementById('manualEditModal');
    if (btnManualFromEmpty && modal) {
        btnManualFromEmpty.addEventListener('click', () => {
            document.getElementById('modalHazardTypeInput').value = 'Ngã từ trên cao';
            document.getElementById('modalRiskLevelSelect').value = 'high';
            document.getElementById('modalRecommendationInput').value = 'Cô lập khu vực và bổ sung biện pháp rào chắn an toàn.';
            modal.classList.add('active');
        });
    }

    // 2. Bấm nút "Chấp nhận gợi ý AI"
    const btnAccept = document.getElementById('btnAcceptAI');
    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            if (aiCurrentState === 'result' || aiCurrentState === 'scanning') {
                if (currentAIResult) currentAIResult.isAccepted = true;
                aiCurrentState = 'accepted';
                renderAIState();
                showToast('Đã xác nhận áp dụng phân loại của AI vào báo cáo!');
            }
        });
    }

    // 3. Bấm nút "Chỉnh sửa thủ công"
    const btnManual = document.getElementById('btnManualEdit');
    const btnCloseModal = document.getElementById('btnCloseEditModal');
    const btnCancel = document.getElementById('btnCancelEdit');
    const btnSaveEdit = document.getElementById('btnSaveManualEdit');

    if (btnManual && modal) {
        btnManual.addEventListener('click', () => {
            document.getElementById('modalHazardTypeInput').value = currentAIResult?.hazardType || 'Ngã từ trên cao';
            document.getElementById('modalRiskLevelSelect').value = currentAIResult?.riskLevel || 'high';
            document.getElementById('modalRecommendationInput').value = currentAIResult?.recommendation || 'Cô lập khu vực và kiểm tra an toàn trước khi thi công.';
            modal.classList.add('active');
        });

        const closeModal = () => modal.classList.remove('active');
        if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
        if (btnCancel) btnCancel.addEventListener('click', closeModal);

        if (btnSaveEdit) {
            btnSaveEdit.addEventListener('click', () => {
                const newType = document.getElementById('modalHazardTypeInput').value;
                const newRisk = document.getElementById('modalRiskLevelSelect').value;
                const newRec = document.getElementById('modalRecommendationInput').value;

                if (!currentAIResult) {
                    currentAIResult = {};
                }
                currentAIResult.hazardType = newType;
                currentAIResult.riskLevel = newRisk;
                currentAIResult.riskText = newRisk === 'high' ? 'Rủi ro cao' : (newRisk === 'med' ? 'Rủi ro trung bình' : 'Rủi ro thấp');
                currentAIResult.recommendation = newRec;
                currentAIResult.analysis = `Người dùng đã hiệu chỉnh phân loại: ${newType} (${currentAIResult.riskText}).`;
                currentAIResult.isAccepted = true;

                aiCurrentState = 'accepted';
                renderAIState();
                closeModal();
                showToast('Đã lưu chỉnh sửa phân loại thủ công!');
            });
        }
    }

    // 4. Bấm nút "Gửi báo cáo"
    const btnSubmit = document.getElementById('btnSubmitHazard');
    if (btnSubmit) {
        btnSubmit.addEventListener('click', handleSubmitHazardReport);
    }

    // =========================================================================
    // 5. MOBILE NAVIGATION DRAWER 
    // =========================================================================
    const btnMobileNavToggle = document.getElementById('btnMobileNavToggle');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const btnCloseNavDrawer = document.getElementById('btnCloseNavDrawer');

    const openMobileNavDrawer = () => {
        if (mobileNavBackdrop) {
            mobileNavBackdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeMobileNavDrawer = () => {
        if (mobileNavBackdrop) {
            mobileNavBackdrop.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    if (btnMobileNavToggle) {
        btnMobileNavToggle.addEventListener('click', openMobileNavDrawer);
    }
    if (btnCloseNavDrawer) {
        btnCloseNavDrawer.addEventListener('click', closeMobileNavDrawer);
    }
    if (mobileNavBackdrop) {
        mobileNavBackdrop.addEventListener('click', (e) => {
            if (e.target === mobileNavBackdrop) closeMobileNavDrawer();
        });
    }

    // =========================================================================
    // 6. USER PROFILE SUMMARY MODAL 
    // =========================================================================
    const userProfileBrief = document.getElementById('userProfileBrief');
    const btnMobileUser = document.getElementById('btnMobileUser');
    const btnDrawerOpenProfile = document.getElementById('btnDrawerOpenProfile');
    const userProfileModalBackdrop = document.getElementById('userProfileModalBackdrop');
    const btnCloseUserProfileModal = document.getElementById('btnCloseUserProfileModal');
    const btnModalCloseSecondary = document.getElementById('btnModalCloseSecondary');
    const btnModalLogout = document.getElementById('btnModalLogout');
    const btnLogout = document.getElementById('btnLogout');

    const openUserProfileModal = () => {
        closeMobileNavDrawer();
        if (userProfileModalBackdrop) {
            userProfileModalBackdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeUserProfileModal = () => {
        if (userProfileModalBackdrop) {
            userProfileModalBackdrop.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    if (userProfileBrief) {
        userProfileBrief.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../../share/profile/profile.html?role=worker';
        });
    }
    const drawerUserProfileBrief = document.getElementById('drawerUserProfileBrief');
    if (drawerUserProfileBrief) {
        drawerUserProfileBrief.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../../share/profile/profile.html?role=worker';
        });
    }
    const btnMobileUserProfile = document.getElementById('btnMobileUserProfile');
    if (btnMobileUserProfile) {
        btnMobileUserProfile.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../../share/profile/profile.html?role=worker';
        });
    }
    if (btnMobileUser) {
        btnMobileUser.addEventListener('click', openUserProfileModal);
    }
    if (btnDrawerOpenProfile) {
        btnDrawerOpenProfile.addEventListener('click', openUserProfileModal);
    }
    if (btnCloseUserProfileModal) {
        btnCloseUserProfileModal.addEventListener('click', closeUserProfileModal);
    }
    if (btnModalCloseSecondary) {
        btnModalCloseSecondary.addEventListener('click', closeUserProfileModal);
    }
    if (userProfileModalBackdrop) {
        userProfileModalBackdrop.addEventListener('click', (e) => {
            if (e.target === userProfileModalBackdrop) closeUserProfileModal();
        });
    }

    const handleLogout = (e) => {
        if (e) e.preventDefault();
        try {
            sessionStorage.clear();
            localStorage.removeItem('currentUser');
        } catch (err) {}
        window.location.href = '../../share/login/login.html';
    };

    if (btnModalLogout) {
        btnModalLogout.addEventListener('click', handleLogout);
    }
    if (btnLogout) {
        btnLogout.addEventListener('click', handleLogout);
    }

    // Nút chuông thông báo trên Mobile Header
    const btnMobileNotification = document.getElementById('btnMobileNotification');
    if (btnMobileNotification) {
        btnMobileNotification.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../../share/notifications/notifications.html?role=worker';
        });
    }

    // Nút thông tin chi tiết trong Drawer Menu
    const btnDrawerAccountDetail = document.getElementById('btnDrawerAccountDetail');
    if (btnDrawerAccountDetail) {
        btnDrawerAccountDetail.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../../share/profile/profile.html?role=worker';
        });
    }

    const btnDrawerLogout = document.getElementById('btnDrawerLogout');
    if (btnDrawerLogout) {
        btnDrawerLogout.addEventListener('click', handleLogout);
    }

    // =========================================================================
    // 7. BỘ CHỌN NGÀY & GIỜ PHÁT HIỆN ĐỒNG BỘ GIAO DIỆN SITESAFE
    // =========================================================================
    const btnToggleDatetime = document.getElementById('btnToggleDatetimePicker');
    const datetimePopover = document.getElementById('datetimePopover');
    const btnCloseDatetime = document.getElementById('btnCloseDatetimePopover');
    const btnCancelDatetime = document.getElementById('btnCancelDatetimePopover');
    const btnApplyDatetime = document.getElementById('btnApplyDatetimePopover');
    const popoverDate = document.getElementById('popoverDateInput');
    const popoverTime = document.getElementById('popoverTimeInput');
    const hazardTimeInput = document.getElementById('hazardTime');

    const openDatetimePopover = () => {
        if (datetimePopover) {
            datetimePopover.classList.add('open');
        }
    };

    const closeDatetimePopover = () => {
        if (datetimePopover) {
            datetimePopover.classList.remove('open');
        }
    };

    if (btnToggleDatetime) {
        btnToggleDatetime.addEventListener('click', (e) => {
            e.stopPropagation();
            if (datetimePopover && datetimePopover.classList.contains('open')) {
                closeDatetimePopover();
            } else {
                openDatetimePopover();
            }
        });
    }

    if (btnCloseDatetime) btnCloseDatetime.addEventListener('click', closeDatetimePopover);
    if (btnCancelDatetime) btnCancelDatetime.addEventListener('click', closeDatetimePopover);

    // Click bên ngoài popover để đóng
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#datetimeInputWrapper') && datetimePopover) {
            closeDatetimePopover();
        }
    });

    // Preset "Bây giờ"
    const btnPresetNow = document.getElementById('btnPresetNow');
    if (btnPresetNow) {
        btnPresetNow.addEventListener('click', () => {
            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            const hh = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            if (popoverDate) popoverDate.value = `${yyyy}-${mm}-${dd}`;
            if (popoverTime) popoverTime.value = `${hh}:${min}`;
        });
    }

    // Preset "Đầu ca (07:00)"
    const btnPresetShift = document.getElementById('btnPresetShift');
    if (btnPresetShift) {
        btnPresetShift.addEventListener('click', () => {
            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            if (popoverDate) popoverDate.value = `${yyyy}-${mm}-${dd}`;
            if (popoverTime) popoverTime.value = '07:00';
        });
    }

    // Preset "Hôm qua"
    const btnPresetYesterday = document.getElementById('btnPresetYesterday');
    if (btnPresetYesterday) {
        btnPresetYesterday.addEventListener('click', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yyyy = yesterday.getFullYear();
            const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
            const dd = String(yesterday.getDate()).padStart(2, '0');
            if (popoverDate) popoverDate.value = `${yyyy}-${mm}-${dd}`;
        });
    }

    // Xác nhận chọn ngày & giờ từ popover
    if (btnApplyDatetime) {
        btnApplyDatetime.addEventListener('click', () => {
            const dateVal = popoverDate ? popoverDate.value : '';
            const timeVal = popoverTime ? popoverTime.value : '';
            if (dateVal && timeVal) {
                const parts = dateVal.split('-');
                const formatted = `${parts[2]}/${parts[1]}/${parts[0]} · ${timeVal}`;
                if (hazardTimeInput) {
                    hazardTimeInput.value = formatted;
                }
                showToast(`Đã chọn thời gian: ${formatted}`);
            }
            closeDatetimePopover();
        });
    }
}

// ----------------------------------------------------------------------------
// 8. LƯU BÁO CÁO MỐI NGUY VÀO LOCALSTORAGE
// ----------------------------------------------------------------------------
function handleSubmitHazardReport() {
    let title = document.getElementById('hazardTitle')?.value?.trim();
    const zone = document.getElementById('selectedZoneText')?.innerText || 'Zone B - Tầng 3';
    let time = document.getElementById('hazardTime')?.value;
    let desc = document.getElementById('hazardDesc')?.value?.trim();
    let action = document.getElementById('actionTaken')?.value?.trim() || '';
    const receiver = document.getElementById('selectedReceiverText')?.innerText || 'Trần Nam (Cán bộ an toàn)';

    // Linh động tự sinh nếu người dùng chưa nhập
    if (!title) {
        title = `Mối nguy an toàn tại ${zone}`;
        const inputTitle = document.getElementById('hazardTitle');
        if (inputTitle) inputTitle.value = title;
    }
    if (!desc) {
        desc = `Ghi nhận hiện trường thi công tại ${zone}. Cần kiểm tra và giám sát điều kiện an toàn lao động.`;
        const inputDesc = document.getElementById('hazardDesc');
        if (inputDesc) inputDesc.value = desc;
    }
    if (!time) {
        time = new Date().toISOString().slice(0, 16);
    }

    // Đảm bảo có phân loại AI linh động (hoặc ghi chú chưa phân loại nếu thiếu dữ liệu)
    const aiResult = currentAIResult || {
        hazardType: 'Chưa phân loại (Thiếu mô tả)',
        riskLevel: 'med',
        riskText: 'Chờ đánh giá',
        recommendation: 'Cần bổ sung thông tin hiện trường và khảo sát trực tiếp trước khi xử lý.'
    };

    // Đóng gói báo cáo mối nguy
    const hazardRecord = {
        id: `HAZARD-${Date.now()}`,
        projectId: currentProjectId,
        title: title,
        zone: zone,
        time: time,
        description: desc,
        actionTaken: action,
        receiver: receiver,
        reporter: 'Nguyễn Văn Minh - Tổ thi công',
        aiClassification: {
            hazardType: aiResult.hazardType || 'An toàn thi công',
            riskLevel: aiResult.riskLevel || 'medium',
            riskText: aiResult.riskText || 'Trung bình',
            recommendation: aiResult.recommendation || 'Kiểm tra hiện trường'
        },
        photos: uploadedPhotos.length > 0 ? uploadedPhotos : ['image_e4fc7a30.jpg'],
        status: 'Chờ duyệt', // Trạng thái chuyển sang cho Cán bộ an toàn
        createdAt: new Date().toISOString()
    };

    // 1. Lưu vào danh sách mối nguy của tôi
    saveToMyHazardsStorage(hazardRecord);

    // 2. Lưu vào bảng mối nguy chung để Cán bộ an toàn & Quản lý đọc
    saveToGlobalHazardsStorage(hazardRecord);

    // Cập nhật giao diện
    const mobileBadge = document.getElementById('mobileDraftBadge');
    const desktopBadge = document.getElementById('desktopDraftBadge');
    if (mobileBadge) {
        mobileBadge.innerText = 'Đã gửi';
        mobileBadge.className = 'status-pill-badge submitted';
    }
    if (desktopBadge) {
        desktopBadge.innerText = 'Đã gửi';
        desktopBadge.className = 'status-pill-badge submitted';
    }

    const stickyNotice = document.getElementById('stickyNoticeText');
    if (stickyNotice) stickyNotice.innerText = 'Đã gửi báo cáo thành công đến Cán bộ an toàn.';

    showToast('Đã gửi báo cáo mối nguy thành công đến Cán bộ an toàn!', 'success');

    // Tự động hỏi người dùng có muốn xem danh sách mối nguy không
    setTimeout(() => {
        if (confirm('Báo cáo đã gửi thành công! Bạn có muốn xem danh sách tại trang "Mối nguy của tôi" không?')) {
            window.location.href = '../my_hazard/worker-my-hazard.html';
        }
    }, 800);
}

function saveToMyHazardsStorage(record) {
    const key = 'sitesafe_my_hazards';
    let list = [];
    try {
        const stored = localStorage.getItem(key);
        if (stored) list = JSON.parse(stored);
    } catch (e) { list = []; }
    list.unshift(record);
    localStorage.setItem(key, JSON.stringify(list));
}

function saveToGlobalHazardsStorage(record) {
    const key = 'sitesafe_all_hazards';
    let list = [];
    try {
        const stored = localStorage.getItem(key);
        if (stored) list = JSON.parse(stored);
    } catch (e) { list = []; }
    list.unshift(record);
    localStorage.setItem(key, JSON.stringify(list));
}

// ----------------------------------------------------------------------------
// 9. HELPER UTILS & TOAST
// ----------------------------------------------------------------------------
function getCurrentTimeFormatted() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    if (type === 'warning') {
        toast.className = 'toast-notification show warning';
        if (toastIcon) toastIcon.className = 'fa-solid fa-triangle-exclamation toast-icon';
    } else {
        toast.className = 'toast-notification show';
        if (toastIcon) toastIcon.className = 'fa-solid fa-circle-check toast-icon';
    }

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

