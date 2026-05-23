import { useEffect, useRef, useState } from "react";
import { useMain } from "../context/MainContext";

export default function UptadeModal({
  setModalEditAppear,
  CurrentId,
  setModalEdit,
  CurrentTask,
}) {
  const UniqueStatus = ["To do", "Done", "Doing"];
  const { updateTask, dataForPut, setDataForPut } = useMain();
  console.log(CurrentTask);
  const InputRefEdit = useRef();

  const [uptadeInput, setUptadeInput] = useState({
    title: CurrentTask?.title,
    description: CurrentTask?.description,
    status: CurrentTask?.status,
  });
  const [problemUpdate, setProblemUpdate] = useState(false);

  //
  const handleEditChange = (e) => {
    const { value, name } = e.target;

    setUptadeInput((curr) => ({ ...curr, [name]: value }));
  };

  //
  useEffect(() => {
    console.log(dataForPut?.success);
    if (dataForPut?.success === undefined) return;

    if (dataForPut?.success === false) {
      setProblemUpdate(true);
      return;
    }

    if (dataForPut?.success === true) {
      setModalEdit(false);
      setProblemUpdate(false);
      setDataForPut(null);
    }
  }, [dataForPut, setDataForPut]);

  //
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const NewInput = {
      ...uptadeInput,
      status: InputRefEdit.current.value,
    };
    console.log(NewInput);
    updateTask(CurrentId, NewInput);
  };

  return (
    <div className="backgroundModal">
      <div className="modale">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modifica Task</h5>
            </div>
            <div className="modal-body">
              <form className="form" onSubmit={handleSubmitEdit}>
                <div className="form-group mt-2">
                  <label>Titolo della Task</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Scrivi il titolo..."
                    //
                    //
                    name="title"
                    value={uptadeInput.title}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Descrizione</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Scrivi qui la descrizione..."
                    //
                    //
                    name="description"
                    value={uptadeInput.description}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Status Task</label>

                  <select
                    name="status"
                    ref={InputRefEdit}
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option value="">Scegli lo status</option>
                    {UniqueStatus.map((s, i) => {
                      return (
                        <option value={s} key={i}>
                          {s}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button
                  className="customButtonTask mt-3"
                  style={{ backgroundColor: "lightblue", color: "black" }}
                >
                  Conferma
                </button>
                <button
                  style={{
                    backgroundColor: "rgba(247, 26, 26, 0.66)",
                    color: "black",
                  }}
                  className="customButtonTask mt-3 ms-4"
                  onClick={setModalEditAppear}
                >
                  Chiudi
                </button>
                {problemUpdate && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {dataForPut.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
