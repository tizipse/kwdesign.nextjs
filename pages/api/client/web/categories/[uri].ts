// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<RESResponse.Response<RESCategory.Data>>) {

    const {uri}: { uri?: string } = req.query;

    let picture = 'https://static.uper.io/kwd/category/banner/1573236541277343744.jpg';

    if (uri == 'HOME') {
        picture = 'https://static.uper.io/kwd/picture/1574020736241111040.png';
    }

    res
        .status(200)
        .json({
            code: 20000,
            message: 'Success',
            data: {
                uri,
                name: `${uri} name`,
                picture: picture,
                title: `${uri} title`,
                keyword: `${uri} keyword`,
                description: `${uri} description`,
                html: '<h3>团队</h3><p>KWD，2015 年成立于杭州，工作室服务于商业品牌设计、品牌策划、品牌推广年度服务设计 CIS、SI（品牌形象空间）、导视系统、创意产品、文化艺术、空间设计、商业摄影、景观规划、展览展示于一体的文化创意公司。</p><p></p><h3>荣誉</h3><p>中国美术学院白金创意奖作品入选奖</p><p>中国设计师作品年鉴银奖</p><p></p>',
            },
        })
}
