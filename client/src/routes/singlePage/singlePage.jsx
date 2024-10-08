import './singlePage.scss';
import Slider from '../../components/slider/Slider';
import Map from '../../components/map/Map';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

function SinglePage() {
	const post = useLoaderData();
	const [disableSaveButton, setDisableSaveButton] = useState(false);
	const [saved, setSaved] = useState(post.isSaved);
	const [error, setError] = useState('');
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSave = async () => {
		setDisableSaveButton(true);
		if (!currentUser) navigate('/login');
		setSaved((prev) => !prev);
		try {
			await apiRequest.post('/users/save', { postId: post.id });
		} catch (err) {
			console.log(err);
			setSaved((prev) => !prev);
			setError(err);
		}
		setDisableSaveButton(false);
	};
	return (
		<div className='singlePage'>
			<div className='details'>
				<div className='wrapper'>
					<Slider images={post.images} />
					<div className='info'>
						<div className='top'>
							<div className='post'>
								<h1>{post.title}</h1>
								<div className='address'>
									<img src='/pin.png' alt='' />
									<span>{post.address}</span>
								</div>
								<div className='price'>$ {post.price}</div>
							</div>
							<div className='user'>
								<img src={post.user.avatar} alt='' />
								<span>{post.user.username}</span>
							</div>
						</div>
						<div
							className='bottom'
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.postDetail.desc) }}></div>
					</div>
				</div>
			</div>
			<div className='features'>
				<div className='wrapper'>
					<p className='title'>General</p>
					<div className='listVertical'>
						<div className='feature'>
							<img src='/utility.png' alt='' />
							<div className='featureText'>
								<span>Utilities</span>
								<p>{post.postDetail.utilities} is responsible</p>
							</div>
						</div>
						<div className='feature'>
							<img src='/pet.png' alt='' />
							<div className='featureText'>
								<span>Pet Policy</span>
								<p>Pets {post.postDetail.pet}</p>
							</div>
						</div>
						<div className='feature'>
							<img src='/fee.png' alt='' />
							<div className='featureText'>
								<span>Property Fees</span>
								<p>Must have {post.postDetail.income} the rent in total household income</p>
							</div>
						</div>
					</div>
					<p className='title'>Sizes</p>
					<div className='sizes'>
						<div className='size'>
							<img src='/size.png' alt='' />
							<span>{post.postDetail.size} sqft</span>
						</div>
						<div className='size'>
							<img src='/bed.png' alt='' />
							<span>
								{post.bedroom} bed{post.bedroom > 1 && 's'}
							</span>
						</div>
						<div className='size'>
							<img src='/bath.png' alt='' />
							<span>
								{post.bathroom} bathroom{post.bathroom > 1 && 's'}
							</span>
						</div>
					</div>
					<p className='title'>Nearby Places</p>
					<div className='listHorizontal'>
						<div className='feature'>
							<img src='/school.png' alt='' />
							<div className='featureText'>
								<span>School</span>
								<p>{post.postDetail.school}m away</p>
							</div>
						</div>
						<div className='feature'>
							<img src='/pet.png' alt='' />
							<div className='featureText'>
								<span>Bus Stop</span>
								<p>{post.postDetail.bus}m away</p>
							</div>
						</div>
						<div className='feature'>
							<img src='/fee.png' alt='' />
							<div className='featureText'>
								<span>Restaurant</span>
								<p>{post.postDetail.restaurant}m away</p>
							</div>
						</div>
					</div>
					<p className='title'>Location</p>
					<div className='mapContainer'>
						<Map items={[post]} />
					</div>
					<div className='buttons'>
						<button>
							<img src='/chat.png' alt='' />
							Send a Message
						</button>
						<button
							onClick={handleSave}
							disabled={disableSaveButton}
							style={{ backgroundColor: saved ? '#fece51' : 'white' }}>
							<img src='/save.png' alt='' />
							{saved ? 'Place saved' : 'Save the Place'}
						</button>
						{error && <p>{error}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SinglePage;

