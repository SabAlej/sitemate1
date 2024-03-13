import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

function Issue({ issue }) {
  const { id, title, description } = issue;
  return (
    <tr>
      <th>{id}</th>
      <td>{title}</td>
      <td>{description}</td>
      <td>
        <RiEditLine />
      </td>
      <td>
        <RiDeleteBinLine />
      </td>
    </tr>
  );
}
export default Issue;
