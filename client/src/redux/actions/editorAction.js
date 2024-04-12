// editorsActions.js
export const addEditor = (editorData) => {
    return {
      type: "ADD_EDITOR",
      payload: editorData,
    };
  };
  
  export const removeEditor = (editorId) => {
    return {
      type: "REMOVE_EDITOR",
      payload: editorId,
    };
  };
  
  export const selectEditor = (editorId) => {
    return {
      type: "SELECT_EDITOR",
      payload: editorId,
    };
  };
  
  export const updateEditor = (updateData) => {
    return {
      type: "UPDATE_EDITOR",
      payload: updateData,
    };
  };
  