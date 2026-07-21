# Deployment Guide

This repo is set up so the `client/` folder is deployed as a static frontend.

## Folder mapping

- `main` branch -> `VoyagerServices/prod`
- `qa` branch -> `VoyagerServices/qa`
- `dev` branch -> `VoyagerServices/dev`

If your FTP account root already opens inside `voyagersupplychain.com`, leave `FTP_REMOTE_BASE_DIR` blank and the workflow will deploy directly to `prod/`, `qa/`, or `dev/`.

If your FTP account root is one level higher and you need the extra folder, set `FTP_REMOTE_BASE_DIR` to:

- `voyagersupplychain.com`

## What to configure in GitHub

Add these repository secrets:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

Add these repository variables:

- `FTP_REMOTE_BASE_DIR` - optional. Leave blank if the FTP login already lands in the domain folder.
- `FTP_PORT` - optional, default is `21`
- `FTP_PROTOCOL` - optional, default is `ftps`

## What to configure on the host

- Point the production domain document root at `/home/voyahsek/voyagersupplychain.com/prod`
- Point `qa.mydomain.com` at `/home/voyahsek/voyagersupplychain.com/qa`
- Point `dev.mydomain.com` at `/home/voyahsek/voyagersupplychain.com/dev`

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
