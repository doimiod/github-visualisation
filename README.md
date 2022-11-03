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

You can see the screen as below and type your github user name and token(if you have).

![Screenshot 2022-11-03 at 06 05 17](https://user-images.githubusercontent.com/91431813/199656815-a60513eb-5d7f-4a54-a534-ca6a547d7c57.png)

Then, you can see the output as below.

![Screenshot 2022-11-03 at 06 09 36](https://user-images.githubusercontent.com/91431813/199657375-c1f541c3-3f36-4740-a994-80a565e1a7ab.png)

![Screenshot 2022-11-03 at 06 10 24](https://user-images.githubusercontent.com/91431813/199657380-fced221a-97df-4fad-8961-f09854a6c228.png)
