import { useEffect, useState } from 'react';

/* hooks */
import { useThrottle } from './hooks/useThrottle';

/* imgs */
import firstImgLayer from './assets/3d-marshall (first layer).png';
import secondImgLayer from './assets/3d-marshall (second layer).png';
import thirdImgLayer from './assets/3d-marshall (third layer).png';

/* styles */
import './App.css';

export default function App() {
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

  useEffect(() => {
    console.log(throttledValue.x, throttledValue.y);
  }, [throttledValue]);

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
        <div className="layer first-layer">
          <img src={firstImgLayer} alt="marshall-first-img-layer" />
        </div>
        <div className="layer second-layer">
          <img src={secondImgLayer} alt="marshall-second-img-layer" />
        </div>
        <div className="layer third-layer">
          <img src={thirdImgLayer} alt="marshall-third-img-layer" />
        </div>
      </div>
    </section>
  );
}
