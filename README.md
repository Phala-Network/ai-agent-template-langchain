# AI-Agent Contract Template with LangChain

<img height="320" src="./public/AI-Agent-Contract.jpg" />
<br/>
<img height="32" src="public/LangChain-Logo.png" />


## Quick Start
Install dependencies
```shell
npm install
```

Create `.env` file and add your API Key
```shell
cp .env.local .env
```

In `.env` file replace `YOUR_OPENAI_KEY` with your API Key
```text
OPENAI_API_KEY="YOUR_OPENAI_KEY"
```

Build your Agent
```shell
npm run build
```

Test your Agent
```shell
npm run test
```

Test Results
```shell
User: Who are you?
    Answer:
GET RESULT: {
  status: 200,
  body: '\n' +
    '    <!DOCTYPE html>\n' +
    '    <html lang="en">\n' +
    '        <head>\n' +
    '            <meta charset="utf-8" />\n' +
    '            <title>TestUI</title>\n' +
    '        </head>\n' +
    '        <body>\n' +
    '            <div align="center">\n' +
    '                <p>I am Marvin Tong, a blockchain enthusiast and advocate for decentralized technologies.</p>\n' +
    '            </div>\n' +
    '        </body>\n' +
    '    </html>',
  headers: {
    'Content-Type': 'text/html; charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
}

User: What the latest direction of Phala?
    Answer:
POST RESULT: {
  status: 200,
  body: '\n' +
    '    <!DOCTYPE html>\n' +
    '    <html lang="en">\n' +
    '        <head>\n' +
    '            <meta charset="utf-8" />\n' +
    '            <title>TestUI</title>\n' +
    '        </head>\n' +
    '        <body>\n' +
    '            <div align="center">\n' +
    '                <p>The latest direction of Phala includes introducing AI Agent Contracts, hosting AI agents with Phala Network like smart contracts to build a Multi-Agents World. They are also incorporating a host runtime from RiscZero to their js runtime, marking a milestone for TEE+ZKP multi-prover strategy. Additionally, they are actively engaging with other platforms like binance for potential listings and offering bounties for finding runtime bugs. Overall, Phala is focused on pushing the boundaries of decentralized AI services and innovation in the Web3 space.</p>\n' +
    '            </div>\n' +
    '        </body>\n' +
    '    </html>',
  headers: {
    'Content-Type': 'text/html; charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
}
```

Upload Agent to IPFS
```shell
TODO
```

