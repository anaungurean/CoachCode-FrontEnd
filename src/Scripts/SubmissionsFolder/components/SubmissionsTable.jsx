import PropTypes from 'prop-types';
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ['Problem ID', 'Programming Language', 'Memory', 'Runtime', 'Timestamp'];


function SubmissionsTable({SubmissionsDetails}) {

    return (
        <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
            {SubmissionsDetails.map((submission) => (
                <tr key={submission.id}>
                <td className="p-4">{submission.problem_id}</td>
                <td className="p-4">{submission.programming_language}</td>
                <td className="p-4">{submission.memory} MB</td>
                <td className="p-4">{submission.runtime} ms</td>
                <td className="p-4">{submission.timestamp}</td>
                </tr>
            ))}
        </tbody>
        </table>
        </Card>
    );  
}


SubmissionsTable.propTypes = {
    SubmissionsDetails: PropTypes.array.isRequired,
  };
  
  SubmissionsTable.defaultProps = {
    SubmissionsDetails: [],
  };

export default SubmissionsTable;
