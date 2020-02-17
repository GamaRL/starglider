<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Starglider</title>
    <link rel="stylesheet" href="../statics/css/index.css">

</head>

<body>
<h1>Starglider</h1>

<ul class="menu">
    <a href="registro.html"><span class="menu-span"></span>
        <li class="menu-item 1_"><span>Registrarse</span></li>
    </a>
    <a href="ingresar.html"><span class="menu-span"></span>
        <li class="menu-item 2_"><span>Ingresar</span></li>
    </a>
    <a href="instrucciones.html"><span class="menu-span"></span>
        <li class="menu-item 3_"><span>Instrucciones</span></li>
    </a>
    <a href="puntajes.php"><span class="menu-span"></span>
        <li class="menu-item 4_"><span>Resultados</span></li>
    </a>
    <a href="game.php"><span class="menu-span"></span>
        <li class="menu-item 5_"><span>Jugar</span></li>
    </a>
</ul>
<?php
    if (isset($_COOKIE['nick'])) {
        echo "<div class='info_user'><span>Bienvenido:</span> $_COOKIE[nick] <button><a href='../php/close.php'>Cerrar Sesión</a></button></div>";
    }
?>
</body>
</html>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="../js/index.js"></script>
