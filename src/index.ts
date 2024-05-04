import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {fewShotPromptExamples} from "./fewShotPromptExamples";

async function langChainPipe(openaiApiKey: string, query: string): Promise<string> {
  const examples = fewShotPromptExamples;
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

  const prefixPromptFormat = await prefixPrompt.format({ identity: "Marvin Tong" });
  const fewShotPromptTemplate = new FewShotPromptTemplate({
    examples: examples,
    examplePrompt: examplePrompt,
    prefix: prefixPromptFormat,
    suffix: suffixTemplate,
    inputVariables: ["query"]
  });

  await fewShotPromptTemplate.format({ query: query });

  const model = new ChatOpenAI({ openAIApiKey: openaiApiKey, modelName: 'gpt-3.5-turbo' });
  const outputParser = new StringOutputParser();

  const chain = fewShotPromptTemplate.pipe(model).pipe(outputParser);

  return await chain.invoke({
    query: query
  });
}

async function GET(req: Request): Promise<Response> {
  const secret = req.queries?.key ?? '';
  const openaiApiKey = req.secret?.openaiApiKey as string;
  const query = req.queries.chatQuery[0] as string;

  const content = await langChainPipe(`${openaiApiKey}`, `${query}`);
  return new Response(renderHtml(content as string));
}

async function POST(req: Request): Promise<Response> {
  const secret = req.queries?.key ?? '';
  const openaiApiKey = req.secret?.openaiApiKey as string;
  const query = req.queries.chatQuery[0] as string;

  const content = await langChainPipe(`${openaiApiKey}`, `${query}`);
  return new Response(renderHtml(content as string));
}

export default async function main(request: string) {
  return await route({ GET, POST }, request);
}
