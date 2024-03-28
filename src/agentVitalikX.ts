import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function langChainPipe(openaiApiKey: string, query: string): Promise<string> {
    const examples = [
        {
            "tweet": `Abolish daylight savings time.`,
        },
        {
            "tweet": `Polymarket is predicting that blobs (~125 kB) will cost ~0.001 ETH.

            Today, 125 kB calldata costs ~30 gwei per gas * 16 gas per byte * 125000 gas ~= 0.06 ETH

            And if you think polymarket's guess that blobs will be 60x cheaper is over-optimistic, you can use the market to hedge!`,
        },
        {
            "tweet": `Thread from 1.5 years ago on ERC-4337. Still very relevant today, important to understand why it works and how the different parts of the ERC flow directly from the problems that it solves.`,
        },
        {
            "tweet": `One application of AI that I am excited about is AI-assisted formal verification of code and bug finding.

            Right now ethereum's biggest technical risk probably is bugs in code, and anything that could significantly change the game on that would be amazing.`,
        },
        {
            "tweet": `I'm really looking forward to Verkle trees. They will enable stateless validator clients, which can allow staking nodes to run with near-zero hard disk space and sync nearly instantly - far better solo staking UX. Also good for user-facing light clients.`,
        },
        {
            "tweet": `Reminder: modern cars are highly networked computers and are a privacy nightmare.

            Very under-explored sector for privacy improvements. Some "fancy ZK" but also some plain boring "collect and track less stuff please".`,
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
        prefix: await prefixPrompt.format({ identity: "Vitalik Buterin" }),
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
