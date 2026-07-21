# Deployment Guide

This repo is set up so the `client/` folder is deployed as a static frontend.

## Folder mapping

- `main` branch -> `VoyagerServices/prod`
- `qa` branch -> `VoyagerServices/qa`
- `dev` branch -> `VoyagerServices/dev`

If your hosting account uses a different absolute path, set `FTP_REMOTE_BASE_DIR` to that base folder. The workflow will append `prod`, `qa`, or `dev` automatically.

For your current hosting account, that base folder should be:

- `/home/voyahsek/voyagersupplychain.com/voyserv`

## What to configure in GitHub

Add these repository secrets:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

Add these repository variables:

- `FTP_REMOTE_BASE_DIR` - example: `/home/voyahsek/voyagersupplychain.com/voyserv`
- `FTP_PORT` - optional, default is `21`
- `FTP_PROTOCOL` - optional, default is `ftps`

## What to configure on the host

- Point the production domain document root at `/home/voyahsek/voyagersupplychain.com/voyserv/prod`
- Point `qa.mydomain.com` at `/home/voyahsek/voyagersupplychain.com/voyserv/qa`
- Point `dev.mydomain.com` at `/home/voyahsek/voyagersupplychain.com/voyserv/dev`

If you are using a cPanel-style host, those usually become addon domains or subdomains with their own document roots.

## How deployment works

The workflow:

1. Checks out the repo
2. Installs `client/` dependencies
3. Runs the Vite build
4. Copies the Apache rewrite file into the build output
5. Uploads `client/dist/` to the target folder over FTP/FTPS

## Important note

This deploys the frontend only. The contact form still calls `/api/contact`, so it will need a backend later unless you replace that flow.
