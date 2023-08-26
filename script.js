// script.js
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const bookList = document.querySelector(".book-list");
    const bookDetails = document.querySelector(".book-details");
  
    let books = [];
  
    const fetchData = async (query) => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const data = await response.json();
        books = data.items || [];
        displayBooks();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const displayBooks = () => {
      bookList.innerHTML = "";
      books.forEach((book, index) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
          <img src="${book.volumeInfo.imageLinks?.thumbnail}" alt="${book.volumeInfo.title}">
          <h3>${book.volumeInfo.title}</h3>
        `;
        bookDiv.addEventListener("click", () => displayBookDetails(book));
        bookList.appendChild(bookDiv);
      });
    };
  
    const displayBookDetails = (book) => {
      bookDetails.innerHTML = `
        <h2>${book.volumeInfo.title}</h2>
        <p>${book.volumeInfo.description || "No description available."}</p>
        <a href="${book.volumeInfo.previewLink}" target="_blank" rel="noopener noreferrer">Read Now</a>
        <a href="${book.volumeInfo.infoLink}" target="_blank" rel="noopener noreferrer">More Info</a>
      `;
    };
  
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        fetchData(query);
      }
    });
  
    fetchData("harry potter");
  });
  