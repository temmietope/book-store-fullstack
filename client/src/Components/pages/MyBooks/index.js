import React, { useContext, useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { withRouter } from "react-router-dom";
import BookContext from "../../../Context/book/bookContext";
import AuthContext from "../../../Context/auth/authContext";
import BookForm from "../../../Context/book/BookForm";
import MyBooksList from "./MyBooksList";
import Spinner from "../../layouts/Spinner";
import "./MyBooks.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MyBooks = () => {
  const bookContext = useContext(BookContext);
  const authContext = useContext(AuthContext);
  const { books, filtered, getBooks, loading } = bookContext;
  const { isAuthenticated, user } = authContext;

  useEffect(() => {
    if (isAuthenticated && user) {
      getBooks(user._id);
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };
  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const renderNoBooks = () => {
    return (
      <div>
        You have not uploaded any book yet. Get started! The world needs to read
        yours!
      </div>
    );
  };
  return (
    <div className="my-book-wrapper">
      <div className="my-book">
        <div className="book-form">
          <Modal className="modal" isOpen={addModalIsOpen}>
            <BookForm onRequestClose={closeAddModal} />
          </Modal>
        </div>
        <div><button onClick={openAddModal}>Edit</button></div>
        {loading ? (
          <Spinner />
        ) : books !== null && books.length === 0 ? (
          renderNoBooks()
        ) : books !== null && !loading ? (
          <TransitionGroup>
            {filtered !== null ? (
              <MyBooksList books={filtered} />
            ) : (
              <MyBooksList books={books} />
            )}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
export default withRouter(MyBooks);
