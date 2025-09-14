import Post from "../Models/BlogSchema.js";



export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    const photo = req.file ? req.file.path : null;

    const post = new Post({
      title,
      description,
      photo,
    });

    await post.save();
    res.status(201).json(post);
    console.log(req.files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    
    const updateData = { ...req.query, ...req.body };

    if (req.file) {
      updateData.photo = req.file.path;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
