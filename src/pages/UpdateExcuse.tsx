import React, {useState, useEffect} from "react";
import {Form, Button, Spinner, Alert} from "react-bootstrap";
import {useParams, useNavigate} from "react-router";
import {useGetExcuseByIdQuery, useUpdateExcuseMutation} from "../redux/excuse-api-slice.ts";

const UpdateExcuse: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const {data: excuse, isLoading: isFetching, error} = useGetExcuseByIdQuery(Number(id));
  const [updateExcuse, {isLoading: isUpdating, isError}] = useUpdateExcuseMutation();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (excuse) {
      setText(excuse.text);
      setCategory(excuse.category);
    }
  }, [excuse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateExcuse({id: Number(id), updatedExcuse: {text, category}}).unwrap();
    navigate("/");
  };

  if (isFetching) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="light"/>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">Failed to load excuse.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-light">Update Excuse</h2>
      {isError && <Alert variant="danger">Failed to update excuse.</Alert>}
      <Form onSubmit={handleSubmit} className="bg-dark text-light p-4 rounded">
        <Form.Group controlId="excuseText" className="mb-3">
          <Form.Label>Excuse Text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter excuse"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="excuseCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isUpdating}>
          {isUpdating && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          )}
          Update Excuse
        </Button>
      </Form>
    </div>
  );
};

export default UpdateExcuse;
