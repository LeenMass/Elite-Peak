
function layout(content) {
  return (`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Elite Peak</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <header>
            <nav>
              <a href="/hotels">Hotels</a>
              <a href="/Reservation">Reservation</a>
              <a href="/payment">Payment</a>
              <a href="/reviewPage">add review</a>
            </nav>
          </header>
          ${content}
        </body>
      </html>
    `);
}

function home(email, data) {
  if (email) {
    return layout(/*html */ `
        <h4>welcone back ${email}</h4>
          
              ${data}
         <a href="/logOut">Log out</a>
      `);
  }
  else {
    return layout(`
         <h1>Elite Peak</h1>
       
     `)
  }
}
function logIn() {
  return layout(`
      <h1>Log in to your account</h1>
      <form   method='post'>
        <label> Email:</label>
        <input id="mail" type="email" name="email" required></br></br>
        <label>Password:<label>
        <input id="password" type="password" name="password" required></br></br>
        <button type="submit">Log in</button>
        <p>didn't have an account? <a href='SignUp'>signup</a></p>
      </form>
    `);
}
function SignUp() {
  return layout(`
       <form  method='post'>
          <label>Name:<label>
          <input type='text' id='name' name='name' required/><br><br>
          <label>Phone Number:<label>
          <input type='tel' id='phone' name='phone'/><br><br>
          <label>Email:</label>
          <input id="umail" type="email" name="email" required></br></br>
          <label>Password:</label>
          <input type='password' id='pass' name='password' required/><br><br>
          <label>Gender:</label>
          <label>Male</label>
          <input type='radio' id='male' value='Male' name='gender'/>
          <label>Female</label>
          <input type='radio' id='female' value='Female' name='gender'/></br></br>
          <label>Country:<label>
          <input type='text' id='country' name='country'/><br><br>
          <label>Birthdate:</label>
          <input type='date' id='date' name='birthdate' /></br></br>
          <input type='submit' id='submit' value='submit' />
       </form>
  `);
}
function payment() {
  return layout(`
    <div class="col-md-7 col-sm-12 p-0 box">
      <div class="card rounded-0 border-0 card2" id="paypage">
        <div class="form-card" >
          <h1 id="heading2" class="text-danger">Payment Method</h1>
          <h3 id="accept card" class="txt">WE ACCEPT</h3>
            <div class="radio-group">
              <div class='radio' data-value="credit"><img src="https://i.imgur.com/28akQFX.jpg" width="200px" height="60px"></div>
                <div class='radio' data-value="paypal"><img src="https://i.imgur.com/5QFsx7K.jpg" width="200px" height="60px"></div>
                  <br>
              </div>
        <form method='post'>
         <label class="pay">Name on Card</label>
         <input type="text" name="name_on_card" id="name_on_card" required>
          <div class="row">
          <div class="col-8 col-md-6">
            <label class="pay">Card Number</label>
            <input type="text" name="card_number" id="card_number" placeholder="0000-0000-0000-0000" required>
            </div>
                        <div class="col-4 col-md-6">
                            <label class="pay">CVV</label>
                            <input type="password" name="cvv" placeholder="&#9679;&#9679;&#9679;" class="placeicon" minlength="3" maxlength="3" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label class="pay">Expiration Date</label>
                        </div>
                        <div class="col-md-12">
                            <input type="text" name="expiration_date" id="expiration_date" placeholder="MM/YY" minlength="5" maxlength="5" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <input type="submit"  value="MAKE A PAYMENT &nbsp; &#xf178;" class="btn btn-info placeicon">
                        </div>
                    </div>
                </div>
                </form>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>`)
}
function newPost() {
  return layout(/*html */ `
    <h1>Add a new post</h1>
    <form  method="POST">
      <label for="title">
        Post title<span aria-hidden="true">*</span>
      </label>
      <input id="title" type="text" name="title" required>
      <label for="content">Post content</label>
      <textarea id="content" name="content"></textarea>
      <button type="submit">Save post</button>
    </form>
  `);
}
async function allPosts() {
  const posts = await db.query(`select * from review`)
  return layout(/*html */ `
    <h1>All posts</h1>
    <ul>
      ${posts
      .map(
        (post) => `
          <li>
            <a href="/posts/${post.title}">${post.title}</a>
            <a href="/delete-post/${post.title}" aria-label="Delete post titled ${post.title}">🗑</a>
          </li>
        `
      )
      .join("")}
    </ul>
  `);
}

function post(post) {
  console.log(post);
  return layout(/*html */ `
    <h1>${post.title}</h1>
    <main>${post.content}</main>
    <div>Written by ${post.author}</div>
  `);
}
function error(message) {
  return layout(/*html*/ `
      <h1>${message}</h1>
    `);
}
module.exports = { home, SignUp, logIn, payment, error, newPost, post, allPosts };