import { Component } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [ LeafletModule ],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})
export class GoogleMapComponent {
    imgUrl = import.meta.env.NG_APP_IMG_URL;

    options: L.MapOptions = {
        layers: this.getLayers(),
        zoom: 12,
        center: new L.LatLng(43.5074826, 16.4390046)
    };

    getLayers(): L.Layer[] {
        return [
            new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            } as L.TileLayerOptions),
            ...this.getMarkers()
        ] as L.Layer[];
    };

    getMarkers(): L.Marker[] {
        return [
            new L.Marker(new L.LatLng(43.5074826, 16.4390046), {
                icon: new L.Icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: `${this.imgUrl}leaflet-markers/marker-icon.png`,
                }),
                title: 'Riva'
            } as L.MarkerOptions),
        ] as L.Marker[];
    };
}