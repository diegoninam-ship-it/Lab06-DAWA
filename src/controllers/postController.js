import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async showCreateForm(req, res) {
        try {
            const users = await userRepository.findAll();
            res.render("newPost", { users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { userId, title, content, imageUrl, hashtags } = req.body;

            const hashtagsArray = hashtags
                ? hashtags.split(",").map(tag => tag.trim())
                : [];

            await postService.createPost(userId, {
                title,
                content,
                imageUrl,
                hashtags: hashtagsArray
            });

            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async showEditForm(req, res) {
        try {
            const { id } = req.params;
            const posts = await postService.getPosts();
            const post = posts.find(p => p._id.toString() === id);

            if (!post) return res.status(404).send("Post no encontrado");

            res.render("editPost", { post });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, content, imageUrl, hashtags } = req.body;

            const hashtagsArray = hashtags
                ? hashtags.split(",").map(tag => tag.trim())
                : [];

            await postService.updatePost(id, { title, content, imageUrl, hashtags: hashtagsArray });
            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await postService.deletePost(id);
            res.redirect("/posts");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new PostController();