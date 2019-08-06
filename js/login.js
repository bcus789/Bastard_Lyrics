var pwd;
var uname;



function signUp(event) {

    event.preventDefault()
    pwd = ""
    uname = ""


    pwd = $("#pwd1").val().trim()
    uname = $("#uname1").val().trim()
    console.log(pwd);
    console.log(uname);
    localStorage.pw = pwd
    localStorage.uname = uname
};

function signIn(event) {

    event.preventDefault()
    pwd = ""
    uname = ""
    $('#errorMsg').hide();
    

    

    pwd = $("#pwd2").val().trim()
    uname = $("#uname2").val().trim()
    console.log(pwd);
    console.log(uname);
    if (localStorage.uname == uname && localStorage.pw == pwd ){
        console.log("yay")
        $('#signIn').hide();
        $('#signUp').hide();
        $("#signup").append(uname);
        $('.modal').modal().hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#searchForm').show();
        $('#plsSignIn').hide();
        

    }else{
        console.log("nope")
        $('#errorMsg').show();

    }

};


$("#btnSignUp").on("click", signUp)
$("#btnSignIn").on("click", signIn)