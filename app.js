var input = document.getElementById("user-input");
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        getUserInfo()

    }
});

async function getUserInfo(){
    event.preventDefault();

    // clearBox()

    var userName = document.getElementById("user-input").value;
    let token = document.getElementById("token").value;

    console.log(userName)
    console.log(token)

    let basicData = await getBasicInfo(userName, token)
    console.log(basicData)

    let repoData = await getUserRepo(userName, token)
    console.log(repoData)

    displayBasicInfo(basicData, userName)
    languagesInfo(userName, repoData, token)
    commitInWeekInfo(userName, repoData, token)
    Top3CommitedReposInfo(userName, repoData, token)
    

}




async function getBasicInfo(userName, token){
    
    let url = `https://api.github.com/users/${userName}`
    return await getJson(url, token).catch(e => console.error(e))
    
}

async function getUserRepo(userName, token){

    let url = `https://api.github.com/users/${userName}/repos`
    return await getJson(url, token).catch(e => console.error(e))

}


async function getJson(url, token) {

    const headers = {
        'Authorization': `Token ${token}`
    }

    const response = token != '' ? await fetch(url, {
        'method': 'GET',
        'headers': headers
    }) : await fetch(url)

    return await response.json()
}

function displayBasicInfo(data){

    document.getElementById("userImg").innerHTML = `<img id="avatar" src="${data.avatar_url} alt="Avatar" width="300" height="300"/>`
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

async function languagesInfo(userName, repoData, token){

    let languageLabel = [];
    let langageUsage = [];
    let colours = [];
    let l = 0;
    let add = true;

    let chartStatus = Chart.getChart("languagePiechart");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }   
    // let sumOfLanguageUsage = 0;

    for(let i=0 ; repoData[i]!= null; i++){
        // fetch("https://api.github.com/repos/"+userName+"/"+repoData[i].name+"/languages")
        let url = `https://api.github.com/repos/${userName}/${repoData[i].name}/languages`
        let data =  await getJson(url, token).catch(e => console.error(e))
        // console.log(data)

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
                   colours[l]= "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")" 
                   l++;
               }
               
               console.log(data[language])
               console.log(language)
            //    console.log(languageLabel)
            //    console.log(langageUsage)
            //    console.log(colours)
               
               //sumOfLanguageUsage = sumOfLanguageUsage + data[language]

            }

        
    }
    
    document.getElementById("languagePiechart").innerHTML = `<h2>Languages used</h2></div>`;
    let ctx = document.getElementById("languagePiechart").getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: languageLabel,
            datasets: [{
                label: 'Languages used',
                data: langageUsage,
                backgroundColor: colours,
                borderColor: colours,
                borderWidth: 1
            }]
        },
    });

    // console.log(languageLabel)
    // console.log(langageUsage)
    // console.log(colours)
    

}

async function commitInWeekInfo(userName, repoData, token) {
    
    let dayLabel = [];
    let commitData = [];
    let colour = [];
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let l=0;
    let add = true;

    let chartStatus = Chart.getChart("commits-in-a-week");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }   

    for (i in repoData) {

        let url = `https://api.github.com/repos/${userName}/${repoData[i].name}/commits?per_page=100`
        let data =  await getJson(url, token).catch(e => console.error(e))
        
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

    
    }

    let ctx = document.getElementById("commits-in-a-week").getContext('2d');

   let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: "Number of commits in a week",
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



async function Top3CommitedReposInfo(userName, repoData, token) {


    let repoName = [];
    let numOfComArray = [];
    let comRepoColour = [];
    let numOfComData = [];
    let repoLabel = [];
    let numOfCom=0;

    let chartStatus = Chart.getChart("top3-repo");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }   

    for(let i=0 ; repoData[i]!= null; i++){

        let url = `https://api.github.com/repos/${userName}/${repoData[i].name}/commits?per_page=100`
        let data =  await getJson(url, token).catch(e => console.error(e))
        // .then(Response => Response.json())
        //    .then(data => {

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
            title: {
                display: true,
                fontSize: 20,
            }
        }
    });



}
