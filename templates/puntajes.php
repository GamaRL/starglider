
<?php
if (isset($_COOKIE['nick']))
        $user = $_COOKIE['nick'];
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../statics/css/puntaje.css">
    <title>Puntajes</title>
</head>
<body>
<a href="index.php">
    <div class="regresar">
        Regresar
    </div>
</a>
<h1>Puntajes</h1>
<?php
    include("../php/fx.php");
    $data = getOrderData();

    echo "<table>";
    echo "<tr><th>Nickname</th><th>Puntaje</th></tr>";

    foreach($data as $row) {
        if (!isset($mejores))
            $mejores = array($row['level'],1);
        else if ($mejores[1] <= 3) {
            if ($mejores[0] != $row['level'] && $mejores[1] != 3) {
                $mejores[0] = $row['level'];
            } else if ($mejores[0] == $row['level']) {
                $mejores[1]--;
            }
            $mejores[1]++;
        }

        switch ($mejores[1]) {
        case 1: $class = "oro";
                break;
        case 2: $class = "plata";
                break;
        case 3: $class = "bronce";
                break;
        default: $class = "";
                break;
        }

        if (strcmp($row['nick'],$user) == 0) {
            $class .= " user";
        }

        echo "<tr class='$class'>";

        echo "<td>".$row['nick']."</td>";
        echo "<td>".$row['level']."</td>";

        echo "</tr>";
    }


    echo "</table>";
?>
