import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Following from '../components/Followings';


export default function Home() {
  return (
    <>
      <Navbar />
      {/* <Hero /> */}
      <Following/>
      <Footer />
    </>
  );
}
