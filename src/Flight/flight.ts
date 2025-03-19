export interface Flight {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal?: string;
    gate?: string | null;
    delay?: number | null;
    scheduled: string;
    estimated?: string | null;
    actual?: string | null;
    estimated_runway?: string | null;
    actual_runway?: string | null;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal?: string;
    gate?: string | null;
    baggage?: string | null;
    delay?: number | null;
    scheduled: string;
    estimated?: string | null;
    actual?: string | null;
    estimated_runway?: string | null;
    actual_runway?: string | null;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight: {
    number: string;
    iata: string;
    icao: string;
    codeshared?: {
      airline_name: string;
      airline_iata: string;
      airline_icao: string;
      flight_number: string;
      flight_iata: string;
      flight_icao: string;
    } | null;
  };
  aircraft?: {
    registration: string;
    iata: string;
    icao: string;
    icao24: string;
  } | null;
  live?: boolean | null;
}