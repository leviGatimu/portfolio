import Footer from "@/components/layout/Footer";
import GetInTouch from "@/components/sections/GetInTouch";
import GitHubActivity from "@/components/sections/GitHubActivity";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Intro />
      <Projects />
      <TechStack />
      <GitHubActivity />
      <Testimonials />
      <GetInTouch />
      <Footer />
    </main>
  );
}
