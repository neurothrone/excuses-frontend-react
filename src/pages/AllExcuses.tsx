import React from "react";
import {Spinner, Button, Table, Container} from "react-bootstrap";
import {capitalize} from "../utils/string-utils.ts";
import {Excuse} from "../models/excuse.ts";
import {useGetExcusesQuery, useDeleteExcuseMutation} from "../redux/excuse-api-slice.ts";

const AllExcuses: React.FC = () => {
  const {data: excuses, error, isLoading} = useGetExcusesQuery();
  const [deleteExcuse, {isLoading: isDeleting}] = useDeleteExcuseMutation();
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border"/>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">Failed to load excuses.</p>;
  }

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await deleteExcuse(id);
    setDeletingId(null);
  };

  return (
    <Container className="px-0">
      <h2 className="text-center text-light mb-4">All Excuses</h2>
      <Table striped bordered hover variant="dark" className="text-center align-middle">
        <thead>
          <tr>
            {/*<th>ID</th>*/}
            <th>Excuse</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {excuses?.map((excuse: Excuse) => (
            <tr key={excuse.id}>
              {/*<td>{excuse.id}</td>*/}
              <td>{excuse.text}</td>
              <td>{capitalize(excuse.category)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(excuse.id)}
                  disabled={isDeleting}
                >
                  {deletingId === excuse.id && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="spinner-button me-2"
                    />
                  )}
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllExcuses;
