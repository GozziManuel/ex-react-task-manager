import { memo, useState } from "react";
import Task from "../components/Task";
import { useMain } from "../context/MainContext";
import { Link } from "react-router-dom";
const MemoTask = memo(Task);
export default function TaskList() {
  const { tasks } = useMain();

  return (
    <>
      <table className="table table-striped table-dark mt-4 mx-3">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Task</th>
            <th scope="col">description</th>
            <th scope="col">When?</th>
            <th scope="col" className="text-center">
              Status
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => {
            return (
              <MemoTask
                key={t.id}
                ParamId={t.id}
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
