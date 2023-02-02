import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BicycleDataService from "../services/BicycleService";

const Bicycle = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialBicycleState = {
    id: null,
    brand: "",
    model: "",
  };
  const [empresa, setempresa] = useState(initialBicycleState);
  const [message, setMessage] = useState("");

  const getBicycle = id => {
    BicycleDataService.get(id)
      .then(response => {
        setempresa(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getBicycle(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setempresa({ ...empresa, [name]: value });
  };

  const updateBicycle = () => {
    BicycleDataService.update(empresa.id, empresa)
      .then(response => {
        setMessage("The bicycle was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBicycle = () => {
    BicycleDataService.remove(empresa.id)
      .then(response => {
        navigate("/app/bicycles");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {empresa ? (
        <div className="edit-form">
          <h4>Empresa</h4>
          <form>
            <div className="form-group">
              <label htmlFor="brand">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={empresa.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="model">NIF</label>
              <input
                type="text"
                className="form-control"
                id="nif"
                name="nif"
                value={empresa.nif}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteBicycle}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBicycle}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Bicycle...</p>
        </div>
      )}
    </div>
  );
};

export default Bicycle;
