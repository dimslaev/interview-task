import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { fetchData } from "../../utils/";
import "./company-address.scss";

export default function CompanyAddress(props) {
  const { companyId } = props;
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) return;
    fetchData(`/data/company-addresses.json`)
      .then((data) => {
        const companyAddress = data.find((x) => x.companyId === companyId);
        if (companyAddress) setAddress(companyAddress);
        else setError({ code: "", text: "No address found" });
      })
      .catch((error) => {
        setError(error);
      });
  }, [companyId, setAddress, setError]);

  if (!address) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Card className="company-address">
      <Card.Body>
        <Row>
          <Col sm="3" className="mb-3 mb-sm-0">
            <h5>Country</h5>
            {address.country}
          </Col>
          <Col sm="3" className="mb-3 mb-sm-0">
            <h5>City</h5>
            {address.city}
          </Col>
          <Col sm="3" className="mb-3 mb-sm-0">
            <h5>State</h5>
            {address.state}
          </Col>
          <Col sm="3" className="mb-3 mb-sm-0">
            <h5>Street</h5>
            {address.street}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
