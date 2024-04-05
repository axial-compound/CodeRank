import { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import "./CodeEditor.css"; // Import the CSS file for styling

const CodeEditor = () => {
  const [editors, setEditors] = useState([
    { id: 1, name: "Editor 1", value: "", language: "javascript" },
  ]);
  const [selectedEditorId, setSelectedEditorId] = useState(1); // Initially select the first editor by its id
  const [selectedNav, setSelectedNav] = useState("editors");
  const [outputValue] = useState("");
  const [newEditorName, setNewEditorName] = useState("");
  const leftPartitionRef = useRef(null);
  const rightPartitionRef = useRef(null);
  const outputBlockRef = useRef(null);

  const addEditor = () => {
    // Calculate the maximum id in the editors array
    const maxId = Math.max(...editors.map(editor => editor.id));
    const newId = maxId + 1;
  
    let editorName = newEditorName || `Editor ${newId}`;
    
    // Create a set of existing editor names
    const existingNames = new Set(editors.map(editor => editor.name));
    
    // If the entered name already exists, append a count until a unique name is found
    let count = 1;
    while (existingNames.has(editorName)) {
      editorName = `${newEditorName || `Editor ${newId}`} ${count}`;
      count++;
    }
  
    const newEditor = { id: newId, name: editorName, value: "", language: "javascript" };
    setEditors([...editors, newEditor]);
    setSelectedEditorId(newId); // Set the newly added editor as selected
    setNewEditorName(""); // Reset the new editor name input field
  };


  const handleChangeEditorName = (e) =>{
    setNewEditorName(e.target.value);
  }
  
  

  const handleEditorChange = (id, value) => {
    const updatedEditors = editors.map((editor) =>
      editor.id === id ? { ...editor, value: value } : editor
    );
    setEditors(updatedEditors);
  };

  const handleEditorSelect = (id) => {
    setSelectedEditorId(id); // Update the selected editor id
  };

  const handleDeleteEditor = (name) => {
    const updatedEditors = editors.filter((editor) => editor.name !== name);
    setEditors(updatedEditors);
    // If the deleted editor was the selected one, select the first editor in the list
    if (selectedEditorId === name) {
      setSelectedEditorId(
        updatedEditors.length > 0 ? updatedEditors[0].id : null
      );
    }
  };

  const handleNavSelect = (nav) => {
    setSelectedNav(nav);
  };

  const handleResize = (e) => {
    const newLeftPartitionWidth = `${(e.clientX / window.innerWidth) * 100}%`;
    const newRightPartitionWidth = `${
      ((window.innerWidth - e.clientX) / window.innerWidth) * 100
    }%`;

    leftPartitionRef.current.style.width = newLeftPartitionWidth;
    rightPartitionRef.current.style.width = newRightPartitionWidth;

    // Add event listeners to handle mouse leaving window bounds or releasing mouse button
    document.addEventListener("mouseleave", stopResize);
    document.addEventListener("mouseup", stopResize);
  };

  const stopResize = () => {
    document.removeEventListener("mouseleave", stopResize);
    document.removeEventListener("mouseup", stopResize);
  };

  return (
    <div className="code-editor-page">
      <div className="navbar">
        <div className="user-info">User Name</div>
        <button className="logout-button">
          Logout&nbsp;&nbsp;<i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
      <div className="main-content">
        <div
          className="left-partition"
          ref={leftPartitionRef}
          onMouseDown={(e) => {
            // Only prevent default behavior if the user clicks on an input field, textarea, or any other type of field
            if (!(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
              e.preventDefault();
              document.addEventListener("mousemove", handleResize);
              document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", handleResize);
              });
            }
          }}
        >
          <div className="nav-vertical">
            <ul>
              <li className={
                        selectedNav === "editors" ? "selected-tab" : ""
                      } onClick={() => handleNavSelect("editors")}>
                <i className="fas fa-file-alt"></i>
              </li>
              <li className={
                        selectedNav === "submissions" ? "selected-tab" : ""
                      } onClick={() => handleNavSelect("submissions")}>
                <i className="fas fa-database"></i>
              </li>
            </ul>
          </div>
          <div className="file-section">
            {selectedNav === "editors" && (
              <>
                <h2>Open Editors</h2>
                <div className="input-text">
                <input
                  type="text"
                  placeholder="Enter editor name"
                  value={newEditorName}
                  onChange={e => handleChangeEditorName(e)}
                />
                <button onClick={addEditor}>
                  <i className="fas fa-plus"></i>
                </button>
                </div>
                
                
                <ul >
                  {editors.map((editor) => (
                    <li
                      key={editor.id}
                      onClick={() => handleEditorSelect(editor.id)}
                      className={
                        editor.id === selectedEditorId ? "selected-editor" : ""
                      }
                    >
                      {editor.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {selectedNav === "submissions" && (
              <>
                <h2>Submissions</h2>
                {/* Render submissions list here */}
              </>
            )}
          </div>
        </div>

        <div className="right-partition" ref={rightPartitionRef}>
          <nav>
            <div className="lang-select">
              <select name="Language" id="language">
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
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
                    {editor.name}&nbsp;&nbsp;
                    <button className="delete-button" onClick={() => handleDeleteEditor(editor.name)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="selected-editor">
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="calc(100vh - 100px)"
              theme="vs-dark"
              language={
                editors.find((editor) => editor.id === selectedEditorId)
                  ?.language || "javascript"
              }
              value={
                editors.find((editor) => editor.id === selectedEditorId)
                  ?.value || ""
              }
              onChange={(value) =>
                handleEditorChange(selectedEditorId, value)
              }
            />
          </div>
        </div>
        <div className="output-block" ref={outputBlockRef}>
          <div className="output-area">
            <p>OUTPUT</p>
            <textarea
              className="output-textarea"
              readOnly
              value={outputValue}
              placeholder="Output will appear here..."
            />
          </div>
          <div className="output-top">
            <button>
              Run&nbsp;&nbsp;<i className="fas fa-sync-alt"></i>
            </button>
            <button>
              Submit&nbsp;&nbsp;<i className="fas fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
