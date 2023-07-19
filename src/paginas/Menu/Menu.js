import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

  const Menu = () => {

    // Al montar y desmontar el componente, cambia el color de fondo del body
    useEffect(() => {
      // Guarda el color de fondo original del body
      const originalBackgroundColor = document.body.style.backgroundColor;

      // Cambia el color de fondo del body al montar el componente
      document.body.style.backgroundColor = 'white';

      // Restaura el color de fondo original del body al desmontar el componente
      return () => {
        document.body.style.backgroundColor = originalBackgroundColor;
      };
    }, []);  // El arreglo vacío indica que este efecto solo se ejecuta al montar y desmontar el componente



    return (
        <>

          <Card style={{ width: '18rem', height: '28rem', margin: 'auto', marginTop: '10%' }}>
            <Card.Body>
              <Card.Title className="text-center">Menú</Card.Title>
              <Card.Text>
                <div style={{ display: 'block', marginBottom: '10px' }}>
                  <Button block as={Link} to="/vista-turnero" className="w-100 custom-button">
                    Vista Turnero
                  </Button>
                </div>
                <div style={{ display: 'block', marginBottom: '10px' }}>
                  <Button block as={Link} to="/visualizador-turnos" className="w-100 custom-button">
                    Visualizador de Turnos
                  </Button>
                </div>
                <div style={{ display: 'block', marginBottom: '10px' }}>
                  <Button  block as={Link} to="/solicitar-turno" className="w-100 custom-button">
                    Generar Turno
                  </Button>
                </div>
                <div style={{ display: 'block', marginBottom: '10px' }}>
                  <Button block as={Link} to="/Login" className="w-100 custom-button">
                    Atender Turnos
                  </Button>
                </div>
                <div style={{ display: 'block', marginBottom: '10px' }}>
                  <Button  block as={Link} to="/registrar-caja" className="w-100 custom-button">
                    Registrar Modulo
                  </Button>
                </div>

                <div style={{ display: 'block', marginBottom: '10px' }}>
                  <Button  block as={Link} to="/registrar-usuario" className="w-100 custom-button">
                    Registrar Usuario
                  </Button>
                </div>
                <div style={{ display: 'block', marginBottom: '10px' }}>
                  <Button block as={Link} to="/lista-cajas" className="w-100 custom-button">
                    Lista de Modulos
                  </Button>
                </div>
                <div style={{ display: 'block', marginBottom: '10px' }}>
                  <Button block as={Link} to="/grafica-turnos" className="w-100 custom-button">
                    Graficas
                  </Button>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>

        </>
    );


  }
export default Menu
