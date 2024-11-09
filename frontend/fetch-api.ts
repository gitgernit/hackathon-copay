import { $ } from 'bun'
import {writeFileSync} from "node:fs";

const main = async () => {
  const res = await fetch('https://copay.prodanocontest.ru/openapi.json')
  let openapi = await res.json()
  
  openapi.paths = Object.fromEntries(Object.entries(openapi.paths).map(([key, value]) => {
    
    value = Object.fromEntries(Object.entries(value).map(([key, value]) => {
      
      value.responses = Object.fromEntries(Object.entries(value.responses).map(([key, value]) => {
        if (value['detail']) {
          delete value['detail'];
        }
        
        return [key, value]
      }))
      
      return [key, value]
    }))
    
    return [key, value]
  }))
  
  writeFileSync('./openapi.json', JSON.stringify(openapi, null, 2))
  
  await $`bun run generate`
}

main()