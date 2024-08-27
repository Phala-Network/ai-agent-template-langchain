import main from './index'
import 'dotenv/config'

async function execute(inputObj: any) {
    const inputJson = JSON.stringify(inputObj)
    console.log('INPUT:', inputJson)
    return await main(inputJson)
}

async function test() {
    const getResult = await execute({
        method: 'GET',
        path: '/ipfs/CID',
        queries: { chatQuery: ["Who are you?"] },
        secret: { openaiApiKey: process.env.OPENAI_API_KEY },
        headers: {},
    })
    console.log('GET RESULT:', JSON.parse(getResult))

    const postResult = await execute({
        method: 'GET',
        path: '/ipfs/CID',
        queries: { chatQuery: ["What the latest direction of Phala?"] },
        secret: { openaiApiKey: process.env.OPENAI_API_KEY },
        headers: {},
    })
    console.log('GET RESULT:', JSON.parse(postResult))

    console.log(`**NOTE**:\nThis is a local test and your published code could have a different result when executing in the TEE on Phala Network.`)
    console.log(`\nPlease reach out to the team here if your run into issues: https://discord.gg/phala-network`)
}

test().then(() => { }).catch(err => console.error(err)).finally(() => process.exit())
