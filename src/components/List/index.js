import React from 'react';
import { Container } from './styles';
import { MdAdd } from 'react-icons/md';
import Card from '../Card';

export default function List({ data }) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFF"></MdAdd>
          </button>
        )}
      </header>
      <ul>
        {data.cards.map((card, index) =>
          <Card key={card.id} data={card} index={index} />
        )}

      </ul>
    </Container>
  );
}
