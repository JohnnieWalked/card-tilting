import React, { useState } from 'react';
import { useThrottle } from './hooks/useThrottle';
import './TiltingCard.css';

type TiltingCardProps = {
  imagesURL: string[];
};

export default function TiltingCard({ imagesURL }: TiltingCardProps) {
  const [elementPos, setElementPos] = useState({ x: 0, y: 0 });
  const throttledValue = useThrottle(elementPos, 100);

  function rotateElement(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = event.currentTarget.getBoundingClientRect();

    /* mouse pos inside card */
    const x = event.clientX - card.left;
    const y = event.clientY - card.top;

    /* find middle of card */
    const middleX = card.width / 2;
    const middleY = card.height / 2;

    /* get offset from middle */
    const offsetX = ((x - middleX) / middleX) * 25;
    const offsetY = ((y - middleY) / middleY) * 25;
    setElementPos({ x: offsetX, y: offsetY });
  }

  function onMouseLeave() {
    setElementPos({ x: 0, y: 0 });
  }

  const renderedImages = imagesURL.map((item, index) => {
    return (
      <>
        <div className={`layer layer-${index + 1}`}>
          <img src={item} alt="marshall-first-img-layer" />
        </div>
      </>
    );
  });

  return (
    <section>
      <div
        onMouseMove={(e) => rotateElement(e)}
        onMouseLeave={onMouseLeave}
        className="card-tilting"
        style={{
          transform: `perspective(5000px) rotateX(${
            -1 * throttledValue.y
          }deg) rotateY(${throttledValue.x}deg)`,
        }}
      >
        {renderedImages}
      </div>
    </section>
  );
}
