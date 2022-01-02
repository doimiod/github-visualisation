function getUserInfo(){

 	var userName = document.getElementById("user-input").value;
     alert(userName)

       fetch("https://api.github.com/users/"+userName)
       .then(Response => Response.json())
       .then(data => {
        console.log(data)
        var imgUrl= data.avatar_url.toString();

        getBasicInfo(data, imgUrl, userName)
         // document.getElementById("user-basic-information").lineHeight = 1.5;
         //  = `<img src= "${data.avator_url}"/>`

       })

}


function getBasicInfo(data, imgUrl, userName){

    document.getElementById("userImg").innerHTML = `<a href="https://www.github.com/${userName}"> <img src= ${imgUrl}/ width="300" height="300"></a>`
    document.getElementById("name").innerHTML = `<b>Name: </b>${data.name}`;
    document.getElementById("user-name").innerHTML = `<b>User name: </b>${data.login}`;
    document.getElementById("followings").innerHTML = `<b>Following: </b>${data.following}`;
    document.getElementById("followers").innerHTML = `<b>Folowers: </b>${data.followers}`;
    document.getElementById("work-place").innerHTML = `<b>Study or work place: </b>${data.company}`;
    document.getElementById("location").innerHTML = `<b>Location: </b>${data.location}`;
    document.getElementById("date-joined").innerHTML = `<b>Joined: </b>${data.created_at}`;
    document.getElementById("last-activity").innerHTML = `<b>Last activity: </b>${data.updated_at}`;
    document.getElementById("the-num-of-repos").innerHTML = `<b>Repositories: </b>${data.public_repos}`;
    document.getElementById("bio").innerHTML = `<b>Bio: </b>${data.bio}`;

}



//  `


// var userClicked = document.getElementById("btn")

//  userClicked.addEventListener('UsernameEntered',function(e){
//      e.preventDefault()

    //  var userName = document.getElementById("user-input").value
    
//     var ttt = "kkk";
// document.getElementById("str").innerHTML = ttt;
//  alert(userName)
//  })
// var userName = document.getElementById("user-input").value
//  var ttt = "kkk";
//  document.getElementById("str").innerHTML = ttt;
// alert(ttt)