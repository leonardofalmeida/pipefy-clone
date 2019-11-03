import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();

  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex }, // id: data.id, content: data.content 
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index; // quem está sendo arrastado
      const targetIndex = index; // alvo do drop

      if (draggedIndex === targetIndex && targetListIndex === draggedListIndex) {
        return;
      }

      // retorna o tamanho do elemento alvo
      const targetSize = ref.current.getBoundingClientRect();

      // retorna a metade da altura do item
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      // Retorna o quanto o card foi arrastado
      const draggedOffset = monitor.getClientOffset();

      // Distância do card arrastado em relação ao topo
      // menos a distância do card alvo em relação ao topo
      const draggedTop = draggedOffset.y - targetSize.top;

      // Funções para evitar calculos desnecessários, por exemplo
      // se um card é o primeiro e nao passou da metade do segundo
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;

    }
  })

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label}></Label>)}
        <Label color="#715"></Label>
      </header>

      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="Avatar"></img>}
    </Container>
  );
}
