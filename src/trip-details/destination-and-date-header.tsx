import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { format } from "date-fns";


interface Trip{
	destination: string
	ends_at: string
	id: string
	is_confirmed: boolean
	starts_at: string
}
export function DestinationAndDateHeader(){
	const [trip, setTrip] = useState<Trip | undefined>()
	const {tripId} = useParams()

	useEffect(() => {
		api.get(`/trips/${tripId}`).then((res) => setTrip(res.data.trip));
		
	}, [tripId])

	const displayedDate = trip 
	? format(trip.starts_at, "d' de 'LLL").concat(' até ').concat(format(trip.ends_at,"d' de 'LLL"))
	: null
	return (
		<div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
			<div className="flex items-center gap-2">
				<MapPin className="size-5 text-zinc-400" />
				<span className="text-zinc-100">{trip?.destination}</span>
			</div>

			<div className="flex items-center gap-5">
				<div className="flex items-center gap-2">
					<Calendar className="size-5 text-zinc-400" />
					<span className="text-zinc-100">{displayedDate}</span>
				</div>

				<div className="w-px h-6 bg-zinc-800"></div>

				<Button variant="secondary">
					Alterar local/data
					<Settings2 className="size-5"/>
				</Button>
			</div>
		</div>
	)
}