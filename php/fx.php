<?php

function getUsersData() {
    if (file_exists("../statics/archives/registro.json")) {
        $datos_clientes = file_get_contents("../statics/archives/registro.json");
        return json_decode($datos_clientes, true);
    } else {
        return array();
    }
}

function setNickCookie($nick) {
    if (isset($_COOKIE['nick']))
        setcookie('nick',' ',time()-1, "/");
    setcookie('nick',$nick, time()+60*60*24*30, "/");
}

function getOrderData() {
    $data = getUsersData();

    foreach ($data as $key => $row) {
        $level[$key] = $row['level'];
    }
    array_multisort($level, SORT_DESC, $data);
    return $data;
}
?>
