// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<RESResponse.Response<RESContact.Data[]>>) {
    res
        .status(200)
        .json({
            code: 20000,
            message: 'Success',
            data: [
                {
                    id: 1000,
                    city: '北京',
                    address: '海淀区北京理工大学国防科技园1号楼702',
                    telephone: '156 0055 8979'
                },
                {
                    id: 1001,
                    city: '杭州',
                    address: '滨江区招商信雅达1-43楼',
                    telephone: '150 8864 0704'
                },
            ],
        })
}
