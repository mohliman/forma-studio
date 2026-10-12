import sharp from 'sharp'
import { readFile, mkdir } from 'node:fs/promises'
const {images} = JSON.parse(await readFile('assets-source.json','utf8'))
await mkdir('public/images',{recursive:true})
for(const asset of images){await sharp(asset.source).resize({width:1536,withoutEnlargement:true}).webp({quality:82}).toFile(`public/images/${asset.slug}.webp`);console.log(asset.slug)}
