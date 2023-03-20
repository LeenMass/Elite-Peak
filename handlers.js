const db = require("./database/connection");
const bcrypt = require("bcrypt");
const templates = require("./tempelete");

const logInPost = async (req, res) => {
    // try {

        let email = req.body.email;
        let password = req.body.password;
        res.cookie("email", email, { maxAge: 600000 });

//         let haspass = await db.query(`SELECT  password FROM users WHERE email = $1 `, [email]);///
//         let pass = haspass.rows.map(e => e.password);

//         let users = await db.query(`SELECT  * FROM users WHERE email = $1 `, [email]);
//         let userId = users.rows[0].id
        

//         let newusers = users.rows.map(e => e.email);
//         //console.log(await bcrypt.compare(password,pass[0]));
//         let comparepass = await bcrypt.compare(password, pass[0]);

//         if (newusers.length === 0) {
//             res.send("the use not found");
//         }

//         else if (newusers[0] === users.rows[0].email && comparepass === true) {
//             res.redirect('/hotels');
//         }

//         else if (newusers[0] === users.rows[0].email && comparepass === false) {
//             res.send("Wrong Password");
//         }

//     }
//     catch (err) {
//         console.log(err);
//         res.send(`not found1`)
//     }
}

 const saltRounds = 10;
const getHotels = async (req, res) => {
    try {


        let hotels = await db.query("SELECT * FROM hotelsinfo");
        let data = hotels.rows;
        let str = " ";
        for (let i = 0; i < data.length; i++) {
            str += " <div class='card'>" + data[i].hotel_name + "<br><br>" + "<img src=' " + data[i].image + "<'/>" + '</br></br>' + data[i].review + "<br><br>" + data[i].score + "<br><br>" + data[i].city + "</br></br>" + data[i].discription + "</div>";
        }

        const html = templates.home(str);
        res.send(html);
    }
    catch (error) {
        console.log(error)
    }


}

const logIn = (req, res) => {
    const html = templates.logIn();
    res.send(html);
}

const singUp = (req, res) => {
    const html = templates.SignUp();
    res.send(html);
}

const signUpPost = (req, res) => {
    const { name, email, password, birthdate, phone, gender } = req.body;
    bcrypt
        .hash(password, saltRounds)
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    db.query(`INSERT INTO users (name,email, password, birthdate,phone, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [name, email, hash, birthdate, phone, gender])
        .then(() => {
            res.redirect('/')
        })
        .catch(error => {
            res.status(500).send(`<h1>Something went wrong saving your data</h1>`);
        });
}


const paymentPage = (req, res) => {
    const email = req.body;
    if (!email) {
        const html = templates.error("You must be logged in ");
        res.status(401).send(html);
    }
    else {
        const html = templates.payment();
        res.send(html);
    }
}

const paymentPost = () => {
    const { name_on_card, card_number, cvv, expiration_date } = req.body;
    bcrypt
        .hash(card_number, saltRounds)
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashcardnum = bcrypt.hashSync(card_number, salt);
    bcrypt
        .hash(cvv, saltRounds)
    const hashcvv = bcrypt.hashSync(cvv, salt);
    bcrypt
        .hash(expiration_date, saltRounds)
    const hashdate = bcrypt.hashSync(expiration_date, salt);
    db.query(`INSERT INTO paycard (name_on_card, card_number, cvv, expiration_date) VALUES ($1, $2, $3, $4) RETURNING *`, [name_on_card, hashcardnum, hashcvv, hashdate])
        .then(() => {
            res.redirect('/');
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(`<p>Something went wrong saving your data</p>`);
        });
}
const addReview = (req, res) => {
    const { title, content } = req.body;
    db.query(`INSERT INTO review (user_id,title,content) VALUES ($1, $2,$3) RETURNING *`, [req.cookie.userId, title, content])
        .then(() => {
            res.redirect('/hotels')
        })
        .catch(error => {
            res.status(500).send(`<h1>Something went wrong </h1>`);
        });
}

const postForm = (req, res) => {
    const html = templates.newPost();

    res.send(html)
}
const logOut = (req, res) => {
    res.clearCookie("userId");
    res.redirect("/");
}

module.exports = { getHotels, logIn, singUp, logInPost, signUpPost, logOut, paymentPage, paymentPost, addReview, postForm }