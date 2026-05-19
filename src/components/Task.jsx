import { Link } from "react-router-dom";

export default function Task({
  title,
  description,
  createdAt,
  status,
  i,
  ParamId,
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
      <td>
        <Link className="btn btn-primary" to={`/Task/${ParamId}`}>
          See Task
        </Link>
      </td>
    </tr>
  );
}
