import Post from "../Models/BlogSchema.js";

// ✅ Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const photo = req.file ? req.file.filename : null; // just save filename

    const post = new Post({ title, description, photo });
    await post.save();

    res.status(201).json(post); // post will include `photoUrl` automatically
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts); // each post has `photoUrl` thanks to schema virtual
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post); // includes `photoUrl`
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.photo = req.file.filename; // store new filename if updated
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });

    res.json(updatedPost); // includes `photoUrl`
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
