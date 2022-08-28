class Scene2 extends Phaser.Scene {
    #player1 = {
        health: 25,
        dead: false,
        display: null,
        healthBar: null,
        nameTag: null,
        drawCards: 3,
        maxMana: 3,
        Scard: {
            display: undefined,
            available: 0
        },
        defend: 0

    };
    #player2 = {
        health: 25,
        dead: false,
        display: null,
        healthBar: null,
        nameTag: null,
        drawCards: 3,
        maxMana: 3,
        Scard: {
            display: undefined,
            available: 0
        },
        defend: 0
    };
    #player3 = {
        health: 25,
        dead: false,
        display: null,
        healthBar: null,
        nameTag: null,
        drawCards: 3,
        maxMana: 3,
        Scard: {
            display: undefined,
            available: 0
        },
        defend: 0
    };
    #player4 = {
        health: 25,
        dead: false,
        display: null,
        healthBar: null,
        nameTag: null,
        drawCards: 3,
        maxMana: 3,
        Scard: {
            display: undefined,
            available: 0
        },
        defend: 0
    };
    #playerTC;
    #ScardType = null;
    #initialPlayers = [this.#player1, this.#player2, this.#player3, this.#player4];
    #players = [this.#player1, this.#player2, this.#player3, this.#player4];
    // tạo chỗ để xem cac thứ của boss
    #bossTurn;
    #boss1;
    #boss2;
    #boss3;
    #boss4;
    #boss5;
    #bosses = [this.#boss1, this.#boss2, this.#boss3, this.#boss4, this.#boss5];
    #bossesPhase = [];
    #bossHealth1 = {
        display: null,
        healthBar: null
    };
    #bossHealth2 = {
        display: null,
        healthBar: null
    };
    #bossHealth3 = {
        display: null,
        healthBar: null
    };
    #bossHealth4 = {
        display: null,
        healthBar: null
    };
    #bossHealth5 = {
        display: null,
        healthBar: null
    };
    #bossHealths = [this.#bossHealth1, this.#bossHealth2, this.#bossHealth3, this.#bossHealth4, this.#bossHealth5];
    #bossNumber = null;
    #bossUltility;
    #bossDefinition = "bossDefinition";
    #bossTurnDisplay = ["bossTurn", this.#bossDefinition];
    #bossTurnDisplayn = 0;
    // tạo thời gian, skip và những thứ bên lề
    #playTurnDisplay;
    #skip;
    #nature
    //tạo những thứ của người đang chơi
    #card1;
    #card2;
    #card3;
    #card4;
    #card5;
    #card6;
    #card7;
    #card8;
    #cards = [this.#card1, this.#card2, this.#card3, this.#card4, this.#card5, this.#card6, this.#card7, this.#card8];
    #mana;
    #manaDisplay;
    // tạo ra các thẻ bài để bốc
    #deck1 = [];
    #deck2 = [];
    #playDeck = [];
    #playTurn = [this.#player1, this.#player2, this.#player3, this.#player4, "boss"];
    #gameTurn = 0;
    #cardDrawn;
    #movingObjects = [0];
    // tạo ra các chức năng cho lá bài thường
    #tanCong() {
        for (let i = 0; i < this.#bossNumber; i++) {
            this.#bosses[i].setInteractive();
            this.#bosses[i].on("pointerdown",
                function () {
                    for (let I = 0; I < this.#bossNumber; I++) {
                        this.#bosses[i].removeInteractive();
                    }
                    this.#bossesPhase[i].health -= 2;
                    this.#displayBossCards();
                    this.#displayPlayingCards()
                },
                this);
        }
    }
    #TanCong = {
        type: "TanCong",
        function: this.#tanCong.bind(this),
        number: 10,
        manaTaken: 1
    }
    #phongThu() {
        this.#players[this.#gameTurn].defend += 1;
        console.log(this.#players);
        this.#displayPlayingCards()
    }
    #PhongThu = {
        type: "PhongThu",
        function: this.#phongThu.bind(this),
        number: 10,
        manaTaken: 1
    }
    #baoHoDongMinh() {
        this.#displayPlayingCards()
    }
    #BaoHoDongMinh = {
        type: "BaoHoDongMinh",
        function: this.#baoHoDongMinh.bind(this),
        number: 5,
        manaTaken: 1
    }
    #capCuu() {
        this.#displayPlayingCards()
    }
    #CapCuu = {
        type: "CapCuu",
        function: this.#capCuu.bind(this),
        number: 2,
        repeat: 0,
        manaTaken: 2
    }
    #danXepDoiHinh() {
        this.#displayPlayingCards()
    }
    #DanXepDoiHinh = {
        type: "DanXepDoiHinh",
        function: this.#danXepDoiHinh.bind(this),
        number: 3,
        manaTaken: 2
    }
    #dieuBinhKhienTuong() {
        for (let i = 0; i < 2; i++) {
            if (this.#deck1.length == 0) {
                this.#deck1 = [...this.#deck2];
                this.#deck2 = [];
            }
            this.#cardDrawn = Math.floor(Math.random() * this.#deck1.length);
            this.#deck2.push(this.#deck1[this.#cardDrawn]);
            this.#playDeck.push(this.#deck1[this.#cardDrawn]);
            this.#deck1.splice(this.#cardDrawn, 1);
        }
        this.#displayPlayingCards()
    }
    #DieuBinhKhienTuong = {
        type: "DieuBinhKhienTuong",
        function: this.#dieuBinhKhienTuong.bind(this),
        number: 5,
        manaTaken: 1
    }
    #duongThuong() {
        this.#displayPlayingCards()
    }
    #DuongThuong = {
        type: "DuongThuong",
        function: this.#duongThuong.bind(this),
        number: 8,
        manaTaken: 1
    }
    #tienThoaiLuongNan() {
        this.#players[this.#gameTurn].health-=2;
        if (this.#players[this.#gameTurn].health <= 0){
            this.#players[this.#gameTurn].health = 0;
            this.#players[this.#gameTurn].dead = true;
        }
        for (let i = 0; i < this.#bossNumber; i++) {
            this.#bosses[i].setInteractive();
            this.#bosses[i].on("pointerdown",
                function () {
                    for (let I = 0; I < this.#bossNumber; I++) {
                        this.#bosses[i].removeInteractive();
                    }
                    this.#bossesPhase[i].health -= 4;
                    this.#displayBossCards();
                    this.#displayPlayingCards();
                    this.#displayPlayers();
                },
                this);
        }
    }
    #TienThoaiLuongNan = {
        type: "TienThoaiLuongNan",
        function: this.#tienThoaiLuongNan.bind(this),
        number: 5,
        manaTaken: 1
    }
    #InitialCards = [this.#TanCong, this.#PhongThu, this.#BaoHoDongMinh, this.#CapCuu, this.#DanXepDoiHinh, this.#DieuBinhKhienTuong, this.#DuongThuong, this.#TienThoaiLuongNan];
    // phase 1
    #dapDe() {
        this.#displayPlayingCards();
    }
    #DapDe = {
        type: "DapDe",
        function: this.#dapDe.bind(this),
        number: 4,
        manaTaken: 0
    }
    #luLut() { }
    #LuLut = {
        type: "LuLut",
        function: this.#luLut,
    }
    #voDe() {
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        this.#displayPlayingCards();
    }
    #VoDe = {
        type: "VoDe",
        function: this.#voDe.bind(this),
        number: 4
    }
    #thuyTinh() { }
    #ThuyTinh = {
        type: "ThuyTinh",
        function: this.#thuyTinh,
        maxHealth: 35,
        health: 35
    }
    // phase 2
    #chienThuyen() { }
    #ChienThuyen1 = {
        type: "ChienThuyen",
        function: this.#chienThuyen,
        maxHealth: 10,
        health: 10
    }
    #ChienThuyen2 = {
        type: "ChienThuyen",
        function: this.#chienThuyen,
        maxHealth: 10,
        health: 10
    }
    #coc() { }
    #Coc = {
        type: "Coc",
        function: this.#coc,
        number: 5
    }
    #luuHoangThao() { }
    #LuuHoangThao = {
        type: "LuuHoangThao",
        function: this.#luuHoangThao,
        maxHealth: 30,
        health: 30
    }
    #thuyTrieuCao() { }
    #ThuyTrieuCao = {
        type: "ThuyTrieuCao",
        function: this.#thuyTrieuCao
    }
    #thuyTrieuThap() { }
    #ThuyTrieuThap = {
        type: "ThuyTrieuThap",
        function: this.#thuyTrieuThap
    }
    // phase 3
    #quanNguyenMong() { }
    #QuanNguyenMong = {
        type: "QuanNguyenMong",
        function: this.#quanNguyenMong,
        number: 10
    }
    #vuonKhongNhaTrong() { }
    #VuonKhongNhaTrong = {
        type: "VuonKhongNhaTrong",
        function: this.#vuonKhongNhaTrong,
        number: 10
    }
    // phase 4
    #beVanDan() { }
    #BeVanDan = {
        type: "BeVanDan",
        function: this.#beVanDan,
        number: 10
    }
    #min() { }
    #Min = {
        type: "Min",
        function: this.#min,
        number: 10
    }
    #phanDinhGiot() { }
    #PhanDinhGiot = {
        type: "PhanDinhGiot",
        function: this.#phanDinhGiot,
        number: 10
    }
    #quanPhap() { }
    #QuanPhap = {
        type: "QuanPhap",
        function: this.#quanPhap,
        number: 10
    }
    #xeDapTho() { }
    #XeDapTho = {
        type: "XeDapTho",
        function: this.#xeDapTho,
        number: 10
    }
    //phase 5
    #b52() { }
    #B52 = {
        type: "B52",
        function: this.#b52,
        number: 10
    }
    #baDoKa() { }
    #BaDoKa = {
        type: "BaDoKa",
        function: this.#baDoKa,
        number: 10
    }
    #duKich() { }
    #DuKich = {
        type: "DuKich",
        function: this.#duKich,
        number: 10
    }
    #quanLinh() { }
    #QuanLinh = {
        type: "QuanLinh",
        function: this.#quanLinh,
        number: 10
    }
    #sungPhongKhong() { }
    #SungPhongKhong = {
        type: "SungPhongKhong",
        function: this.#sungPhongKhong,
        number: 10
    }
    #xeThietGiap() { }
    #XeThietGiap = {
        type: "XeThietGiap",
        function: this.#xeThietGiap,
        number: 10
    }
    constructor() {
        super("playGame");
    }
    create() {
        // tạo image người chơi vào trang
        for (let i = 0; i < this.#players.length; i++) {
            this.#players[i].nameTag = this.add.image(75, 155 + i * 115, `nameTag`);
            this.#players[i].healthBar = this.add.image(75, 210 + i * 115, `healthBar`);
            this.#players[i].display = this.add.text(25, 185 + i * 115, `${this.#players[i].health}/25`, { fontSize: "20px", color: "black" });
        }
        this.#displayPlayers()
        // tạo chỗ cho thời gian, skip và những thứ bên lề
        this.#skip = this.add.image(1125, 100, `skip`);
        this.#playTurnDisplay = this.add.text(1075, 22.5, `player ${this.#gameTurn}`, { fontSize: "20px", color: "black" });
        // tạo chỗ cho những thứ của người đang chơi
        this.#nature = this.add.image(1125, 275, `nature`);
        for (let i = 0; i < this.#InitialCards.length; i++) {
            for (let y = 0; y < this.#InitialCards[i].number; y++) {
                this.#deck1.push(this.#InitialCards[i].type);
            }
        }
        this.#bossTurn = this.add.image(117.5, 62.5, "bossTurn");
        this.#displayBoss();
        this.#phase1();
    }
    #phase1() {
        this.#deck1 = [];
        this.#deck2 = [];
        for (let i = 0; i < this.#InitialCards.length; i++) {
            for (let y = 0; y < this.#InitialCards[i].number; y++) {
                this.#deck1.push(this.#InitialCards[i]);
            }
        }
        for (let i = 0; i < this.#DapDe.number; i++) {
            this.#deck1.push(this.#DapDe);
        }
        for (let i = 0; i < this.#VoDe.number; i++) {
            this.#deck1.push(this.#VoDe);
        }
        this.#bossNumber = 1;
        this.#bossesPhase = [this.#ThuyTinh];
        for (let i = 0; i < this.#bossNumber; i++) {
            this.#bosses[i] = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 100, this.#bossesPhase[i].type);
            this.#bossHealths[i].healthBar = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 200, `healthBar`);
            this.#bossHealths[i].display = this.add.text(535 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 175, `${this.#bossesPhase[i].health}/${this.#bossesPhase[i].maxHealth}`, { fontSize: "20px", color: "black" });
        }
        this.#bossUltility = this.add.image(910, 100, `LuLut`);
        this.#ScardType = "DapDe";
        this.#startPlaying(-1);
    }
    #phase2() {
        this.#deck1 = [];
        this.#deck2 = [];
        for (let i = 0; i < this.#InitialCards.length; i++) {
            for (let y = 0; y < this.#InitialCards[i].number; y++) {
                this.#deck1.push(this.#InitialCards[i].type);
            }
        }
    }
    #displayBoss() {
        this.#bossTurn.setInteractive();
        this.#bossTurn.on("pointerdown", this.#seeDefinition, this);
    }
    #seeDefinition() {
        this.#bossTurnDisplayn += 1;
        console.log(this.#bossTurn);
        this.#bossTurn.destroy();
        this.#bossTurn = this.add.image(25, 25, this.#bossTurnDisplay[this.#bossTurnDisplayn % 2]);
        this.#bossTurn.setOrigin(0, 0);
        this.#bossTurn.setInteractive();
        this.#bossTurn.on("pointerdown", this.#seeDefinition, this);
    }
    #startPlaying() {
        if (this.#playTurn[this.#gameTurn] == "boss") {
            for (let i = 0; i < 4; i++) {
                this.#players[i].defend = 0;
                if(this.#players[i].health <= 0){
                    this.#players[i].dead = true;
                }
            }
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
        }
        else {
            this.#playTurnDisplay.destroy();
            this.#playTurnDisplay = this.add.text(1075, 22.5, `player ${this.#gameTurn + 1}`, { fontSize: "20px", color: "black" });
            for (let i = 0; i < this.#playTurn[this.#gameTurn].drawCards; i++) {
                if (this.#deck1.length == 0) {
                    this.#deck1 = [...this.#deck2];
                    this.#deck2 = [];
                }
                this.#cardDrawn = Math.floor(Math.random() * this.#deck1.length);
                this.#deck2.push(this.#deck1[this.#cardDrawn]);
                this.#playDeck.push(this.#deck1[this.#cardDrawn]);
                this.#deck1.splice(this.#cardDrawn, 1);
            }
            this.#mana = this.#playTurn[this.#gameTurn].maxMana;
            this.#displayPlayingCards();
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
        }
    }
    #endTurn() {
        if (this.#gameTurn < this.#playTurn.length - 1) {
            this.#gameTurn += 1;
        }
        else {
            this.#gameTurn = 0
        }
        this.#playDeck = [];
        this.#skip.destroy();
        this.#skip = this.add.image(1125, 100, `skip`);
        this.#startPlaying();
    }
    #displayPlayers() {
        for (let i = 0; i < this.#playTurn.length-1; i++) {
            this.#players[i].nameTag.destroy();
            this.#players[i].healthBar.destroy();
            this.#players[i].display.destroy();
            this.#players[i].nameTag = this.add.image(75, 155 + i * 115, `nameTag`);
            this.#players[i].healthBar = this.add.image(75, 210 + i * 115, `healthBar`);
            this.#players[i].display = this.add.text(25, 185 + i * 115, `${this.#players[i].health}/25`, { fontSize: "20px", color: "black" });
            if (this.#players[i].Scard.display != undefined) {
                this.#players[i].Scard.destroy();
            }
            if (this.#players[i].Scard.available == 1) {
                this.#players[i].Scard.display = this.add.image(180, 170 + i * 115, this.#ScardType);
                this.#players[i].Scard.display.setScale(0.6);
            }
        }
    }
    #displayPlayingCards() {
        if (this.#manaDisplay != undefined) {
            this.#manaDisplay.destroy();
        }
        this.#manaDisplay = this.add.text(300, 550, `${this.#mana}/${this.#playTurn[this.#gameTurn].maxMana} mana`, { fontSize: "20px", color: "black" });
        for (let i = 0; i < this.#cards.length; i++) {
            if (this.#cards[i] != undefined) {
                this.#cards[i].destroy();
            }
        }
        for (let i = 0; i < this.#playDeck.length; i++) {
            this.#cards[i] = this.add.image(755 - (this.#playDeck.length * 100 + (this.#playDeck.length - 1) * 20) / 2 + 120 * i, 450, this.#playDeck[i].type);
            if (this.#playDeck[i].manaTaken <= this.#mana) {
                this.#cards[i].setInteractive();
                this.#cards[i].on("pointerdown",
                    function () {
                        this.#mana -= this.#playDeck[i].manaTaken;
                        this.#movingObjects[0] = this.#cards[i];
                        this.#movingObjects[1] = this.#playDeck[i].function;
                        for (let I = 0; I < this.#playDeck.length; I++) {
                            this.#cards[I].removeInteractive();
                        }
                        this.#playDeck.splice(i, 1)
                    },
                    this);
            }
        }
        for (let i = 0; i < this.#playDeck.length; i++) {
            if (this.#playDeck[i].type == "VoDe") {
                this.#movingObjects[0] = this.#cards[i];
                this.#movingObjects[1] = this.#playDeck[i].function;
                for (let i = 0; i < this.#playDeck.length; i++) {
                    this.#cards[i].removeInteractive();
                }
                this.#skip.removeInteractive();
                this.#playDeck.splice(i, 1);
                break;
            }
        }
    }
    #displayBossCards() {
        for (let i = 0; i < this.#bossNumber; i++) {
            this.#bosses[i].destroy();
            this.#bossHealths[i].healthBar.destroy();
            this.#bossHealths[i].display.destroy();
            this.#bosses[i] = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 100, this.#bossesPhase[i].type);
            this.#bossHealths[i].healthBar = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 200, `healthBar`);
            this.#bossHealths[i].display = this.add.text(535 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 175, `${this.#bossesPhase[i].health}/${this.#bossesPhase[i].maxHealth}`, { fontSize: "20px", color: "black" });
        }
    }
    #moveToCenter(obj, x1, y1, x2, y2, t) {
        let vx = (x2 - x1) / t;
        let vy = (y2 - y1) / t;
        obj.x += vx;
        obj.y += vy;
        if (x1 < x2 + 0.2 && x1 > x2 - 0.2 && y1 < y2 + 0.2 && y1 > y2 - 0.2) {
            obj.x = 600;
            obj.y = 300;
            this.#movingObjects[0] = 0;
            this.#movingObjects[1]();
        }
    }
    update() {
        if (this.#movingObjects[0] != 0) {
            this.#moveToCenter(this.#movingObjects[0], this.#movingObjects[0].x, this.#movingObjects[0].y, 600, 300, 15);
        }
    }
}