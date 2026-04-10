// Standart & types
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

// HTTP & Services
import { getNotes } from "../../services/noteServices";

// Style
import css from "./App.module.css";

// Components
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useDebouncedCallback(setSearchQuery, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => getNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox onSearch={handleSearch} />}
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        {
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        }
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList items={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {<NoteForm onClose={() => setIsModalOpen(false)} />}
        </Modal>
      )}
    </div>
  );
}
