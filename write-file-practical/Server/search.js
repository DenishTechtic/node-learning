// Function to search for users by name
const data = [
    { id: 1, name: "Denish", age: 29 },
    { id: 2, name: "Rushi", age: 23 },
    { id: 3, name: "John", age: 18 },
  ];

const searchUsers = async (query) => {
    try {
      const results = await new Promise((resolve) => {
        // Simulate an asynchronous API call
        setTimeout(() => {
          const filteredUsers = data.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
          );
          resolve(filteredUsers);
        }, 1000); // Simulating a delay of 1 second
      });
  
      return results;
    } catch (error) {
      throw new Error('Failed to search for users');
    }
  };

  module.exports = searchUsers;
