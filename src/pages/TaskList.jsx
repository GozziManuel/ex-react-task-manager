import { memo, useState } from "react";
import Task from "../components/Task";
import { useMain } from "../context/MainContext";
const MemoTask = memo(Task);
export default function TaskList() {
  const { tasks } = useMain();
  console.log(tasks);

  return (
    <>
      <table className="table table-striped table-dark mt-4 mx-3">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Task</th>
            <th scope="col">description</th>
            <th scope="col">When?</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => {
            return (
              <MemoTask
                key={t.id}
                i={i}
                title={t.title}
                description={t.description}
                createdAt={t.createdAt}
                status={t.status}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}
