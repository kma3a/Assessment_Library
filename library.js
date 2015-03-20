function Book(title, author, genre, length){
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.length = length;
	this.isCheckedIn = true;
}

Book.prototype.changeCheckedIn = function() {
	if( this.isCheckedIn === true) {
		this.isCheckedIn = false;
	} else {
		this.isCheckedIn = true;
	}
}

Book.prototype.shortViewBook = function() {
	return "Title: " + this.title + " Author: " + this.author;
}

Book.prototype.displayBook = function() {
	return "Title: " + this.title + "\nAuthor: " + this.author + "\nGenre: " + this.genre + "\nLength: " + this.length + "\nChecked In: " + this.isCheckedIn;
}

function Library() {
	this.bookInventory = [];
}

Library.prototype.addBook = function(book) {
	this.bookInventory.push(book);
}

Library.prototype.removeBook = function(book) {
	var bookIndex = this.bookInventory.indexOf(book);
	this.bookInventory.splice(bookIndex,1);
}

var myLibrary = new Library;
var hello = new Book("Hitchhiker's Guide to The Galaxy", "Douglas Adams", "Science Fiction", 42);
var anotherBook = new Book("Ella Enchanted", "Some Author", "Fantasy", 30);
myLibrary.addBook(hello);
myLibrary.addBook(anotherBook);
console.log(myLibrary.bookInventory.length === 2);
myLibrary.removeBook(anotherBook);
console.log(myLibrary.bookInventory.length === 1);
console.log(anotherBook.displayBook());
console.log(anotherBook.shortViewBook());

