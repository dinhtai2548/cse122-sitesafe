document.addEventListener('DOMContentLoaded', () => {
    const duLieuKhuVuc = {
        A: {
            ma: 'A',
            ten: 'Zone A',
            tenDayDu: 'Zone A - Kho vật liệu',
            tenNgan: 'Kho vật liệu',
            diemGoc: 55,
            trangThaiMacDinh: 'Trung bình',
            mauSac: 'cam',
            danhSachSuCo: [
                {
                    id: 'A-102',
                    tieuDe: 'Vật liệu cản trở lối đi chung',
                    ma: 'A-102 · 09:10 · Nguyễn Kỳ · Đội kho',
                    mucDo: 'Trung bình',
                    trangThai: 'Đang xử lý',
                    loaiMau: 'cam',
                    moTa: 'Kiện hàng xếp tràn ra hành lang vận chuyển, cần bố trí lại pallet.'
                }
            ],
            khuyenNghiAI: {
                tieuDe: 'Sắp xếp lại hàng lang kho vật tư',
                moTa: 'Kiểm tra độ cao xếp dỡ pallet và giải tỏa lối đi trước ca chiều.',
                doiPhuTrach: 'Đội Kho vận · Trong ca sáng'
            }
        },
        B: {
            ma: 'B',
            ten: 'Zone B',
            tenDayDu: 'Zone B - Hố đào & móng',
            tenNgan: 'Hố đào & móng',
            diemGoc: 82,
            trangThaiMacDinh: 'Rủi ro cao',
            mauSac: 'do',
            danhSachSuCo: [
                {
                    id: 'B-129',
                    tieuDe: 'Hệ thống dây điện chưa nối đất',
                    ma: 'B-129 · 08:42 · Phạm Tuấn · Đội M&E',
                    mucDo: 'Cao',
                    trangThai: 'Chưa xử lý',
                    loaiMau: 'do',
                    moTa: 'Tuyến cáp nguồn máy bơm nước ngầm thiếu dây tiếp địa bảo vệ.'
                },
                {
                    id: 'B-130',
                    tieuDe: 'Cáp điện đặt tại lối đi',
                    ma: 'B-130 · 09:15 · Trần Hùng · Đội cẩu',
                    mucDo: 'Cao',
                    trangThai: 'Đang xử lý',
                    loaiMau: 'cam',
                    moTa: 'Dây cáp vắt ngang lối di chuyển của xe xúc, có nguy cơ cán rách vỏ bọc.'
                },
                {
                    id: 'B-132',
                    tieuDe: 'Tủ điện thiếu nắp bảo vệ',
                    ma: 'B-132 · 09:48 · Lê Hoàng · Đội kết cấu',
                    mucDo: 'Cao',
                    trangThai: 'Chưa xử lý',
                    loaiMau: 'do',
                    moTa: 'Cửa tủ điện tạm bị gãy chốt, hở thanh cái dẫn điện ngoài trời.'
                }
            ],
            khuyenNghiAI: {
                tieuDe: 'Tăng cường 1 cán bộ HSE giám sát Zone B',
                moTa: 'Tập trung kiểm tra hệ thống dây điện, lối đi và tủ điện trước khi cho phép thi công.',
                doiPhuTrach: 'Đội HSE · Ngay trong ca'
            }
        },
        C: {
            ma: 'C',
            ten: 'Zone C',
            tenDayDu: 'Zone C - Gia công',
            tenNgan: 'Gia công',
            diemGoc: 15,
            trangThaiMacDinh: 'An toàn',
            mauSac: 'xanh',
            danhSachSuCo: [],
            khuyenNghiAI: {
                tieuDe: 'Duy trì tuần tra an toàn xưởng thép',
                moTa: 'Tiếp tục giám sát trang bị kính bảo hộ và găng tay khi cắt uốn thép.',
                doiPhuTrach: 'Đội Giám sát · Định kỳ'
            }
        },
        D: {
            ma: 'D',
            ten: 'Zone D',
            tenDayDu: 'Zone D - Văn phòng / HSE',
            tenNgan: 'Văn phòng / HSE',
            diemGoc: 8,
            trangThaiMacDinh: 'An toàn',
            mauSac: 'xanh',
            danhSachSuCo: [],
            khuyenNghiAI: {
                tieuDe: 'Đảm bảo thông thoáng lối thoát hiểm',
                moTa: 'Khu vực văn phòng chỉ huy đạt chuẩn, kiểm tra bổ sung bình chữa cháy CO2.',
                doiPhuTrach: 'HSE Văn phòng · Định kỳ'
            }
        },
    };

    let zoneHienTai = 'B'; 

    const cacKhuVucZone = document.querySelectorAll('.khu-vuc-zone');
    const hopThoaiChiTiet = document.getElementById('hopThoaiChiTietZone');
    const nutDongChiTiet = document.getElementById('nutDongPopupZone');
    const tieuDePopup = document.getElementById('tieuDePopupZone');
    const huyHieuRuiRo = document.getElementById('huyHieuRuiRoZone');
    const chuThichPhu = document.getElementById('chuThichPhuZone');
    const danhSachSuCo = document.getElementById('danhSachSuCoPopup');
    const nutGiaoXuLy = document.getElementById('nutGiaoXuLySuCo');
    const nhanTrangThaiChon = document.getElementById('nhanTrangThaiChonZone');

    const aiTieuDeCanhBao = document.getElementById('aiTieuDeCanhBao');
    const aiMoTaCanhBao = document.getElementById('aiMoTaCanhBao');
    const aiDiemRuiRoSo = document.getElementById('aiDiemRuiRoSo');
    const aiTieuDeBieuDo = document.getElementById('aiTieuDeBieuDo');
    const aiBienDongDiem = document.getElementById('aiBienDongDiem');
    const aiMoTaXuHuong = document.getElementById('aiMoTaXuHuong');
    const aiHanhDongDeXuat = document.getElementById('aiHanhDongDeXuat');
    const aiMoTaHanhDong = document.getElementById('aiMoTaHanhDong');
    const aiDoiPhuTrach = document.getElementById('aiDoiPhuTrach');
    const duongDoThiCam = document.getElementById('duongDoThiCam');
    const duongVungDienTich = document.getElementById('duongVungDienTich');
    const diemNutCuoi = document.getElementById('diemNutCuoi');
    const chuSoNutCuoi = document.getElementById('chuSoNutCuoi');

    const soKhuVucEl = document.getElementById('soKhuVuc');
    const soDiemNongEl = document.getElementById('soDiemNong');
    const chuThichDiemNongEl = document.getElementById('chuThichDiemNong');
    const soSuCoMoEl = document.getElementById('soSuCoMo');
    const chuThichSuCoMoEl = document.getElementById('chuThichSuCoMo');
    const soKhuVucAnToanEl = document.getElementById('soKhuVucAnToan');
    const chuThichAnToanEl = document.getElementById('chuThichAnToan');

    const thongBaoToast = document.getElementById('thongBaoToast');
    const noiDungToast = document.getElementById('noiDungToast');
    let toastTimeout;

    function hienToast(tinNhan) {
        if (!thongBaoToast) return;
        noiDungToast.textContent = tinNhan;
        thongBaoToast.classList.add('hien-thi');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            thongBaoToast.classList.remove('hien-thi');
        }, 3500);
    }

    function tinhDiemRuiRoZone(maZone) {
        const zone = duLieuKhuVuc[maZone];
        if (!zone) return 0;
        
        let diemThem = 0;
        zone.danhSachSuCo.forEach(sc => {
            if (sc.trangThai !== 'Đã khắc phục') {
                if (sc.mucDo === 'Cao') diemThem += 14;
                else if (sc.mucDo === 'Trung bình') diemThem += 7;
                else diemThem += 2;
            }
        });

        let tongDiem = Math.min(100, Math.max(5, zone.diemGoc + diemThem));
        if (zone.danhSachSuCo.length === 0) {
            tongDiem = zone.diemGoc;
        }
        return tongDiem;
    }

    function capNhatCacTheThongKe() {
        let tongSuCo = 0;
        let tongSuCoCao = 0;
        let tongSuCoTrungBinh = 0;
        let soDiemNong = 0;
        let tenCacDiemNong = [];
        let soAnToan = 0;
        let tenCacKhuAnToan = [];

        Object.values(duLieuKhuVuc).forEach(zone => {
            const diem = tinhDiemRuiRoZone(zone.ma);
            const soSuCoZone = zone.danhSachSuCo.filter(s => s.trangThai !== 'Đã khắc phục').length;
            tongSuCo += soSuCoZone;

            zone.danhSachSuCo.forEach(sc => {
                if (sc.trangThai !== 'Đã khắc phục') {
                    if (sc.mucDo === 'Cao') tongSuCoCao++;
                    else if (sc.mucDo === 'Trung bình') tongSuCoTrungBinh++;
                }
            });

            if (diem >= 70 || soSuCoZone >= 2) {
                soDiemNong++;
                tenCacDiemNong.push(`${zone.ten} · ${soSuCoZone} mối nguy`);
            }

            if (soSuCoZone === 0) {
                soAnToan++;
                tenCacKhuAnToan.push(zone.ten);
            }
        });

        if (soDiemNongEl) soDiemNongEl.textContent = String(soDiemNong).padStart(2, '0');
        if (chuThichDiemNongEl) {
            chuThichDiemNongEl.textContent = tenCacDiemNong.length > 0 
                ? tenCacDiemNong.join(', ') 
                : 'Không có điểm nóng nguy hiểm';
        }

        if (soSuCoMoEl) soSuCoMoEl.textContent = String(tongSuCo).padStart(2, '0');
        if (chuThichSuCoMoEl) {
            chuThichSuCoMoEl.textContent = `${tongSuCoCao} cao · ${tongSuCoTrungBinh} trung bình`;
        }

        if (soKhuVucAnToanEl) soKhuVucAnToanEl.textContent = String(soAnToan).padStart(2, '0');
        if (chuThichAnToanEl) {
            chuThichAnToanEl.textContent = tenCacKhuAnToan.length > 0
                ? `${tenCacKhuAnToan.join(', ')} · Không có mối nguy`
                : 'Cần rà soát toàn bộ các khu';
        }

        const soLuongMoiNguyXuat = document.getElementById('soLuongMoiNguyXuat');
        if (soLuongMoiNguyXuat) soLuongMoiNguyXuat.textContent = tongSuCo;
    }

    function capNhatGiaoDienZoneTrenBanDo(maZone) {
        const zone = duLieuKhuVuc[maZone];
        if (!zone) return;

        const elZone = document.querySelector(`.khu-vuc-zone[data-zone="${maZone}"]`);
        if (!elZone) return;

        const diem = tinhDiemRuiRoZone(maZone);
        const soLuong = zone.danhSachSuCo.filter(s => s.trangThai !== 'Đã khắc phục').length;

        const trangThaiEl = elZone.querySelector('.trang-thai-zone');
        if (trangThaiEl) {
            if (diem >= 70) {
                trangThaiEl.className = 'trang-thai-zone mau-do';
                trangThaiEl.textContent = `Rủi ro cao · ${soLuong} sự cố`;
            } else if (diem >= 40) {
                trangThaiEl.className = 'trang-thai-zone mau-cam';
                trangThaiEl.textContent = `Trung bình · ${soLuong} sự cố`;
            } else {
                trangThaiEl.className = 'trang-thai-zone mau-xanh';
                trangThaiEl.textContent = `An toàn · 0 sự cố`;
            }
        }

        const diemNhietEl = elZone.querySelector('.diem-nhiet');
        if (soLuong > 0) {
            if (diemNhietEl) {
                diemNhietEl.style.display = 'flex';
                diemNhietEl.querySelector('.con-so-su-co').textContent = soLuong;
                diemNhietEl.className = `diem-nhiet ${diem >= 70 ? 'diem-nhiet-do' : 'diem-nhiet-cam'}`;
                const vongSong = diemNhietEl.querySelector('.vong-song-nhiet');
                if (vongSong) {
                    vongSong.className = `vong-song-nhiet ${diem >= 70 ? 'do' : 'cam'}`;
                }
            }
        } else if (diemNhietEl) {
            diemNhietEl.style.display = 'none';
        }
    }

    function capNhatPhanTichAI(maZone) {
        const zone = duLieuKhuVuc[maZone];
        if (!zone) return;

        const diem = tinhDiemRuiRoZone(maZone);
        const soSuCo = zone.danhSachSuCo.filter(s => s.trangThai !== 'Đã khắc phục').length;
        const suCoCao = zone.danhSachSuCo.filter(s => s.mucDo === 'Cao' && s.trangThai !== 'Đã khắc phục').length;

        if (aiDiemRuiRoSo) {
            aiDiemRuiRoSo.textContent = diem;
            aiDiemRuiRoSo.className = `so-diem-lon ${diem >= 70 ? 'mau-do' : diem >= 40 ? 'mau-cam' : 'mau-xanh'}`;
        }

        if (aiTieuDeCanhBao) {
            if (soSuCo > 0) {
                const suCoDau = zone.danhSachSuCo[0].tieuDe.toLowerCase();
                aiTieuDeCanhBao.textContent = `${zone.ten} có tỷ lệ tái diễn mối nguy cao hơn 35% do ${suCoDau}`;
            } else {
                aiTieuDeCanhBao.textContent = `${zone.ten} hiện đang đạt tiêu chuẩn an toàn hiện trường`;
            }
        }

        if (aiMoTaCanhBao) {
            if (soSuCo > 0) {
                aiMoTaCanhBao.textContent = `${soSuCo} sự cố đang mở tại ${zone.ten} cần được xử lý ngay trong ca sáng để giảm nguy cơ tai nạn điện và va chạm.`;
            } else {
                aiMoTaCanhBao.textContent = `Chưa ghi nhận sự cố mất an toàn lao động tại khu vực này. Tiếp tục duy trì quy trình kiểm soát định kỳ.`;
            }
        }

        if (aiTieuDeBieuDo) {
            aiTieuDeBieuDo.textContent = `Xu hướng rủi ro · ${zone.ten}`;
        }

        const chenhLech = diem - zone.diemGoc;
        if (aiBienDongDiem) {
            if (chenhLech > 0) {
                aiBienDongDiem.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> ↑ ${chenhLech} điểm`;
                aiBienDongDiem.className = 'huy-hieu-tang-truong';
                aiBienDongDiem.style.color = '#dc2626';
                aiBienDongDiem.style.backgroundColor = '#fee2e2';
            } else if (chenhLech < 0) {
                aiBienDongDiem.innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i> ↓ ${Math.abs(chenhLech)} điểm`;
                aiBienDongDiem.className = 'huy-hieu-tang-truong';
                aiBienDongDiem.style.color = '#059669';
                aiBienDongDiem.style.backgroundColor = '#d1fae5';
            } else {
                aiBienDongDiem.innerHTML = `Ổn định`;
                aiBienDongDiem.className = 'huy-hieu-tang-truong';
                aiBienDongDiem.style.color = '#64748b';
                aiBienDongDiem.style.backgroundColor = '#f1f5f9';
            }
        }

        if (aiMoTaXuHuong) {
            aiMoTaXuHuong.textContent = soSuCo > 0
                ? `Tăng từ 61 lên ${diem} trong 90 phút, sau ${soSuCo} sự cố tại ${zone.ten}.`
                : `Mức rủi ro duy trì ở ngưỡng thấp (${diem}/100) qua các mốc giám sát.`;
        }

        const Y_cuoi = Math.round(100 - (diem / 100) * 85);
        if (duongDoThiCam && duongVungDienTich && diemNutCuoi && chuSoNutCuoi) {
            duongDoThiCam.setAttribute('d', `M 35 75 Q 85 73, 135 75 T 185 58 T 235 44 T 285 ${Y_cuoi}`);
            duongVungDienTich.setAttribute('d', `M 35 75 L 85 73 L 135 75 L 185 58 L 235 44 L 285 ${Y_cuoi} L 285 100 L 35 100 Z`);
            diemNutCuoi.setAttribute('cy', Y_cuoi);
            chuSoNutCuoi.setAttribute('y', Y_cuoi - 9);
            chuSoNutCuoi.textContent = diem;

            if (diem >= 70) {
                diemNutCuoi.style.fill = '#e11d48';
                chuSoNutCuoi.style.fill = '#e11d48';
            } else if (diem >= 40) {
                diemNutCuoi.style.fill = '#ff790b';
                chuSoNutCuoi.style.fill = '#ff790b';
            } else {
                diemNutCuoi.style.fill = '#10b981';
                chuSoNutCuoi.style.fill = '#10b981';
            }
        }

        if (aiHanhDongDeXuat && zone.khuyenNghiAI) {
            aiHanhDongDeXuat.textContent = zone.khuyenNghiAI.tieuDe;
            aiMoTaHanhDong.textContent = zone.khuyenNghiAI.moTa;
            aiDoiPhuTrach.textContent = zone.khuyenNghiAI.doiPhuTrach;
        }

        const caUuTien = document.getElementById('caUuTien');
        const caMoTaUuTien = document.getElementById('caMoTaUuTien');
        if (caUuTien && caMoTaUuTien) {
            if (soSuCo > 0) {
                caUuTien.textContent = `${zone.ten} · ${soSuCo} sự cố cần xử lý`;
                caMoTaUuTien.textContent = `${zone.danhSachSuCo[0].tieuDe} là nguyên nhân chính.`;
            } else {
                caUuTien.textContent = `${zone.ten} · Không có sự cố tồn đọng`;
                caMoTaUuTien.textContent = `Duy trì kiểm tra định kỳ theo quy chuẩn an toàn.`;
            }
        }
    }

    function moChiTietZone(maZone, batBuocMo = true) {
        zoneHienTai = maZone;
        const zone = duLieuKhuVuc[maZone];
        if (!zone) return;

        cacKhuVucZone.forEach(el => {
            el.classList.toggle('dang-chon', el.dataset.zone === maZone);
        });

        if (nhanTrangThaiChon) {
            nhanTrangThaiChon.textContent = `Đang chọn: ${zone.ten}`;
        }

        const diem = tinhDiemRuiRoZone(maZone);
        const soLuong = zone.danhSachSuCo.filter(s => s.trangThai !== 'Đã khắc phục').length;
        const soLuongCao = zone.danhSachSuCo.filter(s => s.mucDo === 'Cao' && s.trangThai !== 'Đã khắc phục').length;

        if (tieuDePopup) {
            tieuDePopup.textContent = soLuong > 0 
                ? `${zone.ten} · Mối nguy đang tồn tại` : `${zone.ten} · Khu vực an toàn`;
        }

        if (huyHieuRuiRo) {
            if (diem >= 70) {
                huyHieuRuiRo.className = 'huy-hieu-rui-ro mau-do';
                huyHieuRuiRo.textContent = `Rủi ro cao - ${diem}/100`;
            } else if (diem >= 40) {
                huyHieuRuiRo.className = 'huy-hieu-rui-ro mau-cam';
                huyHieuRuiRo.textContent = `Rủi ro TB - ${diem}/100`;
            } else {
                huyHieuRuiRo.className = 'huy-hieu-rui-ro mau-xanh';
                huyHieuRuiRo.textContent = `An toàn - ${diem}/100`;
            }
        }

        if (chuThichPhu) {
            chuThichPhu.textContent = soLuong > 0
                ? `${soLuong} sự cố đang mở · ${soLuongCao} mức cao`
                : `Không có sự cố nào ghi nhận tại khu vực này`;
        }

        if (danhSachSuCo) {
            if (zone.danhSachSuCo.length === 0) {
                danhSachSuCo.innerHTML = `
                    <div style="text-align: center; padding: 18px 8px; color: #64748b; font-size: 11px;">
                        <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 20px; display: block; margin-bottom: 6px;"></i>
                        Khu vực đang đảm bảo an toàn tuyệt đối.
                    </div>
                `;
            } else {
                danhSachSuCo.innerHTML = zone.danhSachSuCo.map(sc => `
                    <div class="muc-su-co">
                        <span class="cham-muc-do cham-${sc.loaiMau || 'xanh'}"></span>
                        <div class="noi-dung-su-co">
                            <strong class="ten-su-co">${escapeHtml(sc.tieuDe)}</strong>
                            <span class="chi-tiet-su-co">${escapeHtml(sc.ma)}</span>
                            ${sc.moTa ? `<span class="chi-tiet-su-co" style="color: #64748b; font-size: 9px; margin-top: 1px;">${escapeHtml(sc.moTa)}</span>` : ''}
                        </div>
                        <span class="the-trang-thai-su-co tt-${sc.trangThai === 'Chưa xử lý' ? 'chua-xu-ly' : sc.trangThai === 'Đang xử lý' ? 'dang-xu-ly' : 'an-toan'}">
                            ${escapeHtml(sc.trangThai)}
                        </span>
                    </div>
                `).join('');
            }
        }

        if (nutGiaoXuLy) {
            nutGiaoXuLy.textContent = soLuong > 0 ? `Giao xử lý ${soLuong} sự cố` : 'Đã kiểm tra';
            nutGiaoXuLy.disabled = soLuong === 0;
            nutGiaoXuLy.style.opacity = soLuong === 0 ? '0.5' : '1';
        }

        if (hopThoaiChiTiet && batBuocMo) {
            hopThoaiChiTiet.classList.add('hien-thi');
        }

        capNhatPhanTichAI(maZone);
        capNhatCacTheThongKe();
    }

    function dongChiTietZone() {
        if (hopThoaiChiTiet) {
            hopThoaiChiTiet.classList.remove('hien-thi');
        }
        cacKhuVucZone.forEach(el => el.classList.remove('dang-chon'));
        if (nhanTrangThaiChon) {
            nhanTrangThaiChon.textContent = 'Chọn một Zone để xem sự cố';
        }
    }

    cacKhuVucZone.forEach(zoneEl => {
        zoneEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const ma = zoneEl.dataset.zone;
            moChiTietZone(ma, true);
        });

        zoneEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                moChiTietZone(zoneEl.dataset.zone, true);
            }
        });
    });

    if (nutDongChiTiet) {
        nutDongChiTiet.addEventListener('click', (e) => {
            e.stopPropagation();
            dongChiTietZone();
        });
    }

    if (nutGiaoXuLy) {
        nutGiaoXuLy.addEventListener('click', () => {
            const zone = duLieuKhuVuc[zoneHienTai];
            if (!zone) return;

            let daCapNhat = false;
            zone.danhSachSuCo.forEach(sc => {
                if (sc.trangThai === 'Chưa xử lý') {
                    sc.trangThai = 'Đang xử lý';
                    sc.loaiMau = 'cam';
                    daCapNhat = true;
                }
            });

            if (daCapNhat) {
                hienToast(`Đã điều động Đội HSE xử lý các sự cố tại ${zone.ten}!`);
                moChiTietZone(zoneHienTai, true);
            } else {
                hienToast(`Các sự cố tại ${zone.ten} hiện đang trong tiến trình xử lý.`);
            }
        });
    }

    const modalGhiNhan = document.getElementById('modalGhiNhanMoiNguy');
    const nutMoGhiNhan = document.getElementById('nutGhiNhanMoiNguy');
    const nutDongGhiNhan = document.getElementById('nutDongModalGhiNhan');
    const nutHuyGhiNhan = document.getElementById('nutHuyModalGhiNhan');
    const formGhiNhan = document.getElementById('formGhiNhanMoiNguy');

    function moModalGhiNhan() {
        if (!modalGhiNhan) return;
        modalGhiNhan.hidden = false;
        const selectZone = document.getElementById('chonKhuVucMoiNguy');
        if (selectZone) selectZone.value = zoneHienTai;
        const inputTen = document.getElementById('tenMoiNguyMoi');
        setTimeout(() => inputTen?.focus(), 80);
    }

    function dongModalGhiNhan() {
        if (modalGhiNhan) modalGhiNhan.hidden = true;
    }

    if (nutMoGhiNhan) nutMoGhiNhan.addEventListener('click', moModalGhiNhan);
    if (nutDongGhiNhan) nutDongGhiNhan.addEventListener('click', dongModalGhiNhan);
    if (nutHuyGhiNhan) nutHuyGhiNhan.addEventListener('click', dongModalGhiNhan);

    modalGhiNhan?.addEventListener('click', (e) => {
        if (e.target === modalGhiNhan) dongModalGhiNhan();
    });

    if (formGhiNhan) {
        formGhiNhan.addEventListener('submit', (e) => {
            e.preventDefault();
            const maZone = document.getElementById('chonKhuVucMoiNguy').value;
            const tenMoiNguy = document.getElementById('tenMoiNguyMoi').value.trim();
            const mucDo = document.getElementById('mucDoRuiRoMoi').value;
            const nguoiGhi = document.getElementById('nguoiGhiNhanMoi').value.trim() || 'Cán bộ HSE';
            const moTa = document.getElementById('moTaMoiNguyMoi').value.trim() || 'Cần kiểm tra khắc phục.';

            if (!tenMoiNguy || !duLieuKhuVuc[maZone]) return;

            const now = new Date();
            const gioPhut = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const maId = `${maZone}-${130 + duLieuKhuVuc[maZone].danhSachSuCo.length + 1}`;
            const loaiMau = mucDo === 'Cao' ? 'do' : mucDo === 'Trung bình' ? 'cam' : 'xanh';

            duLieuKhuVuc[maZone].danhSachSuCo.unshift({
                id: maId,
                tieuDe: tenMoiNguy,
                ma: `${maId} · ${gioPhut} · ${nguoiGhi}`,
                mucDo: mucDo,
                trangThai: 'Chưa xử lý',
                loaiMau: loaiMau,
                moTa: moTa
            });

            capNhatGiaoDienZoneTrenBanDo(maZone);
            capNhatCacTheThongKe();
            moChiTietZone(maZone, true);

            formGhiNhan.reset();
            dongModalGhiNhan();
            hienToast(`Đã thêm mối nguy mới tại ${duLieuKhuVuc[maZone].ten}. AI vừa cập nhật mức rủi ro!`);
        });
    }

    const modalXuat = document.getElementById('modalXuatBaoCao');
    const nutMoXuat = document.getElementById('nutXuatBaoCao');
    const nutDongXuat = document.getElementById('nutDongModalXuat');
    const nutHuyXuat = document.getElementById('nutHuyModalXuat');
    const nutXacNhanXuat = document.getElementById('nutXacNhanXuatBaoCao');
    const cacLuaChonXuat = document.querySelectorAll('.muc-lua-chon-xuat');

    function moModalXuat() {
        if (!modalXuat) return;
        modalXuat.hidden = false;
        capNhatCacTheThongKe();
    }

    function dongModalXuat() {
        if (modalXuat) modalXuat.hidden = true;
    }

    if (nutMoXuat) nutMoXuat.addEventListener('click', moModalXuat);
    if (nutDongXuat) nutDongXuat.addEventListener('click', dongModalXuat);
    if (nutHuyXuat) nutHuyXuat.addEventListener('click', dongModalXuat);

    modalXuat?.addEventListener('click', (e) => {
        if (e.target === modalXuat) dongModalXuat();
    });

    cacLuaChonXuat.forEach(item => {
        item.addEventListener('click', () => {
            cacLuaChonXuat.forEach(el => el.classList.remove('kich-hoat'));
            item.classList.add('kich-hoat');
            const radio = item.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    if (nutXacNhanXuat) {
        nutXacNhanXuat.addEventListener('click', () => {
            const dinhDangChon = 'csv';
            const ngayHienTai = new Date().toISOString().slice(0, 10);

            if (dinhDangChon === 'csv') {
                const tieuDeCot = ['STT', 'Khu vực', 'Tên khu vực', 'Mã sự cố', 'Tên mối nguy', 'Mức độ', 'Trạng thái', 'Người ghi nhận & Giờ', 'Mô tả chi tiết', 'Điểm rủi ro AI'];
                const hangDuLieu = [tieuDeCot];

                let stt = 1;
                Object.values(duLieuKhuVuc).forEach(zone => {
                    const diemZone = tinhDiemRuiRoZone(zone.ma);
                    zone.danhSachSuCo.forEach(sc => {
                        hangDuLieu.push([
                            stt++,
                            zone.ma,
                            zone.tenDayDu,
                            sc.id,
                            sc.tieuDe,
                            sc.mucDo,
                            sc.trangThai,
                            sc.ma,
                            sc.moTa || '',
                            diemZone
                        ]);
                    });
                });

                const noiDungCSV = '\uFEFF' + hangDuLieu.map(hang => 
                    hang.map(o => `"${String(o ?? '').replace(/"/g, '""')}"`).join(',')
                ).join('\r\n');

                const blob = new Blob([noiDungCSV], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const theLink = document.createElement('a');
                theLink.href = url;
                theLink.download = `SiteSafe_Bao_Cao_Rui_Ro_${ngayHienTai}.csv`;
                document.body.appendChild(theLink);
                theLink.click();
                theLink.remove();
                URL.revokeObjectURL(url);
                hienToast('Đã tải xuống tệp Excel (.csv) thành công!');
            } else if (dinhDangChon === 'txt') {
                
                let vanBan = `BÁO CÁO NHANH AN TOÀN LAO ĐỘNG SITESAFE\n`;
                vanBan += `Thời gian: ${new Date().toLocaleString('vi-VN')}\n`;
                vanBan += `Công trường: Dự án Metro Tower - Zone B\n`;
                vanBan += `--------------------------------------------------\n\n`;

                Object.values(duLieuKhuVuc).forEach(zone => {
                    const diem = tinhDiemRuiRoZone(zone.ma);
                    vanBan += `[${zone.tenDayDu.toUpperCase()}] - Điểm rủi ro: ${diem}/100\n`;
                    if (zone.danhSachSuCo.length === 0) {
                        vanBan += `  - Khu vực an toàn, không có mối nguy tồn đọng.\n`;
                    } else {
                        zone.danhSachSuCo.forEach((s, idx) => {
                            vanBan += `  ${idx + 1}. ${s.tieuDe} [${s.mucDo}] - ${s.trangThai} (${s.ma})\n`;
                        });
                    }
                    vanBan += `\n`;
                });

                vanBan += `Khuyến nghị AI: ${aiHanhDongDeXuat?.textContent || ''}\n`;
                vanBan += `Đội phụ trách: ${aiDoiPhuTrach?.textContent || ''}\n`;

                const blob = new Blob([vanBan], { type: 'text/plain;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const theLink = document.createElement('a');
                theLink.href = url;
                theLink.download = `SiteSafe_Tom_Tat_Ca_${ngayHienTai}.txt`;
                document.body.appendChild(theLink);
                theLink.click();
                theLink.remove();
                URL.revokeObjectURL(url);
                hienToast('Đã tải bản tóm tắt ca làm việc (.txt)!');
            } else {
                
                dongModalXuat();
                setTimeout(() => window.print(), 250);
                hienToast('Đang tạo bản in / PDF của bản đồ nhiệt...');
            }

            dongModalXuat();
        });
    }

    const oNhapTimKiem = document.getElementById('oNhapTimKiem');
    if (oNhapTimKiem) {
        oNhapTimKiem.addEventListener('input', (e) => {
            const tuKhoa = e.target.value.toLowerCase().trim();
            if (!tuKhoa) return;

            for (const [ma, zone] of Object.entries(duLieuKhuVuc)) {
                const khop = zone.danhSachSuCo.some(s => s.tieuDe.toLowerCase().includes(tuKhoa) || s.ma.toLowerCase().includes(tuKhoa));
                if (khop) {
                    moChiTietZone(ma, true);
                    break;
                }
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            oNhapTimKiem?.focus();
        }
        if (e.key === 'Escape') {
            dongModalGhiNhan();
            dongModalXuat();
            dongChiTietZone();
        }
    });

    const tabBanDoNhiet = document.getElementById('tabBanDoNhiet');
    const tabMatBang2D = document.getElementById('tabMatBang2D');
    const tatCaDiemNhiet = document.querySelectorAll('.diem-nhiet');

    if (tabBanDoNhiet && tabMatBang2D) {
        tabBanDoNhiet.addEventListener('click', () => {
            tabBanDoNhiet.classList.add('active');
            tabMatBang2D.classList.remove('active');
            tatCaDiemNhiet.forEach(el => el.style.opacity = '1');
            hienToast('Đang xem chế độ Bản đồ nhiệt rủi ro');
        });

        tabMatBang2D.addEventListener('click', () => {
            tabMatBang2D.classList.add('active');
            tabBanDoNhiet.classList.remove('active');
            tatCaDiemNhiet.forEach(el => el.style.opacity = '0.25');
            hienToast('Đang xem chế độ Mặt bằng kỹ thuật 2D');
        });
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    document.addEventListener('click', (e) => {
        if (hopThoaiChiTiet && hopThoaiChiTiet.classList.contains('hien-thi')) {
            if (!hopThoaiChiTiet.contains(e.target) && !e.target.closest('.khu-vuc-zone')) {
                dongChiTietZone();
            }
        }
    });

    Object.keys(duLieuKhuVuc).forEach(ma => capNhatGiaoDienZoneTrenBanDo(ma));
    capNhatCacTheThongKe();
    capNhatPhanTichAI('B'); 
    dongChiTietZone();      
});

(() => {
  const savedProject = localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B';

  const sidebarTitle = document.getElementById('tenCongTruongHienTai');
  const topbarTitle = document.getElementById('topbarProjectTitle');
  const mobileTitle = document.getElementById('mobileProjectTitle');

  const updateAllTitles = (val) => {
    if (sidebarTitle) sidebarTitle.textContent = val;
    if (topbarTitle) topbarTitle.textContent = val;
    if (mobileTitle) mobileTitle.textContent = val;
    localStorage.setItem('sitesafe_current_project', val);
    
    document.querySelectorAll('.lua-chon-khu-vuc, .dropdown-item').forEach(el => {
      const prj = el.dataset.project || el.textContent.trim();
      if (prj === val) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  };

  updateAllTitles(savedProject);

  const hopSidebar = document.getElementById('hopChonCongTruong');
  const sidebarMenu = hopSidebar ? hopSidebar.querySelector('.menu-chon-khu-vuc') : null;
  if (hopSidebar && sidebarMenu) {
    hopSidebar.style.cursor = 'pointer';
    hopSidebar.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = sidebarMenu.classList.contains('mo');
      closeAllProjectMenus();
      if (!wasOpen) sidebarMenu.classList.add('mo');
    });
    sidebarMenu.querySelectorAll('.lua-chon-khu-vuc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prj = btn.dataset.project || btn.textContent.trim();
        updateAllTitles(prj);
        sidebarMenu.classList.remove('mo');
      });
    });
  }

  const topbarTrigger = document.getElementById('topbarProjectSelect') || document.querySelector('.ten-du-an-dropdown');
  const topbarMenu = document.getElementById('topbarProjectMenu') || document.querySelector('.menu-khu-vuc-tren');
  if (topbarTrigger && topbarMenu) {
    topbarTrigger.style.cursor = 'pointer';
    topbarTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = topbarMenu.classList.contains('mo');
      closeAllProjectMenus();
      if (!wasOpen) topbarMenu.classList.add('mo');
    });
    topbarMenu.querySelectorAll('.lua-chon-khu-vuc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prj = btn.dataset.project || btn.textContent.trim();
        updateAllTitles(prj);
        topbarMenu.classList.remove('mo');
      });
    });
  }

  const mobileTrigger = document.getElementById('mobileProjectTrigger');
  const mobileDropdown = document.getElementById('mobileProjectSelect');
  if (mobileTrigger && mobileDropdown) {
    mobileTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = mobileDropdown.classList.contains('open');
      closeAllProjectMenus();
      if (!wasOpen) mobileDropdown.classList.add('open');
    });
    mobileDropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const prj = item.dataset.project || item.textContent.trim();
        updateAllTitles(prj);
        mobileDropdown.classList.remove('open');
      });
    });
  }

  function closeAllProjectMenus() {
    if (sidebarMenu) sidebarMenu.classList.remove('mo');
    if (topbarMenu) topbarMenu.classList.remove('mo');
    if (mobileDropdown) mobileDropdown.classList.remove('open');
  }

  document.addEventListener('click', closeAllProjectMenus);

  const nutMenuMobile = document.getElementById('nutMenuMobile');
  const nutDongMenuMobile = document.getElementById('nutDongMenuMobile');
  const lopPhuMobile = document.getElementById('lopPhuMobile');
  const thanhBen = document.getElementById('thanhBen');

  function moDrawer(e) {
    if (e) e.stopPropagation();
    if (thanhBen) thanhBen.classList.add('mo-menu-mobile');
    if (lopPhuMobile) lopPhuMobile.classList.add('hien-thi');
    document.body.style.overflow = 'hidden';
  }

  function dongDrawer(e) {
    if (e) e.stopPropagation();
    if (thanhBen) thanhBen.classList.remove('mo-menu-mobile');
    if (lopPhuMobile) lopPhuMobile.classList.remove('hien-thi');
    document.body.style.overflow = '';
  }

  if (nutMenuMobile) nutMenuMobile.addEventListener('click', moDrawer);
  if (nutDongMenuMobile) nutDongMenuMobile.addEventListener('click', dongDrawer);
  if (lopPhuMobile) lopPhuMobile.addEventListener('click', dongDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dongDrawer(e);
      closeAllProjectMenus();
    }
  });
})();

document.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('sitesafe_username');
    const savedTitle = localStorage.getItem('sitesafe_usertitle');
    const savedInitials = localStorage.getItem('sitesafe_userinitials');

    if (savedName) {
        document.querySelectorAll('.ten-nguoi-dung').forEach(el => el.textContent = savedName);
    }
    if (savedTitle) {
        document.querySelectorAll('.chuc-danh-badge').forEach(el => el.textContent = savedTitle);
    }
    if (savedInitials) {
        document.querySelectorAll('.anh-dai-dien').forEach(el => el.textContent = savedInitials);
    }
});