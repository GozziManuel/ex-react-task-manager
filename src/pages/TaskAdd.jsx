import { useRef, useState } from "react";
import { useMain } from "../context/MainContext";

export default function TaskAdd() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [inputError, inputSetError] = useState(false);

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

  const titleValidation = () => {
    const titleTrimmed = input.title.trim();
    const emptyInput = titleTrimmed === "";

    const titleSymbols = input.title
      .split("")
      .some((el) => symbols.includes(el));

    return emptyInput || titleSymbols;
  };

  const { tasks } = useMain();
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
    const { value, name } = event.target;
    console.log(value, name);

    setInput((curr) => ({ ...curr, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titleValidation() === true) {
      console.log("Input Vuoto");
      inputSetError(true);
    } else {
      inputSetError(false);
      console.log({ ...input, status: InputRef.current.value });
    }
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
      <button class="btn btn-secondary mt-3">Secondary</button>
      {inputError && (
        <div class="alert alert-danger mt-3" role="alert">
          Input Vuoto o Carattere non hai inserito Dei caratteri speciali
        </div>
      )}
    </form>
  );
}
