import React, {useState} from "react";
import {Form, Button, Spinner, Alert, Container} from "react-bootstrap";
import {useNavigate} from "react-router";
import {capitalize} from "../utils/string-utils.ts";
import {useAddExcuseMutation} from "../redux/excuse-api-slice.ts";
import {useGetCategoriesQuery} from "../redux/category-api-slice.ts";

const AddExcuse: React.FC = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [addExcuse, {isLoading, isError}] = useAddExcuseMutation();
  const {data: categories, isLoading: isLoadingCategories} = useGetCategoriesQuery();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addExcuse({text, category}).unwrap();
    navigate("/");
  };

  return (
    <Container className="px-0">
      <h2 className="text-light text-center mb-4">Add New Excuse</h2>
      {isError && <Alert variant="danger">Failed to add excuse.</Alert>}
      <Form onSubmit={handleSubmit} className="bg-dark text-light p-4 rounded">
        <Form.Group controlId="excuseText" className="mb-3">
          <Form.Label>Excuse</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter excuse"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group controlId="excuseCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={isLoadingCategories}
          >
            <option value="" disabled>
              {isLoadingCategories ? "Loading categories..." : "Select a category"}
            </option>
            {categories?.map((cat, index) => (
              <option key={index} value={cat}>
                {capitalize(cat)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button
          className="btn-primary"
          type="submit"
          disabled={isLoading || isLoadingCategories || !text.trim() || !category}
        >
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
              variant="light"
            />
          )}
          Add Excuse
        </Button>
      </Form>
    </Container>
  );
};

export default AddExcuse;
