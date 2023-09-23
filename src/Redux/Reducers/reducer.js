
const INIT_STATE = localStorage.getItem("WAREHOUSE")
  ? JSON.parse(localStorage.getItem("WAREHOUSE"))
  : [];

export const Reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      const data = action.payload;
      localStorage.setItem("WAREHOUSE", JSON.stringify([...state, ...data]));
      return [...state, ...data];

    case 'EDIT_WAREHOUSE':
      const { id, updatedData } = action.payload;
      const updatedWarehouses = state.map((warehouse) => {
        if (warehouse.id === id) {
          // Merge the updated data with the existing warehouse
          return {
            ...warehouse,
            ...updatedData,
          };
        }
        return warehouse;
      });
      localStorage.setItem("WAREHOUSE", JSON.stringify(updatedWarehouses));
      return updatedWarehouses; // Return the updated state

    default:
      return state;
  }
};
