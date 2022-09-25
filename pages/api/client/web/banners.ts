// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<APIResponse.Response<APIBanner.Data[]>>) {
    res
        .status(200)
        .json({
            code: 20000,
            message: 'Success',
            data: [
                {
                    id: 1000,
                    theme: 'light',
                    picture: 'https://static.uper.io/kwd/banner/1572954168170123264.jpg',
                    name: '首页',
                    target: 'self',
                    url: 'https://baidu.com',
                },
                {
                    id: 1001,
                    theme: 'light',
                    picture: 'https://static.uper.io/kwd/banner/1574062963084496896.jpeg',
                    name: '首页',
                    target: 'self',
                    url: '',
                },
                {
                    id: 1002,
                    theme: 'dark',
                    picture: 'https://static.uper.io/kwd/banner/1574063095213461504.jpeg',
                    name: '首页',
                    target: 'self',
                    url: '',
                },
            ],
        })
}
