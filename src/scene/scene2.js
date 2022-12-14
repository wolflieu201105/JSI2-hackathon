let phase = 0;
let player1 = {
    health: 25,
    dead: false,
    display: null,
    healthBar: null,
    nameTag: null,
    drawCards: 3,
    maxMana: 3,
    Scard: undefined,
    ScardNumber: 0,
    ScardNumberDisplay: undefined,
    defend: 0

};
let player2 = {
    health: 25,
    dead: false,
    display: null,
    healthBar: null,
    nameTag: null,
    drawCards: 3,
    maxMana: 3,
    Scard: undefined,
    ScardNumber: 0,
    ScardNumberDisplay: undefined,
    defend: 0
};
let player3 = {
    health: 25,
    dead: false,
    display: null,
    healthBar: null,
    nameTag: null,
    drawCards: 3,
    maxMana: 3,
    Scard: undefined,
    ScardNumber: 0,
    ScardNumberDisplay: undefined,
    defend: 0
};
let player4 = {
    health: 25,
    dead: false,
    display: null,
    healthBar: null,
    nameTag: null,
    drawCards: 3,
    maxMana: 3,
    Scard: undefined,
    ScardNumber: 0,
    ScardNumberDisplay: undefined,
    defend: 0
};
let players = [player1, player2, player3, player4];
class Scene2 extends Phaser.Scene {
    #playerTC;
    #swapTurn = 0;
    #swap1 = [];
    #swap2 = [];
    #protected = [];
    #protector = [];
    #ScardType = null;
    // tạo chỗ để xem cac thứ của boss
    #bossTurn = {
        display: undefined,
        background: undefined,
        turn: 1
    };
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
    #playTurn = [player1, player2, player3, player4, "boss"];
    #gameTurn = 0;
    #cardDrawn;
    #movingObjects = [0];
    #count;
    #test = 0;
    #natural = {
        naturalTurn: 0,
        naturalDisplay: undefined,
        turn: 0,
        displayPlayerTurn: undefined,
    }
    #MaxMinHealth = null;
    #ScardOutside;
    #XeDapThodrawn = [0,0,0,0];
    #bossStopped = 0;
    #beVanDandrawn = 0;
    // tạo ra các chức năng cho lá bài thường
    #tanCong() {
        this.#count = 0;
        for (let i = 0; i < this.#bossNumber; i++) {
            if (this.#bossesPhase[i].type == "XeThietGiap" || this.#bossesPhase[i].type == "B52") {
                this.#count += 1;
            }
        }
        if (this.#count == this.#bossNumber) {
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
            this.#displayBossCards();
            this.#displayPlayingCards();
            return;
        }
        for (let i = 0; i < this.#bossNumber; i++) {
            if (this.#bossesPhase[i].type == "ChienThuyen" || this.#bossesPhase[i].type == "XeThietGiap" || this.#bossesPhase[i].type == "B52") {
                continue;
            }
            this.#bosses[i].setInteractive();
            this.#bosses[i].on("pointerdown",
                function () {
                    for (let I = 0; I < this.#bossNumber; I++) {
                        this.#bosses[I].removeInteractive();
                    }
                    this.#bossesPhase[i].health -= 2;
                    this.#phasesTest[phase](this.#bossesPhase[i]);
                    if (this.#test == 1) {
                        this.#test = 0;
                        this.#skip.setInteractive();
                        this.#skip.on("pointerdown", this.#endTurn, this);
                        this.#displayBossCards();
                        this.#displayPlayingCards();
                        return;
                    }
                    if (this.#bossesPhase[i].health <= 0) {
                        this.#bossesPhase.splice(i, 1);
                        this.#bossKill(1);
                        return;
                    }
                    this.#skip.setInteractive();
                    this.#skip.on("pointerdown", this.#endTurn, this);
                    this.#displayBossCards();
                    this.#displayPlayingCards();
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
        players[this.#gameTurn].defend += 1;
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        this.#displayPlayingCards();
    }
    #PhongThu = {
        type: "PhongThu",
        function: this.#phongThu.bind(this),
        number: 10,
        manaTaken: 1
    }
    #baoHoDongMinh() {
        for (let i = 0; i < players.length; i++) {
            if (i == this.#gameTurn) {
                continue;
            }
            players[i].nameTag.setInteractive();
            players[i].nameTag.on("pointerdown",
                function () {
                    for (let I = 0; I < players.length; I++) {
                        players[I].nameTag.removeInteractive();
                    }
                    this.#protected.push(i);
                    this.#protector.push(this.#gameTurn);
                    this.#skip.setInteractive();
                    this.#skip.on("pointerdown", this.#endTurn, this);
                    this.#displayPlayingCards();
                    this.#displayPlayers();
                },
                this);
        }
    }
    #BaoHoDongMinh = {
        type: "BaoHoDongMinh",
        function: this.#baoHoDongMinh.bind(this),
        number: 5,
        manaTaken: 1
    }
    #capCuu() {
        if (players[1].dead == false && players[2].dead == false && players[3].dead == false && players[0].dead == false) {
            this.#mana += 2;
            this.#displayPlayingCards();
        }
        else {
            for (let I = 0; I < 8; I++) {
                if (this.#deck2[I] == this.#CapCuu) {
                    this.#deck2.splice(I, 1);
                    break;
                }
            }
            for (let i = 0; i < players.length; i++) {
                if (players[i].dead == true) {
                    players[i].nameTag.setInteractive();
                    players[i].nameTag.on("pointerdown",
                        function () {
                            for (let I = 0; I < players.length; I++) {
                                players[I].nameTag.removeInteractive();
                            }
                            players[i].dead = false;
                            players[i].health = 20;
                            this.#skip.setInteractive();
                            this.#skip.on("pointerdown", this.#endTurn, this);
                            this.#displayPlayingCards();
                            this.#displayPlayers();
                        },
                        this);
                }
            }
        }
    }
    #CapCuu = {
        type: "CapCuu",
        function: this.#capCuu.bind(this),
        number: 2,
        manaTaken: 2
    }
    #danXepDoiHinh() {
        for (let i = 0; i < players.length; i++) {
            players[i].nameTag.setInteractive();
            players[i].nameTag.on("pointerdown",
                function () {
                    players[i].nameTag.removeInteractive();
                    if (this.#swapTurn == 0) {
                        this.#swap1.push(i);
                        this.#swapTurn = 1;
                    }
                    else {
                        for (let I = 0; I < players.length; I++) {
                            players[I].nameTag.removeInteractive();
                        }
                        this.#swap2.push(i);
                        this.#swapTurn = 0;
                        this.#skip.setInteractive();
                        this.#skip.on("pointerdown", this.#endTurn, this);
                        this.#displayPlayingCards();
                        this.#displayPlayers();
                    }
                },
                this);
        }
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
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        this.#displayPlayingCards();
    }
    #DieuBinhKhienTuong = {
        type: "DieuBinhKhienTuong",
        function: this.#dieuBinhKhienTuong.bind(this),
        number: 5,
        manaTaken: 1
    }
    #duongThuong() {
        for (let i = 0; i < players.length; i++) {
            if (i == this.#gameTurn) {
                continue;
            }
            players[i].nameTag.setInteractive();
            players[i].nameTag.on("pointerdown",
                function () {
                    for (let I = 0; I < players.length; I++) {
                        players[I].nameTag.removeInteractive();
                    }
                    players[i].health += 2;
                    if (players[i].health > 25) {
                        players[i].health = 25;
                    }
                    this.#skip.setInteractive();
                    this.#skip.on("pointerdown", this.#endTurn, this);
                    this.#displayPlayingCards();
                    this.#displayPlayers();

                },
                this);
        }
    }
    #DuongThuong = {
        type: "DuongThuong",
        function: this.#duongThuong.bind(this),
        number: 8,
        manaTaken: 1
    }
    #tienThoaiLuongNan() {
        this.#count = 0;
        for (let i = 0; i < this.#bossNumber; i++) {
            if (this.#bossesPhase[i].type == 'XeThietGiap' || this.#bossesPhase[i].type == 'B52') {
                this.#count += 1;
            }
        }
        if (this.#count == this.#bossNumber) {
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
            this.#displayBossCards();
            this.#displayPlayingCards();
            return;
        }
        players[this.#gameTurn].health -= 2;
        if (players[this.#gameTurn].health <= 0) {
            players[this.#gameTurn].health = 0;
            players[this.#gameTurn].dead = true;
        }
        for (let i = 0; i < this.#bossNumber; i++) {
            if (this.#bossesPhase[i].type == "ChienThuyen") {
                continue;
            }
            this.#bosses[i].setInteractive();
            this.#bosses[i].on("pointerdown",
                function () {
                    for (let I = 0; I < this.#bossNumber; I++) {
                        this.#bosses[I].removeInteractive();
                    }
                    this.#bossesPhase[i].health -= 4;
                    this.#phasesTest[phase]();
                    if (this.#test == 1) {
                        this.#test = 0;
                        this.#skip.setInteractive();
                        this.#skip.on("pointerdown", this.#endTurn, this);
                        this.#displayBossCards();
                        this.#displayPlayingCards();
                        this.#displayPlayers();
                        return;
                    }
                    if (this.#bossesPhase[i].health <= 0) {
                        this.#bossesPhase.splice(i, 1);
                        this.#bossKill(1);
                        return;
                    }
                    this.#skip.setInteractive();
                    this.#skip.on("pointerdown", this.#endTurn, this);
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
    #muaTen() {
        this.#count = 0;
        for (let i = 0; i < this.#bossNumber; i++) {
            if (this.#bossesPhase[i].type == 'XeThietGiap' || this.#bossesPhase[i].type == 'B52') {
                this.#count += 1;
            }
        }
        if (this.#count == this.#bossNumber) {
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
            this.#displayBossCards();
            this.#displayPlayingCards();
            return;
        }
        this.#count = 0;
        for (let i = 0; i < this.#bossNumber; i++) {
            if (this.#bossesPhase[i] == undefined) {
                break;
            }
            this.#bossesPhase[i].health -= 1;
            if (this.#bossesPhase[i].type == "LuuHoangThao") {
                this.#phasesTest[phase]();
                if (this.#test == 1) {
                    this.#test = 0;
                }
            }
            if (this.#bossesPhase[i].health <= 0) {
                this.#bossesPhase.splice(i, 1);
                this.#count += 1;
                i -= 1;
            }
        }
        console.log(this.#count);
        if (this.#count != 0) {
            this.#bossKill(this.#count);
            return;
        }
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        this.#displayBossCards();
        this.#displayPlayingCards();
    }
    #MuaTen = {
        type: "MuaTen",
        function: this.#muaTen.bind(this),
        number: 5,
        manaTaken: 2
    }
    #dapDe() {
        for (let I = 0; I < 8; I++) {
            if (this.#deck2[I].type == "DapDe") {
                this.#deck2.splice(I, 1);
                break;
            }
        }
        for (let i = 0; i < players.length; i++) {
            if (players[i].Scard != undefined) {
                continue;
            }
            players[i].nameTag.setInteractive();
            players[i].nameTag.on("pointerdown",
                function () {
                    for (let I = 0; I < players.length; I++) {
                        players[I].nameTag.removeInteractive();
                    }
                    players[i].Scard = this.add.image(180, 170 + i * 115, this.#ScardType);
                    this.#skip.setInteractive();
                    this.#skip.on("pointerdown", this.#endTurn, this);
                    this.#displayPlayingCards();
                    this.#displayPlayers();
                },
                this);
        }
    }
    #DapDe = {
        type: "DapDe",
        function: this.#dapDe.bind(this),
        number: 4,
        manaTaken: 0
    }
    #voDe() {
        if (players[0].Scard == undefined && players[1].Scard == undefined && players[2].Scard == undefined && players[3].Scard == undefined || players[0].Scard != undefined && players[1].Scard != undefined && players[2].Scard != undefined && players[3].Scard != undefined) {
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
            this.#displayPlayingCards();
        }
        for (let i = 0; i < players.length; i++) {
            if (players[i].Scard == undefined) {
                continue;
            }
            players[i].nameTag.setInteractive();
            players[i].nameTag.on("pointerdown",
                function () {
                    for (let I = 0; I < players.length; I++) {
                        players[I].nameTag.removeInteractive();
                    }
                    players[i].Scard.destroy();
                    players[i].Scard = undefined;
                    this.#deck2.push(this.#DapDe);
                    this.#skip.setInteractive();
                    this.#skip.on("pointerdown", this.#endTurn, this);
                    this.#displayPlayingCards();
                    this.#displayPlayers();
                },
                this);
        }
    }
    #VoDe = {
        type: "VoDe",
        function: this.#voDe.bind(this),
        number: 4
    }
    #luLut() { }
    #LuLut = {
        type: "LuLut",
        function: this.#luLut.bind(this),
    }
    #thuyTinh() { }
    #ThuyTinh = {
        type: "ThuyTinh",
        function: this.#thuyTinh.bind(this),
        maxHealth: 35,
        health: 7
    }
    // phase 2
    #chienThuyen() { }
    #ChienThuyen = {
        type: "ChienThuyen",
        function: this.#chienThuyen.bind(this),
        maxHealth: 10,
        health: 5
    }
    #coc() {
        for (let I = 0; I < 8; I++) {
            if (this.#deck2[I].type == "Coc") {
                this.#deck2.splice(I, 1);
                break;
            }
        }
        for (let i = 0; i < players.length; i++) {
            players[i].nameTag.setInteractive();
            players[i].nameTag.on("pointerdown",
                function () {
                    for (let I = 0; I < players.length; I++) {
                        players[I].nameTag.removeInteractive();
                    }
                    players[i].ScardNumber += 1;
                    players[i].Scard = this.add.image(180, 170 + i * 115, this.#ScardType);
                    this.#skip.setInteractive();
                    this.#skip.on("pointerdown", this.#endTurn, this);
                    this.#displayPlayingCards();
                    this.#displayPlayers();
                },
                this);
        }
    }
    #cocPhase2(damage) {
        if (this.#bossNumber <= 1) {
            this.#natural.displayPlayerTurn.destroy();
            this.#phase2Boss();
        }
        else {
            for (let i = 0; i < this.#bossNumber; i++) {
                this.#bosses[i].setInteractive();
                this.#bosses[i].on("pointerdown",
                    function () {
                        this.#natural.displayPlayerTurn.destroy();
                        for (let I = 0; I < this.#bossNumber; I++) {
                            this.#bosses[I].removeInteractive();
                        }
                        this.#bossesPhase[i].health -= damage;
                        if (this.#bossesPhase[i].health <= 0) {
                            this.#bossesPhase.splice(i, 1);
                            for (let I = 0; I < this.#bossNumber; I++) {
                                this.#bosses[I].destroy();
                                this.#bossHealths[I].healthBar.destroy();
                                this.#bossHealths[I].display.destroy();
                            }
                            this.#bossNumber -= 1;
                            this.#displayBossCards();
                            this.#phase2Boss();
                            return;
                        }
                        this.#displayBossCards();
                        this.#phase2Boss();
                    },
                    this);
            }
        }
    }
    #Coc = {
        type: "Coc",
        function: this.#coc.bind(this),
        bossFunction: this.#cocPhase2.bind(this),
        number: 5,
        manaTaken: 1
    }
    #luuHoangThao() { }
    #LuuHoangThao = {
        type: "LuuHoangThao",
        function: this.#luuHoangThao.bind(this),
        maxHealth: 30,
        health: 5
    }
    #thuyTrieuCao() { }
    #ThuyTrieuCao = {
        type: "ThuyTrieuCao",
        function: this.#thuyTrieuCao.bind(this)
    }
    #thuyTrieuThap() { }
    #ThuyTrieuThap = {
        type: "ThuyTrieuThap",
        function: this.#thuyTrieuThap.bind(this)
    }
    // phase 3
    #quanNguyenMong() { }
    #QuanNguyenMong = {
        type: "QuanNguyenMong",
        function: this.#quanNguyenMong.bind(this),
        maxHealth: 40,
        health: 7
    }
    #vuonKhongNhaTrong() {
        for (let I = 0; I < 8; I++) {
            if (this.#deck2[I].type == "VuonKhongNhaTrong") {
                this.#deck2.splice(I, 1);
                break;
            }
        }
        if (players[0].Scard != undefined && players[1].Scard != undefined && players[2].Scard != undefined && players[3].Scard != undefined) {
            this.#ScardOutside = this.add.image(800, 100, this.#ScardType.type);
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
            this.#displayPlayingCards();
            this.#displayPlayers();
        }
        else {
            for (let i = 0; i < players.length; i++) {
                if (players[i].Scard != undefined) {
                    continue;
                }
                players[i].nameTag.setInteractive();
                players[i].nameTag.on("pointerdown",
                    function () {
                        for (let I = 0; I < players.length; I++) {
                            players[I].nameTag.removeInteractive();
                        }
                        players[i].Scard = this.add.image(180, 170 + i * 115, this.#ScardType);
                        this.#skip.setInteractive();
                        this.#skip.on("pointerdown", this.#endTurn, this);
                        this.#displayPlayingCards();
                        this.#displayPlayers();
                    },
                    this);
            }
        }
    }
    #VuonKhongNhaTrong = {
        type: "VuonKhongNhaTrong",
        function: this.#vuonKhongNhaTrong.bind(this),
        number: 5,
        manaTaken: 1
    }
    // phase 4
    #beVanDan() {
        this.#beVanDandrawn = 2;
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        this.#displayPlayingCards();
        this.#displayPlayers();
    }
    #BeVanDan = {
        type: "BeVanDan",
        function: this.#beVanDan.bind(this),
        number: 3,
        manaTaken: 2
    }
    #phanDinhGiot() {
        this.#bossStopped += 1;
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        this.#displayPlayingCards();
        this.#displayPlayers();
    }
    #PhanDinhGiot = {
        type: "PhanDinhGiot",
        function: this.#phanDinhGiot.bind(this),
        number: 2,
        manaTaken: 2
    }
    #xeDapTho() {
        this.#XeDapThodrawn[[this.#gameTurn]] = 1;
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        this.#displayPlayingCards();
        this.#displayPlayers();
    }
    #XeDapTho = {
        type: "XeDapTho",
        function: this.#xeDapTho.bind(this),
        number: 3,
        manaTaken: 2
    }
    #quanPhap() { }
    #QuanPhap = {
        type: "QuanPhap",
        function: this.#quanPhap.bind(this),
        health: 4,
        maxHealth: 8
    }
    //phase 5
    #b52() { }
    #B52 = {
        type: "B52",
        function: this.#b52.bind(this),
        health: 1,
        maxHealth: 35
    }
    #xeThietGiap() { }
    #XeThietGiap = {
        type: "XeThietGiap",
        function: this.#xeThietGiap.bind(this),
        health: 1,
        maxHealth: 25
    }
    #quanLinh() { }
    #QuanLinh = {
        type: "QuanLinh",
        function: this.#quanLinh.bind(this),
        health: 1,
        maxHealth: 15
    }
    #baDoKa() { }
    #BaDoKa = {
        type: "BaDoKa",
        function: this.#baDoKa.bind(this),
        number: 5
    }
    #duKich() { }
    #DuKich = {
        type: "DuKich",
        function: this.#duKich.bind(this),
        number: 2
    }
    #sungPhongKhong() { }
    #SungPhongKhong = {
        type: "SungPhongKhong",
        function: this.#sungPhongKhong.bind(this),
        number: 3
    }
    constructor() {
        super("playGame");
    }
    create() {
        // tạo image người chơi vào trang
        for (let i = 0; i < players.length; i++) {
            players[i].nameTag = this.add.image(75, 155 + i * 115, `nameTag`);
            players[i].healthBar = this.add.image(75, 210 + i * 115, `healthBar`);
            players[i].display = this.add.text(25, 185 + i * 115, `${players[i].health}/25`, { fontSize: "20px", color: "black" });
        }
        this.#displayPlayers()
        // tạo chỗ cho thời gian, skip và những thứ bên lề
        this.#skip = this.add.image(1125, 100, `skip`);
        this.#playTurnDisplay = this.add.text(1075, 22.5, `player ${this.#gameTurn}`, { fontSize: "20px", color: "black" });
        // tạo chỗ cho những thứ của người đang chơi
        for (let i = 0; i < this.#InitialCards.length; i++) {
            for (let y = 0; y < this.#InitialCards[i].number; y++) {
                this.#deck1.push(this.#InitialCards[i].type);
            }
        }
        this.#bossTurn.turn = 1;
        this.#displayBossTurn();
        this.#phases[phase]();
    }
    #startPlaying() {
        if (this.#playTurn[this.#gameTurn] == "boss") {
            this.#playTurnDisplay.destroy();
            if (this.#manaDisplay != undefined) {
                this.#manaDisplay.destroy();
            }
            for (let i = 0; i < this.#cards.length; i++) {
                if (this.#cards[i] != undefined) {
                    this.#cards[i].destroy();
                }
            }
            this.#playTurnDisplay = this.add.text(1075, 22.5, `boss`, { fontSize: "20px", color: "black" });
            for (let i = this.#swap1.length - 1; i >= 0; i--) {
                this.#playerTC = players[this.#swap1[i]];
                players[this.#swap1[i]] = players[this.#swap2[i]];
                players[this.#swap2[i]] = this.#playerTC;
            }
            this.#phasesBoss[phase]();
        }
        else {
            this.#playTurnDisplay.destroy();
            this.#playTurnDisplay = this.add.text(1075, 22.5, `player ${this.#gameTurn + 1}`, { fontSize: "20px", color: "black" });
            for (let i = 0; i < players[this.#gameTurn].drawCards; i++) {
                if (this.#deck1.length == 0) {
                    this.#deck1 = [...this.#deck2];
                    this.#deck2 = [];
                }
                this.#cardDrawn = Math.floor(Math.random() * this.#deck1.length);
                this.#deck2.unshift(this.#deck1[this.#cardDrawn]);
                this.#playDeck.push(this.#deck1[this.#cardDrawn]);
                this.#deck1.splice(this.#cardDrawn, 1);
            }
            players[this.#gameTurn].drawCards = 3;
            this.#mana = this.#playTurn[this.#gameTurn].maxMana;
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
            this.#displayPlayingCards();
        }
    }
    #endTurn() {
        if (this.#playTurn[this.#gameTurn] != "boss") {
            this.#playTurn[this.#gameTurn].maxMana = 3;
        }
        if (this.#gameTurn < this.#playTurn.length - 1) {
            this.#gameTurn += 1;
        }
        else {
            this.#gameTurn = 0
        }
        this.#playDeck = [];
        this.#skip.destroy();
        this.#skip = this.add.image(1125, 100, `skip`);
        this.#displayBossCards();
        this.#startPlaying();
    }
    #displayPlayers() {
        for (let i = 0; i < players.length; i++) {
            if (phase == 1) {
                if (players[i].ScardNumberDisplay != undefined) {
                    players[i].ScardNumberDisplay.destroy();
                }
                if (players[i].ScardNumber > 0) {
                    players[i].ScardNumberDisplay = this.add.text(220, 160 + i * 115, `x ${players[i].ScardNumber}`, { fontSize: "20px", color: "black" })
                }
            }
            players[i].nameTag.destroy();
            players[i].healthBar.destroy();
            players[i].display.destroy();
            players[i].nameTag = this.add.image(75, 155 + i * 115, `nameTag`);
            players[i].healthBar = this.add.image(75, 210 + i * 115, `healthBar`);
            players[i].display = this.add.text(25, 185 + i * 115, `${players[i].health}/25`, { fontSize: "20px", color: "black" });
            if (players[i].Scard != undefined) {
                players[i].Scard.destroy();
                players[i].Scard = this.add.image(180, 170 + i * 115, this.#ScardType.type);
                players[i].Scard.setScale(0.6);
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
                        this.#skip.destroy();
                        this.#skip = this.add.image(1125, 100, `skip`);
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
                this.#skip.destroy();
                this.#skip = this.add.image(1125, 100, `skip`);
                this.#playDeck.splice(i, 1);
                break;
            }
        }
    }
    #displayBossCards() {
        for (let i = 0; i < this.#bossNumber; i++) {
            if (this.#bosses[i] != undefined) {
                this.#bosses[i].destroy();
                this.#bossHealths[i].healthBar.destroy();
                this.#bossHealths[i].display.destroy();
            }
            this.#bosses[i] = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 100, this.#bossesPhase[i].type);
            this.#bossHealths[i].healthBar = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 200, `healthBar`);
            this.#bossHealths[i].display = this.add.text(535 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 175, `${this.#bossesPhase[i].health}/${this.#bossesPhase[i].maxHealth}`, { fontSize: "20px", color: "black" });
        }
    }
    #displayBossTurn() {
        if (this.#bossTurn.background != undefined) {
            this.#bossTurn.background.destroy();
            this.#bossTurn.display.destroy();
        }
        this.#bossTurn.background = this.add.image(117.5, 62.5, `bossTurn`);
        this.#bossTurn.display = this.add.text(70, 52.5, `Turn ${this.#bossTurn.turn}/3`, { fontSize: "20px", color: "black" });
    }
    #bossKill(number) {
        for (let I = 0; I < this.#bossNumber; I++) {
            this.#bosses[I].destroy();
            this.#bossHealths[I].healthBar.destroy();
            this.#bossHealths[I].display.destroy();
        }
        this.#bossNumber -= number;
        if (this.#bossNumber == 0) {
            if (phase == 1) {
                this.#natural.naturalDisplay.destroy();
                this.#natural.naturalDisplay = undefined;
            }
            if (phase == 2) {
                if (this.#ScardOutside != undefined) {
                    this.#ScardOutside.destroy();
                }
            }
            this.#playTurnDisplay.destroy();
            this.#skip.destroy();
            for (let i = 0; i < players.length; i++) {
                players[i].nameTag.destroy();
                players[i].healthBar.destroy();
                players[i].display.destroy();
                players[i].ScardNumber = 0;
                if (players[i].ScardNumberDisplay != undefined) {
                    players[i].ScardNumberDisplay.destroy();
                    players[i].ScardNumberDisplay = undefined;
                }
                if (players[i].Scard != undefined) {
                    players[i].Scard.destroy();
                    players[i].Scard = undefined;
                }
            }
            if (this.#manaDisplay != undefined) {
                this.#manaDisplay.destroy();
            }
            for (let i = 0; i < this.#cards.length; i++) {
                if (this.#cards[i] != undefined) {
                    this.#cards[i].destroy();
                }
            }
            this.#bossTurn.background.destroy();
            this.#bossTurn.display.destroy();
            phase += 1;
            this.create();
        }
        else {
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
            this.#displayBossCards();
            this.#displayPlayingCards();
        }
    }
    #moveToCenter(obj, x1, y1, x2, y2, t) {
        obj.x += (x2 - x1) / t;
        obj.y += (y2 - y1) / t;
        if (x1 < x2 + 0.2 && x1 > x2 - 0.2 && y1 < y2 + 0.2 && y1 > y2 - 0.2) {
            obj.x = 600;
            obj.y = 300;
            obj.setScale(1);
            this.#movingObjects[0] = 0;
            this.#movingObjects[1]();
        }
    }
    update() {
        if (this.#movingObjects[0] != 0) {
            this.#moveToCenter(this.#movingObjects[0], this.#movingObjects[0].x, this.#movingObjects[0].y, 600, 300, 10);
        }
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
        for (let i = 0; i < this.#MuaTen.number; i++) {
            this.#deck1.push(this.#MuaTen);
        }
        this.#bossNumber = 1;
        this.#bossesPhase = [{ ...this.#ThuyTinh }];
        this.#displayBossCards()
        this.#ScardType = this.#DapDe;
        this.#gameTurn = 0;
        this.#startPlaying();
    }
    #phase1Boss() {
        if (this.#bossTurn.turn == 1) {
            for (let i = 0; i < players.length; i++) {
                if (players[i].Scard == undefined) {
                    players[i].health -= 2;
                }
            }
        }
        else if (this.#bossTurn.turn == 2) {
            if (players[0].defend < 2) {
                players[0].health -= (2 - players[0].defend);
            }
            if (players[2].defend < 2) {
                players[2].health -= (2 - players[2].defend);
            }
        }
        else {
            if (players[1].defend < 2) {
                players[1].health -= (2 - players[1].defend);
            }
            if (players[3].defend < 2) {
                players[3].health -= (2 - players[3].defend);
            }
        }
        for (let i = 0; i < 4; i++) {
            players[i].defend = 0;
            if (players[i].health <= 0) {
                players[i].dead = true;
            }
        }
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        if (this.#bossTurn.turn < 3) {
            this.#bossTurn.turn += 1;
        }
        else {
            this.#bossTurn.turn = 1
        }
        this.#displayBossTurn();
        this.#displayBossCards();
        this.#displayPlayers();
    }
    #phase1Test() {
    }
    #phase2() {
        this.#deck1 = [];
        this.#deck2 = [];
        this.#playDeck = [];
        for (let i = 0; i < this.#InitialCards.length; i++) {
            for (let y = 0; y < this.#InitialCards[i].number; y++) {
                this.#deck1.push(this.#InitialCards[i]);
            }
        }
        for (let i = 0; i < this.#Coc.number; i++) {
            this.#deck1.push(this.#Coc);
        }
        for (let i = 0; i < this.#MuaTen.number; i++) {
            this.#deck1.push(this.#MuaTen);
        }
        this.#bossNumber = 3;
        this.#bossesPhase = [{ ...this.#ChienThuyen }, { ...this.#ChienThuyen }, { ...this.#LuuHoangThao }];
        this.#natural.naturalDisplay = this.add.image(1100, 300, this.#ThuyTrieuThap.type);
        for (let i = 0; i < this.#bossNumber; i++) {
            this.#bosses[i] = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 100, this.#bossesPhase[i].type);
            this.#bossHealths[i].healthBar = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 200, `healthBar`);
            this.#bossHealths[i].display = this.add.text(535 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 175, `${this.#bossesPhase[i].health}/${this.#bossesPhase[i].maxHealth}`, { fontSize: "20px", color: "black" });
        }
        this.#ScardType = this.#Coc;
        this.#gameTurn = 0;
        this.#startPlaying();
    }
    #phase2Boss() {
        if (this.#natural.naturalTurn == 1) {
            this.#natural.turn += 1;
            if (this.#natural.turn > 4) {
                this.#natural.turn = 0;
                this.#skip.setInteractive();
                this.#skip.on("pointerdown", this.#endTurn, this);
            }
        }
        if (this.#natural.turn >= 1) {
            if (players[this.#natural.turn - 1].Scard == undefined) {
                this.#phase2Boss()
            }
            else {
                this.#skip.destroy();
                this.#skip = this.add.image(1125, 100, `skip`);
                this.#natural.displayPlayerTurn = this.add.text(350, 290, `Người chơi ${this.#natural.turn} chọn chiền thuyến để gây sát thương`, { fontSize: "20px", color: "black" });
                this.#cocPhase2(players[this.#natural.turn - 1].ScardNumber);
            }
        }
        else if (this.#natural.turn == 0) {
            if (this.#natural.naturalTurn == 1) {
                this.#natural.naturalTurn = 0;
                this.#natural.naturalDisplay = this.add.image(1100, 300, this.#ThuyTrieuThap.type);
            }
            else {
                this.#natural.naturalTurn = 1;
                this.#natural.naturalDisplay = this.add.image(1100, 300, this.#ThuyTrieuCao.type);
            }
            if (this.#bossTurn.turn == 1) {
                if (players[0].defend < 3) {
                    players[0].health -= (3 - players[0].defend);
                }
                if (players[1].defend < 3) {
                    players[1].health -= (3 - players[1].defend);
                }
            }
            else if (this.#bossTurn.turn == 2) {
                if (players[3].defend < 3) {
                    players[3].health -= (3 - players[3].defend);
                }
                if (players[2].defend < 3) {
                    players[2].health -= (3 - players[2].defend);
                }
            }
            else {
                for (let i = 0; i < this.#bossesPhase.length; i++) {
                    if (this.#bossesPhase[i].type == "LuuHoangThao") {
                        this.#bossesPhase[i].health += 4;
                    }
                    else {
                        this.#bossesPhase[i].health += 2;
                    }
                    if (this.#bossesPhase[i].health >= this.#bossesPhase[i].maxHealth) {
                        this.#bossesPhase[i].health = this.#bossesPhase[i].maxHealth;
                    }
                }
            }
            for (let i = 0; i < 4; i++) {
                players[i].defend = 0;
                if (players[i].health <= 0) {
                    players[i].dead = true;
                }
            }
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
            if (this.#bossTurn.turn < 3) {
                this.#bossTurn.turn += 1;
            }
            else {
                this.#bossTurn.turn = 1
            }
            this.#displayBossTurn();
            this.#displayBossCards();
            this.#displayPlayers();
        }
    }
    #phase2Test() {
        if (this.#bossesPhase.length > 1 && this.#bossesPhase[this.#bossesPhase.length - 1].health <= 0) {
            this.#test = 1;
            this.#bossesPhase[this.#bossesPhase.length - 1].health = 1;
        }
        else {
            this.#test = 0;
        }
    }
    #phase3() {
        this.#deck1 = [];
        this.#deck2 = [];
        this.#playDeck = [];
        for (let i = 0; i < this.#InitialCards.length; i++) {
            for (let y = 0; y < this.#InitialCards[i].number; y++) {
                this.#deck1.push(this.#InitialCards[i]);
            }
        }
        for (let i = 0; i < this.#VuonKhongNhaTrong.number; i++) {
            this.#deck1.push(this.#VuonKhongNhaTrong);
        }
        for (let i = 0; i < this.#MuaTen.number; i++) {
            this.#deck1.push(this.#MuaTen);
        }
        this.#bossNumber = 1;
        this.#bossesPhase = [{ ...this.#QuanNguyenMong }];
        for (let i = 0; i < this.#bossNumber; i++) {
            this.#bosses[i] = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 100, this.#bossesPhase[i].type);
            this.#bossHealths[i].healthBar = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 200, `healthBar`);
            this.#bossHealths[i].display = this.add.text(535 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 175, `${this.#bossesPhase[i].health}/${this.#bossesPhase[i].maxHealth}`, { fontSize: "20px", color: "black" });
        }
        this.#ScardType = this.#VuonKhongNhaTrong;
        this.#gameTurn = 4;
        this.#startPlaying();
    }
    #phase3Boss() {
        if (this.#bossTurn.turn == 1) {
            this.#MaxMinHealth = 25;
            for (let i = 0; i < players.length; i++) {
                if (players[i].dead == true) {
                    continue;
                }
                if (this.#MaxMinHealth > players[i].health) {
                    this.#MaxMinHealth = players[i].health;
                }
            }
            for (let i = 0; i < players.length; i++) {
                if (players[i].health == this.#MaxMinHealth) {
                    players[i].health -= 3;
                }
            }
        }
        else if (this.#bossTurn.turn == 2) {
            for (let i = 0; i < players.length; i++) {
                if (players[i].Scard == undefined) {
                    players[i].drawCards = 2;
                }
            }
        }
        else {
            if (this.#ScardOutside == undefined) {
                this.#phasesBoss[0].health += 3;
            }
            this.#MaxMinHealth = 0;
            for (let i = 0; i < players.length; i++) {
                if (players[i].dead == true) {
                    continue;
                }
                if (this.#MaxMinHealth < players[i].health) {
                    this.#MaxMinHealth = players[i].health;
                }
            }
            for (let i = 0; i < players.length; i++) {
                if (players[i].health == this.#MaxMinHealth) {
                    players[i].health -= 4;
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            players[i].defend = 0;
            if (players[i].health <= 0) {
                players[i].dead = true;
            }
        }
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        if (this.#bossTurn.turn < 3) {
            this.#bossTurn.turn += 1;
        }
        else {
            this.#bossTurn.turn = 1
        }
        this.#displayBossTurn();
        this.#displayBossCards();
        this.#displayPlayers();
    }
    #phase3Test() { }
    #phase4() {
        this.#deck1 = [];
        this.#deck2 = [];
        this.#playDeck = [];
        for (let i = 0; i < this.#InitialCards.length; i++) {
            for (let y = 0; y < this.#InitialCards[i].number; y++) {
                this.#deck1.push(this.#InitialCards[i]);
            }
        }
        for (let i = 0; i < this.#BeVanDan.number; i++) {
            this.#deck1.push(this.#BeVanDan);
        }
        for (let i = 0; i < this.#XeDapTho.number; i++) {
            this.#deck1.push(this.#XeDapTho);
        }
        for (let i = 0; i < this.#PhanDinhGiot.number; i++) {
            this.#deck1.push(this.#PhanDinhGiot);
        }
        this.#bossNumber = 2;
        this.#bossesPhase = [{ ...this.#QuanPhap }, { ...this.#QuanPhap }];
        for (let i = 0; i < this.#bossNumber; i++) {
            this.#bosses[i] = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 100, this.#bossesPhase[i].type);
            this.#bossHealths[i].healthBar = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 200, `healthBar`);
            this.#bossHealths[i].display = this.add.text(535 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 175, `${this.#bossesPhase[i].health}/${this.#bossesPhase[i].maxHealth}`, { fontSize: "20px", color: "black" });
        }
        this.#gameTurn = 0;
        this.#startPlaying();
    }
    #phase4Boss() {
        if (this.#beVanDandrawn != 0) {
            this.#beVanDandrawn -= 1;
        }
        for (let i = 0; i < this.#XeDapThodrawn.length; i++) {
            if (this.#XeDapThodrawn[i] == 1) {
                this.#XeDapThodrawn[i] = 0;
                players[i].drawCards = 4;
                players[i].maxMana = 4;
            }
        }
        if (this.#bossStopped != 0) {
            this.#bossStopped -= 1;
            this.#skip.setInteractive();
            this.#skip.on("pointerdown", this.#endTurn, this);
            this.#displayBossTurn();
            this.#displayBossCards();
            this.#displayPlayers();
            return;
        }
        if (this.#bossTurn.turn == 1) {
            if (players[0].defend < 3) {
                players[0].health -= (4 - players[0].defend);
            }
            if (players[1].defend < 3) {
                players[1].health -= (3 - players[2].defend);
            }
            if (players[2].defend < 2) {
                players[2].health -= (2 - players[0].defend);
            }
            if (players[3].defend < 2) {
                players[3].health -= (2 - players[2].defend);
            }
        }
        else if (this.#bossTurn.turn == 2) {
            for (let i = 0; i < players.length; i++) {
                if (players[i].defend < this.#bossesPhase.length) {
                    players[i].health -= (this.#bossesPhase.length - players[0].defend);
                }
            }
        }
        else {
            if (this.#bossNumber < 5) {
                this.#bossesPhase.push({...this.#QuanPhap});
                this.#bossNumber += 1;
            }
        }
        for (let i = 0; i < 4; i++) {
            players[i].defend = 0;
            if (players[i].health <= 0) {
                players[i].dead = true;
            }
        }
        this.#skip.setInteractive();
        this.#skip.on("pointerdown", this.#endTurn, this);
        if (this.#bossTurn.turn < 3) {
            this.#bossTurn.turn += 1;
        }
        else {
            this.#bossTurn.turn = 1
        }
        this.#displayBossTurn();
        this.#displayBossCards();
        this.#displayPlayers();
    }
    #phase4Test(boss) {
        if (this.#beVanDandrawn != 0) {
            boss.health -= 2;
        }
    }
    #phase5() {
        this.#deck1 = [];
        this.#deck2 = [];
        this.#playDeck = [];
        for (let i = 0; i < this.#InitialCards.length; i++) {
            for (let y = 0; y < this.#InitialCards[i].number; y++) {
                this.#deck1.push(this.#InitialCards[i]);
            }
        }
        for (let i = 0; i < this.#BaDoKa.number; i++) {
            this.#deck1.push(this.#BaDoKa);
        }
        for (let i = 0; i < this.#DuKich.number; i++) {
            this.#deck1.push(this.#DuKich);
        }
        for (let i = 0; i < this.#SungPhongKhong.number; i++) {
            this.#deck1.push(this.#SungPhongKhong);
        }
        this.#bossNumber = 3;
        this.#bossesPhase = [{ ...this.#B52 }, { ...this.#XeThietGiap }, { ...this.#QuanLinh }];
        for (let i = 0; i < this.#bossNumber; i++) {
            this.#bosses[i] = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 100, this.#bossesPhase[i].type);
            this.#bossHealths[i].healthBar = this.add.image(585 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 200, `healthBar`);
            this.#bossHealths[i].display = this.add.text(535 - (this.#bossNumber * 100 + (this.#bossNumber - 1) * 25) / 2 + 125 * i, 175, `${this.#bossesPhase[i].health}/${this.#bossesPhase[i].maxHealth}`, { fontSize: "20px", color: "black" });
        }
        this.#gameTurn = 0;
        this.#startPlaying();
    }
    #phase5Boss() { }
    #phase5Test() { }
    #phases = [this.#phase1.bind(this), this.#phase2.bind(this), this.#phase3.bind(this), this.#phase4.bind(this), this.#phase5.bind(this)];
    #phasesBoss = [this.#phase1Boss.bind(this), this.#phase2Boss.bind(this), this.#phase3Boss.bind(this), this.#phase4Boss.bind(this), this.#phase5Boss.bind(this)];
    #phasesTest = [this.#phase1Test.bind(this), this.#phase2Test.bind(this), this.#phase3Test.bind(this), this.#phase4Test.bind(this), this.#phase5Test.bind(this)];
}