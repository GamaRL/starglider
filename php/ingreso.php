<?php

include ("fx.php");

$arr_usuarios = getUsersData();

$data = array(
    'nick' => $_POST['nick'],
    'psw' => $_POST['psw']
);

$return = array(false,"El nombre de usuario no existe");


if (isset($arr_usuarios[$data["nick"]])) {
    if (password_verify($data['psw'],$arr_usuarios[$data["nick"]]["psw"])) {
        $return[0] = true;
        $return[1] = "Bienvenido";

        if (isset($_COOKIE['nick']))
            setcookie('nick',' ',time()-1);
        setcookie('nick',$data["nick"]);
    } else {
        $return[1] = "Contraseña inválida";
    }
}

echo json_encode($return);
