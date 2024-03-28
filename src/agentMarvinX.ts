import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function langChainPipe(openaiApiKey: string, query: string): Promise<string> {
    const examples = [
        {
            "tweet": `Introduce 🤖 Agent Contract 🤖
            🔨 Create and host AI Agent with
            @PhalaNetwork
             like smart contracts, to build a Multi-Agents World.
            👋 Vision shared together with
            @david_enim

            @BrianknowsAI

            @AlgoveraAI

            @autonolas

            🧰 Support
            @Auto_GPT

            @LangChainAI


            💡Idea and design made in #ETHDenver2024
            https://youtu.be/TEAFVKEV2oc`,
        },
        {
            "tweet": `Wow this is wide!
            A
            @RiscZero
             host runtime is added to
            @PhalaNetwork
              js runtime 🫡
            A milestone for TEE+ZKP multi-prover strategy🔥`,
        },
        {
            "tweet": `🚀🔥
            @binance
              is throwing down the gauntlet, and it's time for
            @PhalaNetwork
              to make some noise!

            YOUR VOTE decides if  they will list $PHA on the futures market! 💥

            Hit up this link, make your mark, and let's blast $PHA (https://binance.com/en/futures/next) 🌌🔥`,
        },
        {
            "tweet": `🐞Find runtime bugs for
            @PhalaNetwork
             ?
            💰Get bounty from $60,500 prize pool !
            https://code4rena.com/audits/2024-03-phat-contract-runtime`,
        },
        {
            "tweet": `🥊Taking <flights ✈️> to Denver is a crutch for weak people who don’t want to< 🚗 ride > for 36 hours—-
            because taking flights have risks, and you have to trust the captain 🥱`,
        },
        {
            "tweet": `Highlights from #ETHDenver2024 🚀:
            - AI transcends the hype, proving its concrete value in the ecosystem.
            - Unveiling real-world, practical approaches to decentralizing AI services.
            - Beyond ZKML, numerous projects are innovating with AI Agent solutions. 🛠️
            - While "AI as a Player" dominates current Web3 applications, expect a wave of groundbreaking innovations on the horizon. 💡`,
        }
    ];
    const examplePrompt = new PromptTemplate({
        inputVariables: ["tweet"],
        template: `Tweet: {tweet}`
    });

    const prefixTemplate = "You are {identity} and you are proposing some insightful ideas. Here are some examples:";
    const suffixTemplate = `User: {query}
    Answer:`;

    const prefixPrompt = new PromptTemplate({
        inputVariables: ["identity"],
        template: prefixTemplate
    });

    const fewShotPromptTemplate = new FewShotPromptTemplate({
        examples: examples,
        examplePrompt: examplePrompt,
        prefix: await prefixPrompt.format({ identity: "Marvin Tong" }),
        suffix: suffixTemplate,
        inputVariables: ["query"]
    });

    console.log(await fewShotPromptTemplate.format({ query: query }));

    const model = new ChatOpenAI({ openAIApiKey: openaiApiKey });
    const outputParser = new StringOutputParser();

    const chain = fewShotPromptTemplate.pipe(model).pipe(outputParser);

    return chain.invoke({
        query: query
    });
}

async function GET(req: Request): Promise<Response> {
    const openaiApiKey = req.secret?.openaiApiKey as string;
    const query = req.queries.chatQuery[0] as string;

    const content = await langChainPipe(openaiApiKey, query);
    return new Response(renderHtml(content));
}

async function POST(req: Request): Promise<Response> {
    const openaiApiKey = req.secret?.openaiApiKey as string;
    const query = req.queries.chatQuery[0] as string;

    const content = await langChainPipe(openaiApiKey, query);
    return new Response(renderHtml(content));
}

export default async function main(request: string) {
    return await route({ GET, POST }, request);
}
