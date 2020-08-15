<p align="center">
  <img src="images/icons/icons8-repository-80.png" alt="repository" />
</p>

<p align="center">
  <h2 align="center">Setup for official repos</h2>
</p>

<p align="center">
  Set up the official repos for use with Nodemaker
</p>

<br>

Nodemaker is a companion project to the official repos [`n8n`](https://github.com/n8n-io/n8n) and [`n8n-docs`](https://github.com/n8n-io/n8n-docs). This section explains how to set up the two official repos, for use with the `nodemaker` repo.

> This setup is only needed for the Nodemaker's **automated placement** and **screenshot generation** services. If instead you are looking to set up the **Nodemaker** repo, refer back to [the Installation section in the main README](../README.md#installation).

### For automated placement

Nodemaker's output files are meant to be placed in your local copies of the two official repos, through the Nodemaker's **automated placement** service.

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

### For screenshot generation

In addition, to run the Nodemaker's screenshot generation service `shotgen`, the `n8n` repo also needs to be _built_.

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
