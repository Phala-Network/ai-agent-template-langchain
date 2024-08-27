import { Request, Response, route } from './httpSupport'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate, FewShotPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import {fewShotPromptExamples} from './fewShotPromptExamples'

async function langChainPipe(openaiApiKey: string, query: string): Promise<string> {
  const examples = fewShotPromptExamples
  const examplePrompt = new PromptTemplate({
    inputVariables: ["tweet"],
    template: `Tweet: {tweet}`
  })
  const prefixTemplate = "You are {identity} and you are proposing some insightful ideas. Here are some examples:";
  const suffixTemplate = `User: {query}
    Answer:`
  const prefixPrompt = new PromptTemplate({
    inputVariables: ["identity"],
    template: prefixTemplate
  })

  const prefixPromptFormat = await prefixPrompt.format({ identity: "Marvin Tong" });
  const fewShotPromptTemplate = new FewShotPromptTemplate({
    examples: examples,
    examplePrompt: examplePrompt,
    prefix: prefixPromptFormat,
    suffix: suffixTemplate,
    inputVariables: ["query"]
  })

  await fewShotPromptTemplate.format({ query: query })

  const model = new ChatOpenAI({ openAIApiKey: openaiApiKey, modelName: 'gpt-4o' });
  const outputParser = new StringOutputParser();

  const chain = fewShotPromptTemplate.pipe(model).pipe(outputParser)

  return await chain.invoke({
    query: query
  })
}

async function GET(req: Request): Promise<Response> {
  let result = { message: '' }
  const secrets = req.secret || {}
  const queries = req.queries
  const openaiApiKey = (secrets.openaiApiKey) ? secrets.openaiApiKey as string : ''
  const query = (queries.chatQuery) ? queries.chatQuery[0] as string : 'Who are you?'

  const content = await langChainPipe(`${openaiApiKey}`, `${query}`)
  result.message = content as string
  return new Response(JSON.stringify(result))
}

async function POST(req: Request): Promise<Response> {
  return new Response(JSON.stringify({message: 'Not Implemented'}))
}

export default async function main(request: string) {
  return await route({ GET, POST }, request);
}
