import { useEffect, useRef, useState } from "react";
import { useMain } from "../context/MainContext";

export default function TaskAdd() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "",
  });
  const UniqueStatus = ["To do", "Done", "Doing"];

  const { addTask, InputValidation, tasks } = useMain();

  const [inputError, inputSetError] = useState(false);
  const [confirmForm, setConfirmForm] = useState(false);
  useEffect(() => {
    if (InputValidation?.success === false) {
      inputSetError(true);
      setConfirmForm(false);
    } else if (InputValidation?.success === true) {
      inputSetError(false);
      setConfirmForm(true);
      setInput({
        title: "",
        description: "",
        status: "",
      });
    }
  }, [InputValidation]);

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

  const InputRef = useRef();
  //
  //

  //
  //
  //

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);

    setInput((curr) => ({ ...curr, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const UpdatedInputs = { ...input, status: InputRef.current.value };
    addTask(UpdatedInputs);
    // setInput({
    //   title: "",
    //   description: "",
    //   status: (InputRef.current.value = ""),
    // });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group mt-2">
        <label>Titolo della Task</label>
        <input
          type="text"
          className="form-control"
          placeholder="Scrivi il titolo..."
          //
          //
          name="title"
          value={input.title}
          onChange={handleChange}
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
          value={input.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-2">
        <label>Status Task</label>

        <select
          name="status"
          ref={InputRef}
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
      <button className="btn btn-secondary mt-3">Secondary</button>
      {inputError && (
        <div className="alert alert-danger mt-3" role="alert">
          {InputValidation.message}
        </div>
      )}
      {confirmForm && (
        <div className="alert alert-success mt-3" role="alert">
          Task Creata con Successo!
        </div>
      )}
    </form>
  );
}
