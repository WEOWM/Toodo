import React, { useState } from 'react'
import Header from './component/header/Header';

const Todo = () => {
    const [store, setStore] = useState([]);
    const [newstore, setNewstore] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
  
    // Add store
    const handleAddstore = () => {
      if (newstore.trim() && !store.includes(newstore.trim())) {
        setStore((prevstore) => [...prevstore, newstore.trim()]);
        setNewstore("");
      }
    };
  
    // Delete store
    const handleDelete = (index) => {
      setStore((prevstore) => prevstore.filter((_, idx) => idx !== index));
    };
  
    // Edit store
    const handleEdit = (index) => {
      setEditIndex(index);
      setEditValue(store[index]);
    };
  
    // Save edit
    const handleSaveEdit = () => {
      setStore((prevstore) =>
        prevstore.map((item, idx) => (idx === editIndex ? editValue.trim() : item))
      );
      setEditIndex(null);
      setEditValue("");
    };
  
    return (
     <>
     
     <Header/>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full lg:w-[30%] h-auto shadow-lg bg-white p-6 rounded-lg">
          <h1 className="text-center text-2xl font-semibold text-blue-700 mb-4">
            My List Manager
          </h1>
          {/* Input Section */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              value={newstore}
              onChange={(e) => setNewstore(e.target.value)}
              type="text"
              placeholder="Add a new item"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddstore}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
  
          {/* List Section */}
          <div className={`space-y-3 ${store.length < 5 ? "h-auto" : "h-72"} overflow-y-auto`}>
            {store.length === 0 ? (
              <p className="text-center text-gray-500 italic">
                Please add items to your list.
              </p>
            ) : (
              store.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md shadow-sm"
                >
                  {editIndex === idx ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      type="text"
                      className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  ) : (
                    <p className="text-gray-800">{item}</p>
                  )}
                  <div className="flex items-center space-x-2">
                    {editIndex === idx ? (
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(idx)}
                        className="px-3 py-1 bg-yellow-400 text-white font-medium rounded-md hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(idx)}
                      className="px-3 py-1 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div></>
    );
  };


export default Todo
