// HomePage.jsx - Displays a list of all available books
// This component fetches and renders all books from the backend, providing a clickable card for each book.
import React, { useEffect, useState } from 'react'
import { getAllBooks } from '../api/books';
import { Link } from 'react-router-dom';


export default function HomePage() {
  // State to store the list of all books fetched from the backend
  const [allBooks, setAllBooks] = useState([]);

  // Function to fetch all books from the API
  async function loadBooks() {
    const books = await getAllBooks();
    console.log(books);
    setAllBooks(books.data)
  }

  // useEffect hook to load books when the component mounts
  useEffect(() => {
    loadBooks();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Main container for the home page content
    <main className="container mx-auto px-4 py-8">
      {/* Section to display books in a responsive grid layout */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map through the allBooks array to render each book as a clickable card */}
        {allBooks.map((book) => (
          <div key={book._id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
            {/* Link to the individual book details page */}
            <Link to={`/book/${book._id}`} className="block">
              {/* Book cover image */}
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
                className="w-full h-72 object-cover"
              />
              {/* Book details section */}
              <div className="p-4">
                {/* Book title with an icon */}
                <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate flex items-center">
                  <i className="fas fa-book-open mr-2 text-blue-500"></i>{book.title}
                </h3>
                {/* Book author with an icon */}
                <p className="text-gray-600 text-sm flex items-center">
                  <i className="fas fa-user mr-2 text-gray-500"></i>{book.author}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
