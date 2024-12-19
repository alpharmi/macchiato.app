export default async function handler(req, res) {
    const query = req.query

    console.log(query.uid, query.method)

    res.status(300).send(300)
}