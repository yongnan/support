# Deployment

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly

  ```sh
  fly auth signup
  fly auth login
  ```

  fly apps create remix-blog-ync

```
fly apps create remix-blog-ync
fly volumes create app_data1 --size 1 --app remix-blog-ync

fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app remix-blog-ync  
fly secrets set DATABASE_URL="file:./data.db?connection_limit=1" --app remix-blog-ync
fly secrets set ADMIN_EMAIL="rachel@remix.run" --app remix-blog-ync 

fly launch 
```

Monitor log:

https://fly.io/apps/remix-blog-ync/monitoring

Finally:

https://remix-blog-ync.fly.dev/

Destroy:

```
fly apps destroy remix-blog-ync
```

# Continus deployment

ps.

## Speed-run Your Way to Continuous Deployment

1. Fork [go-example](https://github.com/fly-apps/go-example) to your own GitHub repository.

2. Get a Fly API token with `flyctl auth token`.

3. Go to your newly created repository on GitHub and select Settings.

4. Go to Secrets and create a secret called `FLY_API_TOKEN` with the value of the token from step 2

5. Clone the repository to your local machine to edit it

6. Edit .gitignore and remove fly.toml - fly.toml will need to be pushed into the repository to allow deployment to happen.

7. Run `flyctl apps create` to create a fly.toml file.

8. Create `.github/workflows/fly.yml` with these contents

   ```
   name: Fly Deploy
   on:
     push:
       branches:
         - master
   env:
     FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
   jobs:
     deploy:
         name: Deploy app
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v3
           - uses: superfly/flyctl-actions/setup-flyctl@master
           - run: flyctl deploy --remote-only
   ```

9. Commit your changes and push them up to GitHub.

10. This is where the magic happens - The push will have triggered a deploy and from now on whenever you push a change, the app will automatically be redeployed.

If you want to watch the process take place, head to the Repository and select the **Actions** tab where you can view live logs of the commands running.

##



