# github-visualisation

In order to run my code, you need docker.

Firstly, please clone my repository by the command below
```
git clone https://github.com/doimiod/github-visualisation.git
```

Secondly, please go to the folder and type this command
```
docker build -t github-visualise .
```
Then, run the code by the following command
```
docker run -d --name github_visualise -p 5500:80 github-visualise
```

You can see my project at `localhost:5500`

You can see the screen as below and type your github user name and token(if you have).

![Screenshot 2022-11-03 at 06 05 17](https://user-images.githubusercontent.com/91431813/199656815-a60513eb-5d7f-4a54-a534-ca6a547d7c57.png)

Then, you can see the output as below.

![Screenshot 2022-11-03 at 06 12 18](https://user-images.githubusercontent.com/91431813/199657521-e65b2f0b-9c0b-4b03-9b33-26bf5bf726bc.png)
![Screenshot 2022-11-03 at 06 12 40](https://user-images.githubusercontent.com/91431813/199657568-2cd54192-624e-4e22-9b09-5da0a3930cb0.png)
