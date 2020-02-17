<?php

    if (isset($_COOKIE['nick']))
        setcookie('nick',' ',time()-1, "/");
    header('Location: ../templates/index.php');

?>
