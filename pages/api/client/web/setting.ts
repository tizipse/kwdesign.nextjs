// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<RESResponse.Response<Record<string, string>>>) {
    res
        .status(200)
        .json({
            code: 20000,
            message: 'Success',
            data: {
                company_zh: '瞰外规划设计有限公司',
                company_en: 'Kanwai Program and Design Company Limited',
                copyright: '©️2020 瞰外规划设计有限公司',
                icp: '浙ICP备15033077号',
                police: '浙公网安备33010502004618号',
                bg_index: '#000000',
            },
        })
}
