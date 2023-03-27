import React from "react";

class MyDictionary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: this.props.word===undefined?"":this.props.word,
      definition: "",
      partOfSpeech: ""
    };
   this.handleClick = this.handleClick.bind(this);
   this.handleChange = this.handleChange.bind(this);
  }

  // after the component get mounted (fetch data so the definition field get updated
  componentDidMount() {
    this.doFetch();
  }

  // this is so that the word is continuously updated as it is typed
  handleChange(event) {
    this.setState({ word: event.target.value });
  };

  handleClick() {
    this.doFetch();
  }


  doFetch() {   
    if (this.state.word===undefined || this.state.word==="") return;
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + this.state.word)
      .then((res) => res.json())
      .then((response) => {

        if (response.status!==404) {
        this.setState({
          audio: response[0].phonetics[0].audio[0],
          partOfSpeech: response[0].meanings[0].partOfSpeech, 
          definition: response[0].meanings[0].definitions[0].definition
        })
        }
      })
     	.catch(err=> { 

        this.setState({
          definition: "Sorry, word not found",
          partOfSpeech: "",
          audio: ""
        })
      })

  }

  render() {
    return (
      <>
        Enter a word: <input type="text" value={this.state.word}  onChange={(event) => this.handleChange(event)} />
        <button onClick={(e) => this.handleClick()}>Lookup</button>
        <p />
        <i>{this.state.partOfSpeech}</i> {this.state.definition}
      </>
    );
  }
}

export default MyDictionary;

