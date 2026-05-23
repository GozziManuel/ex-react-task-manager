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
      <th scope="row " className="pt-3">
        {i + 1}
      </th>
      <td className="pt-3">{title}</td>
      <td className="pt-3">{description}</td>
      <td className="pt-3">{createdAt}</td>
      {/* 
    //   
    //  */}

      <td className="py-3">
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
      <td className="text-center py-3">
        <Link className="customButtonTask me-4 " to={`/Task/${ParamId}`}>
          See Task
        </Link>
        <input
          type="checkbox"
          name="checkbox"
          id=""
          className="form-check-input mt-3"
          style={{ cursor: "pointer" }}
          checked={checked}
          onChange={checkboxTracing}
        />
      </td>
    </tr>
  );
}
