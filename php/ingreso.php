<?php

include ("fx.php");

$arr_usuarios = getUsersData();

$data = array(
    'nick' => $_POST['nick'],
    'psw' => $_POST['psw']
);


if (isset($arr_usuarios[$data["nick"]])) {
    if (password_verify($data['psw'],$arr_usuarios[$data["nick"]]["psw"])) {
        echo "Bienvenido";
        if (isset($_COOKIE['nick']))
            setcookie('nick',' ',time()-1);
        setcookie('nick',$data["nick"]);
    } else {
        echo "Contraseña inválida";
    }
} else {
    echo "El nombre de usuario no existe";
}
