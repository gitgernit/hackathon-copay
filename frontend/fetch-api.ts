import { $ } from 'bun'
import {writeFileSync} from "node:fs";

const main = async () => {
  const res = await fetch('https://copay.prodanocontest.ru/openapi.json')
  writeFileSync('./openapi.json', JSON.stringify(await res.json(), null, 2))
  
  await $`bun run generate`
}

main()