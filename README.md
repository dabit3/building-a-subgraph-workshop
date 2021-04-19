## The Graph - Subgraph Workshop

![](header.png)

In this workshop, you'll learn how to build and deploy a subgraph using the [Zora NFT](https://zora.co/) smart contract.

### Prerequisites

To be successful in this workshop, you should have [Node.js](https://github.com/nvm-sh/nvm#node-version-manager---) installed on your machine.

## Getting started

### Creating the Graph project in the Graph console

To get started, open the [Graph Console](https://thegraph.com/explorer/dashboard) and either sign in or create a new account.

Next, go to [the dashboard](https://thegraph.com/explorer/dashboard) and click on __Add Subgraph__ to create a new subgraph.

Here, set your graph up with the following properties:

- Subgraph Name - __Zoranftgraph__
- Subtitle - __A subgraph for querying NFTs__
- Optional - Fill the description and GITHUB URL properties

Once the subgraph is created, we will initialize the subgraph locally.

### Initializing a new Subgraph using the Graph CLI

Next, install the Graph CLI:

```sh
$ npm install -g @graphprotocol/graph-cli

# or

$ yarn global add @graphprotocol/graph-cli
```

Once the Graph CLI has been installed you can initialize a new Subgraph with the Graph CLI `init` command.

There are two ways to initialize a new Subgraph:

1. From an example subgraph

```sh
$ graph init --from-example <GITHUB_USERNAME>/<SUBGRAPH_NAME> [<DIRECTORY>]
```

2. From an existing smart contract

If you already have a smart contract deployed to Ethereum mainnet or one of the testnets, initializing a new subgraph from this contract is an easy way to get up and running.

```sh
$ graph init --from-contract <CONTRACT_ADDRESS> \
  [--network <ETHEREUM_NETWORK>] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]
```

In our case we'll be using the [Zora Token Contract](https://etherscan.io/address/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7#code) so we can initilize from that contract address:

```sh
$ graph init --from-contract 0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7 --network mainnet --contract-name Token --index-events

? Subgraph name › your-username/Zoranftgraph
? Directory to create the subgraph in › Zoranftgraph
? Ethereum network › Mainnet
? Contract address › 0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7
? Contract Name · Token
```

