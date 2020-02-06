<?php

include ('functions.php');

$cond=0;
    $arr=array(substr($_POST['name'],0,strlen($_POST['name'])),$_POST['nick'],$_POST['pws']);
    if (strcmp($_POST['pws'],$_POST['cpws'])==0)
        if (file_exists('../statics/archives/registro.txt'))
        {
            $file=fopen('../statics/archives/registro.txt','r');
            while(!feof($file) && $cond==0)
            {
                $aux=str_alpha(fgets($file));
                $aux=explode('*',$aux);
                if (isset($aux[1]))
                    for ($i=0; $i < 2; $i++)
                        if (strcmp ($arr[$i],$aux[$i])==0 && $cond==0)
                            $cond=$i+1;
            }
            fclose($file);
            if ($cond!=0)
            {
                if ($cond==1)
                    echo 'Ya te has registrado antes: ';
                else
                    echo 'El nombre de usuario ya existe: ';
                echo '<br>'.$aux[0].' ............. '.$aux[1];
            }
            else
            {
                if (isset($_COOKIE['usuario']))
                    setcookie('usuario',' ',time()-1);
                setcookie('usuario',$_POST['nick']);
                $arr=PHP_EOL.implode('*',$arr).'*1';
                $file=fopen("../statics/archives/registro.txt","a");
                fputs($file,$arr);
                fclose($file);
                echo "El usuario se ha creado exitosamente, ahora puedes jugar";
            }
        }
        else
        {
            if (isset($_COOKIE['usuario']))
                setcookie('usuario',' ',time()-1);
            setcookie('usuario',$_POST['nick']);
            $arr=implode('*',$arr).'*1';
            $file=fopen("../statics/archives/registro.txt","w");
            fputs($file,$arr);
            fclose($file);
            echo "El usuario se ha creado exitosamente, ahora puedes jugar...";
            sleep(5);
            echo '<a href="../templates/game.html">Jugar</a>';
            echo '<a href="../templates/index.html">Menú Principal</a>';
        }
    else
      echo 'Tu contraseña no coincide';