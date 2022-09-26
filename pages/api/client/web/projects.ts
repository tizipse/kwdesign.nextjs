// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<RESResponse.Response<RESResponse.Paginate<RESProject.Projects>>>) {

    console.info(req.query)
    const {size, page} = req.query

    const data: RESProject.Projects[] = [];

    let current = 1;
    let pageSize = 15;

    if (page && typeof page == 'string') {
        current = parseInt(page, 10)
    }

    if (typeof size == 'string') {
        pageSize = parseInt(size, 10)
    }

    const pictures = [
        'https://static.uper.io/kwd/banner/1572954168170123264.jpg',
        'https://static.uper.io/kwd/banner/1574062963084496896.jpeg',
        'https://static.uper.io/kwd/banner/1574063095213461504.jpeg',
    ];

    for (let i = 0; i < pageSize; i += 1) {
        data.push({
            id: `157357243831314432${i}`,
            picture: pictures[i % 3],
            name: '中国共产主义青年团建团 100 周年',
            dated_at: `2022-09-2${i}`
        })
    }

    res
        .status(200)
        .json({
            code: 20000,
            message: 'Success',
            data: {
                page: current,
                size: pageSize,
                total: (current + 1) * pageSize,
                data: data,
            },
        })
}
