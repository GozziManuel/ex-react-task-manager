import { useParams, useNavigate } from "react-router-dom";
import { useMain } from "../context/MainContext";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { createPortal } from "react-dom";
import UptadeModal from "../components/UptadeModal";

export default function DetailedTask() {
  const { id } = useParams();
  const { tasks, errorElimation, removeTask, setErrorElimation } = useMain();

  // STATES
  const [problemElimination, setProblemElimination] = useState(false);
  const [modalAppear, setModalAppear] = useState(false);
  const [modalEditAppear, setModalEditAppear] = useState(false);

  //
  // Navigate
  const navigate = useNavigate();

  // FINDING CURRENT TASK
  //
  const CurrentTask = tasks.find((task) => task.id === parseInt(id, 10));

  //
  // VALIDATION
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

  //
  //
  //
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
        // onClick={() => removeTask(CurrentTask.id)}
        onClick={() => setModalAppear(true)}
      >
        Elimina Task
      </button>
      <button
        className="btn btn-secondary"
        // onClick={() => updateTask(CurrentTask.id)}
        onClick={() => setModalEditAppear(true)}
      >
        Modifica
      </button>

      {/* 
      //  */}
      {modalAppear &&
        createPortal(
          <Modal
            removeTask={() => removeTask(CurrentTask.id)}
            setModalAppear={() => setModalAppear(false)}
          />,
          document.body,
        )}
      {problemElimination && (
        <div className="alert alert-danger mt-3" role="alert">
          Eliminazione non riuscita
        </div>
      )}
      {modalEditAppear &&
        createPortal(
          <UptadeModal
            CurrentId={CurrentTask.id}
            setModalEditAppear={() => setModalEditAppear(false)}
            setModalEdit={setModalEditAppear}
          />,
          document.body,
        )}
    </>
  );
}
