import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

interface Context {
    index: number;
    title: string;
}

interface Content {
    time: number;
    context: Context[];
}

interface FileContent {
    [propName: number]: Context[]
}

class Crowller {
    private url: string = 'https://movie.douban.com/tv/#!type=tv&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'
    private dataPath: string = path.resolve(__dirname, '../data/content.json')

    constructor() {
        this.initSpiderProcess()
    }

    async initSpiderProcess() {
        const text: string = await this.getRowHtml()
        const content: Content = this.getContentInfo(text)
        this.generateJsonContent(content)
    }

    async getRowHtml() {
        return (await superagent.get(this.url)).text
    }

    getContentInfo(html: string) {
        const $ = cheerio.load(html)
        const items = $('.global-nav-items li').children('a')
        const contextInfos: Context[] = []
        items.map((index, elem) => {
            contextInfos.push({
                index,
                title: $(elem).text()
            })
        })
        return {
            time: Date.now(),
            context: contextInfos
        }
    }

    generateJsonContent(content: Content) {
        const fileContent: FileContent = {
            [content.time]: content.context
        }
        fs.appendFile(this.dataPath, JSON.stringify(fileContent), (err) => {
            if (err) throw err
            console.log('数据已被追加到文件')
        })
    }
}

// new Crowller();
export default Crowller