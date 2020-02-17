<?php
include("fx.php");

$return = array(false, "Las contraseñas no coinciden");

if (strcmp($_POST['psw'], $_POST['cpsw']) == 0) {

	$arr_usuarios = getUsersData();

	$data = array(
		'name' => $_POST['name'],
		'nick' => $_POST['nick'],
		'psw' => password_hash($_POST['psw'], PASSWORD_DEFAULT),
		'level' => 0
	);

	if (isset($arr_usuarios[$data['nick']])) {
		$return[1] = "El nombre de usuario ya fue registrado";
	} else {
		$arr_usuarios[$data['nick']] = $data;
		$return[0] = true;
		$return[1] = "Te has regitrado exitosamente";
	}

	$json_string = json_encode($arr_usuarios);
	$file = "../statics/archives/registro.json";
	file_put_contents($file, $json_string);

	if (isset($_COOKIE['nick']))
        setcookie('nick',' ',time()-1, "/");
    setcookie('nick',$data["nick"], time()+60*60*24*30, "/");
}

echo json_encode($return);
