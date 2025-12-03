import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './AdminDonationChart.css';
import '../UserContactInfo/UserContactInfo.css';

ChartJS.register(ArcElement, Tooltip, Legend);


const AdminDonationChart = ({ stats }) => {
  const data = {
    labels: ['Aprobadas', 'Pendientes', 'Rechazadas'],
    datasets: [
      {
        label: '# de Donaciones',
        data: [stats.aprobada, stats.pendiente, stats.rechazada],
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)',  // Aprobadas (Verde)
          'rgba(255, 193, 7, 0.7)',  // Pendientes (Amarillo)
          'rgba(220, 53, 69, 0.7)',  // Rechazadas (Rojo)
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(220, 53, 69, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Para que se adapte al contenedor
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Resumen de Donaciones (Global)</h3>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default AdminDonationChart;