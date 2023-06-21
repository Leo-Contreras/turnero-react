import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

  const Menu = () => {
    return (
        <Card style={{ width: '18rem', height: '20rem', margin: 'auto', marginTop: '10%' }}>
          <Card.Body>
            <Card.Title className="text-center">Menú</Card.Title>
            <Card.Text>
              <div style={{ display: 'block', marginBottom: '10px' }}>
                <Button block as={Link} to="/visualizador-turnos" className="w-100 custom-button">
                  Visualizador de Turnos
                </Button>
              </div>
              <div style={{ display: 'block', marginBottom: '10px' }}>
                <Button  block as={Link} to="/solicitar-turno" className="w-100 custom-button">
                  Generar Turno para Ciudadano
                </Button>
              </div>
              <div style={{ display: 'block', marginBottom: '10px' }}>
                <Button block as={Link} to="/Login" className="w-100 custom-button">
                  Tomar Turno - MODULO
                </Button>
              </div>
              <div style={{ display: 'block', marginBottom: '10px' }}>
                <Button  block as={Link} to="/registrar-caja" className="w-100 custom-button">
                  Registrar Modulo Nuevo
                </Button>
              </div>
              {/*    <div style={{ display: 'block', marginBottom: '10px' }}>
                <Button block as={Link} to="/informacion-empresa" className="w-100 custom-button">
                  Información de la empresa
                </Button>
              </div>
              <div style={{ display: 'block', marginBottom: '10px' }}>
                <Button  block as={Link} to="/resetear-turnos" className="w-100 custom-button">
                  Resetear turnos
                </Button>
              </div>
              */}
              <div style={{ display: 'block', marginBottom: '10px' }}>
                <Button block as={Link} to="/lista-cajas" className="w-100 custom-button">
                  Lista de Modulos
                </Button>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
    );

  }
export default Menu
