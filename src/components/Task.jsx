import { Link } from "react-router-dom";
import { useMain } from "../context/MainContext";

export default function Task({
  title,
  description,
  createdAt,
  status,
  i,
  ParamId,
  checked,
  checkboxTracing,
}) {
  return (
    <tr>
      <th scope="row">{i + 1}</th>
      <td>{title}</td>
      <td>{description}</td>
      <td>{createdAt}</td>
      {/* 
    //   
    //  */}

      <td>
        <div className="d-flex justify-content-center align-items-center tableStatus ">
          {/* Getting status Color */} {status}
          {status === "To do" ? (
            <div className="redStatus"></div>
          ) : status === "Done" ? (
            <div className="greenStatus"></div>
          ) : (
            <div className="yellowStatus"></div>
          )}
          {/* 
        // 
        
        // */}
        </div>
      </td>
      <td className="text-center">
        <Link className="btn btn-primary me-4" to={`/Task/${ParamId}`}>
          See Task
        </Link>
        <input
          type="checkbox"
          name="checkbox"
          id=""
          checked={checked}
          onChange={checkboxTracing}
        />
      </td>
    </tr>
  );
}
