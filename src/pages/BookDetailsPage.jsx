// BookDetailsPage.jsx - Displays detailed information about a single book
// This component fetches book data by ID and presents it, along with a button to borrow the book.
import { useParams } from "react-router-dom";
import { getBookById } from '../api/books';
import { useEffect, useState } from "react";
import BorrowBtn from '../components/buttons/borrowBtn';

export default function BookDetailsPage() {
  // useParams hook to extract the dynamic book ID from the URL
  const { id } = useParams();
  // State to store the fetched book data; initialized to null until data is loaded
  const [book, setBook] = useState(null);

  // Asynchronous function to fetch book details by its ID
  async function fetchBook(bookId) {
    try {
      const response = await getBookById(bookId);
      setBook(response.data); // Update state with fetched book data
    } catch (err) {
      console.error("Failed to fetch book:", err); // Log any errors during fetching
    }
  }

  // useEffect hook to call fetchBook when the component mounts or the ID changes
  useEffect(() => {
    fetchBook(id);
  }, [id]); // Dependency array includes 'id' to refetch if the book ID changes

  // Display a message if the book data is not yet loaded or not found
  if (!book) return <p className="text-center text-gray-500 text-xl py-10">Book not found</p>;

  return (
    // Main container for the book details page with responsive padding and minimum height
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      {/* Card-like container for book details, with shadow, rounded corners, and responsive flex layout */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden md:flex flex-col md:flex-row">
        {/* Book cover image section */}
        <div className="md:flex-shrink-0 md:w-1/3 lg:w-1/4 p-4 flex justify-center items-center bg-gray-100 dark:bg-gray-700">
          <img
            className="w-full h-auto object-contain max-h-96 rounded-lg shadow-md" // Styling for the book cover image
            src={book.image}
            alt={`Cover of ${book.title}`}
          />
        </div>
        {/* Book information section */}
        <div className="p-6 flex flex-col justify-between md:w-2/3 lg:w-3/4">
          <div>
            {/* Book title */}
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
              {book.title}
            </h1>
            {/* Author information with icon */}
            <p className="text-gray-700 dark:text-gray-300 text-xl mb-3 flex items-center">
              <i className="fas fa-user mr-3 text-gray-600 dark:text-gray-400"></i><span className="font-semibold">Author:- </span > {book.author}
            </p>
            {/* Category information with icon */}
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-3 flex items-center">
              <i className="fas fa-th-list mr-3 text-gray-600 dark:text-gray-400"></i><span className="font-semibold">Category: </span> {book.category}
            </p>
            
            {/* Available Copies information with icon */}
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 flex items-center">
              <i className="fas fa-copy mr-3 text-green-600 dark:text-green-400"></i><span className="font-semibold">Available Copies: </span>  {book.availableCopies}
            </p>
           
          </div>
          {/* Borrow Button section */}
          <div className="mt-6">
            <BorrowBtn bookId={book._id} /> {/* Borrow button component */}
          </div>
        </div>
      </div>
    </div>
  );
}
