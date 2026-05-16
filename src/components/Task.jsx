export default function Task({ title, description, createdAt, status, i }) {
  return (
    <tr>
      <th scope="row">{i + 1}</th>
      <td>{title}</td>
      <td>{description}</td>
      <td>{createdAt}</td>
      <td className="d-flex justify-content-center align-items-center tableStatus ">
        {" "}
        {status}
        {status === "To do" ? (
          <div className="redStatus"></div>
        ) : status === "Done" ? (
          <div className="greenStatus"></div>
        ) : (
          <div className="yellowStatus"></div>
        )}
      </td>
    </tr>
  );
}
