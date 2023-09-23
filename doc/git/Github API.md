# Github API

```
export GH_USERNAME=yongnan
export GH_TOKEN=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
```

API doc: https://docs.github.com/en/rest?apiVersion=2022-11-28

## Github cli

https://cli.github.com/

## Codespace

https://docs.github.com/en/codespaces/managing-your-codespaces/managing-secrets-for-your-codespaces

## API Documentation

### [Making a request](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28#making-a-request)

```
curl https://api.github.com/users/$GH_USERNAME
```

### [Authenticating](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28#authenticating)

```
curl -X GET \
--url "https://api.github.com/octocat" \
--header "Authorization: Bearer YOUR-TOKEN"
```

### [Using headers](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28#using-headers)

```
curl -X GET \
--url "https://api.github.com/octocat" \
--header "Accept: application/vnd.github+json" \
--header "Authorization: Bearer YOUR-TOKEN" \
--header "X-GitHub-Api-Version: 2022-11-28"
```

### [Using path parameters](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28#using-path-parameters)

/repos/{owner}/{repo}/issues

```
curl --request GET \
--url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
--header "Accept: application/vnd.github+json" \
--header "Authorization: Bearer YOUR-TOKEN"
```

### [Using query parameters](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28#using-query-parameters)

```
curl --request GET \
--url "https://api.github.com/repos/octocat/Spoon-Knife/issues?per_page=2&sort=updated&direction=asc" \
--header "Accept: application/vnd.github+json" \
--header "Authorization: Bearer YOUR-TOKEN"
```

### [Using body parameters](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28#using-body-parameters)

```
curl --request POST \
--url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
--header "Accept: application/vnd.github+json" \
--header "Authorization: Bearer YOUR-TOKEN" \
--data '{
  "title": "Created with the REST API",
  "body": "This is a test issue created by the REST API"
}'
```



```
?per-page=10&page=2
```

* per_page=<number>
* page=<number>

```
link: <https://api.github.com/repositories/1300192/issues?page=2>; rel="prev", <https://api.github.com/repositories/1300192/issues?page=4>; rel="next", <https://api.github.com/repositories/1300192/issues?page=515>; rel="last", <https://api.github.com/repositories/1300192/issues?page=1>; rel="first"
```



- The URL for the previous page is followed by `rel="prev"`.
- The URL for the next page is followed by `rel="next"`.
- The URL for the last page is followed by `rel="last"`.
- The URL for the first page is followed by `rel="first"`.

## Example1

https://stateful.com/blog/github-api-list-repositories

###  List All Public Repositories Belonging to a User

let's retrieve a single user hitting the appropriately named user's endpoint:

```sh
curl https://api.github.com/users/yongnan
```

```
https://api.github.com/users/<USER-NAME>/repos
```

### List All Public Repositories Belonging to an Organization

to list all public repos from a user, send a GET request to `https://api.github.com/users/<USER-NAME>/repos`, replacing `<USER-NAME>` with the actual user from whom you want to retrieve the repositories.

```
https://api.github.com/orgs/<ORGANIZATION-NAME/repos
```

### List Repositories for the Authenticated User

```
culr -u username:token https://api.github.com/user/repos
culr -u username:token https://api.github.com/user/repos?visibility=...&affiliation=...
```

	* visibility=**private**, **public** and **all**
	* affiliation= **owner, collaborator,** and **organization_member**

### List Repositories Using GitHub's Search API

```
curl https://api.github.com/search/repositories?q=octokit+language:csharp
```

## Example2

`GitReposList.sh`

```bash
#!/bin/bash
# Author: Sarav AK
# Email: hello@gritfy.com
# Created Date: 19 Aug 2021
# 

USERNAME=yongnan
TOKEN=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

# No of reposoitories per page - Maximum Limit is 100
PERPAGE=100

# Change the BASEURL to  your Org or User based
# Org base URL
BASEURL="https://api.github.com/orgs/ync-js-ts-tool/repos"

# User base URL
# BASEURL="https://api.github.com/user/<your_github_username>/repos"

# Calculating the Total Pages after enabling Pagination
TOTALPAGES=`curl -I -i -u $USERNAME:$TOKEN -H "Accept: application/vnd.github.v3+json" -s ${BASEURL}\?per_page\=${PERPAGE} | grep -i link: 2>/dev/null|sed 's/link: //g'|awk -F',' -v  ORS='\n' '{ for (i = 1; i <= NF; i++) print $i }'|grep -i last|awk '{print $1}' | tr -d '\<\>' | tr '\?\&' ' '|awk '{print $3}'| tr -d '=;page'`

i=1

until [ $i -gt $TOTALPAGES ]
do
  result=`curl -s -u $USERNAME:$TOKEN -H 'Accept: application/vnd.github.v3+json' ${BASEURL}?per_page=${PERPAGE}\&page=${i} 2>&1`
  echo $result > tempfile
  echo "Repo Name, SSH URL, Clone URL"
  cat tempfile|jq '.[]| [.name, .ssh_url, .clone_url]| @csv'|tr -d '\\"'
  ((i=$i+1))
done
```

```
./GitRepoList.sh > data.csv
```

