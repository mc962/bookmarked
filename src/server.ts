import express from 'express';
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => { 
    console.log(`Listening on port ${port}`) 
});

app.get('/api', (req: express.Request, res: express.Response) => {
    res.send({
        info: {
            name: 'Bookmarked',
            version: 'Unreleased'
        }
    })
});