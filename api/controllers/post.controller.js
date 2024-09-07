import prisma from '../lib/prisma.js';

export const getPosts = async (req, res) => {
	const query = req.query;
	try {
		const posts = await prisma.post.findMany({
			where: {
				city: query.city || undefined,
				type: query.type || undefined,
				property: query.property || undefined,
				bedroom: parseInt(query.bedroom) || undefined,
				price: {
					gte: parseInt(query.minPrice) || 0,
					lte: parseInt(query.maxPrice) || 1000000,
				},
			},
		});
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to get posts' });
	}
};

export const getPost = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await prisma.post.findUnique({
			where: { id },
			include: {
				postDetail: true,
				user: {
					select: {
						username: true,
						avatar: true,
					},
				},
			},
		});
		res.status(200).json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to get post' });
	}
};

export const addPost = async (req, res) => {
	const { postData, postDetail } = req.body;
	const tokenUserId = req.userId;
	try {
		const newPost = await prisma.post.create({
			data: {
				...postData,
				userId: tokenUserId,
				postDetail: {
					create: postDetail,
				},
			},
		});
		res.status(200).json(newPost);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to add post' });
	}
};

export const updatePost = async (req, res) => {};

export const deletePost = async (req, res) => {
	const { id } = req.params;
	const tokenUserId = req.userId;
	try {
		const post = await prisma.post.findUnique({
			where: { id },
		});
		if (post.userId !== tokenUserId) return res.status(403).json({ message: 'Not autherized' });

		await prisma.post.delete({
			where: { id },
		});
		res.status(200).json({ message: 'Deleted post' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to delete post' });
	}
};
