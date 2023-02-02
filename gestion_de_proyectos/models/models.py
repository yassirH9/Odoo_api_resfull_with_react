# -*- coding: utf-8 -*-

from odoo import models, fields, api

class empresa_empresa(models.Model):
    _name = 'gestion_de_proyectos.empresa'
    _description = 'gestion_de_proyectos.empresa'


    #variables del modelo
    imagen = fields.Binary(string="Logo de empresa")
    nombre = fields.Char(string="Nombre de la empresa")
    nif = fields.Char(string="NIF de empresa")
    contactoC = fields.Char(string="Correo de contacto")
    contactoN  = fields.Integer(string="Número de contacto")
    totalcost = fields.Float(string="Presupuesto destinado a los proyectos")
    #campo auto calculado
    calkcost = fields.Float(string="IGIC presupuesto", compute="_impuestos", store=True)
    proyectos = fields.One2many("project.project","empresa",string="Proyectos")
    
    @api.depends ('totalcost')
    def _impuestos(self):
          for r in self:
               if r.totalcost > 0:
                    r.calkcost = (7*r.totalcost)/100

class empresa_empresa(models.Model):
     _name = "project.project"
     _inherit = "project.project"

     empresa = fields.Many2one("gestion_de_proyectos.empresa","proyectos")

class empresa_tareas(models.Model):
     _name = "project.task"
     _inherit = "project.task"



# class gestion_de_proyectos(models.Model):
#     _name = 'gestion_de_proyectos.gestion_de_proyectos'
#     _description = 'gestion_de_proyectos.gestion_de_proyectos'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
