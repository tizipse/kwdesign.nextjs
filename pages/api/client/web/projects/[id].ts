// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<RESResponse.Response<RESProject.Project>>) {

    const {id}: { id?: string } = req.query;

    res
        .status(200)
        .json({
            code: 20000,
            message: 'Success',
            data: {
                id,
                theme: 'light',
                name: '中国共产主义青年团建团 100 周年',
                address: '杭州富阳区',
                picture: 'https://static.uper.io/kwd/category/banner/1573236541277343744.jpg',
                height: 100,
                title: '',
                keyword: 'keyword',
                description: 'description',
                html: '<p>中国共产主义青年团是中国共产党领导的先进青年的群团组织，是广大青年在实践中学习中国特色社会主义和共产主义的学校，是中国共产党的助手和后备军。</p><p>中国共产党领导是中国特色社会主义最本质的特征，是中国特色社会主义制度的最大优势。中国共产主义青年团坚决拥护中国共产党的纲领，以马克思列宁主义、毛泽东思想、邓小平理论、“三个代表”重要思想、科学发展观、习近平新时代中国特色社会主义思想为行动指南。</p>',
                dated_at: '2022-09-21',
                pictures: [
                    'https://static.uper.io/kwd/category/banner/1573236541277343744.jpg',
                    'https://static.uper.io/kwd/banner/1574063095213461504.jpeg',
                    'https://static.uper.io/kwd/category/banner/1573236541277343744.jpg',
                    'https://static.uper.io/kwd/banner/1574062963084496896.jpeg',
                    'https://static.uper.io/kwd/banner/1574062963084496896.jpeg',
                ],
            },
        })
}
