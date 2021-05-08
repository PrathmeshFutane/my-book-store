// Book Class : Represent a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author; 
        this.isbn = isbn;
    }
}

// UI Class :handle UI Tasks
class UI{
    static displayBooks(){
        

        const books = Store.getBooks();
        books.forEach((book,index) =>{UI.addBookToList(book,index)})
    }

    static addBookToList(book,index){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index+1}</td>
            <td>${book.title}</td>
            <td>${book['author']}</td>
            <td>${book['isbn']}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            
            el.parentElement.parentElement.remove();

        }
    }

    
}
// Store Class: Handles Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')==null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        setInterval(() => {
            location.reload();
        }, 2000);
        
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index)=>{
            if(book.isbn==isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
        setInterval(() => {
            location.reload();
        }, 2000);
    }
}

// Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a Book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    //prevent natural submit event
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //validation
    if(title===""|| author===""||isbn===""){
        swal("You have to enter something", "fill all fields", "error");
    }
    else{
        //Instantiate book class
    const book = new Book(title, author, isbn)

    console.log(book)

    //add book to ui
    //UI.addBookToList(book);

    //add book to store
    Store.addBook(book)
    //success message
    swal("Book added successfully", "Enjoy Reading", "success");
    //clear html fields
    clearFields();

    }
    
})
// Event : Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    console.log(e.target)
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this book!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Your book has been deleted!", {
            icon: "success",
          });
          //UI.deleteBook(e.target)
          //console.log(e.target.parentElement.previousElementSibling.textContent)
          Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
        
        } else {
          swal("Your book is safe!");
        }
      });
})


//clear html fields
function clearFields(){
    document.getElementById('title').value="";
    document.getElementById('author').value="";
    document.getElementById('isbn').value="";
    console.log('book')
}