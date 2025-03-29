"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import Image from "next/image"
import "react-datepicker/dist/react-datepicker.css"
import { concepts } from "./data/concepts"
import RechartsBar from "./components/rechartsBar/rechartsBar"
import RechartsPie from "./components/rechartsPie/rechartsPie"



export default function Home() {
  // Hora de entrada y salida
  const [attendanceIn, setAttendanceIn] = useState<Date | null>(null)
  const [attendanceOut, setAttendanceOut] = useState<Date | null>(null)
  // información de los conceptos y horas
  const [data, setData] = useState<{ concept: string; hours: number }[]>([])
  const [loading, setLoading] = useState(false)

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!attendanceIn || !attendanceOut) {
      alert("Debe seleccionar la hora de entrada y salida.")
      return
    }

    // Formatear la hora en el formato de hora y minutos
    const formatTime = (date: Date) => date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })

    // Objeto con los datos del formulario que se enviará a la API
    const formData = {
      attendanceIn: formatTime(attendanceIn),
      attendanceOut: formatTime(attendanceOut),
      concepts,
    }

    setLoading(true)
    try {
      // Enviar la solicitud POST al proxy de la API
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      
      if (response.status !== 200) {
        alert("Error al obtener datos")
        setData([])
        return
      }

      const result = await response.json()

      // Formatear los datos para el gráfico
      const formattedData = Object.entries(result).map(([concept, hours]) => ({
        concept,
        hours: Number(hours),
      }))

      setData(formattedData);
    } catch (error) {
      console.error("Error al obtener datos:", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-50 to-blue-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-900 p-4 rounded-full shadow-lg">
            <Image
              src="https://site.cariai.com/wp-content/uploads/2023/04/Elementos-Web-2023_Cari-AI-White.svg"
              alt="Mi Logo"
              width={140}
              height={140}
              className="drop-shadow-lg"
            />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-6">
          Cálculo de Horas Trabajadas
        </h1>

        {/* Filtros */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="md:flex md:space-x-4">
            <div className="flex-1">
              <label className="block font-medium text-gray-700 mb-2">Hora de Entrada:</label>
              <DatePicker
                selected={attendanceIn}
                onChange={(date) => {
                  setAttendanceIn(date);
                  // Limpiar gráfico al cambiar valores
                  setData([]);
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Hora"
                dateFormat="HH:mm"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex-1">
              <label className="block font-medium text-gray-700 mb-2">Hora de Salida:</label>
              <DatePicker
                selected={attendanceOut}
                onChange={(date) => {
                  setAttendanceOut(date);
                  // Limpiar gráfico al cambiar valores
                  setData([]);
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Hora"
                dateFormat="HH:mm"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-3 rounded-lg shadow-md hover:bg-purple-800 transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Calcular Horas
          </button>
        </form>

        {loading && <p className="text-center mt-6 text-gray-600">Cargando datos...</p>}

        {!loading && data.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-center text-gray-900 mb-6">Resultados</h2>

            {/* Gráficos */}
            <div className="md:flex md:space-x-4">
              <div className="flex-1">
                <RechartsBar data={data} />
              </div>

              <div className="flex-1">
                <RechartsPie data={data} />
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="w-full text-center py-4 bg-gray-900 text-white text-sm mt-8 rounded-2xl">
        <p className="text-gray-300">
          Desarrollado por
          <span className="font-semibold text-purple-400 mx-1">
            Andrés Felipe Mejía R.
          </span>
          |{" "}
          <a
            href="https://andresmejia.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            andresmejia.dev
          </a>
        </p>
      </footer>
    </main>
  )
}