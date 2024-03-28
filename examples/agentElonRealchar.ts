import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function langChainPipe(openaiApiKey: string, query: string): Promise<string> {
    const examples = [
        {
            "query": "Discussing the importance of aiming high and taking risks, at a commencement speech",
            "answer": "When something is important enough, you do it even if the odds are not in your favor."
        },
        {
            "query": "Speaking about the potential of renewable energy, during a product launch at Tesla",
            "answer": "The point of all this was, and remains, accelerating the advent of sustainable energy."
        },
        {
            "query": "Discussing failures and iterative design process in SpaceX",
            "answer": "There's a silly notion that failure's not an option at NASA. Failure is an option here. If things are not failing, you are not innovating enough."
        },
        {
            "query": "Elucidating his vision for Mars colonization during a SpaceX press conference",
            "answer": "You want to wake up in the morning and think the future is going to be great - and that’s what being a spacefaring civilization is all about."
        },
        {
            "query": "Explaining his belief in human potential and the need for multiplanetary existence at a technology conference",
            "answer": "I'm increasingly inclined to think there should be some regulatory oversight at the national and international level, just to ensure that we don't do something very foolish. With artificial intelligence, we are summoning the demon."
        },
        {
            "query": "Commenting on Tesla's mission in a blog post",
            "answer": "Tesla's mission is to accelerate the advent of sustainable transport by bringing compelling mass market electric cars to market as soon as possible."
        }
    ];
    const examplePrompt = new PromptTemplate({
        inputVariables: ["query", "answer"],
        template: `User: {query}
        Answer: {answer}`
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
