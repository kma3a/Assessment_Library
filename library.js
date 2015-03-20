var sget = require('sget');

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

Library.prototype.viewAllBooks = function() {
	console.log("The Books in this Library:");
	this.viewBookList(this.bookInventory);
}

Library.prototype.getByGenre = function(searchGenre) {
	var genreList = [];
	this.bookInventory.forEach(function(book) {
		if (book.genre === searchGenre) {
			genreList.push(book);
		}
	});
	this.viewBookList(genreList);
	return genreList;
}

Library.prototype.searchBytitle = function(searchTitle) {
	var titleList = [];
	this.bookInventory.forEach(function(book) {
		if (book.title === searchTitle) {
			titleList.push(book);
		}
	});
	this.viewBookList(titleList);
	return titleList;
}

Library.prototype.searchByAuthor = function(searchAuthor) {
	var authorList = [];
	this.bookInventory.forEach(function(book) {
		if (book.author === searchAuthor) {
			authorList.push(book);
		}
	});
	this.viewBookList(authorList);
	return authorList;
}

Library.prototype.viewBookList = function(bookArray) {
	bookArray.forEach(function(book, index) {
		console.log((index+1) + ". " + book.shortViewBook());
	});
}

var navagation = {
	inventory: new Library(),
	getInput: function(message) {
		return sget(message).trim().toUpperCase();
	},
	createBook: function() {
		var title = this.checkInputString("What is the title of the book?");
		var author = this.checkInputString("what is the author of the book?");
		var genre = this.checkInputString("what is the genre of the book?");
		var length = this.checkInputNumber("what is the length of the book?");
		return new Book(title, author, genre, length);
	},
	checkInputString: function(message) {
		var userInput = this.getInput(message)
		if (isNaN(userInput) && userInput !== ""){
			return userInput;
		} else {
			return this.checkInputString(message);
		}
	},
	checkInputNumber: function(message) {
		var userInput = this.getInput(message)
		if (!isNaN(userInput) && userInput !== ""){
			return userInput;
		} else {
			return this.checkInputNumber(message);
		}
	},
	menu: {
		"1": function() {
			var newBook = navagation.createBook();
			navagation.inventory.addBook(newBook);
			console.log("you have added " + newBook.shortViewBook());
		},
		"2": function() {
			navagation.inventory.viewAllBooks();
		},
		"3": function() {
			var genre = navagation.checkInputString("What genre book are you searching for?");;
			var genreList = navagation.inventory.getByGenre(genre);
		}
	}
}


//var myLibrary = new Library;
//var hello = new Book("Hitchhiker's Guide to The Galaxy", "Douglas Adams", "Science Fiction", 42);
//var anotherBook = new Book("Ella Enchanted", "Some Author", "Fantasy", 30);
//myLibrary.addBook(hello);
//myLibrary.addBook(anotherBook);
//console.log(myLibrary.bookInventory.length === 2);
//myLibrary.removeBook(anotherBook);
//console.log(myLibrary.bookInventory.length === 1);
//console.log(anotherBook.displayBook());
//console.log(anotherBook.shortViewBook());
//myLibrary.viewAllBooks();
//console.log(myLibrary.getByGenre("Science Fiction").length === 1);
//console.log(myLibrary.searchBytitle("Hitchhiker's Guide to The Galaxy").length === 1);
//console.log( "Hello" + myLibrary.searchBytitle("Something Else"));
//console.log(myLibrary.searchByAuthor("Douglas Adams").length === 1);
//navagation.inventory.viewAllBooks();
navagation.menu["3"]();
