import React from "react";

import { FaPencilAlt, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { Table, Container } from "react-bootstrap";

export function GradesControl({ grades, onDelete, onPersist }) {
  /** estabelecendo variáveis de apoio */
  let tableGrades = [];
  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrade = [];
  let id = 1;

  /** tratando o array */
  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrade,
      });
      currentSubject = grade.subject;
      currentGrade = [];
    }
    if (grades.student !== currentStudent) {
      currentStudent = grade.student;
    }
    currentGrade.push(grade);
  });

  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrade,
  });

  /** funções */
  const handleClick = (id, type) => {
    const grade = grades.find(grade => grade.id === id);
    if(type === 'remove') {
      onDelete(grade);
    }

    if(type === 'add' || type === 'edit') {
      onPersist(grade);
    }
  };

  return (
    <Container>
      {tableGrades.map(({ id, grades }) => {
        const finalGrade = grades.reduce((acc, currItem) => {
          return acc + currItem.value;
        }, 0);

        return (
          <Table
            responsive
            striped
            bordered
            hover
            className="text-center"
            key={id}
          >
            <thead className="thead-dark">
              <tr>
                <th>Aluno</th>
                <th>Disciplina</th>
                <th>Avaliação</th>
                <th>Nota</th>
                <th colSpan={2}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, student, subject, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? " - " : value}</td>
                      <td>
                        {isDeleted ? (
                          <FaPlusCircle onClick={() => handleClick(id, 'add')} />
                        ) : (
                          <FaPencilAlt onClick={() => handleClick(id, 'edit')} />
                        )}
                      </td>
                      <td>
                        {!isDeleted && (
                          <FaTrashAlt onClick={() => handleClick(id, 'remove')} />
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>&nbsp;</td>
                <td><strong>Total:</strong></td>
                <td><strong>{finalGrade}</strong></td>
                <td colSpan={2}>&nbsp;</td>
              </tr>
            </tfoot>
          </Table>
        );
      })}
    </Container>
  );
}
