// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<RESResponse.Response<Record<string, string>>>) {
    res
        .status(200)
        .json({
            code: 20000,
            message: 'Success',
            data: {
                logo_light: 'https://static.uper.io/kwd/picture/1573949550798835712.png',
                logo_dark: 'https://static.uper.io/kwd/picture/1574020566149500928.png',
                logo_bottom: 'https://static.uper.io/kwd/picture/1575844583651151872.png',
            },
        })
}
