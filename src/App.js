import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import NotesList from './components/NotesList';
import { SortbyNewestFirst, SortbyOldestFirst } from './components/sorting';
import Search from './components/Search';

const App = () => {
  
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'This is first',
      date: '12/04/2022',
    },
    {
      id: nanoid(),
      text: 'This is second',
      date: '12/04/2022',
    },
    {
      id: nanoid(),
      text: 'This is third',
      date: '12/04/2022',
    },
    {
      id: nanoid(),
      text: 'This is fourth',
      date: '12/04/2022',
    },
  ]);

  const [SortingValue, setSortingValue] = useState("default");  
  const handleSorting = (e) => {
    setSortingValue(e.target.value);
  };

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify(notes)
    );
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  // Filter and sort notes based on search and sorting value
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedNotes = () => {
    switch (SortingValue) {
      case "newestFirst":
        return SortbyNewestFirst(filteredNotes);
      case "oldestFirst":
        return SortbyOldestFirst(filteredNotes);
      default:
        return filteredNotes;
    }
  };

  return (
    <div className="container">
      <h1>Notes</h1>
      <Search handleSearchNote={setSearchText} />
      <select onChange={handleSorting} style={{ width: "130px", height: "50px" }}>
        <option value="default">Default</option>
        <option value="newestFirst">Newest First</option>
        <option value="oldestFirst">Oldest First</option>
      </select>
      <NotesList
        notes={sortedNotes()}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
    </div>
  );
};

export default App;
