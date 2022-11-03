# github-visualisation

In order to run my code, you need docker.

Firstly, please clone my repository by the command below
```
git clone https://github.com/doimiod/github-visualisation.git
```

Secondry, please cd to the folder and type this command
```
docker build -t github-visualise .
```
Then, run the code by the following command
```
docker run -d --name github_visualise -p 5500:80 github-visualise
```

You can see my project at `localhost:5500`


![Screenshot 2022-11-03 at 06 05 17](https://user-images.githubusercontent.com/91431813/199656815-a60513eb-5d7f-4a54-a534-ca6a547d7c57.png)
