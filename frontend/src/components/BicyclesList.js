import React, { useState, useEffect } from "react";
import BicycleDataService from "../services/BicycleService";
import { Link } from "react-router-dom";

const BicyclesList = () => {
  const [bicycles, setBicycles] = useState([]);
  const [currentEmpresa, setcurrentEmpresa] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveBicycles();
  }, []);

  const retrieveBicycles = () => {
    BicycleDataService.getAll()
      .then(response => {
        setBicycles(response.data.result.response);
        console.log(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBicycles();
    setcurrentEmpresa(null);
    setCurrentIndex(-1);
  };

  const setActiveBicycle = (empresa, index) => {
    setcurrentEmpresa(empresa);
    setCurrentIndex(index);
  };

  const removeEmpresa = (nif) => {
    BicycleDataService.remove(nif)
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lista de empresas</h4>

        <ul className="list-group">
          {bicycles &&
            bicycles.map((empresa, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBicycle(empresa, index)}
                key={index}
              >
                {empresa.nombre}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentEmpresa ? (
          <div>
            <h4>empresa</h4>
            <div>
              <label>
                <strong>Nombre:</strong>
              </label>{" "}
              {currentEmpresa.nombre}
            </div>
            <div>
              <label>
                <strong>NIF:</strong>
              </label>{" "}
              {currentEmpresa.nif}
            </div>
            <Link to={"/app/bicycles/" + currentEmpresa.id} className="badge badge-warning">Edit</Link>
            <br/>
            <button className="badge badge-danger" onClick={() => removeEmpresa(currentEmpresa.id)}>Remove</button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Bicycle...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BicyclesList;
