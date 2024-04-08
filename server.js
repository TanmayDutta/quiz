const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/questions', (req, res) => {
    fs.readFile('./questions.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading questions data.');
            return;
        }
        const questions = JSON.parse(data);
        res.json(questions);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
