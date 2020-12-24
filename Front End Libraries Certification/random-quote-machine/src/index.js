import React from 'react';
import ReactDOM from 'react-dom';

const quotesAPI = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';


class App extends React.Component {
  state = {
    quotes: [
      {
        quote: "Life isn’t about getting and having, it’s about giving and being.", // balame arxiko state gt alliws sto twitterURl eperna undefined error
        author: "Kevin Kruse"
      }
    ],
    index: 0
  }
componentDidMount() {  //  after all the elements of the page is rendered correctly, this method is called
  fetch(quotesAPI)
    .then(res => res.json())
    .then(res => {
      this.setState({
        quotes: res.quotes // me to res mono pairnw olo to API , enw me to res.quotes ton pinaka
      }, this.randomQuote);
    })
   
}

randomQuote = () => {

  const {quotes} = this.state;
  const index = Math.floor(Math.random() * quotes.length);
  this.setState({
    index
  })
}

  render() {

    const {quotes, index} = this.state;
    const randomQuote = quotes[index];
    // console.log(this.randomQuote.author)
    const twitterURL = `https://twitter.com/intent/tweet?hashtags=quotes&text=` + randomQuote.quote + ` - ` + randomQuote.author;


    return (
      <div className="center-height d-flex justify-content-center align-items-center">
        <div className="col-4 content" id="quote-box">
          { randomQuote && (
            <div className="mb-3">
              <p className="quote-paragraph" id="text"><i className="fas fa-quote-left"></i>
                {randomQuote.quote}
                <i className="fas fa-quote-right"></i>
                </p>
              <cite id="author" className="d-block text-right">- {randomQuote.author} </cite>
            </div>
              
              )
          }
          <div className="d-flex justify-content-between">
            <div className="tweet">
              <a className="btn btn-sm btn-primary text-white" id="tweet-quote" href={twitterURL} target="_blank">Tweet me  <i className="fab fa-twitter"></i></a>
            </div>
            <button className="btn btn-sm btn-primary" onClick={this.randomQuote} id="new-quote">Get Quote</button>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))