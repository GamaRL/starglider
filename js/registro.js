/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 */


function changeStatus(info) {
    console.log(info);
    $("div.status").text(info[1]);
    $("div.status").show();
    if (info[0]) {
        $("div.status").css("color", "#37FF1C");
    } else {
        $("div.status").css("color", "#FF1515");
    }
}

function validateData() {
    statusInfo = [false, "Nombre de usuario inválido"];
    if ($(".nombre").val() !== "" && $(".nombre").val().length >= 5) {
        if ($(".nick").val() !== "" && $(".nick").val().length >= 5) {
            if ($(".psw").val().length < 5) {
                statusInfo[1] = "La longitud de la contraseña debe se ser de al menos cinco caracteres";
            } else {
                statusInfo = [true, ""];
            }
        }
    } else {
        statusInfo[1] = "Inserte un nombre válido"
    }

    return statusInfo;
}

function sendInformation() {
    let status = validateData();
    if (status[0]) {
        let data = {
            name: $("ul.form li input.nombre").val(),
            nick: $("ul.form li input.nick").val(),
            psw: $("ul.form li input.psw").val(),
            cpsw: $("ul.form li input.cpsw").val()
        };
        console.log(data);

        $.ajax({
            data,
            url: "../php/registro.php",
            type: "post",
            dataType: "json",
            success: response => {
                changeStatus(response);
                if (response[0]) {
                    setTimeout(() => {
                        window.location = "index.php"
                    }, 1500);
                }
                console.log(response);
            }, error: error => {
                alert("Ha ocurrido un error");
            }
        });
    } else {
        changeStatus(status);
    }
}


window.onload = function () {
    $("#env").click(sendInformation);
};
