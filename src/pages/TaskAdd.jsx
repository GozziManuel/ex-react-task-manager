import { useEffect, useRef, useState } from "react";
import { useMain } from "../context/MainContext";

export default function TaskAdd() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "",
  });

  const { addTask, InputValidation, tasks } = useMain();

  const [inputError, inputSetError] = useState(false);

  useEffect(() => {
    if (InputValidation?.success === false) {
      inputSetError(true);
    }
  }, [InputValidation]);

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

  const InputRef = useRef();
  //
  //
  //
  // Getting Select Status

  const AllStatus = tasks.map((el) => el.status);
  const UniqueStatus = [];
  const OtherStatus = [];

  for (let index = 0; index < AllStatus.length; index++) {
    const element = AllStatus[index];
    if (UniqueStatus.includes(element)) {
      OtherStatus.push(element);
    } else {
      UniqueStatus.push(element);
    }
  }
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
    inputSetError(false);
    const UpdatedInputs = { ...input, status: InputRef.current.value };
    setInput(UpdatedInputs);
    addTask(UpdatedInputs);
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
    </form>
  );
}
