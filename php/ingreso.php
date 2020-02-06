<?php
include ('functions.php');

function acceder_usuario($usuario,$password)
{
    $cond=0;
    $file=fopen('../statics/archives/registro.txt','r');
    while (!feof($file) && $cond==0) {
        $arr=fgets($file);
        $arr=explode('*',$arr);
        if ($arr[1]==$usuario)
        {
            if ($arr[2]!=$password)
            {
                echo 'Usuario encontrado, pero contraseña icorrecta: <br>';
                echo $arr[0].'........'.$arr[1];
                $cond=1;
            }
            else
            {
                echo 'Acceso concedido';
                if (isset($_COOKIE['usuario']))
                    setcookie('usuario',' ',time()-1);
                setcookie('usuario',$arr[1]);
                if (isset($_COOKIE['nivel']))
                    setcookie('nivel',' ',time()-1);
                setcookie('nivel',str_alpha($arr[3]));
                $cond=2;
            }
        }
    }
    fclose($file);
    if ($cond==0)
        echo "El usuario no existe";
}

acceder_usuario($_POST['nick'],$_POST['pws']);
?>