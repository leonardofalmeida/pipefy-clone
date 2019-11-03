import React, { useState } from 'react';
import produce from 'immer';

import { Container } from './styles';

import List from '../List';
import BoardContext from './context';

import { loadLists } from '../services/api';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    // Com o produce não mudamos nosso estado, então ele permanece imutável
    // O draft é uma cópia de lists, sempre o draft sofre uma alteração
    // ele computa automaticamente no lists
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      //Primeiro remove o item da lista e depois o recoloca no novo lugar
      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) =>
          <List key={list.title} index={index} data={list} />
        )}
      </Container>
    </BoardContext.Provider>
  );
}
