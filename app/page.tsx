import FAQ from "./components/landing-page/FAQ";
import Header from "./components/landing-page/Header";
import Hero from "./components/landing-page/Hero";
import Pricing from "./components/landing-page/Pricing";
import VideoExplanation from "./components/landing-page/VideoExplanation";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
