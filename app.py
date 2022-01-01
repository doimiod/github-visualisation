import requests
from pprint import pprint
import base64
from github import Github
from pprint import pprint

token = input("Enter your OAuth Token:")

# pygithub object
g = Github(token)

# user = g.get_user(username)

def print_repo(repo):
    print("Full name:", repo.full_name)
    print("Date created:", repo.created_at)
    print("")
    print("Language:", repo.language)
    print("Number of stars:", repo.stargazers_count)
   
def getRepoCommits(repo):
    try:
        if repo.get_commits() is not None:
            commits = repo.get_commits().totalCount
            print(f"Number of commits: {commits}")
    except:
        print("Number of commits: 0")
    
def printRepo(user):
    count = 0
    print("---------------------------------------------")
    for repo in user.get_repos():
        count =  count + 1
        if repo is not None:
            print(f"{count}: ")
            print_repo(repo)
            getRepoCommits(repo)
            print("--------------------------------------------")

while True:
    username = input("Enter username or exit: ")
    if username == "exit": 
        break
    else:
        user = g.get_user(username)
        printRepo(user)