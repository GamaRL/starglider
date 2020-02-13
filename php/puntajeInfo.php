<?php

include("fx.php");

$return = array();

	$arr_usuarios = getUsersData();

    $nick = $_COOKIE['nick'];
    $level = intval($_POST['puntaje']);

    if ($arr_usuarios[$nick]['level'] < $level) {
        array_push($return,
            array("Nuevo récord: ", $level),
            array("Antrior récord: ", $arr_usuarios[$nick]['level'])
        );
        $arr_usuarios[$nick]['level'] = $level;
    } else {
        array_push($return,
            array("Resultado: ", $level),
            array("Récord: ", $arr_usuarios[$nick]['level'])
        );
    }

	$json_string = json_encode($arr_usuarios);
	$file = "../statics/archives/registro.json";
	file_put_contents($file, $json_string);


echo json_encode($return);
