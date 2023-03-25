BEGIN;

DROP TABLE IF EXISTS users, paycard, hotelsinfo,reviews CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  birthdate VARCHAR(12),
  phone VARCHAR(11),
  gender VARCHAR(6)

);


CREATE TABLE paycard(
    pay_id SERIAL PRIMARY KEY,

    name_on_card VARCHAR(255) NOT NULL,
    card_number VARCHAR(255) NOT NULL,
    cvv VARCHAR(255) NOT NULL,
    expiration_date VARCHAR(255) NOT NULL
);
 CREATE TABLE hotelsinfo(
  hotel_id SERIAL PRIMARY KEY,

   hotel_name VARCHAR(255),
   image VARCHAR(255),
   review VARCHAR(255),
   score VARCHAR(255),
   city VARCHAR (255),
   description TEXT
 );
 CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    user_id integer references users(id),
    title VARCHAR(20),
    content TEXT,
    date timestamp
 );
 
 INSERT INTO hotelsinfo(hotel_name, image, review, score, city, description) VALUES ('Cherry Hotel','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/d3/9d/b1/cherry-hotel.jpg?w=700&h=-1&s=1','Very Good','8.4','Ngu Hanh Son','a business hotel belonging to the Cherry Group, which is located at 92 Ngo Thi Nham, Hai Ba Trung, Hanoi, Vietnam.');
 INSERT INTO hotelsinfo(hotel_name, image, review, score, city, description) VALUES ('Lagun Palas','https://cf.bstatic.com/xdata/images/hotel/max1024x768/314060736.jpg?k=e82406ed7e9cfca4ce9bcfb5634250feeefebac77c0ec2956d0c46b9bb7caf91&o=&hp=1', 'Wonderful','9.3','Yalova','Located in Altınova and with Yuruyen Kosk reachable within 19.3 km, Lagun Palas has express check-in and check-out, non-smoking rooms, a shared lounge, free WiFi throughout the property and a garden. Featuring family rooms, this property also provides guests with a terrace. The property provides a 24-hour front desk, room service and currency exchange for guests.');
 INSERT INTO hotelsinfo(hotel_name, image, review, score, city, description) VALUES ('Phi Hotel Astoria','https://cf.bstatic.com/xdata/images/hotel/max1024x768/80580386.jpg?k=855d80df10d1f0152aec81a6c41e47a25f4f7c0907ff874c5242ff6f61ac82b0&o=&hp=1','Excellent','8.8','Susegana','The 4-star Phi Hotel Astoriais set in a 19th-century building located in Susegana, overlooking the surrounding hills. Surrounded by a large garden, it offers free parking and free Wi-Fi.');
 INSERT INTO hotelsinfo(hotel_name, image, review, score, city, description) VALUES ('Pousada Praia dos Corais','https://cf.bstatic.com/xdata/images/hotel/max1024x768/303161387.jpg?k=2ae7cba9092bb168a7d67f4ae4b3a1b4542c830dd3859bfcc8c5577bc6b0e094&o=&hp=1','Very Good','8.0','Rua Eugenio Costa','Located directly in front of Praia de Costa Brava Beach, Pousada Praia dos Corais offers a sun deck with a swimming pool and free Wi-Fi. The natural pools of Paripueira are just 100 m away.');
 INSERT INTO hotelsinfo(hotel_name, image, review, score, city, description) VALUES ('涵琦客栈 Han Qi','https://cf.bstatic.com/xdata/images/hotel/max1024x768/255741152.jpg?k=7b1a7822eec02164c12f92d6ef04117f4a1d05f382f317b7a1b2b3d79a9820cd&o=&hp=1','Exceptional','9.5','Dali, China','Located in Dali, a 18-minute walk from Erhai Gate, 涵琦客栈 Han Qi has accommodations with a restaurant, free private parking, a bar and a shared lounge.');
 INSERT INTO hotelsinfo(hotel_name, image, review, score, city, description) VALUES ('Dan Hotels','https://cf.bstatic.com/xdata/images/hotel/max1024x768/243065638.jpg?k=9bf8bccfeed32a5c9e8c067b6088c8398766a48fa7de87b4f1fbc453509025af&o=&hp=1','Good','7.5','Haifa','Set on the green slopes of Mount Carmel, this Meribelle Plaza offers panoramic views of Haifa and the Bay. All rooms come with air conditioning, free Wi-Fi, and an LCD TV. Free tours of the Bahai Gardens are provided.');
 INSERT INTO hotelsinfo(hotel_name, image, review, score, city, description) VALUES ('Hôtel Gérando','https://cf.bstatic.com/xdata/images/hotel/max1024x768/326221317.jpg?k=d87490dc6cb1170be46cabb52d2a3abb4f305dbad0afd1812c601a275cabc030&o=&hp=1','Very Good','8.2','Paris, France','Hotel Gérando is located in the Montmartre area in Paris. The hotel features a 24-hour reception, a luggage storage and free WiFi.');
 INSERT INTO hotelsinfo(hotel_name, image, review, score, city, description) VALUES ('Nefertiti Hotel Luxor','https://cf.bstatic.com/xdata/images/hotel/max1024x768/284968621.jpg?k=3f437881e747c3202735412d0beeb14baeb0356e7a954bb4100bd21b5e29b103&o=&hp=1','Excellent','8.6','Al-Sahaby Lan, egypt','A variety of drinks and Egyptian dishes are served on the rooftop terrace. Guests can also smoke a traditional Egyptian water pipe.The hotel is only a 20 minute drive from Luxor International Airport.');
 INSERT INTO hotelsinfo(hotel_name, image, review, score, city, description) VALUES ('Hotel Al Bustan', 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/93109540.jpg?k=87fcea35d928c9edbe62ad01eba18dbdb7479f8b7014b28e6e0e977ade1ee2cd&o=&hp=1','Good','7.7','Beit Meri,Lebanon','Hotel Al Bustan has several dining options, including an Italian trattoria and a stylish à la carte restaurant, Les Glycines. There is a wine cellar, a Scottish bar, a piano lounge and a candle-lit summer terrace.');




COMMIT;