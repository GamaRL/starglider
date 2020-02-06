<?php
function buscar_nivel($nivel)
{ //Nos devuelve toda la información del nivel en que estemos
    $cond=0;
    $file=fopen('../../statics/media/partidas.txt','r');
    while ($cond==0)
    {
        $cad=explode('*',str_alpha(fgets($file)));
        if ($cad[0]==$nivel)
            $cond=1;
    }
    fclose($file);
    str_alpha($cad);
    return $cad;
}

function cambiar_nivel($usuario,$level)
{ //Modifica el registro para guardar el nuevo nivel en el que nos encontrenos
    $cond=0;
    $file=fopen('../archivos_usuarios/registro.txt','r+');
    while (!feof($file) && $cond==0)
    {
        $pos=ftell($file);
        $arr=fgets($file);
        $arr=explode('*',$arr);
        if ($arr[1]==$usuario)
            $cond=1;
    }
    $arr[3]=$level;
    fseek($file,$pos,SEEK_SET);
    fputs($file,implode('*',$arr));
    fclose($file);
}

function eliminar_letra($cad,$let)
{ //Nos ayuda a eliminar una letra de una cadena que indiquemos
    $ncad="";
    for ($i=0; $i < strlen($cad); $i++)
        if ($cad[$i]!=$let)
            $ncad.=$cad[$i];
    return $ncad;
}

function str_alpha($str) //Nos ayuda a eliminar carácteres de control de una cadena
{
    $nstr=""; //Se inicializa la nueva cadena (new string)
    for ($i=0; $i < strlen($str); $i++)
        if (!ctype_cntrl($str[$i]))
            $nstr.=$str[$i];
    return $nstr;
}

function winner($palabra,$disp)
{ //Nos indica si ya se ha ganado o no
    $cond=true;
    for ($i=0; $i < strlen($palabra); $i++)
        if (substr_count($disp,$palabra[$i])!=0)
            $cond=false;
    return $cond;
}

function buscar_media($ruta) //Nos devuelve una etiqueta "video" "img" o "audio" dependiendo del nombre del archivo ($ruta) que recibe y anaiza que tipo de archivo es.
{
    if (file_exists('../../statics/media/videos/'.$ruta))
        $etiqueta='<video src="../../statics/media/videos/'.$ruta.'" controls preload class="element"></video>';
    if (file_exists('../../statics/media/images/'.$ruta))
        $etiqueta='<img src="../../statics/media/images/'.$ruta.'" class="element">';
    if (file_exists('../../statics/media/audios/'.$ruta))
        $etiqueta='<audio src="../../statics/media/audios/'.$ruta.'" controls preload class="element">Hola Gamaliel</audio>';
    return $etiqueta;
}

function has_ganado()
{ //Genera una tabla para continuar en el juego o para regresar al menú principal
    echo '<table id="ganar">';
    echo '<tr>';
    echo '<td><h1>Has Ganado</h1></td>';
    echo '</tr>';
    echo '<tr>';
    echo '<td><a href="empezar_juego.php">Siguiente</a></td>';
    echo '</tr>';
    echo '<tr>';
    echo '<td><a href="../../templates/html/menu_principal.html">Menú Principal</a></td>';
    echo '</tr>';
    echo "</table>";
    $niv=$_COOKIE['nivel'];
    setcookie('nivel',' ',time()-1);
    setcookie('nivel',++$niv);
    cambiar_nivel($_COOKIE['usuario'],$niv);
    unlink('../archivos_usuarios/'.$_COOKIE['usuario'].'.txt');
}

function has_perdido()
{ //Genera una tabla para intentar nuevamente en el juego o para regresar al menú principal
    echo '<table id="perder">';
    echo '<tr>';
    echo '<td><h1>Has perdido</h1></td>';
    echo '</tr>';
    echo '<tr>';
    echo '<td><a href="empezar_juego.php">Volver a jugar</a></td>';
    echo '</tr>';
    echo '<tr>';
    echo '<td><a href="../../templates/html/menu_principal.html">Menú Principal</a></td>';
    echo '</tr>';
    echo "</table>";
    unlink('../archivos_usuarios/'.$_COOKIE['usuario'].'.txt');
}

function mostrar_palabra($palabra,$disp)
{ //Muestra lo que llevemos "encontrado" de la palabra
    for ($i=0; $i < strlen($palabra); $i++)
        if (substr_count($disp,$palabra[$i])==0)
            if (!ctype_space($palabra[$i]) && !ctype_punct($palabra[$i]))
                echo "<td class='letra'>".$palabra[$i]."</td>";
            else
                echo "<td class='espacio'>".$palabra[$i]."</td>";
        else
            echo "<td class='letra'></td>";
}

function imprimir_teclado($disp)
{ //Genera las teclas disponibles
    echo '<form method="post" action="juego.php">';
    echo "<table>";
    for ($i=0; $i < strlen($disp); $i++) //Se genera el "teclado" en pantalla con todas las letras disponibles
        if (ctype_alpha($disp[$i]))
        {
            $let=$disp[$i];
            if ($i%4==0)
                echo "<tr>";
            echo "<td>";
            echo "<input id=$let type='radio' name='tec' value=$let required>";
            echo "<label for=$let><h2>$let</h2></label>";
            echo "</td>";
            if ($i%4==3 || (strlen($disp)<4 && $i==strlen($disp)))
                echo "</tr>";
        }
    echo "</table>";
    echo '<input type="submit" value="Verificar" id="boton">'; //Con este boton se envía nuestra elección
    echo '</form>';
}

function buscar_puntaje($puntaje)
{ //Nos ayuda a encontrar un usuario con un puntaje dado en un archivo de texto
    global $file;
    $cond=0;
    while(!feof($file) && $cond==0)
    {
        $aux=str_alpha(fgets($file));
        $aux=explode('*',$aux);
        if ($puntaje==$aux[3])
            $cond=1;
    }
    if ($cond==1)
        return array($aux[0],$aux[1],$aux[3]);
    else
        return NULL;
}

function hacer_tabla()
{ //Genera la tabla de puntajes
    global $file;
    if (file_exists('../archivos_usuarios/registro.txt'))
    {
        $file=fopen('../archivos_usuarios/registro.txt','r');
        for ($i=50; $i > 0; $i--)
        {
            echo "<tr>";
            $comodin=buscar_puntaje($i);
            if ($comodin==NULL)
                fseek($file,0,SEEK_SET);
            else
            {
                echo '<td>'.$comodin[2].'</td>';
                echo '<td>'.$comodin[0].'</td>';
                echo '<td>'.$comodin[1].'</td>';
                $i++;
            }
            echo "</tr>";
        }
        fclose($file);
    }
}
?>