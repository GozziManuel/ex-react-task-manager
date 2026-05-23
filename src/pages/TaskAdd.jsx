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
  const [alreadyExist, setAlreadyExist] = useState(false);

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
        status: (InputRef.current.value = ""),
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

    setInput((curr) => ({ ...curr, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputTitle = input.title.trim().toLocaleLowerCase();
    const AlreadyExist = tasks.map((el) =>
      inputTitle.includes(el.title.trim().toLocaleLowerCase()),
    );
    if (AlreadyExist.includes(true)) {
      console.log("Già esiste");
      setConfirmForm(false);

      inputSetError(false);

      setAlreadyExist(true);
      return;
    } else {
      setAlreadyExist(false);
      const UpdatedInputs = { ...input, status: InputRef.current.value };
      addTask(UpdatedInputs);
    }
  };

  return (
    <section className="containerForm">
      <h1 className="mb-4 mt-3">Aggiungi la tua Task!</h1>
      <form className="form w-75" onSubmit={handleSubmit}>
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
        <button className="customButtonConfirm mt-3">Aggiungi Task</button>
        {inputError && (
          <div className="alert  alert-danger mt-3" role="alert">
            {InputValidation.message}
          </div>
        )}
        {confirmForm && (
          <div
            className="alert   alertAnimation alert-success mt-3"
            role="alert"
          >
            Task Creata con Successo!
          </div>
        )}
        {alreadyExist && (
          <div className="alert alert-danger mt-3" role="alert">
            Task già esistente!
          </div>
        )}
      </form>
    </section>
  );
}
