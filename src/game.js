const config = {
    width: 1200,
    height: 600,
    backgroundColor: "#FDFF8E",
    pixelArt: true,
    physics: {
        default: 'arcade'
    },
    scene: [Scene1, Scene2]
}
window.addEventListener("load", function(ev) {
    const game = new Phaser.Game(config);
});