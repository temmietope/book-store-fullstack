import React from "react";
import "./Home.css";
import BookFilter from "../../../Context/book/BookFilter";
import AllBooks from "../../books/AllBooks";

const Home = () => {
  return (
    <div className="home">
      <h1>Books</h1>
      <div className="home-wrapper">
        <div className="book-list">
          <span className="filter-region">
            <BookFilter routelink="home" />
            <i className="fas fa-search"></i>
          </span>
          <span className="books-region">
          <AllBooks />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
