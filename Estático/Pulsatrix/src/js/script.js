window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("id-navbar").style.backgroundColor = "rgba(27,27,27)";
    } else {
        document.getElementById("id-navbar").style.backgroundColor = "#0003";
    }
}

function calculate() {
    var name = in_name.value;
    var employ = Number(in_employ.value);
    var payment = Number(in_payment.value);
    var meters = Number(in_meters.value);
    var pack = Number(se_pack.value);
    var absenteeism = Number(in_absenteeism.value);
    var absenteeism_percent = (absenteeism / 100) / ((employ * 175) / 100) * 100;
    var pack_percent = pack / 100;
    var eco = (employ * payment) * (pack_percent / absenteeism_percent);
    var price_meters = (meters * 400) * (pack_percent / absenteeism_percent);


    if (name.length < 1) {
        div_javascript.style.display = 'none';
        result_alert.style.display = 'block'
        alert_box.innerHTML = `o nome da sua Empresa`

    }
    else if (in_employ.value.length < 1) {
        div_javascript.style.display = 'none';
        result_alert.style.display = 'block'
        alert_box.innerHTML = `a quantidade de funcionarios na sua Empresa`
    }
    else if (in_absenteeism.value.length < 1) {
        div_javascript.style.display = 'none';
        result_alert.style.display = 'block'
        alert_box.innerHTML = `a quantidade de absenteísmo da sua Empresa`

    }
    else if (in_payment.value.length < 1) {
        div_javascript.style.display = 'none';
        result_alert.style.display = 'block'
        alert_box.innerHTML = `o salário dos funcionarios da sua Empresa`
    }
    else if (in_meters.value.length < 1) {
        div_javascript.style.display = 'none';
        result_alert.style.display = 'block'
        alert_box.innerHTML = `a quantidade de metros da sua Empresa`

    }

    else if (se_pack.value.length < 1) {
        div_javascript.style.display = 'none';
        result_alert.style.display = 'block'
        alert_box.innerHTML = `qual o pack desejado `
    }
    else {
        div_javascript.style.display = 'block';
        result_alert.style.display = 'none'
        result_name.innerHTML = `${name}`;
        result_eco.innerHTML = `${eco.toFixed(2)}`;
        result_price.innerHTML = `${price_meters.toFixed(2)}`;
        result_porcent.innerHTML = `${pack}`;
        result_absent.innerHTML = `${absenteeism_percent.toFixed(1)}`;
    }
}