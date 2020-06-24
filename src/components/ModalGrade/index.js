import React, { Fragment, useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Modal from "react-modal";
import * as api from "../../api/api";
import { FaDoorOpen } from "react-icons/fa";

// recomendação do pacote 'react-modal'
Modal.setAppElement("#root");

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type, value } = selectedGrade;
  const [gradeValue, setGradeValue] = useState(value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    };
    getValidation();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;
    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMsg(`O valor da nota deve ser entre ${minValue} e ${maxValue}`);
      return;
    }
    setErrorMsg("");
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose(null);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {id, newValue: gradeValue}
    onSave(formData);
  };
  const handleGradeChange = (e) => {
    console.log(e.target.value);
    setGradeValue(+e.target.value);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <Fragment>
      <Modal isOpen={true}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <h2>Manutenção de Notas</h2>
          <Button onClick={handleModalClose} variant="outline-dark">
            <FaDoorOpen />
          </Button>
        </div>
        <div>
          {errorMsg ? <Alert variant="warning">{errorMsg}</Alert> : ''}
        </div>
        <form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Nome do aluno:</Form.Label>
            <Form.Control type="text" value={student} readOnly />
          </Form.Group>

          <Form.Group>
            <Form.Label>Disciplina:</Form.Label>
            <Form.Control type="text" value={subject} readOnly />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tipo de Avaliação:</Form.Label>
            <Form.Control type="text" value={type} readOnly />
          </Form.Group>

          <Form.Group>
            <Form.Label>Nota:</Form.Label>
            <Form.Control
              type="number"
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              autoFocus
              step={1}
              value={gradeValue}
              onChange={handleGradeChange}
            />
          </Form.Group>

          <Button
            type="submit"
            onClick={handleFormSubmit}
            variant="dark"
            disabled={errorMsg.trim() !== ""}
          >
            Enviar
          </Button>
        </form>
      </Modal>
    </Fragment>
  );
}
