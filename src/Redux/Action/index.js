export const ADD = (item) => {
    return {
        type: "ADD_DATA",
        payload:item
    }
}

export const editWarehouse = (id, updatedData) => {
    return {
      type: "EDIT_WAREHOUSE",
      payload: {
        id,
        updatedData,
      },
    };
  };