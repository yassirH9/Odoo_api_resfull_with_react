from odoo import http
from odoo.http import request


class EmpresaController(http.Controller):
    
    @http.route('/api/empresas/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        empresas_rec = request.env['gestion_de_proyectos.empresa'].sudo().search([])
        empresas = []
        for rec in empresas_rec:
            vals = {
                'id': rec.id,
                'imagen': rec.imagen,
                'nombre': rec.nombre,
                'nif': rec.nif,
                'contactoC': rec.contactoC,
                'contactoN': rec.contactoN,
                'totalcost': rec.totalcost,
                'calkcost': rec.calkcost,
                'proyectos': rec.proyectos.ids,
            }
            empresas.append(vals)
        return {'status': 200, 'response': empresas, 'message': 'Success'}

    @http.route('/api/empresas/get/<int:id>', type="json", auth="public", csrf=True, cors='*')
    def get(self, id):
        empresa_rec = request.env['gestion_de_proyectos.empresa'].sudo().search([('id', '=', id)])
        if empresa_rec:
            vals = {
                'id': empresa_rec.id,
                'imagen': empresa_rec.imagen,
                'nombre': empresa_rec.nombre,
                'nif': empresa_rec.nif,
                'contactoC': empresa_rec.contactoC,
                'contactoN': empresa_rec.contactoN,
                'totalcost': empresa_rec.totalcost,
                'calkcost': empresa_rec.calkcost,
                'proyectos': empresa_rec.proyectos.ids,
            }
            return {'status': 200, 'response': vals, 'message': 'Success'}
        else:
            return {'status': 400, 'response': None, 'message': 'Empresa no encontrada'}

    @http.route('/api/empresas/create', type="json", auth="public", csrf=True, cors='*', methods=['POST'])
    def create(self):
        data = request.jsonrequest
        empresa = request.env['gestion_de_proyectos.empresa'].sudo().create({
            'imagen': data.get('imagen'),
            'nombre': data.get('nombre'),
            'nif': data.get('nif'),
            'contactoC': data.get('contactoC'),
            'contactoN': data.get('contactoN'),
            'totalcost': data.get('totalcost'),
            'proyectos': [(6, 0, data.get('proyectos'))],
        })
        return {'status': 200, 'response': empresa.id, 'message': 'Success'}

    @http.route('/api/empresas/update/<int:id>', type="json", auth="public", csrf=True, cors='*', methods=['PUT'])
    def update(self, id):
        empresa_rec = request.env['gestion_de_proyectos.empresa'].sudo().search([('id', '=', id)])
        if empresa_rec:
            data = request.jsonrequest
            empresa_rec.write({
                'imagen': data.get('imagen'),
                'nombre': data.get('nombre'),
                'nif': data.get('nif'),
                'contactoC': data.get('contactoC'),
                'contactoN': data.get('contactoN'),
                'totalcost': data.get('totalcost'),
                'proyectos': [(6, 0, data.get('proyectos'))],
            })
            return {'status': 200, 'response': None, 'message': 'Success'}
        else:
            return {'status': 400, 'response': None, 'message': 'Empresa no encontrada'}

    @http.route('/api/empresas/delete/<int:id>', type="json", auth="public", csrf=True, cors='*', methods=['DELETE'])
    def delete(self, id):
        empresa_rec = request.env['gestion_de_proyectos.empresa'].sudo().search([('id', '=', id)])
        if empresa_rec:
            empresa_rec.unlink()
            return {'status': 200, 'response': None, 'message': 'Success'}
        else:
            return {'status': 400, 'response': None, 'message': 'Empresa no encontrada'}
