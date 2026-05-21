import { memo, useEffect, useState } from "react";
import Task from "../components/Task";
import { useMain } from "../context/MainContext";
import { Link } from "react-router-dom";
const MemoTask = memo(Task);
export default function TaskList() {
  const { tasks } = useMain();

  //
  //
  // GETTING DATA FOR SORTING
  const [orderBy, setOrderBy] = useState([]);
  const [arrowStatus, setArrowStatus] = useState(null);
  const [arrowTitle, setArrowTitle] = useState(null);

  const [arrowWhen, setArrowWhen] = useState(false);
  const [sortBy, setSortBy] = useState(1);
  useEffect(() => {
    if (tasks) {
      setOrderBy(
        [...tasks].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
      );
    }
  }, [tasks]);

  //
  //
  //
  //  SORT BY TITLE
  const sortbyTitle = () => {
    if (sortBy === 1) {
      // RESET
      setArrowWhen(null);
      setArrowStatus(null);
      setArrowTitle(true);

      setOrderBy((curr) => {
        const copy = [...curr];
        copy.sort((a, b) => b.title.localeCompare(a.title, "it"));
        return copy;
      });
      setSortBy(-1);
    } else if (sortBy === -1) {
      setArrowStatus(null);

      setArrowTitle(false);
      setOrderBy((curr) => {
        const copy = [...curr];
        copy.sort((a, b) => a.title.localeCompare(b.title, "it"));
        return copy;
      });
      setSortBy(1);
    }
  };

  //
  //
  //
  // SORT BY STATUS
  const sortbyStatus = () => {
    if (sortBy === 1) {
      //RESET
      setArrowWhen(null);
      setArrowTitle(null);
      setArrowStatus(true);
      //

      setOrderBy((curr) => {
        const copy = [...curr];
        copy.sort((a, b) => b.status.localeCompare(a.status, "it"));
        return copy;
      });
      setSortBy(-1);
    } else if (sortBy === -1) {
      setArrowWhen(null);
      setArrowTitle(null);
      setArrowStatus(false);

      setOrderBy((curr) => {
        const copy = [...curr];
        copy.sort((a, b) => a.status.localeCompare(b.status, "it"));
        return copy;
      });
      setSortBy(1);
    }
  };

  //
  //
  //
  // SortByTIME
  const sortbyTime = () => {
    // RESET
    setArrowTitle(null);
    setArrowStatus(null);
    setArrowWhen(true);
    //
    if (sortBy === 1) {
      console.log("Su");

      setOrderBy((curr) => {
        const copy = [...curr];
        copy.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        return copy;
      });

      setSortBy(-1);
    } else if (sortBy === -1) {
      setArrowTitle(null);
      setArrowStatus(null);
      setArrowWhen(false);

      console.log("giù");

      setOrderBy((curr) => {
        const copy = [...curr];
        copy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        return copy;
      });
      setSortBy(1);
    }
  };

  //
  //
  return (
    <>
      <table className="table table-striped table-dark mt-4 mx-3">
        <thead>
          <tr>
            <th scope="col" className=""></th>
            <th scope="col" className="sorterTH" onClick={() => sortbyTitle()}>
              Task
              {arrowTitle === null ? (
                ""
              ) : arrowTitle ? (
                <i class="bi bi-arrow-up"></i>
              ) : (
                <i class="bi bi-arrow-down"></i>
              )}
            </th>
            <th scope="col" className="">
              description
            </th>
            <th scope="col" className="sorterTH" onClick={() => sortbyTime()}>
              When?
              {arrowWhen === null ? (
                ""
              ) : arrowWhen ? (
                <i class="bi bi-arrow-up"></i>
              ) : (
                <i class="bi bi-arrow-down"></i>
              )}
            </th>
            <th
              scope="col"
              className="text-center sorterTH"
              onClick={() => sortbyStatus()}
            >
              Status
              {arrowStatus === null ? (
                ""
              ) : arrowStatus ? (
                <i class="bi bi-arrow-up"></i>
              ) : (
                <i class="bi bi-arrow-down"></i>
              )}
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orderBy?.map((t, i) => {
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
