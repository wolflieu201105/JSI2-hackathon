class Scene1 extends Phaser.Scene {
    constructor() {
        // bootGame is an identifier
        super("bootGame");
    }

    init() {

    }

    /**
     * Load assets into memory
     */
    preload() {
        this.load.image("background", "assets/image/background.png");
        this.load.image(`nameTag`, "assets/image/Players/nameTag.png");
        this.load.image(`healthBar`, "assets/image/Players/healthBar.png");
        this.load.image(`Scard`, "assets/image/Players/Scard.png");
        this.load.image("bossTurn", "assets/image/Boss/bossTurn.png");
        this.load.image("bossCharacters", "assets/image/Boss/bossCharacters.png");
        this.load.image("bossUtility", "assets/image/Boss/bossUtility.png");
        this.load.image("time", "assets/image/Neutral/time.png");
        this.load.image("skip", "assets/image/Neutral/skip.png");
        this.load.image("cards", "assets/image/Playing/Cards.png");
        this.load.image("mana", "assets/image/Playing/Mana.png");
        this.load.image("nature", "assets/image/Neutral/nature.png");
        this.load.image("bossDefinition", "assets/image/Boss/bossDefinition.png");
        this.#basicCards();
        this.#phase1();
        this.#phase2();
        this.#phase3();
        this.#phase4();
        this.#phase5();
    }
    /**
     * Add objects into the game
     */
    create() {
        this.add.text(20, 20, "Boot game");
        this.scene.start("playGame");
    }
    #basicCards(){
        this.load.image("BaoHoDongMinh", "assets/image/PlayingCards/BaoHoDongMinh.png");
        this.load.image("CapCuu", "assets/image/PlayingCards/CapCuu.png");
        this.load.image("DanXepDoiHinh", "assets/image/PlayingCards/DanXepDoiHinh.png");
        this.load.image("DieuBinhKhienTuong", "assets/image/PlayingCards/DieuBinhKhienTuong.png");
        this.load.image("DuongThuong", "assets/image/PlayingCards/DuongThuong.png");
        this.load.image("PhongThu", "assets/image/PlayingCards/PhongThu.png");
        this.load.image("TanCong", "assets/image/PlayingCards/TanCong.png");
        this.load.image("TienThoaiLuongNan", "assets/image/PlayingCards/TienThoaiLuongNan.png");
    }
    #phase1() {
        this.load.image("DapDe", "assets/image/Phase/Phase1/DapDe.png");
        this.load.image("LuLut", "assets/image/Phase/Phase1/LuLut.png");
        this.load.image("ThuyTinh", "assets/image/Phase/Phase1/ThuyTinh.png");
        this.load.image("VoDe", "assets/image/Phase/Phase1/VoDe.png");
    };
    #phase2() {
        this.load.image("ChienThuyen", "assets/image/Phase/Phase2/ChienThuyen.png");
        this.load.image("Coc", "assets/image/Phase/Phase2/Coc.png");
        this.load.image("LuuHoangThao", "assets/image/Phase/Phase2/LuuHoangThao.png");
        this.load.image("ThuyTrieuCao", "assets/image/Phase/Phase2/ThuyTrieuCao.png");
        this.load.image("ThuyTrieuThap", "assets/image/Phase/Phase2/ThuyTrieuThap.png");
    };
    #phase3() {
        this.load.image("QuanNguyenMong", "assets/image/Phase/Phase3/QuanNguyenMong.png");
        this.load.image("VuonKhongNhaTrong", "assets/image/Phase/Phase3/VuonKhongNhaTrong.png");
    };
    #phase4() {
        this.load.image("BeVanDan", "assets/image/Phase/Phase4/BeVanDan.png");
        this.load.image("Min", "assets/image/Phase/Phase4/Min.png");
        this.load.image("PhanDinhGiot", "assets/image/Phase/Phase4/PhanDinhGiot.png");
        this.load.image("QuanPhap", "assets/image/Phase/Phase4/QuanPhap.png");
        this.load.image("XeDapTho", "assets/image/Phase/Phase4/XeDapTho.png");
    };
    #phase5() {
        this.load.image("B52", "assets/image/Phase/Phase5/B52.png");
        this.load.image("BaDoKa", "assets/image/Phase/Phase5/BaDoKa.png");
        this.load.image("DuKich", "assets/image/Phase/Phase5/DuKich.png");
        this.load.image("QuanLinh", "assets/image/Phase/Phase5/QuanLinh.png");
        this.load.image("SungPhongKhong", "assets/image/Phase/Phase5/SungPhongKhong.png");
        this.load.image("XeThietGiap", "assets/image/Phase/Phase5/XeThietGiap.png");
    };
    /**
     * 
     */
    update(time, delta) {
    }
}