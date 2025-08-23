import { TagProvider } from "../components/TagContext";

export default function App() {
  return (
    <TagProvider>
      <div>
        <h1>Daidev Web Frontend</h1>
        <p>Next.js application with real build</p>
      </div>
    </TagProvider>
  );
}
