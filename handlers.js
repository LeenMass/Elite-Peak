const db = require("./database/connection");
const bcrypt = require("bcrypt");
const templates = require("./tempelete");

const logInPost = async (req, res) => {
  try {

    let email = req.body.email;
    let password = req.body.password;
    let users = await db.query(`SELECT  email,password,id FROM users WHERE email = $1 `, [email]);
    let x = users.rows.find((e) => e.email === email)
    let comparedpassword = await bcrypt.compare(password, users.rows[0].password)
    if (users.rows.length == 0) {
      const html = templates.error(" user not found ")
      res.status(400).send(html)
    }
    else if (password === '' || email === '') {
      const html = templates.error("All fields must be filled")
      res.status(400).send(html)
    }
    else if (x.email === email && comparedpassword == false) {
      const html = templates.error("password is wrong")
      res.status(400).send(html)
    }
    else if (x.email === email && comparedpassword == true) {
      res.cookie("userId", users.rows[0].id, { maxAge: 600000 });
      res.redirect('/hotels');
    }
  }
  catch (err) {
    res.status(404).send("authentecation failed")
  }
}

const saltRounds = 10;
const getHotels = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (userId) {
      let users = await db.query(`SELECT  email FROM users WHERE id = $1 `, [userId]);
      let hotels = await db.query("SELECT hotel_name,image,hotel_id FROM hotelsinfo");
      let data = hotels.rows;
      let str = " ";
      for (let i = 0; i < data.length; i++) {
        str += " <div class='card'>" + data[i].hotel_name + "<br><br>" + "<img src=' " + data[i].image + "<'/>" + `<br/><a href='/hotels/${data[i].hotel_id}'>Read more</a>` + "</div>";
      }
      const email = users.rows[0].email
      const html = templates.hotels(email, str);
      res.send(html);
    }
    else {
      const html = templates.error("You must be logged in ");
      res.status(200).send(html);
    }
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
const singleHotel = async (req, res) => {
  let hotels = await db.query(`SELECT * FROM hotelsinfo where hotel_id=$1`, [parseInt(req.params.id)]);
  let str = hotels.rows[0].hotel_name + "<br/><br/>" + "<img src=' " + hotels.rows[0].image + "<'/>" + '</br></br>' + hotels.rows[0].review + "<br><br>" + hotels.rows[0].score + "<br><br>" + hotels.rows[0].city + "</br></br>" + hotels.rows[0].description + "</div>"
  const html = templates.hotelDetails(str);
  res.send(html);
}

const addReview = (req, res) => {
  const { title, content } = req.body;
  db.query(`INSERT INTO review (user_id,title,content,date) VALUES ($1, $2,$3,$4) RETURNING *`, [req.cookies.userId, title, content, new Date()])
    .then(() => {
      res.redirect('/hotels')
    })
    .catch(error => {
      res.status(500).send(`<h1>Something went wrong </h1>`);
    });
}

const postForm = (req, res) => {
  const userId = req.cookies.userId;
  if (userId) {
    const html = templates.newPost();

    res.send(html)
  }
  else {
    const html = templates.error("You must be logged in ");
    res.status(200).send(html);
  }
}
const reviews = async (req, res) => {
  const userId = req.cookies.userId;
  if (userId) {
    const result = await db.query(`select * from review where user_id=$1`, [userId])
    const reviewsData = result.rows
    const html = templates.allPosts(reviewsData)
    res.send(html)
  }
  else {
    const html = templates.error("You must be logged in ");
    res.status(200).send(html);
  }
}
const postDetails = async (req, res) => {
  const result = await db.query(`select * from review where user_id=$1 and title=$2`, [req.cookies.userId, req.params.title])
  const html = templates.post(result.rows[0])
  res.send(html)
}

const deletePost = async (req, res) => {
  await db.query(`Delete from review where user_id=$1 and id=$2`, [req.cookies.userId, req.params.id])
  res.redirect('/hotels')
}
const logOut = (req, res) => {
  res.clearCookie("userId");
  res.redirect("/");
}

module.exports = { deletePost, postDetails, getHotels, reviews, logIn, singUp, logInPost, signUpPost, logOut, addReview, postForm, singleHotel }