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
docker run -d --name github_visualise -p 55:00 github-visualise
```

You can see my project at localhost:5500
