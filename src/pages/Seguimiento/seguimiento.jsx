import React from 'react'
import { MenuDashboardPaciente } from './menuDashboardPaciente'
import { Bar } from 'react-chartjs-2'
import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { Legend, Tooltip } from 'chart.js'
import '../../styles/dashBoardPaciente/dashboard/dashboardInner.css'

export function Seguimiento() {
  const data = [
    { nombre: 'Maria', edad: 15, weight: 60 },
    { nombre: 'Sofia', edad: 30, weight: 70 },
    { nombre: 'Saul', edad: 25, weight: 65 },
    { nombre: 'Danna', edad: 17, weight: 85 },
    { nombre: 'Carlos', edad: 19, weight: 48 },
    { nombre: 'Juliana', edad: 12, weight: 69 },
    { nombre: 'Dayana', edad: 21, weight: 78 },
  ]

  return (
    <React.Fragment>
      <div className='row'>
        <div className='col-2'>
          <MenuDashboardPaciente />
        </div>
        <div className='col-10'>
          <div className='interior-dashboard'>
            <h2>Seguimiento</h2>
            <ResponsiveContainer width='70%' aspect={2}>
              <BarChart
                data={data}
                width={500}
                height={300}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='4 1 2' />
                <XAxis dataKey='nombre' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='weight' />
                <Bar dataKey='edad' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
