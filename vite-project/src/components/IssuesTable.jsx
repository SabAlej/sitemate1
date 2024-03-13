import Issue from './Issue';
import useFetch from '../lib/useFetchHook';

function IssuesTable() {
  const { data: issues, loading, error } = useFetch('issues', 'GET');
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            issues.map(issue => <Issue key={issue.id} issue={issue} />)}
        </tbody>
      </table>
    </div>
  );
}
export default IssuesTable;
