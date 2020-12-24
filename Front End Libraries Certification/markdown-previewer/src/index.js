import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

const initialText = `
  # Welcome to my React Markdown Previewer!

  # This is a Heading

  ## This is a sub-heading...
  ### And here's some other cool stuff:

  [Visit my website](https://thomasntinas.herokuapp.com/)

  **This is a bolded text**

  > This is a Block Quote!

  This is an inline code : \`<div></div>\`

  This is a block of code :
  \`\`\`
  var x = 1;
let y = 1;

if (true) {
  var x = 2;
  let y = 2;
}
  \`\`\`
  - And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

  ![freeCodeCamp logo](https://pbs.twimg.com/profile_images/1276770212927410176/qTgTIejk_400x400.jpg)
  
`;


class App extends React.Component {

  state = {
    text: initialText
  }
handleChange = (event) => {
  this.setState({
    text: event.target.value
  });
}

  render() {

    const markdown = marked(this.state.text, {breaks: true});

    return(
      <div className="container">
        <h1 className="text-center mt-3 title" >Markdown Converter</h1>
        <div className="row">
          <div className="col-4 mt-5">
            <h3 className="editor-title">Editor</h3>
            <textarea className="editor" id="editor" value={this.state.text} onChange={this.handleChange} />
            
          </div>
          <div className="col-8 mt-5 ">
            <h3 className="editor-title">Previewer</h3>
            <div className="preview" id="preview" dangerouslySetInnerHTML={{__html: markdown}} >
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />,document.getElementById('root'))