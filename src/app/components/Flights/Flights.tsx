'use client'

import getFligts from "@/app/api/fligts/getFligts"
import { Flight } from "@/Flight/flight"
import { useEffect, useState } from "react"

export default function Flights() {

  const [API_KEY] = useState<string>(process.env.NEXT_PUBLIC_API_KEY ?? '')
  const [CODE] = useState<string>('BCN')
  const [maxFlights] = useState<number>(15)
  const [flights, setFlights] = useState<Flight[] | []>([])

  useEffect(() => {
    let aux: Flight[] = []
    getFligts(API_KEY, CODE)
      .then((r) => {
        aux = r.data
        const fligtAux = []
        for (let i = 0; i < aux.length; i++) {
          if (fligtAux.length == maxFlights) {
            i = aux.length;
          }
          if (aux[i] == undefined) {
            continue;
          }
          let flightNumberAux = aux[i].flight.iata
          let AirlineAux = aux[i].airline.name
          let countRep = 1
          while (aux[i].departure.iata === aux[i + countRep].departure.iata) {
            flightNumberAux += ' - ' + aux[i + countRep].flight.iata
            AirlineAux += ' - ' + aux[i + countRep].airline.name
            countRep++
          }
    
          const aux_ = aux[i]
          aux_.flight.iata = flightNumberAux
          aux_.airline.name = AirlineAux
          fligtAux.push(aux_)
          console.log(fligtAux);
          i += countRep - 1
        }
        setFlights(fligtAux)
      })
  }, [API_KEY, CODE, maxFlights])

  return (
    <table className="table-fixed border-collapse border-2 border-white w-full">
      <thead>
        <tr>
          <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">Flight number</th>
          <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">Departure</th>
          <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">Arrival</th>
          <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">Airline</th>
          <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">Status</th>
          <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">DEPARTURE CELL</th>
          <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">ARRIVAL TIME</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight, index) => (
          <tr key={index + 1} className={`${flight.flight_status === 'landed' ? 'bg-green-800' : flight.flight_status === 'active' ? 'bg-blue-800' : 'bg-transparent'}`}>
            <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">{flight.flight.iata}</th>
            <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">{flight.departure.iata + ' - ' + flight.departure.airport}</th>
            <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">{flight.arrival.iata + ' - ' + flight.arrival.airport}</th>
            <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">{flight.airline.name}</th>
            <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">{flight.flight_status}</th>
            <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">{new Date(flight.departure.scheduled).toLocaleString()}</th>
            <th className=" border-2 border-white pt-2 pb-2 pl-4 pr-4">{new Date(flight.arrival.scheduled).toLocaleString()}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}