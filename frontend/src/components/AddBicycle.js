import React, { useState } from "react";
import empresaDataService from "../services/BicycleService";

const Addempresa = () => {
  const initialempresaState = {
    id: null,
    nombre: "",
    nif: "",
  };
  const [empresa, setempresa] = useState(initialempresaState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setempresa({ ...empresa, [name]: value });
  };

  const saveempresa = () => {
    var data = {
      nombre: empresa.nombre,
      nif: empresa.nif
    };

    empresaDataService.create(data)
      .then(response => {
        setempresa({
          id: response.data.id,
          nombre: response.data.brand,
          nif: response.data.model,
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newempresa = () => {
    setempresa(initialempresaState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newempresa}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="brand">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              value={empresa.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="model">NIF</label>
            <input
              type="text"
              className="form-control"
              id="nif"
              required
              value={empresa.nif}
              onChange={handleInputChange}
              name="nif"
            />
          </div>

          <button onClick={saveempresa} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Addempresa;
