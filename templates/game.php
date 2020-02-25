<?php
if (!isset($_COOKIE['nick'])) {
    header('Location: index.php');
}
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Game</title>

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

    <link rel="stylesheet" href="../statics/css/game.css">
    <script src="../js/vendor/three.min.js"></script>
    <script src="../js/vendor/FlyControls.js"></script>
    <script src="../js/vendor/GLTFLoader.js"></script>
    <script src="../js/game.js"></script>
    <script src="../js/clases/Radar.js"></script>
    <script src="../js/clases/Jugador.js"></script>
    <script src="../js/clases/Bala.js"></script>
    <script src="../js/clases/Mira.js"></script>
    <script src="../js/clases/Misiles.js"></script>
    <script src="../js/clases/Nave.js"></script>
    <script src="../js/clases/Sound.js"></script>
    <script src="../js/clases/Escudo.js"></script>
    <script src="../js/clases/Historia.js"></script>
    <script src="../js/clases/Planeta.js"></script>
    <script src="../js/clases/Meteoro.js"></script>
    <script src="../js/clases/Juego.js"></script>

</head>
<body>

<div id="game_output">
    <!--Aquí va la salida del juego-->
</div>
<div id="modal">
    <div class="content">
        <h2>El Juego Ha Terminado</h2>
        <button> <a href="game.php">Reintentar</a></button>
        <button> <a href="index.php">Menú</a></button>
        <div class="n_resultado">
        </div>
        <div class="b_resultado">
        </div>
    </div>
</div>

</body>
</html>
