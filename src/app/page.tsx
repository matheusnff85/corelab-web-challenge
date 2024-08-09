import { Header } from "../components/header";
import { TaskList } from "../components/task-list";
import { TaskCreator } from "../components/task-creator";

export default function Home() {
  return (
    <main className="pb-24 flex flex-col gap-10">
      <Header></Header>
      <TaskCreator></TaskCreator>
      <TaskList></TaskList>
    </main>
  );
}
