import  { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  
  const supportiveMessages = [
  "You`ve got this!",
  "Believe in yourself, you can do it!",
  "You`re doing great!",
  "Keep going, you`re making progress!",
  "You`re stronger than you think!",
  "Don`t give up, you`re almost there!",
  "Every mistake is a step forward!",
  "Embrace the challenge, you`ll emerge stronger!",
  "Success is just around the corner!",
  "Your efforts will pay off, keep pushing!",
  "The only way to fail is to give up!",
  "Each line of code is a victory!",
  "You`re on the right track, keep going!",
  "Small progress is still progress!",
  "One step at a time, you`ll get there!",
  "Your determination will lead to success!",
  "You`re capable of amazing things!",
  "Challenges make you stronger!",
  "Stay focused and keep coding!",
  "Celebrate every milestone, no matter how small!",
  "You`re learning and growing with every challenge!",
  "You`re not alone in this journey, keep going!",
  "You`re making a difference with every line of code!",
  "Your dedication is inspiring!",
  "The road to success is paved with perseverance!",
  "You`re doing something incredible, don`t give up now!",
  "You`re turning dreams into reality, keep coding!"

  ];

  const getRandomSupportiveMessage = () => {
    return supportiveMessages[Math.floor(Math.random() * supportiveMessages.length)];
  };

  const defaultValue = `//${getRandomSupportiveMessage()} 🚀\n\n${code || ""} `;

  useEffect(() => {
    setValue(code || "");
  }, [code]);

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="60vh"
        width="100%"
        language={language ? language.value : "python"}
        value={value}
        theme={theme ? theme : "vs-dark"}
        defaultValue={defaultValue}
        onChange={handleEditorChange}
      />
    </div>
  );
};

CodeEditorWindow.propTypes = {
  onChange: PropTypes.func.isRequired,
  language: PropTypes.object,
  code: PropTypes.string,
  theme: PropTypes.string,
};

export default CodeEditorWindow;