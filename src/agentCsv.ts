import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import * as csv from "csvtojson";

async function readTweetsFromCsv(filepath: string) {
    const contents = await csv.default().fromFile(filepath);

    return contents;
}

async function langChainPipe(openaiApiKey: string, query: string): Promise<string> {
    const examples = await readTweetsFromCsv("res/marvin_tong.csv");
    const examplePrompt = new PromptTemplate({
        inputVariables: ["Content"],
        template: `Tweet: {Content}`
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
