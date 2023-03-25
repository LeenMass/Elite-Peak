const searchbar=require('./assest/search')
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
              <a href="/reviewPage">add review</a>
              <a href="/allreviews">Reviews</a>

            </nav>
          </header>
           ${content}
          <script src="/search.js"></script>
          
        </body>
      </html>
    `);
}


function hotels(email, data) {

  return layout(/*html */ `
  <h3> hi ${email}</h3>
  <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name">
  <ul id="myUL">

              ${data}
              <a href="/logOut">logOut</a>

      `);

}
function logIn() {
  return layout(`
      <h1>Log in to your account</h1>
      <form   method='post'>
        <label> Email:</label>
        <input id="mail" type="email" name="email" required></br></br>
        <label>Password:<label>
        <input id="password" type="password" name="password" ></br></br>
        <button type="submit">Log in</button>
        <p>didn't have an account? <a href='/signup'>signup</a></p>
      </form>
    `);
}
function SignUp() {
  return layout(`
       <form  method='post'>
          <label>Name:<label>
          <input type='text' id='name' name='name' required/>
          <label>Phone Number:<label>
          <input type='tel' id='phone' name='phone'/>
          <label>Email:</label>
          <input id="umail" type="email" name="email" required>
          <label>Password:</label>
          <input type='password' id='pass' name='password' required/>
          <label>Gender:</label>
          <label>Male</label>
          <input type='radio' id='male' value='Male' name='gender'/>
          <label>Female</label>
          <input type='radio' id='female' value='Female' name='gender'/>
          <label>Birthdate:</label>
          <input type='date' id='date' name='birthdate' /></br></br>
          <input type='submit' id='submit' value='submit' />
       </form>
  `);
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
function allPosts(reviewers) {

  return layout(/*html */ `
    <h1>All posts</h1>
    <ul>
      ${reviewers
      .map(
        (review) => `
          <li>
            <a href="/allreviews/${review.title}">${review.title}</a>
            <a href="/delete/${review.id}" aria-label="Delete post titled ${review.title}">🗑</a>
          </li>
        `
      )
      .join("")}
    </ul>
  `);
}

function post(post) {
  return layout(/*html */ `
    <h1>${post.title}</h1>
    <main>${post.content}</main>
  `);
}
function hotelDetails(data) {
  return layout(/*html */ `
         ${data}
  `);
}

function error(message) {

  return layout(/*html*/ `
      <h1>${message}<a href="/">login</a></h1>
    
    `);
}
module.exports = { hotels, error, SignUp, logIn, newPost, post, allPosts, hotelDetails };