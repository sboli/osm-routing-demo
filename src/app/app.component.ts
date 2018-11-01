import { Component } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, LatLng, Map, Marker, Icon, Point } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'osm-routing-demo';
  map = undefined;
  markers = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 15,
    center: latLng([ 16.2650, -61.5710 ]),
    attributionControl: false
  };
  onMapReady(map: Map) {
    this.map = map;
  }

  onMapClick(event: LeafletMouseEvent) {
    // console.log(event.latlng);
    this.addMarker(event.latlng);
  }

  addMarker(pos: LatLng) {
    const marker = new Marker(pos);
    const anchor = new Point(25 / 2 , 41);
    const icon = new Icon({
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png',
      iconAnchor: anchor,
      shadowAnchor: anchor,
      popupAnchor: new Point(0, -anchor.y)
    });
    marker.setIcon(icon);
    marker.bindPopup('Marker N° ' + (this.markers.length + 1));
    marker.addTo(this.map);
    marker.openPopup();
    this.markers.push(pos);
    this.updateRouting();
  }

  updateRouting() {
    const routing = L.Routing.control({
      waypoints: this.markers,
      routeWhileDragging: true,
      showAlternatives: true
    });
    routing.addTo(this.map);
  }
}
