import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";

function App() {
  return (
    <main className="flex h-screen gap-8 my-8">
      <ProjectSidebar />
      {/* <NewProject/> */}
      <NoProjectSelected/>
    </main>
  );
}

export default App;
