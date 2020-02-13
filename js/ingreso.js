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
    if ($(".user").val() !== "" && $(".user").val().length >= 5) {
        if ($(".psw").val().length < 5) {
            statusInfo[1] = "La longitud de la contraseña debe se ser de al menos cinco caracteres";
        } else {
            statusInfo = [true, ""];
        }
    }

    return statusInfo;
}

function sendInformation() {
    let status = validateData();
    if (status[0]) {
        let data = {
            nick: $("ul.form li input.user").val(),
            psw: $("ul.form li input.psw").val()
        };

        $.ajax({
            data,
            url: "../php/ingreso.php",
            type: "post",
            dataType: "json",
            success: response => {
                changeStatus(response);
                if (response[0]) {
                    setTimeout(() => {
                        window.location = "index.html"
                    }, 1500);
                }
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
