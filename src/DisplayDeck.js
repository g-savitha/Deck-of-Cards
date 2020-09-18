import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

import "./DisplayDeck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class DisplayDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: [],
    };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }
  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error(`No cards left!`);
      }
      let card = cardRes.data.cards[0];
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: ` ${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }
  render() {
    const cards = this.state.drawn.map((c) => (
      <Card key={c.id} image={c.image} name={c.name} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">
          <span role="img" aria-label="diamond">
            💎
          </span>
          Card Dealer
          <span role="img" aria-label="diamond">
            💎
          </span>
        </h1>
        <h2 className="Deck-title subtitle">
          <span role="img" aria-label="diamond">
            💎
          </span>
          A little demo made with react
          <span role="img" aria-label="diamond">
            💎
          </span>
        </h2>
        <button className="Deck-btn" onClick={this.getCard}>
          Get Card!
        </button>
        <div className="Deck-card-area">{cards}</div>
      </div>
    );
  }
}

export default DisplayDeck;
