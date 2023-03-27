import React, {useState, useEffect} from "react";

function MyDictionaryHook (props) {

  const [word, setWord] = useState(props.word===undefined?"":props.word);
  const [definition, setDefinition] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");

  useEffect(() => {
	doFetch();
  }, []);  // <-- this [] is there so it is only called initially


  // this is so that the word is continuously updated as it is typed
  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const handleClick = () => {
    doFetch();
  }


  const doFetch = () => {   
    if (word===undefined || word==="") return;
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then((res) => res.json())
      .then((response) => {

        if (response.status!==404) {
        setPartOfSpeech(response[0].meanings[0].partOfSpeech);
        setDefinition(response[0].meanings[0].definitions[0].definition);
        }
      })
      .catch(err=> { 
        setDefinition("Sorry, word not found");
        setPartOfSpeech("");
      })
  }

    return (
      <>
        Enter a word: <input type="text" value={word}  onChange={(event) => handleChange(event)} />
        <button onClick={(e) => handleClick()}>Lookup</button>
        <p />
        <i>{partOfSpeech}</i> {definition}
      </>
    );
}

export default MyDictionaryHook;

