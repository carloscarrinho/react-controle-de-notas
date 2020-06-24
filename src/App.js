import React, { Fragment, useState, useEffect } from "react";
import * as api from "./api/api";
import Spinner from "./components/Spinner";
import ModalGrade from "./components/ModalGrade";
import { GradesControl } from "./components/GradesControl";

function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** Ciclo de Vida */
  useEffect(() => {
    /** buscando as notas da API */
    // api.getAllGrades().then(grades => {
    //   setTimeout(() => {
    //     setAllGrades(grades);
    //   }, 1500)
    // });

    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 1500);
    };
    /** fim da busca */

    getGrades();
  }, []);

  /** Funções */
  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await api.deleteGrade(gradeToDelete);
    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        (grade) => grade.id === gradeToDelete.id
      );

      const newGrade = Object.assign([], allGrades);
      newGrade[deletedGradeIndex].idDeleted = true;
      newGrade[deletedGradeIndex].value = 0;

      setAllGrades(newGrade);
    }
  };

  const handlePersist = (grade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    const { id, newValue } = formData;
    const newGrade = Object.assign([], allGrades);
    const gradeToPersist = newGrade.find((grade) => grade.id === id);
    gradeToPersist.value = newValue;

    if (gradeToPersist.isDeleted) {
      gradeToPersist.isDeleted = false;
      await api.insertGrade(gradeToPersist);
      return;
    } else {
      await api.updateGrade(gradeToPersist);
    }

    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <header className="bg-dark">
        <h1 className="text-center text-white mb-4 p-3">Controle de Notas</h1>
      </header>
      {allGrades.length === 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
      {isModalOpen && (
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />
      )}
    </Fragment>
  );
}

export default App;
