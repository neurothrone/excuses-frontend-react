import React from "react";
import {Spinner, Card} from "react-bootstrap";
import {useParams} from "react-router";
import {useGetExcuseByIdQuery} from "../redux/excuse-api-slice.ts";

const ExcuseDetail: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const {data: excuse, error, isLoading} = useGetExcuseByIdQuery(Number(id));

  if (isLoading) {
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
    <div className="d-flex justify-content-center mt-5">
      <Card bg="dark" text="light" style={{width: "30rem"}}>
        <Card.Body>
          <Card.Title>Excuse Details</Card.Title>
          <Card.Text>
            <strong>ID:</strong> {excuse?.id}
          </Card.Text>
          <Card.Text>
            <strong>Text:</strong> {excuse?.text}
          </Card.Text>
          <Card.Text>
            <strong>Category:</strong> {excuse?.category}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExcuseDetail;
