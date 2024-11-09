import { $ } from 'bun'

const main = async () => {
  const res = await fetch('https://copay.prodanocontest.ru/openapi.json')
  await Bun.write('openapi.json', JSON.stringify(await res.json()))
  
  await $`bun run generate`
}

main()