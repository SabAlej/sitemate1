import { useEffect, useState } from 'react';
import { RiDeleteBinLine, RiEditLine, RiSaveLine } from 'react-icons/ri';
import useFetch from '../lib/useFetchHook';

function Issue({ issue }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);
  const [updatedIssue, setUpdatedIssue] = useState(issue);
  const [method, setMethod] = useState('PUT');

  const { data, loading } = useFetch(issue.id, method, updatedIssue);

  const handleClick = e => {
    e.preventDefault();
    setIsEditing(false);
    updateIssue();
  };

  useEffect(() => {
    if (!loading && data) {
      setIsEditing(false);
    }
  }, [loading, data]);

  const updateIssue = () => {
    setUpdatedIssue({ ...issue, title, description });
  };

  if (isEditing) {
    return (
      <tr>
        <th>{issue.id}</th>
        <td>
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </td>
        <td>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </td>
        <td>
          <button>
            <RiSaveLine onClick={e => handleClick(e)} />
          </button>
        </td>
        <td>
          <RiDeleteBinLine />
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <th>{issue.id}</th>
      <td>{title}</td>
      <td>{description}</td>
      <td>
        <RiEditLine onClick={() => setIsEditing(true)} />
      </td>
      <td>
        <RiDeleteBinLine onClick={() => setMethod('DELETE')} />
      </td>
    </tr>
  );
}

export default Issue;
//
