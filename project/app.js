function getUserInfo(){

 	var userName = document.getElementById("user-input").value;
     //alert(userName)

    //    fetch("https://api.github.com/users/"+userName)
    //    .then(Response => Response.json())
    //    .then(data => {
    //     console.log(data)
    //     var imgUrl= data.avatar_url.toString();

    //     // var repoUrl = data.repos_url.toString();
    
    //     getBasicInfo(data, imgUrl, userName)
    //      // document.getElementById("user-basic-information").lineHeight = 1.5;
    //      //  = `<img src= "${data.avator_url}"/>`

    //    })
       
       
       fetch("https://api.github.com/users/"+userName+"/repos")
       .then(Response => Response.json())
       .then(repoData => {
        languagesInfo(userName, repoData)
        //console.log(data)


    //     var langUrl= data.languages_url.toString();
    //     alert(langUrl)

    //     fetch(langUrl)
    //    .then(Response => Response.json())
    //    .then(data => {
    //     console.log(data)


      // })




       })

}


// function getBasicInfo(data, imgUrl, userName){

//     document.getElementById("userImg").innerHTML = `<a href="https://www.github.com/${userName}"> <img src= ${imgUrl}/ width="300" height="300"></a>`
//     document.getElementById("name").innerHTML = `<b>Name: </b>${data.name}`;
//     document.getElementById("user-name").innerHTML = `<b>User name: </b>${data.login}`;
//     document.getElementById("followings").innerHTML = `<b>Following: </b>${data.following}`;
//     document.getElementById("followers").innerHTML = `<b>Folowers: </b>${data.followers}`;
//     document.getElementById("work-place").innerHTML = `<b>Study or work place: </b>${data.company}`;
//     document.getElementById("location").innerHTML = `<b>Location: </b>${data.location}`;
//     document.getElementById("date-joined").innerHTML = `<b>Joined: </b>${data.created_at}`;
//     document.getElementById("last-activity").innerHTML = `<b>Last activity: </b>${data.updated_at}`;
//     document.getElementById("the-num-of-repos").innerHTML = `<b>Repositories: </b>${data.public_repos}`;
//     document.getElementById("bio").innerHTML = `<b>Bio: </b>${data.bio}`;

//  }

function languagesInfo(userName, repoData){

    let languageLabel = [];
    let langageUsage = [];
    let colours = [];

    let l = 0;
    let add = true;

    for(let i=0 ; repoData[i]!= null; i++){
        fetch("https://api.github.com/repos/"+userName+"/"+repoData[i].name+"/languages")
        .then(Response => Response.json())
           .then(data => {
           console.log(data)

            for(language in data){

                add = true;
                for(let m=0; m<l ; m++){

               if(languageLabel[m] == language)
               {
                   langageUsage[m] = langageUsage[m] + data[language]
                   add = false;
                   break;
               }
            }

            if(add==true)
            {
                languageLabel[l]=language
                langageUsage[l]=data[language]
                colours[l]=　"rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")" 
                l++;
            }

                console.log(data[language])
                console.log(language)
                console.log(languageLabel)
                console.log(langageUsage)
                console.log(colours)

            }

        })

    }    

    languagesPieChart(languageLabel, langageUsage, colours)

}



function languagesPieChart(languageLabel, langageUsage, colours){




}




function commitInYearGraph() {




}

function Top3CommitedREposGraph() {




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