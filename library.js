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

Library.prototype.searchByTitle = function(searchTitle) {
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
	bookOptions: {
		"1": function(currentBook) {
			currentBook.changeCheckedIn();
		},
		"2": function(currentBook) {
			navagation.inventory.removeBook(currentBook);
		},
		"3": function() {
			navagation.startNavagation();
		}
	},
	bookMenu:function(currentBook) {
		console.log(currentBook.displayBook());
		console.log("1- check-out or check-in book\n2- remove book\n3- return to menu");
		var userInputNumber = this.checkInputNumber("What would you like to do?");
		if (this.bookOptions[userInputNumber]){
			this.bookOptions[userInputNumber](currentBook);
			this.startNavagation();
		} else { 
			return this.bookMenu();
		}
	},
	chooseBook: function(list) {
		var userInput = this.getInput("Choose a book by number or menu will go back to the menu.");
		if (!isNaN(userInput) && list[userInput-1] !== undefined) {
			return this.bookMenu(list[userInput-1]);
		} else if (userInput === "MENU") {
			return this.startNavagation();
		} else {
			return this.chooseBook(list)
		}
	},
	checkList: function(list) {
		if (list.length !== 0) {
			return this.chooseBook(list);
		} else {
			return console.log("There is nothing in the library for your search");
		}
	},
	menu: {
		"1": function() {
			var newBook = navagation.createBook();
			navagation.inventory.addBook(newBook);
			console.log("you have added " + newBook.shortViewBook());
			navagation.startNavagation();
		},
		"2": function() {
			navagation.inventory.viewAllBooks();
			navagation.startNavagation();
		},
		"3": function() {
			var genre = navagation.checkInputString("What genre book are you searching for?");;
			var list = navagation.inventory.getByGenre(genre);
			navagation.checkList(list);
		},
		"4": function() {
			var title  = navagation.checkInputString("What title of the  book are you searching for?");
			var list = navagation.inventory.searchByTitle(title);
			navagation.checkList(list);
	
		},
		"5": function() {
			var author  = navagation.checkInputString("What author of the book are you searching for?");
			var list = navagation.inventory.searchByAuthor(author);
			navagation.checkList(list);		}
	},
	startNavagation: function() {
		console.log("1- create and add Book\n2- view all books\n3- view by genre\n4- search by title\n5-search by author\nexit- exit the program");
		var getInput = this.getInput("What would you like to do?");
		if (this.menu[getInput]){
			this.menu[getInput]();
		} else if (getInput === 'EXIT') {
			console.log("Have a nice day!");
		} else {
			this.startNavagation();
		}
	}
}


//var myLibrary = new Library;
var hello = new Book("Hitchhiker's Guide to The Galaxy", "Douglas Adams", "Science Fiction", 42);
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
//navagation.menu["5"]()
navagation.startNavagation();
