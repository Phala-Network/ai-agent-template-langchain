<div align="center">
  <a href="https://github.com/Phala-Network/ai-agent-template-langchain">
    <h1>AI Agent Contract Template with LangChain</h1>
    <img height="320" src="./public/AI-Agent-Contract.jpg" />
    <br />
  </a>
  <a href="https://js.langchain.com/docs/get_started/introduction">
    <img width="120" src="public/LangChain-Logo.png" />
    <br />
  </a>
  <p align="center">
    Host your AI Agent Contract on Phala's decentralized serverless cloud.
    <br />
    <a href="https://github.com/Phala-Network/ai-agent-template-langchain"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://wapo-testnet.phala.network/ipfs/QmYzBTdQNPewdhD9GdBJ9TdV7LVhrh9YVRiV8aBup7qZGu?key=815cab7189f6110e&chatQuery=Who%20are%20you">View Demo</a>
    ·
    <a href="https://github.com/Phala-Network/ai-agent-template-langchain/issues">Report Bug</a>
    ·
    <a href="https://discord.gg/phala-network">Discord</a>
  </p>

  <h3>Architecure Overview</h3>
  <img height="320" src="./public/ai-agent-architecture.jpg" />
</div>


## 🤖 What Is This?!

<div align="center">
  <img height="240" src="https://www.jlwranglerforums.com/forum/attachments/zoolander-gif.325299/">
</div>

The LangChain AI Agent template is a **MINIMAL** template to build an AI Agent that can be hosted on Phala Network's decentralized hosting protocol. Unlike Vercel or other FaaS, it allows you to publish your AI Agent compiled code to IPFS and hosts it on a fully decentralized FaaS cloud with the following benefits:

- 💨 Ship Fast: Build and ship with familiar toolchain in minutes
- ⛑️ Secure: Execution guarded by rock solid TEE / Intel SGX
- 🔒 Private: Host API keys and user privacy at ease
- 💎 Unstoppable: Powered by IPFS and Phala's 35k+ decentralized TEE workers

[//]: # (<img width="320" src="https://media1.tenor.com/m/NBtFH5F9QTgAAAAd/what-is-my-purpose-butter.gif" />)

## Getting Started
### Prepare
Install dependencies
```shell
npm install
```

### Testing Locally
Create `.env` file and add your OpenAI API Key
```shell
cp .env.example .env
```

In `.env` file replace `YOUR_OPENAI_KEY` with your API Key
```text
OPENAI_API_KEY="YOUR_OPENAI_KEY"
```

Build your Agent
```shell
npm run build
```

Test your Agent locally
```shell
npm run test
```

Expected Test Results
```shell
INPUT: {"method":"GET","path":"/ipfs/CID","queries":{"chatQuery":["Who are you?"]},"secret":{"openaiApiKey":"OPENAI_API_KEY"},"headers":{}}
GET RESULT: {
  status: 200,
  body: "I'm Marvin Tong, an advocate for decentralized technologies and AI integration. My focus is on the intersection of blockchain, AI, and secure computing, promoting innovative projects and collaborations within this space. Through insightful ideas and collaborations with various tech leaders and platforms, I aim to build a Multi-Agents World leveraging tools like Phala Network, Auto-GPT, LangChainAI, and others. I share visions and insights, encourage community participation in tech innovations, and actively participate in significant events like ETHDenver. Apart from my tech-centric endeavors, I also engage with various community initiatives and bounty programs to foster a vibrant ecosystem of decentralized and AI-powered solutions.",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}
INPUT: {"method":"GET","path":"/ipfs/CID","queries":{"chatQuery":["What the latest direction of Phala?"]},"secret":{"openaiApiKey":"OPENAI_API_KEY"},"headers":{}}
GET RESULT: {
  status: 200,
  body: 'Phala Network is continuously innovating in the realms of privacy-preserving cloud computing, leveraging blockchain technology for secure, decentralized, and scalable compute power. Here are some of the latest directions Phala is taking:\n' +
    '\n' +
    '### 1. **AI Agent Contracts**:\n' +
    'Phala is pioneering the concept of AI Agent Contracts, allowing developers to create and host AI agents akin to smart contracts. This initiative aims to build a multi-agent world, enhancing automation and intelligence within the blockchain ecosystem. For more context, these agents can facilitate a myriad of decentralized services, from automated trading bots to intelligent dApps.\n' +
    '\n' +
    '### 2. **Integration with TEE and ZKP**:\n' +
    'Phala is actively enhancing its trust model by integrating Trusted Execution Environments (TEE) with Zero-Knowledge Proofs (ZKP). This dual strategy boosts security, privacy, and scalability, enabling more robust and confidential decentralized applications.\n' +
    '\n' +
    '### 3. **Community Engagement and Bounty Programs**:\n' +
    'The network is engaging its community through bounty programs and bug-hunting initiatives, often with substantial prize pools. This not only helps in maintaining high security standards but also fosters community involvement and a culture of collaboration.\n' +
    '\n' +
    '### 4. **Collaborations and Ecosystem Expansion**:\n' +
    "Phala is partnering with industry leaders and other innovative projects to expand its ecosystem. The integration with Risc Zero's runtime is one such example, which underscores Phala’s commitment to combining different technological advancements for a more secure and efficient blockchain solution.\n" +
    '\n' +
    '### 5. **Exchange Listings and Market Presence**:\n' +
    "Phala Network actively works towards increasing its market presence, as evidenced by efforts to get $PHA listed on major futures markets like Binance. This drives liquidity and broadens access for traders and investors, enhancing the token's utility and adoption.\n" +
    '\n' +
    '### 6. **Focus on Real-World AI and Decentralization**:\n' +
    'Phala is not only creating theoretical AI solutions but is focused on unveiling real-world, practical approaches to decentralizing AI services. The goal is to transcend the hype and showcase the concrete value AI can bring within a decentralized framework.\n' +
    '\n' +
    '### 7. **Community Events and Advocacy**:\n' +
    'Participation in events like ETHDenver is crucial for Phala, as it allows the team to showcase advancements, engage with the community, and gather feedback from stakeholders. These events also help in keeping the community excited and informed about the latest developments.\n' +
    '\n' +
    '### 8. **Future Innovations**:\n' +
    'While current innovations are impressive, Phala isn’t stopping there. The network is poised to introduce groundbreaking solutions in the near future, particularly in AI agent functionalities within Web3 applications. This will push the boundaries of what is possible with decentralized, intelligent agents.\n' +
    '\n' +
    'In sum, Phala Network is driving forward with a focus on privacy, security, AI integration, and community engagement, making significant strides toward creating a more secure and intelligent blockchain ecosystem.',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}
**NOTE**:
This is a local test and your published code could have a different result when executing in the TEE on Phala Network.

Please reach out to the team here if your run into issues: https://discord.gg/phala-network
```

### Publish Your AI Agent
Upload your compiled AI Agent code to IPFS.
```shell
npm run publish-agent
```

Upon a successful upload, the command should show the URL to access your AI Agent.
```shell
Running command: npx thirdweb upload dist/index.js
This may require you to log into thirdweb and will take some time to publish to IPFS...

    $$\     $$\       $$\                 $$\                         $$\       
    $$ |    $$ |      \__|                $$ |                        $$ |      
  $$$$$$\   $$$$$$$\  $$\  $$$$$$\   $$$$$$$ |$$\  $$\  $$\  $$$$$$\  $$$$$$$\  
  \_$$  _|  $$  __$$\ $$ |$$  __$$\ $$  __$$ |$$ | $$ | $$ |$$  __$$\ $$  __$$\ 
    $$ |    $$ |  $$ |$$ |$$ |  \__|$$ /  $$ |$$ | $$ | $$ |$$$$$$$$ |$$ |  $$ |
    $$ |$$\ $$ |  $$ |$$ |$$ |      $$ |  $$ |$$ | $$ | $$ |$$   ____|$$ |  $$ |
    \$$$$  |$$ |  $$ |$$ |$$ |      \$$$$$$$ |\$$$$$\$$$$  |\$$$$$$$\ $$$$$$$  |
     \____/ \__|  \__|\__|\__|       \_______| \_____\____/  \_______|\_______/ 

 💎 thirdweb v0.14.12 💎

- Uploading file to IPFS. This may take a while depending on file sizes.

✔ Successfully uploaded file to IPFS.
✔ Files stored at the following IPFS URI: ipfs://QmYzBTdQNPewdhD9GdBJ9TdV7LVhrh9YVRiV8aBup7qZGu
✔ Open this link to view your upload: https://b805a9b72767504353244e0422c2b5f9.ipfscdn.io/ipfs/bafybeie6giqpm4fmxt4vzdfi6jlbxxlvjlal3cm57auubgcmuvm7xcqtli/

Agent Contract deployed at: https://wapo-testnet.phala.network/ipfs/QmYzBTdQNPewdhD9GdBJ9TdV7LVhrh9YVRiV8aBup7qZGu

If your agent requires secrets, ensure to do the following:
1) Edit the setSecrets.ts file to add your secrets
2) Set the variable AGENT_CID=QmYzBTdQNPewdhD9GdBJ9TdV7LVhrh9YVRiV8aBup7qZGu in the .env file
3) Run command: npm run set-secrets
```

<details>
<summary>New to thirdweb?</summary>
We use <a href="https://thirdweb.com/dashboard/infrastructure/storage">thirdweb Storage</a> to host IPFS contents. If you are new to thirdweb, the command will guide you to create your account or login to your existing account from the browser. (You may need to forward port 8976 if you are accessing a remote console via SSH.)
</details>

<details>
<summary>Did thirdweb fail to publish?</summary>
If ThirdWeb fails to publish, please use any IPFS pinning service to publish your Agent Contract.
</details>

### Access the Published AI Agent

Once published, your AI Agent is available at the URL: `https://wapo-testnet.phala.network/ipfs/<your-cid>`. You can get it from the "Publish to IPFS" step.

You can test it with `curl`.

```bash
curl https://wapo-testnet.phala.network/ipfs/<your-cid>
```

### Add Secrets

By default, all the compiled JS code is visible for anyone to view if they look at IPFS CID. This makes private info like API keys, signer keys, etc. vulnerable to be stolen. To protect devs from leaking keys, we have added a field called `secret` in the `Request` object. It allows you to store secrets in a vault for your AI Agent to access.

To add your secrets,
1) edit the [setSecrets.ts](./scripts/setSecrets.ts) file and update the `secrets` variable at the top of the file
```typescript
// Update your key value JSON object here for your secrets
const secrets = JSON.stringify({
  // Add your secrets here
  // key: value
  openaiApiKey: process.env.OPENAI_API_KEY
})
```
2) Update the [.env](./.env.example) file with your published agent IPFS CID
```text
AGENT_CID=QmYzBTdQNPewdhD9GdBJ9TdV7LVhrh9YVRiV8aBup7qZGu
```
3) Run command to set the secrets
```shell
npm run set-secrets
```
Expected output:
```shell
Storing secrets...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   205    0    68  100   137     92    187 --:--:-- --:--:-- --:--:--   280
{"token":"6a4edea526c67508","key":"815cab7189f6110e","succeed":true}

Secrets set successfully. Go to the URL below to interact with your agent:
https://wapo-testnet.phala.network/ipfs/QmYzBTdQNPewdhD9GdBJ9TdV7LVhrh9YVRiV8aBup7qZGu?key=815cab7189f6110e
```

The API returns a `token` and a `key`. The `key` is the id of your secret. It can be used to specify which secret you are going to pass to your frame. The `token` can be used by the developer to access the raw secret. You should never leak the `token`.

To verify the secret, run the following command where `key` and `token` are replaced with the values from adding your `secret` to the vault.
```shell
curl https://wapo-testnet.phala.network/vaults/<key>/<token>
```

Expected output:
```shell
{"data":{"openaiApiKey":"<OPENAI_API_KEY>"},"succeed":true}
```

### Access Queries
To help create custom logic, we have an array variable named `queries` that can be accessed in the `Request` class. To access the `queries` array variable `chatQuery` value at index `0`, the syntax will look as follows:
```typescript
const query = req.queries.chatQuery[0] as string;
```
The example at https://wapo-testnet.phala.network/ipfs/QmYzBTdQNPewdhD9GdBJ9TdV7LVhrh9YVRiV8aBup7qZGu?key=815cab7189f6110e&chatQuery=Who%20are%20you will have a value of `When did humans land on the moon`. `queries` can have any field name, so `chatQuery` is just an example of a field name and not a mandatory name, but remember to update your `index.ts` file logic to use your expected field name.


## FAQ

<details>
<summary><b>What packages can I use in the AI Agent server?</b></summary>
<ul>
  <li>Most of the npm packages are supported: viem, onchainkit, ….</li>
  <li>Some packages with some advanced features are not supported:</li>
  <ul>
    <li>Memory usage over 100MB</li>
    <li>Web Assembly</li>
    <li>Browser only features: local storage, service workers, etc</li>
  </ul>
</ul>
</details>

<details>
<summary><b>What’s the spec of the Javascript runtime?</b></summary>
<ul>
  <li>The code runs inside a tailored <a href="https://bellard.org/quickjs/">QuickJS engine</a></li>
  <li>Available features: ES2023, async, fetch, setTimeout, setInterval, bigint</li>
  <li> <a href="https://docs.phala.network/tech-specs/ai-agent-contract#wapojs/">Tech spec doc</a></li>
</ul>
</details>

<details>
<summary><b>Why is the serverless platform secure?</b></summary>
<ul>
  <li>Your AI Agent code on is fully secure, private, and permissionless. Nobody can manipulate your program, steal any data from it, or censor it.</li>
  <li>Security: The code is executed in the decentralized TEE network running on Phala Network. It runs code inside a secure blackbox (called enclave) created by the CPU. It generates cryptographic proofs verifiable on Phala blockchain. It proves that the hosted code is exactly the one you deployed.</li>
  <li>Privacy: You can safely put secrets like API keys or user privacy on Phala Network. The code runs inside TEE hardware blackboxs. The memory of the program is fully encrypted by the TEE. It blocks any unauthorized access to your data.</li>
  <li>Learn more at <a href="https://phala.network">Phala Network Homepage</a></li>
</details>

<details>
<summary><b>What's TEE / Intel SGX?</b></summary>
<ul>
  <li><a href="https://collective.flashbots.net/t/tee-sgx-wiki/2019">TEE/SGX wiki</a></li>
  <li><a href="https://collective.flashbots.net/t/debunking-tee-fud-a-brief-defense-of-the-use-of-tees-in-crypto/2931">Debunking TEE FUD: A Brief Defense of The Use of TEEs in Crypto</a></li>
</details>
