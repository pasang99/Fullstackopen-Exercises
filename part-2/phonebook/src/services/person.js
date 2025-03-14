import axios from "axios";

// Define the base URL for the deployed backend
const baseUrl = "https://fullstackopen-exercises-phonebook-server.onrender.com";

// Function to fetch all phonebook entries
const getAll = () => axios.get(baseUrl).then((res) => res.data);

// Function to create a new phonebook entry
const create = (newObject) => axios.post(baseUrl, newObject).then((res) => res.data);

// Function to update an existing phonebook entry
const update = (id, updatedObject) => axios.put(`${baseUrl}/${id}`, updatedObject).then((res) => res.data);

// Function to delete a phonebook entry
const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, update, remove };
