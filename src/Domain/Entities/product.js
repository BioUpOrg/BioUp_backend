class Product {
    constructor({ name, description , price,img,quantity,id,rating,categorie,user}) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.img = img;
      this.quantity = quantity;
      this.id = id;
      this.rating = rating;
      this.categorie = categorie;
      this.user = user;
    }
  }
  
  module.exports = Product;
  