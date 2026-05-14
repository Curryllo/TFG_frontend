import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import HeatMapLayer from './HeatMapLayer';
import AutoBounds from './AutoBounds';
import 'leaflet/dist/leaflet.css';

export default function HeatMap({ data } : any){
    return (
        <MapContainer center={[41.6488, -0.8891]} zoom={6} className="w-full h-full z-0">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AutoBounds data={data}/>
            <HeatMapLayer puntos={data}/>
        </MapContainer>
    )
}