export const shouldBeLoggedIn = async (req, res) => {
	console.log(req.userId);
	res.status(200).json({ message: 'You are authenticated' });
};

export const shouldBeAdmin = async (req, res) => {
	if (!req.userIsAdmin) return res.status(403).json({ message: 'Not autherized' });
	else res.status(200).json({ message: 'You are authenticated' });
};
