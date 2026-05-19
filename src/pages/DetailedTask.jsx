import { useParams, useNavigate } from "react-router-dom";
import { useMain } from "../context/MainContext";
import { useEffect, useState } from "react";

export default function DetailedTask() {
  const { id } = useParams();
  const { tasks, errorElimation, removeTask, setErrorElimation } = useMain();
  const [problemElimination, setProblemElimination] = useState(false);
  const navigate = useNavigate();

  const CurrentTask = tasks.find((task) => task.id === parseInt(id, 10));

  useEffect(() => {
    if (errorElimation === null) return;

    if (errorElimation.success === false) {
      console.log(errorElimation);
      setProblemElimination(true);
      return;
    }

    if (errorElimation.success === true) {
      console.log(errorElimation);
      setProblemElimination(false);
      setErrorElimation(null);
      navigate("/");
    }
  }, [errorElimation, navigate, setErrorElimation]);
  return (
    <>
      <h2 className="mb-4">{CurrentTask?.title}</h2>
      <h5>Descrizione:</h5>
      <p>{CurrentTask?.description}</p>
      <div className="d-flex ">
        <p className="me-4">{CurrentTask?.status}</p>
        <p>{CurrentTask?.createdAt}</p>
      </div>
      <button
        className="btn btn-danger"
        onClick={() => removeTask(CurrentTask.id)}
      >
        Elimina Task
      </button>
      {problemElimination && (
        <div className="alert alert-danger mt-3" role="alert">
          Eliminazione non riuscita
        </div>
      )}
    </>
  );
}
