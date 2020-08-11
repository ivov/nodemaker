# Nodemaker General Reference

## Setup for official repos

> This section explains how to set up the two official repos [n8n](https://github.com/n8n-io/n8n) and [n8n-docs](https://github.com/n8n-io/n8n-docs). To install **Nodemaker**, refer back to the [README](../README.md).

Nodemaker is a companion project to the official repos [n8n](https://github.com/n8n-io/n8n) and [n8n-docs](https://github.com/n8n-io/n8n-docs). Nodemaker's output files are meant to be placed in your local copies of these official repos, through the Nodemaker's automated placement service.

To set up both official repos, clone them:

```sh
git clone https://github.com/n8n-io/n8n.git
git clone https://github.com/n8n-io/n8n-docs.git
```

And locate them alongside the `nodemaker` repo:

```sh
.
├── n8n
├── n8n-docs
└── nodemaker
```

### Note on screenshot generation

To run the Nodemaker's screenshot generation service `shotgen`, you will need to also **build** the `n8n` repo.

```sh
# get build tools on Windows
npm install -g windows-build-tools

# get build tools on Linux
apt-get install -y build-essential python

# install lerna
npm i lerna -g

# run the build process
cd n8n
lerna bootstrap --hoist
npm run build
```

This builds your copy of the `n8n` repo, so that Nodemaker can run it locally for screenshot generation.
