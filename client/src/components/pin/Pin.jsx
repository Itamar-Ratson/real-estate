import { Marker, Popup } from 'react-leaflet';
import './pin.scss';
import { Link } from 'react-router-dom';
import icon from 'react-leaflet/dist/images/marker-icon.png';
import L from 'react-leaflet';
import iconShadow from 'react-leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Pin({ item }) {
	return (
		<Marker position={[item.latitude, item.longitude]}>
			<Popup>
				<div className='popupContainer'>
					<img src={item.images[0]} alt='' />
					<div className='textContainer'>
						<Link to={`/${item.id}`}>{item.title}</Link>
						<span>
							{item.bedroom} bedroom{item.bedroom > 1 && 's'}
						</span>
						<b>${item.price}</b>
					</div>
				</div>
			</Popup>
		</Marker>
	);
}

export default Pin;

