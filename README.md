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

This command will generate a basic subgraph based off of the contract address passed in as the argument to `--from-contract`. By using this contract address, the CLI will initialize a few things in your project to get you started (including fetching the `abis` and saving them in the __abis__ directory).

> By passing in `--index-events` the CLI will automatically populate some code for us both in __schema.graphql__ as well as __src/mapping.ts__ based on the events emitted from the contract.

The main configuration and definition for the subgraph lives in the __subgraph.yaml__ file. The subgraph codebase consists of a few files:

- __subgraph.yaml__: a YAML file containing the subgraph manifest
- __schema.graphql__: a GraphQL schema that defines what data is stored for your subgraph, and how to query it via GraphQL
__AssemblyScript Mappings__: AssemblyScript code that translates from the event data in Ethereum to the entities defined in your schema (e.g. mapping.ts in this tutorial)

The main entries in __subgraph.yaml__ are:

- `description`: a human-readable description of what the subgraph is. This description is displayed by the Graph Explorer when the subgraph is deployed to the Hosted Service.
- `repository`: the URL of the repository where the subgraph manifest can be found. This is also displayed by the Graph Explorer.
- `dataSources.source`: the address of the smart contract the subgraph sources, and the abi of the smart contract to use. The address is optional; omitting it allows to index matching events from all contracts.
- `dataSources.source.startBlock`: the optional number of the block that the data source starts indexing from. In most cases we suggest using the block in which the contract was created.
- `dataSources.mapping.entities` : the entities that the data source writes to the store. The schema for each entity is defined in the the schema.graphql file.
- `dataSources.mapping.abis`: one or more named ABI files for the source contract as well as any other smart contracts that you interact with from within the mappings.
- `dataSources.mapping.eventHandlers`: lists the smart contract events this subgraph reacts to and the handlers in the mapping—./src/mapping.ts in the example—that transform these events into entities in the store.
- `dataSources.mapping.callHandlers`: lists the smart contract functions this subgraph reacts to and handlers in the mapping that transform the inputs and outputs to function calls into entities in the store.
- `dataSources.mapping.blockHandlers`: lists the blocks this subgraph reacts to and handlers in the mapping to run when a block is appended to the chain. Without a filter, the block handler will be run every block. An optional filter can be provided with the following kinds: call. A call filter will run the handler if the block contains at least one call to the data source contract.

### Defining the entities

Next, update __schema.graphql__ with the following code:

```graphql
type Token {
  id: ID!
  tokenID: BigInt!
  contentURI: String!
  creator: User!
  owner: User!
}

type User @entity {
  id: ID!
  tokens: [Token!]! @derivedFrom(field: "owner")
  created: [Token!]! @derivedFrom(field: "creator")
}
```