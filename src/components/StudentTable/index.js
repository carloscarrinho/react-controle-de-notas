import React from "react";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Table, Container } from "react-bootstrap";

export default function StudentTable(props) {
  const {name, subject, types} = props;
  console.log(name);
  console.log(subject);

  return (
    <Container>
      <Table responsive striped bordered hover className="text-center">
        <thead className="thead-dark">
          <tr>
            <th>Aluno</th>
            <th>Disciplina</th>
            <th>Avaliação</th>
            <th>Nota</th>
            <th>editar</th>
            <th>excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{subject}</td>
            <td>{types[0]}</td>
            <td>10</td>
            <td>
              <FaPencilAlt />
            </td>
            <td>
              <FaTrashAlt />
            </td>
          </tr>
          <tr>
            <td>{name}</td>
            <td>{subject}</td>
            <td>{types[1]}</td>
            <td>10</td>
            <td>
              <FaPencilAlt />
            </td>
            <td>
              <FaTrashAlt />
            </td>
          </tr>
          <tr>
            <td>{name}</td>
            <td>{subject}</td>
            <td>{types[2]}</td>
            <td>10</td>
            <td>
              <FaPencilAlt />
            </td>
            <td>
              <FaTrashAlt />
            </td>
          </tr>
          <tr>
            <td colSpan="3">Total</td>
            <td>10</td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
