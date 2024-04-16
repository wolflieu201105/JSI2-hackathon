const imagePrefix = "../assets/image/";
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
        this.load.image("background", imagePrefix + "background.png");
        this.load.image(`nameTag`, imagePrefix + "Players/nameTag.png");
        this.load.image(`healthBar`, imagePrefix + "Players/healthBar.png");
        this.load.image(`Scard`, imagePrefix + "Players/Scard.png");
        this.load.image("bossTurn", imagePrefix + "Boss/bossTurn.png");
        this.load.image("bossCharacters", imagePrefix + "Boss/bossCharacters.png");
        this.load.image("time", imagePrefix + "Neutral/time.png");
        this.load.image("skip", imagePrefix + "Neutral/skip.png");
        this.load.image("cards", imagePrefix + "Playing/Cards.png");
        this.load.image("mana", imagePrefix + "Playing/Mana.png");
        this.load.image("nature", imagePrefix + "Neutral/nature.png");
        this.load.image("bossDefinition", imagePrefix + "Boss/bossDefinition.png");
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
        this.load.image("BaoHoDongMinh", imagePrefix + "PlayingCards/BaoHoDongMinh.png");
        this.load.image("CapCuu", imagePrefix + "PlayingCards/CapCuu.png");
        this.load.image("DanXepDoiHinh", imagePrefix + "PlayingCards/DanXepDoiHinh.png");
        this.load.image("DieuBinhKhienTuong", imagePrefix + "PlayingCards/DieuBinhKhienTuong.png");
        this.load.image("DuongThuong", imagePrefix + "PlayingCards/DuongThuong.png");
        this.load.image("PhongThu", imagePrefix + "PlayingCards/PhongThu.png");
        this.load.image("TanCong", imagePrefix + "PlayingCards/TanCong.png");
        this.load.image("TienThoaiLuongNan", imagePrefix + "PlayingCards/TienThoaiLuongNan.png");
        this.load.image("MuaTen", imagePrefix + "PlayingCards/MuaTen.png")
    }
    #phase1() {
        this.load.image("DapDe", imagePrefix + "Phase/Phase1/DapDe.png");
        this.load.image("LuLut", imagePrefix + "Phase/Phase1/LuLut.png");
        this.load.image("ThuyTinh", imagePrefix + "Phase/Phase1/ThuyTinh.png");
        this.load.image("VoDe", imagePrefix + "Phase/Phase1/VoDe.png");
    };
    #phase2() {
        this.load.image("ChienThuyen", imagePrefix + "Phase/Phase2/ChienThuyen.png");
        this.load.image("Coc", imagePrefix + "Phase/Phase2/Coc.png");
        this.load.image("LuuHoangThao", imagePrefix + "Phase/Phase2/LuuHoangThao.png");
        this.load.image("ThuyTrieuCao", imagePrefix + "Phase/Phase2/ThuyTrieuCao.png");
        this.load.image("ThuyTrieuThap", imagePrefix + "Phase/Phase2/ThuyTrieuThap.png");
    };
    #phase3() {
        this.load.image("QuanNguyenMong", imagePrefix + "Phase/Phase3/QuanNguyenMong.png");
        this.load.image("VuonKhongNhaTrong", imagePrefix + "Phase/Phase3/VuonKhongNhaTrong.png");
    };
    #phase4() {
        this.load.image("BeVanDan", imagePrefix + "Phase/Phase4/BeVanDan.png");
        this.load.image("Min", imagePrefix + "Phase/Phase4/Min.png");
        this.load.image("PhanDinhGiot", imagePrefix + "Phase/Phase4/PhanDinhGiot.png");
        this.load.image("QuanPhap", imagePrefix + "Phase/Phase4/QuanPhap.png");
        this.load.image("XeDapTho", imagePrefix + "Phase/Phase4/XeDapTho.png");
    };
    #phase5() {
        this.load.image("B52", imagePrefix + "Phase/Phase5/B52.png");
        this.load.image("BaDoKa", imagePrefix + "Phase/Phase5/BaDoKa.png");
        this.load.image("DuKich", imagePrefix + "Phase/Phase5/DuKich.png");
        this.load.image("QuanLinh", imagePrefix + "Phase/Phase5/QuanLinh.png");
        this.load.image("SungPhongKhong", imagePrefix + "Phase/Phase5/SungPhongKhong.png");
        this.load.image("XeThietGiap", imagePrefix + "Phase/Phase5/XeThietGiap.png");
    };
    /**
     * 
     */
    update(time, delta) {
    }
}