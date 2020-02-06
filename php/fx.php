<?php

function getUsersData() {
    if (file_exists("../statics/archives/registro.json")) {
        $datos_clientes = file_get_contents("../statics/archives/registro.json");
        return json_decode($datos_clientes, true);
    } else {
        return array();
    }
}

?>
