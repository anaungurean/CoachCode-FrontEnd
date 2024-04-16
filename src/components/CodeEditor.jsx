import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(language, theme, value); // transmite și limbajul și tema
  };

  // Efect pentru a afișa tema în consolă la fiecare schimbare
  useEffect(() => {
    console.log("Tema selectată în CodeEditorWindow:", theme);
  }, [theme]);

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
  height="85vh"
  width={`100%`}
  language={language || "javascript"}
  value={value}
  theme={theme || "vs-dark"}
  defaultValue="// some comment"
  onChange={handleEditorChange}
  beforeMount={() => {
    console.log("Tema selectată în Editor:", theme);
  }}
/>

    </div>
  );
};

export default CodeEditorWindow;
