var userClicked = document.getElementById("user-form")

userClicked.addEventListener('UsernameEntered',function(e){
    e.preventDefault()

    var userName = document.getElementById("user-input").value
    
    var ttt = "kkk";
document.getElementById("str").innerHTML = ttt;
alert(ttt)
})
// var userName = document.getElementById("user-input").value
//  var ttt = "kkk";
//  document.getElementById("str").innerHTML = ttt;
// alert(ttt)