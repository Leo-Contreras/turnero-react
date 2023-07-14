import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import { Container } from "react-bootstrap";

export const GraficaTurnero = ({ listaTurnos, modulos }) => {
	const chartEnEsperaEl = useRef(null);
	const chartFinalizadosEl = useRef(null);

	// Calcular los datos para el gráfico
	const dataEnEspera = modulos.map(modulo => {
		let turnosEnEspera = listaTurnos.filter(turno => turno.Caja === modulo.nombre && turno.Estado === 'EN ESPERA').length;
		return {
			name: modulo.nombre,
			data: [turnosEnEspera]
		};
	});

	const dataFinalizados = modulos.map(modulo => {
		let turnosFinalizados = listaTurnos.filter(turno => turno.Caja === modulo.nombre && turno.Estado === 'FINALIZADO').length;
		return {
			name: modulo.nombre,
			data: [turnosFinalizados]
		};
	});

	useEffect(() => {
		document.body.style.backgroundColor = "#6a1232";

		if (chartEnEsperaEl && chartEnEsperaEl.current) {
			Highcharts.chart(chartEnEsperaEl.current, {
				chart: {
					type: 'column'
				},
				title: {
					text: 'Turnos en Espera por Módulo'
				},
				xAxis: {
					type: 'category'
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Número de Turnos'
					}
				},
				series: dataEnEspera
			});
		}

		if (chartFinalizadosEl && chartFinalizadosEl.current) {
			Highcharts.chart(chartFinalizadosEl.current, {
				chart: {
					type: 'column'
				},
				title: {
					text: 'Turnos Finalizados por Módulo'
				},
				xAxis: {
					type: 'category'
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Número de Turnos'
					}
				},
				series: dataFinalizados
			});
		}

		// Return a cleanup function to reset the body background color
		return () => {
			document.body.style.backgroundColor = null;
		};

	}, [chartEnEsperaEl, chartFinalizadosEl, dataEnEspera, dataFinalizados]);

	return (
		<Container>
			<div ref={chartEnEsperaEl} style={{ marginBottom: '20px' }}></div>
			<div ref={chartFinalizadosEl}></div>
		</Container>
	);
};

