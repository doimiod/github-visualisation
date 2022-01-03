function getUserInfo(){

 	var userName = document.getElementById("user-input").value;
       fetch("https://api.github.com/users/"+userName)
       .then(Response => Response.json())
       .then(data => {
        console.log(data)
        var imgUrl= data.avatar_url.toString();;
        getBasicInfo(data, imgUrl, userName)

       })
       
       
       fetch("https://api.github.com/users/"+userName+"/repos")
       .then(Response => Response.json())
       .then(repoData => {
        languagesInfo(userName, repoData)
        commitInWeekGraphInfo(userName, repoData)
        Top3CommitedReposInfo(userName, repoData)
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

function languagesInfo(userName, repoData){

    let languageLabel = [];
    let langageUsage = [];
    let colours = [];
    let sumOfLanguageUsage = 0;
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
                        langageUsage[m] = langageUsage[m] + data[language];
                        add = false;
                        break;
                    }
               }
               
               if(add==true)
               {
                   languageLabel[l]=language
                   langageUsage[l]=data[language]
                   colours[l]= 　"rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")" 
                   l++;
               }
               
               console.log(data[language])
               console.log(language)
               console.log(languageLabel)
               console.log(langageUsage)
               console.log(colours)
               
               //sumOfLanguageUsage = sumOfLanguageUsage + data[language]

            }

        })
    }

    languagesPieChart(languageLabel, langageUsage, colours)

}


function languagesPieChart(languageLabel, langageUsage, colours){
    
    let chartStatus = Chart.getChart("languagePiechart");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }   

   let ctx = document.getElementById("languagePiechart").getContext('2d');
   let myChart = new Chart(ctx, {

       type: 'pie',
       data: { 
           datasets: [{
               data: langageUsage,
               backgroundColor: colours,
               label: 'Languages used',
           }],
           labels: languageLabel,
       },
       
       options: {
         responsive: true,

       },

    } )

}


function commitInWeekGraphInfo(userName, repoData) {
    
    let dayLabel = [];
    let commitData = [];
    let colour = [];
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let l=0;
    let add = true;

    for (i in repoData) {
        fetch("https://api.github.com/repos/"+userName+"/"+repoData[i].name+"/commits?per_page=100")
        .then(Response => Response.json())
           .then(data => {
               console.log(data)

        for (j in data) {
            let commit = data[j].commit//.author.date;
            //console.log(commit);
            let aut = commit.author;
            //console.log(aut);
            let date = aut.date;
            //console.log(date);
            let d = new Date(date);
            let day = days[d.getDay()];
            add = true;
            for(let m=0; m<l ; m++){
                if(dayLabel[m] == day)
                {
                    commitData[m] = commitData[m] + 1;
                    add = false;
                    break;
                }

            }

            if(add==true)
            {
                dayLabel[l] = day;
                commitData[l] = 1;
                colour[l]="rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
                l++;
            }
         }

    })
    }

    commitInWeekGraph(dayLabel, commitData, colour);
}

function commitInWeekGraph(dayLabel, commitData, colour){


    let chartStatus = Chart.getChart("commits-in-a-week");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }   

    let ctx = document.getElementById("commits-in-a-week").getContext('2d');

   let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: "number of commits",
                data: commitData,
                backgroundColor: colour,
            }],
            labels: dayLabel,
        },
        options: {
            responsive: true,
            title: {
                display: true,
                fontSize: 20,
            }
        }
    });


}

function Top3CommitedReposInfo(userName, repoData) {


    let repoName = [];
    let numOfComArray = [];
    let comRepoColour = [];
    let numOfComData = [];
    let repoLabel = [];
    let numOfCom=0;

    for(let i=0 ; repoData[i]!= null; i++){
        fetch("https://api.github.com/repos/"+userName+"/"+repoData[i].name+"/commits?per_page=100")
        .then(Response => Response.json())
           .then(data => {
           console.log(data)
           for(numOfCom=0;numOfCom<data.length;numOfCom++){}
            repoName[i]=repoData[i].name;
            numOfComArray[i]=numOfCom;
            
            for ( let j = 1; j<numOfComArray.length; j++)
            {
                let k = j - 1;
                while(k>=0 && numOfComArray[k]<numOfComArray[k+1])
                {
                    let temp = numOfComArray[k];
                    let repoTemp = repoName[k];
                    numOfComArray[k] = numOfComArray[k+1];
                    repoName[k]=repoName[k+1];
                    numOfComArray[k+1] = temp;
                    repoName[k+1] = repoTemp;
                    k--;
                }
            }

            for ( let l = 0; l<3; l++){
                numOfComData[l] = numOfComArray[l];
                repoLabel[l]=repoName[l];
                comRepoColour[l]="rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
                }


        })
        
    }

    // console.log(repoName)
    // console.log(numOfComArray)
    // console.log(numOfComData)
    // console.log(repoLabel)
    
    Top3CommitedReposGraph(numOfComData, repoLabel, comRepoColour )
}


function Top3CommitedReposGraph(numOfComData, repoLabel, comRepoColour ){

    let chartStatus = Chart.getChart("top3-repo");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }   

    let ctx = document.getElementById("top3-repo").getContext('2d');

   let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: "Top 3 Most Commmitted Repositories",
                data: numOfComData,
                backgroundColor: comRepoColour,
            }],
            labels: repoLabel,
        },
        options: {
            responsive: true,
            title: {
                display: true,
                fontSize: 20,
            }
        }
    });



}


       // maintainAspectRatio: false,
         //position: 'fixed',
        //  title: {
        //        display: true,
        //        text: 'Languages used',
        //        fontSize: 50,
        //    },
// let ctx = document.getElementById("languagePiechart").getContext("2d");
//     //let myChart = document.getElementById(ctx).getContext('2d');

//     chart1 = new Chart(ctx, {
//         type: 'pie',
//         data: {
//             labels: languageLabel,
//             datasets: [{
//                 label: 'languages',
//                 data: langageUsage,
//                 backgroundColor: colours,
//                 borderWidth: 1,
//                 borderColor: '#444',
//                 hoverBorderWidth: 2,
//                 hoverBorderColor: '#000'
//             }],

//         },
//         options: {
//             title: {
//                 display: true,
//                 text: "Languages",
//                 fontSize: 20
//             },
//             legend: {
//                 display: true,
//                 position: 'bottom',
//                 labels: {
//                     fontColor: '#000'
//                 }
//             },
//             layout: {
//                 padding: {
//                     left: 50,
//                     right: 0,
//                     bottom: 0,
//                     top: 0
//                 }
//             },
//             tooltips: {
//                 enabled: true
//             }
//         }
//     });


//     // languageLabel = [];
//     // langageUsage = [];
//     // colours = [];



    // console.log(languageLabel)
    //            console.log(langageUsage)


//             let ctx = document.getElementById("languagePiechart").getContext("2d");
            

// chart1 = new Chart(ctx, {
//     type: 'pie',
//     data: {
//         labels: languageLabel,
//         datasets: [{
//             label: 'languages',
//             data: langageUsage,
//             backgroundColor: colours,
//             borderWidth: 1,
//             borderColor: '#444',
//             hoverBorderWidth: 2,
//             hoverBorderColor: '#000'
//         }],

//     },
//     options: {
//         title: {
//             display: true,
//             text: "Languages used",
//             fontSize: 20
//         },
//         legend: {
//             display: true,
//             position: 'bottom',
//             labels: {
//                 fontColor: '#000'
//             }
//         },
//         layout: {
//             padding: {
//                 left: 50,
//                 right: 0,
//                 bottom: 0,
//                 top: 0
//             }
//         },
//         tooltips: {
//             enabled: true
//         }
//     }
// });




        //    var myChart = null;
// let ctx = document.getElementById("languagePiechart").getContext("2d");
// //context.clearRect(0, 0, canvas.width, canvas.height);
// myChart = new Chart(ctx, {

//     type: "pie",
//     data: { 
//         datasets: [{
//             data: langageUsage,
//             backgroundColor: colours,
//             label: 'Languages used',
//         }],
//         labels: languageLabel,
//     },
    
//     options: {
//         // responsive: false,
//         legend: { display: false },
//         // 自動サイズ変更をしない
//         // タイトル
//         title: {
//             display: true,
//             fontSize: 16,
//             text: 'Languages used',
// },
//     },

//  } )


// }

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




   // let temp = 0;
    // 	for (let i = 1; i < numOfComArray.length; i++)
    // 	{
    // 		for(let j = i ; j > 0 ; j--)
    // 		{
    // 			if(numOfComArray[j] < numOfComArray[j-1])
    // 			{
    // 				temp = numOfComArray[j];
    // 				numOfComArray[j] = numOfComArray[j-1];
    // 				numOfComArray[j-1] = temp;
    // 			}
    // 		}
    // 	}