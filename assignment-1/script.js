const sampleData = [
  { name: 'Digital Fortress', author: 'Dan Brown', topic: 'Thriller' },
  { name: 'White Fang', author: 'Jack London', topic: 'Survival' },
  { name: 'Harry Potter', author: 'J.K. Rowling', topic: 'Fantasy' }

];


const bookTable = document.querySelector('#bookTable');
const nameInput = document.querySelector('#name');
const authorInput = document.querySelector('#author');
const topicInput = document.querySelector('#topic');
const searchInput = document.querySelector('#searchInput');
const confirmModal = document.querySelector('#confirmModal');

const addBookToTable = (book) => {
  const row = bookTable.insertRow(-1);
  row.innerHTML = `<td>${book.name}</td><td>${book.author}</td><td>${book.topic}</td>
  <td><button onclick="deleteRow(this)">Delete</button></td>`;
  row.addEventListener('click', () => selectRow(row));
};

const addBook = () => {
  const book = {
      name: nameInput.value,
      author: authorInput.value,
      topic: topicInput.value
  };
  addBookToTable(book);
  
  
  nameInput.value = '';
  authorInput.value = '';
  topicInput.value = '';
};



const searchBook = () => {
  const input = searchInput.value.toLowerCase();
  const rows = bookTable.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      let found = false;

      for (let j = 0; j < cells.length; j++) {
          const cellText = cells[j].textContent || cells[j].innerText;

          if (cellText.toLowerCase().includes(input)) {
            found = true;
            break;
          }
        }
        
        rows[i].style.display = found ? '' : 'none';
      }
    };
    
    const confirmDelete = () => {
      confirmModal.style.display = 'none';
      
      if (selectedRow) {
        selectedRow.parentNode.removeChild(selectedRow);
      }
    };
    
    const closeModal = () => {
      confirmModal.style.display = 'none';
    };

    let selectedRow = null;
    
    const deleteRow = (button) => {
      const row = button.parentNode.parentNode;
  const bookName = row.cells[0].innerText;
  selectedRow = row;
  
  const modalText = confirmModal.querySelector('p');
  modalText.innerText = `Are you sure about delete "${bookName}"?`;
  
  confirmModal.style.display = 'block';
};

const selectRow = (row) => {
  if (selectedRow) {
    selectedRow.classList.remove('selected');
  }
  selectedRow = row;
  selectedRow.classList.add('selected');
};

sampleData.forEach(addBookToTable);

