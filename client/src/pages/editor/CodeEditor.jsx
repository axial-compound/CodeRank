import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import "./CodeEditor.css"; // Import the CSS file for styling

const CodeEditor = () => {
  const [editors, setEditors] = useState([
    { id: 1, value: "", language: "javascript" },
  ]);
  const [selectedEditorId, setSelectedEditorId] = useState(1); // Initially select the first editor by its id

  const addEditor = () => {
    const newId = editors.length + 1;
    const newEditor = { id: newId, value: "", language: "javascript" };
    setEditors([...editors, newEditor]);
    setSelectedEditorId(newId); // Set the newly added editor as selected
  };

  const handleEditorChange = (id, value) => {
    const updatedEditors = editors.map((editor) =>
      editor.id === id ? { ...editor, value: value } : editor
    );
    setEditors(updatedEditors);
  };

  const handleEditorSelect = (id) => {
    setSelectedEditorId(id); // Update the selected editor id
  };

  const handleDeleteEditor = (id) => {
    // Filter out the editor with the given id
    const updatedEditors = editors.filter((editor) => editor.id !== id);
    setEditors(updatedEditors);
    // If the deleted editor was the selected one, select the first editor in the list
    if (selectedEditorId === id) {
      setSelectedEditorId(
        updatedEditors.length > 0 ? updatedEditors[0].id : null
      );
    }
  };

  return (
    <div className="code-editor-page">
      <div className="navbar">
        <div className="user-info">User Name</div>
        <button className="logout-button">Logout</button>
      </div>
      <div className="main-content">
        <div className="left-partition">
          <h2>Open Editors</h2>
          <button onClick={addEditor}>Add Editor</button>
          <ul>
            {editors.map((editor) => (
              <li
                key={editor.id}
                onClick={() => handleEditorSelect(editor.id)}
                className={
                  editor.id === selectedEditorId ? "selected-editor" : ""
                }
              >
                Editor {editor.id}
                <button onClick={() => handleDeleteEditor(editor.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-partition">
          <nav>
            <div className="nav-left">
              <ul>
                {editors.map((editor) => (
                  <li
                    key={editor.id}
                    onClick={() => handleEditorSelect(editor.id)}
                    className={`opened-editor ${
                      editor.id === selectedEditorId ? "selected-editor" : ""
                    }`} // Apply conditional class
                  >
                    Editor {editor.id}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-right">
              <button>Run</button>
              <button>Submit</button>
            </div>
          </nav>
          <div className="selected-editor">
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="calc(100vh - 130px)"
              theme="vs-dark"
              language={
                editors.find((editor) => editor.id === selectedEditorId)
                  ?.language || "javascript"
              }
              value={
                editors.find((editor) => editor.id === selectedEditorId)
                  ?.value || ""
              }
              onChange={(value) => handleEditorChange(selectedEditorId, value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
