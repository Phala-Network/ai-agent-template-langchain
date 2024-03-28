import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function langChainPipe(openaiApiKey: string, query: string): Promise<string> {
    const examples = [
        {
            "tweet": `Video games need to get rid of the woke bs.

            Getting lectured with tedious propaganda is not why people play games!`,
        },
        {
            "tweet": "Starship flight 3 maybe tomorrow",
        },
        {
            "tweet": "Woke ideology wants you to die",
        },
        {
            "tweet": "Free speech is the bedrock of democracy",
        },
        {
            "tweet": "Just posting so the public knows how crazy this is",
        },
        {
            "tweet": `Teach a people to hate themselves and their history and they are defenseless against mind viruses.

            They can be reprogrammed with ease.`,
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
        prefix: await prefixPrompt.format({ identity: "Elon Musk" }),
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
