import { useContext, useState } from 'react';
import './chat.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from 'timeago.js';

function Chat({ chats }) {
	const [chat, setChat] = useState(null);
	const { currentUser } = useContext(AuthContext);

	const handleOpenChat = async (id, reciever) => {
		try {
			const res = await apiRequest(`/chats/${id}`);
			setChat({ ...res.data, reciever });
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const text = formData.get('text');
		if (!text) return;
		try {
			const res = await apiRequest.post(`/messages/${chat.id}`, { text });
			setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
			e.target.reset();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='chat'>
			<div className='messages'>
				<h1>Messages</h1>
				{chats?.map((c) => (
					<div
						className='message'
						key={c.id}
						style={{ backgroundColor: c.seenBy.includes(currentUser.id) ? 'white' : '#fecd514e' }}
						onClick={() => handleOpenChat(c.id, c.reciever)}>
						<img src={c.reciever.avatar || '/noavatar.jpg'} alt='' />
						<span>{c.reciever.username}</span>
						<p>{c.lastMessage}</p>
					</div>
				))}
			</div>
			{chat && (
				<div className='chatBox'>
					<div className='top'>
						<div className='user'>
							<img src={chat.reciever.avatar || '/noavatar.jpg'} alt='' />
							{chat.reciever.username}
						</div>
						<span className='close' onClick={() => setChat(null)}>
							X
						</span>
					</div>
					<div className='center'>
						{chat.messages.map((message) => (
							<div
								className={`chatMessage ${message.userId === currentUser.id ? 'own' : ''}`}
								key={message.id}>
								<p>{message.text}</p>
								<span>{format(message.createdAt)}</span>
							</div>
						))}
					</div>
					<form onSubmit={handleSubmit} className='bottom'>
						<textarea name='text'></textarea>
						<button>Send</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default Chat;

