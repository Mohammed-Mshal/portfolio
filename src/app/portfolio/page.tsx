import { GetProjects } from "@/data/projects/GetProjects";
import About from "../components/portfolio/About/About";
import Contact from "../components/portfolio/Contact/Contact";
import ExperienceSection from "../components/portfolio/Experience/ExperienceSection";
import Hero from "../components/portfolio/Hero/Hero";
import MainNav from "../components/portfolio/MainNav/MainNav";
import Navbar from "../components/portfolio/Navbar/Navbar";
import Projects from "../components/portfolio/Projects/Projects";
import GetExperience from "@/data/Experience/getExperience";

export default async function Home() {
  const resGetProjects = await GetProjects()
  const resExperiences = await GetExperience()
  return (
    <div className="flex flex-row justify-stretch min-h-dvh relative">
      <Navbar />
      <div className="main-page relative flex flex-col flex-1 overflow-hidden">
        <MainNav />
        <Hero />
        <About />
        <Projects projects={resGetProjects.data?.projects || []} />
        <ExperienceSection listExperience={resExperiences?.data?.experiences || [] } />
        <Contact />
      </div>
    </div>
  );
}
