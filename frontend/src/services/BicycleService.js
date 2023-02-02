import axios from "axios";

const getSessionId = () => {
  return localStorage.getItem("session_id");
}

//
//  Getall
//
const getAll = () => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  const config = {
    method: 'POST',
    url: '/api/empresas/getAll',
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };
  return axios(config);
};

//
//  Get
//
const get = id => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  const config = {
    method: 'POST',
    url: `/api/empresas/get/${id}`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

//
//  Create
//
const create = data => {
  const session_id = getSessionId();

  var data_to_send = JSON.stringify({
    "calkcost": data.calkcost,
    "contactoC": data.contactoC,
    "contactoN": data.contactoN,
    "id": data.id,
    "imagen": data.imagen,
    "nif": data.nif,
    "nombre": data.nombre,
    "proyectos": data.proyectos,
    "totalcost": data.totalcost
  });

  var config = {
    method: 'POST',
    url: '/api/empresas/create',
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data_to_send
  };

  return axios(config);
};

//
//  Update
//
const update = (id, data) => {
  const session_id = getSessionId();

  var data_to_send = JSON.stringify({
        "calkcost": data.calkcost,
        "contactoC": data.contactoC,
        "contactoN": data.contactoN,
        "id": data.id,
        "imagen": data.imagen,
        "nif": data.nif,
        "nombre": data.nombre,
        "proyectos": data.proyectos,
        "totalcost": data.totalcost
  });
  console.log(data_to_send);
  var config = {
    method: 'PUT',
    url: `/api/empresas/update/${id}`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data_to_send
  };

  return axios(config);
};

//
//  Delete
//
const remove = id => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  var config = {
    method: 'DELETE',
    url: `/api/empresas/delete/${id}`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};


//
//  Sesion odoo
//
const initSession = () => {

  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "db": process.env.REACT_APP_ODOO_DB,
      "login": process.env.REACT_APP_ODOO_LOGIN,
      "password": process.env.REACT_APP_ODOO_PASSWORD
    }
  });

  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_ODOO_BASEURL}/web/session/authenticate`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config);
};

const BicycleService = {
  getAll,
  get,
  create,
  update,
  remove,
  initSession
};

export default BicycleService;
