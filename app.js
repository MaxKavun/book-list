// Application v. 1.0b
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td class="delete"><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
}

UI.prototype.deleteBookFromList = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.showAlert = function(message, eventClass) {
  const div = document.createElement('div');
  div.className = `alert ${eventClass}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);
}

UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  const book = new Book(title, author, isbn); 

  const ui = new UI();

  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);
    ui.clearFields();
    ui.showAlert('Book successful added', 'success');
  }

  e.preventDefault();
});
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();
  ui.showAlert('Book removed', 'success');
  console.log(e);
  ui.deleteBookFromList(e.target);
});