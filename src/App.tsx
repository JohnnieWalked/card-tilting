/* imgs */
import firstImgLayer from './assets/3d-marshall (first layer).png';
import secondImgLayer from './assets/3d-marshall (second layer).png';
import thirdImgLayer from './assets/3d-marshall (third layer).png';

/* styles */
import './App.css';
import TiltingCard from './TiltingCard';

export default function App() {
  return (
    <main>
      <TiltingCard imagesURL={[firstImgLayer, secondImgLayer, thirdImgLayer]} />
    </main>
  );
}
