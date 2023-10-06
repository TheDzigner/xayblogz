const getFirestore = require('firebase/firestore');
const getDocs = require('firebase/firestore');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

const db = getFirestore();

const blogsRef = collection(db, 'blogs');


app.get('/', (req, res) => {
  res.render('index')
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})