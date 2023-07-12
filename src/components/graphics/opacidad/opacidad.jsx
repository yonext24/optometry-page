import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { getPatientTests } from '../../../firebase/utils/paciente'
import styles from './opacidad.module.css'
import { Sidebar } from '../sidebar'

export function OpacidadGraphic({ user }) {
  const [documents, setDocuments] = useState([])
  const [selectedItemData, setSelectedItemData] = useState(null)
  const [chartData, setChartData] = useState([])
  const [minx, setMinx] = useState(null)
  const [maxx, setMaxx] = useState(null)
  const [umbralNEstimulosAcertados, setUmbralNEstimulosAcertados] = useState(0)
  const COLORS = [
    '#FE3333',
    '#FE6433',
    '#FEA233',
    '#C0FE33',
    '#67FE33',
    '#5ED934',
    '#2CBF2E',
    '#04FF00',
  ]

  useEffect(() => {
    getPatientTests(user.documento, 'Terapia2').then(setDocuments)
  }, [])

  useEffect(() => {
    if (selectedItemData && Object.keys(selectedItemData).length > 0) {
      const max = Math.max(...selectedItemData.NEstimulosAcertados)
      setUmbralNEstimulosAcertados(max / 2)
      const { ...rest } = selectedItemData

      const Contraste = rest.Contraste
      const Filtro = rest.Filtro
      const NEstimulosAcertados = rest.NEstimulosAcertados
      const chartData = (Contraste || []).map((_, index) => ({
        index: index + 1,
        Contraste: Contraste[index],
        Filtro: Filtro[index],
        NEstimulosAcertados: NEstimulosAcertados[index],
      }))

      setChartData(chartData)
    }
  }, [selectedItemData])

  useEffect(() => {
    const maxX = Math.max(...chartData.map((data) => data.Filtro))
    const minX = Math.min(...chartData.map((data) => data.Filtro))
    setMaxx(maxX)
    setMinx(minX)
    console.log(chartData)
  }, [chartData])

  return (
    <div className={styles.container}>
      <Sidebar
        documents={documents}
        selectedItemData={selectedItemData}
        setSelectedItemData={setSelectedItemData}
      />
      <div className={styles.data}>
        <div className={styles.chart + ' ' + styles.container}>
          {chartData && (
            <ResponsiveContainer
              className={styles.chart}
              width='100%'
              height={400}>
              <ScatterChart
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  ticks={[-5, 1, 5, 10, 15]}
                  type='number'
                  dataKey='Filtro'
                  name='filtro'
                  unit=''
                  domain={[minx, maxx]}
                />
                <YAxis
                  type='number'
                  dataKey='Contraste'
                  name='contraste'
                  unit=''
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name='A data' data={chartData}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.NEstimulosAcertados % COLORS.length]}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className={styles.table + ' ' + styles.container}>
          <div className={styles.table + ' ' + styles.container}>
            {selectedItemData && (
              <Table
                className={
                  styles.table + ' ' + styles.striped + ' ' + styles.border
                }>
                <thead>
                  <tr>
                    <th>Índice</th>
                    <th>Tamaño</th>
                    <th>NEstimulos</th>
                    <th>NEstimulosAcertados</th>
                    <th>Filtro</th>
                    <th>Contraste</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItemData['Tamaño'].map((_, index) => {
                    const nEstimulosAcertados =
                      selectedItemData.NEstimulosAcertados[index]
                    const isHighlighted =
                      nEstimulosAcertados > umbralNEstimulosAcertados
                    const rowClassName = isHighlighted ? 'highlighted-row' : ''
                    return (
                      <tr key={index} className={styles[rowClassName]}>
                        <td>{index + 1}</td>
                        <td>{selectedItemData['Tamaño'][index]}</td>
                        <td>{selectedItemData.NEstimulos[index]}</td>
                        <td>{nEstimulosAcertados}</td>
                        <td>{selectedItemData.Filtro[index]}</td>
                        <td>{selectedItemData.Contraste[index]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
