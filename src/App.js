import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState({});
  const [inputText, setInputText] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const buildData = () => {
    console.log("build data");
    console.log(inputText.length);
    let newData = {};
    if (inputText.length > 0) {
      newData = {
        "[": { [inputText[0]]: 1 },
      };
    }
    for (let x = 0; x < inputText.length; x++) {
      if (x === inputText.length - 1) {
        newData[inputText[x]] = { ["]"]: 1 };
      } else {
        if (newData[inputText[x]]) {
          if (newData[inputText[x]].hasOwnProperty(inputText[x + 1])) {
            newData[inputText[x]][inputText[x + 1]] =
              newData[inputText[x]][inputText[x + 1]] + 1;
          } else {
            newData[inputText[x]][inputText[x + 1]] = 1;
          }
        } else {
          newData[inputText[x]] = { [inputText[x + 1]]: 1 };
        }
      }
    }
    let count = 0;
    for (let startState in newData) {
      count = 0;
      console.log("startstate", startState);
      for (let endState in newData[startState]) {
        count += newData[startState][endState];
        console.log("endstate", endState);
      }
      for (let endState in newData[startState]) {
        newData[startState][endState] = newData[startState][endState] / count;
      }
    }
    console.log(newData);
    setData(newData);
  };
  const generate = () => {
    console.log("generate");
    console.log(data);
    let result = calculateNewState(data["["]);
    for (let x = 0; x < 1000; x++) {
      if (result[result.length - 1] !== "]") {
        result = `${result}${calculateNewState(
          data[result[result.length - 1]]
        )}`;
      }
    }
    setOutputText(result.slice(0, -1));
  };
  const calculateNewState = (probList) => {
    let rand = Math.random();
    let currentProb = 0;
    for (let endState in probList) {
      if (rand < currentProb + probList[endState]) {
        return endState;
      } else {
        currentProb += probList[endState];
      }
    }
    return null;
  };
  return (
    <div className="App">
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          buildData();
        }}
      >
        Submit
      </button>
      <button
        onClick={() => {
          generate();
        }}
      >
        Generate from Data
      </button>
      <div
        style={{
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "500px" }}>{outputText}</div>
      </div>
    </div>
  );
}

export default App;
