// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<RESResponse.Response<RESClassification.Data[]>>) {
    res
        .status(200)
        .json({
            code: 20000,
            message: 'Success',
            data: [
                {
                    id: '1573316761741168640',
                    name: 'EXHIBITION',
                    alias: '展览',
                    title: 'EXHIBITION title',
                    keyword: 'EXHIBITION keyword',
                    description: 'EXHIBITION description',
                },
                {
                    id: '1573316803155726336',
                    name: 'BRAND',
                    alias: '品牌',
                    title: 'BRAND title',
                    keyword: 'BRAND keyword',
                    description: 'BRAND description',
                },
                {
                    id: '1573316846491275264',
                    name: 'BOOKS',
                    alias: '书籍',
                    title: 'BOOKS title',
                    keyword: 'BOOKS keyword',
                    description: 'BOOKS description',
                },
                {
                    id: '1573316950677786624',
                    name: 'SURROUNDINGS',
                    alias: '环境',
                    title: 'SURROUNDINGS title',
                    keyword: 'SURROUNDINGS keyword',
                    description: 'SURROUNDINGS description',
                },
            ],
        })
}
